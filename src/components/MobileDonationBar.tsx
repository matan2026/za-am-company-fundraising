import { DonationLink } from "@/components/DonationLink";
import { Progress } from "@/components/Progress";

export function MobileDonationBar() {
  return (
    <aside className="mobile-donation-bar" aria-label="תרומה מהירה">
      <Progress compact />
      <DonationLink className="button button-small">תרמו עכשיו</DonationLink>
    </aside>
  );
}
