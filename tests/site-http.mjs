import assert from 'node:assert/strict'

const base = process.argv[2]
assert.ok(base?.startsWith('http://127.0.0.1:'), 'Run only against the isolated local verification server')
const pages = ['/', '/about', '/services', '/pricing', '/flow', '/quote', '/faq', '/contact', '/restricted', '/terms', '/privacy']
let checks = 0
for (const path of pages) {
  const res = await fetch(`${base}${path}`, { redirect: 'manual' })
  assert.equal(res.status, 200, path)
  const html = await res.text()
  assert.ok(html.includes('YUKIMICHI'), path)
  assert.ok(!html.includes('緊急セキュリティメンテナンスのお知らせ'), path)
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff')
  checks++
}
for (const path of ['/unknown-security-check', '/admin', '/admin/outbound', '/en', '/api/unknown', '/.env']) {
  assert.equal((await fetch(`${base}${path}`, { redirect: 'manual' })).status, 404, path)
  checks++
}
const legacy = await fetch(`${base}/restricted-items`, { redirect: 'manual' })
assert.ok([307, 308].includes(legacy.status))
assert.equal(legacy.headers.get('location'), '/restricted')
checks++
const robots = await fetch(`${base}/robots.txt`)
assert.equal(robots.status, 200)
assert.match(await robots.text(), /Allow: \/[\s\S]*Disallow: \/admin/)
checks++
const sitemap = await fetch(`${base}/sitemap.xml`)
assert.equal(sitemap.status, 200)
assert.match(await sitemap.text(), /https:\/\/justhen\.co\.jp/)
checks++
const runtime = await fetch(`${base}/api/runtime-check`)
assert.equal(runtime.status, 200)
assert.equal((await runtime.json()).patched, true)
checks++
assert.equal((await fetch(`${base}/api/inquiry`)).status, 405)
checks++
for (const [body, expected, origin] of [[null, 400, base], [[], 400, base], [{ type: 'contact', name: '検証' }, 400, base], [{}, 403, 'https://other.example.invalid']]) {
  const res = await fetch(`${base}/api/inquiry`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body) })
  assert.equal(res.status, expected)
  assert.equal((await res.json()).ok, false)
  checks++
}
console.log(`Normal-site HTTP checks: ${checks} passed; no external mail requested.`)
