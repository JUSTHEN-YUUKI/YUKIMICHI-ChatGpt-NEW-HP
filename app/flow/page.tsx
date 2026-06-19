import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'

export const metadata: Metadata = {
  title: 'Export Process | YUKIMICHI',
  description: 'YUKIMICHIの取引の流れ。お問い合わせ、商品確認、見積、前払い、調達、書類整理、国際配送、発送後フォローまで。',
}

const steps = [
  {
    number: '01',
    title: 'お問い合わせ',
    en: 'Inquiry',
    text: '商品名、ブランド名、数量、配送先国、用途、希望納期をお知らせください。商品URLがない場合は、写真や分かる範囲の情報だけでも確認を開始できます。',
  },
  {
    number: '02',
    title: '商品・輸入条件の確認',
    en: 'Product / Import Requirements Review',
    text: '商品カテゴリ、数量、配送先国、用途をもとに、輸出入規制、配送会社の引受条件、輸入者側で確認すべき許可・税金・販売条件を整理します。',
  },
  {
    number: '03',
    title: '仕入先への確認',
    en: 'Supplier Check',
    text: '日本国内の仕入先へ、在庫、価格、MOQ、納期、商品資料、SDS/MSDSの有無などを確認します。仕入先情報の開示可否は案件ごとに確認します。',
  },
  {
    number: '04',
    title: '見積提示',
    en: 'Quotation',
    text: '商品代金、手配手数料、国際送料、保険料、想定される追加費用を分けて提示します。関税やVAT/GSTは参考確認となり、最終判断は輸入国側での確認が前提です。',
  },
  {
    number: '05',
    title: '前払い確認',
    en: 'Advance Payment',
    text: '正式見積りと条件に合意後、原則としてご入金確認後に商品調達、梱包、配送手配を開始します。支払条件は案件ごとにメールまたは書面で確認します。',
  },
  {
    number: '06',
    title: '調達・検品・書類整理',
    en: 'Procurement & Documents',
    text: '日本国内での商品調達、数量確認、簡易検品、梱包準備を行い、Commercial Invoice、Packing List、必要に応じた商品資料を整理します。',
  },
  {
    number: '07',
    title: '配送方法の確定・手配',
    en: 'Shipping Arrangement',
    text: 'EMS・DHL・FedEx・UPSなどの国際宅配便、航空貨物、海上輸送を比較し、貨物内容と配送先に合う方法を確認したうえで手配します。',
  },
  {
    number: '08',
    title: '発送・追跡共有・フォロー',
    en: 'Shipment & Follow-up',
    text: '発送後は追跡情報を共有し、到着までの確認事項をフォローします。輸入国側の通関、許可、税金、販売可否は原則として輸入者側での確認事項です。',
  },
]

const incotermsNotes = [
  {
    term: 'Case-by-case',
    ja: '取引条件は、商品内容・数量・配送先・責任範囲に応じて案件ごとに確認します。',
    en: 'Trade terms are confirmed case by case based on the product, volume, destination, and responsibility scope.',
  },
  {
    term: 'FCA Japan Warehouse',
    ja: '法人取引では、FCA Japan warehouse などの条件を個別に設定できる場合があります。',
    en: 'For BtoB projects, terms such as FCA Japan warehouse may be arranged individually.',
  },
  {
    term: 'EXW / FCA / DAP / DDP',
    ja: 'EXW、FCA、DAP、DDPなどは、対応可否と責任範囲を見積時に確認します。DDPは標準対応ではなく、書面合意がある場合のみ検討します。',
    en: 'EXW, FCA, DAP, and DDP availability and responsibility scope are confirmed during quotation. DDP is not a standard service unless agreed in writing.',
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
          お問い合わせから見積、前払い、商品調達、書類整理、国際配送、発送後フォローまで、必要な確認事項を順番に整理して進めます。
          早さだけでなく、輸出入規制・通関・費用項目を事前に確認し、できるだけ分かりやすい手順でご案内します。
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

      <section className="flow-incoterms">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Incoterms / Responsibility Scope</span>
          </div>
          <h2 className="section-title">
            Confirm Terms
            <br />
            <em>Per Case.</em>
          </h2>
        </div>
        <div className="flow-incoterms-grid">
          {incotermsNotes.map((item) => (
            <article className="flow-incoterms-card" key={item.term}>
              <span>{item.term}</span>
              <p>{item.ja}</p>
              <small>{item.en}</small>
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
          見積依頼時には、商品URL、商品名、希望数量、配送先国、希望配送方法、希望納期、法人利用または個人利用の区分をお知らせください。
          情報がそろっているほど、見積、配送方法、輸出入規制の確認をスムーズに進められます。輸出入規制や認証の要否は国や商品により異なるため、最終判断は税関、通関業者、公的機関の確認を前提に進めます。
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
        .flow-lead { max-width: 760px; }
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
        .flow-incoterms {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(28px, 5vw, 72px);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.18), transparent 48%),
            var(--navy-mid);
          border-top: 1px solid rgba(201,168,76,0.08);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .flow-incoterms-grid {
          display: grid;
          gap: 14px;
        }
        .flow-incoterms-card {
          border: 1px solid rgba(201,168,76,0.16);
          background: rgba(7,17,31,0.48);
          padding: 22px;
        }
        .flow-incoterms-card span {
          color: var(--gold);
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 12px;
        }
        .flow-incoterms-card p {
          color: var(--washi);
          font-size: 13.5px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          margin: 0 0 10px;
        }
        .flow-incoterms-card small {
          color: var(--washi-dim);
          display: block;
          font-size: 12.5px;
          letter-spacing: 0.03em;
          line-height: 1.8;
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
          .flow-incoterms,
          .flow-note { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
