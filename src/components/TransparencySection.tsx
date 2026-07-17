import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { DonationLink } from "@/components/DonationLink";
import { SectionContainer } from "@/components/SectionContainer";
import {
  campaign,
  verifiedDonationProgress,
  formatIls,
  isConfigured,
} from "@/config/campaign";
import { normalizeInternationalPhone } from "@/lib/contact";

export function TransparencySection() {
  const nonprofitConfigured =
    isConfigured(campaign.nonprofitName) &&
    isConfigured(campaign.nonprofitNumber);
  const contactConfigured =
    Boolean(normalizeInternationalPhone(campaign.contactPhone)) ||
    Boolean(normalizeInternationalPhone(campaign.contactWhatsapp));

  return (
    <section
      className="section transparency-section"
      id="transparency"
      aria-labelledby="transparency-title"
    >
      <SectionContainer>
        <div className="transparency-layout">
          <div className="transparency-heading">
            <p className="eyebrow eyebrow-dark">שקיפות ואחריות</p>
            <h2 id="transparency-title">{campaign.transparency.title}</h2>
            <p className="transparency-intro">
              {campaign.transparency.fundingStatement}
            </p>
          </div>

          <div className="transparency-target-column">
            <aside
              className="transparency-card"
              aria-label="יעד הגיוס ופרטי האמון בקמפיין"
            >
              <div className="transparency-goal">
                <span>יעד הקמפיין</span>
                <strong>{formatIls(campaign.targetAmount)}</strong>
              </div>

              <p className="transparency-target-explanation">
                הסכום שיגויס ישמש לחיזוק הפלוגה בשלושת התחומים שהוגדרו.
              </p>

              <div
                className={
                  "transparency-progress " +
                  (campaign.totalsVerified ? "is-verified" : "is-neutral")
                }
              >
                {campaign.totalsVerified ? (
                  <>
                    <div className="transparency-progress-labels">
                      <span>גויסו עד כה</span>
                      <strong>{formatIls(campaign.raisedAmount)}</strong>
                    </div>
                    <div
                      className="transparency-progress-track"
                      role="progressbar"
                      aria-label="התקדמות גיוס התרומות"
                      aria-valuemin={0}
                      aria-valuemax={campaign.targetAmount}
                      aria-valuenow={campaign.raisedAmount}
                    >
                      <span style={{ width: verifiedDonationProgress + "%" }} />
                    </div>
                    <p className="transparency-donor-count">
                      {campaign.donorCount} שותפים לדרך
                    </p>
                  </>
                ) : (
                  <>
                    <div
                      className="transparency-progress-track"
                      aria-hidden="true"
                    />
                    <p>
                      הסכום שגויס ומספר התורמים יוצגו רק לאחר אימות הנתונים.
                    </p>
                  </>
                )}
              </div>

              <div className="transparency-secure-message">
                <span
                  className="transparency-secure-mark"
                  aria-hidden="true"
                />
                <p>
                  {campaign.transparency.securePaymentMessage} ספק הסליקה:{" "}
                  {campaign.transparency.paymentProvider}.
                </p>
              </div>

              {nonprofitConfigured ? (
                <dl className="transparency-facts">
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
                </dl>
              ) : null}
            </aside>

            <div className="transparency-target-actions">
              <DonationLink className="button transparency-cta">
                מעבר לתרומה המאובטחת
              </DonationLink>
              <p>{campaign.transparency.securePaymentMessage}</p>
            </div>
          </div>

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
            <p className="transparency-allocation-note">
              {campaign.transparency.allocationNote}
            </p>
          </div>

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
        </div>
      </SectionContainer>
    </section>
  );
}
