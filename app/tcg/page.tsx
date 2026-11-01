import Link from 'next/link'
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
    <TradeNotice />
  </>
}
