const OFFICIAL_DONATION_URL =
  "https://pay.grow.link/NDcyMTg~43ba563f25afc399352a239f7225899e-MzcwOTE2Mw";

export const donationAmounts = [
  {
    amount: 180,
    label: "180 ₪",
    description: "מעניקים גב ללוחמים שנמצאים בחזית",
  },
  {
    amount: 360,
    label: "360 ₪",
    description: "מחזקים את הפלוגה ושומרים על הלוחמים",
  },
  {
    amount: 540,
    label: "540 ₪",
    description: "שותפים אמיתיים לציוד, חוסן וביטחון",
  },
  {
    amount: 1800,
    label: "1,800 ₪",
    description: "מעניקים ללוחמים מעטפת שמצילה חיים",
  },
  {
    amount: 3600,
    label: "3,600 ₪",
    description: "הופכים לחלק משמעותי מהכוח שלנו",
  },
  {
    amount: 5400,
    label: "5,400 ₪",
    description: "מחזקים פלוגה שלמה בשטח ובכוננות",
  },
  {
    amount: 9000,
    label: "9,000 ₪",
    description: "מעניקים ביטחון אמיתי ללוחמי הפלוגה",
  },
  {
    amount: null,
    label: "סכום אחר",
    description: "כל תרומה מחזקת אותנו",
  },
] as const;

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
  videoFile: "/videos/za-am-hero-video.mp4",
  videoPoster: "/images/video-poster.webp",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "",
  contactWhatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "",
  contactWhatsappMessage:
    "היי, הגעתי דרך דף הגיוס של פלוגת זעם ואשמח לקבל פרטים נוספים.",
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
  const normalized = value.trim().toUpperCase();
  return Boolean(
    normalized &&
      !normalized.startsWith(placeholderPrefix) &&
      !normalized.includes("PASTE") &&
      !normalized.includes("PLACEHOLDER"),
  );
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
