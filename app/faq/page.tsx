import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ | YUKIMICHI - SNOWPATH JAPAN',
  description: 'YUKIMICHIのFAQ。小ロット対応、配送会社、関税・VAT/GST、輸出できない商品、見積、納期、支払い、法人・個人対応について。',
}

const faqs = [
  {
    q: '小ロットや1個からの輸出にも対応できますか？',
    a: '対応可能です。サンプル出荷、テスト販売、越境EC向けの小ロット発送を前提に、EMS、DHL、FedEx、UPS、ヤマト国際宅急便などを比較します。ただし商品や仕向地により輸出入条件が異なります。',
  },
  {
    q: 'どの配送会社を利用できますか？',
    a: 'EMS、DHL、FedEx、UPS、ヤマト国際宅急便、航空貨物、海上輸送、FCL、LCLを案件に応じて比較します。価格だけでなく、配送速度、破損リスク、追跡性、通関難易度を考慮します。',
  },
  {
    q: '航空貨物と海上輸送の違いは何ですか？',
    a: '航空貨物は納期を重視する中量から高額品に向きます。海上輸送は大量発送やコスト重視の継続取引に向きます。FCLはコンテナ単位、LCLは混載便として検討します。',
  },
  {
    q: '関税、VAT/GSTは見積に含まれますか？',
    a: '関税、VAT/GSTは原則として輸入国側で発生する費用です。概算や参考情報は提示できますが、税額や課税判断は税関、通関業者、公的機関の最新情報確認が必要です。',
  },
  {
    q: '輸出できない商品はありますか？',
    a: 'あります。危険品、規制品、偽造品、輸出管理対象品、相手国で輸入制限がある商品などは取り扱えない場合があります。食品、酒類、化粧品、電気製品、中古品も国ごとに条件確認が必要です。',
  },
  {
    q: '見積に必要な情報は何ですか？',
    a: '商品名、商品URL、数量、仕向国、希望納期、希望配送方法、法人または個人の区分、用途、購入予算があると確認が早くなります。サイズや重量がわかる場合はあわせてお知らせください。',
  },
  {
    q: '納期はどのくらいですか？',
    a: '商品調達の所要日数、梱包、書類準備、配送方法、通関状況により変動します。Expressは比較的短納期、海上輸送は長めのリードタイムになります。正式見積時に目安を提示します。',
  },
  {
    q: '支払い方法は何に対応していますか？',
    a: '銀行振込を基本とし、案件により Stripe、PayPal、Wise などを検討できます。初回取引や商品調達を伴う案件では、原則として事前入金後の手配開始となります。',
  },
  {
    q: '法人だけでなく個人からも依頼できますか？',
    a: '法人、個人どちらも相談可能です。法人取引では継続調達や卸向け輸出、個人では小ロットやサンプル発送を中心に、内容を確認したうえで対応可否を判断します。',
  },
  {
    q: '中古品の輸出はできますか？',
    a: '商品カテゴリ、状態、仕向地の輸入規制により判断が必要です。YUKIMICHIは古物商許可を前提に相談を受けますが、最終的な輸出入可否は税関、通関業者、公的機関の確認が必要です。',
  },
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="faq-hero">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">FAQ</span>
        </div>
        <h1 className="faq-title">
          Before You
          <br />
          <em>Export.</em>
        </h1>
        <p className="section-body faq-lead">
          小ロット輸出、配送、関税、規制確認、支払いについて、よくある質問を整理しました。
          法令や規制は商品・国・時期により変わるため、最終判断は税関、通関業者、公的機関の確認を前提とします。
        </p>
      </section>

      <section className="faq-section">
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <article className="faq-item" key={faq.q}>
              <div className="faq-number">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <h2>{faq.q}</h2>
                <p>{faq.a}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-cta">
        <p>案件ごとの規制確認や見積は、商品情報と仕向地を添えてお問い合わせください。</p>
        <div>
          <Link href="/contact" className="btn-primary">
            問い合わせる <ArrowRight />
          </Link>
          <Link href="/pricing" className="btn-ghost">
            料金表を見る <ArrowRight />
          </Link>
        </div>
      </section>

      <style>{`
        .faq-hero {
          min-height: 68svh;
          padding: calc(var(--nav-h) + 84px) var(--gutter) 72px;
          background:
            radial-gradient(ellipse 70% 48% at 78% 24%, rgba(201,168,76,0.08), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 62%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .faq-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(46px, 8vw, 96px);
          line-height: 0.98;
          color: var(--washi);
          margin-bottom: 28px;
        }
        .faq-title em { color: var(--gold); font-style: italic; }
        .faq-lead { max-width: 760px; }
        .faq-section { padding: var(--section-pad) var(--gutter); }
        .faq-list {
          display: grid;
          gap: 16px;
        }
        .faq-item {
          display: grid;
          grid-template-columns: 64px minmax(0, 1fr);
          gap: 24px;
          padding: 28px;
          border: 1px solid rgba(201,168,76,0.12);
          background: linear-gradient(90deg, rgba(13,28,53,0.92), rgba(7,17,31,0.78));
        }
        .faq-number {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          font-weight: 300;
          line-height: 1;
        }
        .faq-item h2 {
          color: var(--washi);
          font-size: 17px;
          font-weight: 300;
          line-height: 1.8;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
        }
        .faq-item p {
          color: var(--washi-dim);
          font-size: 13px;
          line-height: 2;
          letter-spacing: 0.04em;
        }
        .faq-cta {
          padding: 64px var(--gutter);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          background: var(--navy-mid);
          border-top: 1px solid rgba(201,168,76,0.08);
        }
        .faq-cta p {
          max-width: 620px;
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.08em;
        }
        .faq-cta div { display: flex; flex-wrap: wrap; gap: 14px; }
        @media (max-width: 760px) {
          .faq-item { grid-template-columns: 1fr; gap: 10px; }
          .faq-cta { align-items: flex-start; flex-direction: column; }
        }
      `}</style>
    </>
  )
}
