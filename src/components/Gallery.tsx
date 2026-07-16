"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const gallery = Array.from({ length: 8 }, (_, index) => ({
  src: `/images/gallery/image-${String(index + 1).padStart(2, "0")}.webp`,
  alt: `מקום שמור לתמונה מאושרת ${index + 1} מרגעים בשירות פלוגת זעם`,
}));

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft")
        setActive((value) => ((value ?? 0) + 1) % gallery.length);
      if (event.key === "ArrowRight")
        setActive((value) => ((value ?? 0) - 1 + gallery.length) % gallery.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <>
      <div className="gallery-grid">
        {gallery.map((image, index) => (
          <button
            type="button"
            className={`gallery-item gallery-item-${(index % 4) + 1}`}
            key={image.src}
            onClick={() => {
              setActive(index);
              trackEvent("gallery_interaction", { image_index: index + 1 });
            }}
            aria-label={`פתיחת תמונה ${index + 1} בתצוגה מוגדלת`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 25vw"
            />
            <span>תמונה מאושרת תתווסף כאן</span>
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`תמונה ${active + 1} מתוך ${gallery.length}`}
          onClick={() => setActive(null)}
        >
          <button
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
              priority
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
