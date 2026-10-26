import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

const nativeRequire = createRequire(import.meta.url)
function fixture(extraEnv = {}, send) {
  const sent = []
  const errors = []
  const env = { VERCEL_ENV: 'preview', MAINTENANCE_PREVIEW_SITE_ENABLED: 'on', SENDGRID_API_KEY: 'test-only-not-a-key',
    SENDGRID_FROM_EMAIL: 'sender@example.invalid', CONTACT_TO_EMAIL: 'admin@example.invalid', ...extraEnv }
  const cache = new Map()
  function load(path) {
    if (cache.has(path)) return cache.get(path)
    const result = {}
    cache.set(path, result)
    const source = readFileSync(new URL(`../${path}.ts`, import.meta.url), 'utf8')
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } })
    vm.runInNewContext(outputText, {
      exports: result, process: { env, versions: { ...process.versions, node: extraEnv.TEST_NODE ?? '24.22.1' } },
      Response, Headers, TextDecoder, Uint8Array, URL, crypto: globalThis.crypto,
      console: { error: (...args) => errors.push(args) },
      require: (name) => {
        if (name.startsWith('@/')) return load(name.slice(2))
        if (name === 'next/server') return { NextResponse: Response }
        if (name === '@sendgrid/mail') return { setApiKey() {}, async send(message) { sent.push(message); await send?.(message, sent.length) } }
        return nativeRequire(name)
      },
    })
    return result
  }
  const post = load('app/api/inquiry/route').POST
  return { sent, errors, load, post }
}

const valid = { type: 'contact', name: '検証担当', email: 'test@example.invalid', destinationCountry: 'Japan', message: '動作検証です。' }
function request(body = valid, headers = {}, path = '/api/inquiry') {
  return new Request(`https://preview.example.invalid${path}`, { method: 'POST', headers: {
    Origin: 'https://preview.example.invalid', 'Content-Type': 'application/json', ...headers,
  }, body: JSON.stringify(body) })
}

test('contact and quote succeed with quantity omitted; admin HTML escaped and acknowledgement is fixed', async () => {
  for (const type of ['contact', 'quote']) {
    const f = fixture()
    const attack = '<script>alert(1)</script> https://untrusted.example.invalid'
    const res = await f.post(request({ ...valid, type, name: attack, productName: '商品', message: attack }))
    assert.equal(res.status, 200)
    assert.match((await res.json()).receiptNumber, /^YKM-\d{8}-[A-Z0-9]{6}$/)
    assert.equal(f.sent.length, 2)
    for (const msg of f.sent) assert.equal(msg.mailSettings.sandboxMode.enable, true)
    assert.ok(f.sent[0].html.includes('&lt;script&gt;'))
    assert.ok(!f.sent[0].html.includes('<script>'))
    assert.ok(!f.sent[1].html.includes('untrusted.example'))
    assert.ok(!f.sent[1].text.includes('untrusted.example'))
    assert.equal(res.headers.get('Cache-Control'), 'no-store')
  }
})

test('invalid shape, field types, JSON, origins, encodings and oversized bodies never send mail', async () => {
  const cases = [
    [request(null), 400], [request([]), 400], [request({ ...valid, name: 42 }), 400],
    [request({ ...valid, message: { text: 'nested' } }), 400],
    [request({ ...valid, name: '\u0000' }), 400],
    [request(valid, { Origin: 'https://attacker.example.invalid' }), 403],
    [request(valid, { Origin: 'null' }), 403], [request(valid, { 'Sec-Fetch-Site': 'cross-site' }), 403],
    [request(valid, { 'Content-Type': 'text/plain' }), 415],
    [request(valid, { 'Content-Encoding': 'br' }), 415],
    [request(valid, { 'Content-Length': '999999' }), 413],
    [request({ ...valid, message: 'あ'.repeat(20000) }), 413],
    [request(valid, {}, '/api/%69nquiry'), 404],
  ]
  for (const [req, expected] of cases) {
    const f = fixture()
    assert.equal((await f.post(req)).status, expected)
    assert.equal(f.sent.length, 0)
  }
  const f = fixture()
  const malformed = new Request('https://preview.example.invalid/api/inquiry', { method: 'POST', headers: { Origin: 'https://preview.example.invalid', 'Content-Type': 'application/json' }, body: '{broken' })
  assert.equal((await f.post(malformed)).status, 400)
  assert.equal(f.sent.length, 0)
})

test('only http(s) URLs without embedded credentials are accepted', async () => {
  for (const url of ['javascript:alert(1)', 'data:text/plain,test', 'file:///etc/passwd', 'https://user:pass@example.invalid/']) {
    const f = fixture()
    assert.equal((await f.post(request({ ...valid, productUrl: url }))).status, 400)
    assert.equal(f.sent.length, 0)
  }
})

test('quota blocks the eleventh attempt and expires without evicting active entries', async () => {
  const f = fixture()
  const { allowInquiryAttempt } = f.load('lib/inquiry-security')
  for (let i = 0; i < 10; i++) assert.equal(allowInquiryAttempt('one-client', 1000), true)
  assert.equal(allowInquiryAttempt('one-client', 1001), false)
  assert.equal(allowInquiryAttempt('one-client', 3601000), true)
  for (let i = 0; i < 2047; i++) assert.equal(allowInquiryAttempt(`client-${i}`, 3601001), true)
  assert.equal(allowInquiryAttempt('overflow', 3601002), false)
  const route = fixture()
  for (let i = 0; i < 10; i++) assert.equal((await route.post(request())).status, 200)
  const blocked = await route.post(request())
  assert.equal(blocked.status, 429)
  assert.equal(blocked.headers.get('Retry-After'), '3600')
  assert.equal(route.sent.length, 20)
})

test('maintenance and an unpatched runtime stop before parsing or sending', async () => {
  for (const env of [{ VERCEL_ENV: 'production', MAINTENANCE_MODE: 'off' }, { MAINTENANCE_MODE: 'on' }, { TEST_NODE: '24.16.0' }]) {
    const f = fixture(env)
    assert.equal((await f.post(request(null))).status, 503)
    assert.equal(f.sent.length, 0)
  }
  const { isPatchedNode } = fixture().load('lib/runtime-security')
  for (const version of ['22.23.4', '24.22.1', '24.23.0']) assert.equal(isPatchedNode(version), true)
  for (const version of ['20.20.0', '22.23.3', '24.22.0', '26.12.1', 'unknown']) assert.equal(isPatchedNode(version), false)
})

test('reopened Production pages do not implicitly enable inquiry; explicit on still needs patched Node', async () => {
  for (const env of [{}, { INQUIRY_MODE: 'off' }, { INQUIRY_MODE: 'on', TEST_NODE: '24.21.0' }]) {
    const f = fixture({ VERCEL_ENV: 'production', MAINTENANCE_MODE: 'off', ...env })
    assert.equal((await f.post(request(valid))).status, 503)
    assert.equal(f.sent.length, 0)
  }
  const f = fixture({ VERCEL_ENV: 'production', MAINTENANCE_MODE: 'off', INQUIRY_MODE: 'on' })
  assert.equal((await f.post(request(valid))).status, 200)
  assert.equal(f.sent.length, 2)
  for (const message of f.sent) assert.equal(message.mailSettings, undefined)
})

test('preview sandbox never delivers; sandbox configuration fails closed outside preview', async () => {
  const f = fixture({ INQUIRY_EMAIL_SANDBOX: 'on' })
  assert.equal((await f.post(request())).status, 200)
  for (const msg of f.sent) assert.equal(msg.mailSettings.sandboxMode.enable, true)
  const unsafe = fixture({ VERCEL_ENV: 'development', INQUIRY_EMAIL_SANDBOX: 'on' })
  assert.equal((await unsafe.post(request())).status, 503)
  assert.equal(unsafe.sent.length, 0)
})

test('admin failure sends no acknowledgement; acknowledgement failure does not repeat accepted inquiry', async () => {
  const admin = fixture({}, async () => { throw new Error('sensitive-provider-details') })
  assert.equal((await admin.post(request())).status, 500)
  assert.equal(admin.sent.length, 1)
  assert.ok(!JSON.stringify(admin.errors).includes('sensitive-provider-details'))
  const ack = fixture({}, async (_, count) => { if (count === 2) throw new Error('provider-error') })
  const res = await ack.post(request())
  assert.equal(res.status, 200)
  assert.equal((await res.json()).autoReplyOk, false)
})
