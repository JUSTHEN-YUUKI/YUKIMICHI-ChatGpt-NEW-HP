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

const features = [
  {
    num: "01",
    title: "AI Translation",
    titleJp: "AI翻訳サポート",
    desc: "海外バイヤーとの問い合わせ、商品説明、見積条件などを自然なビジネス表現へ整えます。",
  },
  {
    num: "02",
    title: "Quotation Draft",
    titleJp: "見積ドラフト作成",
    desc: "商品代金、送料、手数料、確認事項を整理し、見積作成のスピードを高めます。",
  },
  {
    num: "03",
    title: "Inquiry Management",
    titleJp: "問い合わせ整理",
    desc: "海外からの問い合わせ内容を整理し、必要な確認事項やリスクを分かりやすく洗い出します。",
  },
  {
    num: "04",
    title: "Workflow DX",
    titleJp: "業務効率化",
    desc: "繰り返し発生する輸出業務、メール返信、書類確認、情報整理の効率化を支援します。",
  },
]

export default function AIDXSection() {
  return (
    <section
      id="ai-dx"
      style={{
        position: "relative",
        padding: "var(--section-pad) var(--gutter)",
        background:
          "linear-gradient(180deg, var(--navy-mid) 0%, var(--navy-deep) 100%)",
        borderTop: "1px solid rgba(201,168,76,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          pointerEvents: "none",
          opacity: 0.8,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
          gap: "clamp(48px, 7vw, 96px)",
          alignItems: "center",
        }}
        className="aidx-v2-grid"
      >
        <ScrollReveal>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">AI / DX Support</span>
          </div>

          <h2 className="section-title">
            Quiet AI,<br />
            Practical<br />
            <em>Export DX.</em>
          </h2>

          <p className="section-body">
            YUKIMICHIでは、AIを過度に前面へ出すのではなく、
            輸出実務を支える裏側の仕組みとして活用します。
            <br />
            <br />
            翻訳、問い合わせ整理、見積ドラフト、確認事項の洗い出しなど、
            海外バイヤーとのやり取りをより速く、正確に進めるための
            実務的なAI・DX支援を行います。
          </p>

          <div
            style={{
              border: "1px solid rgba(201,168,76,0.14)",
              background: "rgba(255,255,255,0.025)",
              padding: "26px",
              marginBottom: "34px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.32em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Policy
            </div>
            <p
              style={{
                fontSize: "12.5px",
                lineHeight: 2,
                color: "var(--washi-dim)",
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              最終判断が必要な法令・税関・規制情報については、
              AIだけで断定せず、公的機関・通関業者・各国公式情報での確認を前提とします。
            </p>
          </div>

          <Link href="/contact" className="btn-primary">
            Discuss AI / DX <ArrowRight />
          </Link>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "16px",
            }}
            className="aidx-v2-cards"
          >
            {features.map((feature) => (
              <div
                key={feature.num}
                style={{
                  border: "1px solid rgba(201,168,76,0.13)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.034) 0%, rgba(255,255,255,0.014) 100%)",
                  padding: "30px 26px",
                  minHeight: "260px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    right: "-8px",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "86px",
                    color: "rgba(201,168,76,0.045)",
                    lineHeight: 1,
                  }}
                >
                  {feature.num}
                </div>

                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "13px",
                    letterSpacing: "0.3em",
                    color: "var(--gold)",
                    opacity: 0.8,
                    marginBottom: "24px",
                  }}
                >
                  {feature.num}
                </div>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "26px",
                    fontWeight: 400,
                    color: "var(--washi)",
                    lineHeight: 1.08,
                    marginBottom: "6px",
                  }}
                >
                  {feature.title}
                </h3>

                <div
                  style={{
                    fontFamily: "'Noto Serif JP', serif",
                    fontSize: "12px",
                    fontWeight: 200,
                    letterSpacing: "0.18em",
                    color: "var(--suzu)",
                    marginBottom: "18px",
                  }}
                >
                  {feature.titleJp}
                </div>

                <p
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 300,
                    lineHeight: 2,
                    color: "var(--washi-dim)",
                    letterSpacing: "0.04em",
                    margin: 0,
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 950px) {
          .aidx-v2-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 620px) {
          .aidx-v2-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
