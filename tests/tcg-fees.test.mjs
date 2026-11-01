import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

const source = readFileSync(new URL('../lib/tcg/fees.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
})
const exports = {}
vm.runInNewContext(outputText, { exports })
const { calculateTcgFee } = exports

test('TCG progressive fees match all eight specified examples and displayed effective rates', () => {
  const examples = [
    [10_000, 5_000, 15_000, '50.00'],
    [60_000, 6_000, 66_000, '10.00'],
    [100_000, 10_000, 110_000, '10.00'],
    [300_000, 26_000, 326_000, '8.67'],
    [500_000, 38_000, 538_000, '7.60'],
    [1_000_000, 68_000, 1_068_000, '6.80'],
    [2_000_000, 118_000, 2_118_000, '5.90'],
    [5_000_000, 268_000, 5_268_000, '5.36'],
  ]
  for (const [value, fee, total, rate] of examples) {
    const result = calculateTcgFee(value)
    assert.equal(result.handlingFee, fee, `fee for ${value}`)
    assert.equal(result.total, total, `total for ${value}`)
    assert.equal(result.effectiveRate.toFixed(2), rate, `rate for ${value}`)
  }
})

test('minimum fee and tier boundaries apply to portions, not the entire order', () => {
  for (const [value, expected] of [
    [40_000, 5_000], [50_000, 5_000], [90_000, 9_000], [110_000, 10_800],
    [290_000, 25_200], [310_000, 26_600], [990_000, 67_400], [1_010_000, 68_500],
  ]) assert.equal(calculateTcgFee(value).handlingFee, expected, `fee for ${value}`)
})

test('all 500 slider values produce whole-yen, increasing totals with a fee of at least JPY 5,000', () => {
  let previousTotal = 0
  for (let value = 10_000; value <= 5_000_000; value += 10_000) {
    const { handlingFee, total } = calculateTcgFee(value)
    assert.ok(Number.isInteger(handlingFee))
    assert.ok(handlingFee >= 5_000)
    assert.ok(total > previousTotal)
    assert.equal(total, value + handlingFee)
    previousTotal = total
  }
})

test('out-of-range, non-finite and off-step product values are rejected', () => {
  for (const value of [0, 9_999, 10_001, 20_000.5, 5_010_000, NaN, Infinity, -10_000]) {
    assert.throws(() => calculateTcgFee(value), /Product value must be/)
  }
})
