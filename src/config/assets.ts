export type ApprovedImageAsset = {
  src: `/images/${string}`;
  alt: string;
  width: number;
  height: number;
};

type CampaignAssets = {
  unitEmblem: ApprovedImageAsset | null;
  videoPoster: ApprovedImageAsset | null;
  heroImages: readonly ApprovedImageAsset[];
  galleryImages: readonly ApprovedImageAsset[];
  memorialImage: ApprovedImageAsset | null;
  socialImage: ApprovedImageAsset | null;
};

/**
 * Only add assets here after the files and their publication approval are verified.
 * Missing entries intentionally render safe fallbacks or hide optional sections.
 * See CONTENT_AND_ASSETS_CHECKLIST.md for exact filenames and dimensions.
 */
export const campaignAssets: CampaignAssets = {
  unitEmblem: null,
  videoPoster: null,
  heroImages: [],
  galleryImages: [
    {
      src: "/images/gallery/soldiers-with-israeli-flag.webp",
      alt: "לוחמי הפלוגה לצד כלי משוריין, מחזיקים בדגל ישראל",
      width: 1600,
      height: 1200,
    },
    {
      src: "/images/gallery/rainbow-over-coast.webp",
      alt: "קשת כפולה מעל קו החוף כפי שנצפתה מתוך כלי משוריין",
      width: 1600,
      height: 1200,
    },
    {
      src: "/images/gallery/armored-company-in-field.webp",
      alt: "מבט רחב על שטח הפעילות וכלים משוריינים של הפלוגה",
      width: 1600,
      height: 1200,
    },
    {
      src: "/images/gallery/view-from-armored-vehicle.webp",
      alt: "מבט מתוך כלי משוריין במהלך פעילות הפלוגה בשטח",
      width: 1600,
      height: 1200,
    },
    {
      src: "/images/gallery/soldier-beside-tank.webp",
      alt: "לוחם הפלוגה עומד לצד טנק במהלך הפעילות",
      width: 1600,
      height: 1200,
    },
    {
      src: "/images/gallery/tank-during-operational-activity.webp",
      alt: "טנק של הפלוגה במהלך פעילות מבצעית בשטח",
      width: 1080,
      height: 576,
    },
    {
      src: "/images/gallery/tank-under-cloudy-sky.webp",
      alt: "טנק של הפלוגה בשטח תחת שמיים מעוננים",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/gallery/soldier-at-protected-entrance.webp",
      alt: "לוחם הפלוגה לצד כניסה מוגנת במהלך פעילות בשטח",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/gallery/tank-at-sunset.webp",
      alt: "טנק של הפלוגה בתנועה באור השקיעה",
      width: 1200,
      height: 1600,
    },
  ],
  memorialImage: null,
  socialImage: null,
};
