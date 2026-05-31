"use client"

import Link from "next/link"
import type { ReactNode } from "react"
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

function IconCart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6 6h15l-1.5 8.5H8L6 3H3" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M9 10h8" />
    </svg>
  )
}

function IconPlane() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </svg>
  )
}

function IconShip() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M3 18h18" />
      <path d="M5 18 3 11h18l-2 7" />
      <path d="M7 11V6h10v5" />
      <path d="M9 6V3h6v3" />
      <path d="M4 21c1.2 0 1.2-1 2.4-1s1.2 1 2.4 1 1.2-1 2.4-1 1.2 1 2.4 1 1.2-1 2.4-1 1.2 1 2.4 1 1.2-1 2.4-1" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 0 20" />
      <path d="M12 2a15.3 15.3 0 0 0 0 20" />
    </svg>
  )
}

function IconBuyer() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      <path d="M2.5 21a5.5 5.5 0 0 1 11 0" />
      <path d="M17 8.5h4.5v7H17z" />
      <path d="M17 12h4.5" />
      <path d="M14 15.5h3" />
    </svg>
  )
}

interface Service {
  num: string
  icon: ReactNode
  title: string
  titleJp: string
  desc: string
  points: string[]
  accent: string
}

const services: Service[] = [
  {
    num: "01",
    icon: <IconCart />,
    title: "Japan Procurement",
    titleJp: "日本国内の商品調達",
    desc: "海外バイヤー向けに、日本国内の商品リサーチ・購入代行・仕入れ支援を行います。北海道・日本ブランドの商品、小ロット、サンプル出荷の相談にも対応します。",
    points: ["商品リサーチ", "購入代行", "小ロット相談", "日本国内調達"],
    accent: "HOKKAIDO / JAPAN",
  },
  {
    num: "02",
    icon: <IconGlobe />,
    title: "International Express",
    titleJp: "国際宅配便",
    desc: "EMS・DHL・FedEx・UPS・ヤマト国際宅急便など、商品内容・納期・コストに応じた国際配送方法を比較し、最適な発送手段を検討します。",
    points: ["EMS", "DHL", "FedEx / UPS", "ヤマト国際宅急便"],
    accent: "EXPRESS",
  },
  {
    num: "03",
    icon: <IconPlane />,
    title: "Air Freight",
    titleJp: "航空貨物",
    desc: "緊急輸送、高付加価値商品、短納期案件に向けて、航空貨物や国際エクスプレスを活用した輸送をサポートします。",
    points: ["緊急輸送", "短納期", "高付加価値商品", "航空貨物"],
    accent: "AIR FREIGHT",
  },
  {
    num: "04",
    icon: <IconShip />,
    title: "Sea Freight",
    titleJp: "海上輸送",
    desc: "FCL・LCLを含む海上輸送の相談に対応します。大量輸送、継続出荷、コスト重視の案件に適した輸送方法を検討します。",
    points: ["FCL", "LCL", "大量輸送", "コスト最適化"],
    accent: "SEA FREIGHT",
  },
  {
    num: "05",
    icon: <IconShield />,
    title: "Compliance Review",
    titleJp: "輸出コンプライアンス",
    desc: "輸出可否、書類準備、インボイス作成、規制品確認など、国際取引で重要となる基本的な確認業務をサポートします。",
    points: ["書類準備", "規制確認", "インボイス", "透明な取引"],
    accent: "COMPLIANCE",
  },
  {
    num: "06",
    icon: <IconBuyer />,
    title: "Global Buyer Support",
    titleJp: "海外バイヤー対応",
    desc: "海外法人、小売店、越境EC事業者、インフルエンサー向けに、日本商品を安心して取引できるよう条件整理と継続取引を支援します。",
    points: ["法人対応", "小売店相談", "越境EC", "継続取引"],
    accent: "BUYER SUPPORT",
  },
]

function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "390px",
        padding: "36px 30px",
        border: "1px solid rgba(201,168,76,0.14)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.016) 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "210px",
          height: "210px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "42px",
          lineHeight: 1,
          color: "rgba(201,168,76,0.08)",
          letterSpacing: "0.04em",
        }}
      >
        {service.num}
      </div>

      <div
        style={{
          fontSize: "9px",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "var(--gold)",
          opacity: 0.75,
          marginBottom: "18px",
        }}
      >
        {service.accent}
      </div>

      <div
        style={{
          width: "46px",
          height: "46px",
          color: "var(--gold)",
          marginBottom: "24px",
          opacity: 0.9,
        }}
      >
        {service.icon}
      </div>

      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(26px, 2.4vw, 34px)",
          fontWeight: 400,
          color: "var(--washi)",
          marginBottom: "5px",
          lineHeight: 1.05,
        }}
      >
        {service.title}
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
        {service.titleJp}
      </div>

      <p
        style={{
          fontSize: "12.5px",
          fontWeight: 300,
          lineHeight: 2,
          color: "var(--washi-dim)",
          letterSpacing: "0.04em",
          marginBottom: "24px",
        }}
      >
        {service.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {service.points.map((point) => (
          <span
            key={point}
            style={{
              border: "1px solid rgba(201,168,76,0.18)",
              color: "var(--washi-faint)",
              padding: "7px 10px",
              fontSize: "10px",
              letterSpacing: "0.08em",
              lineHeight: 1,
              background: "rgba(7,17,31,0.28)",
            }}
          >
            {point}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ServicesSection() {
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "end",
            marginBottom: "62px",
            position: "relative",
            zIndex: 1,
          }}
          className="services-premium-head"
        >
          <div>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Export Support Services</span>
            </div>

            <h2 className="section-title">
              Export Support<br />
              from Japan<br />
              <em>to the World.</em>
            </h2>
          </div>

          <div>
            <p className="section-body" style={{ marginBottom: "26px" }}>
              YUKIMICHIは、日本国内の商品調達から国際宅配便、航空貨物、海上輸送、
              輸出コンプライアンス、海外バイヤー対応まで、海外バイヤーが安心して日本と取引できる
              実務型の輸出サポートを提供します。
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "4px",
              }}
            >
              {["HOKKAIDO", "SEA FREIGHT", "AIR FREIGHT", "EXPRESS", "GLOBAL LOGISTICS"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: "1px solid rgba(201,168,76,0.18)",
                    color: "var(--gold)",
                    padding: "7px 10px",
                    fontSize: "9.5px",
                    letterSpacing: "0.16em",
                    background: "rgba(201,168,76,0.045)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
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
          className="services-premium-grid"
        >
          {services.map((service) => (
            <ServiceCard key={service.num} service={service} />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "44px",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
            gap: "24px",
            alignItems: "center",
          }}
          className="services-premium-logistics"
        >
          <div
            style={{
              border: "1px solid rgba(201,168,76,0.14)",
              background: "rgba(255,255,255,0.025)",
              padding: "32px",
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
              Logistics Policy
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
              航空貨物・海上輸送・国際宅配便は、それぞれ納期、コスト、通関難易度、貨物特性が異なります。
              YUKIMICHIでは、単に安い配送方法を選ぶのではなく、到着までの安全性、スピード、
              コストバランスを踏まえて輸送方法を検討します。
            </p>
          </div>

          <Link href="/contact" className="btn-primary" style={{ justifyContent: "center" }}>
            Contact Export Support <ArrowRight />
          </Link>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 1050px) {
          .services-premium-head,
          .services-premium-logistics {
            grid-template-columns: 1fr !important;
          }

          .services-premium-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 680px) {
          .services-premium-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
