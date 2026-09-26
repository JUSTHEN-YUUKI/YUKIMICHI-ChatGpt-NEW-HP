import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'
import { HandlingFeeCalculator } from '@/components/pricing/HandlingFeeCalculator'
import { TranslatedText } from '@/components/TranslatedText'
import {
  formatFeeRate,
  formatJpy,
  handlingFeePlans as pricingPlans,
  handlingFeeTiers as pricingTiers,
} from '@/lib/pricing/handlingFees'

export const metadata: Metadata = {
  title: '料金表 | YUKIMICHI',
  description:
    'YUKIMICHIの料金表。商品代金に対する手配手数料率、追加サービス料金、国際送料・保険・関税・VAT/GST等の実費、Wise推奨、SMBC口座への日本円前払い、T/T送金、注意事項について。',
  alternates: { canonical: '/pricing' },
}

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
    body: '特殊貨物、特殊梱包、特別な検査・書類対応、複数仕入先の商品集約、長期契約、通常範囲を大きく超える作業など、案件内容によって追加作業が発生する場合は、別途個別にお見積りする場合があります。',
    sub: 'Special cargo, special packing, additional inspections or documentation, multi-supplier consolidation, long-term contracts, and work substantially beyond the normal scope may require a separate quotation.',
  },
  {
    label: 'Insurance & Customs Notes',
    title: '保険・税関注意事項',
    body: '輸送保険は任意加入です。輸送保険に加入しない場合、補償は運送会社の運送約款および責任限度額の範囲に限定されます。税関判断による遅延、検査、没収、追加費用は返金対象外となる場合があります。',
    sub: "Shipping insurance is optional but recommended for high-value shipments. If shipping insurance is not arranged, compensation is limited to the carrier's terms and applicable liability limits.",
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
  'ラベル作成・貼り替え費用',
  '梱包資材費・再梱包費用',
]

const optionalServiceFees = [
  { service: '商品写真撮影', en: 'Product photography', type: '有料オプション', guide: '1商品 1,000〜3,000円' },
  { service: '外箱・ラベル撮影', en: 'Outer box and label photos', type: '有料オプション', guide: '1商品 1,000〜3,000円' },
  { service: 'JANコード・成分表示確認', en: 'JAN code and ingredient label check', type: '有料オプション', guide: '1商品 1,000〜3,000円' },
  { service: '簡易検品', en: 'Simple inspection', type: '有料オプション', guide: '1商品 2,000〜5,000円' },
  { service: '数量確認', en: 'Quantity confirmation', type: '基本または有料', guide: '案件規模による' },
  { service: '梱包前写真', en: 'Pre-packing photos', type: '有料オプション', guide: '1箱 500〜1,500円' },
  { service: '梱包後写真', en: 'Post-packing photos', type: '有料オプション', guide: '1箱 500〜1,500円' },
  { service: 'ダメージ確認', en: 'Damage check', type: '有料オプション', guide: '1箱 1,000〜3,000円' },
  { service: '賞味期限・使用期限確認', en: 'Best-before or expiration date check', type: '有料オプション', guide: '1商品 1,000〜3,000円' },
  { service: 'SDS/MSDS取得サポート', en: 'Assistance obtaining an SDS or MSDS', type: '有料オプション', guide: '1商品 3,000〜10,000円' },
  { service: 'メーカー資料取得代行', en: 'Supplier document collection support', type: '有料オプション', guide: '1社1,000〜3,000円' },
  { service: '追加メーカー問い合わせ', en: 'Additional supplier inquiry', type: '有料オプション', guide: '1社 5,000〜10,000円' },
  { service: 'サンプル購入代行', en: 'Sample purchase support', type: '有料オプション', guide: '商品代金 + 手数料' },
  { service: '小分け・再梱包', en: 'Repacking or splitting', type: '有料オプション', guide: '個別見積り' },
  { service: '特殊梱包', en: 'Special packing', type: '有料オプション', guide: '個別見積り' },
  { service: '複数仕入先の商品集約', en: 'Multi-supplier consolidation', type: '有料オプション', guide: '個別見積り' },
  { service: '分納・複数配送先対応', en: 'Split shipment or multiple destinations', type: '有料オプション', guide: '個別見積り' },
  { service: '価格交渉・条件交渉', en: 'Price and contract-term negotiation', type: '有料オプション', guide: '10,000円〜' },
  { service: '長期商談代行', en: 'Long-term negotiation support', type: '月額または個別', guide: '10,000円〜' },
]

const paymentItems = [
  {
    ja: '海外からのお支払いでは、国際送金と入金確認を簡潔にするため、Wiseのご利用を推奨しております。',
    en: 'For overseas payments, we recommend Wise to simplify international transfers and payment confirmation.',
  },
  {
    ja: 'お支払い先は、弊社指定の三井住友銀行（SMBC）口座です。お支払いは、原則として日本円での前払いとなります。',
    en: 'The payment destination is our designated Sumitomo Mitsui Banking Corporation (SMBC) account. Payment is generally required in advance in Japanese yen.',
  },
  {
    ja: 'Wiseのご利用が難しい場合は、通常の海外銀行送金（T/T送金）により、弊社指定の三井住友銀行（SMBC）口座へお支払いいただく方法をご案内いたします。',
    en: 'If Wise is difficult to use, we will provide instructions for payment to our designated SMBC account by conventional international bank transfer, also known as T/T remittance.',
  },
  {
    ja: '正式な送金先情報、支払期日、銀行手数料の扱いは、正式見積りまたは請求書発行時に個別にご案内します。',
    en: 'Detailed payment instructions, due date, and bank fee handling will be provided individually at the time of quotation or invoice issuance.',
  },
  {
    ja: '入金確認後に、商品調達、発注、梱包、輸出関連手配を開始します。',
    en: 'After payment is confirmed, we begin procurement, ordering, packing, and export-related arrangements.',
  },
  {
    ja: '送金手数料・銀行手数料は、原則としてお客様負担となります。',
    en: 'Bank transfer fees and remittance charges are generally borne by the customer.',
  },
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
          <h2 lang="ja">手配手数料の段階料金</h2>
          <p className="pricing-section-subtitle" lang="en">Progressive handling fees based on product value</p>
          <p lang="ja">
            表示手数料は、送料・保険・関税等を含めた総額ではなく、原則として商品代金を基準に算出するYUKIMICHIの手配手数料です。
          </p>
        </div>

        <div
          className="pricing-tier-table-wrap"
          role="region"
          aria-label="商品代金の金額帯別手配手数料"
          tabIndex={0}
        >
          <table className="pricing-tier-table">
            <caption>Handling Fee Tiers / 商品代金の金額帯別手数料</caption>
            <thead>
              <tr>
                <th scope="col">
                  <span lang="ja">商品代金の金額帯</span>
                  <small lang="en">Product Value Tier</small>
                </th>
                {pricingPlans.map((plan) => (
                  <th scope="col" key={plan.key}>
                    <span>{plan.title}</span>
                    <small>Minimum {formatJpy(plan.minimumFee)}</small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingTiers.map((tier) => (
                <tr key={tier.rangeJa}>
                  <th scope="row">
                    <span lang="ja">{tier.rangeJa}</span>
                    <small lang="en">{tier.rangeEn}</small>
                  </th>
                  {pricingPlans.map((plan) => (
                    <td key={plan.key}>{formatFeeRate(tier.rates[plan.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="progressive-fee-summary">
          <p lang="ja">
            <strong>各料率は商品代金全額に適用されるものではありません。商品代金を金額帯ごとに分け、それぞれの金額帯に設定された料率で計算します。</strong>
          </p>
          <p lang="en">
            Each percentage applies only to the portion of the product value within that tier, not to the full product value.
          </p>
          <div className="progressive-fee-summary__formula" aria-label="Sea freight example for a product value of JPY 3,000,000">
            <span>JPY 1,000,000 × 7%</span>
            <b aria-hidden="true">＋</b>
            <span>JPY 2,000,000 × 6.5%</span>
            <b aria-hidden="true">＝</b>
            <strong>JPY 200,000</strong>
          </div>
        </div>

        <div className="fee-calculation-copy">
          <div>
            <span className="fee-calculation-copy__label">手数料の計算方法</span>
            <p lang="ja">
              手数料は、商品代金の金額帯ごとに設定された料率で段階的に計算します。商品代金全額に1つの料率を適用するのではなく、それぞれの金額帯に該当する金額に対して、それぞれの手数料率を適用します。商品代金が高くなるほど、追加される金額部分に適用される手数料率が段階的に下がる仕組みです。
            </p>
          </div>
          <div>
            <span className="fee-calculation-copy__label">Fee Calculation</span>
            <p lang="en">
              Handling fees are calculated progressively according to each product value tier. A single percentage is not applied to the entire product value. Instead, each portion of the product value is calculated using the percentage assigned to its respective tier. As the product value increases, a lower percentage is applied only to the amount falling within the higher tier.
            </p>
          </div>
        </div>

        <article className="fee-example" aria-labelledby="fee-example-title">
          <header>
            <span>Calculation Example</span>
            <h3 id="fee-example-title" lang="ja">計算例：商品代金300万円・Seaの場合</h3>
            <p lang="en">Example: JPY 3,000,000 Product Value / Sea Freight</p>
          </header>
          <div className="fee-example__steps">
            <div>
              <span lang="ja">最初の100万円</span>
              <small lang="en">First JPY 1,000,000</small>
              <strong>JPY 1,000,000 × 7% = JPY 70,000</strong>
            </div>
            <b aria-hidden="true">＋</b>
            <div>
              <span lang="ja">100万円を超え300万円までの200万円</span>
              <small lang="en">Next JPY 2,000,000</small>
              <strong>JPY 2,000,000 × 6.5% = JPY 130,000</strong>
            </div>
            <b aria-hidden="true">＝</b>
            <div className="fee-example__total">
              <span lang="ja">手配手数料 合計</span>
              <small lang="en">Total Handling Fee</small>
              <strong>JPY 200,000</strong>
            </div>
          </div>
          <div className="fee-example__note">
            <p lang="ja">
              「300万円 × 6.5% ＝ 195,000円」ではありません。商品代金を金額帯ごとに分けて計算するため、手配手数料は200,000円となります。
            </p>
            <p lang="en">
              The 6.5% rate is not applied to the full JPY 3,000,000 product value. Because each tier is calculated separately, the total handling fee is JPY 200,000.
            </p>
          </div>
        </article>

        <HandlingFeeCalculator />

        <div className="pricing-method-heading">
          <span>Minimum Fees & Use Cases</span>
          <h3 lang="ja">最低手数料・配送方法の目安</h3>
        </div>
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article className="pricing-card" key={plan.label}>
              <span className="pricing-card__label">{plan.label}</span>
              <h2>{plan.title}</h2>
              <div className="pricing-card-info">
                <p>
                  <span>Minimum Fee</span>
                  <strong>{formatJpy(plan.minimumFee)}</strong>
                </p>
                <p>
                  <span>Use Case</span>
                  <strong>
                    <span lang="ja">{plan.use}</span>
                    <small lang="en">{plan.useEn}</small>
                  </strong>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-payment">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Payment</span>
          </div>
          <h2 lang="ja">お支払い方法</h2>
          <p className="pricing-payment-subtitle" lang="en">Payment Method & Terms</p>
          <p lang="ja">
            正式見積り・請求書に基づき、支払い方法、支払期日、銀行手数料の扱いを案件ごとに確認します。
          </p>
          <p lang="en">
            Detailed payment instructions, the payment due date, and the handling of bank charges will be provided with the formal quotation or invoice.
          </p>
        </div>
        <div className="payment-card">
          {paymentItems.map((item) => (
            <div className="payment-card__item" key={item.ja}>
              <p lang="ja">{item.ja}</p>
              <p lang="en">{item.en}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing-wise-notice" aria-labelledby="wise-payment-title" data-no-translate>
        <div className="pricing-wise-notice__inner">
          <div>
            <span className="pricing-wise-notice__label">WISE</span>
            <h2 id="wise-payment-title" lang="ja">Wiseを利用した請求・お支払い案内</h2>
            <p lang="ja">
              YUKIMICHIでは、正式見積り・請求内容の確定後、Wiseを利用した請求・お支払い案内に対応しています。
              請求リンク、送金手数料などの詳細は、案件ごとにご案内します。
            </p>
            <p lang="en">
              After the quotation and billing details are confirmed, YUKIMICHI can provide a Wise payment request or payment instructions.
              Payment links, transfer fees, and other details are confirmed case by case.
            </p>
          </div>
          <a href="https://wise.com/home" target="_blank" rel="noopener noreferrer">
            <span lang="ja">Wise公式サイト</span>
            <span lang="en">Visit Wise</span>
          </a>
        </div>
      </section>

      <section className="pricing-optional-services">
        <div className="pricing-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Optional Service Fees</span>
          </div>
          <h2 lang="ja">
            YUKIMICHI 追加サービス料金表
            <em>Optional Service Fees</em>
          </h2>
          <p className="pricing-section-subtitle" lang="en">Additional service charges</p>
          <p lang="ja">
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
              <span role="cell" data-label="サービス">
                <span className="optional-fee-service-ja" lang="ja">{fee.service}</span>
                <span className="optional-fee-service-en" lang="en">{fee.en}</span>
              </span>
              <span role="cell" data-label="料金扱い">{fee.type}</span>
              <strong role="cell" data-label="目安">{fee.guide}</strong>
            </div>
          ))}
        </div>

        <div className="optional-service-copy">
          <p lang="ja">
            商品写真撮影、外箱・ラベル撮影、JANコード・成分表示確認、簡易検品、梱包前後の写真撮影、SDS/MSDS取得サポート、メーカー資料取得代行、特殊梱包、再梱包、分納、複数配送先対応、価格交渉・長期商談代行等は、作業内容に応じて別途お見積りとなります。
          </p>
          <p lang="en">
            Product photography, label checks, JAN or ingredient checks, simple inspection, SDS/MSDS support, supplier document collection, special packing, repacking, split shipments, multiple destinations, and extended negotiation support may be quoted separately depending on the work required.
          </p>
        </div>

        <div className="optional-service-notes">
          <span>Important Notes</span>
          <ul>
            {optionalServiceNotes.map((item) => (
              <li key={item} lang="ja">{item}</li>
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
          <h2 lang="ja">費用の考え方をご案内</h2>
          <p className="pricing-section-subtitle" lang="en">How costs are separated in quotations</p>
          <p lang="ja">
            正式見積りでは、商品代金、手配手数料、国際送料、保険料、その他費用をできるだけ分けて明示します。
          </p>
        </div>
        <div className="fee-basis-grid">
          {feeBasisItems.map((item) => (
            <article className="fee-basis-card" key={item.label}>
              <span>{item.label}</span>
              <h3 lang="ja">{item.title}</h3>
              <p lang="ja">{item.body}</p>
              {item.sub && <p className="fee-basis-card__sub" lang="en">{item.sub}</p>}
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
          <h2 lang="ja">料金に含まれない主な費用</h2>
          <p className="pricing-section-subtitle" lang="en">Main costs not included in the handling fee</p>
          <p lang="ja">
            表示されている手数料は、YUKIMICHIによる日本側の輸出調整・手配支援に対するサービス手数料です。
            以下の費用は、原則として別途実費または個別見積りとなります。
          </p>
          <p lang="en">
            The listed service fees are coordination fees for YUKIMICHI’s export support in Japan.
            The following costs are generally charged separately at actual cost or quoted individually.
          </p>
        </div>
        <div className="excluded-cost-layout">
          <div className="excluded-cost-copy">
            <p lang="ja">
              案件ごとに商品内容、数量、重量、サイズ、仕入先、配送方法、輸入国の規制、配送会社の引受可否が異なるため、最終金額は個別見積りにより確定します。
            </p>
            <p lang="en">
              Final costs depend on the product, quantity, weight, dimensions, supplier conditions, shipping method, import-country regulations, and carrier acceptance. A final quotation will be provided on a case-by-case basis.
            </p>
          </div>
          <ul className="excluded-cost-list">
            {excludedCostItems.map((item) => (
              <li key={item} lang="ja">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pricing-important">
        <div className="pricing-important-inner">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Important Notes / 注意事項</span>
          </div>
          <h2 lang="ja">正式見積り前に確認すること</h2>
          <p className="pricing-section-subtitle" lang="en">Important points before a formal quotation</p>
          <ul>
            {noticeItems.map((item) => (
              <li key={item} lang="ja">{item}</li>
            ))}
          </ul>
          <p lang="ja">
            詳細な条件は
            <Link href="/terms"> 取引条件 </Link>
            と
            <Link href="/restricted"> 禁止・制限品目 </Link>
            をご確認ください。内容品の虚偽申告、規制逃れ、配送会社の引受条件に反する手配は行いません。
          </p>
          <p lang="en">
            Please review the terms of transaction and restricted items pages for detailed conditions. We do not support false declarations, attempts to avoid regulations, or arrangements that conflict with carrier acceptance rules.
          </p>
        </div>
      </section>

      <section className="pricing-cta">
        <div>
          <span>Request a Quote</span>
          <h2 lang="ja">料金を確認して相談する</h2>
          <p className="pricing-section-subtitle" lang="en">Request a quotation with product and destination details</p>
          <p lang="ja">
            商品URL、数量、配送先国、希望配送方法を添えてご相談ください。YUKIMICHIが商品代金・手配手数料・実費項目を分けて整理します。
          </p>
          <p lang="en">
            Please share the product URL, quantity, destination country, and preferred shipping method. We will provide a clear breakdown of the product cost, handling fee, and separately charged expenses.
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

        .pricing-section-head .pricing-section-subtitle,
        .pricing-important .pricing-section-subtitle,
        .pricing-cta .pricing-section-subtitle {
          color: var(--gold);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: 17px;
          font-style: italic;
          letter-spacing: 0.04em;
          line-height: 1.5;
          margin: -4px 0 14px;
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

        .pricing-tier-table-wrap {
          border: 1px solid rgba(201,168,76,0.2);
          background: rgba(7,17,31,0.72);
          margin-bottom: 22px;
          overflow-x: auto;
          overscroll-behavior-inline: contain;
          scrollbar-color: rgba(201,168,76,0.48) rgba(7,17,31,0.72);
        }

        .pricing-tier-table-wrap:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 4px;
        }

        .pricing-tier-table {
          border-collapse: collapse;
          min-width: 940px;
          table-layout: fixed;
          width: 100%;
        }

        .pricing-tier-table caption {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.22em;
          padding: 16px 18px;
          text-align: left;
          text-transform: uppercase;
        }

        .pricing-tier-table th,
        .pricing-tier-table td {
          border-top: 1px solid rgba(201,168,76,0.12);
          border-right: 1px solid rgba(201,168,76,0.1);
          padding: 16px 18px;
          text-align: center;
          vertical-align: middle;
        }

        .pricing-tier-table th:last-child,
        .pricing-tier-table td:last-child {
          border-right: 0;
        }

        .pricing-tier-table thead th {
          background: rgba(201,168,76,0.09);
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: 19px;
          font-weight: 400;
          line-height: 1.25;
        }

        .pricing-tier-table thead th:first-child,
        .pricing-tier-table tbody th {
          position: sticky;
          left: 0;
          text-align: left;
          width: 268px;
          z-index: 1;
        }

        .pricing-tier-table thead th:first-child {
          background: #17243a;
          z-index: 2;
        }

        .pricing-tier-table tbody th {
          background: #0d1c35;
          box-shadow: 10px 0 18px rgba(0,0,0,0.12);
          color: var(--washi);
          font-size: 14px;
          font-weight: 400;
          line-height: 1.6;
        }

        .pricing-tier-table th span,
        .pricing-tier-table th small {
          display: block;
        }

        .pricing-tier-table th small {
          color: rgba(248,245,239,0.48);
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 10.5px;
          font-weight: 300;
          letter-spacing: 0.025em;
          line-height: 1.55;
          margin-top: 5px;
        }

        .pricing-tier-table td {
          color: var(--gold-light);
          font-family: 'Cormorant Garamond', serif;
          font-size: 25px;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        .pricing-tier-table tbody tr:hover td,
        .pricing-tier-table tbody tr:hover th {
          background-color: rgba(201,168,76,0.08);
        }

        .progressive-fee-summary {
          border: 1px solid rgba(201,168,76,0.34);
          background:
            linear-gradient(120deg, rgba(201,168,76,0.09), transparent 58%),
            rgba(13,28,53,0.88);
          padding: clamp(22px, 3vw, 32px);
        }

        .progressive-fee-summary p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.035em;
          line-height: 1.9;
          margin: 0;
        }

        .progressive-fee-summary p strong {
          color: var(--washi);
          font-size: 14px;
          font-weight: 500;
        }

        .progressive-fee-summary p[lang='en'] {
          color: rgba(248,245,239,0.55);
          font-size: 12.5px;
          margin-top: 5px;
        }

        .progressive-fee-summary__formula {
          align-items: center;
          border-top: 1px solid rgba(201,168,76,0.18);
          color: var(--washi);
          display: grid;
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(17px, 2vw, 23px);
          gap: 12px;
          grid-template-columns: max-content auto max-content auto max-content;
          justify-content: center;
          margin-top: 20px;
          padding-top: 20px;
        }

        .progressive-fee-summary__formula b {
          color: rgba(201,168,76,0.64);
          font-weight: 300;
        }

        .progressive-fee-summary__formula strong {
          color: var(--gold-light);
          font-size: 1.16em;
          font-weight: 500;
        }

        .fee-calculation-copy {
          border-left: 1px solid rgba(201,168,76,0.32);
          display: grid;
          gap: clamp(24px, 4vw, 48px);
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin: clamp(32px, 5vw, 52px) 0 24px;
          padding-left: clamp(20px, 3vw, 32px);
        }

        .fee-calculation-copy__label {
          color: var(--gold);
          display: block;
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: 22px;
          letter-spacing: 0.03em;
          margin-bottom: 10px;
        }

        .fee-calculation-copy p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.035em;
          line-height: 2;
          margin: 0;
        }

        .fee-calculation-copy p[lang='en'] {
          color: rgba(248,245,239,0.58);
        }

        .fee-example {
          border: 1px solid rgba(201,168,76,0.22);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.15), transparent 46%),
            rgba(7,17,31,0.78);
          padding: clamp(24px, 4vw, 42px);
        }

        .fee-example header > span,
        .pricing-method-heading > span {
          color: var(--gold);
          display: block;
          font-size: 10px;
          letter-spacing: 0.24em;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .fee-example h3,
        .pricing-method-heading h3 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(24px, 3.3vw, 38px);
          font-weight: 300;
          line-height: 1.4;
          margin: 0;
        }

        .fee-example header p {
          color: rgba(248,245,239,0.55);
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-style: italic;
          letter-spacing: 0.035em;
          margin: 4px 0 0;
        }

        .fee-example__steps {
          align-items: stretch;
          display: grid;
          gap: 14px;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(190px, 0.72fr);
          margin-top: 26px;
        }

        .fee-example__steps > div {
          border: 1px solid rgba(201,168,76,0.14);
          background: rgba(13,28,53,0.78);
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 128px;
          padding: 20px;
        }

        .fee-example__steps > b {
          align-self: center;
          color: rgba(201,168,76,0.72);
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 300;
        }

        .fee-example__steps span,
        .fee-example__steps small {
          color: var(--washi-dim);
          display: block;
          font-size: 12px;
          font-weight: 300;
          line-height: 1.7;
        }

        .fee-example__steps small {
          color: rgba(248,245,239,0.46);
          margin-top: 2px;
        }

        .fee-example__steps strong {
          color: var(--washi);
          display: block;
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(16px, 1.8vw, 20px);
          font-weight: 400;
          line-height: 1.45;
          margin-top: 12px;
        }

        .fee-example__steps .fee-example__total {
          border-color: rgba(201,168,76,0.38);
          background: rgba(201,168,76,0.09);
        }

        .fee-example__total strong {
          color: var(--gold-light);
          font-size: clamp(24px, 2.8vw, 34px);
        }

        .fee-example__note {
          border-top: 1px solid rgba(201,168,76,0.16);
          margin-top: 24px;
          padding-top: 20px;
        }

        .fee-example__note p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.035em;
          line-height: 1.9;
          margin: 0;
        }

        .fee-example__note p[lang='en'] {
          color: rgba(248,245,239,0.52);
          font-size: 12.5px;
          margin-top: 6px;
        }

        .handling-fee-calculator {
          border: 1px solid rgba(201,168,76,0.3);
          background:
            radial-gradient(circle at 88% 8%, rgba(201,168,76,0.1), transparent 28%),
            linear-gradient(145deg, rgba(13,28,53,0.96), rgba(7,17,31,0.96));
          box-shadow: 0 26px 70px rgba(0,0,0,0.22);
          margin-top: clamp(42px, 6vw, 68px);
          padding: clamp(24px, 4.5vw, 52px);
        }

        .handling-fee-calculator__header > span {
          color: var(--gold);
          display: block;
          font-size: 10px;
          letter-spacing: 0.24em;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .handling-fee-calculator__header h3 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 300;
          line-height: 1.35;
          margin: 0;
        }

        .handling-fee-calculator__header p {
          color: rgba(248,245,239,0.54);
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-style: italic;
          letter-spacing: 0.035em;
          margin: 5px 0 0;
        }

        .handling-fee-calculator__form {
          align-items: end;
          border-top: 1px solid rgba(201,168,76,0.16);
          display: grid;
          gap: 20px;
          grid-template-columns: minmax(0, 1fr) minmax(240px, 0.72fr) auto;
          margin-top: 30px;
          padding-top: 30px;
        }

        .handling-fee-calculator__field {
          min-width: 0;
        }

        .handling-fee-calculator__field label {
          color: var(--washi);
          display: block;
          font-size: 13px;
          letter-spacing: 0.05em;
          margin-bottom: 9px;
        }

        .handling-fee-calculator__field label span,
        .handling-fee-calculator__field label small {
          display: block;
        }

        .handling-fee-calculator__field label small {
          color: rgba(248,245,239,0.5);
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.09em;
          margin-top: 3px;
          text-transform: uppercase;
        }

        .handling-fee-calculator__field > small {
          color: rgba(248,245,239,0.42);
          display: block;
          font-size: 10.5px;
          letter-spacing: 0.03em;
          line-height: 1.5;
          margin-top: 7px;
        }

        .handling-fee-calculator__input-wrap {
          align-items: center;
          background: rgba(248,245,239,0.96);
          border: 1px solid rgba(201,168,76,0.4);
          display: flex;
          min-height: 58px;
        }

        .handling-fee-calculator__input-wrap > span {
          border-right: 1px solid rgba(10,31,56,0.14);
          color: #7b6326;
          flex: 0 0 auto;
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          letter-spacing: 0.08em;
          padding: 0 16px;
        }

        .handling-fee-calculator input,
        .handling-fee-calculator select {
          border: 1px solid rgba(201,168,76,0.4);
          border-radius: 0;
          color: #0a1f38;
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 16px;
          min-height: 58px;
          outline: none;
          width: 100%;
        }

        .handling-fee-calculator input {
          background: transparent;
          border: 0;
          font-size: clamp(18px, 2.2vw, 24px);
          font-variant-numeric: tabular-nums;
          padding: 12px 16px;
        }

        .handling-fee-calculator select {
          appearance: auto;
          background: rgba(248,245,239,0.96);
          padding: 12px 14px;
        }

        .handling-fee-calculator input:focus-visible,
        .handling-fee-calculator select:focus-visible,
        .handling-fee-calculator__submit:focus-visible,
        .handling-fee-result__cta:focus-visible {
          outline: 2px solid var(--gold-light);
          outline-offset: 3px;
        }

        .handling-fee-calculator input[aria-invalid='true'] {
          box-shadow: inset 0 0 0 2px rgba(174,63,79,0.7);
        }

        .handling-fee-calculator__submit,
        .handling-fee-result__cta {
          align-items: center;
          background: var(--gold);
          border: 1px solid var(--gold);
          color: var(--navy-deep);
          cursor: pointer;
          display: inline-grid;
          font-family: 'Noto Sans JP', sans-serif;
          grid-template-columns: 1fr auto;
          min-height: 58px;
          min-width: 190px;
          padding: 11px 18px;
          text-align: left;
          text-decoration: none;
        }

        .handling-fee-calculator__submit span,
        .handling-fee-calculator__submit small,
        .handling-fee-result__cta span,
        .handling-fee-result__cta small {
          display: block;
          grid-column: 1;
        }

        .handling-fee-calculator__submit span,
        .handling-fee-result__cta span {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
        }

        .handling-fee-calculator__submit small,
        .handling-fee-result__cta small {
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.13em;
          margin-top: 3px;
          text-transform: uppercase;
        }

        .handling-fee-calculator__submit svg,
        .handling-fee-result__cta svg {
          grid-column: 2;
          grid-row: 1 / span 2;
          margin-left: 14px;
        }

        .handling-fee-calculator__error {
          color: #f2b7bf;
          font-size: 12.5px;
          grid-column: 1 / -1;
          line-height: 1.7;
          margin: -6px 0 0;
        }

        .handling-fee-result {
          border-top: 1px solid rgba(201,168,76,0.2);
          margin-top: 34px;
          padding-top: 34px;
        }

        .handling-fee-result__summary {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .handling-fee-result__summary > div {
          background: rgba(248,245,239,0.04);
          border: 1px solid rgba(201,168,76,0.13);
          padding: 18px 20px;
        }

        .handling-fee-result__summary span,
        .handling-fee-result__effective-rate span {
          color: rgba(248,245,239,0.5);
          display: block;
          font-size: 10px;
          letter-spacing: 0.11em;
          line-height: 1.5;
          text-transform: uppercase;
        }

        .handling-fee-result__summary strong {
          color: var(--washi);
          display: block;
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 400;
          line-height: 1.35;
          margin-top: 5px;
          overflow-wrap: anywhere;
        }

        .handling-fee-result__breakdown {
          margin-top: 28px;
        }

        .handling-fee-result__breakdown h4 {
          color: var(--gold);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: 22px;
          font-weight: 400;
          letter-spacing: 0.03em;
          margin: 0 0 14px;
        }

        .handling-fee-result__breakdown h4 small {
          color: rgba(248,245,239,0.52);
          font-size: 0.68em;
          font-weight: 300;
        }

        .handling-fee-result__breakdown > div {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .handling-fee-result__breakdown article {
          border-left: 1px solid rgba(201,168,76,0.3);
          min-width: 0;
          padding: 14px 16px;
        }

        .handling-fee-result__breakdown article > span {
          color: rgba(248,245,239,0.48);
          display: block;
          font-size: 10px;
          letter-spacing: 0.04em;
          line-height: 1.5;
        }

        .handling-fee-result__breakdown article p {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(16px, 1.8vw, 20px);
          line-height: 1.4;
          margin: 8px 0 0;
          overflow-wrap: anywhere;
        }

        .handling-fee-result__breakdown article strong {
          color: var(--gold-light);
          display: block;
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(18px, 2vw, 23px);
          font-weight: 400;
          line-height: 1.4;
          margin-top: 4px;
          overflow-wrap: anywhere;
        }

        .handling-fee-result__total {
          align-items: center;
          background: rgba(201,168,76,0.09);
          border: 1px solid rgba(201,168,76,0.36);
          display: flex;
          gap: 24px;
          justify-content: space-between;
          margin-top: 26px;
          padding: clamp(22px, 3vw, 32px);
        }

        .handling-fee-result__total span,
        .handling-fee-result__total small {
          color: var(--washi);
          display: block;
          font-size: 13px;
          letter-spacing: 0.05em;
        }

        .handling-fee-result__total small {
          color: rgba(248,245,239,0.5);
          font-size: 10px;
          margin-top: 4px;
          text-transform: uppercase;
        }

        .handling-fee-result__total > strong {
          color: var(--gold-light);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 400;
          line-height: 1;
          overflow-wrap: anywhere;
          text-align: right;
        }

        .handling-fee-result__effective-rate {
          align-items: center;
          border-bottom: 1px solid rgba(201,168,76,0.14);
          display: flex;
          justify-content: space-between;
          padding: 18px 4px;
        }

        .handling-fee-result__effective-rate strong {
          color: var(--washi);
          font-family: 'Cormorant Garamond', serif;
          font-size: 27px;
          font-weight: 400;
        }

        .handling-fee-result__minimum-note {
          background: rgba(201,168,76,0.08);
          border-left: 2px solid var(--gold);
          color: var(--washi-dim);
          display: flex;
          flex-direction: column;
          font-size: 12px;
          line-height: 1.7;
          margin: 18px 0 0;
          padding: 13px 16px;
        }

        .handling-fee-result__minimum-note strong {
          color: var(--washi);
          font-weight: 500;
        }

        .handling-fee-result__minimum-note span {
          color: rgba(248,245,239,0.5);
        }

        .handling-fee-result__notice {
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin-top: 26px;
        }

        .handling-fee-result__notice p {
          color: var(--washi-dim);
          font-size: 11.5px;
          letter-spacing: 0.025em;
          line-height: 1.9;
          margin: 0;
        }

        .handling-fee-result__notice p[lang='en'] {
          color: rgba(248,245,239,0.48);
        }

        .handling-fee-result__cta {
          margin-top: 26px;
          max-width: 290px;
        }

        .pricing-method-heading {
          margin: clamp(42px, 6vw, 68px) 0 24px;
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

        .optional-fee-service-ja,
        .optional-fee-service-en {
          display: block;
        }

        .optional-fee-service-ja {
          color: var(--washi);
        }

        .optional-fee-service-en {
          color: rgba(248,245,239,0.52);
          font-size: 12px;
          letter-spacing: 0.035em;
          line-height: 1.7;
          margin-top: 3px;
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
          min-height: 300px;
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
          min-height: 78px;
          letter-spacing: 0;
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

        .pricing-card-info strong {
          color: var(--washi-dim);
          display: block;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.04em;
          line-height: 1.9;
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
          align-items: start;
          background: #07111f;
          border-top: 1px solid rgba(198,165,92,0.22);
          border-bottom: 1px solid rgba(198,165,92,0.22);
        }

        .pricing-card-info strong > span,
        .pricing-card-info strong > small {
          display: block;
        }

        .pricing-card-info strong > small {
          color: rgba(248,245,239,0.5);
          font-size: 11.5px;
          line-height: 1.7;
          margin-top: 4px;
        }

        .pricing-wise-notice {
          background: #0a1626;
          border-bottom: 1px solid rgba(198,165,92,0.22);
          padding: clamp(30px, 4vw, 48px) var(--gutter);
        }

        .pricing-wise-notice__inner {
          align-items: center;
          display: grid;
          gap: clamp(24px, 4vw, 56px);
          grid-template-columns: minmax(0, 1fr) auto;
          margin: 0 auto;
          max-width: 1180px;
        }

        .pricing-wise-notice__label {
          color: #9fe870;
          display: block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          margin-bottom: 9px;
        }

        .pricing-wise-notice h2 {
          color: #e8eef6;
          font-size: clamp(20px, 2.2vw, 28px);
          margin: 0 0 12px;
        }

        .pricing-wise-notice p {
          color: #d7dee8;
          font-size: 14px;
          letter-spacing: 0.02em;
          line-height: 1.85;
          margin: 0;
          max-width: 780px;
        }

        .pricing-wise-notice p[lang='en'] {
          color: #8f9baa;
          font-size: 12.5px;
          margin-top: 8px;
        }

        .pricing-wise-notice a {
          align-items: center;
          border: 1px solid rgba(159,232,112,0.6);
          color: #dfffd1;
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          justify-content: center;
          min-height: 54px;
          min-width: 154px;
          padding: 10px 18px;
          text-decoration: none;
          transition: background 180ms ease, border-color 180ms ease, color 180ms ease;
        }

        .pricing-wise-notice a:hover {
          background: rgba(159,232,112,0.1);
          border-color: #9fe870;
          color: #ffffff;
        }

        .pricing-wise-notice a span[lang='ja'] {
          font-size: 13px;
          font-weight: 600;
        }

        .pricing-wise-notice a span[lang='en'] {
          color: #9fe870;
          font-size: 10px;
          letter-spacing: 0.04em;
        }

        .optional-service-copy p[lang='en'],
        .pricing-important p[lang='en'],
        .pricing-cta p[lang='en'] {
          color: rgba(248, 245, 239, 0.55);
          font-size: 12.5px;
          line-height: 1.85;
          margin-top: 8px;
        }

        .pricing-payment > div:first-child {
          max-width: 460px;
          padding-top: 8px;
        }

        .pricing-payment .section-label {
          margin-bottom: 20px;
        }

        .pricing-payment .section-label-line {
          background: rgba(198,165,92,0.78);
        }

        .pricing-payment .section-label-text {
          color: #d6b76a;
        }

        .pricing-payment h2 {
          color: #e8eef6;
          margin-bottom: 6px;
        }

        .pricing-payment-subtitle {
          color: #c6a55c;
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: 18px;
          font-style: italic;
          letter-spacing: 0.04em;
          line-height: 1.5;
          margin-bottom: 18px;
        }

        .pricing-payment > div:first-child > p {
          color: #aab4c2;
          font-size: 14px;
          letter-spacing: 0.025em;
          line-height: 1.9;
          margin: 0;
        }

        .pricing-payment > div:first-child > p + p {
          margin-top: 10px;
        }

        .pricing-payment > div:first-child > p[lang='ja'] {
          color: #e8eef6;
          font-weight: 500;
        }

        .pricing-payment > div:first-child > p[lang='en'] {
          color: #aab4c2;
          font-size: 13px;
          letter-spacing: 0.015em;
        }

        .payment-card {
          border: 1px solid rgba(198,165,92,0.35);
          border-radius: 2px;
          background: #0f1b2d;
          box-shadow: 0 24px 80px rgba(0,0,0,0.28);
          padding: clamp(26px, 4vw, 42px);
        }

        .payment-card__item {
          border-bottom: 1px solid rgba(198,165,92,0.2);
          padding: 0 0 18px;
        }

        .payment-card__item + .payment-card__item {
          margin-top: 20px;
        }

        .payment-card__item:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }

        .payment-card p {
          color: #e8eef6;
          line-height: 1.9;
          padding: 0;
        }

        .payment-card p[lang='ja'] {
          font-size: 14.5px;
          font-weight: 500;
          letter-spacing: 0.025em;
        }

        .payment-card p[lang='en'] {
          color: #aab4c2;
          font-size: 13.5px;
          letter-spacing: 0.015em;
          margin-top: 7px;
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
          .fee-calculation-copy {
            grid-template-columns: 1fr;
          }

          .fee-example__steps {
            grid-template-columns: 1fr;
          }

          .fee-example__steps > b {
            line-height: 1;
          }

          .handling-fee-calculator__form {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .handling-fee-calculator__submit {
            grid-column: 1 / -1;
            max-width: 240px;
          }

          .handling-fee-result__breakdown > div {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .pricing-payment {
            grid-template-columns: 1fr;
          }

          .pricing-wise-notice__inner {
            align-items: start;
            grid-template-columns: 1fr;
          }

          .pricing-wise-notice a {
            min-width: 0;
            width: 100%;
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
          .pricing-tier-table {
            min-width: 800px;
          }

          .pricing-tier-table thead th:first-child,
          .pricing-tier-table tbody th {
            width: 210px;
          }

          .progressive-fee-summary__formula {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .fee-calculation-copy {
            border-left: 0;
            padding-left: 0;
          }

          .handling-fee-calculator {
            margin-left: calc(var(--gutter) * -0.35);
            margin-right: calc(var(--gutter) * -0.35);
            padding: 26px 20px;
          }

          .handling-fee-calculator__form,
          .handling-fee-result__summary,
          .handling-fee-result__breakdown > div,
          .handling-fee-result__notice {
            grid-template-columns: 1fr;
          }

          .handling-fee-calculator__submit {
            max-width: none;
            width: 100%;
          }

          .handling-fee-calculator__input-wrap,
          .handling-fee-calculator input,
          .handling-fee-calculator select {
            min-height: 60px;
          }

          .handling-fee-result__breakdown article {
            padding: 12px 14px;
          }

          .handling-fee-result__total {
            align-items: flex-start;
            flex-direction: column;
          }

          .handling-fee-result__total > strong {
            max-width: 100%;
            text-align: left;
          }

          .handling-fee-result__effective-rate {
            align-items: flex-start;
            flex-direction: column;
            gap: 5px;
          }

          .handling-fee-result__cta {
            max-width: none;
            width: 100%;
          }

          .pricing-payment {
            gap: 24px;
            padding-top: 64px;
            padding-bottom: 64px;
          }

          .payment-card {
            padding: 24px 20px;
          }

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
