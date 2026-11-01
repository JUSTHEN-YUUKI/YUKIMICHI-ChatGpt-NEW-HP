'use client'

import { useState } from 'react'
import Bilingual from './Bilingual'
import { calculateTcgFee, TCG_FEE_MIN_VALUE, TCG_FEE_MAX_VALUE, TCG_FEE_VALUE_STEP, TCG_FEE_PRESETS } from '@/lib/tcg/fees'
import styles from './TcgFeeCalculator.module.css'

const yenFormatter = new Intl.NumberFormat('ja-JP')
const yen = (value: number) => `${yenFormatter.format(value)}円`

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

    <div className={styles.presets} role="group" aria-label="商品代金を選択 / Select Product Value">
      {TCG_FEE_PRESETS.map(value => <button key={value} type="button"
        aria-pressed={productValue === value} onClick={() => setProductValue(value)}>{yen(value)}</button>)}
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
          <dt><Bilingual ja="商品代金＋取扱手数料" en="Product Value + Handling Fee" /></dt>
          <dd><output htmlFor="tcg-product-value">{yen(total)}</output></dd>
        </div>
      </dl>
    </div>

    <p className={styles.note}><Bilingual ja="国際送料・保険・その他実費は含みません。"
      en="International shipping, insurance, and other actual expenses are not included." /></p>
    <p className={styles.note}><Bilingual ja="各金額帯の該当部分に料率を適用する累進方式です。最低取扱手数料は5,000円です。シミュレーションは概算であり、正式な条件はお見積りでご確認ください。"
      en="Fees are calculated progressively for each portion of the product value, with a minimum handling fee of JPY 5,000. This is an estimate; final terms are confirmed in a quotation." /></p>
  </section>
}
