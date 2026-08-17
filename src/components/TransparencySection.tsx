import { DonationLink } from "@/components/DonationLink";
import { SectionContainer } from "@/components/SectionContainer";
import {
  campaign,
  isConfigured,
} from "@/config/campaign";

export function TransparencySection() {
  const nonprofitConfigured =
    isConfigured(campaign.nonprofitName) &&
    isConfigured(campaign.nonprofitNumber);
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
              aria-label="התקדמות ופרטי האמון בקמפיין"
            >
              <p className="transparency-target-explanation">
                הסכום שיגויס ישמש לחיזוק הפלוגה בשלושת התחומים שהוגדרו.
              </p>

              <div className="transparency-secure-message">
                <p>כל שקל הופך לתמיכה אמיתית בחיילים 🤍</p>
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
              <article className="transparency-area" key={area.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </SectionContainer>
    </section>
  );
}
