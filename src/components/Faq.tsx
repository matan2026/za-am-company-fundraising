"use client";

import { useState } from "react";
import { campaign, isConfigured } from "@/config/campaign";

const taxDeductionVerified =
  campaign.taxDeductible &&
  isConfigured(campaign.nonprofitName) &&
  isConfigured(campaign.nonprofitNumber);

const faqs = [
  {
    question: "לאן מועברות התרומות?",
    answer:
      "התרומות ישמשו לרכישת ציוד ומיגון אישי, חיזוק החוסן והלכידות הפלוגתית ותמיכה לוגיסטית בלוחמים במהלך ימי הכוננות והפעילות.",
  },
  {
    question: "מהו יעד הגיוס?",
    answer: "יעד הקמפיין הוא 47,000 ₪.",
  },
  {
    question: "האם התרומה מאובטחת?",
    answer:
      "כן. התרומה מתבצעת בעמוד הסליקה המאובטח של Grow, באמצעות הקישור הרשמי של הקמפיין.",
  },
  {
    question: "האם התרומה מוכרת לצורכי מס?",
    answer: taxDeductionVerified
      ? "כן. התרומה מוכרת לצורכי מס בהתאם לסעיף 46, באמצעות הגוף המפעיל את הקמפיין."
      : "פרטי ההכרה לצורכי מס יעודכנו בהתאם לגוף המפעיל את הקמפיין.",
  },
  {
    question: "האם אפשר לתרום עבור צורך מסוים?",
    answer:
      "התרומות מחולקות בהתאם לצרכים העדכניים של הפלוגה ולסדרי העדיפויות שנקבעים במהלך הקמפיין.",
  },
  {
    question: "אפשר לסייע גם בדרך אחרת?",
    answer:
      "כן. לאחר שיוגדרו פרטי הקשר המאושרים, ניתן יהיה ליצור קשר עם צוות הקמפיין באמצעות הטלפון או WhatsApp שיופיעו באתר.",
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
            {faq.question}
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
