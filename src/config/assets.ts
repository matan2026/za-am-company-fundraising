export type ApprovedImageAsset = {
  src: `/images/${string}`;
  thumbnailSrc?: `/images/${string}`;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
};

type CampaignAssets = {
  unitEmblem: ApprovedImageAsset | null;
  videoPoster: ApprovedImageAsset | null;
  heroImages: readonly ApprovedImageAsset[];
  storyImage: ApprovedImageAsset | null;
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
  unitEmblem: {
    src: "/images/logo/zaam-logo.png",
    alt: "Za'am Company emblem",
    width: 566,
    height: 441,
  },
  videoPoster: {
    src: "/images/video-poster.webp",
    alt: "Nitzan Levy discussing the company's activity in a morning news interview",
    width: 1280,
    height: 720,
    objectPosition: "50% 50%",
  },
  heroImages: [],
  storyImage: {
    src: "/images/story/za-am-story.webp",
    alt: "Za'am Company soldiers beside an armored vehicle, holding an Israeli flag",
    width: 1600,
    height: 1200,
    objectPosition: "50% 50%",
  },
  galleryImages: [
    {
      src: "/images/gallery/soldiers-with-israeli-flag.webp",
      thumbnailSrc: "/images/gallery/thumbnails/soldiers-with-israeli-flag.webp",
      alt: "Company soldiers beside an armored vehicle, holding an Israeli flag",
      width: 1600,
      height: 1200,
      objectPosition: "50% 50%",
    },
    {
      src: "/images/gallery/rainbow-over-coast.webp",
      thumbnailSrc: "/images/gallery/thumbnails/rainbow-over-coast.webp",
      alt: "A double rainbow over the coastline, seen from an armored vehicle",
      width: 1600,
      height: 1200,
      objectPosition: "50% 50%",
    },
    {
      src: "/images/gallery/armored-company-in-field.webp",
      thumbnailSrc: "/images/gallery/thumbnails/armored-company-in-field.webp",
      alt: "A wide view of the operational area and the company's armored vehicles",
      width: 1600,
      height: 1200,
      objectPosition: "50% 55%",
    },
    {
      src: "/images/gallery/tank-under-cloudy-sky.webp",
      thumbnailSrc: "/images/gallery/thumbnails/tank-under-cloudy-sky.webp",
      alt: "A company tank in the field under cloudy skies",
      width: 1200,
      height: 1600,
      objectPosition: "50% 48%",
    },
    {
      src: "/images/gallery/soldier-at-protected-entrance.webp",
      thumbnailSrc: "/images/gallery/thumbnails/soldier-at-protected-entrance.webp",
      alt: "A company soldier beside a protected entrance during field activity",
      width: 1200,
      height: 1600,
      objectPosition: "50% 45%",
    },
    {
      src: "/images/gallery/tank-at-sunset.webp",
      thumbnailSrc: "/images/gallery/thumbnails/tank-at-sunset.webp",
      alt: "A company tank moving at sunset",
      width: 1200,
      height: 1600,
      objectPosition: "50% 50%",
    },
    {
      src: "/images/gallery/view-from-armored-vehicle.webp",
      thumbnailSrc: "/images/gallery/thumbnails/view-from-armored-vehicle.webp",
      alt: "A view from inside an armored vehicle during company operations",
      width: 1600,
      height: 1200,
      objectPosition: "48% 50%",
    },
    {
      src: "/images/gallery/soldier-beside-tank.webp",
      thumbnailSrc: "/images/gallery/thumbnails/soldier-beside-tank.webp",
      alt: "A company soldier standing beside a tank during operations",
      width: 1600,
      height: 1200,
      objectPosition: "56% 50%",
    },
    {
      src: "/images/gallery/tank-during-operational-activity.webp",
      thumbnailSrc: "/images/gallery/thumbnails/tank-during-operational-activity.webp",
      alt: "A company tank during operational activity in the field",
      width: 1080,
      height: 576,
      objectPosition: "58% 50%",
    },
  ],
  memorialImage: {
    src: "/images/memorial/oriel-aviad-silverman.webp",
    alt: "Oriel Aviad Silverman smiling in a memorial photograph",
    width: 740,
    height: 555,
    objectPosition: "50% 50%",
  },
  socialImage: null,
};
