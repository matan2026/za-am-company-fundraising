"use client";

import { useEffect, useState } from "react";
import { DonationLink } from "@/components/DonationLink";
import { campaign } from "@/config/campaign";
import { trackEvent } from "@/lib/analytics";

type PaymentStatus = "loading" | "loaded" | "fallback";

export function PaymentEmbed() {
  const [status, setStatus] = useState<PaymentStatus>(
    campaign.paymentEmbeddingAllowed ? "loading" : "fallback",
  );

  useEffect(() => {
    if (status !== "loading") return;
    const fallbackTimer = window.setTimeout(() => setStatus("fallback"), 12000);
    return () => window.clearTimeout(fallbackTimer);
  }, [status]);

  if (status === "fallback") {
    return (
      <div className="payment-fallback">
        <div className="payment-fallback-copy">
          <span className="payment-lock" aria-hidden="true">✓</span>
          <p role="status">עמוד התרומה המאובטח ייפתח בחלון נפרד.</p>
        </div>
        <DonationLink
          className="button button-large"
          ariaLabel="פתיחת עמוד התרומה המאובטח של Grow בחלון חדש"
          newTab
          onNavigate={() => trackEvent("payment_fallback_click")}
        >
          פתיחת עמוד התרומה
        </DonationLink>
      </div>
    );
  }

  return (
    <div className="payment-embed-shell" aria-live="polite">
      {status === "loading" ? (
        <div className="payment-loading" role="status">
          <span className="payment-spinner" aria-hidden="true" />
          <p>עמוד התרומה המאובטח נטען…</p>
        </div>
      ) : null}
      <iframe
        className={`payment-frame ${status === "loading" ? "is-loading" : ""}`}
        src={campaign.donationUrl}
        title="עמוד תרומה מאובטח לפלוגת זעם"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="payment"
        loading="lazy"
        onLoad={() => {
          setStatus("loaded");
          trackEvent("payment_iframe_loaded");
        }}
        onError={() => setStatus("fallback")}
      />
    </div>
  );
}
