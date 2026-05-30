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

const pricePlans = [
  {
    label: "Express",
    title: "International Express",
    titleJp: "国際宅配便",
    fee: "15",
    unit: "% + min ¥10,000",
    highlight: false,
    desc: "小口・サンプル・短納期の海外発送向け。EMS・DHL・FedEx・UPS・ヤマト国際宅急便などを比較します。",
    points: ["EMS", "DHL / FedEx / UPS", "ヤマト国際宅急便", "小ロット対応"],
  },
  {
    label: "Air Cargo",
    title: "Air Freight",
    titleJp: "航空貨物",
    fee: "10",
    unit: "% + min ¥30,000",
    highlight: true,
    desc: "緊急輸送、高付加価値商品、納期優先の案件向け。航空貨物や国際エクスプレスを組み合わせて検討します。",
    points: ["緊急輸送", "短納期", "高付加価値商品", "スピード重視"],
  },
  {
    label: "Sea Freight",
    title: "Sea Freight",
    titleJp: "海上輸送",
    fee: "7",
    unit: "% + min ¥30,000",
    highlight: false,
    desc: "大量輸送・継続出荷・コスト重視の案件向け。FCL・LCLなど貨物量に応じた輸送方法を検討します。",
    points: ["FCL", "LCL", "大量輸送", "コスト最適化"],
  },
]

const notes = [
  "上記は手配手数料の目安です。商品内容・配送先・数量・梱包条件により変動します。",
  "国際送料、関税、VAT/GST、保険料、特殊梱包費、検査費用などは別途見積りとなります。",
  "HSコードや各国規制は参考確認となり、最終判断は税関・通関業者・公的機関の確認を前提とします。",
]

export default function PricingSection() {
  return (
    <section
      id="pricing"
      style={{
        position: "relative",
        padding: "var(--section-pad) var(--gutter)",
        background:
          "linear-gradient(180deg, var(--navy-deep) 0%, var(--navy-mid) 100%)",
        borderTop: "1px solid rgba(201,168,76,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "-12%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <ScrollReveal>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "32px",
            alignItems: "flex-end",
            flexWrap: "wrap",
            marginBottom: "56px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Pricing</span>
            </div>

            <h2 className="section-title">
              Transparent<br />
              <em>Pricing.</em>
            </h2>

            <p className="section-body" style={{ maxWidth: "650px", marginBottom: 0 }}>
              案件ごとに必要な費用を整理し、できるだけ分かりやすい見積りを提示します。
              小口発送から航空貨物・海上輸送まで、商品内容と配送先に合わせてご提案します。
            </p>
          </div>

          <Link href="/contact" className="btn-ghost">
            Request Quote <ArrowRight size={12} />
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal stagger>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px",
          }}
          className="pricing-v2-grid"
        >
          {pricePlans.map((plan) => (
            <div
              key={plan.label}
              style={{
                position: "relative",
                border: plan.highlight
                  ? "1px solid rgba(201,168,76,0.36)"
                  : "1px solid rgba(201,168,76,0.13)",
                background: plan.highlight
                  ? "linear-gradient(180deg, rgba(201,168,76,0.075) 0%, rgba(255,255,255,0.02) 100%)"
                  : "rgba(255,255,255,0.025)",
                padding: "36px 30px",
                minHeight: "430px",
                overflow: "hidden",
              }}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "var(--gold)",
                  }}
                />
              )}

              <div
                style={{
                  display: "inline-block",
                  fontSize: "9px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: plan.highlight ? "var(--navy-deep)" : "var(--gold)",
                  background: plan.highlight ? "var(--gold)" : "rgba(201,168,76,0.08)",
                  padding: "6px 10px",
                  marginBottom: "22px",
                }}
              >
                {plan.highlight ? "Recommended" : plan.label}
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "var(--washi)",
                  lineHeight: 1.05,
                  marginBottom: "6px",
                }}
              >
                {plan.title}
              </h3>

              <div
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontSize: "12px",
                  fontWeight: 200,
                  letterSpacing: "0.18em",
                  color: "var(--suzu)",
                  marginBottom: "26px",
                }}
              >
                {plan.titleJp}
              </div>

              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "54px",
                  fontWeight: 300,
                  color: "var(--gold)",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {plan.fee}
                <span
                  style={{
                    fontSize: "15px",
                    color: "var(--suzu)",
                    marginLeft: "8px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {plan.unit}
                </span>
              </div>

              <p
                style={{
                  fontSize: "12.5px",
                  lineHeight: 2,
                  color: "var(--washi-dim)",
                  letterSpacing: "0.04em",
                  marginTop: "24px",
                  marginBottom: "24px",
                }}
              >
                {plan.desc}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {plan.points.map((point) => (
                  <span
                    key={point}
                    style={{
                      border: "1px solid rgba(201,168,76,0.18)",
                      color: "var(--washi-faint)",
                      padding: "6px 10px",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      lineHeight: 1,
                    }}
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "42px",
            border: "1px solid rgba(201,168,76,0.13)",
            background: "rgba(255,255,255,0.025)",
            padding: "30px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Notes
          </div>

          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {notes.map((note) => (
              <p
                key={note}
                style={{
                  fontSize: "12px",
                  lineHeight: 1.9,
                  color: "var(--washi-dim)",
                  letterSpacing: "0.04em",
                  margin: 0,
                }}
              >
                ・{note}
              </p>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 1000px) {
          .pricing-v2-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
