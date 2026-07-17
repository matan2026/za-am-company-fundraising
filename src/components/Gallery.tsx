"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { ApprovedImageAsset } from "@/config/assets";
import type { GalleryLightbox as GalleryLightboxType } from "@/components/GalleryLightbox";

type LightboxComponent = typeof GalleryLightboxType;

export function Gallery({ images: gallery }: { images: readonly ApprovedImageAsset[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [Lightbox, setLightbox] = useState<LightboxComponent | null>(null);
  const [useBalancedMobileLayout, setUseBalancedMobileLayout] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 340px) and (max-width: 767px)");
    const updateLayout = () => setUseBalancedMobileLayout(mediaQuery.matches);

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  const openLightbox = async (index: number, trigger: HTMLElement) => {
    previousFocusRef.current = trigger;
    setActive(index);
    trackEvent("gallery_interaction", { image_index: index + 1 });

    if (!Lightbox) {
      const lightboxModule = await import("@/components/GalleryLightbox");
      setLightbox(() => lightboxModule.GalleryLightbox);
    }
  };

  const closeLightbox = () => {
    setActive(null);
    window.requestAnimationFrame(() => previousFocusRef.current?.focus());
  };

  const mobileColumns: Array<Array<{ image: ApprovedImageAsset; index: number }>> = [[], []];
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
        onClick={(event) => void openLightbox(index, event.currentTarget)}
        aria-label={`פתיחת תמונה בתצוגה מוגדלת: ${image.alt}`}
      >
        <Image
          src={image.thumbnailSrc ?? image.src}
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
      <div className={`gallery-grid ${useBalancedMobileLayout ? "gallery-grid-balanced-mobile" : ""}`}>
        {useBalancedMobileLayout
          ? mobileColumns.map((column, columnIndex) => (
              <div className="gallery-column" key={`gallery-column-${columnIndex}`}>
                {column.map(({ image, index }) => renderGalleryItem(image, index))}
              </div>
            ))
          : gallery.map((image, index) => renderGalleryItem(image, index))}
      </div>

      {active !== null && Lightbox ? (
        <Lightbox
          images={gallery}
          active={active}
          onIndexChange={setActive}
          onClose={closeLightbox}
        />
      ) : null}
    </>
  );
}
