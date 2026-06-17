"use client"

import Link from "@/components/NewTabLink"
import ScrollReveal from "@/components/ScrollReveal"
import { useLanguage } from "@/components/LanguageProvider"
import { translations } from "@/lib/translations"

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

export default function ServicesSection() {
  const { language } = useLanguage()
  const copy = translations[language].home.services

  return (
    <section
      id="services"
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
          backgroundSize: "86px 86px",
          pointerEvents: "none",
          opacity: 0.65,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "-14%",
          top: "18%",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(141,183,217,0.08) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <ScrollReveal>
        <div className="services-premium-head">
          <div>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">{copy.label}</span>
            </div>

            <h2 className="section-title">
              {copy.titleLine1}
              <br />
              {copy.titleLine2}
              <br />
              <em>{copy.titleLine3}</em>
            </h2>
          </div>

          <div className="services-premium-summary">
            <p className="section-body">
              <span className="copy-line-ja">{copy.body}</span>
              <span className="copy-line-en">{copy.bodySub}</span>
            </p>

            <div className="services-premium-actions">
              <Link href="/services" className="btn-primary">
                {copy.contactButton} <ArrowRight />
              </Link>
              <span>{copy.logisticsLabel}</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <style>{`
        .services-premium-head {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .services-premium-summary {
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(135deg, rgba(139,30,47,0.16), transparent 58%), rgba(255,255,255,0.025);
          padding: clamp(26px, 3.2vw, 40px);
        }

        .services-premium-summary .section-body {
          margin-bottom: 28px;
        }

        .services-premium-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
        }

        .services-premium-actions span {
          color: var(--suzu);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        @media (max-width: 1050px) {
          .services-premium-head {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
