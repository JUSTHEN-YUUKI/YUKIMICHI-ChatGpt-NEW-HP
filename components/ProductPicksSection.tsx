import Link from "@/components/NewTabLink"
import ScrollReveal from "@/components/ScrollReveal"
import {
  getVisibleProductPicks,
  type ProductPick,
  type ProductPickBuyerType,
  type ProductPickRiskLevel,
} from "@/data/product-picks"

const buyerTypeLabels: Record<ProductPickBuyerType, { ja: string; en: string }> = {
  individual: { ja: "個人向け", en: "Individual Buyers" },
  business: { ja: "法人向け", en: "Business Buyers" },
  both: { ja: "個人・法人向け", en: "Individual & Business" },
}

const riskLevelLabels: Record<ProductPickRiskLevel, string> = {
  standard: "Standard Review",
  attention: "Import Review",
  "restricted-review": "Restricted Item Review",
}

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

function PickMedia({ pick }: { pick: ProductPick }) {
  if (pick.mediaType === "video" && pick.mediaSrc) {
    return (
      <video
        className="pick-media-asset"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={pick.titleEn}
      >
        <source src={pick.mediaSrc} type="video/mp4" />
      </video>
    )
  }

  if (pick.mediaType === "image" && pick.mediaSrc) {
    return <img className="pick-media-asset" src={pick.mediaSrc} alt={pick.titleEn} loading="lazy" />
  }

  return (
    <div className="pick-media-placeholder" aria-label="Showcase media placeholder">
      <span>YUKIMICHI</span>
      <strong>Product Visual</strong>
      <small>Prepared for selected product media</small>
    </div>
  )
}

export default function ProductPicksSection() {
  const visiblePicks = getVisibleProductPicks()

  return (
    <section className="product-picks-section" aria-labelledby="product-picks-title">
      <ScrollReveal>
        <div className="product-picks-head">
          <div>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Hokkaido & Japan Product Picks</span>
            </div>
            <h2 id="product-picks-title" className="section-title">
              Hokkaido &amp; Japan
              <br />
              <em>Product Picks</em>
            </h2>
          </div>
          <p>
            <span className="copy-line-ja">
              北海道・日本商品のピックアップを、輸出実務で確認すべき点とあわせて整理します。
              価格・在庫・輸入可否を断定せず、問い合わせ前に確認すべき情報を明確にします。
            </span>
            <span className="copy-line-en">
              Curated product categories from Hokkaido and Japan are presented with Import Review points,
              suitable buyer types, and shipping options for overseas inquiry preparation.
            </span>
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal stagger>
        <div className="product-picks-grid">
          {visiblePicks.map((pick) => (
            <article className="product-pick-card" key={pick.id}>
              <div className="pick-media">
                <PickMedia pick={pick} />
              </div>

              <div className="pick-card-body">
                <div className="pick-meta">
                  <span>{pick.category}</span>
                  <span>{pick.region}</span>
                </div>

                <h3>
                  {pick.titleEn}
                  <span>{pick.titleJa}</span>
                </h3>

                <div className="pick-badges">
                  <span>{buyerTypeLabels[pick.buyerType].en}</span>
                  <span>{buyerTypeLabels[pick.buyerType].ja}</span>
                  <span>{riskLevelLabels[pick.riskLevel]}</span>
                </div>

                <div className="pick-copy">
                  <p>{pick.descriptionEn}</p>
                  <p>{pick.descriptionJa}</p>
                </div>

                <div className="pick-check">
                  <span>Import Review</span>
                  <p>{pick.importCheckEn}</p>
                  <p>{pick.importCheckJa}</p>
                </div>

                <div className="pick-shipping">
                  <span>Recommended Shipping Method</span>
                  <ul>
                    {pick.shippingOptions.map((option) => (
                      <li key={option}>{option}</li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact" className="pick-card-cta">
                  Request Product Support <ArrowRight size={12} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>

      <style>{`
        .product-picks-section {
          display: grid;
          gap: clamp(24px, 4vw, 38px);
          border-top: 1px solid rgba(201,168,76,0.12);
          padding-top: clamp(42px, 6vw, 72px);
        }

        .product-picks-head {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(24px, 5vw, 68px);
          align-items: end;
        }

        .product-picks-head p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 2;
          margin: 0 0 30px;
        }

        .product-picks-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .product-pick-card {
          min-width: 0;
          border: 1px solid rgba(201,168,76,0.15);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012)),
            rgba(7,17,31,0.38);
          display: grid;
          grid-template-rows: minmax(220px, 0.8fr) auto;
          overflow: hidden;
        }

        .pick-media {
          min-height: 220px;
          position: relative;
          background:
            linear-gradient(140deg, rgba(201,168,76,0.12), transparent 38%),
            linear-gradient(180deg, rgba(13,28,53,0.92), rgba(7,17,31,0.96));
          border-bottom: 1px solid rgba(201,168,76,0.12);
          overflow: hidden;
        }

        .pick-media::after {
          content: "";
          position: absolute;
          inset: 18px;
          border: 1px solid rgba(201,168,76,0.12);
          pointer-events: none;
        }

        .pick-media-asset {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 220px;
          object-fit: cover;
        }

        .pick-media-placeholder {
          min-height: 220px;
          display: grid;
          align-content: space-between;
          padding: 24px;
          position: relative;
          z-index: 1;
        }

        .pick-media-placeholder span,
        .pick-media-placeholder small {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .pick-media-placeholder strong {
          align-self: center;
          color: var(--washi);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 300;
          line-height: 1.05;
        }

        .pick-card-body {
          display: grid;
          gap: 18px;
          padding: clamp(22px, 3vw, 30px);
        }

        .pick-meta,
        .pick-badges,
        .pick-shipping ul {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pick-meta span {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .product-pick-card h3 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(30px, 3.2vw, 42px);
          font-weight: 300;
          line-height: 1.08;
          margin: 0;
        }

        .product-pick-card h3 span {
          color: var(--washi-dim);
          display: block;
          font-family: 'Noto Serif JP', serif;
          font-size: 14px;
          line-height: 1.7;
          margin-top: 10px;
        }

        .pick-badges span,
        .pick-shipping li {
          border: 1px solid rgba(201,168,76,0.15);
          color: var(--washi-dim);
          font-size: 10.5px;
          letter-spacing: 0.08em;
          list-style: none;
          padding: 6px 9px;
        }

        .pick-copy,
        .pick-check,
        .pick-shipping {
          display: grid;
          gap: 8px;
        }

        .pick-copy p,
        .pick-check p {
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.03em;
          line-height: 1.9;
          margin: 0;
        }

        .pick-check {
          border-left: 1px solid rgba(201,168,76,0.25);
          padding-left: 14px;
        }

        .pick-check span,
        .pick-shipping span {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .pick-shipping ul {
          margin: 0;
          padding: 0;
        }

        .pick-card-cta {
          align-items: center;
          color: var(--gold);
          display: inline-flex;
          gap: 9px;
          font-size: 11px;
          justify-self: start;
          letter-spacing: 0.18em;
          line-height: 1.5;
          padding-top: 4px;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.3s;
        }

        .pick-card-cta:hover {
          color: var(--gold-light);
        }

        @media (max-width: 980px) {
          .product-picks-head,
          .product-picks-grid {
            grid-template-columns: 1fr;
          }

          .product-picks-head p {
            margin-bottom: 0;
          }
        }

        @media (max-width: 520px) {
          .pick-card-body {
            padding: 22px;
          }

          .pick-card-cta {
            font-size: 10px;
            letter-spacing: 0.12em;
          }
        }
      `}</style>
    </section>
  )
}
