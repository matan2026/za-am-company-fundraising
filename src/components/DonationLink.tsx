"use client";

import type { ReactNode } from "react";
import { campaign, isValidExternalUrl } from "@/config/campaign";
import { trackEvent } from "@/lib/analytics";

type DonationLinkProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
  sectionFallback?: boolean;
  ariaLabel?: string;
  onNavigate?: () => void;
};

function donationHref(amount?: number) {
  if (!isValidExternalUrl(campaign.donationUrl)) return null;
  const url = new URL(campaign.donationUrl);
  if (amount && campaign.donationAmountParam) {
    url.searchParams.set(campaign.donationAmountParam, String(amount));
  }
  return url.toString();
}

export function DonationLink({
  children,
  className = "",
  amount,
  sectionFallback = true,
  ariaLabel,
  onNavigate,
}: DonationLinkProps) {
  const href = donationHref(amount);

  if (!href && !sectionFallback) {
    return (
      <button
        type="button"
        className={`${className} is-disabled`}
        disabled
        aria-label={`${ariaLabel || "תרומה"} — קישור התרומה טרם הוגדר`}
        title="קישור התרומה הרשמי טרם הוגדר"
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href || "#donation"}
      className={className}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      onClick={() => {
        onNavigate?.();
        trackEvent(href ? "donate_click" : "scroll_to_donation", {
          ...(amount ? { amount } : {}),
          donation_configured: Boolean(href),
        });
        if (amount) trackEvent("donation_amount_select", { amount });
      }}
    >
      {children}
    </a>
  );
}
