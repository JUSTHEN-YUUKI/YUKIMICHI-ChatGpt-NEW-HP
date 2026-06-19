import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'

export const metadata: Metadata = {
  title: '取引条件 | YUKIMICHI',
  description:
    'YUKIMICHIの取引条件ページ。見積、支払い、商品調達、キャンセル、返品、国際配送、関税・VAT/GST、輸入者責任、禁止・制限品目について。',
  alternates: { canonical: '/terms' },
}

const terms = [
  {
    code: 'A',
    title: '見積について',
    en: 'Quote Preparation',
    items: [
      '見積は商品情報、数量、配送先国、配送方法、サイズ、重量、取扱条件をもとに作成します。',
      '見積金額は、商品価格、手配手数料、国際送料、梱包費、保険料、規制確認費用などにより変動します。',
      '見積時点の為替、配送会社料金、商品価格、在庫状況により、最終金額が変わる場合があります。',
      '見積の有効期限を設ける場合があります。',
    ],
  },
  {
    code: 'B',
    title: '支払いについて',
    en: 'Payment',
    items: [
      '原則として、商品調達・発送手配の前に支払い確認が必要です。',
      '支払い方法、支払い期日、通貨、支払い関連手数料等は見積書または個別案内により確認します。',
      '支払い情報は、必要に応じて見積書・請求書・個別案内で提示します。',
      '支払い確認後に、商品調達または配送手配を進める想定です。',
    ],
  },
  {
    code: 'C',
    title: '商品調達について',
    en: 'Procurement',
    items: [
      '商品在庫、価格、販売条件は仕入れ先により変動します。',
      '注文後に在庫切れ、価格変更、販売停止となる場合があります。',
      '購入後の商品変更・キャンセルは、仕入れ先の条件に従う場合があります。',
    ],
  },
  {
    code: 'D',
    title: 'キャンセルについて',
    en: 'Cancellation',
    items: [
      '商品購入前であれば、キャンセル可能な場合があります。',
      '商品購入後、梱包後、発送後のキャンセルは原則として難しい場合があります。',
      'キャンセル料、返品送料、仕入れ先手数料、決済手数料等が発生する場合があります。',
    ],
  },
  {
    code: 'E',
    title: '返品・交換について',
    en: 'Return & Exchange',
    items: [
      '海外発送後の返品・交換は、商品性質、配送状況、仕入れ先条件、輸入国規制により制限される場合があります。',
      'お客様都合による返品・交換は対応できない場合があります。',
      '初期不良や誤配送が疑われる場合は、写真、動画、梱包状態、配送ラベル等の確認が必要です。',
    ],
  },
  {
    code: 'F',
    title: '国際送料・配送について',
    en: 'International Shipping',
    items: [
      '国際送料は配送会社、配送先国、サイズ、重量、容積重量、貨物内容により変動します。',
      'EMS、DHL、FedEx、UPS、ヤマト国際宅急便、航空貨物、海上輸送などから案件ごとに検討します。',
      '配送日数は目安であり、通関、天候、繁忙期、配送会社事情により遅延する場合があります。',
    ],
  },
  {
    code: 'G',
    title: '関税・VAT/GSTについて',
    en: 'Duties & Taxes',
    items: [
      '輸入国で発生する関税、VAT、GST、輸入消費税、通関手数料等は、原則として輸入者側の負担となります。',
      '税額、税率、課税判断は輸入国の税関判断により異なります。',
      'YUKIMICHIは事前の目安案内を行う場合がありますが、最終金額を保証するものではありません。',
    ],
  },
  {
    code: 'H',
    title: '輸入者責任について',
    en: 'Importer Responsibility',
    items: [
      '輸入国側の規制、許可、認証、ラベル、成分表示、販売可否は、輸入者側で確認が必要となる場合があります。',
      '法人輸入、販売目的輸入、個人使用目的輸入により必要条件が異なる場合があります。',
      '最終的な輸入可否は、税関・通関業者・公的機関等の確認を前提とします。',
    ],
  },
  {
    code: 'I',
    title: '禁止・制限品目について',
    en: 'Restricted Items',
    items: [
      '医薬品、食品、化粧品、電池、危険品、中古品、ブランド品、動植物由来素材などは事前確認が必要となる場合があります。',
      '詳細は「禁止・制限品目」ページをご確認ください。',
      '内容品の虚偽申告、規制逃れ、配送会社の引受条件に反する手配は行いません。',
    ],
    href: '/restricted-items',
  },
  {
    code: 'J',
    title: '配送事故・破損について',
    en: 'Damage & Loss',
    items: [
      '配送中の破損、紛失、遅延は、配送会社の調査・補償条件に従う場合があります。',
      '保険の有無や補償範囲は、配送方法・貨物内容により異なります。',
      '破損・紛失が発生した場合は、写真、動画、外箱、梱包状態、配送ラベル等の資料提出が必要になる場合があります。',
    ],
  },
  {
    code: 'K',
    title: '免責事項',
    en: 'Disclaimer',
    items: [
      '本ページは一般的な取引条件の概要であり、個別の契約・見積書・請求書・メールでの合意内容が優先される場合があります。',
      '法令、配送会社条件、税関判断、各国規制は変更される可能性があります。',
      'YUKIMICHIは、税関・通関業者・配送会社・公的機関等の最終判断を保証するものではありません。',
    ],
  },
]

const responsibilityCards = [
  {
    title: 'Importer Responsibility',
    ja: '輸入国側の許可、通関、関税・輸入税・VAT/GST、現地販売可否は、原則として輸入者側の確認・負担となります。',
    en: 'Destination-side permits, customs clearance, duties, import taxes, VAT/GST, and local sales eligibility are generally the importer\'s responsibility.',
  },
  {
    title: 'Customs Decisions',
    ja: '税関判断による検査、遅延、没収、追加費用は、返金対象外となる場合があります。',
    en: 'Inspections, delays, seizure, or additional costs caused by customs decisions may be excluded from refunds.',
  },
  {
    title: 'Insurance / Carrier Terms',
    ja: '輸送中の破損・紛失・遅延に関する補償は、加入した保険または運送会社約款の範囲に限定されます。',
    en: 'Compensation for damage, loss, or delay is limited to the applicable insurance coverage or carrier terms.',
  },
  {
    title: 'Restricted / Infringing Goods',
    ja: '模倣品、知的財産権侵害品、法令違反品、輸出入規制品、虚偽申告を前提とする取引は取り扱いできません。',
    en: 'Counterfeit goods, intellectual property-infringing goods, illegal products, restricted goods, or transactions based on false declarations cannot be handled.',
  },
]

const relatedLinks = [
  { href: '/quote', label: 'お見積り', en: 'Quote Request' },
  { href: '/contact', label: 'お問い合わせ', en: 'Contact' },
  { href: '/restricted-items', label: '禁止・制限品目', en: 'Restricted Items' },
  { href: '/faq', label: 'FAQ', en: 'Frequently Asked Questions' },
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function TermsPage() {
  return (
    <>
      <section className="terms-hero">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Terms of Transaction</span>
        </div>
        <h1 className="terms-title">
          取引条件
          <br />
          <em>Terms of Transaction</em>
        </h1>
        <p className="section-body terms-lead" lang="ja">
          YUKIMICHIでは、日本商品の調達、輸出手配、国際配送において、透明性のある取引条件を重視しています。
          お見積り前に、支払い、キャンセル、関税、配送事故、規制確認などの基本条件をご確認ください。
        </p>
      </section>

      <section className="terms-policy">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Basic Policy</span>
          </div>
          <h2>透明性を重視した輸出支援</h2>
        </div>
        <div className="terms-policy-card">
          <p>
            YUKIMICHIは、無理な輸出、虚偽申告、規制逃れを前提とした取引は行いません。
            商品内容、配送先国、数量、サイズ、重量、配送方法により、費用・納期・対応可否は変動します。
          </p>
          <p>
            本ページは一般的な取引条件の概要であり、個別契約・見積書・請求書・メールでの合意内容が優先される場合があります。
          </p>
        </div>
      </section>

      <section className="terms-responsibility">
        <div className="terms-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Responsibility Scope</span>
          </div>
          <h2>輸入者責任と免責範囲</h2>
          <p>
            YUKIMICHIは日本側の輸出手配支援を行います。輸入国側の許可、通関、税金、販売可否、配送事故補償は、
            案件ごとの条件、関係機関、配送会社約款、保険条件により確認します。
          </p>
        </div>
        <div className="terms-responsibility-grid">
          {responsibilityCards.map((item) => (
            <article className="terms-responsibility-card" key={item.title}>
              <span>{item.title}</span>
              <p lang="ja">{item.ja}</p>
              <small lang="en">{item.en}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="terms-list-section">
        <div className="terms-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Transaction Terms</span>
          </div>
          <h2>輸出取引に関する基本条件</h2>
          <p>
            以下は、YUKIMICHIを通じた商品調達・輸出手配・国際配送における代表的な確認事項です。
            案件ごとの条件は、商品内容と配送先国により個別に確認します。
          </p>
        </div>

        <div className="terms-grid">
          {terms.map((term) => (
            <article className="terms-card" key={term.code}>
              <div className="terms-card__head">
                <span>{term.code}</span>
                <div>
                  <h3>{term.title}</h3>
                  <p>{term.en}</p>
                </div>
              </div>
              <ul>
                {term.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {term.href ? (
                <Link href={term.href} className="terms-card__link">
                  詳細を見る <ArrowRight />
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="terms-related">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Related Links</span>
          </div>
          <h2>関連ページ</h2>
          <p>見積依頼、取扱可否、よくある質問は各ページで確認できます。</p>
        </div>
        <div className="terms-related-grid">
          {relatedLinks.map((link) => (
            <Link href={link.href} className="terms-related-card" key={link.href}>
              <span>{link.en}</span>
              <strong>{link.label}</strong>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>

      <section className="terms-cta">
        <div>
          <span>Confirm Terms Before Inquiry</span>
          <h2>取引条件を確認して相談する</h2>
          <p>
            商品URL、数量、配送先国、希望配送方法を添えてご相談ください。取引条件を確認したうえで、見積と手配可否を案内します。
          </p>
          <a href="mailto:exporter@justhen.co.jp" className="terms-mail">
            exporter@justhen.co.jp へ相談する
          </a>
        </div>
        <div className="terms-cta-actions">
          <Link href="/quote" className="btn-primary">
            お見積りへ進む <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            お問い合わせ <ArrowRight />
          </Link>
        </div>
      </section>

      <style>{`
        .terms-hero {
          min-height: 70svh;
          padding: calc(var(--nav-h) + 88px) var(--gutter) 76px;
          background:
            radial-gradient(ellipse 70% 46% at 78% 22%, rgba(201,168,76,0.09), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 58%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.12);
        }

        .terms-title {
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-weight: 300;
          font-size: clamp(42px, 7.3vw, 92px);
          line-height: 1.05;
          color: var(--washi);
          margin-bottom: 28px;
        }

        .terms-title em {
          color: var(--gold);
          font-style: italic;
          font-size: 0.68em;
        }

        .terms-lead {
          max-width: 840px;
        }

        .terms-policy,
        .terms-related {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(28px, 5vw, 72px);
          background: var(--navy-deep);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .terms-policy h2,
        .terms-related h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 300;
          line-height: 1.25;
          margin: 0;
        }

        .terms-policy-card {
          display: grid;
          gap: 18px;
          border: 1px solid rgba(201,168,76,0.16);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.2), transparent 48%),
            rgba(13,28,53,0.72);
          padding: clamp(26px, 4vw, 42px);
        }

        .terms-policy-card p,
        .terms-section-head p,
        .terms-related p,
        .terms-cta p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2.1;
          margin: 0;
        }

        .terms-responsibility,
        .terms-list-section {
          padding: var(--section-pad) var(--gutter);
          background:
            linear-gradient(180deg, var(--navy-mid) 0%, var(--navy-deep) 100%);
        }

        .terms-section-head {
          max-width: 900px;
          margin-bottom: 44px;
        }

        .terms-section-head h2 {
          color: var(--washi);
          font-size: clamp(26px, 4vw, 42px);
          font-weight: 300;
          letter-spacing: 0.1em;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .terms-responsibility-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .terms-responsibility-card {
          border: 1px solid rgba(201,168,76,0.16);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.16), transparent 48%),
            rgba(7,17,31,0.64);
          padding: clamp(22px, 3vw, 30px);
        }

        .terms-responsibility-card span {
          color: var(--gold);
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(23px, 3vw, 34px);
          font-weight: 300;
          line-height: 1.15;
          margin-bottom: 14px;
        }

        .terms-responsibility-card p {
          color: var(--washi);
          font-size: 13.5px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          margin: 0 0 12px;
        }

        .terms-responsibility-card small {
          border-top: 1px solid rgba(201,168,76,0.14);
          color: var(--washi-dim);
          display: block;
          font-size: 12.5px;
          letter-spacing: 0.03em;
          line-height: 1.8;
          padding-top: 12px;
        }

        .terms-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .terms-card {
          display: grid;
          align-content: start;
          gap: 18px;
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(13,28,53,0.92), rgba(7,17,31,0.82));
          min-height: 380px;
          padding: 24px;
        }

        .terms-card__head {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 16px;
          align-items: start;
        }

        .terms-card__head > span {
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

        .terms-card h3 {
          color: var(--washi);
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.7;
          margin: 0 0 4px;
        }

        .terms-card__head p {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-style: italic;
          font-weight: 300;
          line-height: 1.3;
          margin: 0;
        }

        .terms-card ul {
          display: grid;
          gap: 11px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .terms-card li {
          border-left: 1px solid rgba(201,168,76,0.34);
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          padding-left: 12px;
        }

        .terms-card__link {
          align-self: end;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          border-bottom: 1px solid rgba(201,168,76,0.28);
          color: var(--gold);
          font-size: 11px;
          letter-spacing: 0.18em;
          margin-top: 4px;
          padding-bottom: 4px;
          text-decoration: none;
        }

        .terms-related {
          background: var(--navy-deep);
        }

        .terms-related-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .terms-related-card {
          display: grid;
          gap: 10px;
          min-height: 142px;
          border: 1px solid rgba(201,168,76,0.14);
          background: rgba(13,28,53,0.72);
          color: var(--washi);
          padding: 22px;
          text-decoration: none;
        }

        .terms-related-card span {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .terms-related-card strong {
          color: var(--washi);
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0.1em;
          line-height: 1.6;
        }

        .terms-related-card svg {
          color: var(--gold);
          justify-self: end;
        }

        .terms-cta {
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

        .terms-cta > div:first-child {
          max-width: 740px;
        }

        .terms-cta span {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.32em;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        .terms-cta h2 {
          color: var(--washi);
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 300;
          letter-spacing: 0.1em;
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .terms-mail {
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

        .terms-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: flex-end;
        }

        @media (max-width: 1180px) {
          .terms-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .terms-policy,
          .terms-related {
            grid-template-columns: 1fr;
          }

          .terms-cta {
            align-items: flex-start;
            flex-direction: column;
          }

          .terms-cta-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .terms-responsibility-grid,
          .terms-grid,
          .terms-related-grid {
            grid-template-columns: 1fr;
          }

          .terms-card {
            min-height: auto;
          }
        }
      `}</style>
    </>
  )
}
