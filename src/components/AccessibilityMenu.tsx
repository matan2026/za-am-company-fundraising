"use client";

import Link from "next/link";
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
    <div className="accessibility-menu">
      <button
        ref={buttonRef}
        className="accessibility-trigger"
        type="button"
        aria-label="פתיחת תפריט נגישות"
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
            <h2 id="accessibility-panel-title">תפריט נגישות</h2>
            <button className="accessibility-close" type="button" onClick={closePanel} aria-label="סגירת תפריט נגישות">
              ×
            </button>
          </div>

          <div className="accessibility-controls" aria-label="הגדרות נגישות">
            <div className="accessibility-control-group">
              <span className="accessibility-control-label">גודל טקסט</span>
              <div className="accessibility-size-controls">
                <button type="button" onClick={() => updatePreferences({ textSize: "increased" })}>הגדלת טקסט</button>
                <button type="button" onClick={decreaseText}>הקטנת טקסט</button>
                <button type="button" onClick={() => updatePreferences({ textSize: "normal" })}>איפוס גודל טקסט</button>
                <button type="button" onClick={() => updatePreferences({ textSize: "large" })}>טקסט גדול</button>
              </div>
            </div>

            <ToggleControl label="ניגודיות גבוהה" active={preferences.highContrast} onClick={() => updatePreferences({ highContrast: !preferences.highContrast })} />
            <ToggleControl label="גווני אפור" active={preferences.grayscale} onClick={() => updatePreferences({ grayscale: !preferences.grayscale })} />
            <ToggleControl label="הדגשת קישורים" active={preferences.highlightLinks} onClick={() => updatePreferences({ highlightLinks: !preferences.highlightLinks })} />
            <ToggleControl label="עצירת אנימציות" active={preferences.reduceMotion} onClick={() => updatePreferences({ reduceMotion: !preferences.reduceMotion })} />
            <ToggleControl label="סמן גדול" active={preferences.largeCursor} onClick={() => updatePreferences({ largeCursor: !preferences.largeCursor })} />

            <button className="accessibility-reset" type="button" onClick={() => updatePreferences(defaults)}>
              איפוס הגדרות
            </button>
          </div>

          <Link className="accessibility-statement-link" href="/accessibility" onClick={closePanel}>
            הצהרת נגישות
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function ToggleControl({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      className="accessibility-toggle"
      type="button"
      aria-pressed={active}
      onClick={onClick}
    >
      <span>{label}</span>
      <span className="accessibility-toggle-state" aria-hidden="true">{active ? "פעיל" : "כבוי"}</span>
    </button>
  );
}
