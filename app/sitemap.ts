import type { MetadataRoute } from 'next'

const routes = [
  '',
  '/about',
  '/services',
  '/pricing',
  '/flow',
  '/faq',
  '/terms',
  '/restricted',
  '/privacy',
  '/contact',
  '/quote',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.map((route) => ({
    url: `https://justhen.co.jp${route || '/'}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/contact' || route === '/quote' ? 0.9 : 0.7,
  }))
}
