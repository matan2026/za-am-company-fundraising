"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type ShareProps = {
  campaignUrl: string;
};

const shareMessage = (campaignUrl: string) =>
  `גם אני בחרתי לחזק את לוחמי פלוגת "זעם". מוזמנים להצטרף ולעמוד איתם בקו: ${campaignUrl}`;

async function copyCampaignLink(campaignUrl: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(campaignUrl);
    return true;
  }

  const textArea = document.createElement("textarea");
  textArea.value = campaignUrl;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();
  return copied;
}

export function ReturnToCampaignLink({ className }: { className: string }) {
  return (
    <Link className={className} href="/" onClick={() => trackEvent("return_to_campaign")}>
      חזרה לעמוד הקמפיין
    </Link>
  );
}

export function NativeShareButton({ campaignUrl, className }: ShareProps & { className: string }) {
  const [feedback, setFeedback] = useState("");

  const shareCampaign = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'פלוגת "זעם"',
          text: shareMessage(campaignUrl),
          url: campaignUrl,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      const copied = await copyCampaignLink(campaignUrl);
      setFeedback(copied ? "קישור הקמפיין הועתק." : "אפשר להעתיק את הקישור משורת הכתובת.");
    } catch {
      setFeedback("אפשר להעתיק את הקישור משורת הכתובת.");
    }
  };

  return (
    <>
      <button className={className} type="button" onClick={shareCampaign}>
        שיתוף הקמפיין
      </button>
      <span className="visually-hidden" aria-live="polite">
        {feedback}
      </span>
    </>
  );
}

export function ShareActions({ campaignUrl }: ShareProps) {
  const [feedback, setFeedback] = useState("");
  const message = shareMessage(campaignUrl);
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}`;

  const copyLink = async () => {
    try {
      const copied = await copyCampaignLink(campaignUrl);
      setFeedback(copied ? "קישור הקמפיין הועתק ללוח." : "אפשר להעתיק את הקישור משורת הכתובת.");
      trackEvent("copy_campaign_link");
    } catch {
      setFeedback("אפשר להעתיק את הקישור משורת הכתובת.");
      trackEvent("copy_campaign_link");
    }
  };

  return (
    <div className="thank-you-share-actions">
      <a
        className="thank-you-share-button"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שיתוף הקמפיין בוואטסאפ"
        onClick={() => trackEvent("share_whatsapp")}
      >
        WhatsApp
      </a>
      <a
        className="thank-you-share-button"
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שיתוף הקמפיין בפייסבוק"
        onClick={() => trackEvent("share_facebook")}
      >
        Facebook
      </a>
      <button
        className="thank-you-share-button"
        type="button"
        onClick={copyLink}
        aria-label="העתקת קישור הקמפיין"
      >
        העתקת קישור
      </button>
      <p className="thank-you-share-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
    </div>
  );
}

export function ThankYouPageView() {
  useEffect(() => {
    trackEvent("thank_you_page_view");
  }, []);

  return null;
}
