"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { ApprovedImageAsset } from "@/config/assets";

export function Gallery({ images: gallery }: { images: readonly ApprovedImageAsset[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isOpen = active !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActive(null);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActive((value) => ((value ?? 0) + 1) % gallery.length);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActive((value) => ((value ?? 0) - 1 + gallery.length) % gallery.length);
      }
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not(:disabled), a[href]",
        );
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
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, gallery.length]);

  return (
    <>
      <div className="gallery-grid">
        {gallery.map((image, index) => (
          <button
            type="button"
            className="gallery-item"
            key={image.src}
            onClick={(event) => {
              previousFocusRef.current = event.currentTarget;
              setActive(index);
              trackEvent("gallery_interaction", { image_index: index + 1 });
            }}
            aria-label={`פתיחת תמונה בתצוגה מוגדלת: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 640px) 50vw, (max-width: 980px) 33vw, 380px"
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.closest("button")?.setAttribute("hidden", "");
              }}
            />
            <span>פתיחת התמונה</span>
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          ref={dialogRef}
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`תמונה ${active + 1} מתוך ${gallery.length}: ${gallery[active].alt}`}
          onClick={() => setActive(null)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="lightbox-close"
            onClick={() => setActive(null)}
            aria-label="סגירת התמונה"
          >
            ×
          </button>
          <div className="lightbox-image" onClick={(event) => event.stopPropagation()}>
            <Image
              src={gallery[active].src}
              alt={gallery[active].alt}
              fill
              sizes="90vw"
              loading="eager"
              onError={() => setActive(null)}
            />
          </div>
          <div className="lightbox-controls">
            <button
              type="button"
              aria-label="לתמונה הקודמת"
              onClick={(event) => {
                event.stopPropagation();
                setActive((active - 1 + gallery.length) % gallery.length);
              }}
            >
              הקודמת
            </button>
            <span>{active + 1} / {gallery.length}</span>
            <button
              type="button"
              aria-label="לתמונה הבאה"
              onClick={(event) => {
                event.stopPropagation();
                setActive((active + 1) % gallery.length);
              }}
            >
              הבאה
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
