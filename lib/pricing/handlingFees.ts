export const shippingMethodKeys = ['express', 'air', 'lcl', 'fcl'] as const

export type ShippingMethod = (typeof shippingMethodKeys)[number]

export type HandlingFeePlan = {
  key: ShippingMethod
  label: string
  title: string
  minimumFee: number
  use: string
  useEn: string
}

export type HandlingFeeTier = {
  upperBound: number | null
  rangeJa: string
  rangeEn: string
  rates: Record<ShippingMethod, number | null>
}

export type FeeBreakdownItem = {
  lowerBound: number
  upperBound: number | null
  amount: number
  rate: number
  fee: number
}

export type HandlingFeeResult = {
  individualQuotationRequired: false
  productValue: number
  shippingMethod: ShippingMethod
  calculatedFee: number
  totalFee: number
  effectiveRate: number
  breakdown: FeeBreakdownItem[]
  minimumFee: number
  minimumFeeApplied: boolean
}

export type IndividualQuotationResult = {
  individualQuotationRequired: true
  productValue: number
  shippingMethod: ShippingMethod
  minimumFee: number
}

export type HandlingFeeCalculationResult = HandlingFeeResult | IndividualQuotationResult

export const MAX_PRODUCT_VALUE = 999_999_999_999

export const handlingFeePlans: readonly HandlingFeePlan[] = [
  {
    key: 'express',
    label: 'International Express',
    title: 'International Express',
    minimumFee: 10_000,
    use: '小口貨物、サンプル、EMS / DHL / FedEx / UPS / ヤマト国際宅急便',
    useEn: 'Small parcels, samples, and international courier shipments',
  },
  {
    key: 'air',
    label: 'Air Freight',
    title: 'Air Freight',
    minimumFee: 30_000,
    use: '航空貨物、急ぎの商業貨物',
    useEn: 'Air freight and time-sensitive commercial cargo',
  },
  {
    key: 'lcl',
    label: 'Sea LCL',
    title: 'Sea LCL',
    minimumFee: 30_000,
    use: '小〜中規模の海上混載貨物',
    useEn: 'Small to medium-sized LCL sea freight',
  },
  {
    key: 'fcl',
    label: 'Sea FCL',
    title: 'Sea FCL',
    minimumFee: 50_000,
    use: 'コンテナ貨物、大口案件、継続取引',
    useEn: 'Container cargo, large-volume projects, and ongoing trade',
  },
]

export const handlingFeeTiers: readonly HandlingFeeTier[] = [
  {
    upperBound: 1_000_000,
    rangeJa: '～100万円',
    rangeEn: 'Up to JPY 1,000,000',
    rates: { express: 15, air: 10, lcl: 7, fcl: 7 },
  },
  {
    upperBound: 3_000_000,
    rangeJa: '100万円超～300万円',
    rangeEn: 'Over JPY 1,000,000 to JPY 3,000,000',
    rates: { express: 13, air: 9, lcl: 6, fcl: 6 },
  },
  {
    upperBound: 5_000_000,
    rangeJa: '300万円超～500万円',
    rangeEn: 'Over JPY 3,000,000 to JPY 5,000,000',
    rates: { express: 12, air: 8.5, lcl: 5, fcl: 5 },
  },
  {
    upperBound: 10_000_000,
    rangeJa: '500万円超～1,000万円',
    rangeEn: 'Over JPY 5,000,000 to JPY 10,000,000',
    rates: { express: 11, air: 8, lcl: 4.5, fcl: 4.5 },
  },
  {
    upperBound: 20_000_000,
    rangeJa: '1,000万円超～2,000万円',
    rangeEn: 'Over JPY 10,000,000 to JPY 20,000,000',
    rates: { express: 10, air: 7.5, lcl: 4, fcl: 4 },
  },
  {
    upperBound: 30_000_000,
    rangeJa: '2,000万円超～3,000万円',
    rangeEn: 'Over JPY 20,000,000 to JPY 30,000,000',
    rates: { express: 9, air: 7, lcl: 3, fcl: 3 },
  },
  {
    upperBound: null,
    rangeJa: '3,000万円超',
    rangeEn: 'Over JPY 30,000,000',
    rates: { express: 8, air: 6.5, lcl: null, fcl: null },
  },
]

export function formatJpy(value: number) {
  return `JPY ${Math.round(value).toLocaleString('en-US')}`
}

export function formatFeeRate(rate: number | null) {
  if (rate === null) {
    return 'Individual Quotation / 個別見積り'
  }

  return `${Number.isInteger(rate) ? rate.toFixed(0) : rate.toFixed(1)}%`
}

export function getHandlingFeePlan(method: ShippingMethod) {
  const plan = handlingFeePlans.find((item) => item.key === method)

  if (!plan) {
    throw new RangeError('Unsupported shipping method.')
  }

  return plan
}

export function calculateHandlingFee(
  productValue: number,
  shippingMethod: ShippingMethod,
): HandlingFeeCalculationResult {
  if (!Number.isSafeInteger(productValue) || productValue <= 0 || productValue > MAX_PRODUCT_VALUE) {
    throw new RangeError('Product value is outside the supported range.')
  }

  const plan = getHandlingFeePlan(shippingMethod)
  const breakdown: FeeBreakdownItem[] = []
  let lowerBound = 0

  for (const tier of handlingFeeTiers) {
    const upperLimit = tier.upperBound ?? productValue
    const amount = Math.min(productValue, upperLimit) - lowerBound

    if (amount > 0) {
      const rate = tier.rates[shippingMethod]

      if (rate === null) {
        return {
          individualQuotationRequired: true,
          productValue,
          shippingMethod,
          minimumFee: plan.minimumFee,
        }
      }

      breakdown.push({
        lowerBound,
        upperBound: tier.upperBound,
        amount,
        rate,
        fee: Math.round(amount * (rate / 100)),
      })
    }

    if (tier.upperBound === null || productValue <= tier.upperBound) {
      break
    }

    lowerBound = tier.upperBound
  }

  const calculatedFee = breakdown.reduce((total, item) => total + item.fee, 0)
  const totalFee = Math.max(calculatedFee, plan.minimumFee)

  return {
    individualQuotationRequired: false,
    productValue,
    shippingMethod,
    calculatedFee,
    totalFee,
    effectiveRate: (totalFee / productValue) * 100,
    breakdown,
    minimumFee: plan.minimumFee,
    minimumFeeApplied: calculatedFee < plan.minimumFee,
  }
}
