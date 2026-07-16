"use client";

import Image from "next/image";
import { useState } from "react";
import { campaign, isValidExternalUrl } from "@/config/campaign";
import { trackEvent } from "@/lib/analytics";
import { getVideoEmbedUrl } from "@/lib/video";

export function VideoCard({ eager = false }: { eager?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = isValidExternalUrl(campaign.videoUrl)
    ? getVideoEmbedUrl(campaign.videoUrl)
    : null;

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
    <div className="video-card video-poster">
      <Image
        src={campaign.videoPoster}
        alt="תמונת שער לסרטון הרשמי של פלוגת זעם — להחלפה בחומר מאושר"
        fill
        loading={eager ? "eager" : "lazy"}
        sizes="(max-width: 900px) 100vw, 50vw"
      />
      <div className="video-overlay">
        <button
          type="button"
          className="play-button"
          disabled={!embedUrl}
          aria-label={embedUrl ? "נגינת הסרטון" : "הסרטון הרשמי טרם הוגדר"}
          onClick={() => {
            setPlaying(true);
            trackEvent("video_play");
          }}
        >
          <span aria-hidden="true">▶</span>
        </button>
        {!embedUrl ? (
          <p>הסרטון הרשמי יוטמע כאן לאחר הזנת הקישור המאושר</p>
        ) : null}
      </div>
    </div>
  );
}
