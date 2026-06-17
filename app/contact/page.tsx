import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'
import InquiryForm from '@/components/InquiryForm'
import { TranslatedText } from '@/components/TranslatedText'

export const metadata: Metadata = {
  title: 'Contact | YUKIMICHI',
  description: 'YUKIMICHIへのお問い合わせ。日本商品の調達、国際配送、航空貨物、海上輸送、見積依頼、取扱可否確認についてご相談ください。',
}

const inquiryMailto =
  'mailto:exporter@justhen.co.jp?subject=YUKIMICHI%20Inquiry&body=%E4%BC%9A%E7%A4%BE%E5%90%8D%EF%BC%9A%0D%0A%E3%81%94%E6%8B%85%E5%BD%93%E8%80%85%E5%90%8D%EF%BC%9A%0D%0A%E5%95%86%E5%93%81URL%EF%BC%9A%0D%0A%E6%95%B0%E9%87%8F%EF%BC%9A%0D%0A%E9%85%8D%E9%80%81%E5%85%88%E5%9B%BD%EF%BC%9A%0D%0A%E5%B8%8C%E6%9C%9B%E7%B4%8D%E6%9C%9F%EF%BC%9A%0D%0A%E7%9B%B8%E8%AB%87%E5%86%85%E5%AE%B9%EF%BC%9A'

const helpfulItems = [
  '商品名',
  'ブランド名・メーカー名',
  '商品URLまたは参考画像',
  '希望数量',
  '希望納期',
  '仕入希望条件',
  '日本国内の引取場所または仕入先情報',
  '輸出先国・都市',
  '希望配送方法',
  '商品サイズ・重量',
  'SDS、成分表、JANコード、商品ラベル情報の有無',
  '法人取引か個人利用か',
  '継続取引か単発取引か',
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
          <TranslatedText id="pages.contact.heroTitle" fallback="お問い合わせ" />
          <br />
          <em><TranslatedText id="pages.contact.heroSubtitle" fallback="Contact YUKIMICHI" /></em>
        </h1>
        <p className="section-body contact-lead">
          <TranslatedText
            id="pages.contact.heroLead"
            fallback="日本国内の商品調達、国際配送、航空貨物、海上輸送、見積依頼、取扱可否確認についてご相談ください。商品URL・数量・配送先国・希望納期をご記載いただくと、確認がスムーズです。"
          />
        </p>
        <div className="contact-hero-actions">
          <a className="btn-primary" href={inquiryMailto}>
            <TranslatedText id="pages.contact.mailCta" fallback="exporter@justhen.co.jp へ相談する" /> <ArrowRight />
          </a>
          <Link href="/quote" className="btn-ghost">
            <TranslatedText id="common.quote" fallback="お見積りページへ進む" /> <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="contact-section">
        <aside className="contact-aside">
          <div>
            <span className="contact-kicker">Before Inquiry</span>
            <h2><TranslatedText id="pages.contact.helpfulTitle" fallback="お問い合わせ前にご用意いただきたい情報" /></h2>
            <ol className="contact-checklist">
              {helpfulItems.map((item, index) => (
                <li key={item}><TranslatedText id={`pages.contact.helpfulItems.${index}`} fallback={item} /></li>
              ))}
            </ol>
          </div>

          <div>
            <span className="contact-kicker">Quote Request</span>
            <h2><TranslatedText id="pages.contact.quoteTitle" fallback="Request a Quote" /></h2>
            <p><TranslatedText id="pages.contact.quoteLead" fallback="費用感を先に確認したい場合は、お見積りページで必要情報をご確認ください。" /></p>
            <Link href="/quote" className="btn-ghost">
              <TranslatedText id="common.quote" fallback="お見積りページへ進む" /> <ArrowRight />
            </Link>
          </div>
        </aside>

        <div className="contact-panel">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Inquiry Details</span>
          </div>
          <h2><TranslatedText id="pages.contact.formTitle" fallback="フォームからお問い合わせを送信" /></h2>
          <p className="contact-panel-lead">
            <TranslatedText
              id="pages.contact.formLead"
              fallback="必要事項を入力して送信すると、YUKIMICHIの確認窓口に内容が届きます。商品URLは任意です。商品調達、国際配送、取扱可否確認、メーカー確認などの相談内容をMessage欄に記載できます。"
            />
          </p>

          <InquiryForm type="contact" mailtoHref={inquiryMailto} />
        </div>
      </section>

      <section className="contact-notice">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Compliance Notes</span>
          </div>
          <h2><TranslatedText id="pages.contact.noticeTitle" fallback="取扱可否・規制確認について" /></h2>
        </div>
        <ul>
          {noticeItems.map((item, index) => (
            <li key={item}><TranslatedText id={`pages.contact.noticeItems.${index}`} fallback={item} /></li>
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
          grid-template-columns: minmax(300px, 0.85fr) minmax(0, 1.15fr);
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
        .contact-kicker {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.34em;
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
      `}</style>
    </>
  )
}
