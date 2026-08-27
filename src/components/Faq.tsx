"use client";

import { useState } from "react";
import { campaign, isConfigured } from "@/config/campaign";

const taxDeductionVerified =
  campaign.taxDeductible &&
  isConfigured(campaign.nonprofitName) &&
  isConfigured(campaign.nonprofitNumber);

const faqs = [
  {
    question: "Where do the donations go?",
    answer:
      "Donations fund personal equipment, company resilience and cohesion, and support for the soldiers' families and children.",
  },
  {
    question: "Is my donation secure?",
    answer:
      "Yes. Payment is completed on the secure IsraelGives donation page through the campaign's official link.",
  },
  {
    question: "Is the donation tax deductible?",
    answer: taxDeductionVerified
      ? "All donations are tax deductible in Israel under Section 46."
      : "Tax-deduction details will be updated according to the organization operating the campaign.",
  },
  {
    question: "Can I donate toward a specific need?",
    answer:
      "Donations are allocated according to the company's current needs and the priorities set throughout the campaign.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {faqs.map((faq, index) => (
        <details
          key={faq.question}
          open={openIndex === index}
          onToggle={(event) => {
            if (event.currentTarget.open) {
              setOpenIndex(index);
              return;
            }

            setOpenIndex((current) => (current === index ? null : current));
          }}
        >
          <summary
            id={`faq-question-${index}`}
            aria-controls={`faq-answer-${index}`}
            aria-expanded={openIndex === index}
          >
            <span>{faq.question}</span>
            <span className="faq-icon" aria-hidden="true">
              {openIndex === index ? "−" : "+"}
            </span>
          </summary>
          <div
            className="faq-answer"
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
          >
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
