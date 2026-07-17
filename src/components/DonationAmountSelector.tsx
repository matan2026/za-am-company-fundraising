"use client";

import { useState } from "react";
import { DonationLink } from "@/components/DonationLink";

type DonationOption = {
  amount: number;
  label: string;
};

export function DonationAmountSelector({
  options,
}: {
  options: readonly DonationOption[];
}) {
  const [selectedAmount, setSelectedAmount] = useState<number | "other" | null>(null);

  return (
    <div className="amount-grid" aria-label="בחירת סכום לתרומה">
      {options.map((option) => {
        const isSelected = selectedAmount === option.amount;

        return (
          <DonationLink
            key={option.amount}
            className={`amount-option${isSelected ? " is-selected" : ""}`}
            amount={option.amount}
            sectionFallback={false}
            ariaLabel={`תרומה בסך ${option.amount} שקלים — ${option.label}`}
            selected={isSelected}
            onFocus={() => setSelectedAmount(option.amount)}
            onPointerDown={() => setSelectedAmount(option.amount)}
            onNavigate={() => setSelectedAmount(option.amount)}
          >
            <strong>{option.amount.toLocaleString("he-IL")} ₪</strong>
            <span>{option.label}</span>
          </DonationLink>
        );
      })}
      <DonationLink
        className={`amount-option amount-other${selectedAmount === "other" ? " is-selected" : ""}`}
        amount="other"
        sectionFallback={false}
        ariaLabel="תרומה בסכום אחר"
        selected={selectedAmount === "other"}
        onFocus={() => setSelectedAmount("other")}
        onPointerDown={() => setSelectedAmount("other")}
        onNavigate={() => setSelectedAmount("other")}
      >
        <strong>סכום אחר</strong>
        <span>כל תרומה מחזקת</span>
      </DonationLink>
    </div>
  );
}
