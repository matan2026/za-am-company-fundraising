import type { Metadata } from "next";
import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { LegalPage } from "@/components/LegalPage";
import { campaign, formatIls } from "@/config/campaign";
import { formatConfiguredDate, legalConfig } from "@/config/legal";

export const metadata: Metadata = {
  title: "תקנון ותנאי שימוש | פלוגת זעם",
  description:
    "תקנון ותנאי השימוש באתר קמפיין הגיוס של פלוגת זעם, גדוד 7421, חטיבה 4.",
  alternates: { canonical: "/terms" },
};

const sections = [
  ["purpose", "מטרת האתר"],
  ["proper-use", "זכאות ושימוש ראוי"],
  ["donations", "תרומות"],
  ["use-of-funds", "השימוש בכספי התרומות"],
  ["target", "יעד הגיוס"],
  ["content", "תוכן האתר"],
  ["media", "תמונות, סרטונים ותכני מדיה"],
  ["external-video", "תכני טלוויזיה ווידאו חיצוניים"],
  ["external-links", "קישורים חיצוניים"],
  ["availability", "זמינות האתר"],
  ["liability", "הגבלת אחריות"],
  ["privacy", "פרטיות"],
  ["accessibility", "נגישות"],
  ["operational-security", "ביטחון מידע מבצעי"],
  ["changes", "שינויים בתנאים"],
  ["law", "דין חל"],
  ["contact", "יצירת קשר"],
] as const;

// These terms are a general draft and should be reviewed by a qualified Israeli legal professional before publication.
export default function TermsPage() {
  const formattedLastUpdated = formatConfiguredDate(
    legalConfig.termsLastUpdated,
  );

  return (
    <LegalPage title="תקנון ותנאי שימוש">
      {formattedLastUpdated ? (
        <p className="legal-updated">
          עודכן לאחרונה:{" "}
          <time dateTime={legalConfig.termsLastUpdated}>
            {formattedLastUpdated}
          </time>
        </p>
      ) : null}

      <div className="legal-intro">
        <p>
          ברוכים הבאים לאתר קמפיין הגיוס של פלוגת ״זעם״, גדוד 7421, חטיבה 4.
        </p>
        <p>
          השימוש באתר, בתכניו ובקישורים המופיעים בו כפוף לתנאי שימוש אלה.
          גלישה באתר או שימוש בשירותים המוצגים בו מהווים הסכמה לתנאים, בכפוף
          להוראות כל דין.
        </p>
      </div>

      <nav className="legal-toc" aria-label="תוכן תקנון ותנאי השימוש">
        <h2>תוכן התקנון</h2>
        <ol>
          {sections.map(([id, title]) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <section id="purpose" aria-labelledby="purpose-title">
        <h2 id="purpose-title">1. מטרת האתר</h2>
        <p>
          האתר נועד להציג את קמפיין הגיוס, לספר את סיפורה של פלוגת ״זעם״,
          להסביר את צורכי הגיוס, להציג תצלומים וסרטונים שאושרו לפרסום, לאפשר
          יצירת קשר ולהפנות מבקרים לעמוד תרומה חיצוני ומאובטח.
        </p>
        <p>
          המידע באתר אינו מהווה ייעוץ צבאי, מבצעי, פיננסי, משפטי או מיסויי,
          ואין להסתמך עליו כתחליף לייעוץ מקצועי מתאים.
        </p>
      </section>

      <section id="proper-use" aria-labelledby="proper-use-title">
        <h2 id="proper-use-title">2. זכאות ושימוש ראוי</h2>
        <p>ניתן לגלוש באתר ולהשתמש בו למטרות חוקיות בלבד. אין:</p>
        <ul>
          <li>לנסות לפגוע באתר, לשבש את פעילותו או להעמיס על מערכותיו.</li>
          <li>לעקוף אמצעי הגנה, בקרות גישה או מנגנוני אבטחה.</li>
          <li>להעלות, להפיץ או להחדיר קוד זדוני.</li>
          <li>להתחזות לאדם אחר או להשתמש בתוכן האתר לצורך מרמה.</li>
          <li>לאסוף מידע אישי מן האתר ללא הרשאה.</li>
          <li>לפרסם או למסור מידע מבצעי, מסווג או אסור בפרסום.</li>
          <li>לעשות שימוש לרעה בתמונות או בפרטים מזהים של חיילים.</li>
        </ul>
      </section>

      <section id="donations" aria-labelledby="donations-title">
        <h2 id="donations-title">3. תרומות</h2>
        <p className="legal-emphasis">
          התרומות מבוצעות באמצעות מערכת סליקה חיצונית ומאובטחת, בהתאם לתנאים,
          למדיניות ולנהלים של ספק הסליקה.
        </p>
        <p>
          האתר עצמו אינו מקבל או מעבד פרטי כרטיסי אשראי. באחריות המבקר לוודא
          את סכום התרומה ואת פרטי הפעולה לפני אישור התשלום.
        </p>
        <p>
          אישור התשלום מופק בהתאם לתהליך של ספק הסליקה, והתרומה נחשבת מושלמת
          רק לאחר שהתקבל אישור מוצלח מן הספק. בקשות לביטול או להחזר, ככל שהן
          זמינות, יטופלו בהתאם לדין החל ולנהלים של הגוף המפעיל את עמוד התשלום.
        </p>
      </section>

      <section id="use-of-funds" aria-labelledby="use-of-funds-title">
        <h2 id="use-of-funds-title">4. השימוש בכספי התרומות</h2>
        <p className="legal-emphasis">
          כספי התרומות מיועדים לחיזוק פלוגת ״זעם״ בתחומי המיגון והציוד האישי,
          החוסן והלכידות הפלוגתית והתמיכה הלוגיסטית במהלך ימי הכוננות והפעילות.
        </p>
        <p>
          החלוקה הסופית של הכספים תיקבע בהתאם לצרכים המשתנים, לסדרי העדיפויות
          ולסכום שיגויס בפועל.
        </p>
        <p>
          צורכי הקמפיין עשויים להשתנות בהתאם לנסיבות הפעילות, לזמינות הציוד
          ולתוצאות הגיוס בפועל. אין התחייבות שתרומה מסוימת תשמש לרכישת מוצר
          מסוים או עבור אדם מסוים, אלא אם אושר הסדר ייעודי ומפורש.
        </p>
      </section>

      <section id="target" aria-labelledby="target-title">
        <h2 id="target-title">5. יעד הגיוס</h2>
        <p>
          יעד הגיוס המוצג באתר, העומד כעת על {formatIls(campaign.targetAmount)},
          מייצג את מטרת הקמפיין. סכומים שגויסו, מספר תורמים וסטטוס הקמפיין
          יוצגו רק לאחר אימותם או כאשר הם מחוברים למקור מידע אמין.
        </p>
      </section>

      <section id="content" aria-labelledby="content-title">
        <h2 id="content-title">6. תוכן האתר</h2>
        <p>
          נעשים מאמצים סבירים להציג מידע מדויק ועדכני. עם זאת, מידע עשוי
          להשתנות, צורכי הציוד עשויים להתעדכן, תמונות או סרטונים עשויים להיות
          מוחלפים, סטטוס הקמפיין עשוי להשתנות ותקלות טכניות עלולות להתרחש.
        </p>
        <p>
          אין התחייבות לכך שכל פריט מידע יהיה בכל עת מלא, מדויק או מעודכן.
        </p>
      </section>

      <section id="media" aria-labelledby="media-title">
        <h2 id="media-title">7. תמונות, סרטונים ותכני מדיה</h2>
        <p>
          תמונות, סרטונים, סמלים, גרפיקה ותוכן כתוב באתר עשויים להיות מוגנים
          בזכויות יוצרים או בזכויות אחרות. אין להעתיק, להפיץ, לערוך, לפרסם או
          לעשות בהם שימוש מסחרי ללא הרשאה מתאימה.
        </p>
        <p className="legal-emphasis">
          אין לעשות שימוש בתמונות או בפרטי לוחמים באופן העלול לפגוע בפרטיותם,
          בביטחונם או בכבודם.
        </p>
      </section>

      <section id="external-video" aria-labelledby="external-video-title">
        <h2 id="external-video-title">8. תכני טלוויזיה ווידאו חיצוניים</h2>
        <p>
          קטעי חדשות מוטמעים או סרטונים חיצוניים כפופים לזכויות, לתנאים
          ולמדיניות של המפרסם או הפלטפורמה המקוריים. באתר יש להטמיע רק גרסה
          רשמית או גרסה שהשימוש בה אושר.
        </p>
        <p>אין באתר טענה לבעלות על תכני מדיה חיצוניים.</p>
      </section>

      <section id="external-links" aria-labelledby="external-links-title">
        <h2 id="external-links-title">9. קישורים חיצוניים</h2>
        <p>
          קישורים באתר עשויים להוביל לפלטפורמות תשלום, פלטפורמות וידאו, רשתות
          חברתיות או עמודי מידע חיצוניים. אתרים אלה פועלים לפי התנאים
          והמדיניות שלהם.
        </p>
        <p>
          אתר הקמפיין אינו אחראי לזמינותם, לאבטחתם או לתוכנם של אתרים חיצוניים.
        </p>
      </section>

      <section id="availability" aria-labelledby="availability-title">
        <h2 id="availability-title">10. זמינות האתר</h2>
        <p>
          האתר עשוי להיות בלתי זמין מעת לעת עקב תחזוקה, תקלות טכניות, אירועי
          אבטחה, בעיות אחסון או כשלים בשירותים חיצוניים. אין התחייבות לזמינות
          רציפה או נטולת תקלות.
        </p>
      </section>

      <section id="liability" aria-labelledby="liability-title">
        <h2 id="liability-title">11. הגבלת אחריות</h2>
        <p>
          השימוש באתר נעשה באחריות המבקר, בכפוף להוראות הדין החל. אין בתנאים
          אלה כדי לגרוע מאחריות שלא ניתן להגביל או לשלול לפי דין.
        </p>
        <p>
          בכפוף לדין, מפעילי האתר אינם אחראים לנזק עקיף שנגרם אך ורק עקב אתר
          חיצוני, שירות תשלום של צד שלישי, השבתה טכנית, הסתמכות על מידע שהתיישן
          או שימוש בלתי מורשה של צד אחר.
        </p>
      </section>

      <section id="privacy" aria-labelledby="privacy-title">
        <h2 id="privacy-title">12. פרטיות</h2>
        <p>
          השימוש במידע אישי באתר כפוף ל
          <Link className="legal-inline-link" href="/privacy">
            מדיניות הפרטיות של האתר
          </Link>
          .
        </p>
      </section>

      <section id="accessibility" aria-labelledby="accessibility-title">
        <h2 id="accessibility-title">13. נגישות</h2>
        <p>
          אנו פועלים להנגיש את האתר ולאפשר שימוש נוח ככל האפשר למגוון
          המשתמשים. מידע נוסף מופיע ב
          <Link className="legal-inline-link" href="/accessibility">
            הצהרת הנגישות
          </Link>
          .
        </p>
      </section>

      <section
        className="legal-warning"
        id="operational-security"
        aria-labelledby="operational-security-title"
      >
        <h2 id="operational-security-title">14. ביטחון מידע מבצעי</h2>
        <p>
          אין לפרסם, למסור או לשלוח דרך האתר מידע מסווג, מידע מבצעי, מיקומי
          כוחות, מועדי פעילות, פרטי משימות או מידע אישי שלא אושר לפרסום.
        </p>
      </section>

      <section id="changes" aria-labelledby="changes-title">
        <h2 id="changes-title">15. שינויים בתנאים</h2>
        <p>
          תנאים אלה עשויים להתעדכן בעקבות שינויים באתר, שינויים בפעילות
          הקמפיין, דרישות משפטיות או רגולטוריות ושינויים טכניים. כאשר יוגדר
          תאריך עדכון מאושר, הוא יוצג בראש העמוד.
        </p>
      </section>

      <section id="law" aria-labelledby="law-title">
        <h2 id="law-title">16. דין חל</h2>
        <p>
          על תנאי שימוש אלה יחולו דיני מדינת ישראל, בכפוף להוראות הדין החלות
          ולסמכות השיפוט המוסמכת.
        </p>
      </section>

      <section id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">17. יצירת קשר</h2>
        <p>
          לשאלות או לבירורים בנוגע לאתר ולתנאי השימוש, ניתן לפנות באמצעות
          אמצעי הקשר המופיעים באתר.
        </p>
        <ContactActions className="legal-contact-actions" showFloating={false} />
      </section>
    </LegalPage>
  );
}
