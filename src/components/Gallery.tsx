"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { ApprovedImageAsset } from "@/config/assets";

export function Gallery({ images: gallery }: { images: readonly ApprovedImageAsset[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [useBalancedMobileLayout, setUseBalancedMobileLayout] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<number | null>(null);
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 340px) and (max-width: 767px)");
    const updateLayout = () => setUseBalancedMobileLayout(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  const mobileColumns: Array<Array<{ image: ApprovedImageAsset; index: number }>> = [
    [],
    [],
  ];
  const mobileColumnHeights = [0, 0];

  gallery.forEach((image, index) => {
    const shortestColumn = mobileColumnHeights[0] <= mobileColumnHeights[1] ? 0 : 1;
    mobileColumns[shortestColumn].push({ image, index });
    mobileColumnHeights[shortestColumn] += image.height / image.width;
  });

  const renderGalleryItem = (image: ApprovedImageAsset, index: number) => {
    const ratio = image.width / image.height;
    const aspect = ratio > 1.55 ? "wide" : ratio < 0.85 ? "portrait" : "landscape";

    return (
      <button
        type="button"
        className={`gallery-item gallery-item-${aspect}`}
        key={image.src}
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
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
          fill
          sizes="(max-width: 339px) calc(100vw - 32px), (max-width: 767px) calc(50vw - 24px), 330px"
          loading="lazy"
          decoding="async"
          style={{ objectPosition: image.objectPosition ?? "50% 50%" }}
          onError={(event) => {
            event.currentTarget.closest("button")?.setAttribute("hidden", "");
          }}
        />
        <span>פתיחת התמונה</span>
      </button>
    );
  };

  return (
    <>
      <div
        className={`gallery-grid ${useBalancedMobileLayout ? "gallery-grid-balanced-mobile" : ""}`}
      >
        {useBalancedMobileLayout
          ? mobileColumns.map((column, columnIndex) => (
              <div className="gallery-column" key={`gallery-column-${columnIndex}`}>
                {column.map(({ image, index }) => renderGalleryItem(image, index))}
              </div>
            ))
          : gallery.map((image, index) => renderGalleryItem(image, index))}
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

              setActive((value) => {
                const current = value ?? 0;
                return delta < 0
                  ? (current + 1) % gallery.length
                  : (current - 1 + gallery.length) % gallery.length;
              });
            }}
          >
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
