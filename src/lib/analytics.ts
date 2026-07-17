export type AnalyticsEvent =
  | "donate_click"
  | "donation_amount_selected"
  | "payment_page_open"
  | "video_play"
  | "whatsapp_click"
  | "phone_click"
  | "gallery_interaction"
  | "scroll_to_donation"
  | "thank_you_page_view"
  | "share_whatsapp"
  | "share_facebook"
  | "copy_campaign_link"
  | "return_to_campaign";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  parameters: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({ event, ...parameters });
  window.fbq?.("trackCustom", event, parameters);
}
