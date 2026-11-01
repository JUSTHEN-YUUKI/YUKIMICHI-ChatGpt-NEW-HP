import Link from 'next/link'
import { categories, quoteHref, type TcgCategory } from '@/lib/tcg/catalog'
import Bilingual from './Bilingual'
import TcgPageHeading from './TcgPageHeading'
import TradeNotice from './TradeNotice'

export default function CategoryProducts({ category }: { category: TcgCategory }) {
  const info = categories.find(item => item.id === category)!
  return <>
    <TcgPageHeading {...info.name}
      descriptionJa="特定の商品・シリーズに限定せず、日本語版トレーディングカードの仕入れについてご相談いただけます。仕入れ可否・価格・数量条件は案件ごとに確認します。"
      descriptionEn="We welcome sourcing inquiries for any Japanese-edition product or series in this category. Availability, pricing, and order conditions are reviewed individually." />
    <section className="tcg-section" aria-label="仕入れのご相談 / Sourcing inquiries">
      <div className="tcg-section-heading">
        <p className="tcg-eyebrow">OPEN PRODUCT INQUIRIES</p>
        <h2><Bilingual ja="ご希望の商品をお知らせください。" en="Tell Us What You Need." /></h2>
      </div>
      <p className="tcg-lead"><Bilingual
        ja="商品名・シリーズ名、BOXまたはCARTONの希望数量、配送先などをお知らせください。掲載商品に限定せず、国内仕入先への確認・調整を支援します。"
        en="Share the product or series name, requested quantity in BOX or CARTON units, and your destination. We assist with Japanese supplier inquiries and coordination without restricting requests to a fixed product list." /></p>
      <div className="tcg-section-action"><Link className="tcg-button" href={quoteHref(category)}><Bilingual ja="このカテゴリーで見積りを依頼" en="Request a Quote for This Category" /><span aria-hidden="true">↗</span></Link></div>
    </section>
    <TradeNotice />
  </>
}
