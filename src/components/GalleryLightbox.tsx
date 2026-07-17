"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ApprovedImageAsset } from "@/config/assets";

type GalleryLightboxProps = {
  images: readonly ApprovedImageAsset[];
  active: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export function GalleryLightbox({
  images,
  active,
  onIndexChange,
  onClose,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<number | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onIndexChange((active + 1) % images.length);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onIndexChange((active - 1 + images.length) % images.length);
      } else if (event.key === "Tab") {
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
    };
  }, [active, images.length, onClose, onIndexChange]);

  return (
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`תמונה ${active + 1} מתוך ${images.length}: ${images[active].alt}`}
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="סגירת התמונה"
      >
        ×
      </button>
      <div
        className="lightbox-image"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => {
          touchStartRef.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStartRef.current;
          touchStartRef.current = null;
          if (start === null) return;

          const delta = (event.changedTouches[0]?.clientX ?? start) - start;
          if (Math.abs(delta) < 50) return;
          onIndexChange(
            delta < 0
              ? (active + 1) % images.length
              : (active - 1 + images.length) % images.length,
          );
        }}
      >
        <Image
          src={images[active].src}
          alt={images[active].alt}
          fill
          sizes="90vw"
          loading="eager"
        />
      </div>
      <div className="lightbox-controls">
        <button
          type="button"
          aria-label="לתמונה הקודמת"
          onClick={(event) => {
            event.stopPropagation();
            onIndexChange((active - 1 + images.length) % images.length);
          }}
        >
          הקודמת
        </button>
        <span>{active + 1} / {images.length}</span>
        <button
          type="button"
          aria-label="לתמונה הבאה"
          onClick={(event) => {
            event.stopPropagation();
            onIndexChange((active + 1) % images.length);
          }}
        >
          הבאה
        </button>
      </div>
    </div>
  );
}
