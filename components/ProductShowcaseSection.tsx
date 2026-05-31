"use client"

import Link from "@/components/NewTabLink"
import ScrollReveal from "@/components/ScrollReveal"
import { useLanguage } from "@/components/LanguageProvider"
import { translations } from "@/lib/translations"

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ProductShowcaseSection() {
  const { language } = useLanguage()
  const copy = translations[language].home.productShowcase
  const visualCards = copy.cards.map((card, index) => ({
    ...card,
    num: String(index + 1).padStart(2, "0"),
  }))

  return (
    <section id="product-showcase" className="visual-showcase">
      <div className="visual-showcase-grid-bg" aria-hidden="true" />

      <div className="visual-showcase-inner">
        <ScrollReveal>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">{copy.label}</span>
          </div>

          <h2 className="section-title">
            {copy.titleLine1}
            <br />
            {copy.titleLine2}
          </h2>

          <p className="visual-subtitle">
            {copy.subtitle}
          </p>

          <p className="section-body">
            {copy.body}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="visual-film-frame" aria-label="Main visual area for product and logistics film">
            <div className="visual-film-header">
              <span>Main Visual Area</span>
              <span>Product &amp; Logistics Film</span>
            </div>

            <div className="visual-film-center">
              <div className="visual-play-mark" aria-hidden="true" />
              <div>
                <p>{copy.filmTitle}</p>
                <strong>{copy.filmMeta}</strong>
              </div>
            </div>

            <div className="visual-film-footer">
              <span>Brand Visual</span>
              <span>Logistics Visual</span>
              <span>Product Media</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div className="visual-card-grid">
            {visualCards.map((card) => (
              <article className="visual-card" key={card.num}>
                <div className="visual-media-box">
                  <span>{card.label}</span>
                  <strong>Visual Area</strong>
                </div>
                <div className="visual-card-body">
                  <div className="visual-card-number">{card.num}</div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="visual-local-panel">
            <div>
              <span className="visual-panel-kicker">Local Advantage</span>
              <h3>{copy.localTitle}</h3>
            </div>
            <div>
              <p>
                {copy.localBody}
              </p>
              <ul>
                {copy.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="visual-actions">
            <Link href="/services" className="btn-ghost">
              {translations[language].common.services} <ArrowRight size={12} />
            </Link>
            <Link href="/quote" className="btn-primary">
              {translations[language].common.quote} <ArrowRight />
            </Link>
            <Link href="/contact" className="btn-ghost">
              {translations[language].common.contact} <ArrowRight size={12} />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .visual-showcase {
          position: relative;
          padding: var(--section-pad) var(--gutter);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.12), transparent 34%),
            linear-gradient(180deg, var(--navy-deep) 0%, var(--navy-mid) 52%, var(--navy-deep) 100%);
          border-top: 1px solid rgba(201,168,76,0.08);
          overflow: hidden;
        }

        .visual-showcase-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.026) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.026) 1px, transparent 1px);
          background-size: 84px 84px;
          opacity: 0.72;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%);
        }

        .visual-showcase-inner {
          position: relative;
          z-index: 1;
          display: grid;
          gap: clamp(34px, 5vw, 58px);
        }

        .visual-subtitle {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(23px, 3vw, 38px);
          font-style: italic;
          font-weight: 300;
          line-height: 1.25;
          margin: -10px 0 24px;
        }

        .visual-film-frame {
          min-height: clamp(360px, 48vw, 560px);
          border: 1px solid rgba(201,168,76,0.22);
          background:
            linear-gradient(125deg, rgba(201,168,76,0.12), transparent 30%),
            linear-gradient(315deg, rgba(139,30,47,0.22), transparent 38%),
            linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012));
          display: grid;
          grid-template-rows: auto 1fr auto;
          overflow: hidden;
          padding: clamp(22px, 4vw, 36px);
          position: relative;
        }

        .visual-film-frame::before,
        .visual-film-frame::after {
          content: "";
          position: absolute;
          pointer-events: none;
        }

        .visual-film-frame::before {
          inset: clamp(18px, 3vw, 34px);
          border: 1px solid rgba(201,168,76,0.12);
        }

        .visual-film-frame::after {
          inset: 0;
          background:
            linear-gradient(115deg, transparent 0%, transparent 46%, rgba(248,245,239,0.035) 46%, rgba(248,245,239,0.035) 54%, transparent 54%),
            linear-gradient(90deg, rgba(201,168,76,0.04), transparent 22%, transparent 78%, rgba(201,168,76,0.035));
        }

        .visual-film-header,
        .visual-film-footer {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          gap: 18px;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
        }

        .visual-film-footer {
          color: var(--washi-faint);
          justify-content: flex-start;
          flex-wrap: wrap;
        }

        .visual-film-center {
          position: relative;
          z-index: 1;
          display: grid;
          place-items: center;
          align-content: center;
          gap: 22px;
          text-align: center;
        }

        .visual-play-mark {
          width: 82px;
          height: 82px;
          border: 1px solid rgba(201,168,76,0.4);
          border-radius: 50%;
          position: relative;
          background: rgba(7,17,31,0.42);
        }

        .visual-play-mark::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 53%;
          transform: translate(-50%, -50%);
          border-top: 11px solid transparent;
          border-bottom: 11px solid transparent;
          border-left: 17px solid var(--gold);
        }

        .visual-film-center p {
          color: var(--washi);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 5vw, 58px);
          font-weight: 300;
          line-height: 1.06;
          margin: 0 0 12px;
        }

        .visual-film-center strong {
          color: var(--washi-dim);
          display: block;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.18em;
          line-height: 1.9;
          text-transform: uppercase;
        }

        .visual-card-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .visual-card {
          min-height: 340px;
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(255,255,255,0.036), rgba(255,255,255,0.014));
          overflow: hidden;
          display: grid;
          grid-template-rows: minmax(150px, 0.95fr) auto;
        }

        .visual-media-box {
          position: relative;
          min-height: 158px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          padding: 20px;
          background:
            linear-gradient(135deg, rgba(201,168,76,0.08), transparent 42%),
            linear-gradient(160deg, rgba(13,28,53,0.98), rgba(7,17,31,0.92));
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }

        .visual-media-box::before {
          content: "";
          position: absolute;
          inset: 18px;
          border: 1px solid rgba(201,168,76,0.12);
          pointer-events: none;
        }

        .visual-media-box span,
        .visual-media-box strong {
          position: relative;
          z-index: 1;
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .visual-media-box span {
          color: var(--gold);
        }

        .visual-media-box strong {
          color: var(--washi-faint);
          font-weight: 300;
        }

        .visual-card-body {
          padding: 24px;
        }

        .visual-card-number {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          margin-bottom: 14px;
        }

        .visual-card-body h3 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', serif;
          font-size: 27px;
          font-weight: 400;
          line-height: 1.08;
          margin-bottom: 10px;
        }

        .visual-card-body p,
        .visual-local-panel p {
          color: var(--washi-dim);
          font-size: 12.5px;
          line-height: 1.9;
          letter-spacing: 0.04em;
          margin: 0;
        }

        .visual-local-panel {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(28px, 5vw, 72px);
          border: 1px solid rgba(201,168,76,0.16);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.18), transparent 48%),
            rgba(13,28,53,0.72);
          padding: clamp(26px, 4vw, 42px);
        }

        .visual-panel-kicker {
          color: var(--gold);
          display: block;
          font-size: 10px;
          letter-spacing: 0.3em;
          margin-bottom: 16px;
          text-transform: uppercase;
        }

        .visual-local-panel h3 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 300;
          line-height: 1.35;
          margin: 0;
        }

        .visual-local-panel ul {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          list-style: none;
          margin: 22px 0 0;
          padding: 0;
        }

        .visual-local-panel li {
          border: 1px solid rgba(201,168,76,0.14);
          color: var(--washi-dim);
          font-size: 11px;
          letter-spacing: 0.12em;
          padding: 7px 10px;
          text-transform: uppercase;
        }

        .visual-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        @media (max-width: 1100px) {
          .visual-card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 820px) {
          .visual-local-panel {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .visual-card-grid {
            grid-template-columns: 1fr;
          }

          .visual-film-header {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  )
}
