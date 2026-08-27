"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import type { AnalyticsEvent } from "@/lib/analytics";

type DonationLinkProps = {
  children: ReactNode;
  className?: string;
  amount?: number | "custom";
  sectionFallback?: boolean;
  ariaLabel?: string;
  onNavigate?: () => void;
  newTab?: boolean;
  trackingEvent?: AnalyticsEvent;
};

export function DonationLink({
  children,
  className = "",
  amount,
  ariaLabel,
  onNavigate,
  trackingEvent,
}: DonationLinkProps) {
  return (
    <Link
      href="/#donation-form"
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        onNavigate?.();
        const eventParameters = {
          ...(amount !== undefined ? { amount } : {}),
          donation_configured: true,
        };
        trackEvent("scroll_to_donation", eventParameters);
        if (trackingEvent) trackEvent(trackingEvent, eventParameters);
        if (amount !== undefined) {
          trackEvent("donation_amount_selected", { amount });
        }
      }}
    >
      {children}
      {!ariaLabel ? (
        <span className="sr-only">
          {" "}- opens the donation form
        </span>
      ) : null}
    </Link>
  );
}
