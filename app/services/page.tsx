import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'
import { TranslatedText } from '@/components/TranslatedText'

export const metadata: Metadata = {
  title: 'サービス | YUKIMICHI',
  description:
    'YUKIMICHIの日本側輸出調整・手配サービス。日本商品の仕入れ可否調査、国内取引調整、購入調整、輸出関連手配、書類・配送確認まで。',
  alternates: { canonical: '/services' },
}

const coreServices = [
  {
    code: '01',
    title: '日本商品の仕入れ可否調査',
    en: 'Product Availability & Sourcing Checks',
    points: [
      '海外バイヤーの希望商品について、日本国内のメーカー・卸・販売元へ確認します。',
      '商品名、URL、数量、希望条件をもとに確認準備を支援します。',
      '価格、在庫、輸出可否、取引可否は案件ごとに確認します。',
    ],
    note: 'YUKIMICHIが在庫販売を行うことを示すものではありません。',
  },
  {
    code: '02',
    title: '仕入先・購入条件の調整',
    en: 'Supplier & Purchase Coordination',
    points: [
      '国内取引条件、購入可否、見積、支払条件、納期を確認します。',
      '海外バイヤーとの取引調整を日本側窓口として支援します。',
      '仕入先名、担当者、直接連絡先、卸条件は原則として開示しません。',
    ],
    note: '正式な取引条件は仕入先確認後に個別に整理します。',
  },
  {
    code: '03',
    title: '輸出書類確認・作成支援',
    en: 'Export Documentation Support',
    points: [
      'Commercial Invoice、Packing List の確認・作成支援を行います。',
      'SDS、成分表、原産地関連書類などの有無を案件ごとに確認します。',
      '必要書類は商品内容、輸送方法、配送先国、取引条件により異なります。',
    ],
    note: '公的証明や認証取得の可否は関係機関の確認が前提です。',
  },
  {
    code: '04',
    title: '国際宅配便・クーリエ手配',
    en: 'International Courier Coordination',
    points: [
      'EMS、DHL、FedEx、UPS、ヤマト国際宅急便などを案件ごとに確認します。',
      '少量、サンプル、小口貨物向けの配送方法確認を支援します。',
      '配送会社の引受可否、サイズ、重量、内容品条件を整理します。',
    ],
    note: 'YUKIMICHIが国際物流会社として実輸送を保証するものではありません。',
  },
  {
    code: '05',
    title: '航空貨物手配・フォワーダー調整',
    en: 'Air Freight Coordination',
    points: [
      '短納期、高付加価値商品、一定数量の商品について航空貨物を確認します。',
      'フォワーダー、配送会社、通関業者との確認事項を整理します。',
      '危険品、電池、液体、スプレー等は事前確認が必要です。',
    ],
    note: '航空輸送の可否は配送会社・関係機関の判断を前提とします。',
  },
  {
    code: '06',
    title: '海上輸送手配・LCL/FCL調整',
    en: 'Sea Freight Coordination',
    points: [
      'LCL、FCL、パレット単位、大口貨物の海上輸送条件を確認します。',
      'フォワーダー、通関業者、港湾関連費用の確認を支援します。',
      '納期、梱包条件、輸入側手配の有無を整理します。',
    ],
    note: '海上輸送の費用・納期は貨物条件と輸送ルートにより変動します。',
  },
  {
    code: '07',
    title: '規制品・輸出可否確認',
    en: 'Compliance & Restricted Item Review',
    points: [
      '医薬品、食品、化粧品、電池、危険品などは事前確認します。',
      '中古品、ブランド品、動植物由来素材も必要書類や取扱可否を確認します。',
      '内容品の虚偽申告や規制逃れを前提とした手配は行いません。',
    ],
    note: '最終判断は税関、通関業者、配送会社、公的機関等の確認が前提です。',
  },
  {
    code: '08',
    title: '海外バイヤー対応支援',
    en: 'Buyer Communication Support',
    points: [
      '日本側の確認結果を整理し、海外バイヤーに分かりやすく共有します。',
      '必要に応じて英語での確認文面整理も支援します。',
      '不足情報、確認事項、次の判断材料を明確にします。',
    ],
    note: '取引成立、輸入許可、販売可否を保証するものではありません。',
  },
]

const supportScope = [
  '商品情報の整理',
  '商品の仕入れ可否調査',
  '仕入先への確認・連絡支援',
  '国内取引条件の整理',
  '購入条件・見積条件の整理',
  '国際配送方法の比較',
  '航空貨物・海上輸送の確認',
  'Invoice / Packing List 等の基本書類整理',
  'SDS / 成分表等の確認',
  '禁止・制限品目の事前確認',
  '海外バイヤーとの取引条件整理',
]

const limitations = [
  '相手国での最終的な輸入許可',
  '税関による最終判断',
  '関税・VAT/GSTの最終金額',
  'HSコードの最終分類',
  '原産地証明・各種認証の発給可否',
  'FDA、CE、FCC、CPSIA等の認証取得代行',
  '危険品の最終輸送可否',
  '配送会社の最終引受判断',
  '輸入国での販売可否',
  '配送遅延が発生しないことの保証',
]

const roleItems = [
  {
    actor: 'YUKIMICHI',
    ja: '日本側の仕入れ可否調査、国内取引調整、書類整理、配送手配支援',
    en: 'Japan-side product availability checks, domestic transaction coordination, document organization, and shipping arrangement support.',
  },
  {
    actor: 'Supplier',
    ja: '商品供給、成分表、SDS/MSDS、商品資料の提供',
    en: 'Product supply, ingredient lists, SDS/MSDS, and product documentation.',
  },
  {
    actor: 'Freight Forwarder / Carrier',
    ja: '実輸送、引受可否判断、運送約款に基づく輸送',
    en: 'Actual transportation, acceptance decisions, and carriage under carrier terms.',
  },
  {
    actor: 'Customs Broker',
    ja: '必要に応じた輸出入申告手続き',
    en: 'Export or import declaration procedures when required for the transaction.',
  },
  {
    actor: 'Importer / Buyer',
    ja: '輸入国側の許可、関税・税金、販売可否、現地規制確認',
    en: 'Destination-side permits, duties and taxes, sales eligibility, and local regulatory checks.',
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
]

const relatedLinks = [
  { href: '/quote', label: 'お見積り', en: 'Quote Request' },
  { href: '/contact', label: 'お問い合わせ', en: 'Contact' },
  { href: '/restricted-items', label: '禁止・制限品目', en: 'Restricted Items' },
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
          <span className="section-label-text">JAPAN EXPORT COORDINATION</span>
        </div>
        <h1 className="services-title">
          <TranslatedText id="pages.services.heroTitle" fallback="Japan Export Coordination & Arrangement" />
        </h1>
        <p className="services-hero-subtitle">
          <TranslatedText id="pages.services.heroSubtitle" fallback="日本側の輸出調整・手配サービス" />
        </p>
        <article className="services-domestic-support" aria-labelledby="domestic-support-title">
          <div className="services-domestic-support__head">
            <span>EXPORT COORDINATION SERVICES</span>
            <h2 id="domestic-support-title">Japan Export Coordination & Arrangement</h2>
            <p className="services-domestic-support__subtitle-ja">
              日本商品の仕入れ可否調査・国内取引調整・輸出関連手配
            </p>
            <p className="services-domestic-support__subtitle-en">
              Product availability checks, supplier communication, purchase coordination, document review, and shipping arrangement support from Japan.
            </p>
          </div>
          <div className="services-domestic-support__body">
            <div className="services-domestic-support__copy services-domestic-support__copy--ja">
              <p lang="ja">
                YUKIMICHIは、日本国内法人として、海外バイヤー向けに日本商品の仕入れ可否調査、国内取引調整、購入調整、輸出関連手配、書類確認、配送方法の確認を支援します。
              </p>
              <p lang="ja">
                在庫販売会社・国際物流会社ではなく、案件ごとにメーカー・卸・配送会社・関係機関へ確認しながら、日本側の実務調整を行います。
              </p>
            </div>
            <div className="services-domestic-support__copy services-domestic-support__copy--en">
              <p lang="en">
                YUKIMICHI provides Japan-side export coordination services for overseas buyers, including product availability checks, supplier communication, purchase coordination, document review, and shipping arrangement support.
              </p>
              <p lang="en">
                We are not an inventory sales company or an international carrier. Each case is reviewed with suppliers, carriers, brokers, and relevant parties as needed.
              </p>
            </div>
          </div>
          <div className="services-domestic-support__highlight">
            <p lang="ja">
              日本国内のメーカー、卸、販売店などの情報をもとに、海外バイヤーの希望に合う商品を整理し、取引可否、価格、在庫、輸出・配送の取扱可否を案件ごとに確認します。
            </p>
            <p lang="en">
              Product availability, pricing, stock status, transaction terms, and export or shipping feasibility are reviewed case by case with suppliers and relevant parties.
            </p>
          </div>
        </article>
        <div className="services-hero-actions">
          <Link href="/quote" className="btn-primary">
            <TranslatedText id="common.quote" fallback="お見積りへ進む" /> <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            <TranslatedText id="common.contact" fallback="お問い合わせ" /> <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="services-core">
        <div className="services-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Core Services</span>
          </div>
          <h2><TranslatedText id="pages.services.coreTitle" fallback="輸出実務を前提としたサービス" /></h2>
          <p>
            <TranslatedText id="pages.services.coreLead" fallback="仕入先確認、国内取引調整、輸出手配、書類・物流調整まで、問い合わせ前に確認すべき実務項目を整理します。" />
          </p>
        </div>

        <div className="services-grid">
          {coreServices.map((service, serviceIndex) => (
            <article className="service-card" key={service.code}>
              <div className="service-card__head">
                <span>{service.code}</span>
                <div>
                  <h2><TranslatedText id={`pages.services.coreItems.${serviceIndex}.title`} fallback={service.title} /></h2>
                  <p><TranslatedText id={`pages.services.coreItems.${serviceIndex}.en`} fallback={service.en} /></p>
                </div>
              </div>
              <ul>
                {service.points.map((point, pointIndex) => (
                  <li key={point}><TranslatedText id={`pages.services.coreItems.${serviceIndex}.points.${pointIndex}`} fallback={point} /></li>
                ))}
              </ul>
              <p className="service-card__note"><TranslatedText id={`pages.services.coreItems.${serviceIndex}.note`} fallback={service.note} /></p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-scope">
        <article className="services-list-panel">
          <span className="services-kicker">Support Scope</span>
          <h2><TranslatedText id="pages.services.supportTitle" fallback="対応範囲" /></h2>
          <p><TranslatedText id="pages.services.supportLead" fallback="YUKIMICHIが実務上の整理・確認・手配相談として対応できる主な範囲です。" /></p>
          <ul>
            {supportScope.map((item, index) => (
              <li key={item}><TranslatedText id={`pages.services.supportScope.${index}`} fallback={item} /></li>
            ))}
          </ul>
        </article>

        <article className="services-list-panel services-list-panel--muted">
          <span className="services-kicker">Limitations</span>
          <h2><TranslatedText id="pages.services.limitationsTitle" fallback="対応範囲外・保証できないこと" /></h2>
          <p>
            <TranslatedText id="pages.services.limitationsLead" fallback="これらは商品内容・配送先国・最新規制により判断が変わるため、必要に応じて税関・通関業者・配送会社・公的機関等の確認を前提とします。" />
          </p>
          <ul>
            {limitations.map((item, index) => (
              <li key={item}><TranslatedText id={`pages.services.limitations.${index}`} fallback={item} /></li>
            ))}
          </ul>
        </article>
      </section>

      <section className="services-role">
        <div className="services-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Role / 役割分担</span>
          </div>
          <h2>YUKIMICHIは運送会社そのものではありません</h2>
          <p>
            YUKIMICHIは日本側の輸出手配支援会社として、仕入れ可否調査、仕入先連絡、書類整理、配送手配支援を行います。
            実輸送、通関判断、輸入国側の許可・税金・販売可否は、関係事業者または輸入者側の確認が前提です。
          </p>
        </div>

        <div className="services-role-grid">
          {roleItems.map((item) => (
            <article className="services-role-card" key={item.actor}>
              <span>{item.actor}</span>
              <p>{item.ja}</p>
              <small>{item.en}</small>
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
          <h2 className="services-heading-nowrap"><TranslatedText id="pages.services.requiredTitle" fallback="見積・確認に必要な情報" /></h2>
          <div className="services-info-note">
            <p>
              <TranslatedText
                id="pages.services.requiredLead"
                fallback="具体的な商品情報があるほど、配送可否、送料、規制確認、リードタイムの確認が進めやすくなります。"
              />
            </p>
            <small>
              <TranslatedText
                id="pages.services.requiredNote"
                fallback="具体的な商品情報が未確定の場合でも、ご相談内容に応じて確認項目を整理します。"
              />
            </small>
          </div>
        </div>
        <ol className="services-info-list">
          {requiredInfo.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <TranslatedText id={`pages.services.requiredInfo.${index}`} fallback={item} />
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
          <h2><TranslatedText id="pages.services.complianceTitle" fallback="法令遵守を前提とした輸出支援" /></h2>
          <p>
            <TranslatedText id="pages.services.complianceBody1" fallback="YUKIMICHIは、内容品の虚偽申告、規制逃れ、配送会社の引受条件に反する手配は行いません。商品内容、配送先国、数量、用途により対応可否は変動します。" />
          </p>
          <p>
            <TranslatedText id="pages.services.complianceBody2" fallback="取扱可否に不安がある場合は、禁止・制限品目ページをご確認のうえ、事前にご相談ください。" />
          </p>
          <p>
            YUKIMICHIは日本側の輸出手配支援を行います。輸入国側の輸入許可、関税・税金、現地販売可否、通関手続き、各種認証については、個別に書面で合意した場合を除き、原則として輸入者側の責任となります。
          </p>
          <p lang="en">
            YUKIMICHI provides Japan-side export arrangement support. Final import approval, duties, taxes, permits, local sales eligibility, and customs clearance in the destination country remain the responsibility of the importer, unless otherwise agreed in writing.
          </p>
          <Link href="/restricted-items" className="services-inline-link">
            <TranslatedText id="pages.services.restrictedLink" fallback="禁止・制限品目を確認する" /> <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="services-related">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Related Links</span>
          </div>
          <h2><TranslatedText id="pages.services.relatedTitle" fallback="関連ページ" /></h2>
          <p><TranslatedText id="pages.services.relatedLead" fallback="見積、問い合わせ、取扱可否、取引条件、よくある質問を各ページで確認できます。" /></p>
        </div>
        <div className="services-related-grid">
          {relatedLinks.map((link, index) => (
            <Link href={link.href} className="services-related-card" key={link.href}>
              <span>{link.en}</span>
              <strong><TranslatedText id={`pages.services.relatedLabels.${index}`} fallback={link.label} /></strong>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>

      <section className="services-cta">
        <div>
          <span>Export Consultation</span>
          <h2><TranslatedText id="pages.services.ctaTitle" fallback="日本商品の仕入れ可否調査・輸出手配について相談する" /></h2>
          <p>
            <TranslatedText id="pages.services.ctaLead" fallback="日本商品の仕入れ可否調査、国内取引調整、輸出手配についてご相談ください。案件ごとに取扱可否、必要書類、配送方法を確認します。" />
          </p>
          <a href="mailto:exporter@justhen.co.jp" className="services-mail">
            <TranslatedText id="pages.services.ctaMail" fallback="exporter@justhen.co.jp へ相談する" />
          </a>
        </div>
        <div className="services-cta-actions">
          <Link href="/quote" className="btn-primary">
            <TranslatedText id="common.quote" fallback="お見積りへ進む" /> <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            <TranslatedText id="common.contact" fallback="お問い合わせ" /> <ArrowRight />
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

        .services-hero-subtitle {
          color: var(--washi);
          font-family: 'Noto Serif JP', serif;
          font-size: clamp(17px, 2.1vw, 25px);
          letter-spacing: 0.08em;
          line-height: 1.7;
          margin: -10px 0 34px;
        }

        .services-domestic-support {
          display: grid;
          gap: clamp(24px, 3.4vw, 38px);
          max-width: 1120px;
          margin: 28px 0 38px;
          border: 1px solid rgba(201,168,76,0.22);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.22), transparent 54%),
            linear-gradient(180deg, rgba(13,28,53,0.86), rgba(7,17,31,0.72));
          box-shadow: inset 0 1px 0 rgba(248,245,239,0.04);
          padding: clamp(28px, 4.8vw, 56px);
        }

        .services-domestic-support__head {
          max-width: 920px;
        }

        .services-domestic-support__head span {
          display: block;
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.34em;
          line-height: 1.7;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .services-domestic-support__head h2 {
          color: var(--gold);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 300;
          line-height: 1.02;
          margin: 0 0 16px;
        }

        .services-domestic-support__subtitle-ja,
        .services-domestic-support__subtitle-en {
          margin: 0;
        }

        .services-domestic-support__subtitle-ja {
          color: var(--washi);
          font-size: clamp(19px, 2.4vw, 28px);
          letter-spacing: 0.06em;
          line-height: 1.6;
        }

        .services-domestic-support__subtitle-en {
          color: rgba(248,245,239,0.78);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(18px, 2.2vw, 25px);
          letter-spacing: 0.04em;
          line-height: 1.55;
          margin-top: 8px;
        }

        .services-domestic-support__body {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .services-domestic-support__copy {
          display: grid;
          gap: 14px;
          border-top: 1px solid rgba(201,168,76,0.18);
          padding-top: 20px;
        }

        .services-domestic-support__copy p {
          color: var(--washi-dim);
          font-size: clamp(15px, 1.18vw, 16.5px);
          letter-spacing: 0.04em;
          line-height: 1.95;
          margin: 0;
        }

        .services-domestic-support__copy--en p {
          color: rgba(248,245,239,0.76);
          letter-spacing: 0.03em;
        }

        .services-domestic-support__highlight {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          border: 1px solid rgba(201,168,76,0.3);
          background:
            linear-gradient(90deg, rgba(201,168,76,0.12), transparent 58%),
            rgba(7,17,31,0.42);
          padding: clamp(20px, 2.6vw, 30px);
        }

        .services-domestic-support__highlight p {
          color: var(--washi);
          font-size: clamp(15.5px, 1.22vw, 17px);
          letter-spacing: 0.04em;
          line-height: 1.85;
          margin: 0;
        }

        .services-domestic-support__highlight p[lang="en"] {
          color: var(--gold-light);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(17px, 1.45vw, 20px);
          letter-spacing: 0.03em;
          line-height: 1.65;
        }

        .services-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .services-core,
        .services-role {
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
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .service-card {
          display: grid;
          align-content: start;
          gap: 18px;
          min-height: 300px;
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

        .services-heading-nowrap {
          font-size: clamp(24px, 3.1vw, 42px) !important;
          letter-spacing: 0;
          white-space: nowrap;
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

        .services-role {
          border-bottom: 1px solid rgba(201,168,76,0.08);
          border-top: 1px solid rgba(201,168,76,0.08);
        }

        .services-role-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .services-role-card {
          border: 1px solid rgba(201,168,76,0.16);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.14), transparent 52%),
            rgba(7,17,31,0.7);
          min-height: 220px;
          padding: clamp(22px, 3vw, 30px);
        }

        .services-role-card span {
          color: var(--gold);
          display: block;
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(22px, 2.5vw, 31px);
          font-weight: 300;
          line-height: 1.15;
          margin-bottom: 18px;
        }

        .services-role-card p {
          color: var(--washi);
          font-size: 13.5px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          margin: 0 0 14px;
        }

        .services-role-card small {
          border-top: 1px solid rgba(201,168,76,0.14);
          color: var(--washi-dim);
          display: block;
          font-size: 12.5px;
          letter-spacing: 0.03em;
          line-height: 1.8;
          padding-top: 14px;
        }

        .services-info,
        .services-related {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(320px, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(28px, 4vw, 56px);
          background: var(--navy-deep);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .services-info-note {
          max-width: 640px;
          border: 1px solid rgba(201,168,76,0.16);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.12), transparent 56%),
            rgba(13,28,53,0.58);
          padding: clamp(20px, 2.4vw, 28px);
        }

        .services-info-note p {
          color: var(--washi-dim);
          font-size: clamp(14px, 1.15vw, 16px);
          letter-spacing: 0.035em;
          line-height: 2;
          margin: 0;
          overflow-wrap: normal;
          word-break: keep-all;
        }

        .services-info-note small {
          display: block;
          border-top: 1px solid rgba(201,168,76,0.12);
          color: var(--suzu);
          font-size: 12.5px;
          letter-spacing: 0.035em;
          line-height: 1.8;
          margin-top: 16px;
          padding-top: 14px;
        }

        .services-info-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .services-info-list li {
          display: grid;
          grid-template-columns: 44px 1fr;
          align-items: center;
          gap: 12px;
          min-height: 56px;
          border: 1px solid rgba(201,168,76,0.12);
          background: rgba(13,28,53,0.66);
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.06em;
          padding: 11px 14px;
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
          .services-role-grid,
          .services-grid {
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

          .services-domestic-support__body,
          .services-domestic-support__highlight {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 680px) {
          .services-heading-nowrap {
            font-size: clamp(21px, 5.8vw, 30px) !important;
          }

          .services-grid,
          .services-role-grid,
          .services-info-list,
          .services-related-grid {
            grid-template-columns: 1fr;
          }

          .service-card {
            min-height: auto;
          }
        }
      `}</style>
    </>
  )
}
