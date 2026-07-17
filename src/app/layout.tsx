import type { Metadata, Viewport } from "next";
import { Heebo, Rubik } from "next/font/google";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { campaignAssets } from "@/config/assets";
import { siteUrl } from "@/config/site";
import { existingAsset } from "@/lib/public-assets";
import "./globals.css";

const title = "מחזקים את פלוגת \"זעם\" | גיוס ציוד וחוסן ללוחמי המילואים";
const description =
  "פלוגת \"זעם\" מגדוד 7421 בחטיבה 4 מגייסת 47,000 ₪ עבור ציוד מציל חיים, חוסן פלוגתי ותמיכה לוגיסטית. הצטרפו וחזקו את הלוחמים.";
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
  applicationName: "מחזקים את פלוגת זעם",
  alternates: { canonical: "/" },
  openGraph: {
    title: "פלוגת \"זעם\" צריכה אתכם איתה בקו",
    description:
      "עזרו לנו לרכוש ציוד מציל חיים, לחזק את החוסן הפלוגתי ולתמוך בלוחמים שממשיכים להתייצב מאז אוקטובר 2023.",
    locale: "he_IL",
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
    title: "פלוגת \"זעם\" צריכה אתכם איתה בקו",
    description:
      "עזרו לנו לרכוש ציוד מציל חיים, לחזק את החוסן הפלוגתי ולתמוך בלוחמים.",
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
    <html lang="he" dir="rtl" className={`${heebo.variable} ${rubik.variable}`}>
      <body className={`${heebo.variable} ${rubik.variable}`}>
        <a className="skip-link" href="#main-content">
          דילוג לתוכן המרכזי
        </a>
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
