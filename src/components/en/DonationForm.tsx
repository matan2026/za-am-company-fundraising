"use client";

import { type FormEvent, useRef, useState } from "react";
import { DonationAmountSelector } from "@/components/en/DonationAmountSelector";
import { campaign } from "@/config/campaign-en";
import { trackEvent } from "@/lib/analytics";

export function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom" | null>(null);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const selectAmount = (value: number | "custom") => {
    setSelectedAmount(value);
    setAmount(value === "custom" ? "" : String(value));
    setAmountError("");
    trackEvent("donation_amount_selected", { amount: value });

    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (value === "custom") amountRef.current?.focus({ preventScroll: true });
    });
  };

  const submitDonation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount < 1) {
      setAmountError("Enter a donation amount of at least ₪1.");
      amountRef.current?.focus();
      return;
    }

    const donationUrl = new URL(campaign.donationUrl);
    donationUrl.searchParams.set(campaign.donationAmountParam, String(Math.round(numericAmount)));
    trackEvent("donation_form_submit", { amount: Math.round(numericAmount) });
    trackEvent("payment_page_open", { amount: Math.round(numericAmount) });
    window.location.assign(donationUrl.toString());
  };

  return (
    <div className="donation-form-flow">
      <DonationAmountSelector selectedAmount={selectedAmount} onSelect={selectAmount} />

      <form
        ref={formRef}
        className="donation-form"
        id="donation-form"
        onSubmit={submitDonation}
      >
        <div className="donation-form-heading">
          <h3>Your donation details</h3>
          <p>Complete the form, then continue to IsraelGives for secure payment.</p>
        </div>

        <div className="donation-form-grid">
          <label>
            <span>Full name</span>
            <input
              type="text"
              name="fullName"
              autoComplete="name"
              minLength={2}
              required
            />
          </label>

          <label>
            <span>Phone number</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              minLength={7}
              required
            />
          </label>

          <label>
            <span>Email address</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
            />
          </label>

          <label>
            <span>Donation amount</span>
            <span className="donation-amount-input">
              <span aria-hidden="true">₪</span>
              <input
                ref={amountRef}
                type="number"
                name="amount"
                min="1"
                step="1"
                inputMode="numeric"
                value={amount}
                aria-invalid={Boolean(amountError)}
                aria-describedby={amountError ? "donation-amount-error" : undefined}
                onChange={(event) => {
                  setAmount(event.target.value);
                  setSelectedAmount("custom");
                  setAmountError("");
                }}
                required
              />
            </span>
            {amountError ? (
              <span className="donation-form-error" id="donation-amount-error" role="alert">
                {amountError}
              </span>
            ) : null}
          </label>
        </div>

        <button className="button button-large donation-form-submit" type="submit">
          Continue to secure payment
        </button>
        <p className="donation-form-note">
          Payment is completed securely on IsraelGives. You may be asked to confirm your details there.
        </p>
      </form>
    </div>
  );
}
