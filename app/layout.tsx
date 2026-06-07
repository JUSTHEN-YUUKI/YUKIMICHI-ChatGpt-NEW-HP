import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BackToTopButton from '@/components/BackToTopButton'
import { LanguageProvider } from '@/components/LanguageProvider'
import ContentTranslationBridge from '@/components/ContentTranslationBridge'

export const metadata: Metadata = {
  title: 'YUKIMICHI – Export Support from Japan',
  description:
    'YUKIMICHI provides legal, transparent, and reliable export support from Japan, including product procurement, international express, air freight, sea freight, and export documentation support.',
  keywords:
    'Japan export, Japanese supplier, small lot export, international express, air freight, sea freight, Japanese trading company',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
