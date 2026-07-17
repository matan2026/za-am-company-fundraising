"use client";

import { DonationLink } from "@/components/DonationLink";
import { donationAmounts } from "@/config/campaign";

export function DonationAmountSelector() {
  return (
    <div
      className="amount-grid"
      role="group"
      aria-label="בחירת סכום לתרומה"
    >
      {donationAmounts.map((option) => {
        const analyticsAmount = option.amount ?? "custom";

        return (
          <DonationLink
            key={option.label}
            className={`amount-option${option.amount === null ? " amount-other" : ""}`}
            amount={analyticsAmount}
            sectionFallback={false}
          >
            <strong dir="rtl">{option.label}</strong>
            <span>{option.description}</span>
          </DonationLink>
        );
      })}
    </div>
  );
}
