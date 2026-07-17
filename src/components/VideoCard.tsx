"use client";

import { useRef, useState } from "react";
import type { ApprovedImageAsset } from "@/config/assets";
import { campaign } from "@/config/campaign";
import { trackEvent } from "@/lib/analytics";

export function VideoCard({
  poster,
}: {
  poster: ApprovedImageAsset | null;
}) {
  const [failed, setFailed] = useState(false);
  const hasTrackedPlay = useRef(false);

  if (failed) {
    return (
      <div className="video-card video-error" role="alert">
        <p>לא ניתן לנגן את הסרטון בדפדפן זה.</p>
        <a
          className="button button-light"
          href={campaign.videoFile}
          target="_blank"
          rel="noopener noreferrer"
        >
          פתיחת הסרטון בחלון חדש
        </a>
      </div>
    );
  }

  return (
    <div className="video-card">
      <video
        className="video-native"
        controls
        playsInline
        preload="metadata"
        poster={poster?.src ?? campaign.videoPoster}
        title="סרטון פלוגת זעם"
        aria-label="סרטון פלוגת זעם"
        onError={() => setFailed(true)}
        onPlay={() => {
          if (!hasTrackedPlay.current) {
            hasTrackedPlay.current = true;
            trackEvent("video_play");
          }
        }}
      >
        <source src={campaign.videoFile} type="video/mp4" />
        הדפדפן שלך אינו תומך בניגון וידאו.
      </video>
    </div>
  );
}
