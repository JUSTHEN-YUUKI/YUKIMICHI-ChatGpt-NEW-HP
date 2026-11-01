import Link from 'next/link'
import Image from 'next/image'
import { categories, products, quoteHref, type TcgCategory } from '@/lib/tcg/catalog'
import Bilingual from './Bilingual'
import TcgPageHeading from './TcgPageHeading'
import TradeNotice from './TradeNotice'

export default function CategoryProducts({ category }: { category: TcgCategory }) {
  const info = categories.find(item => item.id === category)!
  const items = products.filter(item => item.category === category && item.published)
  return <>
    <TcgPageHeading {...info.name}
      descriptionJa="日本語版商品の調査対象例です。掲載は在庫・仕入れ・供給をお約束するものではありません。掲載外の商品も商品名や参考URLを添えてご相談ください。"
      descriptionEn="These Japanese-edition products are examples for sourcing inquiries, not offers of stock or confirmed supply. You may also request other products by name or reference URL." />
    <section className="tcg-section" aria-label="商品一覧 / Product references">
      <div className="tcg-product-grid">{items.map(product => <article key={product.slug} className="tcg-product-card">
        {product.imageUrl ? <Image src={product.imageUrl} alt={product.name.ja} width={320} height={220} className="tcg-product-image" />
          : <div className="tcg-image-placeholder"><span aria-hidden="true">TCG</span><Bilingual ja="商品画像未掲載" en="Product image not published" /></div>}
        <div className="tcg-product-copy">
          <p className="tcg-eyebrow">JAPANESE EDITION · SOURCING INQUIRY</p>
          <h2><Link href={`/tcg/${category}/${product.slug}`}><Bilingual {...product.name} /></Link></h2>
          <p><Bilingual ja="価格：個別見積り" en="Price: Upon Request" /></p>
          <p className="tcg-status"><Bilingual ja="仕入れ可否確認が必要です。" en="Supplier Availability Confirmation Required." /></p>
          <Link className="tcg-text-link" href={`/tcg/${category}/${product.slug}`}><Bilingual ja="商品情報を確認" en="View Product Reference" /><span aria-hidden="true">↗</span></Link>
        </div>
      </article>)}</div>
      <div className="tcg-section-action"><Link className="tcg-button" href={quoteHref(category)}><Bilingual ja="このカテゴリーで見積りを依頼" en="Request a Quote for This Category" /><span aria-hidden="true">↗</span></Link></div>
    </section>
    <TradeNotice />
  </>
}
