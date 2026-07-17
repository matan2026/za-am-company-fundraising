import type { Metadata } from "next";
import Image from "next/image";
import { needIcons, type NeedIconName } from "@/components/NeedIcons";
import {
  NativeShareButton,
  ReturnToCampaignLink,
  ShareActions,
  ThankYouPageView,
} from "@/components/ThankYouActions";
import { SectionContainer } from "@/components/SectionContainer";
import { campaignAssets } from "@/config/assets";
import { siteUrl } from "@/config/site";
import { existingAsset } from "@/lib/public-assets";

const campaignUrl = `${siteUrl}/`;

export const metadata: Metadata = {
  title: 'תודה על התרומה | פלוגת זעם',
  description:
    'תודה שבחרתם לעמוד לצד לוחמי פלוגת זעם ולחזק את הציוד, החוסן והתמיכה בלוחמים.',
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'תודה שאתם איתנו בקו | פלוגת זעם',
    description: 'תודה שבחרתם לעמוד לצד לוחמי פלוגת זעם.',
    locale: "he_IL",
    type: "website",
  },
};

const supportAreas: Array<{ icon: NeedIconName; title: string; text: string }> = [
  {
    icon: "protection",
    title: "מיגון וציוד אישי",
    text: "ציוד שמאפשר ללוחמים לפעול בצורה בטוחה ומקצועית יותר.",
  },
  {
    icon: "resilience",
    title: "חוסן ולכידות",
    text: "תמיכה שמחזקת את האנשים שמאחורי המדים.",
  },
  {
    icon: "logistics",
    title: "תמיכה לוגיסטית",
    text: "סיוע שמקל על ימי הכוננות והפעילות הממושכים.",
  },
];

export default function ThankYouPage() {
  const unitImage = existingAsset(campaignAssets.storyImage);

  return (
    <main id="main-content" className="thank-you-page" tabIndex={-1}>
      <ThankYouPageView />

      <section className="thank-you-hero section-dark" aria-labelledby="thank-you-title">
        <SectionContainer className="thank-you-hero-inner">
          <p className="eyebrow">פלוגת &quot;זעם&quot; | גדוד 7421 | חטיבה 4</p>
          <h1 id="thank-you-title">תודה שאתם איתנו בקו</h1>
          <p className="thank-you-hero-lead">
            התרומה שלכם היא הרבה יותר מסכום כספי. היא מעניקה ללוחמים ציוד, חוסן ותחושה עמוקה שהם לא לבד.
          </p>
          <p className="thank-you-highlight">כל שקל הופך לתמיכה אמיתית בחיילים 🤍</p>
          <div className="thank-you-hero-actions">
            <ReturnToCampaignLink className="button button-large" />
            <NativeShareButton campaignUrl={campaignUrl} className="button-outline" />
          </div>
        </SectionContainer>
      </section>

      <section className="thank-you-section thank-you-story" aria-labelledby="thank-you-story-title">
        <SectionContainer className="thank-you-reading">
          <h2 id="thank-you-story-title">הפכתם לחלק מהכוח שלנו</h2>
          <div className="thank-you-prose">
            <p>
              מאז 8 באוקטובר 2023 לוחמי פלוגת &quot;זעם&quot; עוזבים שוב ושוב את הבית, את העבודה ואת המשפחות ומתייצבים בכל מקום שבו מדינת ישראל זקוקה להם.
            </p>
            <p>
              התרומה שלכם מסייעת לחזק את המיגון והציוד האישי, את החוסן והלכידות הפלוגתית ואת התמיכה הלוגיסטית בימי הכוננות והפעילות.
            </p>
            <p>
              השותפות שלכם מזכירה ללוחמים שיש מי שעומד מאחוריהם, מאמין בהם ומחכה שיחזרו הביתה בשלום.
            </p>
          </div>
          <blockquote className="thank-you-quote">
            <p>אנחנו עושים את שלנו בחזית.</p>
            <p>אתם נותנים לנו את הכוח להמשיך.</p>
          </blockquote>
        </SectionContainer>
      </section>

      <section className="thank-you-section thank-you-support" aria-labelledby="thank-you-support-title">
        <SectionContainer>
          <div className="thank-you-section-heading">
            <p className="eyebrow eyebrow-dark">השותפות שלכם</p>
            <h2 id="thank-you-support-title">התמיכה שמחזקת את הפלוגה</h2>
          </div>
          <div className="thank-you-support-grid">
            {supportAreas.map((area) => (
              <SupportCard key={area.title} {...area} />
            ))}
          </div>
        </SectionContainer>
      </section>

      {unitImage ? (
        <section className="thank-you-image-section" aria-label="תמונה מאושרת של לוחמי הפלוגה">
          <SectionContainer>
            <figure className="thank-you-unit-image">
              <Image
                src={unitImage.src}
                alt={unitImage.alt}
                width={unitImage.width}
                height={unitImage.height}
                sizes="(max-width: 767px) calc(100vw - 40px), min(1040px, 100vw - 64px)"
                loading="lazy"
                style={{ objectPosition: unitImage.objectPosition }}
              />
            </figure>
          </SectionContainer>
        </section>
      ) : null}

      <section className="thank-you-memorial" aria-label="לזכר אוריאל אביעד סילברמן זכרונו לברכה">
        <SectionContainer>
          <p>
            אנו נושאים בליבנו את זכרו של אחינו לנשק, אוריאל אביעד סילברמן ז״ל, ומחזקים את חברינו שנפצעו וממשיכים בתהליך השיקום.
          </p>
        </SectionContainer>
      </section>

      <section className="thank-you-section thank-you-sharing" aria-labelledby="thank-you-sharing-title">
        <SectionContainer className="thank-you-sharing-inner">
          <h2 id="thank-you-sharing-title">עזרו לנו להגיע לעוד שותפים</h2>
          <p>
            שיתוף אחד יכול להגיע לאדם נוסף שיבחר לעמוד לצד הלוחמים.
          </p>
          <ShareActions campaignUrl={campaignUrl} />
        </SectionContainer>
      </section>

      <section className="thank-you-closing section-dark" aria-labelledby="thank-you-closing-title">
        <SectionContainer className="thank-you-closing-inner">
          <h2 id="thank-you-closing-title">בהערכה עמוקה ובציפייה לימים שקטים</h2>
          <p className="thank-you-signature">לוחמי פלוגת &quot;זעם&quot;</p>
          <ReturnToCampaignLink className="button button-light button-large" />
        </SectionContainer>
      </section>
    </main>
  );
}

function SupportCard({ icon, title, text }: (typeof supportAreas)[number]) {
  const Icon = needIcons[icon];

  return (
    <article className="thank-you-support-card">
      <span className="thank-you-support-icon" aria-hidden="true">
        <Icon />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
