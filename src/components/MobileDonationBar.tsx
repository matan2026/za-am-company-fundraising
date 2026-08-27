import { DonationLink } from "@/components/DonationLink";

export function MobileDonationBar() {
  return (
    <aside className="mobile-donation-bar" aria-label="תרומה מהירה">
      <DonationLink className="button button-small">תרמו עכשיו</DonationLink>
    </aside>
  );
}
