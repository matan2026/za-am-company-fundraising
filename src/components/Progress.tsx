"use client";

import { useEffect, useState } from "react";
import { campaign } from "@/config/campaign";
import { calculateCampaignProgress } from "@/lib/campaign-progress";

type CampaignProgressProps = {
  compact?: boolean;
  variant?: "default" | "target-card";
};

export function CampaignProgress({
  compact = false,
  variant = "default",
}: CampaignProgressProps) {
  const [progress, setProgress] = useState<number>(
    campaign.campaignProgressStartPercent,
  );

  useEffect(() => {
    const updateFrame = window.requestAnimationFrame(() => {
      setProgress(calculateCampaignProgress());
    });
    return () => window.cancelAnimationFrame(updateFrame);
  }, []);

  return (
    <div
      className={[
        "progress",
        compact ? "progress-compact" : "",
        variant === "target-card" ? "progress-target-card" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="progress-head campaign-progress-head">
        <span>מד התקדמות הקמפיין</span>
        <strong className="campaign-progress-value">{progress}%</strong>
      </div>
      <div
        className="progress-track campaign-progress-track"
        role="progressbar"
        aria-label="מד התקדמות הקמפיין"
        aria-valuemin={0}
        aria-valuemax={campaign.campaignProgressMaxPercent}
        aria-valuenow={progress}
        aria-valuetext={`${progress}% — התקדמות כללית של הקמפיין`}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className="campaign-progress-support">מתקדמים יחד לעבר היעד</p>
    </div>
  );
}
