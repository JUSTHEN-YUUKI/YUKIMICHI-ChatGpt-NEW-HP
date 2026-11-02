'use client'

import { useState } from 'react'
import Bilingual from './Bilingual'
import { calculateTcgFee, TCG_FEE_MIN_VALUE, TCG_FEE_MAX_VALUE, TCG_FEE_VALUE_STEP } from '@/lib/tcg/fees'
import styles from './TcgFeeCalculator.module.css'

const yenFormatter = new Intl.NumberFormat('ja-JP')
const yen = (value: number) => `${yenFormatter.format(value)}円`

const shippingProviders = [
  {
    name: 'UPS',
    ja: '公式送料見積り',
    en: 'Shipping Quote',
    href: 'https://www.ups.com/jp/ja/shipping/quote',
  },
  {
    name: 'DHL Express',
    ja: '公式送料見積り',
    en: 'Shipping Quote',
    href: 'https://www.dhl.com/jp-ja/home/get-a-quote.html',
  },
  {
    name: 'FedEx',
    ja: '料金・配達日数',
    en: 'Rates & Transit Times',
    href: 'https://www.fedex.com/ja-jp/new-customer/how-to-get-rates-and-transit-times.html',
  },
  {
    name: '日本郵便 EMS / Japan Post EMS',
    ja: '料金・配達日数',
    en: 'Rates & Delivery Times',
    href: 'https://www.post.japanpost.jp/cgi-charge/',
  },
]

export default function TcgFeeCalculator() {
  const [productValue, setProductValue] = useState(TCG_FEE_MIN_VALUE)
  const { handlingFee, effectiveRate, total } = calculateTcgFee(productValue)

  return <section className={styles.calculator} aria-label="手数料シミュレーション / Fee Calculator">
    <div className={styles.product}>
      <label htmlFor="tcg-product-value"><Bilingual ja="注文商品代金" en="Product Value" /></label>
      <output className={styles.amount} htmlFor="tcg-product-value">{yen(productValue)}</output>
      <input id="tcg-product-value" className={styles.slider} type="range"
        min={TCG_FEE_MIN_VALUE} max={TCG_FEE_MAX_VALUE} step={TCG_FEE_VALUE_STEP}
        value={productValue} autoComplete="off" aria-valuetext={`${yen(productValue)} / JPY ${productValue.toLocaleString('en-US')}`}
        aria-describedby="tcg-value-limits"
        onChange={event => setProductValue(event.currentTarget.valueAsNumber)} />
      <div id="tcg-value-limits" className={styles.limits}>
        <span>1万円 <span lang="en">/ JPY 10,000</span></span>
        <span>500万円 <span lang="en">/ JPY 5,000,000</span></span>
      </div>
    </div>

    <div aria-live="polite" aria-atomic="true">
      <dl className={styles.results}>
        <div className={styles.metric}>
          <dt><Bilingual ja="TCG取扱手数料" en="TCG Handling Fee" /></dt>
          <dd><output htmlFor="tcg-product-value">{yen(handlingFee)}</output></dd>
        </div>
        <div className={styles.metric}>
          <dt><Bilingual ja="実効手数料率" en="Effective Fee Rate" /></dt>
          <dd><output htmlFor="tcg-product-value">{effectiveRate.toFixed(2)}%</output></dd>
        </div>
        <div className={styles.total}>
          <dt><Bilingual ja="商品代金＋取扱手数料（送料等別）" en="Product Value + Handling Fee (Shipping Excluded)" /></dt>
          <dd><output htmlFor="tcg-product-value">{yen(total)}</output></dd>
        </div>
      </dl>
    </div>

    <div className={styles.costNotice} role="note">
      <p className={styles.noticeTitle}><Bilingual ja="表示金額について（送料等は別途）" en="About This Estimate (Shipping Not Included)" /></p>
      <p><Bilingual
        ja="表示額は商品代金とYUKIMICHIのTCG取扱手数料を合計した概算です。"
        en="This estimate includes only the product value and YUKIMICHI's TCG handling fee." /></p>
      <p className={styles.exclusion}><Bilingual
        ja="国際送料・輸送保険料・国内配送費・梱包費・関税・輸入税（VAT/GST）・通関関連費用等は含まれていません。"
        en="International shipping, insurance, domestic delivery, packaging, customs duties, import taxes (VAT/GST), and customs clearance charges are not included." /></p>
      <p><Bilingual
        ja="最終的な費用は、配送先・重量・梱包サイズ・配送方法等を確認のうえ、案件ごとにお見積りします。"
        en="Final costs will be confirmed in a separate quotation based on the destination, weight, parcel dimensions, shipping method, and other shipment details." /></p>
    </div>

    <section className={styles.shippingInfo} aria-labelledby="tcg-shipping-heading">
      <h2 id="tcg-shipping-heading"><Bilingual ja="国際送料を調べる（各社公式サイト）" en="Check Shipping Rates (Official Carrier Websites)" /></h2>
      <p className={styles.shippingIntro}><Bilingual
        ja="UPS・DHL・FedEx・EMSの公式サイトで、日本からの国際配送料金の目安を確認できます。"
        en="Use the official UPS, DHL, FedEx, and EMS websites to check indicative international shipping rates from Japan." /></p>
      <div className={styles.shippingGrid}>
        {shippingProviders.map(provider => (
          <a className={styles.carrierLink} key={provider.name} href={provider.href} target="_blank" rel="noopener noreferrer">
            <strong>{provider.name}</strong>
            <span className={styles.carrierAction}><Bilingual ja={provider.ja} en={provider.en} /><span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
      <p className={styles.shippingCaution}><Bilingual
        ja="外部サイトが別タブで開きます。表示送料は参考金額であり、実際の送料・引受可否・補償条件は商品内容、申告価格、重量、サイズ、仕向国、各社規定等により異なります。EMSは料金計算画面でEMSを選択してください。"
        en="Links open official external websites in a new tab. Rates are indicative, not final quotes. Actual charges, acceptance, and coverage depend on the goods, declared value, weight, dimensions, destination, and each carrier's terms. For Japan Post, select EMS in the rate calculator." /></p>
    </section>
    <p className={styles.note}><Bilingual ja="各金額帯の該当部分に料率を適用する累進方式です。最低取扱手数料は5,000円です。シミュレーションは概算であり、正式な条件はお見積りでご確認ください。"
      en="Fees are calculated progressively for each portion of the product value, with a minimum handling fee of JPY 5,000. This is an estimate; final terms are confirmed in a quotation." /></p>
  </section>
}
