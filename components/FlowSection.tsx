"use client"

import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
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

const flowSteps = [
  {
    num: "01",
    title: "Inquiry",
    titleJp: "お問い合わせ",
    desc: "商品名、数量、配送先国、希望納期などをお知らせください。内容が未確定でも、まずは相談ベースで対応します。",
  },
  {
    num: "02",
    title: "Product Review",
    titleJp: "内容確認",
    desc: "取扱可否、配送方法、輸出に関する注意点、必要情報を確認します。小ロットやサンプル出荷の相談も可能です。",
  },
  {
    num: "03",
    title: "Quote Preparation",
    titleJp: "お見積り",
    desc: "商品代金、手配手数料、国際送料、想定される追加費用をできるだけ分かりやすく整理して提示します。",
  },
  {
    num: "04",
    title: "Procurement",
    titleJp: "商品調達",
    desc: "日本国内での商品購入、仕入れ、簡易確認、発送準備を進めます。必要に応じて梱包や書類準備も行います。",
  },
  {
    num: "05",
    title: "International Shipping",
    titleJp: "輸出・国際発送",
    desc: "EMS・DHL・FedEx・UPS・ヤマト国際宅急便、航空貨物、海上輸送などから案件に合う方法を選定します。",
  },
  {
    num: "06",
    title: "Delivery & Follow-up",
    titleJp: "納品・フォロー",
    desc: "追跡情報を共有し、到着までの流れを確認します。継続取引や次回見積りの相談にも対応します。",
  },
]

export default function FlowSection() {
  return (
    <section
      id="flow"
      style={{
        position: "relative",
        padding: "var(--section-pad) var(--gutter)",
        background: "var(--navy-deep)",
        borderTop: "1px solid rgba(201,168,76,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "-10%",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.055) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <ScrollReveal>
        <div
          style={{
            textAlign: "center",
            maxWidth: "760px",
            margin: "0 auto 64px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            <div className="section-label-line" />
            <span className="section-label-text">Export Process</span>
            <div className="section-label-line" />
          </div>

          <h2 className="section-title" style={{ textAlign: "center" }}>
            A Clear Process<br />
            for International<br />
            <em>Export.</em>
          </h2>

          <p className="section-body" style={{ marginBottom: 0 }}>
            初めての海外取引でも不安が少なくなるように、
            お問い合わせから納品までの流れを明確にし、
            必要な確認事項を一つずつ整理して進めます。
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal stagger>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "18px",
          }}
          className="flow-v2-grid"
        >
          {flowSteps.map((step) => (
            <div
              key={step.num}
              style={{
                border: "1px solid rgba(201,168,76,0.13)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)",
                padding: "32px 28px",
                minHeight: "290px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-30px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "120px",
                  lineHeight: 1,
                  color: "rgba(201,168,76,0.045)",
                  pointerEvents: "none",
                }}
              >
                {step.num}
              </div>

              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "50%",
                  border: "1px solid rgba(201,168,76,0.32)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "22px",
                  color: "var(--gold)",
                  marginBottom: "26px",
                  background: "rgba(7,17,31,0.55)",
                }}
              >
                {step.num}
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "27px",
                  fontWeight: 400,
                  color: "var(--washi)",
                  lineHeight: 1.1,
                  marginBottom: "6px",
                }}
              >
                {step.title}
              </h3>

              <div
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontSize: "12px",
                  fontWeight: 200,
                  letterSpacing: "0.18em",
                  color: "var(--suzu)",
                  marginBottom: "20px",
                }}
              >
                {step.titleJp}
              </div>

              <p
                style={{
                  fontSize: "12.5px",
                  fontWeight: 300,
                  lineHeight: 2,
                  color: "var(--washi-dim)",
                  letterSpacing: "0.04em",
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "52px",
            padding: "32px",
            border: "1px solid rgba(201,168,76,0.13)",
            background: "rgba(255,255,255,0.025)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.3em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Initial Consultation
            </div>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 2,
                color: "var(--washi-dim)",
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              商品名や配送先が決まっていない段階でもご相談可能です。
              まずは状況を整理し、最適な進め方をご提案します。
            </p>
          </div>

          <Link href="/contact" className="btn-primary">
            Start Export Inquiry <ArrowRight />
          </Link>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 1050px) {
          .flow-v2-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 680px) {
          .flow-v2-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
