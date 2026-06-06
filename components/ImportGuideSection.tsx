import Link from "@/components/NewTabLink"
import ScrollReveal from "@/components/ScrollReveal"

const individualNotes = [
  {
    ja: "個人輸入では、通関業者の手配ができない、または対応が限定的な場合があります。",
    en: "For personal imports, customs broker arrangements may not be available or may be limited.",
  },
  {
    ja: "関税、輸入税、輸入許可、受取国側の手続きは購入者側で確認が必要です。",
    en: "Duties, import taxes, permits, and destination-side procedures should be checked by the buyer.",
  },
  {
    ja: "小口の相談では、国際宅配便を中心に配送方法を確認します。",
    en: "Small personal shipments are usually reviewed around international courier options.",
  },
]

const businessNotes = [
  {
    ja: "法人輸入では、条件により通関業者との連携が可能な場合があります。",
    en: "For business imports, coordination with a customs broker may be possible depending on the conditions.",
  },
  {
    ja: "Invoice、Packing List、商品情報、HS Code確認用情報を整理します。",
    en: "Invoice, packing list, product information, and details for HS Code review should be prepared.",
  },
  {
    ja: "国際宅配便、航空貨物、海上輸送を比較し、数量・納期・品目に応じて提案します。",
    en: "Courier, air freight, and sea freight can be compared based on quantity, timeline, and product category.",
  },
]

const importChecklist = [
  "Is the product allowed in your country?",
  "Are import permits or labels required?",
  "Are duties, VAT, GST, or local taxes expected?",
  "Is the shipment for personal or business import?",
  "Which method is suitable: courier, air, or sea?",
  "Are invoice and packing documents required?",
]

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ImportGuideSection() {
  return (
    <section className="import-guide-section" aria-labelledby="import-guide-title">
      <ScrollReveal>
        <div className="import-guide-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Import Guide for Overseas Buyers</span>
          </div>
          <h2 id="import-guide-title" className="section-title">
            Import Guide
            <br />
            <em>for Overseas Buyers</em>
          </h2>
          <p>
            海外バイヤーが日本商品を購入・輸入する前に、個人輸入と法人輸入で確認すべき事項を分けて整理します。
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="buyer-guide-grid">
          <article className="buyer-guide-panel">
            <span className="guide-panel-kicker">Individual Buyers</span>
            <h3>
              個人のお客様
              <span>Personal Import Review</span>
            </h3>
            <ul>
              {individualNotes.map((note) => (
                <li key={note.en}>
                  <strong>{note.ja}</strong>
                  <span>{note.en}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="buyer-guide-panel">
            <span className="guide-panel-kicker">Business Buyers</span>
            <h3>
              法人のお客様
              <span>Commercial Import Review</span>
            </h3>
            <ul>
              {businessNotes.map((note) => (
                <li key={note.en}>
                  <strong>{note.ja}</strong>
                  <span>{note.en}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="import-check-panel">
          <div>
            <span className="guide-panel-kicker">Import Check List</span>
            <h3>Before Requesting Support</h3>
          </div>
          <ol>
            {importChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="import-notice">
          <p>
            Import regulations vary by country and product category. YUKIMICHI provides export support
            from Japan, but final import approval is determined by the destination country&apos;s customs
            and relevant authorities.
          </p>
          <p>
            輸入規制は国・商品カテゴリにより異なります。YUKIMICHIは日本側の輸出支援を行いますが、
            最終的な輸入可否は仕向国の税関および関係当局の判断によります。
          </p>
          <Link href="/quote" className="btn-primary">
            Request Import Review <ArrowRight />
          </Link>
        </div>
      </ScrollReveal>

      <style>{`
        .import-guide-section {
          display: grid;
          gap: clamp(24px, 4vw, 38px);
          border-top: 1px solid rgba(201,168,76,0.12);
          padding-top: clamp(42px, 6vw, 72px);
        }

        .import-guide-head {
          max-width: 900px;
        }

        .import-guide-head p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 2;
          margin: -8px 0 0;
        }

        .buyer-guide-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .buyer-guide-panel {
          border: 1px solid rgba(201,168,76,0.16);
          background:
            linear-gradient(145deg, rgba(201,168,76,0.07), transparent 42%),
            rgba(13,28,53,0.5);
          display: grid;
          gap: 22px;
          padding: clamp(24px, 4vw, 36px);
        }

        .guide-panel-kicker {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .buyer-guide-panel h3,
        .import-check-panel h3 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 300;
          line-height: 1.15;
          margin: 0;
        }

        .buyer-guide-panel h3 span {
          color: var(--washi-dim);
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          margin-top: 8px;
        }

        .buyer-guide-panel ul {
          display: grid;
          gap: 16px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .buyer-guide-panel li {
          border-top: 1px solid rgba(201,168,76,0.12);
          display: grid;
          gap: 6px;
          padding-top: 16px;
        }

        .buyer-guide-panel li strong {
          color: var(--washi);
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.04em;
          line-height: 1.85;
        }

        .buyer-guide-panel li span {
          color: var(--washi-dim);
          font-size: 12px;
          letter-spacing: 0.03em;
          line-height: 1.8;
        }

        .import-check-panel {
          border: 1px solid rgba(201,168,76,0.16);
          background: rgba(7,17,31,0.46);
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(24px, 5vw, 64px);
          padding: clamp(24px, 4vw, 38px);
        }

        .import-check-panel ol {
          counter-reset: import-check;
          display: grid;
          gap: 12px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .import-check-panel li {
          align-items: center;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          color: var(--washi-dim);
          display: grid;
          font-size: 13px;
          gap: 12px;
          grid-template-columns: 34px minmax(0, 1fr);
          letter-spacing: 0.03em;
          line-height: 1.6;
          padding: 0 0 12px;
        }

        .import-check-panel li::before {
          color: var(--gold);
          content: counter(import-check, decimal-leading-zero);
          counter-increment: import-check;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          line-height: 1;
        }

        .import-notice {
          border-left: 1px solid rgba(201,168,76,0.35);
          display: grid;
          gap: 14px;
          max-width: 980px;
          padding-left: clamp(18px, 3vw, 28px);
        }

        .import-notice p {
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.04em;
          line-height: 2;
          margin: 0;
        }

        .import-notice .btn-primary {
          justify-self: start;
          margin-top: 8px;
        }

        @media (max-width: 900px) {
          .buyer-guide-grid,
          .import-check-panel {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .import-check-panel li {
            align-items: start;
            grid-template-columns: 28px minmax(0, 1fr);
          }

          .import-notice .btn-primary {
            padding-left: 24px;
            padding-right: 24px;
          }
        }
      `}</style>
    </section>
  )
}
