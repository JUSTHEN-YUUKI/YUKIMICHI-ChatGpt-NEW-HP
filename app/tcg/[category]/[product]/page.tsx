import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Bilingual from '@/components/tcg/Bilingual'
import TcgPageHeading from '@/components/tcg/TcgPageHeading'
import TradeNotice from '@/components/tcg/TradeNotice'
import { categories, getProduct, products, quoteHref } from '@/lib/tcg/catalog'
import { tcgMetadata } from '@/lib/tcg/metadata'

type Props = { params: Promise<{ category: string; product: string }> }
export function generateStaticParams() {
  return products.filter(product => product.published).map(product => ({ category: product.category, product: product.slug }))
}
export async function generateMetadata({ params }: Props) {
  const value = await params
  const product = getProduct(value.category, value.product)
  if (!product) notFound()
  return tcgMetadata(product.name.ja, `${product.name.en}. 事業者向け仕入れ可否調査。価格・MOQ・梱包・納期は個別確認。`, `/tcg/${product.category}/${product.slug}`)
}
export default async function ProductPage({ params }: Props) {
  const value = await params
  const product = getProduct(value.category, value.product)
  if (!product) notFound()
  const category = categories.find(item => item.id === product.category)!
  const unknown = { ja: '未確認・個別確認', en: 'To Be Confirmed Individually' }
  const rows = [
    { label: { ja: 'シリーズ名', en: 'Series' }, value: product.series },
    { label: { ja: '商品コード', en: 'Product Code' }, value: product.productCode ? { ja: product.productCode, en: product.productCode } : unknown },
    { label: { ja: '商品区分', en: 'Product Category' }, value: category.name },
    { label: { ja: 'BOX・ケース区分', en: 'Order Unit' }, value: product.orderUnit ? { ja: product.orderUnit, en: product.orderUnit } : unknown },
    { label: { ja: 'ケース入数', en: 'Units per Case' }, value: product.unitsPerCase !== null ? { ja: String(product.unitsPerCase), en: String(product.unitsPerCase) } : unknown },
    { label: { ja: '最低発注数量', en: 'MOQ' }, value: product.moq !== null ? { ja: String(product.moq), en: String(product.moq) } : unknown },
    { label: { ja: '価格', en: 'Price' }, value: { ja: '個別見積り', en: 'Upon Request' } },
    { label: { ja: '仕入れ確認状況', en: 'Availability Status' }, value: { ja: '仕入れ可否確認が必要です。', en: 'Supplier Availability Confirmation Required.' } },
  ]
  return <>
    <TcgPageHeading {...product.name} descriptionJa="メーカー公開情報に基づく調査対象例です。掲載は取扱い・在庫・仕入れ可否を保証するものではありません。"
      descriptionEn="A product reference based on public manufacturer information. Listing does not confirm our ability to source or supply it." />
    <section className="tcg-product-detail tcg-section">
      <div>{product.imageUrl ? <Image src={product.imageUrl} alt={product.name.ja} width={480} height={420} className="tcg-product-image" />
        : <div className="tcg-image-placeholder tcg-image-placeholder-large"><span aria-hidden="true">TCG</span><Bilingual ja="商品画像未掲載" en="Product image not published" /></div>}</div>
      <div><dl className="tcg-specs">{rows.map(row => <div key={row.label.en}><dt><Bilingual {...row.label} /></dt><dd><Bilingual {...row.value} /></dd></div>)}</dl>
        <Link className="tcg-button" href={quoteHref(product.category, product.slug)}><Bilingual ja="この商品の見積り・調査を依頼" en="Request a Quote / Sourcing Review" /><span aria-hidden="true">↗</span></Link>
        <p className="tcg-source"><a href={product.sourceUrl} target="_blank" rel="noopener noreferrer"><Bilingual ja="メーカー公式の商品情報" en="Manufacturer Product Reference" /></a><Bilingual ja={`商品情報確認日：${product.sourceCheckedAt}（供給確認日ではありません）`}
          en={`Product reference checked: ${product.sourceCheckedAt} (not a supply confirmation). English names are descriptive translations.`} /></p>
      </div>
    </section>
    <TradeNotice />
  </>
}
