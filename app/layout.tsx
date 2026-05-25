import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'YUKIMICHI – SNOWPATH JAPAN | Export from Japan',
  description:
    'YUKIMICHI – SNOWPATH JAPAN. Legal, compliant, and trusted export support from Japan to the world. Operated by JUSTHEN Co., Ltd.',
  keywords:
    'Japan export, Japanese supplier, small lot export, AI export support, Japanese trading company',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Noto+Sans+JP:wght@200;300;400&family=Noto+Serif+JP:wght@200;300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
