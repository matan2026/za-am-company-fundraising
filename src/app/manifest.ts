import type { MetadataRoute } from "next";
import { campaignAssets } from "@/config/assets";
import { existingAsset } from "@/lib/public-assets";

export default function manifest(): MetadataRoute.Manifest {
  const unitEmblem = existingAsset(campaignAssets.unitEmblem);

  return {
    name: "Support Za'am Company",
    short_name: "Za'am Company",
    description: "A fundraising campaign for personal equipment, company resilience, and support for soldiers' families.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f5",
    theme_color: "#1d241f",
    lang: "en",
    dir: "ltr",
    icons: unitEmblem
      ? [
          {
            src: unitEmblem.src,
            sizes: `${unitEmblem.width}x${unitEmblem.height}`,
            type: unitEmblem.src.endsWith(".png") ? "image/png" : "image/webp",
          },
        ]
      : [],
  };
}
