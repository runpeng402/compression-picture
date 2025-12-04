import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://exactsize.com' // ⚠️ 记得上线后换成你的真实域名

  // 定义所有要生成的尺寸
  const sizesKB = [10, 15, 20, 30, 40, 50, 60, 80, 100, 200, 300, 500]
  const sizesMB = [1, 2]
  const formats = [
    'jpg-to-50kb',
    'png-to-50kb',
    'passport-photo-size',
    'visa-photo-compressor'
  ]

  // 生成首页
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // 生成 KB 页面
  sizesKB.forEach((size) => {
    routes.push({
      url: `${baseUrl}/compress-to-${size}kb`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // 生成 MB 页面
  sizesMB.forEach((size) => {
    routes.push({
      url: `${baseUrl}/compress-to-${size}mb`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // 生成格式页面
  formats.forEach((slug) => {
    routes.push({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  return routes
}