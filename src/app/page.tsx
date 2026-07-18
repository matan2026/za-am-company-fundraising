import Image from "next/image";
import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { DonationLink } from "@/components/DonationLink";
import { DonationAmountSelector } from "@/components/DonationAmountSelector";
import { Faq } from "@/components/Faq";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { MobileDonationBar } from "@/components/MobileDonationBar";
import { needIcons, type NeedIconName } from "@/components/NeedIcons";
import { CampaignProgress } from "@/components/Progress";
import { SectionContainer } from "@/components/SectionContainer";
import { TransparencySection } from "@/components/TransparencySection";
import { VideoCard } from "@/components/VideoCard";
import { campaignAssets, type ApprovedImageAsset } from "@/config/assets";
import {
  campaign,
  formatIls,
  isConfigured,
} from "@/config/campaign";
import { existingAsset, existingAssets } from "@/lib/public-assets";
import { siteUrl } from "@/config/site";

const needs: Array<{
  icon: NeedIconName;
  title: string;
  text: string[];
  highlight: string;
}> = [
  {
    icon: "protection",
    title: "מיגון וציוד אישי",
    text: [
      "רכישת מדים טקטיים מעכבי בעירה, קסדות טקטיות מתקדמות וציוד אישי נוסף המותאם לפעילות המבצעית.",
      "זה אינו ציוד מותרות. מדובר בציוד שמגן על הלוחמים, משפר את יכולת התפקוד בשטח ועשוי להציל חיים.",
    ],
    highlight: "ציוד טוב יותר מאפשר לנו לפעול בביטחון רב יותר.",
  },
  {
    icon: "resilience",
    title: "חוסן ולכידות פלוגתית",
    text: [
      "קיום ערבי מחלקה ופלוגה שמאפשרים לנו לעצור לרגע, לעבד את התקופה המורכבת, לחזק את החיבור בין הלוחמים ולאגור כוחות לקראת המשימה הבאה.",
      "הלכידות שלנו היא הדבק שמחזיק את הפלוגה ואחד מסודות הכוח שלנו בשדה הקרב.",
    ],
    highlight: "כוח לוחם מתחיל באנשים שסומכים זה על זה.",
  },
  {
    icon: "logistics",
    title: "תמיכה לוגיסטית בימי כוננות",
    text: [
      "סיוע ברכישת ציוד עזר, מזון, שתייה, מוצרי נוחות וציוד נוסף לימי הכוננות הארוכים בתוך הכלים המשוריינים ובשטח.",
      "ימי הכוננות מציבים בפני הלוחמים אתגרים פיזיים ומנטליים מורכבים, והתמיכה הזו מאפשרת להם לשמור על תפקוד וריכוז לאורך זמן.",
    ],
    highlight: "גם הדברים הקטנים הופכים למשמעותיים אחרי שעות וימים בשטח.",
  },
];

function JsonLd({ videoPoster }: { videoPoster: ApprovedImageAsset | null }) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": "#organization",
      name: "פלוגת זעם — גדוד 7421, חטיבה 4",
    },
    {
      "@type": "WebPage",
      "@id": "#webpage",
      url: `${siteUrl}/`,
      name: "מחזקים את פלוגת זעם",
      inLanguage: "he-IL",
      about: { "@id": "#organization" },
      description:
        "דף גיוס ציוד, חוסן ותמיכה לוגיסטית ללוחמי המילואים של פלוגת זעם.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "עמוד הבית",
          item: `${siteUrl}/`,
        },
      ],
    },
  ];

  if (videoPoster) {
    graph.push({
      "@type": "VideoObject",
      name: "הכירו את פלוגת זעם",
      description: "הסיפור הרשמי של לוחמי פלוגת זעם.",
      thumbnailUrl: [`${siteUrl}${videoPoster.src}`],
      contentUrl: `${siteUrl}${campaign.videoFile}`,
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function Home() {
  const logo = existingAsset(campaignAssets.unitEmblem);
  const videoPoster = existingAsset(campaignAssets.videoPoster);
  const heroImages = existingAssets(campaignAssets.heroImages);
  const storyImage = existingAsset(campaignAssets.storyImage);
  const galleryImages = existingAssets(campaignAssets.galleryImages);
  const memorialImage = existingAsset(campaignAssets.memorialImage);
  const nonprofitConfigured =
    isConfigured(campaign.nonprofitName) &&
    isConfigured(campaign.nonprofitNumber);

  return (
    <>
      <JsonLd videoPoster={videoPoster} />
      <Header logo={logo} />
      <main id="main-content" tabIndex={-1}>
        <section className="hero section-dark" id="top" aria-labelledby="hero-title">
          <div className="hero-texture" aria-hidden="true" />
          <SectionContainer className={`hero-grid ${heroImages.length ? "has-photo-strip" : ""}`}>
            <div className="hero-copy">
              <p className="eyebrow">פלוגת ״זעם״ | גדוד 7421 | חטיבה 4</p>
              <h1 id="hero-title" className="hero-title">
                פלוגת &quot;זעם&quot; צריכה אתכם איתה בקו
              </h1>
              <div className="hero-lead">
                <p>
                  מאז 8 באוקטובר 2023 אנחנו עוזבים שוב ושוב את הבית, את העבודה
                  ואת המשפחות ומתייצבים בכל מקום שבו מדינת ישראל זקוקה לנו.
                </p>
                <p>
                  אחרי תקופה ארוכה של לחימה ומשימות מבצעיות, אנחנו מבקשים את
                  עזרתכם ברכישת ציוד מציל חיים, בחיזוק החוסן הפלוגתי ובתמיכה
                  בלוחמים במהלך ימי הכוננות הממושכים.
                </p>
              </div>
              <div className="hero-actions">
                <DonationLink className="button button-large">
                  אני רוצה לחזק את הלוחמים
                </DonationLink>
                <a className="text-link" href="#hero-video">
                  צפו בסיפור שלנו <span aria-hidden="true">←</span>
                </a>
              </div>

              <div className="hero-progress">
                <p className="goal-label">יעד הגיוס: {formatIls(campaign.targetAmount)}</p>
                <CampaignProgress />
              </div>

              <div className="hero-trust">
                <p className="secure-trust-line">
                  התרומה מתבצעת באמצעות מערכת סליקה מאובטחת.
                </p>
                <p className="trust-line">
                  כל תרומה, קטנה כגדולה, הופכת לחלק מהביטחון של כולנו.
                </p>
              </div>
            </div>

            <div className="hero-media" id="hero-video">
              <VideoCard poster={videoPoster} />
            </div>

            {heroImages.length ? (
              <div className="hero-photo-strip" aria-label="תמונות מאושרות מפעילות הפלוגה">
                {heroImages.map((image) => (
                  <div className="strip-image" key={image.src}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 33vw, 390px"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </SectionContainer>
        </section>

        <section className="section video-section" id="video" aria-labelledby="video-title">
          <SectionContainer>
            <div className="video-section-intro">
              <p className="eyebrow eyebrow-dark">פנים. קולות. סיפור אחד.</p>
              <h2 id="video-title">הכירו את פלוגת ״זעם״</h2>
              <p className="section-intro">
                צפו בסיפור של הלוחמים, בדרך שעברנו מאז תחילת המלחמה ובסיבה
                שבגללה אנחנו זקוקים לכם איתנו עכשיו.
              </p>
            </div>
          </SectionContainer>
          <SectionContainer className="video-feature">
            <VideoCard poster={videoPoster} />
            <div className="video-caption">
              <p>
                אנחנו עושים את מה שצריך בחזית. התמיכה שלכם מאפשרת לנו לעשות זאת
                בצורה בטוחה וטובה יותר.
              </p>
              <DonationLink className="button">הצטרפו אלינו למערכה</DonationLink>
            </div>
          </SectionContainer>
        </section>

        <section className="section story-section" id="story" aria-labelledby="story-title">
          <SectionContainer className={`story-grid ${storyImage ? "has-story-image" : ""}`}>
            <div className="story-heading">
              <p className="eyebrow eyebrow-dark">הסיפור שלנו</p>
              <h2 id="story-title" className="story-title">מאז הבוקר של 8 באוקטובר אנחנו שם</h2>
              <p className="story-intro">
                מאז הבוקר של 8 באוקטובר 2023, לוחמי המילואים של פלוגת ״זעם״
                עזבו את הבית, את מקומות העבודה ואת המשפחות והתייצבו בחזית.
              </p>
            </div>
            {storyImage ? (
              <figure className="story-image">
                <Image
                  src={storyImage.src}
                  alt={storyImage.alt}
                  width={storyImage.width}
                  height={storyImage.height}
                  sizes="(max-width: 359px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 48px), (max-width: 1280px) 42vw, 510px"
                  loading="lazy"
                  style={{ objectPosition: storyImage.objectPosition }}
                />
              </figure>
            ) : null}
            <div className="story-copy prose">
              <p>
                מרימאל ושג׳עאיה, דרך הקרבות העצימים בחאן יונס, המשימות בגזרת
                סוריה ועד לגזרת לבנון – התייצבנו בכל מקום שבו נדרשנו כדי להגן
                על מדינת ישראל ועל אזרחיה.
              </p>
              <p>
                הפלוגה שלנו מורכבת מאנשים מכל רחבי הארץ ומכל גווני החברה
                הישראלית. ביום־יום אנחנו עובדים, לומדים, מנהלים עסקים ומגדלים
                משפחות. ברגע האמת אנחנו הופכים שוב לצוות לוחם אחד.
              </p>
              <p>
                הלחימה הממושכת גבתה מאיתנו מחיר כבד, אך למרות הקושי והכאב אנחנו
                ממשיכים להתייצב ולעמוד במשימות המוטלות עלינו.
              </p>
            </div>
            <blockquote className="story-quote">
              <p className="story-quote-text">
                <span>הפלוגה שלנו היא רקמת חיים ישראלית –</span>
                <span>אנשים שונים שהפכו למשפחה אחת ולכוח לוחם אחד.</span>
              </p>
            </blockquote>
          </SectionContainer>
        </section>

        <section className="section memorial" aria-labelledby="memorial-title">
          <SectionContainer
            className={`memorial-inner ${memorialImage ? "has-memorial-image" : "memorial-text-only"}`}
          >
            <div className="memorial-heading">
              <h2 id="memorial-title">זוכרים את אחינו לנשק</h2>
              <p className="memorial-lead">אנו נושאים בליבנו את זכרו של אחינו לנשק,</p>
            </div>
            {memorialImage ? (
              <div className="memorial-image">
                <Image
                  src={memorialImage.src}
                  alt={memorialImage.alt}
                  width={memorialImage.width}
                  height={memorialImage.height}
                  sizes="(max-width: 767px) calc(100vw - 84px), (max-width: 1180px) 42vw, 470px"
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: memorialImage.objectPosition }}
                />
              </div>
            ) : null}
            <div className="memorial-body">
              <p className="memorial-name"><strong>אוריאל אביעד סילברמן ז״ל</strong>,</p>
              <p className="memorial-fallen">שנפל בקרבות בחאן יונס.</p>
              <p>
                אנו מחזקים את חברינו שנפצעו במהלך הלחימה וממשיכים בתהליך
                השיקום.
              </p>
              <p>
                למרות הכאב, אנחנו ממשיכים להיות במקום שבו צריכים אותנו – מתוך
                תחושת אחריות עמוקה לביטחון המדינה ואזרחיה.
              </p>
              <p className="memorial-closing">יהי זכרו ברוך.</p>
            </div>
          </SectionContainer>
        </section>

        <section className="section needs-section" id="needs" aria-labelledby="needs-title">
          <SectionContainer>
            <div className="section-heading centered narrow">
              <p className="eyebrow eyebrow-dark">למה אנחנו מגייסים?</p>
              <h2 id="needs-title">שלושה צרכים קריטיים. מטרה אחת: לחזור הביתה בשלום</h2>
              <p className="section-intro">
                כדי שנוכל להמשיך לבצע את המשימות שלנו בצורה הטובה והבטוחה
                ביותר, אנו מבקשים את עזרתכם בשלושה תחומים מרכזיים.
              </p>
            </div>
            <div className="needs-grid">
              {needs.map((need) => (
                <NeedCard key={need.title} {...need} />
              ))}
            </div>
          </SectionContainer>
        </section>

        <TransparencySection />

        {galleryImages.length ? (
          <section className="section gallery-section" aria-labelledby="gallery-title">
            <SectionContainer>
              <div className="gallery-intro">
                <p className="eyebrow eyebrow-dark gallery-label">הפלוגה שלנו</p>
                <h2 id="gallery-title" className="gallery-title">האנשים שמאחורי המדים</h2>
                <p className="gallery-description">
                  רגעים אמיתיים מהשירות, מהשטח ומהדרך הארוכה שעברנו יחד.
                </p>
              </div>
              <Gallery images={galleryImages} />
            </SectionContainer>
          </section>
        ) : null}

        <section className="section urgency section-dark" aria-labelledby="urgency-title">
          <SectionContainer className="urgency-inner">
            <div className="urgency-heading">
              <p className="eyebrow">המשימה נמשכת</p>
              <h2 id="urgency-title">המלחמה אולי ירדה מהכותרות. עבורנו היא עדיין נמשכת.</h2>
            </div>
            <div className="urgency-content prose">
              <p>
                אנחנו ממשיכים להיקרא למשימות, ממשיכים לעזוב את המשפחות וממשיכים
                להתייצב בכל פעם מחדש.
              </p>
              <p>
                כדי שנוכל לעמוד במשימות, לשמור זה על זה ולחזור הביתה בשלום –
                אנחנו זקוקים לשותפים.
              </p>
              <p>
                התרומה שלכם היא לא רק סיוע כספי. היא מסר ברור ללוחמים שהם לא
                לבד.
              </p>
              <DonationLink className="button">אני איתכם</DonationLink>
            </div>
          </SectionContainer>
        </section>

        <section className="section donation-section" id="donation" aria-labelledby="donation-title">
          <SectionContainer className="donation-inner">
            <p className="eyebrow eyebrow-dark">כל סכום הוא שותפות</p>
            <h2 id="donation-title">מצטרפים ומחזקים את פלוגת זעם</h2>
            <p className="section-intro donation-supporting-text">
              כל תרומה, קטנה כגדולה, מסייעת לנו לרכוש ציוד ומיגון, לחזק את חוסן
              הלוחמים ולתת לפלוגה את המעטפת שהיא זקוקה לה.
            </p>
            <p className="donation-grid-intro">כל סכום שתבחרו מחזק את הלוחמים ומקרב את הפלוגה ליעד.</p>
            <DonationAmountSelector />
            <DonationLink
              className="button button-large donation-primary-cta"
              sectionFallback={false}
              ariaLabel="מעבר לתרומה מאובטחת"
            >
              מעבר לתרומה מאובטחת
            </DonationLink>
            {nonprofitConfigured ? (
              <p className="nonprofit-details">
                {campaign.nonprofitName} · מספר גוף: <bdi>{campaign.nonprofitNumber}</bdi>
                {campaign.taxDeductible ? " · התרומה מוכרת לפי סעיף 46" : ""}
              </p>
            ) : null}
          </SectionContainer>
        </section>

        <section className="section closing-section" aria-labelledby="closing-title">
          <SectionContainer className="closing-inner">
            <h2 id="closing-title">אנחנו עושים את שלנו בחזית. עכשיו אנחנו צריכים אתכם איתנו.</h2>
            <div className="prose">
              <p>
                כל תרומה, קטנה כגדולה, מסייעת לנו להגן טוב יותר על הלוחמים,
                לשמור על הלכידות ולתת לפלוגה את המעטפת שהיא זקוקה לה.
              </p>
              <p>השותפות שלכם היא מכפיל כוח.</p>
              <p>ביחד נוכל להמשיך לעמוד במשימות ולחזור הביתה בשלום.</p>
              <p className="signature">
                בהערכה עמוקה ובציפייה לימים שקטים,
                <br />
                <strong>לוחמי פלוגת ״זעם״</strong>
              </p>
            </div>
            <div className="closing-actions">
              <DonationLink className="button button-large">תרמו עכשיו לפלוגת ״זעם״</DonationLink>
              <p className="trust-small">התרומה מתבצעת באמצעות מערכת סליקה מאובטחת.</p>
            </div>
          </SectionContainer>
        </section>

        <section className="section faq-section" id="faq" aria-labelledby="faq-title">
          <SectionContainer className="faq-grid">
            <div>
              <p className="eyebrow eyebrow-dark">חשוב לדעת</p>
              <h2 id="faq-title">שאלות נפוצות</h2>
            </div>
            <Faq />
          </SectionContainer>
        </section>
      </main>

      <footer className="site-footer">
        <SectionContainer className="footer-grid">
          <div className="footer-unit">
            <strong className="footer-brand">פלוגת ״זעם״</strong>
            <p>גדוד 7421 · חטיבה 4</p>
            <p>האתר הוקם למען חיזוק לוחמי פלוגת ״זעם״.</p>
            <ContactActions className="footer-contact-actions" />
          </div>

          <nav className="footer-nav" aria-label="ניווט באתר">
            <h3>ניווט באתר</h3>
            <div className="footer-links">
              <Link href="#story">סיפור הפלוגה</Link>
              <Link href="#needs">לאן התרומה הולכת</Link>
              <Link href="#faq">שאלות נפוצות</Link>
              <Link href="#top">חזרה לראש העמוד</Link>
            </div>
          </nav>

          <div className="footer-action-group">
            <DonationLink className="button footer-donation-button">תרמו עכשיו</DonationLink>
            <nav className="footer-nav footer-legal" aria-label="קישורים משפטיים">
              <h3>מידע משפטי</h3>
              <div className="footer-links">
                <Link href="/privacy">מדיניות פרטיות</Link>
                <Link href="/accessibility">הצהרת נגישות</Link>
                <Link href="/terms">תנאי שימוש</Link>
              </div>
            </nav>
          </div>
        </SectionContainer>
        <SectionContainer className="copyright">
          © {new Date().getFullYear()} פלוגת ״זעם״. כל הזכויות שמורות.
        </SectionContainer>
      </footer>
      <MobileDonationBar />
    </>
  );
}

function NeedCard({ icon, title, text, highlight }: (typeof needs)[number]) {
  const Icon = needIcons[icon];

  return (
    <article className="need-card">
      <span className="need-card-icon" aria-hidden="true">
        <Icon />
      </span>
      <h3 className="need-card-title">{title}</h3>
      <div className="need-card-copy need-card-body">
        {text.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="need-card-divider" aria-hidden="true" />
      <strong className="need-card-highlight">{highlight}</strong>
    </article>
  );
}
