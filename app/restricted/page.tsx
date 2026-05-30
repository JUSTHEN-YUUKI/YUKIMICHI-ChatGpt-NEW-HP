import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '禁止・制限品目 | YUKIMICHI - SNOWPATH JAPAN',
  description:
    'YUKIMICHIの禁止・制限品目ページ。日本側の輸出規制、相手国の輸入規制、配送会社の引受条件、危険品判定、認証・許可確認について。',
}

const categories = [
  {
    code: 'A',
    title: '医薬品・医療関連品',
    items: ['医薬品', '医療機器', 'サプリメント', '成分確認が必要な商品'],
    note: '国・成分・用途により規制が異なるため、事前確認が必要です。',
  },
  {
    code: 'B',
    title: '食品・飲料',
    items: ['食品', '加工食品', '健康食品', '動植物由来成分を含む商品'],
    note: '輸入国側の食品規制、検疫、成分表示、許可条件の確認が必要になる場合があります。',
  },
  {
    code: 'C',
    title: '化粧品・美容関連品',
    items: ['化粧品', 'スキンケア', '日焼け止め', '香水', '液体・スプレー商品'],
    note: '成分、容量、アルコール含有、航空危険物判定などにより対応可否が変わります。',
  },
  {
    code: 'D',
    title: '電池・電子機器',
    items: ['リチウム電池', 'モバイルバッテリー', '電子機器', 'ワイヤレス機器'],
    note: '電池の種類、容量、梱包状態、配送会社の条件により取り扱いが制限される場合があります。',
  },
  {
    code: 'E',
    title: '危険品・可燃物',
    items: ['スプレー缶', 'アルコール類', '塗料', '接着剤', '燃料', '高圧ガス'],
    note: '航空輸送・国際宅配便では制限が強い場合があります。事前確認が必要です。',
  },
  {
    code: 'F',
    title: '中古品・ブランド品',
    items: ['中古品', 'ブランド品', '時計', 'バッグ', '真贋確認が必要な商品'],
    note: '商品状態、真贋、証明書、相手国規制、知的財産権の観点から確認が必要です。',
  },
  {
    code: 'G',
    title: 'ワシントン条約・動植物関連',
    items: ['革製品', '毛皮', '木材', '動植物由来素材', '象牙・べっ甲等'],
    note: '素材や原産地により、輸出入規制や証明書が必要になる場合があります。',
  },
  {
    code: 'H',
    title: 'その他要確認品',
    items: ['高額商品', '精密機器', '大型貨物', '温度管理品', '法人向け特殊商品'],
    note: '商品条件、配送先国、梱包条件、保険要否により個別確認が必要です。',
  },
]

const requiredInfo = [
  '商品名',
  '商品URL',
  '数量',
  '成分・素材',
  '用途',
  'サイズ・重量',
  '配送先国・都市',
  '希望配送方法',
  '法人宛・個人宛',
  '証明書や安全データシートの有無',
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function RestrictedItemsPage() {
  return (
    <>
      <section className="restricted-hero">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">Restricted Items</span>
        </div>
        <h1 className="restricted-title">
          禁止・制限品目
          <br />
          <em>Restricted &amp; Regulated Items</em>
        </h1>
        <p className="section-body restricted-lead">
          国際輸送では、商品内容や配送先国により、輸出・輸入・配送会社の引受条件が異なります。
          YUKIMICHIでは、法令遵守と透明性を前提に、取り扱い可否を事前に確認します。
        </p>
      </section>

      <section className="restricted-policy">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Compliance First</span>
          </div>
          <h2>法令遵守を前提とした輸出支援</h2>
        </div>
        <div className="restricted-policy-card">
          <p>
            YUKIMICHIは、内容品の虚偽申告、規制逃れ、配送会社の引受条件に反する手配は行いません。
            商品内容・数量・成分・用途・配送先国により対応可否が変わるため、安全で透明性のある取引を重視します。
          </p>
          <p>
            規制品・要確認品については、事前確認なしでの手配はできません。
            最終的な輸出入可否は、税関・通関業者・配送会社・公的機関等の確認を前提とします。
          </p>
        </div>
      </section>

      <section className="restricted-categories">
        <div className="restricted-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Categories</span>
          </div>
          <h2>事前確認が必要になりやすい商品カテゴリ</h2>
          <p>
            以下は代表的な確認対象です。記載のない商品でも、国・数量・用途・成分・配送方法により個別確認が必要となる場合があります。
          </p>
        </div>

        <div className="restricted-grid">
          {categories.map((category) => (
            <article className="restricted-card" key={category.code}>
              <div className="restricted-card__top">
                <span>{category.code}</span>
                <h3>{category.title}</h3>
              </div>
              <ul>
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{category.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="restricted-info">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Required Information</span>
          </div>
          <h2>確認に必要な情報</h2>
          <p>
            取り扱い可否や配送方法を確認する際は、商品ページだけでなく、成分・素材・用途・配送先情報があると確認が進めやすくなります。
          </p>
        </div>
        <ol className="restricted-info-list">
          {requiredInfo.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="restricted-notice">
        <div className="restricted-notice-inner">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Important Notice</span>
          </div>
          <h2>Important Notice</h2>
          <p>
            本ページは一般的な確認項目を整理したものであり、法的判断を保証するものではありません。
            実際の輸出入可否、関税、VAT/GST、認証、許可、配送会社の引受可否は、
            商品内容・配送先国・最新の規制により異なります。
          </p>
          <p>
            最終確認は、税関・通関業者・配送会社・公的機関等の確認を前提とします。
            無理な輸出、虚偽申告、内容物を偽る発送は行いません。
          </p>
        </div>
      </section>

      <section className="restricted-cta">
        <div>
          <span>Check Before Export</span>
          <h2>取り扱い可否を確認する</h2>
          <p>
            商品URL、数量、配送先国、希望配送方法を添えてご相談ください。見積前の取扱可否確認も承ります。
          </p>
          <a href="mailto:exporter@justhen.co.jp" className="restricted-mail">
            exporter@justhen.co.jp
          </a>
        </div>
        <div className="restricted-cta-actions">
          <Link href="/contact" className="btn-primary">
            お問い合わせ <ArrowRight />
          </Link>
          <Link href="/quote" className="btn-ghost">
            お見積りへ進む <ArrowRight />
          </Link>
        </div>
      </section>

      <style>{`
        .restricted-hero {
          min-height: 70svh;
          padding: calc(var(--nav-h) + 88px) var(--gutter) 76px;
          background:
            radial-gradient(ellipse 70% 46% at 78% 22%, rgba(201,168,76,0.09), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 58%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.12);
        }

        .restricted-title {
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-weight: 300;
          font-size: clamp(42px, 7.3vw, 92px);
          line-height: 1.05;
          color: var(--washi);
          margin-bottom: 28px;
        }

        .restricted-title em {
          color: var(--gold);
          font-style: italic;
          font-size: 0.68em;
        }

        .restricted-lead {
          max-width: 820px;
        }

        .restricted-policy,
        .restricted-info {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(28px, 5vw, 72px);
          background: var(--navy-deep);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .restricted-policy h2,
        .restricted-info h2,
        .restricted-notice h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 300;
          line-height: 1.25;
          margin: 0;
        }

        .restricted-policy-card {
          display: grid;
          gap: 18px;
          border: 1px solid rgba(201,168,76,0.16);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.2), transparent 48%),
            rgba(13,28,53,0.72);
          padding: clamp(26px, 4vw, 42px);
        }

        .restricted-policy-card p,
        .restricted-info p,
        .restricted-notice p,
        .restricted-cta p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2.1;
          margin: 0;
        }

        .restricted-categories {
          padding: var(--section-pad) var(--gutter);
          background:
            linear-gradient(180deg, var(--navy-mid) 0%, var(--navy-deep) 100%);
        }

        .restricted-section-head {
          max-width: 860px;
          margin-bottom: 44px;
        }

        .restricted-section-head h2 {
          color: var(--washi);
          font-size: clamp(26px, 4vw, 42px);
          font-weight: 300;
          letter-spacing: 0.1em;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .restricted-section-head p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2;
          margin: 0;
        }

        .restricted-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .restricted-card {
          display: grid;
          grid-template-rows: auto auto 1fr;
          gap: 18px;
          min-height: 360px;
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(13,28,53,0.92), rgba(7,17,31,0.82));
          padding: 24px;
        }

        .restricted-card__top {
          display: grid;
          gap: 14px;
        }

        .restricted-card__top span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border: 1px solid rgba(201,168,76,0.34);
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          line-height: 1;
        }

        .restricted-card h3 {
          color: var(--washi);
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.7;
          margin: 0;
        }

        .restricted-card ul {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .restricted-card li {
          border: 1px solid rgba(248,245,239,0.1);
          color: var(--washi-dim);
          background: rgba(5,14,26,0.48);
          font-size: 11px;
          letter-spacing: 0.06em;
          line-height: 1.5;
          padding: 6px 9px;
        }

        .restricted-card p {
          align-self: end;
          border-top: 1px solid rgba(201,168,76,0.1);
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.04em;
          line-height: 2;
          margin: 0;
          padding-top: 16px;
        }

        .restricted-info {
          background: var(--navy-deep);
        }

        .restricted-info-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .restricted-info-list li {
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

        .restricted-info-list span {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
        }

        .restricted-notice {
          padding: 0 var(--gutter) var(--section-pad);
          background: var(--navy-deep);
        }

        .restricted-notice-inner {
          max-width: 1180px;
          margin: 0 auto;
          border: 1px solid rgba(201,168,76,0.18);
          background:
            linear-gradient(90deg, rgba(139,30,47,0.24), transparent 50%),
            rgba(13,28,53,0.82);
          padding: clamp(30px, 5vw, 56px);
        }

        .restricted-notice h2 {
          color: var(--gold);
          margin-bottom: 20px;
        }

        .restricted-notice p + p {
          margin-top: 14px;
        }

        .restricted-cta {
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

        .restricted-cta > div:first-child {
          max-width: 720px;
        }

        .restricted-cta span {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.32em;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        .restricted-cta h2 {
          color: var(--washi);
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 300;
          letter-spacing: 0.1em;
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .restricted-mail {
          display: inline-flex;
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 4vw, 38px);
          font-weight: 300;
          line-height: 1.2;
          margin-top: 20px;
          overflow-wrap: anywhere;
          text-decoration: none;
        }

        .restricted-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: flex-end;
        }

        @media (max-width: 1180px) {
          .restricted-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .restricted-policy,
          .restricted-info {
            grid-template-columns: 1fr;
          }

          .restricted-cta {
            align-items: flex-start;
            flex-direction: column;
          }

          .restricted-cta-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .restricted-grid,
          .restricted-info-list {
            grid-template-columns: 1fr;
          }

          .restricted-card {
            min-height: auto;
          }
        }
      `}</style>
    </>
  )
}
