"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DonationLink } from "@/components/DonationLink";
import type { ApprovedImageAsset } from "@/config/assets";

const navItems = [
  { href: "#story", label: "סיפור הפלוגה" },
  { href: "#needs", label: "לאן התרומה הולכת" },
  { href: "#faq", label: "שאלות נפוצות" },
];

export function Header({ logo }: { logo: ApprovedImageAsset | null }) {
  const [open, setOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
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
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="פלוגת זעם — לראש העמוד">
          {logo && !logoFailed ? (
            <Image
              src={logo.src}
              alt={logo.alt}
              width={48}
              height={48}
              loading="eager"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="brand-mark" aria-hidden="true">זעם</span>
          )}
          <span>
            <strong>פלוגת ״זעם״</strong>
            <small>גדוד 7421 · חטיבה 4</small>
          </span>
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
      </div>

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
