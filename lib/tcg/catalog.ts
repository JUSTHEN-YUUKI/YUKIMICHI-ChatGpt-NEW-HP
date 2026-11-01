export type Bilingual = { ja: string; en: string }
export type TcgCategory = 'pokemon' | 'onepiece'

export const categories: { id: TcgCategory; name: Bilingual }[] = [
  { id: 'pokemon', name: { ja: 'ポケモンカード', en: 'Pokémon TCG' } },
  { id: 'onepiece', name: { ja: 'ワンピースカード', en: 'ONE PIECE TCG' } },
]

export type TcgProduct = {
  slug: string
  category: TcgCategory
  name: Bilingual
  series: Bilingual
  productCode: string | null
  orderUnit: 'BOX' | 'CARTON' | null
  unitsPerCase: number | null
  moq: number | null
  availability: 'confirmation_required'
  imageUrl: string | null
  published: boolean
  sourceUrl: string
  sourceCheckedAt: string
}

// Public manufacturer references identify the product only. They do not
// establish supplier access, stock, packaging, MOQ, pricing or authorization.
// We accept sourcing inquiries across all products in these categories.
// No specific product listing implies stock, authorization, or guaranteed supply.
export const products: TcgProduct[] = []

export function isTcgCategory(value: unknown): value is TcgCategory {
  return value === 'pokemon' || value === 'onepiece'
}

export function getProduct(category: string, slug: string) {
  return products.find(product => product.published && product.category === category && product.slug === slug)
}

export function quoteHref(category: TcgCategory, product?: string) {
  const query = new URLSearchParams({ category })
  if (product) query.set('product', product)
  return `/tcg/quote?${query.toString()}`
}
