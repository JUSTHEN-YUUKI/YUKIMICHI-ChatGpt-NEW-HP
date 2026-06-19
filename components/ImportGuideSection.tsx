import ScrollReveal from "@/components/ScrollReveal"

const individualNotes = [
  {
    ja: "個人輸入は、少量・個人利用を前提とするため、通関業者の手配ができない場合や、対応範囲が限られる場合があります。",
    en: "Personal imports are usually small shipments for private use, so customs broker support may be unavailable or limited.",
  },
  {
    ja: "関税、輸入税、輸入許可、受取国側の規制は、お客様側で事前確認が必要です。",
    en: "Buyers should check duties, import taxes, permits, and destination-country regulations in advance.",
  },
  {
    ja: "小口貨物は、EMS・DHL・FedEx・UPSなどの国際宅配便を中心に配送方法を確認します。",
    en: "For small shipments, we mainly review international courier options such as EMS, DHL, FedEx, and UPS.",
  },
]

const businessNotes = [
  {
    ja: "法人輸入は、貨物内容・数量・取引条件に応じて、通関業者やフォワーダーとの連携を検討できます。",
    en: "For business imports, coordination with customs brokers or freight forwarders can be reviewed based on the cargo, volume, and trade terms.",
  },
  {
    ja: "Invoice、Packing List、商品情報、HS Code確認用資料など、見積・輸出手配に必要な情報を整理します。",
    en: "We organize the information needed for quotation and export arrangements, including invoices, packing lists, product details, and HS Code review materials.",
  },
  {
    ja: "国際宅配便、航空貨物、海上輸送を比較し、数量・納期・品目に合う方法を提案します。",
    en: "We compare international courier, air freight, and sea freight options and propose a method suited to the quantity, timeline, and product category.",
  },
]

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
            <span className="copy-line-ja">
              海外のお客様が日本商品を購入・輸入する前に、個人利用の小口輸入と法人取引の輸入で、確認すべき手続き・書類・配送方法を分けてご案内します。
            </span>
            <span className="copy-line-en">
              Before purchasing or importing Japanese products, overseas buyers can review the key
              differences between small personal imports and business imports, including procedures,
              documents, and shipping options.
            </span>
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="buyer-guide-grid">
          <article className="buyer-guide-panel">
            <span className="guide-panel-kicker">Individual Buyers</span>
            <h3>
              個人のお客様
              <span>Personal Import / Small Shipment Review</span>
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
              <span>Business Import / Commercial Shipment Review</span>
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

        .buyer-guide-panel h3 {
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

        @media (max-width: 900px) {
          .buyer-guide-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
