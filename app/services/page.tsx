import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'サービス | YUKIMICHI - SNOWPATH JAPAN',
  description:
    'YUKIMICHIの輸出支援サービス。日本商品の調達、国際宅配便、航空貨物、海上輸送、輸出書類整理、規制確認、取引条件整理まで。',
}

const coreServices = [
  {
    code: 'A',
    title: '商品調達・購入代行',
    en: 'Japan Procurement',
    points: [
      '日本国内の正規流通品を中心に商品調達を支援します。',
      '商品URL、数量、希望条件をもとに確認します。',
      '小ロット、サンプル購入、継続仕入れの相談に対応します。',
    ],
    note: '在庫、価格、販売条件は仕入れ先により変動します。',
  },
  {
    code: 'B',
    title: '国際宅配便',
    en: 'International Express',
    points: [
      'EMS、DHL、FedEx、UPS、ヤマト国際宅急便などを案件ごとに検討します。',
      '小口、サンプル、短納期、海外バイヤー向け発送に適しています。',
      'サイズ、重量、配送先国、内容品により対応可否・送料が変動します。',
    ],
    note: '配送会社の引受条件を確認したうえで手配方法を整理します。',
  },
  {
    code: 'C',
    title: '航空貨物',
    en: 'Air Freight',
    points: [
      '緊急輸送、高付加価値商品、一定数量以上の輸送を検討できます。',
      '納期優先の案件に向きます。',
      '危険品、電池、液体、スプレー、アルコール類などは事前確認が必要です。',
    ],
    note: '航空便の安全基準・配送会社条件に従って確認します。',
  },
  {
    code: 'D',
    title: '海上輸送',
    en: 'Sea Freight',
    points: [
      'FCL、LCL、コンテナ輸送、大型貨物、継続出荷を検討できます。',
      'コスト重視、大量輸送、中長期輸送に適しています。',
      '納期は航空便より長くなる傾向があります。',
    ],
    note: '梱包条件、港湾費用、通関、輸入側手配が関係する場合があります。',
  },
  {
    code: 'E',
    title: '輸出書類・確認事項整理',
    en: 'Export Documentation',
    points: ['Invoice', 'Packing List', '商品情報整理', '配送情報整理', '見積条件整理'],
    note: '必要書類は商品内容、配送方法、配送先国、取引条件により異なります。',
  },
  {
    code: 'F',
    title: '規制確認・コンプライアンス',
    en: 'Compliance Review',
    points: [
      '禁止・制限品目の事前確認を行います。',
      '医薬品、食品、化粧品、電池、危険品、中古品、ブランド品などは個別確認します。',
      '内容品の虚偽申告や規制逃れは行いません。',
    ],
    note: '最終判断は税関・通関業者・配送会社・公的機関確認を前提とします。',
  },
]

const supportScope = [
  '商品情報の整理',
  '商品調達可否の確認',
  '見積作成',
  '国際配送方法の比較',
  'EMS / DHL / FedEx / UPS / ヤマト国際宅急便の検討',
  '航空貨物・海上輸送の相談',
  'Invoice / Packing List 等の基本書類整理',
  '梱包・検品・出荷前確認の相談',
  '禁止・制限品目の事前確認',
  '海外バイヤーとの取引条件整理',
]

const limitations = [
  '相手国での最終的な輸入許可',
  '税関による最終判断',
  '関税・VAT/GSTの最終金額',
  'HSコードの最終確定',
  '原産地証明・各種認証の発給可否',
  'FDA、CE、FCC、CPSIA等の認証取得代行',
  '危険品の最終輸送可否',
  '配送会社の最終引受判断',
  '輸入国での販売可否',
  '配送遅延が絶対に発生しないこと',
]

const shippingMethods = [
  {
    name: 'Express',
    detail: 'EMS / DHL / FedEx / UPS / ヤマト国際宅急便',
    fit: '小口、サンプル、短納期向け',
    note: '比較的スピード重視の発送に向きます。',
  },
  {
    name: 'Air Freight',
    detail: '航空貨物',
    fit: '緊急輸送、高付加価値商品、まとまった数量向け',
    note: '内容品・危険品判定が重要です。',
  },
  {
    name: 'Sea Freight',
    detail: 'FCL / LCL',
    fit: '大型貨物、大量輸送、コスト重視向け',
    note: '納期は長めですが、継続出荷に向きます。',
  },
]

const requiredInfo = [
  '商品名',
  '商品URL',
  '数量',
  '単価',
  'サイズ・重量',
  '成分・素材',
  '用途',
  '配送先国・都市',
  '希望納期',
  '希望配送方法',
  '法人宛・個人宛',
  '証明書・SDS等の有無',
]

const relatedLinks = [
  { href: '/quote', label: 'お見積り', en: 'Quote Request' },
  { href: '/contact', label: 'お問い合わせ', en: 'Contact' },
  { href: '/restricted', label: '禁止・制限品目', en: 'Restricted Items' },
  { href: '/terms', label: '取引条件', en: 'Terms of Transaction' },
  { href: '/faq', label: 'FAQ', en: 'Frequently Asked Questions' },
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ServicesPage() {
  return (
    <>
      <section className="services-hero">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Export Support Services</span>
        </div>
        <h1 className="services-title">
          サービス
          <br />
          <em>Export Support Services</em>
        </h1>
        <p className="section-body services-lead">
          YUKIMICHIは、日本国内の商品調達から、国際宅配便、航空貨物、海上輸送、輸出書類の整理、
          取扱可否確認まで、海外のお客様が安心して日本商品を取引できる環境を整えます。
        </p>
        <div className="services-hero-actions">
          <Link href="/quote" className="btn-primary">
            お見積りへ進む <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            お問い合わせ <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="services-core">
        <div className="services-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Core Services</span>
          </div>
          <h2>輸出実務を前提としたサービス領域</h2>
          <p>
            商品調達、配送方法の比較、輸出書類、規制確認まで、問い合わせ前に確認すべき実務項目を整理します。
          </p>
        </div>

        <div className="services-grid">
          {coreServices.map((service) => (
            <article className="service-card" key={service.code}>
              <div className="service-card__head">
                <span>{service.code}</span>
                <div>
                  <h2>{service.title}</h2>
                  <p>{service.en}</p>
                </div>
              </div>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="service-card__note">{service.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-scope">
        <article className="services-list-panel">
          <span className="services-kicker">Support Scope</span>
          <h2>対応範囲</h2>
          <p>YUKIMICHIが実務上の整理・確認・手配相談として対応できる主な範囲です。</p>
          <ul>
            {supportScope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="services-list-panel services-list-panel--muted">
          <span className="services-kicker">Limitations</span>
          <h2>対応範囲外・保証できないこと</h2>
          <p>
            これらは商品内容・配送先国・最新規制により判断が変わるため、必要に応じて税関・通関業者・配送会社・公的機関等の確認を前提とします。
          </p>
          <ul>
            {limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="services-shipping">
        <div className="services-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Shipping Method Selection</span>
          </div>
          <h2>輸送方法の使い分け</h2>
          <p>
            価格だけでなく、納期、破損リスク、通関難易度、配送会社の引受条件を踏まえて検討します。
          </p>
        </div>

        <div className="shipping-grid">
          {shippingMethods.map((method) => (
            <article className="shipping-card" key={method.name}>
              <span>{method.name}</span>
              <h3>{method.detail}</h3>
              <p>{method.fit}</p>
              <small>{method.note}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="services-info">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Required Information</span>
          </div>
          <h2>見積・確認に必要な情報</h2>
          <p>
            具体的な商品情報があるほど、配送可否、送料、規制確認、リードタイムの確認が進めやすくなります。
          </p>
        </div>
        <ol className="services-info-list">
          {requiredInfo.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="services-compliance">
        <div className="services-compliance-inner">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Compliance First</span>
          </div>
          <h2>法令遵守を前提とした輸出支援</h2>
          <p>
            YUKIMICHIは、内容品の虚偽申告、規制逃れ、配送会社の引受条件に反する手配は行いません。
            商品内容、配送先国、数量、用途により対応可否は変動します。
          </p>
          <p>
            取扱可否に不安がある場合は、禁止・制限品目ページをご確認のうえ、事前にご相談ください。
          </p>
          <Link href="/restricted" className="services-inline-link">
            禁止・制限品目を確認する <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="services-related">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Related Links</span>
          </div>
          <h2>関連ページ</h2>
          <p>見積、問い合わせ、取扱可否、取引条件、よくある質問を各ページで確認できます。</p>
        </div>
        <div className="services-related-grid">
          {relatedLinks.map((link) => (
            <Link href={link.href} className="services-related-card" key={link.href}>
              <span>{link.en}</span>
              <strong>{link.label}</strong>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>

      <section className="services-cta">
        <div>
          <span>Export Consultation</span>
          <h2>商品調達・輸出手配を相談する</h2>
          <p>
            商品URL、数量、配送先国、希望配送方法を添えてご相談ください。取扱可否と配送方法を確認したうえで見積をご案内します。
          </p>
          <a href="mailto:exporter@justhen.co.jp" className="services-mail">
            exporter@justhen.co.jp へ相談する
          </a>
        </div>
        <div className="services-cta-actions">
          <Link href="/quote" className="btn-primary">
            お見積りへ進む <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            お問い合わせ <ArrowRight />
          </Link>
        </div>
      </section>

      <style>{`
        .services-hero {
          min-height: 70svh;
          padding: calc(var(--nav-h) + 88px) var(--gutter) 76px;
          background:
            radial-gradient(ellipse 70% 46% at 78% 22%, rgba(201,168,76,0.09), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 58%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.12);
        }

        .services-title {
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-weight: 300;
          font-size: clamp(42px, 7.3vw, 92px);
          line-height: 1.05;
          color: var(--washi);
          margin-bottom: 28px;
        }

        .services-title em {
          color: var(--gold);
          font-style: italic;
          font-size: 0.68em;
        }

        .services-lead {
          max-width: 860px;
        }

        .services-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .services-core,
        .services-shipping {
          padding: var(--section-pad) var(--gutter);
          background:
            linear-gradient(180deg, var(--navy-mid) 0%, var(--navy-deep) 100%);
        }

        .services-section-head {
          max-width: 900px;
          margin-bottom: 44px;
        }

        .services-section-head h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 300;
          line-height: 1.35;
          margin: 0 0 16px;
        }

        .services-section-head p,
        .services-info p,
        .services-compliance p,
        .services-related p,
        .services-cta p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2.1;
          margin: 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .service-card {
          display: grid;
          align-content: start;
          gap: 18px;
          min-height: 410px;
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(13,28,53,0.92), rgba(7,17,31,0.82));
          padding: 24px;
        }

        .service-card__head {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 16px;
          align-items: start;
        }

        .service-card__head > span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(201,168,76,0.34);
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          line-height: 1;
        }

        .service-card h2 {
          color: var(--washi);
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.7;
          margin: 0 0 4px;
        }

        .service-card__head p {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-style: italic;
          font-weight: 300;
          line-height: 1.3;
          margin: 0;
        }

        .service-card ul {
          display: grid;
          gap: 11px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .service-card li {
          border-left: 1px solid rgba(201,168,76,0.34);
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          padding-left: 12px;
        }

        .service-card__note {
          align-self: end;
          border-top: 1px solid rgba(201,168,76,0.1);
          color: var(--suzu);
          font-size: 12px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          margin: 0;
          padding-top: 16px;
        }

        .services-scope {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          background: var(--navy-deep);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .services-list-panel {
          border: 1px solid rgba(201,168,76,0.16);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.18), transparent 48%),
            rgba(13,28,53,0.72);
          padding: clamp(26px, 4vw, 42px);
        }

        .services-list-panel--muted {
          background: rgba(13,28,53,0.52);
        }

        .services-kicker {
          color: var(--gold);
          display: block;
          font-size: 10px;
          letter-spacing: 0.28em;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        .services-list-panel h2,
        .services-info h2,
        .services-compliance h2,
        .services-related h2,
        .services-cta h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 300;
          line-height: 1.35;
          margin: 0 0 16px;
        }

        .services-list-panel p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2;
          margin: 0 0 24px;
        }

        .services-list-panel ul {
          display: grid;
          gap: 10px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .services-list-panel li {
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.04em;
          line-height: 1.8;
          padding-left: 18px;
          position: relative;
        }

        .services-list-panel li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.86em;
          width: 6px;
          height: 1px;
          background: var(--gold);
        }

        .shipping-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .shipping-card {
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(13,28,53,0.92), rgba(7,17,31,0.82));
          min-height: 260px;
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
          margin: 24px 0 12px;
        }

        .shipping-card p,
        .shipping-card small {
          display: block;
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2;
          margin: 0;
        }

        .shipping-card small {
          color: var(--suzu);
          margin-top: 14px;
        }

        .services-info,
        .services-related {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(28px, 5vw, 72px);
          background: var(--navy-deep);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .services-info-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .services-info-list li {
          display: grid;
          grid-template-columns: 44px 1fr;
          align-items: center;
          gap: 14px;
          min-height: 68px;
          border: 1px solid rgba(201,168,76,0.12);
          background: rgba(13,28,53,0.66);
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.06em;
          padding: 14px 16px;
        }

        .services-info-list span {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
        }

        .services-compliance {
          padding: 0 var(--gutter) var(--section-pad);
          background: var(--navy-deep);
        }

        .services-compliance-inner {
          max-width: 1180px;
          margin: 0 auto;
          border: 1px solid rgba(201,168,76,0.18);
          background:
            linear-gradient(90deg, rgba(139,30,47,0.24), transparent 50%),
            rgba(13,28,53,0.82);
          padding: clamp(30px, 5vw, 56px);
        }

        .services-compliance p + p {
          margin-top: 14px;
        }

        .services-inline-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid rgba(201,168,76,0.32);
          color: var(--gold);
          font-size: 11px;
          letter-spacing: 0.18em;
          margin-top: 24px;
          padding-bottom: 5px;
          text-decoration: none;
        }

        .services-related {
          background:
            linear-gradient(135deg, rgba(139,30,47,0.18), transparent 48%),
            var(--navy-mid);
        }

        .services-related-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .services-related-card {
          display: grid;
          gap: 10px;
          min-height: 132px;
          border: 1px solid rgba(201,168,76,0.14);
          background: rgba(7,17,31,0.52);
          color: var(--washi);
          padding: 22px;
          text-decoration: none;
        }

        .services-related-card span {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .services-related-card strong {
          color: var(--washi);
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0.1em;
          line-height: 1.6;
        }

        .services-related-card svg {
          color: var(--gold);
          justify-self: end;
        }

        .services-cta {
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

        .services-cta > div:first-child {
          max-width: 760px;
        }

        .services-cta span {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.32em;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        .services-mail {
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

        .services-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: flex-end;
        }

        @media (max-width: 1180px) {
          .services-grid,
          .shipping-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .services-scope,
          .services-info,
          .services-related {
            grid-template-columns: 1fr;
          }

          .services-cta {
            align-items: flex-start;
            flex-direction: column;
          }

          .services-cta-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 680px) {
          .services-grid,
          .shipping-grid,
          .services-info-list,
          .services-related-grid {
            grid-template-columns: 1fr;
          }

          .service-card,
          .shipping-card {
            min-height: auto;
          }
        }
      `}</style>
    </>
  )
}
