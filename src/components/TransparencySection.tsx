import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { DonationLink } from "@/components/DonationLink";
import {
  campaign,
  formatIls,
  isConfigured,
} from "@/config/campaign";

export function TransparencySection() {
  const nonprofitConfigured =
    isConfigured(campaign.nonprofitName) &&
    isConfigured(campaign.nonprofitNumber);
  const contactConfigured =
    isConfigured(campaign.contactPhone) ||
    isConfigured(campaign.contactWhatsapp);

  return (
    <section
      className="section transparency-section"
      id="transparency"
      aria-labelledby="transparency-title"
    >
      <div className="container">
        <div className="transparency-heading">
          <div>
            <p className="eyebrow eyebrow-dark">שקיפות ואחריות</p>
            <h2 id="transparency-title">{campaign.transparency.title}</h2>
          </div>
          <p className="transparency-intro">
            {campaign.transparency.fundingStatement}
          </p>
        </div>

        <div className="transparency-layout">
          <div
            className="transparency-areas"
            aria-label="תחומי השימוש בכספי התרומות"
          >
            {campaign.transparency.fundingAreas.map((area, index) => (
              <article className="transparency-area" key={area}>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{area}</h3>
                  <p>{campaign.transparency.allocationStatus}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="transparency-card" aria-label="פרטי אמון ואחריות בקמפיין">
            <div className="transparency-goal">
              <span>יעד הקמפיין</span>
              <strong>{formatIls(campaign.targetAmount)}</strong>
            </div>

            <p className="transparency-note">
              {campaign.transparency.allocationNote}
            </p>

            <dl className="transparency-facts">
              <div>
                <dt>סליקה מאובטחת</dt>
                <dd>
                  {campaign.transparency.securePaymentMessage} ספק הסליקה:{" "}
                  {campaign.transparency.paymentProvider}.
                </dd>
              </div>
              <div>
                <dt>נתוני הקמפיין</dt>
                <dd>
                  {campaign.totalsVerified ? (
                    <>
                      גויסו {formatIls(campaign.raisedAmount)} באמצעות {campaign.donorCount}{" "}
                      שותפים לדרך.
                    </>
                  ) : (
                    "הסכום שגויס ומספר התורמים יוצגו רק לאחר אימות הנתונים."
                  )}
                </dd>
              </div>
              {nonprofitConfigured ? (
                <div>
                  <dt>הגוף המפעיל</dt>
                  <dd>
                    {campaign.nonprofitName} · מספר גוף:{" "}
                    <bdi>{campaign.nonprofitNumber}</bdi>
                    {campaign.taxDeductible
                      ? " · התרומה מוכרת לצורכי מס בהתאם לסעיף 46."
                      : null}
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="transparency-contact">
              <h3>{campaign.transparency.contactHeading}</h3>
              <p>{campaign.transparency.contactText}</p>
              {contactConfigured ? (
                <ContactActions
                  className="contact-actions-trust"
                  showFloating={false}
                />
              ) : (
                <p className="contact-pending">
                  פרטי קשר מאושרים יעודכנו כאן. בינתיים אפשר לעיין ב־
                  <Link href="#faq">שאלות הנפוצות</Link>.
                </p>
              )}
            </div>

            <DonationLink className="button transparency-cta">
              מעבר לתרומה המאובטחת
            </DonationLink>
          </aside>
        </div>
      </div>
    </section>
  );
}
