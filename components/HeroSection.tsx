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
            marginBottom: '14px',
          }}
        >
          {copy.headlineLine1}<br />
          <span style={{ color: "var(--gold)" }}>{copy.headlineLine2}</span><br />
          {copy.headlineLine3}
        </h1>

        <p
          style={{
            color: '#f4efe6',
            fontFamily: "'Cormorant Garamond', 'Noto Serif JP', serif",
            fontSize: 'clamp(18px, 2.2vw, 28px)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            lineHeight: 1.45,
            marginBottom: '22px',
            textShadow: '0 2px 16px rgba(0,0,0,0.42)',
          }}
        >
          {copy.headlineSubLine1}<br />
          <span style={{ color: '#bfa46a' }}>{copy.headlineSubLine2}</span>
        </p>

        <p
          style={{
            maxWidth: '700px',
            color: 'var(--washi-dim)',
            lineHeight: 2,
            marginBottom: '40px',
          }}
        >
          <span className="copy-line-ja">{copy.body}</span>
          <span className="copy-line-en">{copy.bodySub}</span>
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-primary">
            <span className="hero-cta-copy">
              <span>{copy.consult}</span>
              <span>{copy.consultSub}</span>
            </span>
          </Link>

          <Link href="/quote" className="btn-ghost">
            <span className="hero-cta-copy">
              <span>{copy.quote}</span>
              <span>{copy.quoteSub}</span>
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        .hero-cta-copy {
          display: grid;
          gap: 3px;
          line-height: 1.2;
          text-align: center;
        }

        .hero-cta-copy span:last-child {
          color: rgba(244, 239, 230, 0.72);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.14em;
          text-transform: none;
        }
      `}</style>
    </section>
  )
}
