import { DonationLink } from "@/components/DonationLink";
import { CampaignProgress } from "@/components/Progress";

export function MobileDonationBar() {
  return (
    <aside className="mobile-donation-bar" aria-label="תרומה מהירה">
      <CampaignProgress compact />
      <DonationLink className="button button-small">תרמו עכשיו</DonationLink>
    </aside>
  );
}
