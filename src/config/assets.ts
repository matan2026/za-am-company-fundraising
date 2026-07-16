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
  galleryImages: [],
  memorialImage: null,
  socialImage: null,
};
