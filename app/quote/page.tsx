import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'
import PageContextLabel from '@/components/PageContextLabel'

export const metadata: Metadata = {
  title: 'Quote Request | YUKIMICHI - SNOWPATH JAPAN',
  description: 'YUKIMICHIのお見積り依頼ページ。日本からの輸出見積に必要な情報を整理します。',
}

const requiredItems = [
  '商品名または商品URL',
  '希望数量',
  '仕向国・都市',
  '希望納期',
  '希望配送方法',
  '法人または個人の区分',
  '用途、販売予定、必要書類',
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function QuotePage() {
  return (
    <>
      <section className="quote-hero">
        <PageContextLabel trail="YUKIMICHI / Quote Request" current="お見積り" />
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Quote Request</span>
        </div>
        <h1 className="quote-title">
          Request a
          <br />
          <em>Quote.</em>
        </h1>
        <p className="section-body quote-lead">
          正確な見積には、商品情報、数量、仕向地、配送条件が必要です。
          国際送料、関税、VAT/GST、保険、特殊梱包、規制確認費用は案件ごとに確認します。
        </p>
      </section>

      <section className="quote-section">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Required Details</span>
          </div>
          <h2 className="section-title">
            Share Key
            <br />
            <em>Details.</em>
          </h2>
          <p className="section-body">
            以下の情報をメールまたはお問い合わせページからお送りください。商品や国により、輸出入規制、認証、危険品判定、通関書類の追加確認が必要になる場合があります。
          </p>
          <div className="quote-actions">
            <a href="mailto:exporter@justhen.co.jp" className="btn-primary">
              メールで依頼する <ArrowRight />
            </a>
            <Link href="/contact" className="btn-ghost">
              お問い合わせへ <ArrowRight />
            </Link>
          </div>
        </div>

        <ul className="quote-list">
          {requiredItems.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <style>{`
        .quote-hero {
          min-height: 68svh;
          padding: calc(var(--nav-h) + 84px) var(--gutter) 72px;
          background:
            radial-gradient(ellipse 70% 48% at 78% 24%, rgba(201,168,76,0.08), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 62%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .quote-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(46px, 8vw, 96px);
          line-height: 0.98;
          color: var(--washi);
          margin-bottom: 28px;
        }
        .quote-title em { color: var(--gold); font-style: italic; }
        .quote-lead { max-width: 760px; }
        .quote-section {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
          gap: clamp(36px, 6vw, 92px);
          align-items: start;
        }
        .quote-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }
        .quote-list {
          list-style: none;
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(13,28,53,0.96), rgba(7,17,31,0.95));
          padding: 24px;
        }
        .quote-list li {
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr);
          gap: 18px;
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid rgba(248,245,239,0.08);
          color: var(--washi-dim);
          font-size: 14px;
          line-height: 1.7;
        }
        .quote-list li:last-child { border-bottom: 0; }
        .quote-list span {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 300;
        }
        @media (max-width: 900px) {
          .quote-section { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
