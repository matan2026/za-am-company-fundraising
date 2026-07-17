import { campaign } from "@/config/campaign";

const DAY_IN_MILLISECONDS = 86_400_000;
const CAMPAIGN_TIME_ZONE = "Asia/Jerusalem";

function dateKeyToUtc(dateKey: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);

  if (!match) return null;

  const [, year, month, day] = match;
  return Date.UTC(Number(year), Number(month) - 1, Number(day));
}

function dateToUtcCalendarDay(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);

  return Date.UTC(value("year"), value("month") - 1, value("day"));
}

export function calculateCampaignProgress(
  date = new Date(),
  timeZone = CAMPAIGN_TIME_ZONE,
) {
  const startDay = dateKeyToUtc(campaign.campaignProgressStartDate);
  const startPercent = campaign.campaignProgressStartPercent;
  const maximum = campaign.campaignProgressMaxPercent;

  if (startDay === null) return Math.min(maximum, Math.max(0, startPercent));

  const currentDay = dateToUtcCalendarDay(date, timeZone);
  const elapsedDays = Math.max(
    0,
    Math.floor((currentDay - startDay) / DAY_IN_MILLISECONDS),
  );
  const progress =
    startPercent + elapsedDays * campaign.campaignProgressDailyIncrease;

  return Math.min(maximum, Math.max(0, progress));
}
