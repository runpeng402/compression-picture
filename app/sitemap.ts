import { MetadataRoute } from "next";
import { FORMAT_PAGES, POPULAR_SIZES, getSizeHref } from "@/lib/compressionSizes";
import { CONTENT_UPDATED, absoluteUrl } from "@/lib/site";

const INFO_PAGES = ["/about", "/privacy", "/terms", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    ...POPULAR_SIZES.map((size) => ({
      url: absoluteUrl(getSizeHref(size)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...FORMAT_PAGES.map((page) => ({
      url: absoluteUrl(page.href),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...INFO_PAGES.map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
