import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://compresstokb.com'

  // 定义尺寸
  const sizesKB = [5, 8, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300, 400, 500, 600, 800, 900]
  // ✅ 关键修改：MB 应该直接生成 "1mb", "5mb"，而不是换算成 "1024kb"
  const sizesMB = [1, 2, 5, 10]
  
  const formats = [
    'jpg-to-50kb',
    'png-to-50kb',
    'passport-photo-size',
    'visa-photo-compressor'
  ]

  // 1. 首页
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // 2. KB 页面 (保持原样)
  sizesKB.forEach((size) => {
    routes.push({
      url: `${baseUrl}/compress-to-${size}kb`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // 3. MB 页面 (✅ 修复：使用 mb 后缀)
  sizesMB.forEach((size) => {
    routes.push({
      url: `${baseUrl}/compress-to-${size}mb`, // 这里以前可能写错了计算逻辑
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // 4. 特殊格式页面
  formats.forEach((slug) => {
    routes.push({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  })

  // 5. (可选) 信任页面 - 建议尽快创建这些页面
  // 如果你还没做这些页面，可以先注释掉，做好了再放开
  /*
  const staticPages = ['privacy-policy', 'terms-of-service', 'about'];
  staticPages.forEach((page) => {
    routes.push({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    })
  })
  */

  return routes
}