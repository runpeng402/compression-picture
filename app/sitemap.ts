import { MetadataRoute } from "next";

// 你已有的 KB 长尾词数组（可以和 compressionSizes.ts 共用）
const SIZES_KB = [
  5, 8, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90,
  100, 150, 200, 250, 300, 400, 500, 600, 800, 900
];

const SPECIAL_PAGES = [
  "jpg-to-50kb",
  "png-to-50kb",
  "passport-photo-size",
  "visa-photo-compressor"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://compresstokb.com";

  // KB pages
  const kbPages = SIZES_KB.map((size) => ({
    url: `${baseUrl}/compress-to-${size}kb`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 专题页（SEO 非常重要）
  const specialPages = SPECIAL_PAGES.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...kbPages,
    ...specialPages,
  ];
}
