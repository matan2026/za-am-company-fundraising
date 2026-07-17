import type { Metadata } from "next";
import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { DonationLink } from "@/components/DonationLink";
import { LegalPage } from "@/components/LegalPage";
import { formatConfiguredDate, legalConfig } from "@/config/legal";

export const metadata: Metadata = {
  title: "הצהרת נגישות | פלוגת זעם",
  description:
    "הצהרת הנגישות של אתר קמפיין הגיוס של פלוגת זעם, גדוד 7421, חטיבה 4.",
  alternates: { canonical: "/accessibility" },
};

const sections = [
  ["adjustments", "התאמות הנגישות באתר"],
  ["keyboard", "ניווט באמצעות מקלדת"],
  ["images", "תמונות וגלריה"],
  ["video", "נגישות הסרטון"],
  ["donation", "נגישות עמוד התרומה"],
  ["responsive", "הגדלת טקסט ועיצוב רספונסיבי"],
  ["typography", "ניגודיות וטיפוגרפיה"],
  ["motion", "תנועה ואנימציה"],
  ["limitations", "מגבלות נגישות ידועות"],
  ["reporting", "דיווח על בעיית נגישות"],
  ["operational-security", "ביטחון מידע מבצעי"],
  ["update-date", "עדכון ההצהרה"],
  ["legal-links", "מידע משפטי נוסף"],
] as const;

// This statement should be reviewed after a real accessibility audit.
export default function AccessibilityPage() {
  const formattedLastUpdated = formatConfiguredDate(
    legalConfig.accessibilityLastUpdated,
  );

  return (
    <LegalPage title="הצהרת נגישות">
      {formattedLastUpdated ? (
        <p className="legal-updated">
          תאריך עדכון ההצהרה:{" "}
          <time dateTime={legalConfig.accessibilityLastUpdated}>
            {formattedLastUpdated}
          </time>
        </p>
      ) : null}

      <div className="legal-intro">
        <p>
          אתר קמפיין הגיוס של פלוגת ״זעם״, גדוד 7421, חטיבה 4, נועד לאפשר
          לכלל המשתמשים לקבל מידע על הקמפיין ולגשת לעמוד התרומה בצורה נוחה,
          ברורה ומכבדת.
        </p>
        <p>
          אנו פועלים לשיפור נגישות האתר ולהתאמתו למגוון רחב ככל האפשר של
          משתמשים, לרבות אנשים עם מוגבלויות.
        </p>
        <p>
          האתר תוכנן ונבנה תוך שאיפה לעמוד בעקרונות הנגישות המקובלים ובהנחיות
          WCAG ברמה AA, ככל שהדבר אפשרי ובהתאם למבנה האתר ולשירותים החיצוניים
          המשולבים בו.
        </p>
      </div>

      <nav className="legal-toc" aria-label="תוכן הצהרת הנגישות">
        <h2>תוכן ההצהרה</h2>
        <ol>
          {sections.map(([id, title]) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <section id="adjustments" aria-labelledby="adjustments-title">
        <h2 id="adjustments-title">1. התאמות הנגישות באתר</h2>
        <p>באתר מיושמות ההתאמות הבאות:</p>
        <ul>
          <li>ניווט במקלדת ומצבי מיקוד חזותיים וברורים.</li>
          <li>קישור דילוג ישירות לתוכן המרכזי.</li>
          <li>מבנה כותרות הגיוני ושימוש ברכיבי HTML סמנטיים.</li>
          <li>הגדרת השפה לעברית ותמיכה מלאה בכיוון קריאה מימין לשמאל.</li>
          <li>טיפוגרפיה עברית קריאה, מרווחי שורות נדיבים וניגודיות ברורה.</li>
          <li>טקסט חלופי לתמונות בעלות משמעות ותוויות תיאוריות לקישורים ולכפתורים.</li>
          <li>רכיב שאלות נפוצות המבוסס על פקדים סמנטיים ונגישים.</li>
          <li>גלריה וחלון תמונה מוגדלת הכוללים פקדים נגישים וניווט מקלדת.</li>
          <li>תמיכה בהעדפת מערכת להפחתת תנועה.</li>
          <li>תפריט נייד נגיש וכפתורי תרומה בעלי שמות נגישים.</li>
          <li>פריסה רספונסיבית למובייל, לטאבלט ולמחשב שולחני.</li>
        </ul>
      </section>

      <section id="keyboard" aria-labelledby="keyboard-title">
        <h2 id="keyboard-title">2. ניווט באמצעות מקלדת</h2>
        <p>
          ניתן לעבור קדימה בין רכיבים אינטראקטיביים באמצעות Tab, לחזור לאחור
          באמצעות Shift + Tab ולהפעיל קישורים וכפתורים באמצעות Enter או Space,
          בהתאם לסוג הרכיב.
        </p>
        <p>
          הרכיב הפעיל מסומן באמצעות מסגרת מיקוד גלויה. בתפריט הנייד ניתן לסגור
          את התפריט באמצעות Escape, ובחלון הגלריה ניתן לנווט בין התמונות
          באמצעות מקשי החצים ולסגור באמצעות Escape.
        </p>
      </section>

      <section id="images" aria-labelledby="images-title">
        <h2 id="images-title">3. תמונות וגלריה</h2>
        <p>
          תמונות בעלות משמעות כוללות תיאור חלופי בעברית. רכיבים חזותיים
          דקורטיביים מוסתרים מטכנולוגיות מסייעות או מוגדרים ללא תיאור כאשר
          הדבר מתאים.
        </p>
        <p>
          תמונות הגלריה נפתחות בחלון דו־שיח נגיש הכולל שם תיאורי, כפתור סגירה,
          פקדי תמונה קודמת ובאה, שמירת מיקוד והחזרתו לתמונה שממנה נפתח החלון.
        </p>
      </section>

      <section id="video" aria-labelledby="video-title">
        <h2 id="video-title">4. נגישות הסרטון</h2>
        <p>
          אנו פועלים להציג את הסרטון באופן נגיש ככל האפשר. כאשר קיימים כתוביות,
          תמלול או חלופה טקסטואלית מאושרת, הם יוצגו לצד הסרטון או באמצעות
          פלטפורמת הווידאו.
        </p>
        <p>
          רכיב הסרטון כולל כותרת נגישה ואינו מופעל אוטומטית עם קול. אין באתר
          טענה לקיומן של כתוביות או תמלול כל עוד לא התקבלו ואושרו לפרסום.
        </p>
      </section>

      <section id="donation" aria-labelledby="donation-title">
        <h2 id="donation-title">5. נגישות עמוד התרומה</h2>
        <p className="legal-emphasis">
          עמוד הסליקה מופעל באמצעות שירות חיצוני. נגישות עמוד התשלום כפופה גם
          להתאמות וליכולות שמספק מפעיל מערכת הסליקה.
        </p>
        <p>
          מאחר שעמוד הסליקה החיצוני אינו זמין להטמעה באתר, מוצג קישור ישיר
          ומאובטח כחלופה נגישה.
        </p>
        <DonationLink
          className="button legal-donation-link"
          sectionFallback={false}
          newTab
          ariaLabel="מעבר לעמוד תרומה מאובטח"
        >
          מעבר לעמוד תרומה מאובטח
        </DonationLink>
      </section>

      <section id="responsive" aria-labelledby="responsive-title">
        <h2 id="responsive-title">6. הגדלת טקסט ועיצוב רספונסיבי</h2>
        <p>
          האתר תוכנן לתמוך בהגדלת תצוגת הדפדפן ובשימוש רספונסיבי במובייל,
          בטאבלט ובמחשב שולחני. האתר אינו חוסם הגדלה באמצעות הדפדפן, והפריסה
          נשארת שימושית ככל האפשר גם בהגדלה משמעותית.
        </p>
      </section>

      <section id="typography" aria-labelledby="typography-title">
        <h2 id="typography-title">7. ניגודיות וטיפוגרפיה</h2>
        <p>
          האתר משתמש בגופן Rubik לכותרות ובגופן Heebo לטקסט רץ. נעשה שימוש
          במשקלים קריאים, מרווחי שורות נדיבים, רוחב שורה מוגבל וצבעים מנוגדים
          לטקסט, לכפתורים ולמצבי מיקוד.
        </p>
      </section>

      <section id="motion" aria-labelledby="motion-title">
        <h2 id="motion-title">8. תנועה ואנימציה</h2>
        <p>
          האתר מכבד את הגדרת prefers-reduced-motion של הדפדפן ומצמצם תנועה,
          מעברים וגלילה חלקה כאשר המשתמש ביקש להפחית תנועה. באתר אין רכיבים
          מהבהבים.
        </p>
      </section>

      <section id="limitations" aria-labelledby="limitations-title">
        <h2 id="limitations-title">9. מגבלות נגישות ידועות</h2>
        {legalConfig.accessibilityKnownLimitations.map((limitation) => (
          <p key={limitation}>{limitation}</p>
        ))}
      </section>

      <section id="reporting" aria-labelledby="reporting-title">
        <h2 id="reporting-title">10. דיווח על בעיית נגישות</h2>
        <p>
          אם נתקלתם בקושי בגלישה באתר, בתוכן שאינו נגיש או ברכיב שאינו פועל
          כראוי עם טכנולוגיה מסייעת, ניתן לפנות אלינו באמצעות אמצעי הקשר
          המופיעים באתר.
        </p>
        <p>כדי לסייע בבדיקת הפנייה, מומלץ לכלול ככל האפשר:</p>
        <ul>
          <li>תיאור הקושי או הרכיב שאינו נגיש.</li>
          <li>כתובת העמוד שבו הופיעה הבעיה.</li>
          <li>סוג המכשיר והדפדפן.</li>
          <li>הטכנולוגיה המסייעת שבה נעשה שימוש.</li>
          <li>צילום מסך, אם הוא רלוונטי ואינו כולל מידע רגיש.</li>
        </ul>
        <ContactActions className="legal-contact-actions" showFloating={false} />
      </section>

      <section
        className="legal-warning"
        id="operational-security"
        aria-labelledby="operational-security-title"
      >
        <h2 id="operational-security-title">11. ביטחון מידע מבצעי</h2>
        <p>
          בפנייה בנושא נגישות אין לשלוח מידע מסווג, פרטי פעילות מבצעית,
          מיקומים, מועדים או מידע אישי של חיילים שלא אושר לפרסום.
        </p>
      </section>

      <section id="update-date" aria-labelledby="update-date-title">
        <h2 id="update-date-title">12. עדכון ההצהרה</h2>
        <p>
          תאריך עדכון ההצהרה יוצג בראש העמוד רק לאחר שייקבע ויאושר בקונפיגורציה
          המרכזית. אין בתוכן עמוד זה טענה לביצוע ביקורת נגישות רשמית או לקבלת
          אישור תאימות.
        </p>
      </section>

      <section id="legal-links" aria-labelledby="legal-links-title">
        <h2 id="legal-links-title">13. מידע משפטי נוסף</h2>
        <p className="legal-link-row">
          <Link className="legal-inline-link" href="/privacy">
            מדיניות פרטיות
          </Link>
          <Link className="legal-inline-link" href="/terms">
            תקנון ותנאי שימוש
          </Link>
        </p>
      </section>
    </LegalPage>
  );
}
