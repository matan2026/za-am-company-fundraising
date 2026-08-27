"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ApprovedImageAsset } from "@/config/assets-en";
import { campaign } from "@/config/campaign-en";
import { trackEvent } from "@/lib/analytics";

type VideoCardProps = {
  poster: ApprovedImageAsset | null;
};

export function VideoCard({ poster }: VideoCardProps) {
  const [activated, setActivated] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTrackedPlay = useRef(false);

  useEffect(() => {
    if (!activated || failed) return;
    void videoRef.current?.play().catch(() => {
      // The native controls remain available if a browser rejects programmatic play.
    });
  }, [activated, failed]);

  if (failed) {
    return (
      <div className="video-card video-error" role="alert">
        <p>This video cannot be played in your browser.</p>
        <a
          className="button button-light"
          href={campaign.videoFile}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open video in a new window
        </a>
      </div>
    );
  }

  return (
    <div className="video-card">
      {activated ? (
        <video
          ref={videoRef}
          className="video-native"
          controls
          playsInline
          preload="metadata"
          poster={poster?.src ?? campaign.videoPoster}
          title="Za'am Company video"
          aria-label="Za'am Company video"
          onError={() => setFailed(true)}
          onPlay={() => {
            if (!hasTrackedPlay.current) {
              hasTrackedPlay.current = true;
              trackEvent("video_play");
            }
          }}
        >
          <source src={campaign.videoFile} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      ) : (
        <button
          className="video-poster-button"
          type="button"
          aria-label="Watch the company story - play the Za'am Company video"
          onClick={() => setActivated(true)}
        >
          {poster ? (
            <Image
              src={poster.src}
              alt=""
              fill
              sizes="(max-width: 359px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 52vw, 650px"
              style={{ objectPosition: poster.objectPosition ?? "50% 50%" }}
            />
          ) : (
            <span className="video-poster-fallback" aria-hidden="true" />
          )}
          <span className="video-poster-shade" aria-hidden="true" />
          <span className="video-overlay" aria-hidden="true">
            <span className="play-button"><span>▶</span></span>
            <span className="video-play-label">Watch our story</span>
          </span>
        </button>
      )}
    </div>
  );
}
