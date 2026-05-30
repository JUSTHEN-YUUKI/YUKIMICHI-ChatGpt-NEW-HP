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

const strengths = [
  {
    label: "HOKKAIDO BASED",
    title: "北海道・札幌を拠点に",
    text: "日本国内の商品調達から海外発送まで、北海道・札幌を拠点に丁寧に対応します。",
  },
  {
    label: "SEA & AIR",
    title: "海上輸送・航空輸送に対応",
    text: "海上貨物、航空貨物、EMS・DHL・FedEx・UPS・ヤマト国際宅急便など、用途に応じた輸送方法を検討します。",
  },
  {
    label: "EXPORT SUPPORT",
    title: "輸出実務をサポート",
    text: "商品調達、書類準備、配送方法の比較、見積作成など、海外取引に必要な実務を支援します。",
  },
]

export default function AboutSection() {
  return (
    <section
      id="about"
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
          top: "12%",
          right: "-12%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
          gap: "clamp(48px, 7vw, 96px)",
          alignItems: "center",
        }}
        className="about-v2-grid"
      >
        <ScrollReveal>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">About YUKIMICHI</span>
          </div>

          <h2 className="section-title">
            A Clear Path<br />
            from Japan<br />
            to the <em>World.</em>
          </h2>

          <p className="section-body">
            YUKIMICHI（雪道）は、JUSTHEN CO., LTD. が運営する
            日本発の輸出サポートブランドです。
            <br />
            <br />
            日本国内の商品調達、国際配送、輸出関連書類の準備、
            配送方法の比較、海外バイヤーとのやり取りまで、
            海外のお客様が安心して日本の商品を取引できる環境づくりを支援します。
          </p>

          <p
            style={{
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: 2.05,
              color: "var(--washi-faint)",
              letterSpacing: "0.05em",
              marginBottom: "36px",
            }}
          >
            私たちは単なる発送代行ではなく、日本と世界を信頼でつなぐ
            長期的な国際貿易パートナーを目指しています。
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">
              Contact Us <ArrowRight />
            </Link>
            <Link href="/services" className="btn-ghost">
              Services <ArrowRight size={12} />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            <div
              style={{
                border: "1px solid rgba(201,168,76,0.16)",
                background: "rgba(255,255,255,0.025)",
                padding: "34px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "4px",
                  height: "72px",
                  background: "var(--gold)",
                }}
              />

              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.35em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                }}
              >
                Trusted Gateway to Japan
              </div>

              <p
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontSize: "clamp(20px, 2.5vw, 30px)",
                  fontWeight: 200,
                  lineHeight: 1.75,
                  color: "var(--washi)",
                  letterSpacing: "0.08em",
                }}
              >
                北海道から、海を越え、空を越え、
                <br />
                日本の価値を世界へ届ける。
              </p>
            </div>

            {strengths.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: "22px",
                  padding: "26px 0",
                  borderBottom: "1px solid rgba(201,168,76,0.1)",
                }}
                className="about-v2-strength"
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "12px",
                    letterSpacing: "0.22em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    paddingTop: "4px",
                  }}
                >
                  {item.label}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Noto Serif JP', serif",
                      fontSize: "17px",
                      fontWeight: 300,
                      letterSpacing: "0.08em",
                      color: "var(--washi)",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 300,
                      lineHeight: 1.95,
                      color: "var(--washi-dim)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-v2-grid {
            grid-template-columns: 1fr !important;
          }

          .about-v2-strength {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  )
}
