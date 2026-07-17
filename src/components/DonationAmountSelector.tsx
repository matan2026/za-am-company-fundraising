"use client";

import { useState } from "react";
import { DonationLink } from "@/components/DonationLink";
import { donationAmounts } from "@/config/campaign";

type SelectedAmount = number | "custom" | null;

export function DonationAmountSelector() {
  const [selectedAmount, setSelectedAmount] = useState<SelectedAmount>(null);

  return (
    <div className="amount-grid" aria-label="בחירת סכום לתרומה">
      {donationAmounts.map((option) => {
        const analyticsAmount = option.amount ?? "custom";
        const isSelected = selectedAmount === analyticsAmount;

        return (
          <DonationLink
            key={option.label}
            className={`amount-option${option.amount === null ? " amount-other" : ""}${isSelected ? " is-selected" : ""}`}
            amount={analyticsAmount}
            sectionFallback={false}
            selected={isSelected}
            onFocus={() => setSelectedAmount(analyticsAmount)}
            onPointerDown={() => setSelectedAmount(analyticsAmount)}
            onNavigate={() => setSelectedAmount(analyticsAmount)}
          >
            <strong dir="rtl">{option.label}</strong>
            <span>{option.description}</span>
          </DonationLink>
        );
      })}
    </div>
  );
}
