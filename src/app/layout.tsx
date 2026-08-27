import type { Metadata, Viewport } from "next";
import { Heebo, Rubik } from "next/font/google";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { AccessibilityMenu } from "@/components/AccessibilityMenu";
import { campaignAssets } from "@/config/assets";
import { siteUrl } from "@/config/site";
import { existingAsset } from "@/lib/public-assets";
import "./globals.css";

const title = "Support Za'am Company | Equipment and Resilience for Reservists";
const description =
  "Za'am Company of Battalion 7421, Brigade 4, is raising support for personal equipment, company resilience, and the families behind its reservists.";
const socialImage = existingAsset(campaignAssets.socialImage);
const unitEmblem = existingAsset(campaignAssets.unitEmblem);

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heebo",
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Support Za'am Company",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Za'am Company Needs You With Us",
    description:
      "Help equip our soldiers, strengthen company resilience, and support the families behind the unit.",
    locale: "en_US",
    type: "website",
    images: socialImage
      ? [
          {
            url: socialImage.src,
            width: socialImage.width,
            height: socialImage.height,
            alt: socialImage.alt,
          },
        ]
      : undefined,
  },
  twitter: {
    card: socialImage ? "summary_large_image" : "summary",
    title: "Za'am Company Needs You With Us",
    description:
      "Help equip our soldiers, strengthen company resilience, and support the families behind the unit.",
    images: socialImage ? [socialImage.src] : undefined,
  },
  icons: unitEmblem ? { icon: unitEmblem.src } : undefined,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#152019",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={`${heebo.variable} ${rubik.variable}`}>
      <body className={`${heebo.variable} ${rubik.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
        <AccessibilityMenu />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
