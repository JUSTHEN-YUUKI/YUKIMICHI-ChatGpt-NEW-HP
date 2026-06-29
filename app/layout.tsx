import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BackToTopButton from '@/components/BackToTopButton'
import { LanguageProvider } from '@/components/LanguageProvider'
import ContentTranslationBridge from '@/components/ContentTranslationBridge'
import Analytics from '@/components/Analytics'

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim()

export const metadata: Metadata = {
  metadataBase: new URL('https://justhen.co.jp'),
  title: {
    default: 'YUKIMICHI | Japan Export Support',
    template: '%s',
  },
  description:
    'YUKIMICHI provides transparent Japan-side export coordination for overseas buyers, including product availability checks, supplier communication, document review, and shipping arrangement support.',
  keywords:
    'Japan export coordination, Japanese product sourcing, small lot export, international courier services, air freight, sea freight',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'YUKIMICHI – SNOWPATH JAPAN',
    title: 'YUKIMICHI | Japan Export Support',
    description:
      'Japan-side product sourcing, export document review, and shipping arrangement support for overseas buyers.',
    locale: 'ja_JP',
    images: [
      {
        url: '/hero-bg.jpg',
        alt: 'YUKIMICHI – Japan-side export coordination from Hokkaido',
      },
    ],
  },
  icons: {
    icon: [
      {
        url: '/favicon.png?v=2',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.png?v=2',
    apple: '/favicon.png?v=2',
  },
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'JUSTHEN CO., LTD.',
    alternateName: 'YUKIMICHI – SNOWPATH JAPAN',
    url: 'https://justhen.co.jp/',
    email: 'exporter@justhen.co.jp',
    address: {
      '@type': 'PostalAddress',
      postalCode: '060-0032',
      addressRegion: 'Hokkaido',
      addressLocality: 'Sapporo, Chuo-ku',
      streetAddress: '8-5-15 Kita 2-jo Higashi',
      addressCountry: 'JP',
    },
  }

  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Noto+Sans+JP:wght@200;300;400&family=Noto+Serif+JP:wght@200;300&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Analytics />
        <LanguageProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <BackToTopButton />
          <ContentTranslationBridge />
        </LanguageProvider>
      </body>
    </html>
  )
}
