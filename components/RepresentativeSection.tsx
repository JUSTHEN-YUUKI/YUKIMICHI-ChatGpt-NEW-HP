"use client"

import Image from "next/image"
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

export default function RepresentativeSection() {
  return (
    <section
      id="representative"
      style={{
        position: "relative",
        padding: "var(--section-pad) var(--gutter)",
        background: "var(--navy-deep)",
        overflow: "hidden",
        borderTop: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          opacity: 0.55,
          pointerEvents: "none",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 24%, black 76%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 24%, black 76%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
          gap: "clamp(48px, 7vw, 100px)",
          alignItems: "center",
        }}
        className="representative-v2-grid"
      >
        <ScrollReveal>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.2)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.48)",
              background: "var(--navy-mid)",
            }}
          >
            <Image
              src="/representative.JPG"
              alt="YUKIMICHI representative team"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(7,17,31,0.92) 0%, rgba(7,17,31,0.16) 48%, rgba(7,17,31,0.08) 100%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "28px",
                right: "28px",
                bottom: "28px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.32em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Leadership
              </div>

              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 4vw, 46px)",
                  fontWeight: 300,
                  lineHeight: 1.08,
                  color: "var(--washi)",
                }}
              >
                YUKIMICHI
              </div>

              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "var(--washi-dim)",
                  marginTop: "8px",
                }}
              >
                JUSTHEN CO., LTD.
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Representative Message</span>
          </div>

          <h2 className="section-title">
            Built on<br />
            Real Logistics<br />
            <em>Experience.</em>
          </h2>

          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(201,168,76,0.14)",
              padding: "clamp(28px, 4vw, 44px)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "86px",
                background: "var(--gold)",
              }}
            />

            <p
              style={{
                fontSize: "13px",
                fontWeight: 300,
                lineHeight: 2.15,
                color: "var(--washi-dim)",
                letterSpacing: "0.045em",
                marginBottom: "20px",
              }}
            >
              私は会社員時代、成田空港・横浜港・品川港に関連する
              国際物流業務に携わり、輸出入に関わる事務手続き、
              書類管理、物流オペレーションの実務経験を積んできました。
            </p>

            <p
              style={{
                fontSize: "13px",
                fontWeight: 300,
                lineHeight: 2.15,
                color: "var(--washi-dim)",
                letterSpacing: "0.045em",
                marginBottom: "20px",
              }}
            >
              航空貨物や海上貨物に関する確認業務、関係各所との調整、
              スケジュール管理を通じて、国際物流は正確さと信頼によって
              成り立っていることを学びました。
            </p>

            <p
              style={{
                fontSize: "13px",
                fontWeight: 300,
                lineHeight: 2.15,
                color: "var(--washi-dim)",
                letterSpacing: "0.045em",
              }}
            >
              YUKIMICHI（雪道）は、その経験を基盤として生まれた
              日本発の輸出サポートブランドです。単に商品を海外へ送るだけではなく、
              取扱可能な日本商品や企業の価値を、誠実な手続きで世界へつなぐ
              架け橋でありたいと考えています。
            </p>

            <div
              style={{
                marginTop: "30px",
                paddingTop: "24px",
                borderTop: "1px solid rgba(201,168,76,0.12)",
                display: "flex",
                justifyContent: "space-between",
                gap: "18px",
                alignItems: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "26px",
                    fontWeight: 400,
                    color: "var(--gold)",
                    lineHeight: 1.1,
                  }}
                >
                  Yuuki Hayashi
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    color: "var(--suzu)",
                    marginTop: "8px",
                    textTransform: "uppercase",
                  }}
                >
                  Representative Director
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.16em",
                    color: "var(--washi-faint)",
                    marginTop: "8px",
                  }}
                >
                  JUSTHEN CO., LTD.
                </div>
              </div>

              <Link href="/contact" className="btn-ghost">
                Contact <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .representative-v2-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
