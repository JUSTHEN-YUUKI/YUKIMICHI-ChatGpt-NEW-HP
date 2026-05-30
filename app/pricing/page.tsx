import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing | YUKIMICHI - SNOWPATH JAPAN',
  description: 'YUKIMICHIの料金表。Express、Air Freight、Sea Freightを中心に、日本からの輸出手配費用と注意事項を案内します。',
}

const pricingPlans = [
  {
    label: 'Express',
    title: 'International Express',
    jp: '国際宅配便・小ロット配送',
    fee: '15%',
    minimum: '最低手数料 ¥10,000 / shipment',
    carriers: ['EMS', 'DHL', 'FedEx', 'UPS', 'ヤマト国際宅急便'],
    bestFor: 'サンプル出荷、MOQ 1個からの小ロット、短納期、越境EC向け発送',
  },
  {
    label: 'Air Freight',
    title: 'Air Cargo',
    jp: '航空貨物',
    fee: '10%',
    minimum: '最低手数料 ¥30,000 / shipment',
    carriers: ['航空貨物', '混載航空便', 'フォワーダー手配'],
    bestFor: '高額商品、納期重視の法人貨物、中量ロット、通関書類を伴う案件',
  },
  {
    label: 'Sea Freight',
    title: 'Sea Cargo',
    jp: '海上輸送',
    fee: '7%',
    minimum: 'FCL 最低 ¥50,000 / LCL 最低 ¥30,000',
    carriers: ['海上輸送', 'FCL', 'LCL', '混載便', 'フォワーダー手配'],
    bestFor: '大量発送、継続取引、単価を抑えたい法人貨物、重量物や大型貨物',
  },
]

const notes = [
  '国際送料、関税、VAT/GST、保険料、特殊梱包、規制確認費用は別途です。',
  '商品代金、国内送料、倉庫費、検品費、書類作成費が必要な場合は見積時に明記します。',
  'HSコード、輸出入規制、危険品判定、相手国認証の最終判断は税関、通関業者、公的機関の確認が必要です。',
  '食品、酒類、化粧品、中古品、電気製品などは国や地域により追加条件が発生する場合があります。',
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PricingPage() {
  return (
    <>
      <section className="pricing-hero">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Pricing</span>
        </div>
        <h1 className="pricing-title">
          Transparent Export
          <br />
          <em>Handling Fee.</em>
        </h1>
        <p className="section-body pricing-lead">
          Express / Air Freight / Sea Freight の3分類で、案件ごとに最適な配送方法と総着地コストを比較します。
          初月は手配手数料無料で、まずは小ロットからご相談いただけます。
        </p>
        <div className="pricing-badge">First month handling fee: Free</div>
      </section>

      <section className="pricing-section">
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article className="pricing-card" key={plan.label}>
              <div className="pricing-card-kicker">{plan.label}</div>
              <h2>{plan.title}</h2>
              <p className="pricing-card-jp">{plan.jp}</p>
              <div className="pricing-fee">
                {plan.fee}
                <span> of product value</span>
              </div>
              <p className="pricing-minimum">{plan.minimum}</p>
              <div className="pricing-divider" />
              <p className="pricing-best">{plan.bestFor}</p>
              <ul className="pricing-carriers">
                {plan.carriers.map((carrier) => (
                  <li key={carrier}>{carrier}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-section pricing-notes">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Notes</span>
          </div>
          <h2 className="section-title">
            Fees That May Be
            <br />
            <em>Quoted Separately.</em>
          </h2>
        </div>
        <ul>
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="pricing-cta">
        <p>商品名、数量、仕向地、希望納期がわかると、より正確な概算見積をご案内できます。</p>
        <div>
          <Link href="/quote" className="btn-primary">
            見積を依頼する <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            相談する <ArrowRight />
          </Link>
        </div>
      </section>

      <style>{`
        .pricing-hero {
          min-height: 72svh;
          padding: calc(var(--nav-h) + 84px) var(--gutter) 72px;
          background:
            radial-gradient(ellipse 70% 50% at 75% 20%, rgba(201,168,76,0.08), transparent 62%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 58%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .pricing-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(46px, 8vw, 96px);
          line-height: 0.98;
          color: var(--washi);
          margin-bottom: 28px;
        }
        .pricing-title em { color: var(--gold); font-style: italic; }
        .pricing-lead { max-width: 720px; }
        .pricing-badge {
          display: inline-flex;
          margin-top: 18px;
          padding: 10px 18px;
          border: 1px solid rgba(201,168,76,0.28);
          color: var(--gold);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: rgba(201,168,76,0.05);
        }
        .pricing-section { padding: var(--section-pad) var(--gutter); }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }
        .pricing-card {
          min-height: 100%;
          padding: 38px 30px;
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(13,28,53,0.95), rgba(7,17,31,0.96));
        }
        .pricing-card-kicker {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .pricing-card h2 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 32px;
          line-height: 1.1;
          color: var(--washi);
        }
        .pricing-card-jp {
          color: var(--suzu);
          font-size: 12px;
          letter-spacing: 0.18em;
          margin: 8px 0 26px;
        }
        .pricing-fee {
          font-family: 'Cormorant Garamond', serif;
          color: var(--gold);
          font-size: 56px;
          line-height: 1;
        }
        .pricing-fee span {
          color: var(--washi-dim);
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 12px;
          letter-spacing: 0.08em;
          margin-left: 8px;
        }
        .pricing-minimum {
          color: var(--washi-dim);
          font-size: 12px;
          margin-top: 14px;
        }
        .pricing-divider {
          height: 1px;
          background: rgba(201,168,76,0.14);
          margin: 24px 0;
        }
        .pricing-best {
          color: var(--washi-dim);
          font-size: 13px;
          line-height: 2;
          min-height: 78px;
        }
        .pricing-carriers {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 24px;
        }
        .pricing-carriers li {
          border: 1px solid rgba(248,245,239,0.12);
          color: var(--washi-dim);
          font-size: 11px;
          letter-spacing: 0.08em;
          padding: 6px 10px;
          background: rgba(248,245,239,0.03);
        }
        .pricing-notes {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(36px, 6vw, 92px);
          background: var(--navy-mid);
          border-top: 1px solid rgba(201,168,76,0.08);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .pricing-notes ul {
          list-style: none;
          display: grid;
          gap: 16px;
        }
        .pricing-notes li {
          padding: 18px 20px;
          border-left: 2px solid var(--gold);
          background: rgba(7,17,31,0.45);
          color: var(--washi-dim);
          font-size: 13px;
          line-height: 1.9;
        }
        .pricing-cta {
          padding: 64px var(--gutter);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          background: var(--navy-deep);
          border-top: 1px solid rgba(201,168,76,0.08);
        }
        .pricing-cta p {
          max-width: 620px;
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.08em;
        }
        .pricing-cta div { display: flex; flex-wrap: wrap; gap: 14px; }
        @media (max-width: 900px) {
          .pricing-grid, .pricing-notes { grid-template-columns: 1fr; }
          .pricing-cta { align-items: flex-start; flex-direction: column; }
        }
      `}</style>
    </>
  )
}
