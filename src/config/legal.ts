export const legalConfig = {
  // Use an approved ISO date (YYYY-MM-DD). Leave empty until the policy is reviewed.
  privacyLastUpdated: "",
  // Use an approved ISO date (YYYY-MM-DD). Leave empty until the terms are reviewed.
  termsLastUpdated: "",
  // Use an approved ISO date (YYYY-MM-DD). Leave empty until a real audit is reviewed.
  accessibilityLastUpdated: "2026-07-17",
  accessibilityKnownLimitations: [
    "למרות המאמצים לשמור על אתר נגיש, ייתכן שחלק מהתכנים החיצוניים, הסרטונים, המסמכים או עמודי הסליקה אינם נמצאים בשליטה מלאה של מפעילי האתר.",
    "אם נתקלתם ברכיב שאינו נגיש או בקושי להשתמש באתר, נשמח לקבל דיווח ולפעול לתיקון ככל האפשר.",
  ],
  // Add only a verified HTTPS link published by the external payment provider.
  paymentProviderPrivacyUrl: "",
} as const;

export function formatConfiguredDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const date = new Date(`${value}T00:00:00Z`);
  if (
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value
  ) {
    return null;
  }

  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
