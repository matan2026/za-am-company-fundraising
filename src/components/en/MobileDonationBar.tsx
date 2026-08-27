import { DonationLink } from "@/components/en/DonationLink";

export function MobileDonationBar() {
  return (
    <aside className="mobile-donation-bar" aria-label="Quick donation">
      <DonationLink className="button button-small">Donate now</DonationLink>
    </aside>
  );
}
