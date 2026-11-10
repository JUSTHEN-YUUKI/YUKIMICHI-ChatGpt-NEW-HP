import Link from 'next/link'
import Image from 'next/image'
import Bilingual from '@/components/tcg/Bilingual'
import TradeNotice from '@/components/tcg/TradeNotice'
import { categories } from '@/lib/tcg/catalog'
import { tcgMetadata } from '@/lib/tcg/metadata'

export const metadata = tcgMetadata('日本のトレーディングカードを世界の事業者へ',
  '海外法人・個人事業主向けに、日本のポケモンカード・ONE PIECEカードの仕入れ可否調査、国内取引調整、国際配送手配を支援します。Japanese TCG sourcing inquiries for business buyers.', '/tcg')

const services = [
  { ja: '国内仕入れ可否調査', en: 'Sourcing Availability Check' },
  { ja: '国内仕入先との調整', en: 'Supplier Coordination' },
  { ja: 'ケース単位の見積確認', en: 'Case-Level Quotation Support' },
  { ja: '国際配送手配支援', en: 'International Shipping Coordination' },
]

export default function TcgHome() {
  return <>
    <section className="tcg-hero">
      <div className="tcg-hero-copy">
        <p className="tcg-eyebrow">FROM JAPAN. FOR YOUR BUSINESS.</p>
        <h1><Bilingual ja="日本のトレーディングカードを、世界の事業者へ。" en="Japanese Trading Cards for Global Business Buyers." /></h1>
        <p className="tcg-lead"><Bilingual
          ja="海外の法人・個人事業主を対象に、日本のトレーディングカードの仕入れ可否調査、国内取引調整、国際配送手配を支援します。"
          en="We assist companies and sole proprietors worldwide with Japanese trading card sourcing inquiries, supplier coordination, and international shipping arrangements." /></p>
        <Link href="/tcg/quote" className="tcg-button"><Bilingual ja="お見積り・仕入れのご相談" en="Request a Quote" /><span aria-hidden="true">↗</span></Link>
        <p className="tcg-hero-note"><Bilingual ja="法人・個人事業主の事業用仕入れを対象としています。" en="For companies and sole proprietors purchasing for business." /></p>
      </div>
      <div className="tcg-hero-art" aria-hidden="true"><span className="tcg-art-line" /><div className="tcg-art-card tcg-art-card-back" /><div className="tcg-art-card tcg-art-card-front"><span>YUKIMICHI</span><strong>TCG<br />B2B</strong><small>JAPAN → GLOBAL BUSINESS</small></div><span className="tcg-art-caption">SOURCING · COORDINATION · EXPORT SUPPORT</span></div>
    </section>
    <section className="tcg-section">
      <div className="tcg-section-heading"><p className="tcg-eyebrow">TWO CATEGORIES. ONE JAPAN-BASED PARTNER.</p><h2><Bilingual ja="ご希望のカテゴリーから。" en="Start with Your Category." /></h2></div>
      <div className="tcg-category-grid">{categories.map((category, index) => <Link key={category.id} href={`/tcg/${category.id}`} className={`tcg-category-card tcg-category-${category.id}`}>
        <span className="tcg-category-index" aria-hidden="true">0{index + 1} / JAPANESE TCG</span>
        <h3><Bilingual {...category.name} /></h3>
        <p><Bilingual ja="商品情報・仕入れのご相談" en="Product References & Sourcing Inquiries" /></p>
        <span className="tcg-category-arrow" aria-hidden="true">↗</span>
      </Link>)}</div>
    </section>
    <section className="tcg-section tcg-services">
      <div className="tcg-section-heading"><p className="tcg-eyebrow">OUR ROLE</p><h2><Bilingual ja="日本側の確認と調整を、丁寧に。" en="Practical Support on the Japan Side." /></h2></div>
      <div className="tcg-service-grid">{services.map((service, index) => <article key={service.en}><span className="tcg-number">0{index + 1}</span><h3><Bilingual {...service} /></h3></article>)}</div>
      <p className="tcg-lead"><Bilingual ja="カードショップ、TCG専門EC、輸入・卸売事業者などからのご相談を承ります。一般個人の趣味目的の購入は、初期段階では原則対象外です。"
        en="We welcome inquiries from card shops, TCG e-commerce businesses, importers, and wholesalers. Personal hobby purchases are generally outside our initial scope." /></p>
    </section>
    <section className="tcg-section" aria-labelledby="tcg-payment-terms">
      <div className="tcg-section-heading flex flex-wrap items-center gap-4">
        <h2 id="tcg-payment-terms"><Bilingual ja="お支払い・取引条件" en="Payment & Terms" /></h2>
        <span className="flex h-10 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#edf8dd]">
          <Image src="/wise-wordmark.png" alt="" width={72} height={72} unoptimized />
        </span>
      </div>
      <div lang="ja">
        <p className="tcg-lead">TCG商品のご注文は、正式なお見積り・請求書の内容にご同意いただいた後、日本円（JPY）による全額前払いをお願いしております。</p>
        <p className="tcg-lead">お支払いは、株式会社ジャッセン指定の法人口座への銀行振込、またはWiseを利用した同口座への海外送金に対応しています。</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>お支払い通貨：日本円（JPY）</li>
          <li>お支払い条件：請求金額の100%前払い</li>
          <li>お振込先：株式会社ジャッセン指定法人口座</li>
          <li>海外送金：Wiseまたは通常の銀行送金（T/T）</li>
          <li>送金・銀行手数料：原則としてお客様負担</li>
          <li>商品手配：弊社での全額着金確認後に開始</li>
        </ul>
        <p className="tcg-lead">正式な振込先情報は、請求書発行時に個別にご案内いたします。</p>
        <p className="tcg-lead">在庫状況、最終金額、送料、キャンセル・返金条件については、ご注文確定前に個別に確認いたします。</p>
      </div>
      <div lang="en">
        <p className="tcg-lead">All TCG orders require 100% advance payment in Japanese Yen (JPY), based on an agreed quotation and invoice.</p>
        <p className="tcg-lead">Payments can be made by bank transfer to JUSTHEN Co., Ltd.&apos;s designated corporate bank account, either through Wise or a conventional international bank transfer (T/T).</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Currency: Japanese Yen (JPY)</li>
          <li>Payment Terms: 100% advance payment of the invoiced amount</li>
          <li>Beneficiary: JUSTHEN Co., Ltd.</li>
          <li>Payment Methods: Wise transfer or bank transfer (T/T)</li>
          <li>Transfer and Bank Fees: Generally borne by the buyer</li>
          <li>Order Processing: Begins after full payment has been received and verified</li>
        </ul>
        <p className="tcg-lead">Official bank details will be provided individually with the invoice.</p>
        <p className="tcg-lead">Stock availability, final pricing, shipping charges, and cancellation or refund terms will be confirmed before the order is finalized.</p>
      </div>
    </section>
    <TradeNotice />
  </>
}
