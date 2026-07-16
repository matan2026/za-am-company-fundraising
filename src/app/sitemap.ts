import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://za-am-company-fundraising.vercel.app";
  return ["", "/privacy", "/accessibility", "/terms"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path ? "yearly" : "weekly",
    priority: path ? 0.4 : 1,
  }));
}
