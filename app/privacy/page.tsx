import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | YUKIMICHI - SNOWPATH JAPAN',
  description:
    'YUKIMICHI / JUSTHEN CO., LTD. のプライバシーポリシー。お問い合わせ、見積依頼、輸出相談、取引対応に関連して取得する情報の取扱い方針について。',
}

const collectedInfo = [
  '会社名',
  'ご担当者名',
  'メールアドレス',
  '電話番号が提供された場合の電話番号',
  '商品名',
  '商品URL',
  '数量',
  '配送先国・都市',
  '希望納期',
  '希望配送方法',
  '見積・相談内容',
  '取引に必要な請求・配送・通関関連情報',
  'メールや問い合わせ内容に含まれる情報',
]

const purposes = [
  'お問い合わせへの回答',
  '見積作成',
  '商品調達可否の確認',
  '配送方法・送料・納期の確認',
  '輸出入・配送会社引受条件の確認',
  '取引条件の確認',
  '請求・支払い・連絡対応',
  'サービス改善',
  '不正利用、虚偽申告、規制逃れ等の防止',
  '法令または公的機関からの要請への対応',
]

const sharingCases = [
  '配送会社への配送情報提供',
  '通関業者・物流業者への確認',
  '仕入れ先への在庫・条件確認',
  '決済・請求・会計処理に必要な場合',
  '法令に基づく場合',
  '税関、公的機関、配送会社等から確認を求められた場合',
]

const policySections = [
  {
    code: '01',
    title: '海外取引に関連する情報の取扱い',
    en: 'International Handling',
    body:
      'YUKIMICHIは海外バイヤー・海外法人との取引相談を扱うため、配送先国、輸入者情報、配送会社、通関業者等に関連する情報を取り扱う場合があります。国際配送・輸出入確認に必要な範囲で、関係事業者に情報を共有する場合があります。',
  },
  {
    code: '02',
    title: '安全管理',
    en: 'Security Management',
    body:
      '取得した情報について、漏えい、滅失、毀損、不正アクセス等を防止するため、必要かつ適切な安全管理に努めます。具体的な管理方法は、取扱う情報の内容や業務運用に応じて継続的に見直します。',
  },
  {
    code: '03',
    title: '情報の保存期間',
    en: 'Retention Period',
    body:
      '問い合わせ・見積・取引対応に必要な期間、または法令・会計・税務・紛争防止のために必要な期間、情報を保存する場合があります。不要となった情報は、適切な方法で削除または管理する方針です。',
  },
  {
    code: '04',
    title: '開示・訂正・削除等の請求',
    en: 'Disclosure / Correction / Deletion',
    body:
      '本人から、保有する個人情報について、開示、訂正、利用停止、削除等の希望があった場合、本人確認のうえ、法令に従い適切に対応します。',
  },
  {
    code: '05',
    title: 'Cookie等の利用',
    en: 'Cookies / Analytics',
    body:
      '当サイトでは、利便性向上やサイト改善のため、Cookieまたは類似技術を利用する場合があります。利用する場合でも、取得情報はサイト改善・利用状況把握等の目的で使用し、個人を不当に識別する目的では使用しません。',
  },
  {
    code: '06',
    title: '改定',
    en: 'Revision',
    body:
      '本ポリシーは、法令改正、サービス内容の変更、運用改善等により改定される場合があります。重要な変更がある場合は、当サイト上で告知します。',
  },
]

const relatedLinks = [
  { href: '/contact', label: 'お問い合わせ', en: 'Contact' },
  { href: '/terms', label: '取引条件', en: 'Terms of Transaction' },
  { href: '/restricted', label: '禁止・制限品目', en: 'Restricted Items' },
  { href: '/quote', label: 'お見積り', en: 'Quote Request' },
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="privacy-hero">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Privacy Policy</span>
        </div>
        <h1 className="privacy-title">
          プライバシーポリシー
          <br />
          <em>Privacy Policy</em>
        </h1>
        <p className="section-body privacy-lead">
          YUKIMICHI – SNOWPATH JAPAN を運営する JUSTHEN CO., LTD. は、お問い合わせ、見積依頼、
          輸出相談、取引対応に関連して取得する情報を適切に取り扱います。
        </p>
      </section>

      <section className="privacy-policy">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Basic Policy</span>
          </div>
          <h2>個人情報の取扱い方針</h2>
        </div>
        <div className="privacy-policy-card">
          <p>
            当社は、個人情報および取引に関連する情報の重要性を認識し、適切な取得、利用、管理に努めます。
            取得した情報は、利用目的の範囲内で取り扱います。
          </p>
          <p>
            法令に基づく場合を除き、本人の同意なく目的外利用を行わない方針です。
            個別の法的判断が必要な事項については、必要に応じて専門家確認を前提とします。
          </p>
        </div>
      </section>

      <section className="privacy-detail">
        <div className="privacy-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Information We Collect</span>
          </div>
          <h2>取得する情報</h2>
          <p>
            お問い合わせ、見積依頼、輸出相談、取引対応のため、以下のような情報を取得する場合があります。
          </p>
        </div>
        <div className="privacy-chip-grid">
          {collectedInfo.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="privacy-split">
        <article className="privacy-list-card">
          <span className="privacy-card-kicker">Purpose of Use</span>
          <h2>利用目的</h2>
          <ul>
            {purposes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="privacy-list-card">
          <span className="privacy-card-kicker">Sharing with Third Parties</span>
          <h2>第三者への提供・共有</h2>
          <p>
            原則として、本人の同意なく第三者へ提供しない方針です。ただし、以下の場合に必要な範囲で共有する場合があります。
          </p>
          <ul>
            {sharingCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="privacy-cards">
        {policySections.map((section) => (
          <article className="privacy-card" key={section.code}>
            <div className="privacy-card__head">
              <span>{section.code}</span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.en}</p>
              </div>
            </div>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="privacy-contact">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Contact Window</span>
          </div>
          <h2>お問い合わせ窓口</h2>
          <p>個人情報の取扱いに関するお問い合わせは、以下までご連絡ください。</p>
        </div>
        <div className="privacy-contact-card">
          <p>JUSTHEN CO., LTD.</p>
          <p>YUKIMICHI – SNOWPATH JAPAN</p>
          <a href="mailto:exporter@justhen.co.jp?subject=Privacy%20Policy%20Inquiry">
            exporter@justhen.co.jp
          </a>
        </div>
      </section>

      <section className="privacy-related">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Related Links</span>
          </div>
          <h2>関連ページ</h2>
          <p>問い合わせ、取引条件、禁止・制限品目、見積依頼に関する情報は各ページで確認できます。</p>
        </div>
        <div className="privacy-related-grid">
          {relatedLinks.map((link) => (
            <Link href={link.href} className="privacy-related-card" key={link.href}>
              <span>{link.en}</span>
              <strong>{link.label}</strong>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .privacy-hero {
          min-height: 70svh;
          padding: calc(var(--nav-h) + 88px) var(--gutter) 76px;
          background:
            radial-gradient(ellipse 70% 46% at 78% 22%, rgba(201,168,76,0.09), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 58%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.12);
        }

        .privacy-title {
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-weight: 300;
          font-size: clamp(42px, 7.3vw, 92px);
          line-height: 1.05;
          color: var(--washi);
          margin-bottom: 28px;
        }

        .privacy-title em {
          color: var(--gold);
          font-style: italic;
          font-size: 0.68em;
        }

        .privacy-lead {
          max-width: 860px;
        }

        .privacy-policy,
        .privacy-contact,
        .privacy-related {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(28px, 5vw, 72px);
          background: var(--navy-deep);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .privacy-policy h2,
        .privacy-detail h2,
        .privacy-contact h2,
        .privacy-related h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 300;
          line-height: 1.25;
          margin: 0;
        }

        .privacy-policy-card,
        .privacy-contact-card {
          display: grid;
          gap: 18px;
          border: 1px solid rgba(201,168,76,0.16);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.2), transparent 48%),
            rgba(13,28,53,0.72);
          padding: clamp(26px, 4vw, 42px);
        }

        .privacy-policy-card p,
        .privacy-section-head p,
        .privacy-list-card p,
        .privacy-card > p,
        .privacy-contact p,
        .privacy-related p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2.1;
          margin: 0;
        }

        .privacy-detail,
        .privacy-cards {
          padding: var(--section-pad) var(--gutter);
          background:
            linear-gradient(180deg, var(--navy-mid) 0%, var(--navy-deep) 100%);
        }

        .privacy-section-head {
          max-width: 900px;
          margin-bottom: 40px;
        }

        .privacy-section-head h2 {
          margin-bottom: 16px;
        }

        .privacy-chip-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .privacy-chip-grid span {
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

        .privacy-split {
          padding: 0 var(--gutter) var(--section-pad);
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          background: var(--navy-deep);
        }

        .privacy-list-card,
        .privacy-card {
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(13,28,53,0.92), rgba(7,17,31,0.82));
          padding: clamp(24px, 4vw, 36px);
        }

        .privacy-card-kicker {
          color: var(--gold);
          display: block;
          font-size: 10px;
          letter-spacing: 0.28em;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        .privacy-list-card h2 {
          color: var(--washi);
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.5;
          margin: 0 0 18px;
        }

        .privacy-list-card ul {
          display: grid;
          gap: 10px;
          list-style: none;
          margin: 18px 0 0;
          padding: 0;
        }

        .privacy-list-card li {
          border-left: 1px solid rgba(201,168,76,0.34);
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.04em;
          line-height: 1.85;
          padding-left: 12px;
        }

        .privacy-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .privacy-card {
          display: grid;
          gap: 18px;
          min-height: 270px;
        }

        .privacy-card__head {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 16px;
          align-items: start;
        }

        .privacy-card__head > span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(201,168,76,0.34);
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          line-height: 1;
        }

        .privacy-card h2 {
          color: var(--washi);
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.7;
          margin: 0 0 4px;
        }

        .privacy-card__head p {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-style: italic;
          font-weight: 300;
          line-height: 1.3;
          margin: 0;
        }

        .privacy-contact {
          background: var(--navy-deep);
        }

        .privacy-contact-card p {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(22px, 3vw, 34px);
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.3;
        }

        .privacy-contact-card a {
          color: var(--gold);
          font-size: clamp(24px, 4vw, 40px);
          font-weight: 300;
          line-height: 1.2;
          overflow-wrap: anywhere;
          text-decoration: none;
        }

        .privacy-related {
          background:
            linear-gradient(135deg, rgba(139,30,47,0.26), transparent 46%),
            var(--navy-mid);
        }

        .privacy-related-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .privacy-related-card {
          display: grid;
          gap: 10px;
          min-height: 142px;
          border: 1px solid rgba(201,168,76,0.14);
          background: rgba(7,17,31,0.52);
          color: var(--washi);
          padding: 22px;
          text-decoration: none;
        }

        .privacy-related-card span {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .privacy-related-card strong {
          color: var(--washi);
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0.1em;
          line-height: 1.6;
        }

        .privacy-related-card svg {
          color: var(--gold);
          justify-self: end;
        }

        @media (max-width: 1180px) {
          .privacy-chip-grid,
          .privacy-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .privacy-policy,
          .privacy-contact,
          .privacy-related,
          .privacy-split {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .privacy-chip-grid,
          .privacy-cards,
          .privacy-related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
