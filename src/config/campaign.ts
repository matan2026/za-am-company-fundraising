const OFFICIAL_DONATION_URL =
  "https://pay.grow.link/NDcyMTg~43ba563f25afc399352a239f7225899e-MzcwOTE2Mw";

export const campaign = {
  targetAmount: 47000,
  raisedAmount: 0,
  donorCount: 0,
  totalsVerified: false,
  donationUrl:
    process.env.NEXT_PUBLIC_DONATION_URL?.trim() || OFFICIAL_DONATION_URL,
  donationAmountParam: "",
  // Grow restricts frame-ancestors to grow.website, so Vercel cannot embed it.
  paymentEmbeddingAllowed: false,
  videoUrl: process.env.NEXT_PUBLIC_VIDEO_URL?.trim() || "",
  contactPhone: "",
  contactWhatsapp: "",
  nonprofitName: "",
  nonprofitNumber: "",
  // Set to true only after the operating nonprofit confirms Section 46 eligibility.
  taxDeductible: false,
  transparency: {
    title: "שקיפות לפני הכול",
    fundingStatement:
      "כספי התרומות מיועדים לחיזוק הפלוגה בשלושה תחומים מרכזיים: ציוד ומיגון אישי, חוסן ולכידות פלוגתית ותמיכה לוגיסטית במהלך ימי הכוננות והפעילות.",
    allocationNote:
      "החלוקה הסופית תיקבע בהתאם לצרכים המבצעיים, לסדרי העדיפויות ולסכום שיגויס בפועל.",
    fundingAreas: [
      "ציוד ומיגון אישי",
      "חוסן ולכידות פלוגתית",
      "תמיכה לוגיסטית",
    ],
    allocationStatus: "הסכום ייקבע בהתאם לצורך",
    paymentProvider: "Grow",
    securePaymentMessage:
      "התרומה מתבצעת באמצעות עמוד סליקה מאובטח.",
    contactHeading: "יש לכם שאלות על הקמפיין?",
    contactText:
      "צוות הקמפיין זמין להשיב על שאלות בנוגע ליעד הגיוס, לשימוש בכספים ולדרכי התרומה.",
  },
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
