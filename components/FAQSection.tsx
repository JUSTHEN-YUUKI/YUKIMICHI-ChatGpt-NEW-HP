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

const faqs = [
  {
    q: "小ロットやサンプル出荷にも対応できますか？",
    a: "はい、1点からの小口発送やサンプル出荷の相談にも対応します。商品内容、配送先国、数量によって最適な配送方法や費用が変わるため、まずは商品情報をお知らせください。",
  },
  {
    q: "どの配送会社を利用できますか？",
    a: "EMS・DHL・FedEx・UPS・ヤマト国際宅急便などの国際宅配便に加え、案件によっては航空貨物・海上輸送も検討します。納期、コスト、商品特性に応じてご提案します。",
  },
  {
    q: "航空貨物と海上輸送のどちらが良いですか？",
    a: "短納期・緊急輸送・高付加価値商品は航空貨物が向いています。大量輸送やコスト重視の継続出荷は海上輸送が向いています。YUKIMICHIでは案件ごとに比較してご案内します。",
  },
  {
    q: "関税やVAT/GSTも事前に分かりますか？",
    a: "概算確認や参考情報の整理は可能です。ただし、最終的な関税・VAT/GST・輸入規制の判断は相手国税関や通関業者、公的機関の確認が前提となります。",
  },
  {
    q: "輸出できない商品はありますか？",
    a: "はい、医薬品、食品、化粧品、電池、危険品、中古品、ブランド品、規制対象品などは国や商品によって条件が異なります。事前に商品情報を確認し、対応可否を整理します。",
  },
  {
    q: "見積りにはどの情報が必要ですか？",
    a: "商品名、数量、商品URL、配送先国、希望納期、サイズ・重量、希望配送方法があるとスムーズです。未確定の場合でも、分かる範囲でご相談いただけます。",
  },
]

export default function FAQSection() {
  return (
    <section
      id="faq"
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
          right: "-16%",
          top: "18%",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.055) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
          gap: "clamp(48px, 7vw, 96px)",
          alignItems: "start",
        }}
        className="faq-v2-grid"
      >
        <ScrollReveal>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">FAQ</span>
          </div>

          <h2 className="section-title">
            Before You<br />
            Start <em>Export.</em>
          </h2>

          <p className="section-body">
            初めて日本から商品を輸入する海外バイヤーにも分かりやすいように、
            よくある質問を整理しました。
            <br />
            <br />
            商品内容や配送先国によって条件は変わるため、
            詳細は個別見積り時に確認します。
          </p>

          <Link href="/contact" className="btn-primary">
            Ask a Question <ArrowRight />
          </Link>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div
            style={{
              display: "grid",
              gap: "14px",
            }}
          >
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                style={{
                  border: "1px solid rgba(201,168,76,0.13)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.032) 0%, rgba(255,255,255,0.015) 100%)",
                  padding: "28px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-26px",
                    right: "-12px",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "78px",
                    color: "rgba(201,168,76,0.04)",
                    lineHeight: 1,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "18px",
                    alignItems: "flex-start",
                  }}
                  className="faq-v2-item"
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "22px",
                      color: "var(--gold)",
                      lineHeight: 1,
                      minWidth: "34px",
                    }}
                  >
                    Q
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: "'Noto Serif JP', serif",
                        fontSize: "16px",
                        fontWeight: 300,
                        letterSpacing: "0.05em",
                        color: "var(--washi)",
                        lineHeight: 1.75,
                        marginBottom: "12px",
                      }}
                    >
                      {faq.q}
                    </h3>

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
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .faq-v2-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 560px) {
          .faq-v2-item {
            flex-direction: column !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  )
}
