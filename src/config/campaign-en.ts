const OFFICIAL_DONATION_URL =
  "https://secured.israelgives.org/pay/makedonation?MakeDonation=1&AmutaGovId=580502086";

export const donationAmounts = [
  {
    amount: 180,
    label: "₪180",
    title: "Support for families and the home front",
    description:
      "Helps fund welfare activities, holiday packages for soldiers' families, and support for the company's home front.",
  },
  {
    amount: 360,
    label: "₪360",
    title: "Shabbat treats for a combat platoon",
    description:
      "Helps provide treats that lift the spirits of soldiers spending Shabbat on reserve duty.",
  },
  {
    amount: 750,
    label: "₪750",
    title: "Half a tactical uniform set (shirt/pants)",
    description:
      "A meaningful contribution toward fire-resistant tactical clothing that protects soldiers and saves lives.",
  },
  {
    amount: 1500,
    label: "₪1,500",
    title: "One soldier protected and ready - full tactical set",
    description:
      "Funds a complete tactical uniform set for one armored-corps soldier, designed for long weeks of combat inside and outside the tank.",
  },
  {
    amount: 6000,
    label: "₪6,000",
    title: "Equipment for an entire tank crew",
    description:
      "Equips a full tank crew - commander, gunner, loader, and driver - with complete tactical sets for the current deployment.",
  },
  {
    amount: 9000,
    label: "₪9,000",
    title: "Strategic partnership with the company",
    description:
      "Funds tactical uniforms for six soldiers or a full company resilience evening to process combat experiences.",
  },
  {
    amount: null,
    label: "Other amount",
    title: "Choose the amount that works for you",
    description: "Every donation strengthens the company and its soldiers.",
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
  donationUrl: OFFICIAL_DONATION_URL,
  donationAmountParam: "sum",
  videoFile: "/videos/za-am-hero-video-v2.mp4",
  videoPoster: "/images/video-poster.webp",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "",
  contactWhatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "",
  contactWhatsappMessage:
    "Hi, I came through the Za'am Company fundraising page and would like more information.",
  nonprofitName: "Hasdei Eran Association",
  nonprofitNumber: "580502086",
  // Verified Section 46 eligibility for the operating nonprofit through 2026-12-31.
  taxDeductible: true,
  transparency: {
    title: "Transparency comes first",
    fundingStatement:
      "Donation funds strengthen the company in three key areas: personal equipment, company resilience and cohesion, and support for the home front.",
    fundingAreas: [
      {
        title: "Personal equipment",
        description: "Helmets, tactical uniforms, and personal equipment individually fitted for operational activity.",
      },
      {
        title: "Company resilience and cohesion",
        description:
          "Platoon and company gatherings that let us pause, process a difficult period, strengthen the bond between soldiers, and recharge for the next mission.",
      },
      {
        title: "Support for the company home front",
        description:
          "Support for soldiers' families and children, and help for reservists facing career hardship because of extended service.",
      },
    ],
    paymentProvider: "IsraelGives",
    securePaymentMessage:
      "Payment is completed on IsraelGives' secure donation page.",
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
  new Intl.NumberFormat("en-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(amount);
