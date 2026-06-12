'use client'

import Image from 'next/image'
import Link from '@/components/NewTabLink'
import { useLanguage } from '@/components/LanguageProvider'
import { translations } from '@/lib/translations'

export default function HeroSection() {
  const { language } = useLanguage()
  const copy = translations[language].home.hero
  const heroKicker = 'EXPORT SUPPORT FROM JAPAN × INTERNATIONAL LOGISTICS'

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: 'calc(var(--nav-h) + 46px) var(--gutter) 78px',
        boxSizing: 'border-box',
      }}
    >
      <Image
        src="/hero-bg.jpg"
        alt="Hokkaido-based export support from Japan"
        fill
        priority
        style={{
          objectFit: 'cover',
          opacity: 0.46,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          background:
            'linear-gradient(90deg, rgba(7,17,31,.96) 0%, rgba(7,17,31,.86) 34%, rgba(7,17,31,.42) 68%, rgba(7,17,31,.72) 100%), linear-gradient(to bottom, rgba(7,17,31,.92), rgba(7,17,31,.58) 48%, rgba(7,17,31,.95))',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 20,
          width: 'min(920px, 100%)',
          maxWidth: '920px',
        }}
      >
        <div className="hero-kicker" aria-label={heroKicker}>
          <span className="hero-kicker-line" />
          <span>{heroKicker}</span>
        </div>

        <h1
          className="hero-headline"
          style={{
            maxWidth: '780px',
            fontFamily: "'Noto Serif JP', serif",
            fontWeight: 300,
            fontSize: 'clamp(38px,5.2vw,68px)',
            lineHeight: 1.34,
            letterSpacing: '0.04em',
            marginBottom: '18px',
            textShadow: '0 6px 28px rgba(0,0,0,0.48)',
          }}
        >
          {copy.headlineLine1}<br />
          <span style={{ color: 'var(--gold)', textShadow: '0 0 22px rgba(201,168,76,0.18)' }}>{copy.headlineLine2}</span><br />
          {copy.headlineLine3}
        </h1>

        <p
          style={{
            color: '#f4efe6',
            fontFamily: "'Cormorant Garamond', 'Noto Serif JP', serif",
            fontSize: 'clamp(18px, 2vw, 26px)',
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
          className="hero-copy"
          style={{
            maxWidth: '720px',
            color: 'var(--washi-dim)',
            lineHeight: 2,
            marginBottom: '40px',
            textShadow: '0 2px 18px rgba(0,0,0,0.38)',
          }}
        >
          <span className="copy-line-ja">{copy.body}</span>
          <span className="copy-line-en">{copy.bodySub}</span>
        </p>

        <div className="hero-actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
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
        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          max-width: 100%;
          margin-bottom: 22px;
          color: var(--gold);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(12px, 1.35vw, 15px);
          font-weight: 300;
          letter-spacing: 0.28em;
          line-height: 1.5;
          text-transform: uppercase;
          text-shadow: 0 2px 14px rgba(0,0,0,0.42);
        }

        .hero-kicker-line {
          display: block;
          width: 44px;
          height: 1px;
          flex: 0 0 auto;
          background: linear-gradient(90deg, rgba(201,168,76,0), rgba(201,168,76,0.96));
          box-shadow: 0 0 18px rgba(201,168,76,0.3);
        }

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

        @media (max-width: 760px) {
          .hero-section {
            align-items: flex-start !important;
            padding-top: calc(var(--nav-h) + 34px) !important;
            padding-bottom: 56px !important;
          }

          .hero-kicker {
            gap: 10px;
            margin-bottom: 18px;
            font-size: 12px;
            letter-spacing: 0.14em;
          }

          .hero-kicker-line {
            width: 28px;
          }

          .hero-headline {
            font-size: clamp(34px, 10vw, 50px) !important;
            line-height: 1.36 !important;
            letter-spacing: 0.02em !important;
          }

          .hero-copy {
            margin-bottom: 30px !important;
          }

          .hero-actions {
            width: 100%;
          }

          .hero-actions a {
            flex: 1 1 220px;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
