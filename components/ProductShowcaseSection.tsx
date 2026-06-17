"use client"

import Link from "@/components/NewTabLink"
import ScrollReveal from "@/components/ScrollReveal"
import ImportGuideSection from "@/components/ImportGuideSection"
import ProductPicksSection from "@/components/ProductPicksSection"
import { useLanguage } from "@/components/LanguageProvider"
import { translations } from "@/lib/translations"

const productShowcaseBodyColumns = [
  {
    ja: "YUKIMICHIは、日本商品の仕入れ可否調査から、梱包・検品、国際宅配便、航空貨物、海上輸送まで、取扱可否を確認したうえで海外のお客様が安心して日本商品を取引できる環境を整えます。",
    en: "YUKIMICHI organizes sourcing feasibility checks in Japan, packing, inspection, International Courier, Air Freight, and Sea Freight so Overseas Buyers can review eligible products with greater confidence.",
  },
  {
    ja: "商品写真、梱包確認、札幌・北海道の実写素材、輸送関連の動画を活用し、日本発の取引イメージを分かりやすくお伝えします。",
    en: "Product photography, packing scenes, Hokkaido visuals, and logistics footage help present a clear Japan-side transaction image while keeping a compliance-first tone.",
  },
]

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

          <div className="visual-body-grid">
            {productShowcaseBodyColumns.map((body) => (
              <p key={body.en}>
                <span className="copy-line-ja">{body.ja}</span>
                <span className="copy-line-en">{body.en}</span>
              </p>
            ))}
          </div>
        </ScrollReveal>

        <ProductPicksSection />
        <ImportGuideSection />

        <ScrollReveal stagger>
          <div className="visual-card-grid">
            {visualCards.map((card) => (
              <article className="visual-card" key={card.num}>
                <div className="visual-media-box">
                  <span>{card.label}</span>
                  <strong>Curated Visual</strong>
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

        .visual-body-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          max-width: 980px;
        }

        .visual-body-grid p {
          border: 1px solid rgba(201,168,76,0.14);
          background: rgba(13,28,53,0.46);
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2.05;
          margin: 0;
          padding: 18px 20px;
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
          .visual-body-grid {
            grid-template-columns: 1fr;
          }

          .visual-card-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
