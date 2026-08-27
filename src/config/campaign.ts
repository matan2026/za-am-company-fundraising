const OFFICIAL_DONATION_URL =
  "https://pay.grow.link/NDcyMTg~43ba563f25afc399352a239f7225899e-MzcwOTE2Mw";

export const donationAmounts = [
  {
    amount: 180,
    label: "180 ₪",
    title: "תמיכה בעורף והמשפחות",
    description:
      "סיוע במימון פעילויות רווחה, מארזים לחגים למשפחות הלוחמים, וחיזוק העורף הפלוגתי.",
  },
  {
    amount: 360,
    label: "360 ₪",
    title: "פינוקים לשבת למחלקת לוחמים",
    description:
      "סיוע ברכישת תפנוקים המרימים את רוחם של הלוחמים אשר נמצאים במהלך השבתות במילואים.",
  },
  {
    amount: 750,
    label: "750 ₪",
    title: "חצי סט ציוד טקטי (חולצה/מכנס)",
    description:
      "השתתפות משמעותית ברכישת ציוד הלחימה ללוחם, המאפשרת לקנות חולצה ומכנסיים טקטיים העמידים לאש ומצילים חיים.",
  },
  {
    amount: 1500,
    label: "1,500 ₪",
    title: "לוחם מוגן ומוכן - סט טקטי מלא",
    description:
      "אתם רוכשים במלואו סט מדים טקטיים קומפלט ללוחם שריון אחד, המותאם לשבועות ארוכים של לחימה בתוך הטנק ומחוצה לו.",
  },
  {
    amount: 6000,
    label: "6,000 ₪",
    title: "מעטפת ציוד לצוות טנק שלם",
    description:
      "מציידים צוות טנק מלא (מפקד, תותחן, טען ונהג) בסטים טקטיים קומפלט כבר בלחימה הנוכחית.",
  },
  {
    amount: 9000,
    label: "9,000 ₪",
    title: "שותפות פלוגתית אסטרטגית",
    description:
      "רכישת מדים טקטיים ל-6 לוחמים, או מימון מלא של ערב חוסן פלוגתי משמעותי לעיבוד חוויות הלחימה.",
  },
  {
    amount: null,
    label: "סכום אחר",
    title: "בחרו את הסכום שמתאים לכם",
    description: "כל תרומה מחזקת את הפלוגה ואת לוחמיה.",
  },
] as const;

export const campaign = {
  targetAmount: 47000,
  raisedAmount: 0,
  donorCount: 0,
  totalsVerified: false,
  campaignProgressStartDate: "2026-08-03T00:00:00+03:00",
  campaignProgressStartPercent: 5,
  campaignProgressDaysPerIncrease: 3,
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
