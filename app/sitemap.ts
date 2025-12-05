// app/sitemap.ts
import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://compresstokb.com"

  const kbSizes = [
    5, 8,
    10, 15, 20, 30, 40, 50, 60, 70, 80, 90,
    100, 150, 200, 250, 300, 400, 500,
    600, 800, 900,
  ]

  const mbSizes = [1, 2, 5, 10]

  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
    },

    // KB 长尾：/compress-to-10kb 这类
    ...kbSizes.map((size) => ({
      url: `${baseUrl}/compress-to-${size}kb`,
      lastModified: now,
    })),

    // MB 长尾：/compress-to-5mb 这类
    ...mbSizes.map((size) => ({
      url: `${baseUrl}/compress-to-${size}mb`,
      lastModified: now,
    })),

    // 专题页
    {
      url: `${baseUrl}/jpg-to-50kb`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/png-to-50kb`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/passport-photo-size`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/visa-photo-compressor`,
      lastModified: now,
    },
  ]

  return routes
}
