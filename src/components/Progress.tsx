import {
  campaign,
  campaignProgress,
  formatIls,
} from "@/config/campaign";

export function Progress({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "progress progress-compact" : "progress"}>
      <div className="progress-head">
        <span>{compact ? "התקדמות הקמפיין" : "גויסו עד כה"}</span>
        <strong>{formatIls(campaign.raisedAmount)}</strong>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="התקדמות גיוס התרומות"
        aria-valuemin={0}
        aria-valuemax={campaign.targetAmount}
        aria-valuenow={campaign.raisedAmount}
      >
        <span style={{ width: `${campaignProgress}%` }} />
      </div>
      {!compact ? (
        <div className="progress-meta">
          <span>מתוך יעד של {formatIls(campaign.targetAmount)}</span>
          <span>
            <strong>{campaign.donorCount}</strong> שותפים לדרך
          </span>
        </div>
      ) : null}
    </div>
  );
}
