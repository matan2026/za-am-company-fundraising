const DONATION_PLACEHOLDER = "REPLACE_WITH_DONATION_URL";
const VIDEO_PLACEHOLDER = "REPLACE_WITH_OFFICIAL_VIDEO_URL";

export const campaign = {
  targetAmount: 47000,
  raisedAmount: 0,
  donorCount: 0,
  donationUrl:
    process.env.NEXT_PUBLIC_DONATION_URL?.trim() || DONATION_PLACEHOLDER,
  donationAmountParam: "",
  videoUrl: process.env.NEXT_PUBLIC_VIDEO_URL?.trim() || VIDEO_PLACEHOLDER,
  videoPoster: "/images/video-poster.webp",
  contactPhone: "REPLACE_WITH_CONTACT_PHONE",
  contactWhatsapp: "REPLACE_WITH_WHATSAPP_NUMBER",
  nonprofitName: "REPLACE_WITH_NONPROFIT_NAME",
  nonprofitNumber: "REPLACE_WITH_NONPROFIT_NUMBER",
  taxDeductible: false,
} as const;

export const campaignPlaceholders = {
  donationUrl: DONATION_PLACEHOLDER,
  videoUrl: VIDEO_PLACEHOLDER,
} as const;

export function isConfigured(value: string, placeholderPrefix = "REPLACE_WITH_") {
  return Boolean(value && !value.startsWith(placeholderPrefix));
}

export function isValidExternalUrl(value: string) {
  if (!isConfigured(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export const campaignProgress = Math.min(
  100,
  Math.max(0, (campaign.raisedAmount / campaign.targetAmount) * 100),
);

export const formatIls = (amount: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(amount);
