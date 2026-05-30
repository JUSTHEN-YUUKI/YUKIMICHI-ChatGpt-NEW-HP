import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services | YUKIMICHI - SNOWPATH JAPAN',
  description: 'YUKIMICHIのサービス内容。日本商品の調達、輸出サポート、物流最適化、通関関連確認、多言語対応。',
}

const services = [
  ['Export Support', '輸出手配', '商品確認、輸出可否の整理、必要書類、発送手配までを一括で支援します。'],
  ['Sourcing', '商品調達', '日本限定品、地域限定品、法人向け継続調達などを正規流通を前提に確認します。'],
  ['Logistics', '物流最適化', 'EMS、DHL、FedEx、UPS、航空貨物、海上輸送を比較し、目的に合う方法を選びます。'],
  ['Compliance Check', '規制確認', 'HSコード、輸出規制、相手国輸入条件を参考確認し、必要な確認先を明示します。'],
  ['Multilingual Support', '多言語対応', '海外バイヤー向けの自然な英語連絡、見積説明、取引確認文を整えます。'],
  ['Long-term Trade', '継続取引支援', 'サンプル出荷から定期調達まで、価格、納期、梱包、配送方法を改善します。'],
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ServicesPage() {
  return (
    <>
      <section className="services-hero">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Services</span>
        </div>
        <h1 className="services-title">
          Export Work,
          <br />
          Carefully Managed.
        </h1>
        <p className="section-body services-lead">
          YUKIMICHIは、日本商品の調達から国際配送までを、法令遵守と通関リスク回避を重視して支援します。
          小ロット、サンプル、法人向け継続取引までご相談ください。
        </p>
      </section>

      <section className="services-section">
        <div className="services-grid">
          {services.map(([en, jp, text], index) => (
            <article className="service-card" key={en}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{en}</h2>
              <h3>{jp}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-cta">
        <p>商品カテゴリや仕向地が決まっている場合は、見積依頼ページから必要情報をご確認ください。</p>
        <div>
          <Link href="/quote" className="btn-primary">
            見積を依頼する <ArrowRight />
          </Link>
          <Link href="/flow" className="btn-ghost">
            流れを見る <ArrowRight />
          </Link>
        </div>
      </section>

      <style>{`
        .services-hero {
          min-height: 68svh;
          padding: calc(var(--nav-h) + 84px) var(--gutter) 72px;
          background:
            radial-gradient(ellipse 70% 48% at 78% 24%, rgba(201,168,76,0.08), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 62%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .services-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(46px, 8vw, 96px);
          line-height: 0.98;
          color: var(--washi);
          margin-bottom: 28px;
        }
        .services-lead { max-width: 760px; }
        .services-section { padding: var(--section-pad) var(--gutter); }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          background: rgba(201,168,76,0.12);
          border: 1px solid rgba(201,168,76,0.12);
        }
        .service-card {
          min-height: 280px;
          padding: 36px 30px;
          background: var(--navy-deep);
        }
        .service-card span {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 300;
          opacity: 0.72;
        }
        .service-card h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 300;
          line-height: 1.1;
          margin: 22px 0 6px;
        }
        .service-card h3 {
          color: var(--suzu);
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.18em;
          margin-bottom: 18px;
        }
        .service-card p {
          color: var(--washi-dim);
          font-size: 13px;
          line-height: 2;
        }
        .services-cta {
          padding: 64px var(--gutter);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          background: var(--navy-mid);
          border-top: 1px solid rgba(201,168,76,0.08);
        }
        .services-cta p {
          max-width: 620px;
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.08em;
        }
        .services-cta div { display: flex; flex-wrap: wrap; gap: 14px; }
        @media (max-width: 980px) {
          .services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 680px) {
          .services-grid { grid-template-columns: 1fr; }
          .services-cta { align-items: flex-start; flex-direction: column; }
        }
      `}</style>
    </>
  )
}
