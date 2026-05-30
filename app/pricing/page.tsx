import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '料金表 | YUKIMICHI - SNOWPATH JAPAN',
  description:
    'YUKIMICHIの料金表。Express、Air Freight、Sea Freightの基本体系、手配手数料、最低手数料、国際送料、関税・VAT/GST、保険、梱包、規制確認費用について。',
}

const pricingPlans = [
  {
    label: 'Express',
    title: 'International Express',
    fee: '15%',
    minimum: 'Minimum 10,000 JPY',
    target: 'EMS / DHL / FedEx / UPS / ヤマト国際宅急便',
    use: '小口発送、サンプル、短納期、海外バイヤー向けの少量発送',
  },
  {
    label: 'Air Freight',
    title: 'Air Cargo',
    fee: '10%',
    minimum: 'Minimum 30,000 JPY',
    target: '航空貨物',
    use: '緊急輸送、高付加価値商品、一定数量以上の航空輸送',
  },
  {
    label: 'Sea Freight',
    title: 'Sea Cargo',
    fee: '7%',
    minimum: 'Minimum 30,000 JPY',
    target: 'FCL / LCL',
    use: '大型貨物、大量輸送、継続出荷、コスト重視の輸送',
  },
]

const costFactors = [
  '商品代金',
  '数量',
  'サイズ・重量',
  '容積重量',
  '配送先国・都市',
  '希望納期',
  '配送方法',
  '梱包難易度',
  '保険の有無',
  '規制確認の有無',
  '危険品・電池・液体・食品・化粧品等の確認',
  '通関条件',
  '輸入国側の税金・手数料',
]

const additionalCosts = [
  '国際送料',
  '商品代金',
  '国内送料',
  '梱包費',
  '検品費',
  '保険料',
  '関税',
  'VAT / GST',
  '輸入消費税',
  '通関手数料',
  '倉庫料',
  '保管料',
  '港湾費用',
  '規制確認費用',
  '証明書取得費用',
  '返品・再発送費用',
  'キャンセル関連費用',
]

const shippingLogic = [
  {
    name: 'Express',
    target: 'EMS / DHL / FedEx / UPS / ヤマト国際宅急便',
    points: ['速い', '小口に向く', 'サイズ・重量制限に注意', '内容品により引受不可の場合あり'],
  },
  {
    name: 'Air Freight',
    target: '航空貨物',
    points: ['スピード重視', '高付加価値商品に向く', '電池、液体、スプレー、危険品確認が重要'],
  },
  {
    name: 'Sea Freight',
    target: 'FCL / LCL',
    points: ['コスト重視', '大型貨物・大量輸送向け', '納期は長め', '港湾費用、通関、梱包条件の確認が必要'],
  },
]

const sampleEstimate = [
  ['商品代金', '100,000円'],
  ['手配手数料', '15% / 最低10,000円'],
  ['国際送料', '別途見積'],
  ['梱包費', '必要に応じて'],
  ['保険料', '必要に応じて'],
  ['関税・VAT/GST', '輸入者負担'],
  ['合計', '案件ごとに見積'],
]

const noticeItems = [
  '本ページの料金は基本体系・目安です。',
  '最終料金は個別見積により決定します。',
  '配送会社料金、為替、商品価格、在庫状況、燃油サーチャージ、規制状況により金額が変動する場合があります。',
  '見積有効期限を設ける場合があります。',
  '個別の取引条件は見積書、請求書、メールでの合意内容が優先される場合があります。',
  '輸出入可否、関税、危険品判定、配送会社の引受可否などの最終判断は、税関・通関業者・配送会社・公的機関等の確認を前提とします。',
]

const relatedLinks = [
  { href: '/quote', label: 'お見積り', en: 'Quote Request' },
  { href: '/contact', label: 'お問い合わせ', en: 'Contact' },
  { href: '/terms', label: '取引条件', en: 'Terms of Transaction' },
  { href: '/restricted', label: '禁止・制限品目', en: 'Restricted Items' },
  { href: '/faq', label: 'FAQ', en: 'Frequently Asked Questions' },
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
          料金表
          <br />
          <em>Transparent Pricing for Export Support</em>
        </h1>
        <p className="section-body pricing-lead">
          YUKIMICHIでは、商品調達、国際宅配便、航空貨物、海上輸送の内容に応じて、分かりやすい料金体系を提示します。
          最終料金は、商品内容・配送先国・数量・サイズ・重量・配送方法により変動します。
        </p>
        <div className="pricing-hero-actions">
          <Link href="/quote" className="btn-primary">
            お見積りへ進む <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            お問い合わせ <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="pricing-plans">
        <div className="pricing-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Handling Fee</span>
          </div>
          <h2>手配手数料の基本体系</h2>
          <p>
            以下は手配手数料の基本体系です。商品代金、国際送料、関税・VAT/GST、保険、梱包、規制確認、その他実費は別途となる場合があります。
          </p>
        </div>

        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article className="pricing-card" key={plan.label}>
              <span className="pricing-card__label">{plan.label}</span>
              <h2>{plan.title}</h2>
              <div className="pricing-rate">
                {plan.fee}
                <small>of product value</small>
              </div>
              <p className="pricing-minimum">{plan.minimum}</p>
              <div className="pricing-divider" />
              <p className="pricing-target">{plan.target}</p>
              <p className="pricing-use">{plan.use}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-benefit">
        <div>
          <span>First Month Benefit</span>
          <h2>初回手配手数料無料</h2>
        </div>
        <div className="pricing-benefit-card">
          <p>
            新規のお客様は、初月の手配手数料を無料でご案内します。まずは小ロット、サンプル、初回輸出案件からご相談ください。
          </p>
          <p>
            国際送料、商品代金、梱包費、保険料、関税、VAT/GST、規制確認費用、その他実費は別途となります。
          </p>
        </div>
      </section>

      <section className="pricing-factors">
        <div className="pricing-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Cost Factors</span>
          </div>
          <h2>料金が変動する主な要素</h2>
          <p>国際輸出では、商品代金だけでなく、配送先国、重量、通関条件、規制確認の有無などにより総額が変動します。</p>
        </div>
        <div className="pricing-chip-grid">
          {costFactors.map((factor) => (
            <span key={factor}>{factor}</span>
          ))}
        </div>
      </section>

      <section className="pricing-additional">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Additional Costs</span>
          </div>
          <h2>別途費用となる可能性があるもの</h2>
          <p>
            案件により発生する費用は異なります。見積時に確認できる範囲で項目を整理し、必要に応じて個別にご案内します。
          </p>
        </div>
        <ul className="pricing-additional-list">
          {additionalCosts.map((cost) => (
            <li key={cost}>{cost}</li>
          ))}
        </ul>
      </section>

      <section className="pricing-shipping">
        <div className="pricing-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">How We Select Shipping Methods</span>
          </div>
          <h2>輸送方法ごとの考え方</h2>
          <p>納期、費用、サイズ・重量、内容品、配送会社の引受条件を踏まえて、案件ごとに候補を比較します。</p>
        </div>
        <div className="shipping-grid">
          {shippingLogic.map((method) => (
            <article className="shipping-card" key={method.name}>
              <span>{method.name}</span>
              <h3>{method.target}</h3>
              <ul>
                {method.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-sample">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Sample Estimate</span>
          </div>
          <h2>見積例</h2>
          <p>
            これは見積項目の例であり、実際の料金は商品内容・配送先国・配送方法により異なります。
          </p>
        </div>
        <div className="sample-table" role="table" aria-label="Sample estimate">
          {sampleEstimate.map(([label, value]) => (
            <div className="sample-row" role="row" key={label}>
              <span role="cell">{label}</span>
              <strong role="cell">{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing-notes">
        <article>
          <span className="pricing-note-kicker">Duties & Taxes</span>
          <h2>関税・VAT/GSTについて</h2>
          <p>
            輸入国で発生する関税、VAT、GST、輸入消費税、通関手数料等は、原則として輸入者側の負担となります。
            税額・税率・課税判断は輸入国の税関判断により異なります。
          </p>
          <p>
            YUKIMICHIが事前の目安案内を行う場合がありますが、最終金額を保証するものではありません。
          </p>
        </article>

        <article>
          <span className="pricing-note-kicker">Compliance Cost</span>
          <h2>規制確認が必要な商品について</h2>
          <p>
            医薬品、食品、化粧品、電池、危険品、中古品、ブランド品、動植物由来素材などは、
            商品内容・配送先国により確認が必要になる場合があります。
          </p>
          <p>
            必要に応じて、確認作業や追加費用が発生する場合があります。詳細は
            <Link href="/restricted"> 禁止・制限品目 </Link>
            をご確認ください。
          </p>
        </article>
      </section>

      <section className="pricing-important">
        <div className="pricing-important-inner">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Important Notice</span>
          </div>
          <h2>Important Notice</h2>
          <ul>
            {noticeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            詳細な条件は
            <Link href="/terms"> 取引条件 </Link>
            をご確認ください。内容品の虚偽申告、規制逃れ、配送会社の引受条件に反する手配は行いません。
          </p>
        </div>
      </section>

      <section className="pricing-related">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Related Links</span>
          </div>
          <h2>関連ページ</h2>
          <p>見積、問い合わせ、取引条件、禁止・制限品目、よくある質問を各ページで確認できます。</p>
        </div>
        <div className="pricing-related-grid">
          {relatedLinks.map((link) => (
            <Link href={link.href} className="pricing-related-card" key={link.href}>
              <span>{link.en}</span>
              <strong>{link.label}</strong>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>

      <section className="pricing-cta">
        <div>
          <span>Estimate Request</span>
          <h2>料金を確認して相談する</h2>
          <p>
            商品URL、数量、配送先国、希望配送方法を添えてご相談ください。基本体系をもとに、案件ごとの見積をご案内します。
          </p>
          <a href="mailto:exporter@justhen.co.jp" className="pricing-mail">
            exporter@justhen.co.jp へ相談する
          </a>
        </div>
        <div className="pricing-cta-actions">
          <Link href="/quote" className="btn-primary">
            お見積りへ進む <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            お問い合わせ <ArrowRight />
          </Link>
        </div>
      </section>

      <style>{`
        .pricing-hero {
          min-height: 70svh;
          padding: calc(var(--nav-h) + 88px) var(--gutter) 76px;
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
          margin-bottom: 28px;
        }

        .pricing-title em {
          color: var(--gold);
          font-style: italic;
          font-size: 0.68em;
        }

        .pricing-lead {
          max-width: 860px;
        }

        .pricing-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .pricing-plans,
        .pricing-factors,
        .pricing-shipping {
          padding: var(--section-pad) var(--gutter);
          background:
            linear-gradient(180deg, var(--navy-mid) 0%, var(--navy-deep) 100%);
        }

        .pricing-section-head {
          max-width: 920px;
          margin-bottom: 44px;
        }

        .pricing-section-head h2,
        .pricing-additional h2,
        .pricing-sample h2,
        .pricing-important h2,
        .pricing-related h2,
        .pricing-cta h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 300;
          line-height: 1.35;
          margin: 0 0 16px;
        }

        .pricing-section-head p,
        .pricing-additional p,
        .pricing-sample p,
        .pricing-important p,
        .pricing-related p,
        .pricing-cta p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2.1;
          margin: 0;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .pricing-card {
          border: 1px solid rgba(201,168,76,0.16);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.18), transparent 48%),
            rgba(7,17,31,0.84);
          min-height: 420px;
          padding: 30px;
        }

        .pricing-card__label {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.32em;
          margin-bottom: 18px;
          text-transform: uppercase;
        }

        .pricing-card h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 26px;
        }

        .pricing-rate {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(58px, 6vw, 78px);
          font-weight: 300;
          line-height: 0.95;
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

        .pricing-minimum,
        .pricing-target,
        .pricing-use {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 1.9;
          margin: 0;
        }

        .pricing-minimum {
          color: var(--washi);
          margin-top: 22px;
        }

        .pricing-divider {
          height: 1px;
          background: rgba(201,168,76,0.14);
          margin: 24px 0;
        }

        .pricing-target {
          color: var(--gold);
          margin-bottom: 12px;
        }

        .pricing-benefit,
        .pricing-additional,
        .pricing-sample,
        .pricing-related {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(28px, 5vw, 72px);
          background: var(--navy-deep);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .pricing-benefit > div:first-child span,
        .pricing-note-kicker,
        .pricing-cta span {
          color: var(--gold);
          display: block;
          font-size: 10px;
          letter-spacing: 0.32em;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        .pricing-benefit h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(34px, 4.5vw, 58px);
          font-weight: 300;
          line-height: 1.25;
          margin: 0;
        }

        .pricing-benefit-card {
          display: grid;
          gap: 18px;
          border: 1px solid rgba(201,168,76,0.18);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.24), transparent 48%),
            rgba(13,28,53,0.72);
          padding: clamp(26px, 4vw, 42px);
        }

        .pricing-benefit-card p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2.1;
          margin: 0;
        }

        .pricing-chip-grid,
        .pricing-additional-list {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .pricing-chip-grid span,
        .pricing-additional-list li {
          border: 1px solid rgba(201,168,76,0.14);
          background: rgba(7,17,31,0.55);
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.05em;
          line-height: 1.6;
          min-height: 58px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
        }

        .pricing-additional-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .shipping-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .shipping-card {
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(13,28,53,0.92), rgba(7,17,31,0.82));
          min-height: 300px;
          padding: 28px;
        }

        .shipping-card span {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 300;
          line-height: 1;
        }

        .shipping-card h3 {
          color: var(--washi);
          font-size: 15px;
          font-weight: 300;
          letter-spacing: 0.1em;
          line-height: 1.8;
          margin: 24px 0 18px;
        }

        .shipping-card ul,
        .pricing-important ul {
          display: grid;
          gap: 10px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .shipping-card li,
        .pricing-important li {
          border-left: 1px solid rgba(201,168,76,0.34);
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.04em;
          line-height: 1.85;
          padding-left: 12px;
        }

        .sample-table {
          border: 1px solid rgba(201,168,76,0.16);
          background: rgba(13,28,53,0.72);
        }

        .sample-row {
          display: grid;
          grid-template-columns: minmax(160px, 0.75fr) minmax(0, 1.25fr);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }

        .sample-row:last-child {
          border-bottom: 0;
        }

        .sample-row span,
        .sample-row strong {
          color: var(--washi-dim);
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.06em;
          line-height: 1.8;
          padding: 16px 18px;
        }

        .sample-row span {
          color: var(--gold);
          border-right: 1px solid rgba(201,168,76,0.1);
        }

        .sample-row strong {
          color: var(--washi);
        }

        .pricing-notes {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          background: var(--navy-deep);
        }

        .pricing-notes article {
          border: 1px solid rgba(201,168,76,0.16);
          background: rgba(13,28,53,0.72);
          padding: clamp(26px, 4vw, 42px);
        }

        .pricing-notes h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(28px, 3.6vw, 44px);
          font-weight: 300;
          line-height: 1.4;
          margin: 0 0 16px;
        }

        .pricing-notes p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2.1;
          margin: 0;
        }

        .pricing-notes p + p {
          margin-top: 14px;
        }

        .pricing-notes a,
        .pricing-important a {
          color: var(--gold);
          text-decoration: none;
        }

        .pricing-important {
          padding: 0 var(--gutter) var(--section-pad);
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

        .pricing-important p {
          margin-top: 22px;
        }

        .pricing-related {
          background:
            linear-gradient(135deg, rgba(139,30,47,0.18), transparent 48%),
            var(--navy-mid);
        }

        .pricing-related-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .pricing-related-card {
          display: grid;
          gap: 10px;
          min-height: 132px;
          border: 1px solid rgba(201,168,76,0.14);
          background: rgba(7,17,31,0.52);
          color: var(--washi);
          padding: 22px;
          text-decoration: none;
        }

        .pricing-related-card span {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .pricing-related-card strong {
          color: var(--washi);
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0.1em;
          line-height: 1.6;
        }

        .pricing-related-card svg {
          color: var(--gold);
          justify-self: end;
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
          .pricing-grid,
          .shipping-grid,
          .pricing-chip-grid,
          .pricing-additional-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .pricing-benefit,
          .pricing-additional,
          .pricing-sample,
          .pricing-related,
          .pricing-notes {
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
          .shipping-grid,
          .pricing-chip-grid,
          .pricing-additional-list,
          .pricing-related-grid {
            grid-template-columns: 1fr;
          }

          .pricing-card,
          .shipping-card {
            min-height: auto;
          }

          .sample-row {
            grid-template-columns: 1fr;
          }

          .sample-row span {
            border-right: 0;
            border-bottom: 1px solid rgba(201,168,76,0.1);
            padding-bottom: 8px;
          }

          .sample-row strong {
            padding-top: 8px;
          }
        }
      `}</style>
    </>
  )
}
