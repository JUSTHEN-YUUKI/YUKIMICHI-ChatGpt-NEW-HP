import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact | YUKIMICHI - SNOWPATH JAPAN',
  description: 'YUKIMICHIへのお問い合わせ。日本からの輸出、商品調達、国際配送、見積依頼についてご相談ください。',
}

const fields = [
  { id: 'company', label: '会社名 / Company', placeholder: '例: JUSTHEN Trading LLC' },
  { id: 'person', label: '担当者名 / Contact Person', placeholder: '例: Yuki Hayashi' },
  { id: 'email', label: 'メールアドレス / Email', placeholder: 'buyer@example.com', type: 'email' },
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
          Start a Trusted
          <br />
          <em>Export Talk.</em>
        </h1>
        <p className="section-body contact-lead">
          日本商品の調達、海外発送、法人取引、小ロット輸出についてご相談ください。
          現時点ではフォーム風の確認画面です。送信はメール、または見積依頼ページからお願いします。
        </p>
      </section>

      <section className="contact-section">
        <div className="contact-panel">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Inquiry Form</span>
          </div>
          <h2>相談内容を整理する</h2>
          <form className="contact-form">
            {fields.map((field) => (
              <label key={field.id} htmlFor={field.id}>
                <span>{field.label}</span>
                <input id={field.id} name={field.id} type={field.type ?? 'text'} placeholder={field.placeholder} />
              </label>
            ))}
            <label htmlFor="message">
              <span>相談内容 / Message</span>
              <textarea
                id="message"
                name="message"
                rows={7}
                placeholder="商品名、数量、仕向国、希望納期、商品URL、配送方法の希望などをご記入ください。"
              ></textarea>
            </label>
            <button type="button">送信機能は準備中です</button>
          </form>
        </div>

        <aside className="contact-aside">
          <div>
            <span className="contact-kicker">Direct Mail</span>
            <h2>info@justhen.co.jp</h2>
            <p>
              お急ぎの場合はメールでご連絡ください。商品URL、数量、仕向地、希望納期を含めると確認が早くなります。
            </p>
            <a className="btn-primary" href="mailto:info@justhen.co.jp">
              メールを送る <ArrowRight />
            </a>
          </div>
          <div>
            <span className="contact-kicker">Quotation</span>
            <h2>Estimate Request</h2>
            <p>費用感を先に確認したい場合は、お見積りページで必要情報をご確認ください。</p>
            <Link href="/quote" className="btn-ghost">
              見積依頼ページへ <ArrowRight />
            </Link>
          </div>
        </aside>
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
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(46px, 8vw, 96px);
          line-height: 0.98;
          color: var(--washi);
          margin-bottom: 28px;
        }
        .contact-title em { color: var(--gold); font-style: italic; }
        .contact-lead { max-width: 760px; }
        .contact-section {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
          gap: clamp(28px, 5vw, 72px);
          background: var(--navy-deep);
        }
        .contact-panel, .contact-aside > div {
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(13,28,53,0.94), rgba(7,17,31,0.92));
        }
        .contact-panel { padding: clamp(28px, 4vw, 44px); }
        .contact-panel h2 {
          color: var(--washi);
          font-size: 22px;
          font-weight: 300;
          letter-spacing: 0.16em;
          margin-bottom: 28px;
        }
        .contact-form {
          display: grid;
          gap: 18px;
        }
        .contact-form label {
          display: grid;
          gap: 8px;
        }
        .contact-form span {
          color: var(--gold);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .contact-form input, .contact-form textarea {
          width: 100%;
          border: 1px solid rgba(248,245,239,0.14);
          background: rgba(7,17,31,0.82);
          color: var(--washi);
          padding: 14px 16px;
          font: inherit;
          font-size: 13px;
          outline: none;
          border-radius: 0;
        }
        .contact-form input::placeholder, .contact-form textarea::placeholder {
          color: rgba(248,245,239,0.3);
        }
        .contact-form button {
          justify-self: start;
          padding: 14px 24px;
          border: 1px solid rgba(201,168,76,0.18);
          background: rgba(201,168,76,0.04);
          color: var(--washi-dim);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
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
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .contact-aside h2 {
          font-family: 'Cormorant Garamond', serif;
          color: var(--washi);
          font-weight: 300;
          font-size: 30px;
          line-height: 1.15;
          margin-bottom: 14px;
        }
        .contact-aside p {
          color: var(--washi-dim);
          font-size: 13px;
          line-height: 2;
          margin-bottom: 24px;
        }
        @media (max-width: 900px) {
          .contact-section { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
