import { DonationLink } from "@/components/en/DonationLink";
import { SectionContainer } from "@/components/SectionContainer";
import {
  campaign,
  isConfigured,
} from "@/config/campaign-en";

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
            <p className="eyebrow eyebrow-dark">Transparency and accountability</p>
            <h2 id="transparency-title">{campaign.transparency.title}</h2>
            <p className="transparency-intro">
              {campaign.transparency.fundingStatement}
            </p>
          </div>

          <div className="transparency-target-column">
            <aside
              className="transparency-card"
              aria-label="Campaign trust and accountability details"
            >
              <p className="transparency-target-explanation">
                Every amount raised will strengthen the company across the three defined areas.
              </p>

              <div className="transparency-secure-message">
                <p>Every shekel becomes real support for our soldiers.</p>
              </div>

              {nonprofitConfigured ? (
                <dl className="transparency-facts">
                  <div>
                    <dt>Operating organization</dt>
                    <dd>
                      {campaign.nonprofitName} · Organization number:{" "}
                      <bdi>{campaign.nonprofitNumber}</bdi>
                      {campaign.taxDeductible
                        ? " · Donations are tax deductible in Israel under Section 46."
                        : null}
                    </dd>
                  </div>
                </dl>
              ) : null}
            </aside>

            <div className="transparency-target-actions">
              <DonationLink className="button transparency-cta">
                Continue to secure donation
              </DonationLink>
              <p>{campaign.transparency.securePaymentMessage}</p>
            </div>
          </div>

          <div
            className="transparency-areas"
            aria-label="How donations will be used"
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
