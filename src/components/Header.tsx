"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DonationLink } from "@/components/DonationLink";
import { SectionContainer } from "@/components/SectionContainer";
import type { ApprovedImageAsset } from "@/config/assets";

const navItems = [
  { href: "#story", label: "סיפור הפלוגה" },
  { href: "#needs", label: "לאן התרומה הולכת" },
  { href: "#faq", label: "שאלות נפוצות" },
];

export function Header({ logo }: { logo: ApprovedImageAsset | null }) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
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

      <nav
        id="mobile-menu"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="ניווט לנייד"
      >
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
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
    </header>
  );
}
