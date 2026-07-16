"use client";

import Image from "next/image";
import { useState } from "react";
import { campaign, isValidExternalUrl } from "@/config/campaign";
import type { ApprovedImageAsset } from "@/config/assets";
import { trackEvent } from "@/lib/analytics";
import { getVideoEmbedUrl } from "@/lib/video";

export function VideoCard({
  eager = false,
  poster,
}: {
  eager?: boolean;
  poster: ApprovedImageAsset | null;
}) {
  const [playing, setPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const embedUrl = isValidExternalUrl(campaign.videoUrl)
    ? getVideoEmbedUrl(campaign.videoUrl)
    : null;

  if (!embedUrl) {
    return (
      <div className="video-card video-unavailable" role="status">
        <div className="video-unavailable-content">
          <span aria-hidden="true">סיפור הפלוגה</span>
          <p>הסרטון הרשמי יוצג כאן לאחר קבלת הקישור והחומרים המאושרים.</p>
        </div>
      </div>
    );
  }

  if (playing && embedUrl) {
    return (
      <div className="video-card">
        <iframe
          src={`${embedUrl}?autoplay=1`}
          title="סיפורה של פלוגת זעם"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={`video-card ${poster && !posterFailed ? "video-poster" : "video-poster-fallback"}`}>
      {poster && !posterFailed ? (
        <Image
          src={poster.src}
          alt={poster.alt}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 900px) 100vw, 50vw"
          onError={() => setPosterFailed(true)}
        />
      ) : null}
      <div className="video-overlay">
        <button
          type="button"
          className="play-button"
          aria-label="נגינת הסרטון"
          onClick={() => {
            setPlaying(true);
            trackEvent("video_play");
          }}
        >
          <span aria-hidden="true">▶</span>
        </button>
        {!poster || posterFailed ? <p>נגינת הסרטון הרשמי</p> : null}
      </div>
    </div>
  );
}
