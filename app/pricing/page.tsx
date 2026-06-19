import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'
import { TranslatedText } from '@/components/TranslatedText'

export const metadata: Metadata = {
  title: '料金表 | YUKIMICHI',
  description:
    'YUKIMICHIの料金表。商品代金に対する手配手数料率、追加サービス料金、国際送料・保険・関税・VAT/GST等の実費、T/T国際送金、注意事項について。',
}

const pricingPlans = [
  {
    label: 'International Express',
    title: 'International Express',
    rate: '15%',
    minimum: 'JPY 10,000',
    use: '小口貨物、サンプル、EMS / DHL / FedEx / UPS / ヤマト国際宅急便',
  },
  {
    label: 'Air Freight',
    title: 'Air Freight',
    rate: '10%',
    minimum: 'JPY 30,000',
    use: '航空貨物、急ぎの商業貨物',
  },
  {
    label: 'Sea LCL',
    title: 'Sea LCL',
    rate: '7%',
    minimum: 'JPY 30,000',
    use: '小〜中規模の海上混載貨物',
  },
  {
    label: 'Sea FCL / Large Volume',
    title: 'Sea FCL / Large Volume',
    rate: '7%',
    minimum: 'JPY 50,000',
    use: 'コンテナ貨物、大口案件、継続取引',
    note: '高額商品、特殊貨物、長期契約、大量案件については個別見積り',
  },
]

const feeBasisItems = [
  {
    label: 'Product Value Basis',
    title: '商品代金基準',
    body: '商品代金とは、原則として国際送料、関税、輸入税、輸送保険料を除いた商品購入代金を指します。案件内容により、正式見積り時に算出基準を個別に確認します。',
    sub: 'Product value generally refers to the product purchase price before international shipping, customs duties, taxes, and insurance. The final basis may vary depending on quotation conditions.',
  },
  {
    label: 'Actual Cost Items',
    title: '実費項目',
    body: '国際送料、輸送保険、関税、輸入税、VAT/GST、通関関連費用、特殊梱包費、検査費用等は、手配手数料とは別に実費または個別見積りとなります。',
    sub: 'International shipping, insurance, customs duties, import taxes, VAT/GST, customs-related charges, special packaging, and inspection costs are charged separately at actual cost or quoted individually.',
  },
  {
    label: 'Individual Quotation',
    title: '個別見積り',
    body: '高額商品、大量貨物、海上コンテナ輸送（FCL）、継続取引、特殊梱包、複数仕入先の商品集約は、案件内容に応じて手配手数料や実費項目を個別に確認します。',
    sub: 'High-value products, large-volume cargo, FCL shipments, ongoing transactions, special packaging, and multi-supplier consolidation may be quoted individually.',
  },
  {
    label: 'Insurance & Customs Notes',
    title: '保険・税関注意事項',
    body: '輸送保険は任意加入です。未加入の場合、輸送中の紛失・破損に関する補償は、運送会社または保険約款の範囲に限定されます。税関判断による遅延、検査、没収、追加費用は返金対象外となる場合があります。',
    sub: 'Shipping insurance is optional but recommended for high-value shipments. Without insurance, compensation is limited to carrier terms or the applicable insurance policy.',
  },
]

const excludedCostItems = [
  '国際送料',
  '国内配送費',
  '保険料',
  '関税・輸入税・VAT/GST',
  '通関関連費用',
  '倉庫費用',
  '検査費用',
  '証明書取得費用',
  'ラベル作成・貼替費用',
  '梱包資材費・再梱包費用',
]

const optionalServiceFees = [
  { service: '商品写真撮影', type: '有料オプション', guide: '1商品 1,000〜3,000円' },
  { service: '外箱・ラベル撮影', type: '有料オプション', guide: '1商品 1,000〜3,000円' },
  { service: 'JANコード・成分表示確認', type: '有料オプション', guide: '1商品 1,000〜3,000円' },
  { service: '簡易検品', type: '有料オプション', guide: '1商品 2,000〜5,000円' },
  { service: '数量確認', type: '基本または有料', guide: '案件規模による' },
  { service: '梱包前写真', type: '有料オプション', guide: '1箱 500〜1,500円' },
  { service: '梱包後写真', type: '有料オプション', guide: '1箱 500〜1,500円' },
  { service: 'ダメージ確認', type: '有料オプション', guide: '1箱 1,000〜3,000円' },
  { service: '賞味期限・使用期限確認', type: '有料オプション', guide: '1商品 1,000〜3,000円' },
  { service: 'SDS/MSDS取得サポート', type: '有料オプション', guide: '1商品 3,000〜10,000円' },
  { service: 'メーカー資料取得代行', type: '有料オプション', guide: '1社1,000〜3,000円' },
  { service: '追加メーカー問い合わせ', type: '有料オプション', guide: '1社 5,000〜10,000円' },
  { service: 'サンプル購入代行', type: '有料オプション', guide: '商品代金 + 手数料' },
  { service: '小分け・再梱包', type: '有料オプション', guide: '個別見積り' },
  { service: '特殊梱包', type: '有料オプション', guide: '個別見積り' },
  { service: '複数仕入先の商品集約', type: '有料オプション', guide: '個別見積り' },
  { service: '分納・複数配送先対応', type: '有料オプション', guide: '個別見積り' },
  { service: '価格交渉・条件交渉', type: '有料オプション', guide: '10,000円〜' },
  { service: '長期商談代行', type: '月額または個別', guide: '10,000円〜' },
]

const paymentItems = [
  'お支払い条件は、原則として日本の当社指定銀行口座へのT/T国際送金による前払いとなります。',
  'Payment is generally required in advance by T/T bank transfer to YUKIMICHI’s designated bank account in Japan.',
  '支払方法：銀行によるT/T国際送金',
  'Payment by T/T bank transfer',
  '送金手数料・銀行手数料は、原則としてお客様負担となります。',
  'Bank transfer fees and remittance charges are generally borne by the customer.',
  '入金確認後、仕入れ・発注・輸出手配を開始します。',
  'After payment is confirmed, we will begin procurement, ordering, and export arrangement procedures.',
]

const noticeItems = [
  '表示手数料は目安であり、商品内容、数量、仕向地、輸送条件により変動する場合があります。',
  '国際送料、輸送保険、関税、輸入税、VAT/GST、通関関連費用は別途実費となります。',
  '輸送保険は任意加入です。未加入時の補償は、運送会社または保険約款の範囲に限定されます。',
  '税関判断による遅延、検査、没収、追加費用は返金対象外となる場合があります。',
  '模倣品、海賊版、知的財産権侵害品、輸出入規制品は取り扱いできません。',
  '化粧品、食品、健康関連商品は、成分、ラベル、SDS/MSDS、輸送条件により追加確認が必要になる場合があります。',
  '正式見積りでは、商品代金、手配手数料、国際送料、保険料、その他費用をできるだけ分けて明示します。',
]

const optionalServiceNotes = [
  '表示金額は目安であり、商品内容、数量、確認項目、保管期間、作業量、輸送条件により変動します。',
  '化粧品・食品・健康関連商品は、輸出先国の規制、成分、ラベル、SDS/MSDS、輸送条件により追加確認が必要になる場合があります。',
  '模倣品、海賊版、知的財産権侵害品、輸出入規制品は取り扱い対象外です。',
  '写真撮影や店舗確認は、店舗ルール、撮影許可、商用利用可否を確認したうえで対応します。',
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
          <TranslatedText id="pages.pricing.heroTitle" fallback="料金表" />
          <br />
          <em><TranslatedText id="pages.pricing.heroSubtitle" fallback="Transparent Pricing for Export Support" /></em>
        </h1>
      </section>

      <section className="pricing-plans">
        <div className="pricing-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Handling Fee</span>
          </div>
          <h2>手配手数料の基本体系</h2>
          <p>
            表示手数料は、送料・保険・関税等を含めた総額ではなく、原則として商品代金を基準に算出するYUKIMICHIの手配手数料です。
          </p>
        </div>

        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article className="pricing-card" key={plan.label}>
              <span className="pricing-card__label">{plan.label}</span>
              <h2>{plan.title}</h2>
              <div className="pricing-rate">
                {plan.rate}{' '}
                <small>of product value</small>
              </div>
              <div className="pricing-card-info">
                <p>
                  <span>Minimum Fee</span>
                  <strong>{plan.minimum}</strong>
                </p>
                <p>
                  <span>Use Case</span>
                  <strong>{plan.use}</strong>
                </p>
              </div>
              {plan.note && <p className="pricing-card-note">{plan.note}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-optional-services">
        <div className="pricing-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Optional Service Fees</span>
          </div>
          <h2>
            YUKIMICHI 追加サービス料金表
            <em>Optional Service Fees</em>
          </h2>
          <p>
            写真撮影、検品、資料取得、化粧品確認項目など、通常対応を超える作業については、内容に応じて別途お見積りとなります。
            通常の在庫確認、価格確認、MOQ確認は基本手数料に含め、写真撮影・検品・資料取得・複数社比較・長期交渉などは追加費用として分けて表示します。
          </p>
        </div>

        <div className="optional-fee-table" role="table" aria-label="YUKIMICHI optional service fees">
          <div className="optional-fee-row optional-fee-head" role="row">
            <span role="columnheader">サービス</span>
            <span role="columnheader">料金扱い</span>
            <span role="columnheader">目安</span>
          </div>
          {optionalServiceFees.map((fee) => (
            <div className="optional-fee-row" role="row" key={fee.service}>
              <span role="cell" data-label="サービス">{fee.service}</span>
              <span role="cell" data-label="料金扱い">{fee.type}</span>
              <strong role="cell" data-label="目安">{fee.guide}</strong>
            </div>
          ))}
        </div>

        <div className="optional-service-copy">
          <p>
            商品写真撮影、外箱・ラベル撮影、JANコード・成分表示確認、簡易検品、梱包前後の写真撮影、SDS/MSDS取得サポート、メーカー資料取得代行、特殊梱包、再梱包、分納、複数配送先対応、価格交渉・長期商談代行等は、作業内容に応じて別途お見積りとなります。
          </p>
        </div>

        <div className="optional-service-notes">
          <span>Important Notes</span>
          <ul>
            {optionalServiceNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="optional-service-actions">
          <Link href="/quote" className="btn-primary">
            Request a Quote <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact Us <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="pricing-fee-basis">
        <div className="pricing-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Fee Basis / 手数料の算出基準</span>
          </div>
          <h2>費用の考え方をご案内</h2>
          <p>
            正式見積りでは、商品代金、手配手数料、国際送料、保険料、その他費用をできるだけ分けて明示します。
          </p>
        </div>
        <div className="fee-basis-grid">
          {feeBasisItems.map((item) => (
            <article className="fee-basis-card" key={item.label}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              {item.sub && <p className="fee-basis-card__sub">{item.sub}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-excluded-costs">
        <div className="pricing-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Costs Not Included</span>
          </div>
          <h2>料金に含まれない主な費用</h2>
          <p>
            表示されている手数料は、YUKIMICHIによる日本側の輸出調整・手配支援に対するサービス手数料です。
            以下の費用は、原則として別途実費または個別見積りとなります。
          </p>
          <p lang="en">
            The listed service fees are coordination fees for YUKIMICHI’s Japan-side export arrangement support.
            The following costs are generally charged separately at actual cost or quoted individually.
          </p>
        </div>
        <div className="excluded-cost-layout">
          <div className="excluded-cost-copy">
            <p>
              案件ごとに商品内容、数量、重量、サイズ、仕入先、配送方法、輸入国の規制、配送会社の引受可否が異なるため、最終金額は個別見積りにより確定します。
            </p>
            <p lang="en">
              Final costs depend on the product, quantity, weight, dimensions, supplier conditions, shipping method, import-country regulations, and carrier acceptance. A final quotation will be provided on a case-by-case basis.
            </p>
          </div>
          <ul className="excluded-cost-list">
            {excludedCostItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pricing-payment">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Payment Method / お支払い方法</span>
          </div>
          <h2>T/T Bank Transfer</h2>
          <p>
            入金確認後に手配・発注・輸出準備を進めます。支払い方法の詳細は正式見積り・請求時に個別にご案内します。
          </p>
        </div>
        <div className="payment-card">
          {paymentItems.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="pricing-important">
        <div className="pricing-important-inner">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Important Notes / 注意事項</span>
          </div>
          <h2>正式見積り前に確認すること</h2>
          <ul>
            {noticeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            詳細な条件は
            <Link href="/terms"> 取引条件 </Link>
            と
            <Link href="/restricted"> 禁止・制限品目 </Link>
            をご確認ください。内容品の虚偽申告、規制逃れ、配送会社の引受条件に反する手配は行いません。
          </p>
        </div>
      </section>

      <section className="pricing-cta">
        <div>
          <span>Estimate Request</span>
          <h2>料金を確認して相談する</h2>
          <p>
            商品URL、数量、配送先国、希望配送方法を添えてご相談ください。YUKIMICHIが商品代金・手配手数料・実費項目を分けて整理します。
          </p>
          <a href="mailto:exporter@justhen.co.jp" className="pricing-mail">
            exporter@justhen.co.jp
          </a>
        </div>
        <div className="pricing-cta-actions">
          <Link href="/quote" className="btn-primary">
            Request a Quote <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact Us <ArrowRight />
          </Link>
        </div>
      </section>

      <style>{`
        .pricing-hero {
          padding: calc(var(--nav-h) + 88px) var(--gutter) clamp(52px, 7vw, 76px);
          background:
            radial-gradient(ellipse 70% 46% at 78% 22%, rgba(201,168,76,0.09), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 58%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.12);
        }

        .pricing-title {
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-weight: 300;
          font-size: clamp(42px, 7.3vw, 92px);
          line-height: 1.05;
          color: var(--washi);
          margin-bottom: 0;
          letter-spacing: 0;
        }

        .pricing-title em {
          color: var(--gold);
          font-style: italic;
          font-size: 0.68em;
        }

        .pricing-plans,
        .pricing-optional-services,
        .pricing-fee-basis,
        .pricing-excluded-costs {
          padding: var(--section-pad) var(--gutter);
          background: linear-gradient(180deg, var(--navy-mid) 0%, var(--navy-deep) 100%);
        }

        .pricing-section-head {
          max-width: 960px;
          margin-bottom: 38px;
        }

        .pricing-section-head h2,
        .pricing-optional-services h2,
        .pricing-payment h2,
        .pricing-important h2,
        .pricing-cta h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 300;
          line-height: 1.35;
          margin: 0 0 16px;
          letter-spacing: 0;
        }

        .pricing-optional-services h2 em {
          color: var(--gold);
          display: block;
          font-style: italic;
          font-size: 0.72em;
          margin-top: 4px;
        }

        .pricing-section-head p,
        .pricing-optional-services p,
        .pricing-payment p,
        .pricing-important p,
        .pricing-cta p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 2.1;
          margin: 0;
        }

        .optional-service-copy,
        .optional-service-notes {
          border: 1px solid rgba(201,168,76,0.18);
          background: rgba(7,17,31,0.68);
          margin-bottom: 22px;
          padding: clamp(22px, 3vw, 32px);
        }

        .optional-service-notes span {
          color: var(--gold);
          display: block;
          font-size: 10px;
          letter-spacing: 0.24em;
          line-height: 1.6;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .optional-fee-table {
          border: 1px solid rgba(201,168,76,0.16);
          background: rgba(7,17,31,0.52);
          margin-bottom: 28px;
        }

        .optional-fee-row {
          display: grid;
          grid-template-columns: minmax(220px, 1.1fr) minmax(150px, 0.65fr) minmax(180px, 0.75fr);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }

        .optional-fee-row:last-child {
          border-bottom: 0;
        }

        .optional-fee-row span,
        .optional-fee-row strong {
          color: var(--washi-dim);
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.04em;
          line-height: 1.85;
          padding: 15px 18px;
        }

        .optional-fee-row span + span,
        .optional-fee-row strong {
          border-left: 1px solid rgba(201,168,76,0.1);
        }

        .optional-fee-row strong {
          color: var(--washi);
        }

        .optional-fee-head {
          background: rgba(201,168,76,0.08);
        }

        .optional-fee-head span {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .optional-service-copy {
          background: rgba(201,168,76,0.06);
        }

        .optional-service-notes {
          margin-bottom: 26px;
        }

        .optional-service-notes ul {
          display: grid;
          gap: 12px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .optional-service-notes li {
          border-left: 1px solid rgba(201,168,76,0.34);
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          padding-left: 14px;
        }

        .optional-service-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .pricing-card {
          border: 1px solid rgba(201,168,76,0.16);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.16), transparent 48%),
            rgba(7,17,31,0.84);
          min-height: 430px;
          padding: clamp(24px, 3vw, 32px);
          display: flex;
          flex-direction: column;
        }

        .pricing-card__label {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.24em;
          line-height: 1.5;
          margin-bottom: 18px;
          text-transform: uppercase;
        }

        .pricing-card h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', serif;
          display: flex;
          align-items: flex-start;
          font-size: clamp(28px, 3.4vw, 38px);
          font-weight: 300;
          line-height: 1.08;
          margin-bottom: 26px;
          min-height: 128px;
          letter-spacing: 0;
        }

        .pricing-rate {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(58px, 6vw, 78px);
          font-weight: 300;
          line-height: 0.95;
          margin-bottom: 26px;
        }

        .pricing-rate small {
          display: block;
          color: var(--washi-dim);
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 11px;
          letter-spacing: 0.16em;
          line-height: 1.6;
          margin-top: 10px;
          text-transform: uppercase;
        }

        .pricing-card-info {
          display: grid;
          gap: 14px;
          margin-top: auto;
        }

        .pricing-card-info p {
          border-top: 1px solid rgba(201,168,76,0.12);
          margin: 0;
          padding-top: 14px;
        }

        .pricing-card-info span {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.2em;
          line-height: 1.6;
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .pricing-card-info strong,
        .pricing-card-note {
          color: var(--washi-dim);
          display: block;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.04em;
          line-height: 1.9;
        }

        .pricing-card-note {
          border: 1px solid rgba(201,168,76,0.18);
          background: rgba(201,168,76,0.06);
          margin: 16px 0 0;
          padding: 12px 14px;
        }

        .fee-basis-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .fee-basis-card {
          border: 1px solid rgba(201,168,76,0.16);
          background: rgba(13,28,53,0.72);
          padding: clamp(24px, 3vw, 34px);
          min-height: 240px;
        }

        .fee-basis-card span,
        .pricing-cta span {
          color: var(--gold);
          display: block;
          font-size: 10px;
          letter-spacing: 0.24em;
          line-height: 1.6;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        .fee-basis-card h3 {
          color: var(--washi);
          font-size: 18px;
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.6;
          margin: 0 0 12px;
        }

        .fee-basis-card p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 2;
          margin: 0;
        }

        .fee-basis-card__sub {
          border-left: 1px solid rgba(201,168,76,0.32);
          color: var(--washi) !important;
          margin-top: 14px !important;
          padding-left: 14px;
        }

        .pricing-excluded-costs {
          padding-top: 0;
        }

        .excluded-cost-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
          gap: 18px;
        }

        .excluded-cost-copy,
        .excluded-cost-list {
          border: 1px solid rgba(201,168,76,0.18);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.18), transparent 52%),
            rgba(7,17,31,0.68);
          margin: 0;
          padding: clamp(24px, 3vw, 34px);
        }

        .excluded-cost-copy p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 2.05;
          margin: 0;
        }

        .excluded-cost-copy p + p {
          border-top: 1px solid rgba(201,168,76,0.12);
          margin-top: 16px;
          padding-top: 16px;
        }

        .excluded-cost-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          list-style: none;
        }

        .excluded-cost-list li {
          border-left: 1px solid rgba(201,168,76,0.34);
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 1.8;
          padding-left: 13px;
        }

        .pricing-payment {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(28px, 5vw, 72px);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.18), transparent 50%),
            var(--navy-deep);
          border-top: 1px solid rgba(201,168,76,0.08);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .payment-card {
          border: 1px solid rgba(201,168,76,0.22);
          background: rgba(7,17,31,0.68);
          padding: clamp(26px, 4vw, 42px);
        }

        .payment-card p {
          border-bottom: 1px solid rgba(201,168,76,0.1);
          color: var(--washi);
          font-size: 14px;
          line-height: 1.9;
          padding: 0 0 14px;
        }

        .payment-card p + p {
          margin-top: 14px;
        }

        .payment-card p:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }

        .pricing-important {
          padding: var(--section-pad) var(--gutter);
          background: var(--navy-deep);
        }

        .pricing-important-inner {
          max-width: 1180px;
          margin: 0 auto;
          border: 1px solid rgba(201,168,76,0.18);
          background:
            linear-gradient(90deg, rgba(139,30,47,0.24), transparent 50%),
            rgba(13,28,53,0.82);
          padding: clamp(30px, 5vw, 56px);
        }

        .pricing-important ul {
          display: grid;
          gap: 12px;
          list-style: none;
          margin: 24px 0 0;
          padding: 0;
        }

        .pricing-important li {
          border-left: 1px solid rgba(201,168,76,0.34);
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          padding-left: 14px;
        }

        .pricing-important p {
          border-top: 1px solid rgba(201,168,76,0.12);
          margin-top: 26px;
          padding-top: 22px;
        }

        .pricing-important a {
          color: var(--gold);
          text-decoration: none;
        }

        .pricing-cta {
          padding: 68px var(--gutter);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          background:
            linear-gradient(135deg, rgba(139,30,47,0.36), transparent 42%),
            var(--navy-mid);
          border-top: 1px solid rgba(201,168,76,0.14);
        }

        .pricing-cta > div:first-child {
          max-width: 760px;
        }

        .pricing-mail {
          display: inline-flex;
          color: var(--gold);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(22px, 3.2vw, 34px);
          font-weight: 300;
          line-height: 1.35;
          margin-top: 20px;
          overflow-wrap: anywhere;
          text-decoration: none;
        }

        .pricing-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: flex-end;
        }

        @media (max-width: 1180px) {
          .pricing-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .pricing-payment {
            grid-template-columns: 1fr;
          }

          .excluded-cost-layout {
            grid-template-columns: 1fr;
          }

          .pricing-cta {
            align-items: flex-start;
            flex-direction: column;
          }

          .pricing-cta-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 680px) {
          .pricing-grid,
          .fee-basis-grid,
          .excluded-cost-list {
            grid-template-columns: 1fr;
          }

          .optional-fee-table {
            display: grid;
            gap: 12px;
            border: 0;
            background: transparent;
          }

          .optional-fee-head {
            display: none;
          }

          .optional-fee-row {
            border: 1px solid rgba(201,168,76,0.16);
            background: rgba(7,17,31,0.58);
            display: grid;
            grid-template-columns: 1fr;
          }

          .optional-fee-row span,
          .optional-fee-row strong {
            border-left: 0;
            padding: 11px 14px;
          }

          .optional-fee-row span::before,
          .optional-fee-row strong::before {
            color: var(--gold);
            content: attr(data-label);
            display: block;
            font-size: 10px;
            letter-spacing: 0.18em;
            line-height: 1.5;
            margin-bottom: 4px;
            text-transform: uppercase;
          }

          .pricing-card {
            min-height: auto;
          }

          .pricing-card h2 {
            min-height: auto;
          }
        }
      `}</style>
    </>
  )
}
