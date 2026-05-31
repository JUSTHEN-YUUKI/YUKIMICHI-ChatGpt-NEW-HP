"use client"

import Link from "@/components/NewTabLink"
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

const contactPoints = [
  "商品調達の相談",
  "国際配送方法の比較",
  "小ロット・サンプル出荷",
  "航空貨物・海上輸送",
  "輸出書類・確認事項の整理",
]

export default function CTASection() {
  return (
    <section
      id="contact-cta"
      style={{
        position: "relative",
        padding: "var(--section-pad) var(--gutter)",
        background:
          "linear-gradient(160deg, #07111f 0%, #0d1c35 52%, #07111f 100%)",
        borderTop: "1px solid rgba(201,168,76,0.08)",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "720px",
          height: "720px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          opacity: 0.8,
          pointerEvents: "none",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)",
        }}
      />

      <ScrollReveal>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "860px",
            margin: "0 auto",
          }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            <div className="section-label-line" />
            <span className="section-label-text">Export Inquiry</span>
            <div className="section-label-line" />
          </div>

          <h2
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontWeight: 200,
              fontSize: "clamp(34px, 5.4vw, 66px)",
              lineHeight: 1.55,
              letterSpacing: "0.08em",
              color: "var(--washi)",
              marginBottom: "24px",
            }}
          >
            世界市場への第一歩を。
            <br />
            <span style={{ color: "var(--gold)" }}>北海道から、世界へ。</span>
          </h2>

          <p
            style={{
              maxWidth: "680px",
              margin: "0 auto 42px",
              fontSize: "13.5px",
              fontWeight: 300,
              lineHeight: 2.1,
              color: "var(--washi-dim)",
              letterSpacing: "0.05em",
            }}
          >
            日本国内の商品調達から、EMS・DHL・FedEx・UPS・ヤマト国際宅急便、
            航空貨物、海上輸送まで。YUKIMICHIが日本と世界を信頼でつなぎます。
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "42px",
            }}
          >
            {contactPoints.map((point) => (
              <span
                key={point}
                style={{
                  border: "1px solid rgba(201,168,76,0.18)",
                  background: "rgba(255,255,255,0.025)",
                  color: "var(--washi-dim)",
                  padding: "9px 13px",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                }}
              >
                {point}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <Link href="/quote" className="btn-primary">
              Request a Quote <ArrowRight />
            </Link>

            <Link href="mailto:exporter@justhen.co.jp" className="btn-ghost">
              Email Us <ArrowRight size={12} />
            </Link>
          </div>

          <div
            style={{
              marginTop: "34px",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "18px",
              fontStyle: "italic",
              color: "var(--washi-faint)",
              letterSpacing: "0.04em",
            }}
          >
            Trusted Export Support from Japan.
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
