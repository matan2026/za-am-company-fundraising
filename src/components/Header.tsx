"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DonationLink } from "@/components/DonationLink";
import { SectionContainer } from "@/components/SectionContainer";
import type { ApprovedImageAsset } from "@/config/assets";

const navItems = [
  { href: "#our-story", label: "סיפור הפלוגה" },
  { href: "#needs", label: "לאן התרומה הולכת" },
  { href: "#faq", label: "שאלות נפוצות" },
];

export function Header({ logo }: { logo: ApprovedImageAsset | null }) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const closeMenuAndFocusSection = (href: string) => {
    setOpen(false);
    window.requestAnimationFrame(() => {
      const section = document.querySelector<HTMLElement>(href);
      const focusTarget = section?.querySelector<HTMLElement>("h1, h2, h3") ?? section;

      if (!focusTarget) {
        menuButtonRef.current?.focus();
        return;
      }

      const previousTabIndex = focusTarget.getAttribute("tabindex");
      focusTarget.setAttribute("tabindex", "-1");
      focusTarget.focus({ preventScroll: true });
      section?.scrollIntoView({ block: "start" });

      focusTarget.addEventListener(
        "blur",
        () => {
          if (previousTabIndex === null) {
            focusTarget.removeAttribute("tabindex");
          } else {
            focusTarget.setAttribute("tabindex", previousTabIndex);
          }
        },
        { once: true },
      );
    });
  };

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const focusableSelector =
      'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';
    const inertTargets = [
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>(".site-footer"),
      document.querySelector<HTMLElement>(".mobile-donation-bar"),
    ].filter((target): target is HTMLElement => Boolean(target));
    const previousInertValues = inertTargets.map((target) => target.inert);

    document.body.style.overflow = "hidden";
    inertTargets.forEach((target) => {
      target.inert = true;
    });
    const focusFrame = window.requestAnimationFrame(() => {
      mobileMenuRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();
    });

    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = mobileMenuRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleMenuKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousBodyOverflow;
      inertTargets.forEach((target, index) => {
        target.inert = previousInertValues[index];
      });
      window.removeEventListener("keydown", handleMenuKeyDown);
    };
  }, [open]);

  return (
    <header className="site-header">
      <SectionContainer className="header-inner">
        <a className="brand" href="#top">
          {logo ? (
            <Image
              src={logo.src}
              alt="לוגו פלוגת זעם"
              width={logo.width}
              height={logo.height}
              sizes="(max-width: 1023px) 67px, 88px"
              className="header-logo logo-dark"
              loading="eager"
            />
          ) : null}
          <span className="sr-only">— לראש העמוד</span>
        </a>

        <nav className="desktop-nav" aria-label="ניווט ראשי">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <DonationLink className="button button-small">תרמו עכשיו</DonationLink>
        </nav>

        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </SectionContainer>

      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="תפריט ניווט לנייד"
        aria-hidden={!open}
      >
        <button
          className="mobile-nav-backdrop"
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => {
            setOpen(false);
            menuButtonRef.current?.focus();
          }}
        />
        <nav aria-label="ניווט לנייד">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => closeMenuAndFocusSection(item.href)}
            >
              {item.label}
            </a>
          ))}
          <DonationLink
            className="button"
            ariaLabel="תרמו עכשיו לפלוגת זעם"
            onNavigate={() => setOpen(false)}
          >
            תרמו עכשיו
          </DonationLink>
        </nav>
      </div>
    </header>
  );
}
