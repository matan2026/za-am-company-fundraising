"use client";

import { donationAmounts } from "@/config/campaign-en";

export function DonationAmountSelector({
  selectedAmount,
  onSelect,
}: {
  selectedAmount: number | "custom" | null;
  onSelect: (amount: number | "custom") => void;
}) {
  return (
    <div
      className="amount-grid"
      role="group"
      aria-label="Choose a donation amount"
    >
      {donationAmounts.map((option) => {
        const analyticsAmount = option.amount ?? "custom";

        return (
          <button
            type="button"
            key={option.label}
            className={`amount-option${option.amount === null ? " amount-other" : ""}${selectedAmount === analyticsAmount ? " is-selected" : ""}`}
            aria-pressed={selectedAmount === analyticsAmount}
            aria-label={`${option.label} - ${option.title}. ${option.description}`}
            onClick={() => onSelect(analyticsAmount)}
          >
            <strong>{option.label}</strong>
            <span className="amount-option-title">{option.title}</span>
            <span className="amount-option-description">{option.description}</span>
          </button>
        );
      })}
    </div>
  );
}
