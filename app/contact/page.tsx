import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'

export const metadata: Metadata = {
  title: 'Contact | YUKIMICHI - SNOWPATH JAPAN',
  description: 'YUKIMICHIへのお問い合わせ。日本商品の調達、国際配送、航空貨物、海上輸送、見積依頼、取扱可否確認についてご相談ください。',
}

const inquiryMailto =
  'mailto:exporter@justhen.co.jp?subject=YUKIMICHI%20Inquiry&body=%E4%BC%9A%E7%A4%BE%E5%90%8D%EF%BC%9A%0D%0A%E3%81%94%E6%8B%85%E5%BD%93%E8%80%85%E5%90%8D%EF%BC%9A%0D%0A%E5%95%86%E5%93%81URL%EF%BC%9A%0D%0A%E6%95%B0%E9%87%8F%EF%BC%9A%0D%0A%E9%85%8D%E9%80%81%E5%85%88%E5%9B%BD%EF%BC%9A%0D%0A%E5%B8%8C%E6%9C%9B%E7%B4%8D%E6%9C%9F%EF%BC%9A%0D%0A%E7%9B%B8%E8%AB%87%E5%86%85%E5%AE%B9%EF%BC%9A'

const fieldItems = [
  { label: '会社名 / Company', example: 'Example Trading Co., Ltd.' },
  { label: 'ご担当者名 / Name', example: 'Your name' },
  { label: 'メールアドレス / Email', example: 'buyer@example.com' },
  { label: '商品URL / Product URL', example: 'https://example.com/product' },
  { label: '配送先国 / Destination Country', example: 'Country / City' },
  { label: '相談内容 / Message', example: '商品名、数量、希望納期、配送方法など' },
]

const helpfulItems = [
  '商品名・商品URL',
  '数量',
  '配送先国・都市',
  '希望納期',
  '希望配送方法',
  '法人宛・個人宛',
]

const noticeItems = [
  '商品カテゴリや仕向地により、輸出入規制、認証、危険品判定、通関書類の確認が必要になる場合があります。',
  '関税、VAT/GST、輸入可否の最終判断は、税関、通関業者、公的機関の最新情報確認を前提とします。',
  '偽造品、権利侵害品、法令違反となる商品、虚偽申告や過少申告を前提とした取引はお受けできません。',
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ContactPage() {
  return (
    <>
      <section className="contact-hero">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Contact</span>
        </div>
        <h1 className="contact-title">
          お問い合わせ
          <br />
          <em>Contact YUKIMICHI</em>
        </h1>
        <p className="section-body contact-lead">
          日本国内の商品調達、国際配送、航空貨物、海上輸送、見積依頼、取扱可否確認についてご相談ください。
          商品URL・数量・配送先国・希望納期をご記載いただくと、確認がスムーズです。
        </p>
        <div className="contact-hero-actions">
          <a className="btn-primary" href={inquiryMailto}>
            exporter@justhen.co.jp へ相談する <ArrowRight />
          </a>
          <Link href="/quote" className="btn-ghost">
            お見積りページへ進む <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-panel">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Inquiry Details</span>
          </div>
          <h2>メール本文に記載いただきたい内容</h2>
          <p className="contact-panel-lead">
            以下の項目をメール本文に記載してご連絡ください。メールリンクを開くと、基本項目入りの本文テンプレートが立ち上がります。
          </p>

          <div className="contact-form" aria-label="Inquiry details checklist">
            {fieldItems.map((field) => (
              <div className="contact-field" key={field.label}>
                <span>{field.label}</span>
                <div>{field.example}</div>
              </div>
            ))}
          </div>

          <a className="contact-mail-card" href={inquiryMailto}>
            <span>Official Inquiry Email</span>
            <strong>exporter@justhen.co.jp</strong>
            <small>メールで問い合わせる</small>
          </a>
        </div>

        <aside className="contact-aside">
          <div>
            <span className="contact-kicker">Before Inquiry</span>
            <h2>見積・相談時にあるとよい情報</h2>
            <ol className="contact-checklist">
              {helpfulItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          <div>
            <span className="contact-kicker">Quote Request</span>
            <h2>Request a Quote</h2>
            <p>費用感を先に確認したい場合は、お見積りページで必要情報をご確認ください。</p>
            <Link href="/quote" className="btn-ghost">
              お見積りページへ進む <ArrowRight />
            </Link>
          </div>
        </aside>
      </section>

      <section className="contact-notice">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Compliance Notes</span>
          </div>
          <h2>取扱可否・規制確認について</h2>
        </div>
        <ul>
          {noticeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <style>{`
        .contact-hero {
          min-height: 68svh;
          padding: calc(var(--nav-h) + 84px) var(--gutter) 72px;
          background:
            radial-gradient(ellipse 70% 48% at 78% 24%, rgba(201,168,76,0.08), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 62%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .contact-title {
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-weight: 300;
          font-size: clamp(42px, 7.4vw, 88px);
          line-height: 1.08;
          color: var(--washi);
          margin-bottom: 28px;
        }
        .contact-title em {
          color: var(--gold);
          font-style: italic;
          font-size: 0.78em;
        }
        .contact-lead { max-width: 800px; }
        .contact-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }
        .contact-section {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
          gap: clamp(28px, 5vw, 72px);
          background: var(--navy-deep);
        }
        .contact-panel,
        .contact-aside > div {
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(13,28,53,0.94), rgba(7,17,31,0.92));
        }
        .contact-panel { padding: clamp(28px, 4vw, 44px); }
        .contact-panel h2,
        .contact-notice h2 {
          color: var(--washi);
          font-size: 22px;
          font-weight: 300;
          letter-spacing: 0.14em;
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .contact-panel-lead {
          color: var(--washi-dim);
          font-size: 13px;
          line-height: 2;
          letter-spacing: 0.05em;
          margin: 0 0 28px;
        }
        .contact-form {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        .contact-field {
          display: grid;
          gap: 8px;
        }
        .contact-field span {
          color: var(--gold);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .contact-field div {
          min-height: 52px;
          border: 1px solid rgba(248,245,239,0.14);
          background: rgba(7,17,31,0.82);
          color: var(--washi-faint);
          padding: 14px 16px;
          font-size: 13px;
          display: flex;
          align-items: center;
        }
        .contact-field:last-child {
          grid-column: 1 / -1;
        }
        .contact-field:last-child div {
          min-height: 118px;
          align-items: flex-start;
        }
        .contact-mail-card {
          margin-top: 28px;
          display: grid;
          gap: 8px;
          padding: 24px;
          border: 1px solid rgba(201,168,76,0.22);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.28), transparent 48%),
            rgba(201,168,76,0.045);
          color: var(--washi);
          text-decoration: none;
        }
        .contact-mail-card span,
        .contact-kicker {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
        }
        .contact-mail-card strong {
          color: var(--washi);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 300;
          line-height: 1.05;
          overflow-wrap: anywhere;
        }
        .contact-mail-card small {
          color: var(--washi-dim);
          font-size: 12px;
          letter-spacing: 0.12em;
        }
        .contact-aside {
          display: grid;
          gap: 20px;
          align-content: start;
        }
        .contact-aside > div {
          padding: 30px;
        }
        .contact-kicker {
          display: block;
          margin-bottom: 14px;
        }
        .contact-aside h2 {
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          color: var(--washi);
          font-weight: 300;
          font-size: 30px;
          line-height: 1.3;
          margin-bottom: 14px;
        }
        .contact-aside p {
          color: var(--washi-dim);
          font-size: 13px;
          line-height: 2;
          margin-bottom: 24px;
        }
        .contact-checklist {
          list-style: none;
          display: grid;
          gap: 12px;
          counter-reset: contact-list;
        }
        .contact-checklist li {
          counter-increment: contact-list;
          display: grid;
          grid-template-columns: 32px 1fr;
          gap: 12px;
          color: var(--washi-dim);
          font-size: 13px;
          line-height: 1.8;
        }
        .contact-checklist li::before {
          content: counter(contact-list, decimal-leading-zero);
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          line-height: 1.4;
        }
        .contact-notice {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(28px, 5vw, 72px);
          background: var(--navy-mid);
          border-top: 1px solid rgba(201,168,76,0.08);
        }
        .contact-notice ul {
          list-style: none;
          display: grid;
          gap: 14px;
        }
        .contact-notice li {
          border-left: 2px solid var(--gold);
          background: rgba(7,17,31,0.38);
          color: var(--washi-dim);
          font-size: 13px;
          line-height: 2;
          letter-spacing: 0.04em;
          padding: 16px 18px;
        }
        @media (max-width: 900px) {
          .contact-section,
          .contact-notice {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .contact-form {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
