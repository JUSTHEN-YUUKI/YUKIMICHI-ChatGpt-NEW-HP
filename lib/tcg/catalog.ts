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
  orderUnit: 'BOX' | 'CASE' | null
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
export const products: TcgProduct[] = [
  {
    slug: 'scarlet-ex', category: 'pokemon',
    name: { ja: '拡張パック「スカーレットex」', en: 'Scarlet ex — Japanese Expansion Pack' },
    series: { ja: 'スカーレット＆バイオレット', en: 'Scarlet & Violet' },
    productCode: null, orderUnit: null, unitsPerCase: null, moq: null,
    availability: 'confirmation_required', imageUrl: null, published: true,
    sourceUrl: 'https://www.pokemon-card.com/ex/sv1/index.html', sourceCheckedAt: '2026-11-01',
  },
  {
    slug: 'violet-ex', category: 'pokemon',
    name: { ja: '拡張パック「バイオレットex」', en: 'Violet ex — Japanese Expansion Pack' },
    series: { ja: 'スカーレット＆バイオレット', en: 'Scarlet & Violet' },
    productCode: null, orderUnit: null, unitsPerCase: null, moq: null,
    availability: 'confirmation_required', imageUrl: null, published: true,
    sourceUrl: 'https://www.pokemon-card.com/ex/sv1/index.html', sourceCheckedAt: '2026-11-01',
  },
  {
    slug: 'romance-dawn', category: 'onepiece',
    name: { ja: 'ブースターパック ROMANCE DAWN', en: 'ROMANCE DAWN — Japanese Booster Pack' },
    series: { ja: 'ONE PIECEカードゲーム', en: 'ONE PIECE CARD GAME' },
    productCode: 'OP-01', orderUnit: null, unitsPerCase: null, moq: null,
    availability: 'confirmation_required', imageUrl: null, published: true,
    sourceUrl: 'https://www.onepiece-cardgame.com/products/boosters/op01.php', sourceCheckedAt: '2026-11-01',
  },
]

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
