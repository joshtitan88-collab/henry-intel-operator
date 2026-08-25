import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteUrl();
  const paths = [
    "/",
    "/how-it-works",
    "/pricing",
    "/privacy",
    "/terms",
  ];
  return paths.map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
