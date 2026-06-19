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
    en: 'Product & Import Requirements Review',
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
    en: 'Shipping Coordination',
    text: 'EMS・DHL・FedEx・UPSなどの国際宅配便、航空貨物、海上輸送を比較し、貨物内容と配送先に合う方法を確認したうえで手配します。',
  },
  {
    number: '08',
    title: '発送・追跡共有・フォロー',
    en: 'Shipment & Follow-up',
    text: '発送後は追跡情報を共有し、到着までの確認事項をフォローします。輸入国側の通関、許可、税金、販売可否は原則として輸入者側での確認事項です。',
  },
]

const responsibilityCards = [
  {
    term: 'What Incoterms Decide',
    ja: 'インコタームズでは、商品の引渡し場所、輸送費の負担、保険、通関、リスクの移転時点などを確認します。',
    en: 'Incoterms help clarify the delivery point, freight cost responsibility, insurance, customs-related scope, and when risk transfers between seller and buyer.',
  },
  {
    term: 'Japan-side Support',
    ja: 'YUKIMICHIは、日本国内での商品調達、仕入先確認、簡易検品、梱包準備、Invoice・Packing Listの整理、配送会社・フォワーダーとの確認を支援します。',
    en: 'YUKIMICHI supports Japan-side procurement, supplier checks, basic inspection, packing preparation, Invoice and Packing List organization, and coordination with carriers or freight forwarders.',
  },
  {
    term: 'Importer-side Checks',
    ja: '輸入国側の通関、関税、VAT/GST、輸入許可、販売可否、ラベル規制、現地法令への適合は、原則として輸入者側で確認が必要です。',
    en: 'Destination-side customs clearance, duties, VAT/GST, import permits, sales eligibility, labeling rules, and local regulatory compliance generally need to be confirmed by the importer.',
  },
  {
    term: 'Terms Are Confirmed Per Case',
    ja: 'DDP条件は、輸入国側の通関・関税・税金対応を含むため、原則として標準対応外です。必要な場合は、案件ごとに対応可否を確認します。',
    en: 'DDP terms are generally outside our standard scope because they include import customs clearance, duties, and taxes in the destination country. Availability will be reviewed on a case-by-case basis.',
  },
]

const incotermsGroups = [
  {
    title: 'All Transport Modes',
    ja: '全輸送モード対応',
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
    title: 'Sea and Inland Waterway Only',
    ja: '海上・内水路輸送専用',
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
    badge: '日本側手配 / Japan-side Arrangement',
    en: 'FCA is one practical trade term for Japan-side export arrangements. Based on delivery to a designated warehouse, port facility, airport cargo terminal, or buyer-nominated forwarder in Japan, YUKIMICHI can support supplier checks, packing preparation, Invoice and Packing List organization, and coordination with carriers or freight forwarders on a case-by-case basis.',
    ja: 'FCAは、日本側の輸出手配で検討できる取引条件の一つです。日本国内の指定倉庫、港湾倉庫、空港貨物施設、または買主指定フォワーダーへの引き渡しを基準に、YUKIMICHIでは仕入先確認、梱包準備、Invoice・Packing List整理、配送会社・フォワーダーとの確認を案件ごとに支援します。',
  },
  {
    code: 'EXW',
    name: 'Ex Works',
    badge: '個別確認 / Case-by-case',
    en: 'EXW means that goods are made available at the supplier’s, manufacturer’s, retailer’s, or warehouse location. YUKIMICHI can support supplier communication, handover schedule confirmation, product condition checks, and domestic pickup coordination on a case-by-case basis. However, for international shipments, export clearance, domestic pickup, international transport arrangements, and destination-side regulatory checks may become complicated for the buyer. Depending on the project, FCA may be a more practical option.',
    ja: 'EXWは、メーカー、卸、販売店、倉庫などで貨物を引き渡す取引条件です。YUKIMICHIでは、仕入先との連絡、引き渡し可能日の確認、商品状態の確認、国内引取の調整を案件ごとに支援します。ただし、海外向け輸出では、輸出通関、国内輸送、国際輸送手配、輸入国側の規制確認などが買主側に集中しやすいため、案件内容によってはFCAの方が実務上適している場合があります。',
  },
  {
    code: 'FOB',
    name: 'Free On Board',
    badge: '海上輸送向け / Sea Freight',
    en: 'FOB is a trade term used for sea freight. The cost and risk allocation is based on the point at which the goods are loaded on board the vessel at the named port of shipment, such as Tokyo Port, Osaka Port, or Yokohama Port. For sea LCL/FCL projects, YUKIMICHI can support supplier checks, coordination with port warehouses or freight forwarders, and export document organization on a case-by-case basis. For air cargo, EMS, DHL, FedEx, UPS, and other courier shipments, FCA or other suitable terms should be considered instead of FOB.',
    ja: 'FOBは、海上輸送で使用される取引条件です。東京港、大阪港、横浜港などの指定船積港で、本船上に貨物が積み込まれた時点を基準に、費用負担とリスク移転の範囲を整理します。YUKIMICHIでは、海上LCL/FCL案件において、仕入先確認、港湾倉庫・フォワーダーとの確認、輸出書類の整理などを案件ごとに支援します。なお、航空貨物、EMS、DHL、FedEx、UPSなどの国際エクスプレスでは、FOBではなくFCA等の条件を確認します。',
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
        <div className="flow-incoterms-copy">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Trade Terms / Responsibility Scope</span>
          </div>
          <h2 className="section-title">
            What Are
            <br />
            <em>Incoterms?</em>
          </h2>
          <div className="flow-incoterms-lead">
            <p>
              インコタームズとは、国際取引で「売主と買主のどちらが、どこまで費用・手配・責任を負うか」を整理するための取引条件です。YUKIMICHIでは、案件ごとに日本側で対応する範囲と、輸入者側で確認が必要な範囲を分けてご案内します。
            </p>
            <p lang="en">
              Incoterms are trade terms used to clarify which party is responsible for costs, arrangements, and risk in international transactions. YUKIMICHI explains the Japan-side support scope and the importer-side responsibilities case by case.
            </p>
          </div>
        </div>
        <div className="flow-incoterms-content">
          <div className="flow-incoterms-grid">
            {responsibilityCards.map((item) => (
              <article className="flow-incoterms-card" key={item.term}>
                <h3>{item.term}</h3>
                <p>{item.ja}</p>
                <small>{item.en}</small>
              </article>
            ))}
          </div>
          <aside className="flow-incoterms-notice">
            <p>
              最終的な輸入可否、税額、通関判断は、輸入国の税関・通関業者・関係当局の判断に従います。YUKIMICHIは日本側の確認と手配を支援しますが、輸入国側の許認可や販売可否を保証するものではありません。
            </p>
            <small>
              Final import approval, tax amounts, and customs decisions follow the judgment of the destination country’s customs, customs broker, and relevant authorities. YUKIMICHI supports Japan-side checks and arrangements, but does not guarantee destination-side permits or sales eligibility.
            </small>
          </aside>
        </div>

        <div className="flow-incoterms-expanded">
          <header className="flow-incoterms-expanded-header">
            <div>
              <span className="flow-incoterms-kicker">Supported Trade Terms</span>
              <h2>対応可能な取引条件</h2>
            </div>
            <div className="flow-incoterms-summary">
              <p>
                インコタームズは、貨物の引渡し場所、費用負担、輸送手配、保険、通関、リスク移転の範囲を整理するための国際取引条件です。YUKIMICHIでは、案件ごとに商品内容、輸送方法、仕向地、買主側フォワーダーの有無を確認し、適切な取引条件を整理します。
              </p>
              <p lang="en">
                Incoterms clarify the delivery point, cost allocation, transport arrangement, insurance, customs clearance, and transfer of risk between seller and buyer. YUKIMICHI reviews each project based on the product, shipping method, destination, and buyer-side forwarder arrangement, and supports the selection of suitable trade terms.
              </p>
            </div>
          </header>

          <div className="flow-incoterms-list-heading">
            <span>Incoterms® 2020 Rules</span>
            <h3>Incoterms® 2020 の種類一覧</h3>
          </div>

          <div className="flow-incoterms-types" aria-label="Incoterms 2020 types">
            {incotermsGroups.map((group) => (
              <article className="flow-incoterms-type-card" key={group.title}>
                <h3>{group.title}</h3>
                <span>{group.ja}</span>
                <dl>
                  {group.terms.map(([code, name, ja]) => (
                    <div key={code}>
                      <dt>{code}</dt>
                      <dd>
                        <strong>{name}</strong>
                        <small>{ja}</small>
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <div className="flow-incoterms-featured">
            {featuredIncoterms.map((term) => (
              <article
                className="flow-incoterms-featured-card"
                key={term.code}
              >
                <span className="flow-incoterms-badge">{term.badge}</span>
                <h3>
                  {term.code} <small>/ {term.name}</small>
                </h3>
                <p>{term.ja}</p>
                <p lang="en">{term.en}</p>
              </article>
            ))}
          </div>

          <aside className="flow-incoterms-case-notice">
            <div>
              <span>Terms Are Confirmed Per Case</span>
              <h3>取引条件は案件ごとに確認</h3>
            </div>
            <div>
              <p>
                取引条件は、商品内容、輸送方法、仕向地、買主側フォワーダーの有無、輸出入規制、保険条件により異なります。最終的なインコタームズ条件は、見積書、Invoice、Packing List、契約書等で明確に確認したうえで進行します。
              </p>
              <p lang="en">
                Trade terms may vary depending on the product, shipping method, destination, buyer-side forwarder arrangement, export/import regulations, and insurance conditions. The final Incoterms rule will be confirmed clearly in the quotation, Invoice, Packing List, contract, or related documents before proceeding.
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
          grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
          gap: clamp(28px, 5vw, 72px);
          align-items: start;
          background:
            linear-gradient(135deg, rgba(139,30,47,0.18), transparent 48%),
            var(--navy-mid);
          border-top: 1px solid rgba(201,168,76,0.08);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .flow-incoterms-lead,
        .flow-incoterms-content {
          display: grid;
          gap: 14px;
        }
        .flow-incoterms-lead {
          max-width: 590px;
          margin-top: 24px;
        }
        .flow-incoterms-lead p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 2;
          margin: 0;
        }
        .flow-incoterms-lead p + p {
          border-top: 1px solid rgba(201,168,76,0.12);
          padding-top: 14px;
        }
        .flow-incoterms-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .flow-incoterms-card {
          border: 1px solid rgba(201,168,76,0.16);
          background: rgba(7,17,31,0.48);
          padding: 22px;
        }
        .flow-incoterms-card h3 {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 2.5vw, 30px);
          font-weight: 300;
          line-height: 1.15;
          margin: 0 0 12px;
        }
        .flow-incoterms-card p {
          color: var(--washi);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 1.85;
          margin: 0 0 10px;
        }
        .flow-incoterms-card small {
          color: var(--washi-dim);
          display: block;
          font-size: 12px;
          letter-spacing: 0.03em;
          line-height: 1.75;
        }
        .flow-incoterms-notice {
          border: 1px solid rgba(201,168,76,0.16);
          border-left-color: rgba(201,168,76,0.5);
          background: rgba(201,168,76,0.05);
          padding: 20px 22px;
        }
        .flow-incoterms-notice p,
        .flow-incoterms-notice small {
          color: var(--washi-dim);
          display: block;
          font-size: 12px;
          letter-spacing: 0.03em;
          line-height: 1.85;
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
          gap: 28px;
          margin-top: clamp(22px, 3vw, 42px);
          padding-top: clamp(28px, 4vw, 52px);
          border-top: 1px solid rgba(201,168,76,0.18);
          min-width: 0;
        }
        .flow-incoterms-expanded-header {
          display: grid;
          grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
          gap: clamp(28px, 5vw, 72px);
          align-items: start;
        }
        .flow-incoterms-kicker,
        .flow-incoterms-case-notice span {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.28em;
          line-height: 1.6;
          text-transform: uppercase;
        }
        .flow-incoterms-expanded-header h2,
        .flow-incoterms-case-notice h3 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 300;
          line-height: 1.12;
          margin: 8px 0 0;
        }
        .flow-incoterms-summary {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }
        .flow-incoterms-summary p,
        .flow-incoterms-featured-card p,
        .flow-incoterms-case-notice p {
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.03em;
          line-height: 1.9;
          margin: 0;
          overflow-wrap: anywhere;
        }
        .flow-incoterms-summary p[lang='en'] {
          border-left: 1px solid rgba(201,168,76,0.14);
          padding-left: 22px;
        }
        .flow-incoterms-types {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        .flow-incoterms-list-heading span {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.28em;
          line-height: 1.6;
          text-transform: uppercase;
        }
        .flow-incoterms-list-heading h3 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(25px, 3vw, 34px);
          font-weight: 300;
          line-height: 1.15;
          margin: 6px 0 0;
        }
        .flow-incoterms-type-card {
          border: 1px solid rgba(201,168,76,0.18);
          background: rgba(7,17,31,0.58);
          padding: clamp(20px, 3vw, 28px);
          min-width: 0;
        }
        .flow-incoterms-type-card h3 {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 300;
          line-height: 1.15;
          margin: 0;
        }
        .flow-incoterms-type-card > span {
          display: block;
          color: var(--washi-dim);
          font-size: 12px;
          letter-spacing: 0.08em;
          margin-top: 6px;
        }
        .flow-incoterms-type-card dl {
          display: grid;
          gap: 0;
          margin: 20px 0 0;
        }
        .flow-incoterms-type-card dl > div {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          gap: 14px;
          align-items: baseline;
          padding: 10px 0;
          border-top: 1px solid rgba(201,168,76,0.1);
        }
        .flow-incoterms-type-card dt {
          color: var(--gold-light);
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
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
          font-size: 12.5px;
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
          color: var(--washi-dim);
          border: 1px solid rgba(207,207,198,0.22);
          background: rgba(207,207,198,0.04);
          padding: 6px 9px;
          font-size: 9px;
          letter-spacing: 0.12em;
          line-height: 1.4;
          text-transform: uppercase;
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
        .flow-incoterms-featured-card p + p {
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
        }
        .flow-incoterms-case-notice > div:last-child {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
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
        .flow-cta {
          padding: 64px var(--gutter);
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          background: var(--navy-deep);
          border-top: 1px solid rgba(201,168,76,0.08);
        }
        @media (max-width: 980px) {
          .flow-incoterms { grid-template-columns: 1fr; }
          .flow-incoterms-expanded-header,
          .flow-incoterms-case-notice { grid-template-columns: 1fr; }
          .flow-incoterms-featured { grid-template-columns: 1fr; }
        }
        @media (max-width: 760px) {
          .flow-timeline::before { left: 27px; }
          .flow-step { grid-template-columns: 56px minmax(0, 1fr); padding: 22px; gap: 18px; }
          .flow-number { width: 56px; height: 56px; font-size: 20px; }
          .flow-note { grid-template-columns: 1fr; }
          .flow-incoterms-summary,
          .flow-incoterms-types,
          .flow-incoterms-case-notice > div:last-child { grid-template-columns: 1fr; }
          .flow-incoterms-summary p[lang='en'],
          .flow-incoterms-case-notice p + p {
            border-left: 0;
            border-top: 1px solid rgba(201,168,76,0.14);
            padding-left: 0;
            padding-top: 18px;
          }
        }
        @media (max-width: 680px) {
          .flow-incoterms-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
