import { MetadataRoute } from "next";

// 和站内实际支持的精确尺寸保持一致（KB 为单位）
const SIZES_KB = [
  5,
  8,
  10,
  15,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
  150,
  200,
  250,
  300,
  400,
  500,
  600,
  800,
  900,
  // 以下是 MB 对应的 KB：1MB、2MB、5MB、10MB
  1024,   // 1MB
  2048,   // 2MB
  5120,   // 5MB
  10240,  // 10MB
];

const SPECIAL_PAGES = [
  "jpg-to-50kb",
  "png-to-50kb",
  "passport-photo-size",
  "visa-photo-compressor",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://compresstokb.com";

  // 精确 KB / MB 页面
  const kbPages: MetadataRoute.Sitemap = SIZES_KB.map((size) => ({
    url: `${baseUrl}/compress-to-${size}kb`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 专题页（SEO 非常重要）
  const specialPages: MetadataRoute.Sitemap = SPECIAL_PAGES.map((slug) => ({
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
