import { campaign } from "@/config/campaign";

const DAY_IN_MILLISECONDS = 86_400_000;

export function calculateCampaignProgress(date = new Date()) {
  const startTime = Date.parse(campaign.campaignProgressStartDate);
  const startPercent = campaign.campaignProgressStartPercent;
  const maximum = campaign.campaignProgressMaxPercent;
  const daysPerIncrease = campaign.campaignProgressDaysPerIncrease;

  if (Number.isNaN(startTime)) {
    return Math.min(maximum, startPercent);
  }

  const daysPassed = Math.max(
    0,
    Math.floor((date.getTime() - startTime) / DAY_IN_MILLISECONDS),
  );
  const progress =
    startPercent + Math.floor(daysPassed / daysPerIncrease);

  return Math.min(maximum, Math.max(startPercent, progress));
}
