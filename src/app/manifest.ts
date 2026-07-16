import type { MetadataRoute } from "next";
import { campaignAssets } from "@/config/assets";
import { existingAsset } from "@/lib/public-assets";

export default function manifest(): MetadataRoute.Manifest {
  const unitEmblem = existingAsset(campaignAssets.unitEmblem);

  return {
    name: "מחזקים את פלוגת זעם",
    short_name: "פלוגת זעם",
    description: "קמפיין גיוס ציוד, חוסן ותמיכה לוגיסטית ללוחמי המילואים.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f5",
    theme_color: "#1d241f",
    lang: "he",
    dir: "rtl",
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
