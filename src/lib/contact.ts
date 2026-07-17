type InternationalPhone = {
  digits: string;
  e164: string;
};

export function normalizeInternationalPhone(value: string): InternationalPhone | null {
  const trimmed = value.trim();

  if (
    !trimmed ||
    /PASTE|PLACEHOLDER|REPLACE_WITH/i.test(trimmed)
  ) {
    return null;
  }

  const compact = trimmed.replace(/[\s().-]/g, "");
  const withoutPrefix = compact.startsWith("+")
    ? compact.slice(1)
    : compact.startsWith("00")
      ? compact.slice(2)
      : compact;

  if (!/^[1-9]\d{7,14}$/.test(withoutPrefix)) return null;

  return {
    digits: withoutPrefix,
    e164: `+${withoutPrefix}`,
  };
}

export function buildWhatsappUrl(number: string, message: string) {
  const normalized = normalizeInternationalPhone(number);
  if (!normalized) return null;

  const url = new URL(`https://wa.me/${normalized.digits}`);
  url.searchParams.set("text", message);
  return url.toString();
}
