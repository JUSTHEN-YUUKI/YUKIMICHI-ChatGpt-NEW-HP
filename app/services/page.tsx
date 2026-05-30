from pathlib import Path

code = r'''export default function ServicesPage() {
  const services = [
    {
      number: "01",
      title: "商品調達・購入代行",
      english: "Procurement",
      text:
        "日本国内の正規流通品を中心に、海外のお客様に代わって商品調達を行います。小ロット、サンプル購入、継続仕入れの相談にも対応します。",
      points: ["国内正規品の調達", "小ロット・サンプル対応", "仕入れ先確認", "購入前の条件整理"],
    },
    {
      number: "02",
      title: "国際配送・航空貨物",
      english: "Air Freight / Express",
      text:
        "緊急性の高い商品や高付加価値商品には、航空貨物や国際宅配便を活用します。EMS、DHL、FedEx、UPS、ヤマト国際宅急便など、案件に応じた配送方法を検討します。",
      points: ["EMS / DHL / FedEx / UPS", "ヤマト国際宅急便", "航空貨物", "短納期・緊急輸送"],
      featured: true,
    },
    {
      number: "03",
      title: "海上輸送・コンテナ輸送",
      english: "Sea Freight",
      text:
        "大型商品、数量の多い貨物、コストを抑えたい継続取引では、海上輸送を検討します。FCL・LCLなど、貨物量に応じた輸送設計を行います。",
      points: ["FCL / LCL", "海上貨物", "コンテナ輸送", "中長期の輸送設計"],
    },
    {
      number: "04",
      title: "輸出書類・確認事項整理",
      english: "Export Documents",
      text:
        "インボイス、パッキングリスト、配送情報、商品情報など、輸出に必要な確認事項を整理します。法令遵守と透明性を重視し、無理な取引は行いません。",
      points: ["Invoice", "Packing List", "商品情報整理", "確認事項の明確化"],
    },
    {
      number: "05",
      title: "北海道発の実写素材活用",
      english: "Hokkaido Branding",
      text:
        "札幌・北海道の実写写真や動画を活用し、日本らしさ、誠実さ、地域性を伝える輸出ブランドづくりを支援します。",
      points: ["札幌発の信頼感", "商品紹介素材", "現地撮影素材", "ブランド演出"],
    },
    {
      number: "06",
      title: "海外バイヤー向け相談",
      english: "Buyer Support",
      text:
        "海外バイヤー、法人、インフルエンサー向けに、日本商品の仕入れ、配送、取引条件の整理をサポートします。",
      points: ["海外法人対応", "バイヤー相談", "継続取引の整理", "多言語展開の下準備"],
    },
  ]

  const methods = [
    {
      name: "Express",
      label: "国際宅配便・郵便",
      desc: "EMS、DHL、FedEx、UPS、ヤマト国際宅急便など。小口、サンプル、短納期向け。",
    },
    {
      name: "Air Freight",
      label: "航空貨物",
      desc: "緊急輸送、高付加価値商品、まとまった航空便向け。",
    },
    {
      name: "Sea Freight",
      label: "海上輸送",
      desc: "FCL・LCL、コンテナ輸送、大型貨物、コスト重視の継続出荷向け。",
    },
  ]

  return (
    <main
      style={{
        background: "var(--navy-deep)",
        color: "var(--washi)",
        minHeight: "100vh",
      }}
    >
      <section
        style={{
          position: "relative",
          padding: "calc(var(--nav-h) + 96px) var(--gutter) 96px",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, rgba(7,17,31,1) 0%, rgba(13,28,53,1) 58%, rgba(7,17,31,1) 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
            opacity: 0.65,
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: "1120px",
            margin: "0 auto",
          }}
        >
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">
              SERVICES / HOKKAIDO × AIR FREIGHT × SEA FREIGHT
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontWeight: 300,
              fontSize: "clamp(36px, 6vw, 72px)",
              lineHeight: 1.35,
              letterSpacing: "0.08em",
              marginBottom: "28px",
            }}
          >
            日本商品の輸出を、<br />
            <span style={{ color: "var(--gold)" }}>
              調達から国際配送まで。
            </span>
          </h1>

          <p
            style={{
              maxWidth: "760px",
              color: "var(--washi-dim)",
              fontSize: "15px",
              lineHeight: 2.15,
              letterSpacing: "0.05em",
              marginBottom: "36px",
            }}
          >
            YUKIMICHIは、北海道・札幌を拠点に、日本国内商品の調達、
            小ロット輸出、航空貨物、海上輸送、輸出書類の整理までを
            一貫してサポートする輸出支援ブランドです。
          </p>

          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <a href="/quote" className="btn-primary">
              見積依頼
            </a>
            <a href="/contact" className="btn-ghost">
              お問い合わせ
            </a>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "var(--section-pad) var(--gutter)",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "18px",
            }}
            className="services-page-grid"
          >
            {services.map((service) => (
              <article
                key={service.number}
                style={{
                  position: "relative",
                  padding: "34px 30px",
                  minHeight: "360px",
                  background: service.featured
                    ? "linear-gradient(160deg, rgba(13,28,53,1), rgba(24,38,65,1))"
                    : "rgba(13,28,53,0.78)",
                  border: service.featured
                    ? "1px solid rgba(201,168,76,0.38)"
                    : "1px solid rgba(201,168,76,0.12)",
                  boxShadow: service.featured
                    ? "0 24px 70px rgba(0,0,0,0.32)"
                    : "none",
                }}
              >
                {service.featured && (
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
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "var(--gold)",
                    fontSize: "28px",
                    marginBottom: "20px",
                  }}
                >
                  {service.number}
                </div>

                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.28em",
                    color: "var(--suzu)",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  {service.english}
                </div>

                <h2
                  style={{
                    fontFamily: "'Noto Serif JP', serif",
                    fontWeight: 300,
                    fontSize: "22px",
                    lineHeight: 1.55,
                    color: "var(--washi)",
                    marginBottom: "18px",
                  }}
                >
                  {service.title}
                </h2>

                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 2,
                    color: "var(--washi-dim)",
                    marginBottom: "24px",
                  }}
                >
                  {service.text}
                </p>

                <div
                  style={{
                    display: "grid",
                    gap: "9px",
                  }}
                >
                  {service.points.map((point) => (
                    <div
                      key={point}
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        color: "var(--washi-faint)",
                        fontSize: "12px",
                        letterSpacing: "0.06em",
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "var(--gold)",
                          flexShrink: 0,
                        }}
                      />
                      {point}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "0 var(--gutter) var(--section-pad)",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "54px",
            border: "1px solid rgba(201,168,76,0.14)",
            background:
              "linear-gradient(180deg, rgba(13,28,53,0.92), rgba(7,17,31,0.92))",
          }}
          className="services-method-box"
        >
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Shipping Methods</span>
          </div>

          <h2 className="section-title">
            貨物に合わせて、<br />
            <em>最適な輸送手段を選びます。</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "18px",
              marginTop: "34px",
            }}
            className="shipping-method-grid"
          >
            {methods.map((method) => (
              <div
                key={method.name}
                style={{
                  padding: "26px",
                  border: "1px solid rgba(248,245,239,0.12)",
                  background: "rgba(255,255,255,0.025)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "28px",
                    color: "var(--gold)",
                    marginBottom: "8px",
                  }}
                >
                  {method.name}
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "var(--washi)",
                    marginBottom: "12px",
                  }}
                >
                  {method.label}
                </div>

                <p
                  style={{
                    fontSize: "12.5px",
                    lineHeight: 1.9,
                    color: "var(--washi-dim)",
                  }}
                >
                  {method.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "0 var(--gutter) var(--section-pad)",
        }}
      >
        <div
          style={{
            maxWidth: "980px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.35em",
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: "18px",
            }}
          >
            Compliance First
          </div>

          <h2
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 4vw, 46px)",
              lineHeight: 1.6,
              marginBottom: "24px",
            }}
          >
            取り扱い可否を確認し、<br />
            無理な輸出は行いません。
          </h2>

          <p
            style={{
              color: "var(--washi-dim)",
              lineHeight: 2.1,
              fontSize: "14px",
              letterSpacing: "0.04em",
            }}
          >
            商品によっては、日本側の輸出規制、相手国の輸入規制、
            危険品判定、配送会社の引受条件により、取り扱いできない場合があります。
            YUKIMICHIでは、法令遵守と透明性を前提に、事前確認を重視します。
          </p>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <a href="/quote" className="btn-primary">
              見積依頼へ進む
            </a>
            <a href="/faq" className="btn-ghost">
              FAQを見る
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .services-page-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .shipping-method-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .services-page-grid {
            grid-template-columns: 1fr !important;
          }

          .services-method-box {
            padding: 34px 24px !important;
          }
        }
      `}</style>
    </main>
  )
}
'''

path = Path("/mnt/data/services-page-premium.tsx")
path.write_text(code, encoding="utf-8")
print(str(path))
