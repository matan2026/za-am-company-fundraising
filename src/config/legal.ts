export const legalConfig = {
  // Use an approved ISO date (YYYY-MM-DD). Leave empty until the policy is reviewed.
  privacyLastUpdated: "",
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
