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
  campaignProgressStartDate: "2026-07-17",
  campaignProgressStartPercent: 1,
  campaignProgressDailyIncrease: 1,
  campaignProgressMaxPercent: 100,
  donationUrl:
    process.env.NEXT_PUBLIC_DONATION_URL?.trim() || OFFICIAL_DONATION_URL,
  donationAmountParam: "",
  videoFile: "/videos/za-am-hero-video-v2.mp4",
  videoPoster: "/images/video-poster.webp",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "",
  contactWhatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "",
  contactWhatsappMessage:
    "היי, הגעתי דרך דף הגיוס של פלוגת זעם ואשמח לקבל פרטים נוספים.",
  nonprofitName: "עמותת חסדי ערן",
  nonprofitNumber: "580502086",
  // Verified Section 46 eligibility for the operating nonprofit through 2026-12-31.
  taxDeductible: true,
  transparency: {
    title: "שקיפות לפני הכול",
    fundingStatement:
      "כספי התרומות מיועדים לחיזוק הפלוגה בשלושה תחומים מרכזיים: ציוד אישי, חוסן ולכידות פלוגתית ותמיכה בעורף הפלוגתי.",
    fundingAreas: [
      {
        title: "ציוד אישי",
        description: "קסדות ומדים טקטיים וציוד אישי המותאם באופן אישי לפעילות מבצעית.",
      },
      {
        title: "חוסן ולכידות פלוגתית",
        description:
          "קיום ערבי מחלקה ופלוגה שמאפשרים לנו לעצור רגע, לעבד את התקופה המורכבת, לחזק את החיבור בין הלוחמים ולאגור כוחות למשימה הבאה.",
      },
      {
        title: "תמיכה בעורף הפלוגתי",
        description:
          "תמיכה במשפחות ובילדי הפלוגה ועזרה ללוחמים המתמודדים עם מצוקת קריירה עקב המילואים.",
      },
    ],
    paymentProvider: "Grow",
    securePaymentMessage:
      "התרומה מתבצעת באמצעות עמוד סליקה מאובטח.",
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

export const formatIls = (amount: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(amount);
