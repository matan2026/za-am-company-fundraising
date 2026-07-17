"use client";

import type { ReactNode } from "react";
import { campaign, isValidExternalUrl } from "@/config/campaign";
import { trackEvent } from "@/lib/analytics";

type DonationLinkProps = {
  children: ReactNode;
  className?: string;
  amount?: number | "custom";
  sectionFallback?: boolean;
  ariaLabel?: string;
  onNavigate?: () => void;
  onFocus?: () => void;
  onPointerDown?: () => void;
  newTab?: boolean;
  selected?: boolean;
};

function donationHref(amount?: number | "custom") {
  if (!isValidExternalUrl(campaign.donationUrl)) return null;
  const url = new URL(campaign.donationUrl);
  if (typeof amount === "number" && campaign.donationAmountParam) {
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
  onFocus,
  onPointerDown,
  newTab = false,
  selected = false,
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
      target={href && newTab ? "_blank" : undefined}
      rel={href && newTab ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      aria-current={selected ? "true" : undefined}
      data-selected={selected ? "true" : undefined}
      onFocus={onFocus}
      onPointerDown={onPointerDown}
      onClick={() => {
        onNavigate?.();
        const eventParameters = {
          ...(amount !== undefined ? { amount } : {}),
          donation_configured: Boolean(href),
        };
        trackEvent(href ? "donate_click" : "scroll_to_donation", eventParameters);
        if (href) trackEvent("payment_page_open", eventParameters);
        if (amount !== undefined) {
          trackEvent("donation_amount_selected", { amount });
        }
      }}
    >
      {children}
    </a>
  );
}
