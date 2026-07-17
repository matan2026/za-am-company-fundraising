import type { Metadata } from "next";
import { ContactActions } from "@/components/ContactActions";
import { LegalPage } from "@/components/LegalPage";
import { formatConfiguredDate, legalConfig } from "@/config/legal";
import { isValidExternalUrl } from "@/config/campaign";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | פלוגת זעם",
  description:
    "מדיניות הפרטיות של אתר קמפיין הגיוס של פלוגת זעם, גדוד 7421, חטיבה 4.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  ["general", "כללי"],
  ["usage-data", "מידע שנאסף בעת השימוש באתר"],
  ["voluntary-data", "מידע שהמשתמש מוסר מרצונו"],
  ["payments", "תרומות וסליקה"],
  ["purposes", "מטרות השימוש במידע"],
  ["cookies", "עוגיות וכלי מדידה"],
  ["sharing", "מסירת מידע לצדדים שלישיים"],
  ["external-links", "קישורים חיצוניים"],
  ["security", "אבטחת מידע"],
  ["retention", "שמירת מידע"],
  ["rights", "זכויות המשתמשים"],
  ["minors", "קטינים"],
  ["operational-security", "מידע מבצעי וביטחוני"],
  ["changes", "שינויים במדיניות"],
  ["contact", "יצירת קשר"],
] as const;

// This policy should be reviewed by a qualified Israeli legal professional before publication.
export default function PrivacyPage() {
  const formattedLastUpdated = formatConfiguredDate(
    legalConfig.privacyLastUpdated,
  );
  const paymentPolicyUrl = isValidExternalUrl(
    legalConfig.paymentProviderPrivacyUrl,
  )
    ? legalConfig.paymentProviderPrivacyUrl
    : null;

  return (
    <LegalPage title="מדיניות פרטיות">
      {formattedLastUpdated ? (
        <p className="legal-updated">
          עודכן לאחרונה:{" "}
          <time dateTime={legalConfig.privacyLastUpdated}>
            {formattedLastUpdated}
          </time>
        </p>
      ) : null}

      <div className="legal-intro">
        <p>
          אתר זה הוקם לצורך הצגת פעילות קמפיין הגיוס של פלוגת ״זעם״, גדוד
          7421, חטיבה 4, ומתן אפשרות למבקרים לקבל מידע, ליצור קשר ולעבור
          לעמוד תרומה מאובטח.
        </p>
        <p>
          אנו מכבדים את פרטיות המשתמשים באתר ופועלים לצמצם את איסוף המידע
          למידע הנדרש לצורך הפעלת האתר, שיפור חוויית השימוש ומתן מענה לפניות.
        </p>
      </div>

      <nav className="legal-toc" aria-label="תוכן מדיניות הפרטיות">
        <h2>תוכן המדיניות</h2>
        <ol>
          {sections.map(([id, title]) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <section id="general" aria-labelledby="general-title">
        <h2 id="general-title">1. כללי</h2>
        <p>
          מדיניות פרטיות זו מתארת כיצד מידע עשוי להיאסף ולהיות בשימוש בעת
          הגלישה באתר קמפיין הגיוס של פלוגת ״זעם״, גדוד 7421, חטיבה 4.
        </p>
        <p>
          השימוש באתר מהווה הסכמה למדיניות זו, בכפוף להוראות הדין החל. אם
          אינכם מסכימים למדיניות, באפשרותכם להימנע מהמשך השימוש באתר.
        </p>
      </section>

      <section id="usage-data" aria-labelledby="usage-data-title">
        <h2 id="usage-data-title">2. מידע שנאסף בעת השימוש באתר</h2>
        <p>
          במהלך השימוש באתר עשוי להיאסף מידע טכני וסטטיסטי הדרוש להפעלה,
          למדידה ולאיתור תקלות, ובכלל זה:
        </p>
        <ul>
          <li>סוג הדפדפן, סוג המכשיר ומערכת ההפעלה.</li>
          <li>מיקום משוער המבוסס על כתובת IP.</li>
          <li>העמודים שנצפו ומשך השהייה באתר.</li>
          <li>המקור שממנו הגיע המשתמש לאתר.</li>
          <li>לחיצות על כפתורים ואינטראקציות עם סרטונים.</li>
          <li>לחיצות למעבר לעמוד התרומה.</li>
          <li>נתונים כלליים על ביצועי האתר ותקלות טכניות.</li>
        </ul>
        <p>
          מידע זה הוא בדרך כלל סטטיסטי ואינו מזהה בהכרח את המבקר באופן אישי.
        </p>
      </section>

      <section id="voluntary-data" aria-labelledby="voluntary-data-title">
        <h2 id="voluntary-data-title">3. מידע שהמשתמש מוסר מרצונו</h2>
        <p>
          מידע עשוי להימסר כאשר מבקר שולח טופס יצירת קשר, פונה באמצעות
          WhatsApp, מתקשר דרך קישור טלפון או שולח הודעה באמצעי קשר אחר המוצג
          באתר.
        </p>
        <p>
          מידע כזה עשוי לכלול שם, מספר טלפון, כתובת דואר אלקטרוני, תוכן הפנייה
          וכל מידע נוסף שהמשתמש בחר למסור מרצונו.
        </p>
        <p>
          אין למסור מידע רגיש, מסווג, מבצעי או מידע אישי שאינו נחוץ לצורך
          הפנייה.
        </p>
      </section>

      <section id="payments" aria-labelledby="payments-title">
        <h2 id="payments-title">4. תרומות וסליקה</h2>
        <p className="legal-emphasis">
          התרומות מתבצעות באמצעות עמוד סליקה חיצוני ומאובטח. האתר אינו מקבל,
          שומר או מעבד בעצמו מספרי כרטיסי אשראי או פרטי תשלום מלאים.
        </p>
        <p>
          ספק הסליקה החיצוני עשוי לאסוף מידע בהתאם למדיניות הפרטיות ולתנאי
          השימוש שלו. מומלץ לעיין במסמכים אלה לפני השלמת התרומה.
        </p>
        {paymentPolicyUrl ? (
          <p>
            <a
              className="legal-external-link"
              href={paymentPolicyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              למדיניות הפרטיות המאומתת של ספק הסליקה
            </a>
          </p>
        ) : null}
      </section>

      <section id="purposes" aria-labelledby="purposes-title">
        <h2 id="purposes-title">5. מטרות השימוש במידע</h2>
        <p>מידע שנאסף עשוי לשמש לצרכים הבאים:</p>
        <ul>
          <li>הפעלת האתר ומתן מענה לפניות.</li>
          <li>שיפור השימושיות וחוויית הגלישה.</li>
          <li>מדידת ביצועי הקמפיין והבנת יעילות התכנים.</li>
          <li>זיהוי תקלות טכניות, ניסיונות שימוש לרעה ואירועי אבטחה.</li>
          <li>שמירה על אבטחת האתר ועמידה בחובות החלות לפי דין.</li>
        </ul>
      </section>

      <section id="cookies" aria-labelledby="cookies-title">
        <h2 id="cookies-title">6. עוגיות וכלי מדידה</h2>
        <p>
          האתר עשוי להשתמש בעוגיות או בטכנולוגיות דומות לצורך תפקוד בסיסי,
          ניתוח שימוש, מדידת ביצועים, מדידת הקמפיין ושמירת העדפות משתמש.
        </p>
        <p>
          שירותי מדידה חיצוניים נטענים רק כאשר הוגדרו באתר. המשתמש יכול לשלוט
          בעוגיות, לחסום אותן או למחוק אותן באמצעות הגדרות הדפדפן. חסימה עשויה
          להשפיע על חלק מהתכונות.
        </p>
      </section>

      <section id="sharing" aria-labelledby="sharing-title">
        <h2 id="sharing-title">7. מסירת מידע לצדדים שלישיים</h2>
        <p>
          מידע עשוי להימסר רק במידה הנדרשת לספקי שירות המסייעים בהפעלת האתר,
          ובהם ספקי אחסון, תשתיות אתר, מדידה, סליקה מאובטחת ותמיכה טכנית.
        </p>
        <p>
          מידע עשוי להימסר גם כאשר הדבר נדרש לפי דין, צו שיפוטי או דרישה של
          רשות מוסמכת.
        </p>
        <p className="legal-emphasis">
          איננו מוכרים מידע אישי של משתמשי האתר לצדדים שלישיים.
        </p>
      </section>

      <section id="external-links" aria-labelledby="external-links-title">
        <h2 id="external-links-title">8. קישורים חיצוניים</h2>
        <p>
          האתר עשוי לכלול קישורים לאתרים חיצוניים, ובהם עמוד התרומה המאובטח,
          פלטפורמות חברתיות או תכני מדיה. אתרים אלה מופעלים באופן עצמאי
          וכפופים למדיניות הפרטיות שלהם.
        </p>
        <p>
          מפעילי הקמפיין אינם אחראים לנוהגי הפרטיות, לאבטחה או לתוכן של אתרים
          חיצוניים.
        </p>
      </section>

      <section id="security" aria-labelledby="security-title">
        <h2 id="security-title">9. אבטחת מידע</h2>
        <p>
          נעשה שימוש באמצעים טכניים וארגוניים סבירים שנועדו לצמצם סיכונים
          ולהגן על מידע מפני גישה, שימוש או חשיפה בלתי מורשים.
        </p>
        <p className="legal-emphasis">
          אף מערכת אינטרנטית אינה חסינה לחלוטין, ולכן לא ניתן להבטיח הגנה
          מוחלטת מפני גישה בלתי מורשית או אירועי אבטחה.
        </p>
      </section>

      <section id="retention" aria-labelledby="retention-title">
        <h2 id="retention-title">10. שמירת מידע</h2>
        <p>
          מידע יישמר רק למשך הזמן הסביר הנדרש לצורך מענה לפניות, הפעלת האתר,
          ניהול הקמפיין, שמירה על אבטחה ועמידה בחובות לפי דין. משך השמירה עשוי
          להשתנות בהתאם לסוג המידע ולמטרת השימוש בו.
        </p>
      </section>

      <section id="rights" aria-labelledby="rights-title">
        <h2 id="rights-title">11. זכויות המשתמשים</h2>
        <p>בכפוף להוראות הדין החל, משתמשים רשאים לבקש:</p>
        <ul>
          <li>לעיין במידע המוחזק לגביהם.</li>
          <li>לתקן מידע שאינו מדויק.</li>
          <li>למחוק מידע, כאשר קיימת לכך זכאות לפי דין.</li>
          <li>לחזור מהסכמה לקבלת תקשורת שאינה הכרחית.</li>
        </ul>
        <p>
          בקשות בנושא פרטיות ניתן להגיש באמצעות אמצעי הקשר המוצגים באתר.
        </p>
      </section>

      <section id="minors" aria-labelledby="minors-title">
        <h2 id="minors-title">12. קטינים</h2>
        <p>
          האתר אינו מיועד לאיסוף ביודעין של מידע אישי מקטינים ללא הסכמה
          מתאימה. קטינים מתבקשים שלא למסור מידע אישי ללא מעורבות הורה או
          אפוטרופוס.
        </p>
      </section>

      <section
        className="legal-warning"
        id="operational-security"
        aria-labelledby="operational-security-title"
      >
        <h2 id="operational-security-title">13. מידע מבצעי וביטחוני</h2>
        <p>
          אין לשלוח באמצעות האתר מידע מבצעי, מיקומים עדכניים, לוחות זמנים,
          פרטי משימות, מידע מסווג או פרטים אישיים של חיילים שלא אושרו לפרסום.
        </p>
      </section>

      <section id="changes" aria-labelledby="changes-title">
        <h2 id="changes-title">14. שינויים במדיניות</h2>
        <p>
          מדיניות זו עשויה להתעדכן מעת לעת בהתאם לשינויים באתר, בשירותים
          המופעלים בו או בדרישות החלות. כאשר יוגדר תאריך עדכון מאושר, הוא יוצג
          בראש עמוד זה.
        </p>
      </section>

      <section id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">15. יצירת קשר</h2>
        <p>
          לשאלות, בקשות או בירורים בנושא פרטיות, ניתן לפנות באמצעות אמצעי
          הקשר המופיעים באתר.
        </p>
        <ContactActions className="legal-contact-actions" showFloating={false} />
      </section>
    </LegalPage>
  );
}
