'use client'

import { type FormEvent, useState } from 'react'
import Link from '@/components/NewTabLink'
import {
  calculateHandlingFee,
  formatFeeRate,
  formatJpy,
  getHandlingFeePlan,
  handlingFeePlans,
  MAX_PRODUCT_VALUE,
  type HandlingFeeResult,
  type ShippingMethod,
} from '@/lib/pricing/handlingFees'

function formatInputValue(value: string) {
  if (!value) return ''
  return Number(value).toLocaleString('en-US')
}

function formatTierRange(lowerBound: number, upperBound: number | null) {
  if (upperBound === null) {
    return `JPY ${lowerBound.toLocaleString('en-US')}+`
  }

  return `JPY ${lowerBound.toLocaleString('en-US')} – ${upperBound.toLocaleString('en-US')}`
}

function formatEffectiveRate(rate: number) {
  return `${(Math.round(rate * 100 + 1e-9) / 100).toFixed(2)}%`
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HandlingFeeCalculator() {
  const [productValue, setProductValue] = useState('')
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('lcl')
  const [result, setResult] = useState<HandlingFeeResult | null>(null)
  const [error, setError] = useState('')

  const handleProductValueChange = (value: string) => {
    const digits = value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '')
    setProductValue(digits)
    setResult(null)
    setError('')
  }

  const handleShippingMethodChange = (value: string) => {
    setShippingMethod(value as ShippingMethod)
    setResult(null)
    setError('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const numericValue = Number(productValue)

    if (!productValue || !Number.isSafeInteger(numericValue) || numericValue <= 0) {
      setResult(null)
      setError('商品代金を入力してください。 / Please enter the product value.')
      return
    }

    if (numericValue > MAX_PRODUCT_VALUE) {
      setResult(null)
      setError(`${formatJpy(MAX_PRODUCT_VALUE)} 以下の商品代金を入力してください。 / Please enter a product value of ${formatJpy(MAX_PRODUCT_VALUE)} or less.`)
      return
    }

    setError('')
    setResult(calculateHandlingFee(numericValue, shippingMethod))
  }

  const selectedPlan = getHandlingFeePlan(shippingMethod)

  return (
    <section className="handling-fee-calculator" aria-labelledby="handling-fee-calculator-title">
      <header className="handling-fee-calculator__header">
        <span>Handling Fee Calculator</span>
        <h3 id="handling-fee-calculator-title" lang="ja">手配手数料シミュレーター</h3>
        <p lang="en">Estimate the handling fee by product value and shipping method.</p>
      </header>

      <form className="handling-fee-calculator__form" onSubmit={handleSubmit} noValidate>
        <div className="handling-fee-calculator__field">
          <label htmlFor="calculator-product-value">
            <span lang="ja">商品代金</span>
            <small lang="en">Product Value</small>
          </label>
          <div className="handling-fee-calculator__input-wrap">
            <span aria-hidden="true">JPY</span>
            <input
              id="calculator-product-value"
              name="productValue"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              pattern="[0-9,]*"
              maxLength={19}
              value={formatInputValue(productValue)}
              onChange={(event) => handleProductValueChange(event.target.value)}
              placeholder="3,000,000"
              aria-describedby={error ? 'calculator-error' : 'calculator-product-value-help'}
              aria-invalid={Boolean(error)}
            />
          </div>
          <small id="calculator-product-value-help">商品購入代金を日本円で入力 / Enter the product value in JPY</small>
        </div>

        <div className="handling-fee-calculator__field">
          <label htmlFor="calculator-shipping-method">
            <span lang="ja">輸送方法</span>
            <small lang="en">Shipping Method</small>
          </label>
          <select
            id="calculator-shipping-method"
            name="shippingMethod"
            value={shippingMethod}
            onChange={(event) => handleShippingMethodChange(event.target.value)}
          >
            {handlingFeePlans.map((plan) => (
              <option value={plan.key} key={plan.key}>{plan.title}</option>
            ))}
          </select>
          <small>最低手数料 / Minimum fee: {formatJpy(selectedPlan.minimumFee)}</small>
        </div>

        {error && (
          <p className="handling-fee-calculator__error" id="calculator-error" role="alert">
            {error}
          </p>
        )}

        <button className="handling-fee-calculator__submit" type="submit">
          <span lang="ja">手数料を計算</span>
          <small lang="en">Calculate Fee</small>
          <ArrowRight />
        </button>
      </form>

      {result && (
        <div className="handling-fee-result" aria-live="polite">
          <div className="handling-fee-result__summary">
            <div>
              <span>商品代金 / Product Value</span>
              <strong>{formatJpy(result.productValue)}</strong>
            </div>
            <div>
              <span>輸送方法 / Shipping Method</span>
              <strong>{getHandlingFeePlan(result.shippingMethod).title}</strong>
            </div>
          </div>

          <div className="handling-fee-result__breakdown">
            <h4>Fee Breakdown <small>/ 計算内訳</small></h4>
            <div>
              {result.breakdown.map((item) => (
                <article key={`${item.lowerBound}-${item.upperBound ?? 'open'}`}>
                  <span>{formatTierRange(item.lowerBound, item.upperBound)}</span>
                  <p>{formatJpy(item.amount)} × {formatFeeRate(item.rate)}</p>
                  <strong>= {formatJpy(item.fee)}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="handling-fee-result__total">
            <div>
              <span lang="ja">概算手配手数料</span>
              <small lang="en">Estimated Handling Fee</small>
            </div>
            <strong>{formatJpy(result.totalFee)}</strong>
          </div>

          <div className="handling-fee-result__effective-rate">
            <span>実効手数料率 / Effective Fee Rate</span>
            <strong>{formatEffectiveRate(result.effectiveRate)}</strong>
          </div>

          {result.minimumFeeApplied && (
            <p className="handling-fee-result__minimum-note" role="status">
              <strong>最低手数料が適用されています。</strong>
              <span>The minimum handling fee applies.</span>
            </p>
          )}

          <div className="handling-fee-result__notice">
            <p lang="ja">
              このシミュレーターは、商品代金を基準とした手配手数料の概算確認用です。正式な料金は、商品内容、数量、仕入先数、輸送方法、梱包、必要書類、検査、その他の作業内容を確認したうえでご案内いたします。国際送料、輸送保険、関税、輸入税、通関関連費用、特殊梱包、検査費用、その他の実費は、この計算には含まれていません。
            </p>
            <p lang="en">
              This calculator provides an estimate of the handling fee based on the product value. Final fees may vary depending on the products, quantity, number of suppliers, shipping method, packaging, required documentation, inspections, and other project-specific requirements. International freight, shipping insurance, customs duties, import taxes, customs-related charges, special packaging, inspection fees, and other actual costs are not included in this calculation.
            </p>
          </div>

          <Link href="/quote" className="handling-fee-result__cta">
            <span lang="ja">正式なお見積りを依頼する</span>
            <small lang="en">Request a Quote</small>
            <ArrowRight />
          </Link>
        </div>
      )}
    </section>
  )
}
