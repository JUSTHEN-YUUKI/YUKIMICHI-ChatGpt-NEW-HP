export const TCG_FEE_MIN_VALUE = 10_000
export const TCG_FEE_MAX_VALUE = 5_000_000
export const TCG_FEE_VALUE_STEP = 10_000
export const TCG_FEE_PRESETS = [100_000, 300_000, 500_000, 1_000_000, 5_000_000] as const

export function calculateTcgFee(productValue: number) {
  if (!Number.isSafeInteger(productValue) || productValue < TCG_FEE_MIN_VALUE ||
      productValue > TCG_FEE_MAX_VALUE || productValue % TCG_FEE_VALUE_STEP !== 0) {
    throw new RangeError('Product value must be JPY 10,000–5,000,000 in JPY 10,000 increments.')
  }

  // Calculate each band separately in basis points; the minimum applies to the sum.
  const weightedFee = Math.min(productValue, 100_000) * 1_000
    + Math.min(Math.max(productValue - 100_000, 0), 200_000) * 800
    + Math.min(Math.max(productValue - 300_000, 0), 700_000) * 600
    + Math.max(productValue - 1_000_000, 0) * 500
  const handlingFee = Math.max(5_000, weightedFee / 10_000)

  return {
    handlingFee,
    effectiveRate: handlingFee / productValue * 100,
    total: productValue + handlingFee,
  }
}
