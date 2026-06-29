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
    enText: 'Please provide the product name, brand, quantity, destination country, intended use, and desired delivery timing. If no product URL is available, we can begin review based on photos or available details.',
  },
  {
    number: '02',
    title: '商品・輸入条件の確認',
    en: 'Product & Import Requirements Review',
    text: '商品カテゴリ、数量、配送先国、用途をもとに、輸出入規制、配送会社の引受条件、輸入者側で確認すべき許可・税金・販売条件を整理します。',
    enText: 'Based on the product category, quantity, destination country, and intended use, we review export/import restrictions, carrier acceptance conditions, and items the importer should confirm, such as permits, taxes, and sales requirements.',
  },
  {
    number: '03',
    title: '仕入先への確認',
    en: 'Supplier Check',
    text: '日本国内の仕入先へ、在庫、価格、MOQ、納期、商品資料、SDS/MSDSの有無などを確認します。仕入先情報の開示可否は案件ごとに確認します。',
    enText: 'We check stock, pricing, MOQ, lead time, product documents, and SDS/MSDS availability with suppliers in Japan. Disclosure of supplier information is reviewed case by case.',
  },
  {
    number: '04',
    title: '見積提示',
    en: 'Quotation',
    text: '商品代金、手配手数料、国際送料、保険料、想定される追加費用を分けて提示します。関税やVAT/GSTは参考確認となり、最終判断は輸入国側での確認が前提です。',
    enText: 'We present product costs, handling fees, international shipping, insurance, and estimated additional costs separately. Duties and VAT/GST are provided for reference, and final confirmation must be made in the importing country.',
  },
  {
    number: '05',
    title: 'お支払い確認',
    en: 'Payment Confirmation',
    text: '正式見積りと条件に合意後、原則としてご入金確認後に商品調達、発注、梱包、配送手配を開始します。支払い条件は案件ごとにメールまたは書面で確認します。',
    enText: 'After the quotation and terms are agreed, procurement, ordering, packing, and shipping arrangements generally begin after payment confirmation. Payment terms are confirmed by email or written notice for each case.',
  },
  {
    number: '06',
    title: '商品調達・国内手配',
    en: 'Procurement & Japan-side Arrangement',
    text: '日本国内の仕入先への発注、商品受領、必要に応じた写真確認、簡易検品、梱包前確認などを進めます。',
    enText: 'We proceed with supplier ordering in Japan, product receipt, photo confirmation, simple inspection, and pre-packing checks as needed.',
  },
  {
    number: '07',
    title: '輸出書類・配送手配',
    en: 'Export Documents & Shipping Arrangement',
    text: 'Commercial Invoice、Packing List等の基本書類を整理し、配送方法に応じてクーリエ、航空貨物、海上輸送等の手配を進めます。',
    enText: 'We organize basic export documents such as the Commercial Invoice and Packing List, and arrange courier, air freight, or sea freight depending on the shipping method.',
  },
  {
    number: '08',
    title: '出荷・追跡情報共有',
    en: 'Shipment & Tracking Information',
    text: '出荷後、追跡番号や配送状況を共有します。配送遅延、税関確認、追加資料依頼が発生した場合は、案件ごとに状況を整理してご連絡します。',
    enText: 'After shipment, we share tracking information and delivery status. If delays, customs checks, or additional document requests occur, we organize and report the situation case by case.',
  },
]

const beginnerCards = [
  {
    step: '01',
    title: 'まず、誰がどこまで負担するかを決めます',
    enTitle: 'Clarify who handles each responsibility',
    text: 'Incoterms® rulesは、売主と買主の間で「費用・手配・リスク」をどこで分けるかを整理するための国際的な貿易条件です。',
    en: 'Incoterms® rules clarify how costs, arrangements, and risks are allocated between sellers and buyers.',
  },
  {
    step: '02',
    title: '次に、日本側で対応できる範囲を確認します',
    enTitle: 'Confirm Japan-side support scope',
    text: 'YUKIMICHIは、仕入先確認、商品調達、梱包準備、輸出書類の作成・確認、配送会社やフォワーダーとの調整を支援します。',
    en: 'YUKIMICHI supports supplier checks, procurement, packing preparation, export document preparation and review, and coordination with carriers or forwarders.',
  },
  {
    step: '03',
    title: '輸入国側の確認事項は買主側で確認します',
    enTitle: 'Importer-side matters must be checked locally',
    text: '輸入許可、通関可否、関税・VAT/GST、現地販売可否、ラベル規制などは、原則として輸入者側で確認が必要です。',
    en: 'Import permits, customs clearance, duties, VAT/GST, local sales eligibility, and labeling rules generally need to be checked by the importer.',
  },
  {
    step: '04',
    title: '最後に、案件ごとに取引条件を確定します',
    enTitle: 'Confirm the final terms case by case',
    text: '最終的な取引条件は、商品内容、輸送方法、仕向国、買主側フォワーダーの有無、保険条件などを確認したうえで決定します。',
    en: 'Final trade terms are confirmed based on the product, shipping method, destination, buyer-side forwarder arrangement, and insurance conditions.',
  },
]

const documentCards = [
  {
    title: 'Commercial Invoice（コマーシャルインボイス）',
    enTitle: 'Commercial Invoice',
    text: '商品名、数量、単価、合計金額、通貨、売主、買主、原産国、取引条件などを記載する基本書類です。',
    en: 'A basic export document showing product description, quantity, unit price, total amount, currency, seller, buyer, country of origin, and shipping terms.',
  },
  {
    title: 'Packing List（パッキングリスト）',
    enTitle: 'Packing List',
    text: '箱数、重量、サイズ、梱包内容など、貨物の梱包情報を整理する書類です。',
    en: 'A document that summarizes packing details such as carton count, weight, dimensions, and package contents.',
  },
  {
    title: '輸出書類の作成・確認サポート',
    enTitle: 'Export Document Preparation and Review',
    text: '買主、仕入先、フォワーダー、関係者から提供された情報をもとに、輸出書類の作成・確認を支援します。必要書類は商品・配送方法・仕向国により異なります。',
    en: 'YUKIMICHI assists with Japan-side export document preparation and review based on information from the buyer, supplier, forwarder, and relevant parties.',
  },
]

const incotermsGroups = [
  {
    title: '全輸送モードで使われる条件',
    enTitle: 'All Transport Modes',
    terms: [
      ['EXW', 'Ex Works', '工場渡し'],
      ['FCA', 'Free Carrier', '運送人渡し'],
      ['CPT', 'Carriage Paid To', '輸送費込'],
      ['CIP', 'Carriage and Insurance Paid To', '輸送費・保険料込'],
      ['DAP', 'Delivered at Place', '仕向地持込渡し'],
      ['DPU', 'Delivered at Place Unloaded', '荷卸込持込渡し'],
      ['DDP', 'Delivered Duty Paid', '関税込持込渡し'],
    ],
  },
  {
    title: '海上・内水路輸送専用の条件',
    enTitle: 'Sea and Inland Waterway Only',
    terms: [
      ['FAS', 'Free Alongside Ship', '船側渡し'],
      ['FOB', 'Free On Board', '本船渡し'],
      ['CFR', 'Cost and Freight', '運賃込'],
      ['CIF', 'Cost, Insurance and Freight', '運賃・保険料込'],
    ],
  },
]

const featuredIncoterms = [
  {
    code: 'FCA',
    name: 'Free Carrier',
    badge: '日本側手配で使いやすい条件',
    enBadge: 'Practical for Japan-side arrangement',
    ja: '日本国内の指定倉庫、港湾倉庫、空港貨物施設、または買主指定フォワーダーへの引き渡しを基準にする条件です。YUKIMICHIでは、仕入先確認、梱包準備、Commercial Invoice・Packing List整理、配送会社・フォワーダーとの確認を案件ごとに支援します。',
    en: 'FCA is practical for Japan-side export arrangements based on delivery to a designated warehouse, port facility, airport cargo terminal, or buyer-nominated forwarder in Japan.',
  },
  {
    code: 'EXW',
    name: 'Ex Works',
    badge: '個別確認が必要な条件',
    enBadge: 'Case-by-case review required',
    ja: 'メーカー、卸、販売店、倉庫などで貨物を引き渡す条件です。ただし、海外向け輸出では、輸出通関、国内輸送、国際輸送手配などが買主側に集中しやすいため、FCAの方が実務上適している場合があります。',
    en: 'EXW means goods are made available at the supplier or warehouse location. For international shipments, FCA may be more practical depending on the project.',
  },
  {
    code: 'FOB',
    name: 'Free On Board',
    badge: '海上輸送向けの条件',
    enBadge: 'For sea freight',
    ja: '東京港、大阪港、横浜港などの指定船積港で、本船上に貨物が積み込まれた時点を基準に、費用負担とリスク移転を整理する条件です。航空貨物、EMS、DHL、FedEx、UPSなどでは、FOBではなくFCA等を確認します。',
    en: 'FOB is used for sea freight. For air cargo and courier shipments such as EMS, DHL, FedEx, and UPS, FCA or other suitable terms should be considered instead.',
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
        <p className="section-body flow-lead" lang="ja">
          お問い合わせから見積、前払い、商品調達、書類整理、国際配送、発送後フォローまで、必要な確認事項を順番に整理して進めます。
          早さだけでなく、輸出入規制・通関・費用項目を事前に確認し、できるだけ分かりやすい手順でご案内します。
        </p>
        <p className="section-body flow-lead flow-lead-en" lang="en">
          We proceed step by step from inquiry and quotation to advance payment, procurement, document review, shipping arrangements, and follow-up.
        </p>
      </section>

      <section className="flow-section">
        <div className="flow-timeline">
          {steps.map((step) => (
            <article className="flow-step" key={step.number}>
              <div className="flow-number">{step.number}</div>
              <div className="flow-content">
                <h2 lang="ja">{step.title}</h2>
                <span lang="en">{step.en}</span>
                <p lang="ja">{step.text}</p>
                <p lang="en">{step.enText}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="flow-incoterms">
        <div className="flow-incoterms-copy">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Trade Terms / Responsibility Scope</span>
          </div>
          <h2 className="section-title">
            取引条件と
            <br />
            <em>責任範囲。</em>
          </h2>
          <p className="flow-subtitle-en">Incoterms® Rules and Export Document Basics</p>
          <div className="flow-main-lead">
            <p lang="ja">
              輸出取引では、「誰が、どこまで、費用・手配・リスクを負担するか」を先に整理することが重要です。
              YUKIMICHIでは、専門用語をそのまま並べるのではなく、日本側で支援できる範囲と、輸入者側で確認が必要な範囲を分けてご案内します。
            </p>
            <p lang="en">
              In export transactions, it is important to clarify who is responsible for each cost, arrangement, and risk. YUKIMICHI explains the Japan-side support scope and importer-side responsibilities in a practical way.
            </p>
          </div>
        </div>

        <div className="flow-incoterms-content">
          <div className="flow-simple-grid">
            {beginnerCards.map((item) => (
              <article className="flow-simple-card" key={item.step}>
                <span className="flow-simple-step">{item.step}</span>
                <h3 lang="ja">{item.title}</h3>
                <small lang="en">{item.enTitle}</small>
                <p lang="ja">{item.text}</p>
                <p lang="en">{item.en}</p>
              </article>
            ))}
          </div>
          <aside className="flow-incoterms-notice">
            <strong lang="ja">重要な確認事項</strong>
            <p lang="ja">
              最終的な輸入可否、税額、通関判断、輸入許可、現地販売可否は、輸入国の税関・通関業者・関係当局・配送会社の判断に従います。YUKIMICHIは日本側の確認と手配を支援しますが、輸入国側の許認可や販売可否を保証するものではありません。
            </p>
            <small lang="en">
              Final import approval, tax amounts, customs decisions, import permits, and local sales eligibility are subject to the decisions of customs authorities, customs brokers, regulatory agencies, and carriers in the destination country.
            </small>
          </aside>
        </div>

        <div className="flow-incoterms-expanded">
          <section className="flow-explain-section">
            <header className="flow-explain-header">
              <span>Export Documents</span>
              <h2 lang="ja">国際輸送でよく使う基本書類</h2>
              <p lang="en">Basic documents commonly used for international shipments.</p>
            </header>
            <div className="flow-document-info" aria-label="Export document preparation and review">
              {documentCards.map((item) => (
                <article className="flow-document-card" key={item.title}>
                  <h3 lang="ja">{item.title}</h3>
                  <span lang="en">{item.enTitle}</span>
                  <p lang="ja">{item.text}</p>
                  <p lang="en">{item.en}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="flow-explain-section">
            <header className="flow-explain-header">
              <span>Incoterms® 2020 Rules</span>
              <h2 lang="ja">Incoterms® 2020 の種類</h2>
              <p lang="en">A simplified list of Incoterms® 2020 rules.</p>
            </header>
            <div className="flow-incoterms-types" aria-label="Incoterms 2020 types">
              {incotermsGroups.map((group) => (
                <article className="flow-incoterms-type-card" key={group.title}>
                  <h3 lang="ja">{group.title}</h3>
                  <span lang="en">{group.enTitle}</span>
                  <dl>
                    {group.terms.map(([code, name, ja]) => (
                      <div key={code}>
                        <dt>{code}</dt>
                        <dd>
                          <strong lang="ja">{ja}</strong>
                          <small lang="en">{name}</small>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <section className="flow-explain-section">
            <header className="flow-explain-header">
              <span>Common Examples</span>
              <h2 lang="ja">実務上よく確認する条件</h2>
              <p lang="en">Common examples reviewed in Japan-side export coordination.</p>
            </header>
            <div className="flow-incoterms-featured">
              {featuredIncoterms.map((term) => (
                <article className="flow-incoterms-featured-card" key={term.code}>
                  <span className="flow-incoterms-badge">
                    {term.badge}
                    <small>{term.enBadge}</small>
                  </span>
                  <h3>
                    {term.code} <small>/ {term.name}</small>
                  </h3>
                  <p lang="ja">{term.ja}</p>
                  <p lang="en">{term.en}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className="flow-incoterms-case-notice">
            <div>
              <span>Case-by-case Confirmation</span>
              <h3 lang="ja">取引条件は案件ごとに確認</h3>
              <p className="flow-card-en-title" lang="en">Trade terms are confirmed case by case.</p>
            </div>
            <div>
              <p lang="ja">
                取引条件は、商品内容、輸送方法、仕向地、買主側フォワーダーの有無、輸出入規制、保険条件により異なります。最終的なIncoterms® ruleは、見積書、Commercial Invoice、Packing List、契約書等で明確に確認したうえで進行します。
              </p>
              <p lang="en">
                Trade terms may vary depending on the product, shipping method, destination, buyer-side forwarder arrangement, export/import regulations, and insurance conditions. The final Incoterms® rule will be confirmed in the quotation, Commercial Invoice, Packing List, contract, or related documents before proceeding.
              </p>
            </div>
          </aside>
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
        <div className="flow-note-copy">
          <p lang="ja">
          見積依頼時には、商品URL、商品名、希望数量、配送先国、希望配送方法、希望納期、法人利用または個人利用の区分をお知らせください。
          情報がそろっているほど、見積、配送方法、輸出入規制の確認をスムーズに進められます。輸出入規制や認証の要否は国や商品により異なるため、最終判断は税関、通関業者、公的機関の確認を前提に進めます。
          </p>
          <p lang="en">
            For quotation requests, please share the product URL, product name, quantity, destination country, preferred shipping method, deadline, and whether the shipment is for business or personal use. More complete information helps us review quotation conditions, shipping methods, and import/export requirements more smoothly.
          </p>
        </div>
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
        .flow-lead {
          max-width: 760px;
          margin-bottom: 10px;
        }
        .flow-lead-en {
          color: rgba(248, 245, 239, 0.58);
          font-size: 12.5px;
          line-height: 1.85;
          margin-bottom: 36px;
        }
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
          margin: -4px 0 10px;
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
        .flow-content p[lang='en'],
        .flow-card-en-title {
          color: rgba(248, 245, 239, 0.5);
          font-size: 12.5px;
          line-height: 1.8;
          letter-spacing: 0.03em;
          margin-top: 6px;
        }
        .flow-incoterms {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
          gap: clamp(28px, 5vw, 72px);
          align-items: start;
          background:
            linear-gradient(135deg, rgba(139,30,47,0.16), transparent 48%),
            var(--navy-mid);
          border-top: 1px solid rgba(201,168,76,0.08);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .flow-subtitle-en {
          color: var(--gold-light);
          font-size: 12px;
          letter-spacing: 0.16em;
          line-height: 1.8;
          text-transform: uppercase;
          margin: 18px 0 0;
        }
        .flow-main-lead {
          display: grid;
          gap: 14px;
          max-width: 620px;
          margin-top: 24px;
        }
        .flow-main-lead p {
          color: var(--washi);
          font-size: 14px;
          letter-spacing: 0.04em;
          line-height: 2.1;
          margin: 0;
        }
        .flow-main-lead p[lang='en'] {
          color: var(--washi-dim);
          font-size: 12.5px;
          border-top: 1px solid rgba(201,168,76,0.12);
          padding-top: 14px;
        }
        .flow-incoterms-content {
          display: grid;
          gap: 16px;
        }
        .flow-simple-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .flow-simple-card {
          position: relative;
          border: 1px solid rgba(201,168,76,0.17);
          background: linear-gradient(145deg, rgba(7,17,31,0.76), rgba(13,28,53,0.58));
          padding: 24px;
          min-width: 0;
        }
        .flow-simple-step {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border: 1px solid rgba(201,168,76,0.36);
          border-radius: 50%;
          color: var(--gold-light);
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          margin-bottom: 16px;
        }
        .flow-simple-card h3 {
          color: var(--washi);
          font-size: 18px;
          font-weight: 400;
          letter-spacing: 0.08em;
          line-height: 1.6;
          margin: 0 0 5px;
        }
        .flow-simple-card small {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.14em;
          line-height: 1.6;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .flow-simple-card p {
          color: var(--washi);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          margin: 0;
        }
        .flow-simple-card p[lang='en'] {
          color: var(--washi-dim);
          font-size: 12px;
          border-top: 1px solid rgba(201,168,76,0.1);
          margin-top: 12px;
          padding-top: 12px;
        }
        .flow-incoterms-notice {
          border: 1px solid rgba(201,168,76,0.2);
          border-left: 3px solid var(--gold);
          background: rgba(201,168,76,0.06);
          padding: 20px 22px;
        }
        .flow-incoterms-notice strong {
          display: block;
          color: var(--gold-light);
          font-size: 13px;
          letter-spacing: 0.12em;
          margin-bottom: 10px;
        }
        .flow-incoterms-notice p,
        .flow-incoterms-notice small {
          color: var(--washi-dim);
          display: block;
          font-size: 12.5px;
          letter-spacing: 0.03em;
          line-height: 1.9;
          margin: 0;
        }
        .flow-incoterms-notice small {
          border-top: 1px solid rgba(201,168,76,0.1);
          margin-top: 12px;
          padding-top: 12px;
        }
        .flow-incoterms-expanded {
          grid-column: 1 / -1;
          display: grid;
          gap: clamp(28px, 4vw, 48px);
          margin-top: clamp(22px, 3vw, 42px);
          padding-top: clamp(28px, 4vw, 52px);
          border-top: 1px solid rgba(201,168,76,0.18);
          min-width: 0;
        }
        .flow-explain-section {
          display: grid;
          gap: 18px;
        }
        .flow-explain-header {
          display: grid;
          gap: 6px;
          max-width: 820px;
        }
        .flow-explain-header span,
        .flow-incoterms-case-notice span {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.28em;
          line-height: 1.6;
          text-transform: uppercase;
        }
        .flow-explain-header h2,
        .flow-incoterms-case-notice h3 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 300;
          line-height: 1.12;
          margin: 0;
        }
        .flow-explain-header p {
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.08em;
          line-height: 1.7;
          margin: 0;
        }
        .flow-document-info {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .flow-document-card {
          border: 1px solid rgba(201,168,76,0.2);
          background: linear-gradient(145deg, rgba(7,17,31,0.72), rgba(13,28,53,0.58));
          padding: clamp(22px, 3vw, 30px);
          min-width: 0;
        }
        .flow-document-card > span {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.18em;
          line-height: 1.6;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .flow-document-card h3 {
          color: var(--washi);
          font-size: 18px;
          font-weight: 400;
          letter-spacing: 0.08em;
          line-height: 1.6;
          margin: 0 0 14px;
        }
        .flow-document-card p {
          color: var(--washi);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          margin: 0;
        }
        .flow-document-card p[lang='en'] {
          color: var(--washi-dim);
          font-size: 12px;
          border-top: 1px solid rgba(201,168,76,0.1);
          margin-top: 12px;
          padding-top: 12px;
        }
        .flow-incoterms-types {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        .flow-incoterms-type-card {
          border: 1px solid rgba(201,168,76,0.18);
          background: rgba(7,17,31,0.58);
          padding: clamp(20px, 3vw, 28px);
          min-width: 0;
        }
        .flow-incoterms-type-card h3 {
          color: var(--washi);
          font-size: 20px;
          font-weight: 400;
          letter-spacing: 0.08em;
          line-height: 1.5;
          margin: 0;
        }
        .flow-incoterms-type-card > span {
          display: block;
          color: var(--gold);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-top: 6px;
        }
        .flow-incoterms-type-card dl {
          display: grid;
          gap: 0;
          margin: 20px 0 0;
        }
        .flow-incoterms-type-card dl > div {
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr);
          gap: 14px;
          align-items: baseline;
          padding: 10px 0;
          border-top: 1px solid rgba(201,168,76,0.1);
        }
        .flow-incoterms-type-card dt {
          color: var(--gold-light);
          font-family: 'Cormorant Garamond', serif;
          font-size: 21px;
        }
        .flow-incoterms-type-card dd {
          display: flex;
          flex-wrap: wrap;
          gap: 5px 10px;
          min-width: 0;
          margin: 0;
        }
        .flow-incoterms-type-card dd strong {
          color: var(--washi);
          font-size: 13px;
          font-weight: 400;
        }
        .flow-incoterms-type-card dd small {
          color: var(--washi-dim);
          font-size: 11.5px;
        }
        .flow-incoterms-featured {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          align-items: stretch;
        }
        .flow-incoterms-featured-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: clamp(20px, 2.5vw, 28px);
          border: 1px solid rgba(201,168,76,0.18);
          background: linear-gradient(145deg, rgba(7,17,31,0.78), rgba(13,28,53,0.62));
        }
        .flow-incoterms-badge {
          align-self: flex-start;
          color: var(--washi);
          border: 1px solid rgba(201,168,76,0.28);
          background: rgba(201,168,76,0.06);
          padding: 8px 10px;
          font-size: 11px;
          letter-spacing: 0.08em;
          line-height: 1.5;
        }
        .flow-incoterms-badge small {
          display: block;
          color: var(--washi-dim);
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-top: 2px;
        }
        .flow-incoterms-featured-card h3 {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3vw, 38px);
          font-weight: 300;
          line-height: 1.1;
          margin: 20px 0 18px;
        }
        .flow-incoterms-featured-card h3 small {
          color: var(--washi);
          font-size: 0.58em;
        }
        .flow-incoterms-featured-card p {
          color: var(--washi);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          margin: 0;
        }
        .flow-incoterms-featured-card p[lang='en'] {
          color: var(--washi-dim);
          font-size: 12px;
          border-top: 1px solid rgba(201,168,76,0.1);
          margin-top: 16px;
          padding-top: 16px;
        }
        .flow-incoterms-case-notice {
          display: grid;
          grid-template-columns: minmax(0, 0.62fr) minmax(0, 1.38fr);
          gap: clamp(24px, 4vw, 60px);
          border: 1px solid rgba(201,168,76,0.28);
          border-left: 3px solid var(--gold);
          background: rgba(201,168,76,0.06);
          padding: clamp(22px, 3vw, 34px);
        }
        .flow-incoterms-case-notice h3 {
          font-size: clamp(26px, 3vw, 36px);
          margin-top: 8px;
        }
        .flow-incoterms-case-notice > div:last-child {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }
        .flow-incoterms-case-notice p {
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.03em;
          line-height: 1.9;
          margin: 0;
          overflow-wrap: anywhere;
        }
        .flow-incoterms-case-notice p + p {
          border-left: 1px solid rgba(201,168,76,0.14);
          padding-left: 22px;
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
        .flow-note-copy {
          display: grid;
          gap: 10px;
        }
        .flow-note-copy p[lang='en'] {
          color: rgba(248, 245, 239, 0.54);
          font-size: 12.5px;
          line-height: 1.85;
        }
        .flow-cta {
          padding: 64px var(--gutter);
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          background: var(--navy-deep);
          border-top: 1px solid rgba(201,168,76,0.08);
        }
        @media (max-width: 1100px) {
          .flow-document-info,
          .flow-incoterms-featured { grid-template-columns: 1fr; }
        }
        @media (max-width: 980px) {
          .flow-incoterms { grid-template-columns: 1fr; }
          .flow-incoterms-case-notice { grid-template-columns: 1fr; }
        }
        @media (max-width: 760px) {
          .flow-timeline::before { left: 27px; }
          .flow-step { grid-template-columns: 56px minmax(0, 1fr); padding: 22px; gap: 18px; }
          .flow-number { width: 56px; height: 56px; font-size: 20px; }
          .flow-note { grid-template-columns: 1fr; }
          .flow-simple-grid,
          .flow-incoterms-types,
          .flow-incoterms-case-notice > div:last-child { grid-template-columns: 1fr; }
          .flow-incoterms-case-notice p + p {
            border-left: 0;
            border-top: 1px solid rgba(201,168,76,0.14);
            padding-left: 0;
            padding-top: 18px;
          }
        }
      `}</style>
    </>
  )
}
