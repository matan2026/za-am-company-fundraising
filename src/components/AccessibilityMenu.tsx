"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type TextSize = "normal" | "increased" | "large";

type Preferences = {
  textSize: TextSize;
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  reduceMotion: boolean;
  largeCursor: boolean;
};

const storageKey = "za-am-accessibility-preferences";

const defaults: Preferences = {
  textSize: "normal",
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  reduceMotion: false,
  largeCursor: false,
};

export function AccessibilityIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="28"
      height="28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="24" cy="8.5" r="4" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M10 15.5C14.8 17.7 19.4 18.8 24 18.8C28.6 18.8 33.2 17.7 38 15.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M24 19V30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 25L16.5 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 25L31.5 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M15.5 22L10 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32.5 22L38 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function applyPreferences(preferences: Preferences) {
  const root = document.documentElement;
  root.dataset.accessibilityTextSize = preferences.textSize;
  root.classList.toggle("accessibility-high-contrast", preferences.highContrast);
  root.classList.toggle("accessibility-grayscale", preferences.grayscale);
  root.classList.toggle("accessibility-highlight-links", preferences.highlightLinks);
  root.classList.toggle("accessibility-reduce-motion", preferences.reduceMotion);
  root.classList.toggle("accessibility-large-cursor", preferences.largeCursor);
}

export function AccessibilityMenu() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const text = isEnglish
    ? {
        open: "Open accessibility menu",
        title: "Accessibility menu",
        close: "Close accessibility menu",
        settings: "Accessibility settings",
        textSize: "Text size",
        increase: "Increase text",
        decrease: "Decrease text",
        resetText: "Reset text size",
        largeText: "Large text",
        highContrast: "High contrast",
        grayscale: "Grayscale",
        highlightLinks: "Highlight links",
        reduceMotion: "Reduce motion",
        largeCursor: "Large cursor",
        reset: "Reset settings",
        statement: "Accessibility statement",
        on: "On",
        off: "Off",
      }
    : {
        open: "פתיחת תפריט נגישות",
        title: "תפריט נגישות",
        close: "סגירת תפריט נגישות",
        settings: "הגדרות נגישות",
        textSize: "גודל טקסט",
        increase: "הגדלת טקסט",
        decrease: "הקטנת טקסט",
        resetText: "איפוס גודל טקסט",
        largeText: "טקסט גדול",
        highContrast: "ניגודיות גבוהה",
        grayscale: "גווני אפור",
        highlightLinks: "הדגשת קישורים",
        reduceMotion: "עצירת אנימציות",
        largeCursor: "סמן גדול",
        reset: "איפוס הגדרות",
        statement: "הצהרת נגישות",
        on: "פעיל",
        off: "כבוי",
      };
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(defaults);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return;

      const parsed = JSON.parse(saved) as Partial<Preferences>;
      const textSize =
        parsed.textSize === "increased" || parsed.textSize === "large"
          ? parsed.textSize
          : "normal";
      const next: Preferences = {
        ...defaults,
        highContrast: Boolean(parsed.highContrast),
        grayscale: Boolean(parsed.grayscale),
        highlightLinks: Boolean(parsed.highlightLinks),
        reduceMotion: Boolean(parsed.reduceMotion),
        largeCursor: Boolean(parsed.largeCursor),
        textSize,
      };
      applyPreferences(next);
      queueMicrotask(() => {
        if (!cancelled) {
          setPreferences(next);
        }
      });
    } catch {
      // Storage can be disabled by privacy settings; the menu still works for this visit.
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  const updatePreferences = (changes: Partial<Preferences>) => {
    setPreferences((current) => {
      const next = { ...current, ...changes };
      applyPreferences(next);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Preference persistence is optional when browser storage is unavailable.
      }
      return next;
    });
  };

  const closePanel = () => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const decreaseText = () => {
    updatePreferences({
      textSize: preferences.textSize === "large" ? "increased" : "normal",
    });
  };

  return (
    <div className={`accessibility-menu${isEnglish ? " accessibility-menu-english" : ""}`}>
      <button
        ref={buttonRef}
        className="accessibility-trigger"
        type="button"
        aria-label={text.open}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        <AccessibilityIcon />
      </button>

      {isOpen ? (
        <div
          ref={panelRef}
          className="accessibility-panel"
          id="accessibility-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="accessibility-panel-title"
        >
          <div className="accessibility-panel-header">
            <h2 id="accessibility-panel-title">{text.title}</h2>
            <button className="accessibility-close" type="button" onClick={closePanel} aria-label={text.close}>
              ×
            </button>
          </div>

          <div className="accessibility-controls" aria-label={text.settings}>
            <div className="accessibility-control-group">
              <span className="accessibility-control-label">{text.textSize}</span>
              <div className="accessibility-size-controls">
                <button type="button" onClick={() => updatePreferences({ textSize: "increased" })}>{text.increase}</button>
                <button type="button" onClick={decreaseText}>{text.decrease}</button>
                <button type="button" onClick={() => updatePreferences({ textSize: "normal" })}>{text.resetText}</button>
                <button type="button" onClick={() => updatePreferences({ textSize: "large" })}>{text.largeText}</button>
              </div>
            </div>

            <ToggleControl label={text.highContrast} active={preferences.highContrast} onClick={() => updatePreferences({ highContrast: !preferences.highContrast })} onText={text.on} offText={text.off} />
            <ToggleControl label={text.grayscale} active={preferences.grayscale} onClick={() => updatePreferences({ grayscale: !preferences.grayscale })} onText={text.on} offText={text.off} />
            <ToggleControl label={text.highlightLinks} active={preferences.highlightLinks} onClick={() => updatePreferences({ highlightLinks: !preferences.highlightLinks })} onText={text.on} offText={text.off} />
            <ToggleControl label={text.reduceMotion} active={preferences.reduceMotion} onClick={() => updatePreferences({ reduceMotion: !preferences.reduceMotion })} onText={text.on} offText={text.off} />
            <ToggleControl label={text.largeCursor} active={preferences.largeCursor} onClick={() => updatePreferences({ largeCursor: !preferences.largeCursor })} onText={text.on} offText={text.off} />

            <button className="accessibility-reset" type="button" onClick={() => updatePreferences(defaults)}>
              {text.reset}
            </button>
          </div>

          <Link className="accessibility-statement-link" href="/accessibility" onClick={closePanel}>
            {text.statement}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function ToggleControl({
  label,
  active,
  onClick,
  onText,
  offText,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  onText: string;
  offText: string;
}) {
  return (
    <button
      className="accessibility-toggle"
      type="button"
      aria-pressed={active}
      onClick={onClick}
    >
      <span>{label}</span>
      <span className="accessibility-toggle-state" aria-hidden="true">{active ? onText : offText}</span>
    </button>
  );
}
