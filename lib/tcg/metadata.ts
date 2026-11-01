import type { Metadata } from 'next'

export function tcgMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: `${title} | YUKIMICHI TCG B2B`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | YUKIMICHI TCG B2B`, description,
      url: `https://justhen.co.jp${path}`, type: 'website',
      siteName: 'YUKIMICHI TCG B2B', locale: 'ja_JP',
      images: [{ url: '/hero-bg.jpg', alt: 'YUKIMICHI Japan export support' }],
    },
  }
}
