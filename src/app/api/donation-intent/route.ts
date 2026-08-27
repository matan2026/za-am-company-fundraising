const MAX_AMOUNT = 1_000_000;
const REQUEST_TIMEOUT_MS = 12_000;

type DonationIntentPayload = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  amount?: unknown;
  website?: unknown;
};

function normalizedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: DonationIntentPayload;

  try {
    payload = (await request.json()) as DonationIntentPayload;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const fullName = normalizedString(payload.fullName);
  const phone = normalizedString(payload.phone);
  const email = normalizedString(payload.email).toLowerCase();
  const website = normalizedString(payload.website);
  const amount = Number(payload.amount);

  if (website) {
    return Response.json({ ok: true });
  }

  if (
    fullName.length < 2 ||
    fullName.length > 120 ||
    phone.length < 7 ||
    phone.length > 30 ||
    email.length > 254 ||
    !isValidEmail(email) ||
    !Number.isInteger(amount) ||
    amount < 1 ||
    amount > MAX_AMOUNT
  ) {
    return Response.json(
      { ok: false, error: "Please check the form details and try again." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.MAKE_DONATION_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    console.error("MAKE_DONATION_WEBHOOK_URL is not configured.");
    return Response.json(
      { ok: false, error: "The form is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        fullName,
        phone,
        email,
        amount,
        language: "EN",
        source: "Website /en",
        status: "חדש",
        emailStatus: "ממתין",
        inquiryId: crypto.randomUUID(),
        pageUrl: new URL("/en", request.url).toString(),
        notes: "",
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Make webhook returned ${response.status}.`);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Donation intent automation failed:", error);
    return Response.json(
      { ok: false, error: "We could not save your details. Please try again." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
