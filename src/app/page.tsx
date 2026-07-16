import Image from "next/image";
import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { DonationLink } from "@/components/DonationLink";
import { Faq } from "@/components/Faq";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { MobileDonationBar } from "@/components/MobileDonationBar";
import { Progress } from "@/components/Progress";
import { VideoCard } from "@/components/VideoCard";
import {
  campaign,
  formatIls,
  isConfigured,
  isValidExternalUrl,
} from "@/config/campaign";
import { getVideoEmbedUrl } from "@/lib/video";

const needs = [
  {
    number: "01",
    title: "מיגון וציוד אישי",
    text: [
      "רכישת מדים טקטיים מעכבי בעירה, קסדות טקטיות מתקדמות וציוד אישי נוסף המותאם לפעילות המבצעית.",
      "זה אינו ציוד מותרות. מדובר בציוד שמגן על הלוחמים, משפר את יכולת התפקוד בשטח ועשוי להציל חיים.",
    ],
    highlight: "ציוד טוב יותר מאפשר לנו לפעול בביטחון רב יותר.",
  },
  {
    number: "02",
    title: "חוסן ולכידות פלוגתית",
    text: [
      "קיום ערבי מחלקה ופלוגה שמאפשרים לנו לעצור לרגע, לעבד את התקופה המורכבת, לחזק את החיבור בין הלוחמים ולאגור כוחות לקראת המשימה הבאה.",
      "הלכידות שלנו היא הדבק שמחזיק את הפלוגה ואחד מסודות הכוח שלנו בשדה הקרב.",
    ],
    highlight: "כוח לוחם מתחיל באנשים שסומכים זה על זה.",
  },
  {
    number: "03",
    title: "תמיכה לוגיסטית בימי כוננות",
    text: [
      "סיוע ברכישת ציוד עזר, מזון, שתייה, מוצרי נוחות וציוד נוסף לימי הכוננות הארוכים בתוך הכלים המשוריינים ובשטח.",
      "ימי הכוננות מציבים בפני הלוחמים אתגרים פיזיים ומנטליים מורכבים, והתמיכה הזו מאפשרת להם לשמור על תפקוד וריכוז לאורך זמן.",
    ],
    highlight: "גם הדברים הקטנים הופכים למשמעותיים אחרי שעות וימים בשטח.",
  },
];

const donationAmounts = [
  { amount: 100, label: "שותפים לדרך" },
  { amount: 250, label: "מסייעים לציוד וללוגיסטיקה" },
  { amount: 500, label: "מחזקים את המיגון והחוסן" },
  { amount: 1000, label: "שותפים משמעותיים לפלוגה" },
];

function JsonLd() {
  const videoEmbed = isValidExternalUrl(campaign.videoUrl)
    ? getVideoEmbedUrl(campaign.videoUrl)
    : null;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": "#organization",
      name: "פלוגת זעם — גדוד 7421, חטיבה 4",
    },
    {
      "@type": "WebPage",
      "@id": "#webpage",
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
          item: "/",
        },
      ],
    },
  ];

  if (videoEmbed) {
    graph.push({
      "@type": "VideoObject",
      name: "הכירו את פלוגת זעם",
      description: "הסיפור הרשמי של לוחמי פלוגת זעם.",
      thumbnailUrl: ["/images/video-poster.webp"],
      embedUrl: videoEmbed,
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
  const nonprofitConfigured =
    isConfigured(campaign.nonprofitName) &&
    isConfigured(campaign.nonprofitNumber);

  return (
    <>
      <JsonLd />
      <Header />
      <main id="top">
        <section className="hero section-dark" aria-labelledby="hero-title">
          <div className="hero-texture" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">פלוגת ״זעם״ | גדוד 7421 | חטיבה 4</p>
              <h1 id="hero-title">פלוגת ״זעם״ צריכה אתכם איתה בקו</h1>
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
                <a className="text-link" href="#video">
                  צפו בסיפור שלנו <span aria-hidden="true">←</span>
                </a>
              </div>
              <p className="trust-line">
                כל תרומה, קטנה כגדולה, הופכת לחלק מהביטחון של כולנו.
              </p>
            </div>

            <div className="hero-media">
              <VideoCard />
              <div className="hero-photo-strip" aria-label="מקומות שמורים לתמונות מאושרות">
                {[1, 2, 3].map((image) => (
                  <div className="strip-image" key={image}>
                    <Image
                      src={`/images/hero/hero-${String(image).padStart(2, "0")}.webp`}
                      alt={`מקום שמור לתמונת פלוגה מאושרת ${image}`}
                      fill
                      sizes="180px"
                      priority
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-progress">
              <p className="goal-label">יעד הגיוס: {formatIls(campaign.targetAmount)}</p>
              <Progress />
            </div>
          </div>
        </section>

        <section className="section video-section" id="video" aria-labelledby="video-title">
          <div className="container narrow centered">
            <p className="eyebrow eyebrow-dark">פנים. קולות. סיפור אחד.</p>
            <h2 id="video-title">הכירו את פלוגת ״זעם״</h2>
            <p className="section-intro">
              צפו בסיפור של הלוחמים, בדרך שעברנו מאז תחילת המלחמה ובסיבה
              שבגללה אנחנו זקוקים לכם איתנו עכשיו.
            </p>
          </div>
          <div className="container video-feature">
            <VideoCard />
            <div className="video-caption">
              <p>
                אנחנו עושים את מה שצריך בחזית. התמיכה שלכם מאפשרת לנו לעשות זאת
                בצורה בטוחה וטובה יותר.
              </p>
              <DonationLink className="button">הצטרפו אלינו למערכה</DonationLink>
              <details className="transcript">
                <summary>תמלול והנגשת הסרטון</summary>
                <p>
                  תמלול מלא יתווסף יחד עם הסרטון הרשמי המאושר, לפני פרסום
                  הקמפיין לציבור.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="section story-section" id="story" aria-labelledby="story-title">
          <div className="container story-grid">
            <div className="story-heading">
              <p className="eyebrow eyebrow-dark">הסיפור שלנו</p>
              <h2 id="story-title">מאז הבוקר של 8 באוקטובר אנחנו שם</h2>
            </div>
            <div className="story-copy prose">
              <p>
                מאז הבוקר של 8 באוקטובר 2023, לוחמי המילואים של פלוגת ״זעם״
                עזבו את הבית, את מקומות העבודה ואת המשפחות והתייצבו בחזית.
              </p>
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
              <blockquote>
                הפלוגה שלנו היא רקמת חיים ישראלית – אנשים שונים שהפכו למשפחה
                אחת ולכוח לוחם אחד.
              </blockquote>
            </div>
          </div>
        </section>

        <section className="section memorial" aria-labelledby="memorial-title">
          <div className="container memorial-inner">
            <div className="memorial-mark" aria-hidden="true">נר</div>
            <div>
              <h2 id="memorial-title">זוכרים את אחינו לנשק</h2>
              <p>
                אנו נושאים בליבנו את זכרו של אחינו לנשק,
                <br />
                <strong>אוריאל אביעד סילברמן ז״ל</strong>,
                <br />
                שנפל בקרבות בחאן יונס.
              </p>
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
          </div>
        </section>

        <section className="section needs-section" id="needs" aria-labelledby="needs-title">
          <div className="container">
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
                <article className="need-card" key={need.title}>
                  <span className="card-number">{need.number}</span>
                  <h3>{need.title}</h3>
                  {need.text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <strong>{need.highlight}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section budget-section" aria-labelledby="budget-title">
          <div className="container budget-grid">
            <div>
              <p className="eyebrow eyebrow-dark">שקיפות ואחריות</p>
              <h2 id="budget-title">היעד שלנו: {formatIls(campaign.targetAmount)}</h2>
              <p className="section-intro align-right">
                הסכום שיגויס ישמש לחיזוק הפלוגה בשלושת התחומים שהוגדרו: ציוד
                ומיגון, חוסן ולכידות ותמיכה לוגיסטית.
              </p>
              <p className="budget-note">
                החלוקה הסופית תיקבע בהתאם לצרכים המבצעיים ולסכום שיגויס בפועל.
              </p>
              <DonationLink className="button">עזרו לנו להגיע ליעד</DonationLink>
            </div>
            <div className="budget-list" aria-label="חלוקת תקציב מתוכננת">
              {["מיגון וציוד אישי", "חוסן ולכידות פלוגתית", "תמיכה לוגיסטית"].map(
                (item, index) => (
                  <div className="budget-row" key={item}>
                    <span>0{index + 1}</span>
                    <strong>{item}</strong>
                    <em>סכום יעודכן</em>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="section gallery-section" aria-labelledby="gallery-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow eyebrow-dark">הפלוגה שלנו</p>
              <h2 id="gallery-title">האנשים שמאחורי המדים</h2>
              <p className="section-intro align-right">
                רגעים אמיתיים מהשירות, מהשטח ומהדרך הארוכה שעברנו יחד.
              </p>
            </div>
            <Gallery />
          </div>
        </section>

        <section className="section urgency section-dark" aria-labelledby="urgency-title">
          <div className="container urgency-inner">
            <div>
              <p className="eyebrow">המשימה נמשכת</p>
              <h2 id="urgency-title">המלחמה אולי ירדה מהכותרות. עבורנו היא עדיין נמשכת.</h2>
            </div>
            <div className="prose">
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
          </div>
        </section>

        <section className="section donation-section" id="donation" aria-labelledby="donation-title">
          <div className="container donation-inner">
            <p className="eyebrow eyebrow-dark">כל סכום הוא שותפות</p>
            <h2 id="donation-title">בחרו את הדרך שלכם לחזק את הפלוגה</h2>
            {!isValidExternalUrl(campaign.donationUrl) ? (
              <p className="configuration-notice" role="status">
                קישור התרומה הרשמי טרם הוגדר. אפשרויות התרומה יופעלו מיד לאחר
                הזנת קישור מאובטח ומאושר.
              </p>
            ) : null}
            <div className="amount-grid">
              {donationAmounts.map((option) => (
                <DonationLink
                  key={option.amount}
                  className="amount-option"
                  amount={option.amount}
                  sectionFallback={false}
                  ariaLabel={`תרומה בסך ${option.amount} שקלים — ${option.label}`}
                >
                  <strong>{option.amount.toLocaleString("he-IL")} ₪</strong>
                  <span>{option.label}</span>
                </DonationLink>
              ))}
              <DonationLink
                className="amount-option amount-other"
                sectionFallback={false}
                ariaLabel="תרומה בסכום אחר"
              >
                <strong>סכום אחר</strong>
                <span>כל תרומה מחזקת</span>
              </DonationLink>
            </div>
            <DonationLink
              className="button button-large"
              sectionFallback={false}
              ariaLabel="מעבר לתרומה מאובטחת"
            >
              לתרומה מאובטחת
            </DonationLink>
            <p className="trust-small">התרומה מתבצעת באמצעות מערכת סליקה מאובטחת.</p>
            {nonprofitConfigured ? (
              <p className="nonprofit-details">
                {campaign.nonprofitName} · מספר גוף: <bdi>{campaign.nonprofitNumber}</bdi>
                {campaign.taxDeductible ? " · התרומה מוכרת לפי סעיף 46" : ""}
              </p>
            ) : null}
          </div>
        </section>

        <section className="section closing-section" aria-labelledby="closing-title">
          <div className="container closing-inner">
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
            <DonationLink className="button button-large">תרמו עכשיו לפלוגת ״זעם״</DonationLink>
          </div>
        </section>

        <section className="section faq-section" id="faq" aria-labelledby="faq-title">
          <div className="container faq-grid">
            <div>
              <p className="eyebrow eyebrow-dark">חשוב לדעת</p>
              <h2 id="faq-title">שאלות נפוצות</h2>
            </div>
            <Faq />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <strong className="footer-brand">פלוגת ״זעם״</strong>
            <p>גדוד 7421 · חטיבה 4</p>
            <p>האתר הוקם למען חיזוק לוחמי פלוגת ״זעם״.</p>
            <ContactActions />
          </div>
          <div>
            <DonationLink className="button">תרמו עכשיו</DonationLink>
            <nav className="footer-links" aria-label="קישורים משפטיים">
              <Link href="/privacy">מדיניות פרטיות</Link>
              <Link href="/accessibility">הצהרת נגישות</Link>
              <Link href="/terms">תנאי שימוש</Link>
            </nav>
          </div>
        </div>
        <div className="container security-note">
          אין לפרסם באתר מידע מבצעי, מיקומים עדכניים, לוחות זמנים או פרטים אישיים
          שלא אושרו לפרסום.
        </div>
        <div className="container copyright">
          © {new Date().getFullYear()} פלוגת ״זעם״. כל הזכויות שמורות.
        </div>
      </footer>
      <MobileDonationBar />
    </>
  );
}
