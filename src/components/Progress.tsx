"use client";

import { useEffect, useState } from "react";
import { campaign } from "@/config/campaign";
import { calculateCampaignProgress } from "@/lib/campaign-progress";

export function Progress({ compact = false }: { compact?: boolean }) {
  const [progress, setProgress] = useState<number>(
    campaign.campaignProgressStartPercent,
  );

  useEffect(() => {
    const updateProgress = () => setProgress(calculateCampaignProgress());
    const initialUpdate = window.setTimeout(updateProgress, 0);
    const interval = window.setInterval(updateProgress, 60_000);

    return () => {
      window.clearTimeout(initialUpdate);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className={compact ? "progress progress-compact" : "progress"}>
      <div className="progress-head campaign-progress-head">
        <div className="campaign-progress-copy">
          <span>מד התקדמות הקמפיין</span>
          <small>מתקדמים יחד לעבר היעד</small>
        </div>
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
    </div>
  );
}
