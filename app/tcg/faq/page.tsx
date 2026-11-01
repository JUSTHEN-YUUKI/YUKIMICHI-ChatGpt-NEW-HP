import Link from 'next/link'
import Bilingual from '@/components/tcg/Bilingual'
import TcgPageHeading from '@/components/tcg/TcgPageHeading'
import { tcgMetadata } from '@/lib/tcg/metadata'

export const metadata = tcgMetadata('よくある質問 / FAQ', '法人・個人事業主のTCG仕入れ相談、ケース、MOQ、個別見積り、配送に関する質問。Frequently asked questions for Japanese TCG business sourcing.', '/tcg/faq')
const faqs = [
  { ja: '法人以外でも取引できますか？', en: 'Can businesses other than incorporated companies inquire?', answerJa: '海外の法人と個人事業主を対象としています。一般個人の趣味目的の購入は初期段階では原則対象外です。取引可否は内容を確認してご案内します。', answerEn: 'We accept inquiries from overseas companies and sole proprietors. Personal hobby purchases are generally outside our initial scope. Whether we can proceed is confirmed after review.' },
  { ja: '個人事業主でも問い合わせできますか？', en: 'Can sole proprietors submit an inquiry?', answerJa: 'はい。事業形態で「個人事業主」を選択してください。屋号は任意で、氏名でお問い合わせいただけます。', answerEn: 'Yes. Select Sole Proprietor as your business type. A trading name is optional; you may inquire using your own name.' },
  { ja: '未開封ケースを指定できますか？', en: 'Can I request factory-sealed cases?', answerJa: 'ご希望として承ります。BOX、未開封ケース、マスターケースの区分、ケース入数、封緘状態、仕入れ可否を個別に確認します。未開封ケースでの供給を保証するものではありません。', answerEn: 'You may request them. We confirm boxes, factory-sealed cases, and master cases separately, including case contents, seal condition, and availability. Factory-sealed case supply is not guaranteed.' },
  { ja: '最低発注数量はありますか？', en: 'Is there a minimum order quantity?', answerJa: '商品・仕入先・梱包区分によって異なり、現在一律のMOQは設定していません。希望数量と単位をお知らせください。', answerEn: 'MOQ depends on the product, supplier, and packaging. We have not set a universal MOQ. Please tell us your requested quantity and unit.' },
  { ja: '商品価格はどのように決まりますか？', en: 'How are product prices determined?', answerJa: '仕入先条件・数量等を確認して個別に見積ります。商品代金と手配手数料、送料等を区別してご案内します。', answerEn: 'Prices are quoted individually after reviewing supplier terms and quantity. Product value, handling fees, and freight are shown separately.' },
  { ja: '国際配送は可能ですか？', en: 'Can you arrange international shipping?', answerJa: '主な配送方法はUPS、DHL、FedExです。また、貨物の規模や条件に応じて海上コンテナ輸送（LCL・FCL）についても手配を支援します。いずれも配送会社・フォワーダーの引受条件や仕向地等により対応可否を個別に確認します。輸送保険は任意です。', answerEn: 'We primarily assist with shipments via UPS, DHL, and FedEx. We can also coordinate sea container freight (LCL or FCL) when suitable. All arrangements are subject to carrier or forwarder acceptance, destination, and shipment details. Shipping insurance is optional.' },
  { ja: '仕入れ可否はいつ確定しますか？', en: 'When is sourcing availability confirmed?', answerJa: '仕入先と取引条件を確認した後にご案内します。現時点で一律の回答期限、在庫確保、継続供給を保証していません。', answerEn: 'We respond after checking suppliers and transaction terms. We do not currently guarantee a fixed response time, reserved inventory, or ongoing supply.' },
  { ja: '見積依頼後に必ず購入する必要がありますか？', en: 'Does a quote request commit me to buying?', answerJa: '見積依頼だけで購入義務は生じません。正式な取引条件の合意前に、購入・支払いを確定しません。有料の追加調査等が必要な場合は、事前に条件をご案内します。', answerEn: 'A quote request alone does not commit you to a purchase. Purchases and payments are not finalized before formal terms are agreed. If additional paid research is needed, its terms will be explained in advance.' },
]
export default function TcgFaqPage() {
  return <>
    <TcgPageHeading ja="よくある質問" en="Frequently Asked Questions" />
    <section className="tcg-faq tcg-section" aria-label="よくある質問と回答 / Questions and answers">
      {faqs.map(faq => <details key={faq.en}><summary><Bilingual ja={faq.ja} en={faq.en} /></summary><p><Bilingual ja={faq.answerJa} en={faq.answerEn} /></p></details>)}
      <div className="tcg-section-action"><Link href="/tcg/quote" className="tcg-button"><Bilingual ja="ご希望の条件を相談する" en="Discuss Your Requirements" /><span aria-hidden="true">↗</span></Link></div>
    </section>
  </>
}
