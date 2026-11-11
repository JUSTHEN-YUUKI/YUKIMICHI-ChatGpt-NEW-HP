import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

const exports = {}
const source = readFileSync(new URL('../lib/inquiry-email.ts', import.meta.url), 'utf8')
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports, encodeURIComponent })
const { buildInquiryEmail } = exports

test('email links fix the recipient and round-trip Unicode, URL delimiters and newlines without truncation', () => {
  for (const type of ['contact', 'quote']) {
    const message = '日本語 中文 ไทย Español & ? # +\nSecond line'
    const draft = buildInquiryEmail(type, { name: '検証', email: 'exporter@justhen.co.jp', productName: 'https://example.invalid/?a=1&b=2', destinationCountry: 'Japan', destinationCity: '札幌', quantity: '', message })
    const url = new URL(draft.href)
    assert.equal(url.pathname, 'exporter@justhen.co.jp')
    assert.equal(url.searchParams.get('body'), draft.body)
    assert.ok(draft.body.endsWith(message))
    assert.ok(draft.body.includes('Japan / 札幌'))
    assert.ok(!draft.body.includes('Quantity:'))
    assert.ok(!draft.body.includes('undefined'))
  }
})

test('long email remains complete for copying and never produces a truncated mailto', () => {
  const message = '長文確認 中文 ไทย Español\n'.repeat(2000) + 'END-OF-COMPLETE-MESSAGE'
  const draft = buildInquiryEmail('quote', { message, quantity: '20', quantityUnit: 'kg', productUrl: 'https://example.invalid/product', shippingMethod: 'Air Freight', documentUrl: 'https://example.invalid/doc' })
  assert.equal(draft.href, null)
  assert.ok(draft.body.endsWith(message))
  assert.ok(draft.body.includes('Quantity: 20 kg'))
  assert.ok(draft.body.includes('Shipping Method: Air Freight'))
})

