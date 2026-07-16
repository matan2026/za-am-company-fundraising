import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy", "/accessibility", "/terms"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path ? "yearly" : "weekly",
    priority: path ? 0.4 : 1,
  }));
}
