import { DonationLink } from "@/components/DonationLink";
import { CampaignProgress } from "@/components/Progress";
import { SectionContainer } from "@/components/SectionContainer";
import {
  campaign,
  formatIls,
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
              aria-label="יעד הגיוס ופרטי האמון בקמפיין"
            >
              <div className="transparency-goal">
                <span>יעד הקמפיין</span>
                <strong>{formatIls(campaign.targetAmount)}</strong>
              </div>

              <p className="transparency-target-explanation">
                הסכום שיגויס ישמש לחיזוק הפלוגה בשלושת התחומים שהוגדרו.
              </p>

              <CampaignProgress variant="target-card" />

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

        </div>
      </SectionContainer>
    </section>
  );
}
