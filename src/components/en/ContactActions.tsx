"use client";

import { campaign } from "@/config/campaign-en";
import { trackEvent } from "@/lib/analytics";
import {
  buildWhatsappUrl,
  normalizeInternationalPhone,
} from "@/lib/contact";

export function ContactActions({
  showFloating = true,
  className = "",
}: {
  showFloating?: boolean;
  className?: string;
} = {}) {
  const phone = normalizeInternationalPhone(campaign.contactPhone);
  const whatsappUrl = buildWhatsappUrl(
    campaign.contactWhatsapp,
    campaign.contactWhatsappMessage,
  );

  if (!phone && !whatsappUrl) return null;

  return (
    <>
      <div className={`contact-actions ${className}`.trim()}>
        {phone ? (
          <a
            href={`tel:${phone.e164}`}
            aria-label={`Call the campaign team at ${phone.e164}`}
            onClick={() => trackEvent("phone_click")}
          >
            Phone: <bdi>{phone.e164}</bdi>
          </a>
        ) : null}
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open a WhatsApp chat with the campaign team"
            onClick={() => trackEvent("whatsapp_click")}
          >
            WhatsApp
          </a>
        ) : null}
      </div>
      {showFloating && whatsappUrl ? (
        <a
          className="whatsapp-float"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open a WhatsApp chat with the campaign team"
          title="Contact us on WhatsApp"
          onClick={() => trackEvent("whatsapp_click")}
        >
          WA
        </a>
      ) : null}
    </>
  );
}
