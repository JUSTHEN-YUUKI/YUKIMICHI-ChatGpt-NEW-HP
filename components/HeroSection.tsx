'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
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
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(7,17,31,.9), rgba(7,17,31,.55), rgba(7,17,31,.9))',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '900px',
          padding: '0 var(--gutter)',
        }}
      >
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">
            JAPAN EXPORT × HOKKAIDO × GLOBAL LOGISTICS
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
          日本から、世界へ。<br />
          <span style={{ color: 'var(--gold)' }}>
            信頼でつなぐ輸出の道。
          </span>
        </h1>

        <p
          style={{
            maxWidth: '700px',
            color: 'var(--washi-dim)',
            lineHeight: 2,
            marginBottom: '40px',
          }}
        >
          北海道・札幌から世界市場へ。
          海上輸送、航空貨物、EMS・DHL・FedEx・UPS・ヤマト国際宅急便を活用し、
          日本の商品を世界へ届けます。
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-primary">
            無料相談
          </Link>

          <Link href="/quote" className="btn-ghost">
            見積依頼
          </Link>
        </div>
      </div>
    </section>
  )
}
