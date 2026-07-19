import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: 'https://justhen.co.jp/sitemap.xml',
    host: 'https://justhen.co.jp',
  }
}
