import Link from 'next/link'
import Bilingual from '@/components/tcg/Bilingual'
import TcgPageHeading from '@/components/tcg/TcgPageHeading'
import TradeNotice from '@/components/tcg/TradeNotice'
import { tcgMetadata } from '@/lib/tcg/metadata'

export const metadata = tcgMetadata('お取引の流れ / How to Order', 'TCG商品の見積依頼から仕入れ可否確認、取引条件の合意、出荷調整までの流れ。How Japanese TCG sourcing inquiries work.', '/tcg/how-to-order')
const steps = [
  { ja: 'お見積り依頼', en: 'Submit an Inquiry', textJa: '商品名・シリーズ、希望数量と単位、配送先、事業情報をお知らせください。会員登録は不要です。', textEn: 'Tell us the product or series, requested quantity and unit, destination, and your business details. No registration is required.' },
  { ja: '仕入れ可否・条件確認', en: 'Supplier & Availability Review', textJa: '国内仕入先への確認、商品・梱包区分、MOQ、供給条件を個別に調査します。調査の結果、ご希望に添えない場合もあります。', textEn: 'We review potential suppliers, product and packaging specifications, MOQ, and supply terms. A review may conclude that we cannot meet your request.' },
  { ja: '正式見積り・条件確認', en: 'Formal Quotation & Terms Confirmation', textJa: '商品代金、手配手数料、送料等を区別してご案内します。売買主体、支払い、配送、見積有効期限等は正式受注前に確認します。', textEn: 'We distinguish product value, handling fees, freight, and other costs. The contracting seller, payment and shipping terms, and quote validity are confirmed before an order is accepted.' },
  { ja: 'お支払い・手配開始', en: 'Payment & Arrangement', textJa: '正式な取引条件が双方で合意され、所定の入金確認が完了した場合に限り、合意内容に従って手配を開始します。', textEn: 'Arrangements begin under the agreed terms only after both parties have accepted the formal transaction conditions and the required payment has been confirmed.' },
  { ja: '出荷・配送調整', en: 'Shipping Coordination', textJa: '確認済みの梱包条件・配送方法に基づき、必要書類の確認支援と配送会社・フォワーダーとの調整を行います。通関・納期を保証するものではありません。', textEn: 'We assist with document review and carrier or forwarder coordination based on confirmed packing and shipping terms. Customs clearance and delivery dates are not guaranteed.' },
]
export default function HowToOrderPage() {
  return <>
    <TcgPageHeading ja="お取引の流れ" en="How to Order" descriptionJa="ご相談から条件確認、配送調整まで、案件ごとに進めます。" descriptionEn="Each inquiry moves through an individual review of sourcing, terms, and shipping." />
    <ol className="tcg-steps">{steps.map((step, index) => <li key={step.en}>
      <div className="tcg-step-number" aria-hidden="true">STEP<strong>0{index + 1}</strong></div>
      <div><h2><Bilingual ja={step.ja} en={step.en} /></h2><p><Bilingual ja={step.textJa} en={step.textEn} /></p></div>
    </li>)}</ol>
    <Link href="/tcg/quote" className="tcg-button"><Bilingual ja="お見積りを依頼" en="Request a Quote" /><span aria-hidden="true">↗</span></Link>
    <TradeNotice />
  </>
}
