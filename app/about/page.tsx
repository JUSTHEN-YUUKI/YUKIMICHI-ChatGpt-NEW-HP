import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'

export const metadata: Metadata = {
  title: '会社概要 | YUKIMICHI',
  description:
    'YUKIMICHIを運営する株式会社ジャッセン / JUSTHEN CO., LTD.の会社概要、代表者情報、本店所在地、札幌営業拠点、輸出調整サービスの責任範囲。',
}

const companyProfile = [
  { ja: '会社名', en: 'Company Name', valueJa: '株式会社ジャッセン', valueEn: 'JUSTHEN CO., LTD.' },
  { ja: '英文表記', en: 'English Name', valueJa: 'JUSTHEN CO., LTD.', valueEn: 'JUSTHEN CO., LTD.' },
  { ja: 'サービスブランド', en: 'Service Brand', valueJa: 'YUKIMICHI', valueEn: 'YUKIMICHI' },
  { ja: '代表', en: 'Representative Director', valueJa: '林 祐樹', valueEn: 'Yuuki Hayashi' },
  { ja: '設立', en: 'Established', valueJa: '2016年2月', valueEn: 'February 2016' },
  { ja: '法人番号', en: 'Corporate Number', valueJa: '2011601020697', valueEn: '2011601020697' },
  {
    ja: '本店所在地',
    en: 'Registered Office',
    valueJa: '東京都練馬区大泉町2丁目34番29号',
    valueEn: '2-34-29 Oizumi-machi, Nerima-ku, Tokyo, Japan',
  },
  {
    ja: '札幌営業拠点',
    en: 'Sapporo Business Office',
    valueJa: '北海道札幌市中央区北二条東8-5-15',
    valueEn: '8-5-15 Kita 2-jo Higashi, Chuo-ku, Sapporo, Hokkaido, Japan',
  },
  {
    ja: '古物商許可番号',
    en: 'Secondhand Dealer License',
    valueJa: '東京都公安委員会 第305581606050号',
    valueEn: 'Tokyo Metropolitan Public Safety Commission No. 305581606050',
  },
  { ja: '連絡先', en: 'Email', valueJa: 'exporter@justhen.co.jp', valueEn: 'exporter@justhen.co.jp', href: 'mailto:exporter@justhen.co.jp' },
]

const supportAreas = [
  '商品の在庫・価格・取引可否を含む仕入れ可否調査',
  'メーカー、卸、販売店との連絡・交渉',
  'Invoice、Packing List、SDS、成分表などの書類確認・整理',
  'EMS、DHL、FedEx、UPS、ヤマト国際宅急便、航空貨物、海上輸送の比較',
  'フォワーダー、通関業者、配送会社との連携支援',
  '輸出可否・配送可否に関する事前確認',
  '海外バイヤー向けの情報整理',
]

const nonGuaranteeItems = [
  '輸入国側の最終的な通関許可',
  '税関、配送会社、関係当局による最終判断',
  '輸入国での販売許可、認証取得、表示規制の適合性',
  '国際輸送中の不可抗力、遅延、追加検査、没収、返送',
  'メーカー・卸・販売店側の最終的な取引承認',
  '為替、運賃、関税、輸入税、VAT/GST等の変動',
]

const supportAreasEn = [
  'Product availability, pricing, and sourcing feasibility checks',
  'Communication and negotiation with Japanese manufacturers, wholesalers, and retailers',
  'Review and organization of Invoice, Packing List, SDS, ingredient sheets, and related documents',
  'Comparison of EMS, DHL, FedEx, UPS, Yamato International TA-Q-BIN, air freight, and sea freight',
  'Coordination with forwarders, customs brokers, and carriers',
  'Preliminary checks for export and shipping feasibility',
  'Information organization for overseas buyers',
]

const nonGuaranteeItemsEn = [
  'Final customs clearance in the importing country',
  'Final decisions by customs, carriers, or relevant authorities',
  'Sales approval, certification, or labeling compliance in the importing country',
  'Delays, inspections, seizure, return shipments, or force majeure during international transportation',
  'Final transaction approval by manufacturers, wholesalers, or retailers',
  'Changes in exchange rates, freight charges, customs duties, import taxes, VAT/GST, or related costs',
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Company Profile</span>
        </div>
        <h1 className="about-title">
          JUSTHEN
          <br />
          <em>YUKIMICHI.</em>
        </h1>
        <div className="about-lead-grid">
          <p>
            株式会社ジャッセンは、YUKIMICHIブランドを通じて、日本国内のメーカー、卸、販売店などに対する仕入れ可否調査と取引調整を行い、海外バイヤー向けに日本側の輸出調整・手配支援を提供しています。
          </p>
          <p lang="en">
            JUSTHEN CO., LTD. operates YUKIMICHI, a Japan-side export coordination service for overseas buyers, with a focus on transparency, compliance, and practical coordination.
          </p>
        </div>
      </section>

      <section className="about-company">
        <div className="about-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Company Overview</span>
          </div>
          <h2>会社概要</h2>
          <p>
            商品の在庫・価格・取引可否を含む仕入れ可否調査、輸出関連書類、配送方法、規制確認などを案件ごとに整理し、透明性のある取引を重視しています。
          </p>
          <p lang="en">
            We support sourcing feasibility checks, supplier communication, export document preparation, shipping method comparison, and regulatory checks on a case-by-case basis.
          </p>
        </div>

        <div className="company-profile-table" role="table" aria-label="Company profile">
          {companyProfile.map((item) => {
            const hasDistinctEnglishValue = item.valueEn !== item.valueJa

            return (
              <div className="company-profile-row" role="row" key={`${item.en}-${item.valueEn}`}>
                <div role="cell">
                  <span>{item.ja}</span>
                  <small>{item.en}</small>
                </div>
                <strong role="cell">
                  {item.href ? <a href={item.href}>{item.valueJa}</a> : item.valueJa}
                  {hasDistinctEnglishValue && <small>{item.valueEn}</small>}
                </strong>
              </div>
            )
          })}
        </div>

        <div className="location-note">
          <p>YUKIMICHIの輸出調整業務は、札幌営業拠点を中心に対応しています。</p>
          <p lang="en">YUKIMICHI’s export coordination services are mainly handled through the Sapporo business office.</p>
        </div>
      </section>

      <section className="representative-section">
        <div className="representative-photo">
          <img src="/profile.png" alt="Yuuki Hayashi, Representative Director of JUSTHEN CO., LTD." />
        </div>
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Representative</span>
          </div>
          <h2>代表者について</h2>
          <p>
            代表の林祐樹は、会社員時代に成田空港、横浜港、品川港に関連する国際物流業務に携わり、輸出入書類、貨物管理、港湾・空港関連の実務を経験してきました。
          </p>
          <p>
            YUKIMICHIでは、その実務経験をもとに、海外バイヤーが日本商品を安心して検討できるよう、商品の仕入れ可否調査、仕入先との連絡、輸出書類の整理、配送方法の比較、規制確認を丁寧に支援しています。
          </p>
          <p>
            無理な輸出、虚偽申告、規制逃れを前提とした取引は行わず、法令遵守と透明性を重視しています。
          </p>
          <div className="representative-en">
            <h3>About the Representative</h3>
            <p>
              Yuuki Hayashi, Representative Director of JUSTHEN CO., LTD., has practical experience in international logistics operations related to Narita Airport, Yokohama Port, and Shinagawa Port.
            </p>
            <p>
              Based on this background, YUKIMICHI supports overseas buyers by coordinating sourcing feasibility checks, supplier communication, export document preparation, shipping method comparison, and regulatory checks from the Japan side.
            </p>
            <p>
              We do not support false declarations, regulatory avoidance, or transactions involving counterfeit or infringing goods. Compliance and transparency are central to our service.
            </p>
          </div>
        </div>
      </section>

      <section className="scope-section">
        <div className="about-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Scope and Responsibility</span>
          </div>
          <h2>YUKIMICHIのサービス範囲</h2>
          <p>
            YUKIMICHIは、国際物流会社・通関業者そのものではありません。日本国内のメーカー、卸、販売店などとの確認・調整、輸出関連書類の整理、配送方法の比較、外部フォワーダー・通関業者との連携を支援する、日本側の輸出調整サービスです。
          </p>
          <p lang="en">
            YUKIMICHI is not an international freight forwarder, customs broker, or carrier. We provide Japan-side export coordination support with external partners as needed.
          </p>
        </div>

        <div className="scope-grid">
          <article className="scope-card">
            <span>Main Support Areas</span>
            <h3>対応する主な業務</h3>
            <ul>
              {supportAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul lang="en">
              {supportAreasEn.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="scope-card scope-card--muted">
            <span>Non-Guaranteed Items</span>
            <h3>YUKIMICHIが保証できない事項</h3>
            <ul>
              {nonGuaranteeItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul lang="en">
              {nonGuaranteeItemsEn.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="about-cta">
        <div>
          <span>Export Coordination</span>
          <h2>日本側の確認・調整について相談する</h2>
          <p>
            商品の仕入れ可否調査、仕入先との連絡、輸出関連書類、配送方法の比較、規制確認について、案件ごとに確認します。
          </p>
        </div>
        <Link href="/contact" className="btn-primary">
          お問い合わせ <ArrowRight />
        </Link>
      </section>

      <style>{`
        .about-hero {
          min-height: 68svh;
          padding: calc(var(--nav-h) + 84px) var(--gutter) 72px;
          background:
            radial-gradient(ellipse 70% 48% at 78% 24%, rgba(201,168,76,0.08), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 62%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }

        .about-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(46px, 8vw, 96px);
          line-height: 0.98;
          color: var(--washi);
          margin-bottom: 28px;
        }

        .about-title em {
          color: var(--gold);
          font-style: italic;
        }

        .about-lead-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          max-width: 1080px;
        }

        .about-lead-grid p,
        .location-note,
        .scope-card,
        .representative-en {
          border: 1px solid rgba(201,168,76,0.14);
          background: rgba(13,28,53,0.42);
        }

        .about-lead-grid p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2.05;
          margin: 0;
          padding: 18px 20px;
        }

        .about-company,
        .representative-section,
        .scope-section {
          padding: var(--section-pad) var(--gutter);
          background: var(--navy-deep);
        }

        .about-section-head {
          max-width: 1040px;
          margin-bottom: 34px;
        }

        .about-section-head h2,
        .representative-section h2,
        .about-cta h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(32px, 4vw, 54px);
          font-weight: 300;
          line-height: 1.35;
          letter-spacing: 0;
          margin: 0 0 16px;
        }

        .about-section-head p,
        .representative-section p,
        .about-cta p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 2.05;
          margin: 0;
        }

        .about-section-head p + p,
        .representative-section p + p {
          margin-top: 12px;
        }

        .company-profile-table {
          border: 1px solid rgba(201,168,76,0.16);
          background: linear-gradient(180deg, rgba(13,28,53,0.96), rgba(7,17,31,0.95));
        }

        .company-profile-row {
          display: grid;
          grid-template-columns: minmax(190px, 0.4fr) minmax(0, 1fr);
          border-bottom: 1px solid rgba(248,245,239,0.08);
        }

        .company-profile-row:last-child {
          border-bottom: 0;
        }

        .company-profile-row > div,
        .company-profile-row > strong {
          display: grid;
          gap: 5px;
          padding: 17px 22px;
        }

        .company-profile-row > strong {
          border-left: 1px solid rgba(201,168,76,0.1);
          color: var(--washi);
          font-size: 14px;
          font-weight: 300;
          line-height: 1.8;
        }

        .company-profile-row a {
          color: var(--gold);
          text-decoration: none;
        }

        .company-profile-row span,
        .scope-card span,
        .about-cta span {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.24em;
          line-height: 1.5;
          text-transform: uppercase;
        }

        .company-profile-row small {
          color: var(--washi-faint);
          font-size: 12px;
          font-weight: 300;
          line-height: 1.55;
        }

        .location-note {
          margin-top: 18px;
          padding: 20px 24px;
        }

        .location-note p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          margin: 0;
        }

        .location-note p + p {
          border-top: 1px solid rgba(201,168,76,0.12);
          margin-top: 12px;
          padding-top: 12px;
        }

        .representative-section {
          display: grid;
          grid-template-columns: minmax(260px, 0.72fr) minmax(0, 1.28fr);
          gap: clamp(30px, 5vw, 74px);
          align-items: start;
          background:
            linear-gradient(135deg, rgba(139,30,47,0.16), transparent 48%),
            var(--navy-mid);
        }

        .representative-photo {
          border: 1px solid rgba(201,168,76,0.18);
          background: rgba(7,17,31,0.68);
          overflow: hidden;
        }

        .representative-photo img {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          object-position: center top;
        }

        .representative-en {
          display: grid;
          gap: 10px;
          margin-top: 24px;
          padding: 24px;
        }

        .representative-en h3,
        .scope-card h3 {
          color: var(--washi);
          font-size: 18px;
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.6;
          margin: 0;
        }

        .scope-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .scope-card {
          padding: clamp(24px, 3vw, 34px);
        }

        .scope-card--muted {
          background:
            linear-gradient(135deg, rgba(139,30,47,0.2), transparent 55%),
            rgba(7,17,31,0.72);
        }

        .scope-card ul {
          display: grid;
          gap: 10px;
          list-style: none;
          margin: 18px 0 0;
          padding: 0;
        }

        .scope-card ul[lang="en"] {
          border-top: 1px solid rgba(201,168,76,0.12);
          margin-top: 20px;
          padding-top: 20px;
        }

        .scope-card li {
          border-left: 1px solid rgba(201,168,76,0.32);
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          padding-left: 13px;
        }

        .about-cta {
          align-items: center;
          background:
            linear-gradient(135deg, rgba(139,30,47,0.34), transparent 42%),
            var(--navy-mid);
          border-top: 1px solid rgba(201,168,76,0.14);
          display: flex;
          gap: 24px;
          justify-content: space-between;
          padding: 68px var(--gutter);
        }

        .about-cta > div {
          max-width: 760px;
        }

        @media (max-width: 900px) {
          .representative-section,
          .scope-grid {
            grid-template-columns: 1fr;
          }

          .about-cta {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 680px) {
          .about-lead-grid,
          .company-profile-row {
            grid-template-columns: 1fr;
          }

          .company-profile-row > strong {
            border-left: 0;
            border-top: 1px solid rgba(201,168,76,0.08);
          }
        }
      `}</style>
    </>
  )
}
