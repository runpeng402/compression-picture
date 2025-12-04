import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // ⚠️ 上线后记得把这里换成你的真实域名
    sitemap: 'https://exactsize.com/sitemap.xml',
  }
}