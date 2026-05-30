"use client"

import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

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

const showcaseCards = [
  {
    num: "01",
    title: "Japanese Products",
    text: "日本国内正規品・小ロット・サンプル対応",
    label: "Product Photo",
  },
  {
    num: "02",
    title: "Packing & Inspection",
    text: "梱包・検品・出荷前確認",
    label: "Inspection Scene",
  },
  {
    num: "03",
    title: "Air Freight",
    text: "EMS / DHL / FedEx / UPS / ヤマト国際宅急便 / 航空貨物",
    label: "Air Cargo",
  },
  {
    num: "04",
    title: "Sea Freight",
    text: "FCL / LCL / コンテナ輸送 / 大型貨物",
    label: "Sea Cargo",
  },
  {
    num: "05",
    title: "Hokkaido Visuals",
    text: "札幌・北海道発の信頼感あるブランド表現",
    label: "Hokkaido Story",
  },
  {
    num: "06",
    title: "Global Buyers",
    text: "海外バイヤー・法人・インフルエンサー向け対応",
    label: "Buyer Support",
  },
]

export default function ProductShowcaseSection() {
  return (
    <section
      id="product-showcase"
      style={{
        position: "relative",
        padding: "var(--section-pad) var(--gutter)",
        background:
          "linear-gradient(180deg, var(--navy-deep) 0%, var(--navy-mid) 52%, var(--navy-deep) 100%)",
        borderTop: "1px solid rgba(201,168,76,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.026) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.026) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          opacity: 0.72,
          pointerEvents: "none",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "-18%",
          top: "10%",
          width: "620px",
          height: "620px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.82fr) minmax(0, 1.18fr)",
          gap: "clamp(42px, 6vw, 92px)",
          alignItems: "start",
        }}
        className="product-showcase-layout"
      >
        <ScrollReveal>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Product Showcase</span>
          </div>

          <h2 className="section-title">
            日本の商品を、
            <br />
            世界へ届ける。
          </h2>

          <p className="section-body">
            YUKIMICHIは、日本国内の商品調達から、梱包・検品、国際宅配便、
            航空貨物、海上輸送まで、海外のお客様が安心して日本商品を
            取引できる環境を整えます。
          </p>

          <div className="product-video-frame">
            <div className="product-frame-topline">
              <span>Product Introduction Video</span>
              <span>COMING VISUAL</span>
            </div>
            <div className="product-video-center">
              <div className="product-play-mark" aria-hidden="true" />
              <p>後で public/top-video.mp4 へ差し替え可能な動画枠</p>
            </div>
            <div className="product-frame-bottomline">
              Hokkaido / Japanese Products / Global Trade
            </div>
          </div>

          <div className="product-actions">
            <Link href="/services" className="btn-ghost">
              Services <ArrowRight size={12} />
            </Link>
            <Link href="/quote" className="btn-primary">
              Request Quote <ArrowRight />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div className="product-card-grid">
            {showcaseCards.map((card) => (
              <article className="product-showcase-card" key={card.num}>
                <div className="product-media-placeholder">
                  <span>{card.label}</span>
                  <strong>MEDIA PLACEHOLDER</strong>
                </div>
                <div className="product-card-body">
                  <div className="product-card-number">{card.num}</div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .product-video-frame {
          border: 1px solid rgba(201,168,76,0.18);
          background:
            linear-gradient(135deg, rgba(201,168,76,0.075), transparent 38%),
            linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.014));
          min-height: 310px;
          padding: 24px;
          display: grid;
          grid-template-rows: auto 1fr auto;
          margin: 40px 0 26px;
          position: relative;
          overflow: hidden;
        }

        .product-video-frame::before,
        .product-video-frame::after {
          content: "";
          position: absolute;
          width: 120px;
          height: 1px;
          background: rgba(201,168,76,0.38);
        }

        .product-video-frame::before {
          top: 18px;
          left: 18px;
        }

        .product-video-frame::after {
          right: 18px;
          bottom: 18px;
        }

        .product-frame-topline,
        .product-frame-bottomline {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          gap: 18px;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .product-frame-bottomline {
          color: var(--washi-faint);
          justify-content: flex-start;
        }

        .product-video-center {
          position: relative;
          z-index: 1;
          display: grid;
          place-items: center;
          align-content: center;
          gap: 18px;
          text-align: center;
        }

        .product-play-mark {
          width: 74px;
          height: 74px;
          border: 1px solid rgba(201,168,76,0.36);
          border-radius: 50%;
          position: relative;
          background: rgba(7,17,31,0.45);
        }

        .product-play-mark::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 53%;
          transform: translate(-50%, -50%);
          borderTop: 10px solid transparent;
          borderBottom: 10px solid transparent;
          borderLeft: 15px solid var(--gold);
        }

        .product-video-center p {
          margin: 0;
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.08em;
        }

        .product-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .product-card-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .product-showcase-card {
          min-height: 320px;
          border: 1px solid rgba(201,168,76,0.14);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.036), rgba(255,255,255,0.014));
          overflow: hidden;
          display: grid;
          grid-template-rows: minmax(150px, 0.95fr) auto;
        }

        .product-media-placeholder {
          position: relative;
          min-height: 150px;
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

        .product-media-placeholder::before {
          content: "";
          position: absolute;
          inset: 18px;
          border: 1px solid rgba(201,168,76,0.12);
          pointer-events: none;
        }

        .product-media-placeholder span {
          position: relative;
          z-index: 1;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .product-media-placeholder strong {
          position: relative;
          z-index: 1;
          color: var(--washi-faint);
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .product-card-body {
          padding: 24px;
        }

        .product-card-number {
          font-family: 'Cormorant Garamond', serif;
          color: var(--gold);
          font-size: 24px;
          margin-bottom: 14px;
        }

        .product-card-body h3 {
          font-family: 'Cormorant Garamond', serif;
          color: var(--washi);
          font-size: 27px;
          font-weight: 400;
          line-height: 1.08;
          margin-bottom: 10px;
        }

        .product-card-body p {
          color: var(--washi-dim);
          font-size: 12.5px;
          line-height: 1.9;
          letter-spacing: 0.04em;
          margin: 0;
        }

        @media (max-width: 980px) {
          .product-showcase-layout {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 620px) {
          .product-card-grid {
            grid-template-columns: 1fr !important;
          }

          .product-frame-topline {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  )
}
