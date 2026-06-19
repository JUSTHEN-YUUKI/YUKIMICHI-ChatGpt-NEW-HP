"use client"

import ScrollReveal from "@/components/ScrollReveal"
import ImportGuideSection from "@/components/ImportGuideSection"
import { useLanguage } from "@/components/LanguageProvider"
import { translations } from "@/lib/translations"

const productShowcaseBodyColumns = [
  {
    ja: "YUKIMICHIは、日本商品の仕入れ可否調査から、梱包・検品、国際宅配便、航空貨物、海上輸送まで、取扱可否を確認したうえで海外のお客様が安心して日本商品を取引できる環境を整えます。",
    en: "YUKIMICHI organizes sourcing feasibility checks in Japan, packing, inspection, international courier services, air freight, and sea freight so overseas buyers can review eligible products with greater confidence.",
  },
]

export default function ProductShowcaseSection() {
  const { language } = useLanguage()
  const copy = translations[language].home.productShowcase
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

        <ImportGuideSection />
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
          grid-template-columns: minmax(0, 1fr);
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
      `}</style>
    </section>
  )
}
