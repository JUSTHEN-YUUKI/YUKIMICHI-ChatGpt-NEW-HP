import CategoryProducts from '@/components/tcg/CategoryProducts'
import { tcgMetadata } from '@/lib/tcg/metadata'
export const metadata = tcgMetadata('ポケモンカード / Pokémon TCG', '日本語版ポケモンカードの仕入れ可否調査・見積相談。価格・供給条件は個別確認です。Japanese Pokémon TCG sourcing inquiries for business buyers.', '/tcg/pokemon')
export default function PokemonPage() { return <CategoryProducts category="pokemon" /> }
