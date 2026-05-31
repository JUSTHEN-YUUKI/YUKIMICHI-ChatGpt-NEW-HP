import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Export Process | YUKIMICHI - SNOWPATH JAPAN',
  description: 'YUKIMICHIの取引の流れ。問い合わせから内容確認、見積、商品調達、梱包・書類準備、国際発送、納品後フォローまで。',
}

const steps = [
  {
    number: '01',
    title: 'お問い合わせ',
    en: 'Inquiry',
    text: '商品名、数量、仕向地、希望納期、用途をお知らせください。法人取引、個人購入、小ロットの相談にも対応します。',
  },
  {
    number: '02',
    title: '内容確認',
    en: 'Product Review',
    text: '輸出可否、数量、配送条件、必要書類、相手国側の確認事項を整理します。不明点は推測せず追加確認します。',
  },
  {
    number: '03',
    title: '見積',
    en: 'Quote Preparation',
    text: '商品代、手配手数料、国際送料、保険、想定される追加費用を分けて提示します。関税やVAT/GSTは参考情報として扱います。',
  },
  {
    number: '04',
    title: '商品調達',
    en: 'Product Procurement',
    text: '日本国内の正規流通を前提に調達します。限定品、中古品、サンプル出荷は案件ごとに可否を確認します。',
  },
  {
    number: '05',
    title: '梱包・書類準備',
    en: 'Packing & Documents',
    text: '破損リスクを抑えた梱包、インボイス、パッキングリスト、必要に応じた原産地や規制関連書類を準備します。',
  },
  {
    number: '06',
    title: '国際発送',
    en: 'International Shipping',
    text: 'EMS、DHL、FedEx、UPS、ヤマト国際宅急便、航空貨物、海上輸送から最適な方法を選定します。',
  },
  {
    number: '07',
    title: '納品・フォロー',
    en: 'Delivery & Follow-up',
    text: '追跡状況を確認し、通関や受取時の確認事項をフォローします。継続取引では次回改善点も整理します。',
  },
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FlowPage() {
  return (
    <>
      <section className="flow-hero">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Export Process</span>
        </div>
        <h1 className="flow-title">
          From First Contact
          <br />
          to <em>Delivery.</em>
        </h1>
        <p className="section-body flow-lead">
          北海道発の輸出ブランドとして、問い合わせから納品後フォローまで、国際貿易の不安を一つずつ整理しながら進行します。
          迅速さだけでなく、通関リスクを避ける透明な手順を重視します。
        </p>
      </section>

      <section className="flow-section">
        <div className="flow-timeline">
          {steps.map((step) => (
            <article className="flow-step" key={step.number}>
              <div className="flow-number">{step.number}</div>
              <div className="flow-content">
                <span>{step.en}</span>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="flow-note">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Before Quote Request</span>
          </div>
          <h2 className="section-title">
            Please Share
            <br />
            <em>Key Details.</em>
          </h2>
        </div>
        <p>
          商品URL、商品名、希望数量、仕向地、希望配送方法、希望納期、法人または個人利用の区分があると、
          見積と規制確認がスムーズです。輸出入規制や認証の要否は国や商品により異なるため、最終判断は税関、通関業者、公的機関の確認を前提に進めます。
        </p>
      </section>

      <section className="flow-cta">
        <Link href="/quote" className="btn-primary">
          見積を依頼する <ArrowRight />
        </Link>
        <Link href="/faq" className="btn-ghost">
          よくある質問を見る <ArrowRight />
        </Link>
      </section>

      <style>{`
        .flow-hero {
          min-height: 72svh;
          padding: calc(var(--nav-h) + 84px) var(--gutter) 72px;
          background:
            radial-gradient(ellipse 70% 48% at 72% 20%, rgba(201,168,76,0.08), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 62%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .flow-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(46px, 8vw, 96px);
          line-height: 0.98;
          color: var(--washi);
          margin-bottom: 28px;
        }
        .flow-title em { color: var(--gold); font-style: italic; }
        .flow-lead { max-width: 720px; }
        .flow-section { padding: var(--section-pad) var(--gutter); }
        .flow-timeline {
          position: relative;
          display: grid;
          gap: 18px;
        }
        .flow-timeline::before {
          content: '';
          position: absolute;
          left: 35px;
          top: 24px;
          bottom: 24px;
          width: 1px;
          background: linear-gradient(to bottom, rgba(201,168,76,0.5), rgba(201,168,76,0.08));
        }
        .flow-step {
          position: relative;
          display: grid;
          grid-template-columns: 72px minmax(0, 1fr);
          gap: 24px;
          padding: 28px;
          border: 1px solid rgba(201,168,76,0.12);
          background: linear-gradient(90deg, rgba(13,28,53,0.95), rgba(7,17,31,0.76));
        }
        .flow-number {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          background: var(--navy-deep);
          font-family: 'Cormorant Garamond', serif;
          font-size: 25px;
          font-weight: 300;
          z-index: 1;
        }
        .flow-content span {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .flow-content h2 {
          color: var(--washi);
          font-size: 20px;
          font-weight: 300;
          letter-spacing: 0.16em;
          margin-bottom: 10px;
        }
        .flow-content p {
          color: var(--washi-dim);
          font-size: 13px;
          line-height: 2;
          letter-spacing: 0.04em;
        }
        .flow-note {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(36px, 6vw, 92px);
          background: var(--navy-mid);
          border-top: 1px solid rgba(201,168,76,0.08);
        }
        .flow-note p {
          color: var(--washi-dim);
          font-size: 13.5px;
          line-height: 2.2;
          letter-spacing: 0.05em;
        }
        .flow-cta {
          padding: 64px var(--gutter);
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          background: var(--navy-deep);
          border-top: 1px solid rgba(201,168,76,0.08);
        }
        @media (max-width: 760px) {
          .flow-timeline::before { left: 27px; }
          .flow-step { grid-template-columns: 56px minmax(0, 1fr); padding: 22px; gap: 18px; }
          .flow-number { width: 56px; height: 56px; font-size: 20px; }
          .flow-note { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
