"use client";

import { campaign, isConfigured } from "@/config/campaign";
import { trackEvent } from "@/lib/analytics";

export function ContactActions() {
  const hasPhone = isConfigured(campaign.contactPhone);
  const hasWhatsapp = isConfigured(campaign.contactWhatsapp);
  const whatsappMessage = encodeURIComponent(
    "היי, הגעתי דרך דף הגיוס של פלוגת \"זעם\" ואשמח לקבל פרטים נוספים.",
  );

  if (!hasPhone && !hasWhatsapp) return null;

  return (
    <>
      <div className="contact-actions">
        {hasPhone ? (
          <a href={`tel:${campaign.contactPhone}`} onClick={() => trackEvent("phone_click")}>
            טלפון: <bdi>{campaign.contactPhone}</bdi>
          </a>
        ) : null}
        {hasWhatsapp ? (
          <a
            href={`https://wa.me/${campaign.contactWhatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click")}
          >
            WhatsApp
          </a>
        ) : null}
      </div>
      {hasWhatsapp ? (
        <a
          className="whatsapp-float"
          href={`https://wa.me/${campaign.contactWhatsapp}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="יצירת קשר עם צוות הקמפיין ב-WhatsApp"
          onClick={() => trackEvent("whatsapp_click")}
        >
          WA
        </a>
      ) : null}
    </>
  );
}
