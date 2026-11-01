import TcgPageHeading from '@/components/tcg/TcgPageHeading'
import TcgFeeCalculator from '@/components/tcg/TcgFeeCalculator'
import { tcgMetadata } from '@/lib/tcg/metadata'

export const metadata = tcgMetadata('手数料シミュレーション / Fee Calculator',
  '商品代金1万円から500万円までのTCG取扱手数料を累進方式で概算。Estimate progressive TCG handling fees for product values from JPY 10,000 to JPY 5,000,000.',
  '/tcg/fee-calculator')

export default function TcgFeeCalculatorPage() {
  return <>
    <TcgPageHeading ja="手数料シミュレーション" en="Fee Calculator" />
    <TcgFeeCalculator />
  </>
}
