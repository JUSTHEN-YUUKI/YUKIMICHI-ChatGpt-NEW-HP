'use client'

import Image from 'next/image'
import Link from '@/components/NewTabLink'
import { useLanguage } from '@/components/LanguageProvider'
import { translations } from '@/lib/translations'

export default function HeroSection() {
  const { language } = useLanguage()
  const copy = translations[language].home.hero

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Image
        src="/hero-bg.jpg"
        alt="Hokkaido-based export support from Japan"
        fill
        priority
        style={{
          objectFit: 'cover',
          opacity: 0.35,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          background:
            'linear-gradient(to bottom, rgba(7,17,31,.9), rgba(7,17,31,.55), rgba(7,17,31,.9))',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 20,
          maxWidth: '900px',
          padding: '0 var(--gutter)',
        }}
      >
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">
            {copy.eyebrow}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Noto Serif JP', serif",
            fontWeight: 300,
            fontSize: 'clamp(36px,6vw,72px)',
            lineHeight: 1.5,
            marginBottom: '24px',
          }}
        >
          {copy.headlineLine1}<br />
          <span style={{ color: "var(--gold)" }}>{copy.headlineLine2}</span><br />
          {copy.headlineLine3}
        </h1>

        <p
          style={{
            maxWidth: '700px',
            color: 'var(--washi-dim)',
            lineHeight: 2,
            marginBottom: '40px',
          }}
        >
          {copy.body}
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-primary">
            {copy.consult}
          </Link>

          <Link href="/quote" className="btn-ghost">
            {copy.quote}
          </Link>
        </div>
      </div>
    </section>
  )
}
