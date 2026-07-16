import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
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
    icons: [
      {
        src: "/images/unit-emblem-placeholder.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
