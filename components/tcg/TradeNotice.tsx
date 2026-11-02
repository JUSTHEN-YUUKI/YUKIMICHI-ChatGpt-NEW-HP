import Bilingual from './Bilingual'

export default function TradeNotice() {
  return <aside className="tcg-notice" aria-label="取引条件の確認 / Terms to confirm">
    <h2><Bilingual ja="お取引の前に" en="Before We Proceed" /></h2>
    <p><span className="tcg-bilingual">
      <span lang="ja" className="tcg-ja">自社在庫、メーカー直接契約、正規代理店資格、継続供給を保証するものではありません。<br />仕入れ先・売買主体・取引条件を案件ごとに確認します。</span>
      <span lang="en" className="tcg-en">We do not guarantee our own inventory, direct manufacturer contracts, authorized distributor status, or continuous supply. Suppliers, the contracting seller, and terms are reviewed for each inquiry.</span>
    </span></p>
    <p><span className="tcg-bilingual">
      <span lang="ja" className="tcg-ja">価格は個別見積りです。商品代金と手配手数料を区別し、国際送料・任意の輸送保険は別途確認します。<br />関税・輸入税・VAT/GST等は仕向国側での確認が必要です。</span>
      <span lang="en" className="tcg-en">Prices are quoted individually. Product value and handling fees are shown separately; international freight and optional insurance require separate confirmation. Duties, import taxes, and VAT/GST must be checked in the destination country.</span>
    </span></p>
    <p><Bilingual ja="BOX、未開封ケース、マスターケースは別の梱包区分です。入数、封緘状態、MOQ、在庫、納期は確認後にご案内します。"
      en="A box, a factory-sealed case, and a master case are different packaging units. Case contents, seal condition, MOQ, stock, and lead time are confirmed individually." /></p>
  </aside>
}
