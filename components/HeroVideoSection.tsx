"use client"

import ScrollReveal from "@/components/ScrollReveal"

export default function HeroVideoSection() {
  return (
    <section className="hero-video-section" aria-labelledby="hero-video-title">
      <div className="hero-video-inner max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="hero-video-heading">
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">YUKIMICHI FIELD VISUALS</span>
            </div>

            <h2 id="hero-video-title">
              Export Scenes
              <span>from Japan</span>
            </h2>

            <p>
              YUKIMICHI / Product Sourcing / Packing / Documentation / Air Freight / Sea Freight
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="hero-video-card max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video">
            <video
              className="hero-video w-full h-full object-cover"
              controls
              muted
              playsInline
              preload="metadata"
              poster="/hero-bg.jpg"
              aria-label="YUKIMICHI product and logistics media"
            >
              <source src="/yukimichi-site-promo-remotion-final.mp4" type="video/mp4" />
            </video>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .hero-video-section {
          background:
            linear-gradient(180deg, var(--navy-deep) 0%, var(--navy-mid) 52%, var(--navy-deep) 100%);
          border-top: 1px solid rgba(201,168,76,0.08);
          padding: clamp(46px, 7vw, 92px) var(--gutter) clamp(52px, 8vw, 104px);
        }

        .hero-video-inner {
          margin: 0 auto;
          max-width: 1152px;
        }

        .hero-video-heading {
          margin-bottom: clamp(24px, 4vw, 38px);
          max-width: 760px;
        }

        .hero-video-heading h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(34px, 4.6vw, 58px);
          font-weight: 300;
          line-height: 1.08;
          margin: 0 0 18px;
        }

        .hero-video-heading h2 span {
          color: var(--gold);
          display: block;
          font-style: italic;
        }

        .hero-video-heading p {
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.08em;
          line-height: 1.9;
          margin: 0;
          text-transform: uppercase;
        }

        .hero-video-card {
          aspect-ratio: 16 / 9;
          background: rgba(7,17,31,0.92);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          box-shadow: 0 28px 80px rgba(0,0,0,0.42);
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .hero-video-card::after {
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 20px;
          content: "";
          inset: 18px;
          pointer-events: none;
          position: absolute;
        }

        .hero-video {
          display: block;
          height: 100%;
          object-fit: cover;
          width: 100%;
        }

        @media (max-width: 640px) {
          .hero-video-section {
            padding-top: 38px;
          }

          .hero-video-card {
            border-radius: 18px;
          }

          .hero-video-card::after {
            border-radius: 14px;
            inset: 10px;
          }
        }
      `}</style>
    </section>
  )
}
