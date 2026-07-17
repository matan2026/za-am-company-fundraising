import { DonationLink } from "@/components/DonationLink";

export function PaymentEmbed() {
  return (
    <div className="payment-fallback">
      <div className="payment-fallback-copy">
        <span className="payment-lock" aria-hidden="true">🔒</span>
        <p>עמוד התרומה המאובטח ייפתח בחלון נפרד.</p>
      </div>
      <DonationLink
        className="button button-large"
        ariaLabel="פתיחת עמוד התרומה המאובטח של Grow בחלון חדש"
        newTab
        trackingEvent="payment_fallback_click"
      >
        פתיחת עמוד התרומה
      </DonationLink>
    </div>
  );
}
