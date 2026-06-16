import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'
import InquiryForm from '@/components/InquiryForm'
import { TranslatedText } from '@/components/TranslatedText'

export const metadata: Metadata = {
  title: 'お見積り | YUKIMICHI',
  description:
    'YUKIMICHIのお見積り依頼ページ。商品URL、数量、配送先国、希望納期をもとに、日本商品の調達、国際配送、航空貨物、海上輸送の確認を進めます。',
}

const quoteMailto =
  'mailto:exporter@justhen.co.jp?subject=YUKIMICHI%20Export%20Quotation&body=%E4%BC%9A%E7%A4%BE%E5%90%8D%EF%BC%9A%0D%0A%E3%81%94%E6%8B%85%E5%BD%93%E8%80%85%E5%90%8D%EF%BC%9A%0D%0A%E5%95%86%E5%93%81URL%EF%BC%9A%0D%0A%E6%95%B0%E9%87%8F%EF%BC%9A%0D%0A%E9%85%8D%E9%80%81%E5%85%88%E5%9B%BD%EF%BC%9A%0D%0A%E5%B8%8C%E6%9C%9B%E7%B4%8D%E6%9C%9F%EF%BC%9A%0D%0A%E5%B8%8C%E6%9C%9B%E9%85%8D%E9%80%81%E6%96%B9%E6%B3%95%EF%BC%9A%0D%0A%E7%9B%B8%E8%AB%87%E5%86%85%E5%AE%B9%EF%BC%9A'

const quoteFlow = [
  {
    step: '01',
    title: '商品情報を送る',
    text: '商品URL、数量、配送先国、希望納期をフォームまたはメールでお知らせください。',
  },
  {
    step: '02',
    title: '取扱可否・配送方法を確認',
    text: '商品内容、配送先国、配送会社条件、規制確認の要否を整理します。',
  },
  {
    step: '03',
    title: '概算見積を作成',
    text: '商品代金、国際送料、手配手数料、必要な実費を分けて確認します。',
  },
  {
    step: '04',
    title: '条件確認後に手配開始',
    text: '支払い、配送条件、必要書類を確認したうえで商品調達・発送準備へ進みます。',
  },
]

const requiredItems = [
  '商品名',
  '商品URL',
  '数量',
  '単価',
  'サイズ・重量',
  '成分・素材',
  '配送先国・都市',
  '希望納期',
  '希望配送方法',
  '法人宛・個人宛',
]

const shippingMethods = [
  {
    name: 'Express',
    detail: 'EMS / DHL / FedEx / UPS / ヤマト国際宅急便',
    note: '小口、サンプル、短納期の相談に向きます。',
  },
  {
    name: 'Air Freight',
    detail: '航空貨物',
    note: '緊急輸送、高付加価値商品、まとまった数量の相談に向きます。',
  },
  {
    name: 'Sea Freight',
    detail: 'FCL / LCL / コンテナ輸送',
    note: '大型貨物、大量輸送、コスト重視の継続出荷に向きます。',
  },
]

const noticeItems = [
  '商品内容、配送先国、数量、サイズ、重量、用途により対応可否・費用は変動します。',
  '医薬品、食品、化粧品、電池、危険品、中古品、ブランド品、動植物由来素材などは事前確認が必要です。',
  '最終的な輸出入可否、関税、VAT/GST、配送会社引受可否は、税関・通関業者・配送会社・公的機関等の確認が前提です。',
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
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Export Quotation</span>
        </div>
        <h1 className="quote-title">
          <TranslatedText id="pages.quote.heroTitle" fallback="お見積り" />
          <br />
          <em><TranslatedText id="pages.quote.heroSubtitle" fallback="Export Quotation" /></em>
        </h1>
        <p className="section-body quote-lead">
          <TranslatedText
            id="pages.quote.heroLead"
            fallback="商品URL・数量・配送先国・希望納期をお知らせいただくと、商品調達、国際配送、航空貨物、海上輸送の確認がスムーズです。"
          />
        </p>
        <div className="quote-hero-actions">
          <a href={quoteMailto} className="btn-primary">
            <TranslatedText id="pages.quote.mailCta" fallback="exporter@justhen.co.jp へ見積相談する" /> <ArrowRight />
          </a>
          <Link href="/contact" className="btn-ghost">
            <TranslatedText id="common.contact" fallback="お問い合わせ" /> <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="quote-flow">
        <div className="quote-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Quotation Flow</span>
          </div>
          <h2><TranslatedText id="pages.quote.flowTitle" fallback="見積依頼の流れ" /></h2>
          <p><TranslatedText id="pages.quote.flowLead" fallback="初回相談では、確定料金ではなく確認に必要な条件を整理し、対応可否と配送候補を確認します。" /></p>
        </div>
        <div className="quote-flow-grid">
          {quoteFlow.map((item) => (
            <article className="quote-flow-card" key={item.step}>
              <span>{item.step}</span>
              <h3><TranslatedText id={`pages.quote.flowItems.${Number(item.step) - 1}.title`} fallback={item.title} /></h3>
              <p><TranslatedText id={`pages.quote.flowItems.${Number(item.step) - 1}.text`} fallback={item.text} /></p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-details">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Required Details</span>
          </div>
          <h2><TranslatedText id="pages.quote.requiredTitle" fallback="必要情報カード" /></h2>
          <p>
            <TranslatedText
              id="pages.quote.requiredLead"
              fallback="以下の情報が揃っているほど、商品調達、配送可否、送料、規制確認、リードタイムの確認が進めやすくなります。"
            />
          </p>
        </div>
        <div className="quote-detail-grid">
          {requiredItems.map((item, index) => (
            <div className="quote-detail-card" key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong><TranslatedText id={`pages.quote.requiredItems.${index}`} fallback={item} /></strong>
            </div>
          ))}
        </div>
      </section>

      <section className="quote-shipping">
        <div className="quote-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Shipping Guide</span>
          </div>
          <h2><TranslatedText id="pages.quote.shippingTitle" fallback="配送方法の目安" /></h2>
          <p><TranslatedText id="pages.quote.shippingLead" fallback="配送先国、内容品、数量、納期、サイズ・重量により、候補となる配送方法が変わります。" /></p>
        </div>
        <div className="quote-shipping-grid">
          {shippingMethods.map((method, index) => (
            <article className="quote-shipping-card" key={method.name}>
              <span>{method.name}</span>
              <h3>{method.detail}</h3>
              <p><TranslatedText id={`pages.quote.shippingNotes.${index}`} fallback={method.note} /></p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-notice">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Important Notice</span>
          </div>
          <h2><TranslatedText id="pages.quote.noticeTitle" fallback="注意事項" /></h2>
        </div>
        <ul>
          {noticeItems.map((item, index) => (
            <li key={item}><TranslatedText id={`pages.quote.noticeItems.${index}`} fallback={item} /></li>
          ))}
        </ul>
      </section>

      <section className="quote-mail">
        <div>
          <span>Official Quotation Email</span>
          <h2><TranslatedText id="pages.quote.formTitle" fallback="フォームから見積内容を送信" /></h2>
          <p>
            <TranslatedText
              id="pages.quote.formLead"
              fallback="必要事項を入力して送信すると、YUKIMICHIの確認窓口に内容が届きます。メールで直接連絡したい場合は、補助導線としてメールリンクも利用できます。"
            />
          </p>
          <a href={quoteMailto} className="quote-mail-address">
            exporter@justhen.co.jp
          </a>
        </div>
        <InquiryForm type="quote" mailtoHref={quoteMailto} />
      </section>

      <style>{`
        .quote-hero {
          min-height: 70svh;
          padding: calc(var(--nav-h) + 88px) var(--gutter) 76px;
          background:
            radial-gradient(ellipse 70% 46% at 78% 22%, rgba(201,168,76,0.09), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 58%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.12);
        }

        .quote-title {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(42px, 7.3vw, 92px);
          font-weight: 300;
          line-height: 1.05;
          margin-bottom: 28px;
        }

        .quote-title em {
          color: var(--gold);
          font-size: 0.68em;
          font-style: italic;
        }

        .quote-lead {
          max-width: 820px;
        }

        .quote-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .quote-flow,
        .quote-shipping {
          padding: var(--section-pad) var(--gutter);
          background:
            linear-gradient(180deg, var(--navy-mid) 0%, var(--navy-deep) 100%);
        }

        .quote-section-head {
          max-width: 900px;
          margin-bottom: 42px;
        }

        .quote-section-head h2,
        .quote-details h2,
        .quote-notice h2,
        .quote-mail h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 300;
          line-height: 1.35;
          margin: 0 0 16px;
        }

        .quote-section-head p,
        .quote-details p,
        .quote-mail p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2.1;
          margin: 0;
        }

        .quote-flow-grid,
        .quote-shipping-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .quote-flow-card,
        .quote-shipping-card,
        .quote-detail-card {
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(13,28,53,0.92), rgba(7,17,31,0.82));
        }

        .quote-flow-card {
          min-height: 230px;
          padding: 24px;
        }

        .quote-flow-card span,
        .quote-detail-card span {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 300;
          line-height: 1;
        }

        .quote-flow-card h3,
        .quote-shipping-card h3 {
          color: var(--washi);
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0.1em;
          line-height: 1.7;
          margin: 22px 0 12px;
        }

        .quote-flow-card p,
        .quote-shipping-card p,
        .quote-notice li {
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          margin: 0;
        }

        .quote-details,
        .quote-notice,
        .quote-mail {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(28px, 5vw, 72px);
          background: var(--navy-deep);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .quote-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .quote-detail-card {
          display: grid;
          grid-template-columns: 48px 1fr;
          align-items: center;
          gap: 14px;
          min-height: 72px;
          padding: 15px 18px;
        }

        .quote-detail-card span {
          font-size: 22px;
        }

        .quote-detail-card strong {
          color: var(--washi-dim);
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.06em;
          line-height: 1.7;
        }

        .quote-shipping-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .quote-shipping-card {
          min-height: 250px;
          padding: 28px;
        }

        .quote-shipping-card span {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 300;
          line-height: 1;
        }

        .quote-notice {
          background:
            linear-gradient(135deg, rgba(139,30,47,0.18), transparent 48%),
            var(--navy-deep);
        }

        .quote-notice ul {
          display: grid;
          gap: 14px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .quote-notice li {
          border-left: 2px solid var(--gold);
          background: rgba(13,28,53,0.62);
          padding: 16px 18px;
        }

        .quote-mail {
          align-items: start;
          background:
            linear-gradient(135deg, rgba(139,30,47,0.32), transparent 48%),
            var(--navy-mid);
          grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
        }

        .quote-mail > div > span {
          color: var(--gold);
          display: block;
          font-size: 10px;
          letter-spacing: 0.32em;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        .quote-mail-address {
          color: var(--gold);
          display: inline-flex;
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(22px, 3.2vw, 34px);
          font-weight: 300;
          line-height: 1.35;
          margin-top: 20px;
          overflow-wrap: anywhere;
          text-decoration: none;
        }

        @media (max-width: 1180px) {
          .quote-flow-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .quote-details,
          .quote-notice,
          .quote-mail {
            grid-template-columns: 1fr;
          }

          .quote-shipping-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .quote-flow-grid,
          .quote-detail-grid {
            grid-template-columns: 1fr;
          }

          .quote-flow-card,
          .quote-shipping-card {
            min-height: auto;
          }
        }
      `}</style>
    </>
  )
}
