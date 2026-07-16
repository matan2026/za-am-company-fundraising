import type { Metadata, Viewport } from "next";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { siteUrl } from "@/config/site";
import "./globals.css";

const title = "מחזקים את פלוגת \"זעם\" | גיוס ציוד וחוסן ללוחמי המילואים";
const description =
  "פלוגת \"זעם\" מגדוד 7421 בחטיבה 4 מגייסת 47,000 ₪ עבור ציוד מציל חיים, חוסן פלוגתי ותמיכה לוגיסטית. הצטרפו וחזקו את הלוחמים.";

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
    images: [
      {
        url: "/images/og-cover.webp",
        width: 1200,
        height: 630,
        alt: "מחזקים את לוחמי פלוגת זעם",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "פלוגת \"זעם\" צריכה אתכם איתה בקו",
    description:
      "עזרו לנו לרכוש ציוד מציל חיים, לחזק את החוסן הפלוגתי ולתמוך בלוחמים.",
    images: ["/images/og-cover.webp"],
  },
  icons: { icon: "/images/unit-emblem-placeholder.webp" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1d241f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <a className="skip-link" href="#main-content">
          דילוג לתוכן הראשי
        </a>
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
