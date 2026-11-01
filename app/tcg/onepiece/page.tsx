import CategoryProducts from '@/components/tcg/CategoryProducts'
import { tcgMetadata } from '@/lib/tcg/metadata'
export const metadata = tcgMetadata('ワンピースカード / ONE PIECE TCG', '日本語版ONE PIECEカードの仕入れ可否調査・見積相談。価格・供給条件は個別確認です。Japanese ONE PIECE TCG sourcing inquiries for business buyers.', '/tcg/onepiece')
export default function OnepiecePage() { return <CategoryProducts category="onepiece" /> }
