import TcgPageHeading from '@/components/tcg/TcgPageHeading'
import TcgQuoteForm from '@/components/tcg/TcgQuoteForm'
import { getProduct, isTcgCategory } from '@/lib/tcg/catalog'
import { tcgMetadata } from '@/lib/tcg/metadata'

export const metadata = tcgMetadata('お見積り / Request a Quote', '海外法人・個人事業主向けTCG見積依頼。登録不要で商品・数量・配送先をご相談ください。Request Japanese TCG sourcing support for your business.', '/tcg/quote')
export default async function TcgQuotePage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const query = await searchParams
  const category = isTcgCategory(query.category) ? query.category : ''
  const product = category && typeof query.product === 'string' ? getProduct(category, query.product) : undefined
  return <>
    <TcgPageHeading ja="お見積り・仕入れのご相談" en="Request a Quote"
      descriptionJa="海外の法人・個人事業主の事業用仕入れについて承ります。仕入れ可否・価格・在庫・納期は確認後にご案内します。"
      descriptionEn="For business purchases by overseas companies and sole proprietors. Sourcing availability, pricing, stock, and lead time are provided after review." />
    <TcgQuoteForm key={`${category}:${product?.slug ?? ''}`} initialCategory={category} initialProduct={product ? `${product.name.ja} / ${product.name.en}` : ''} />
  </>
}
