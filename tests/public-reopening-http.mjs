import assert from 'node:assert/strict'

const base = process.argv[2]
assert.ok(base && (/^http:\/\/127\.0\.0\.1:\d+$/.test(base) || ['https://justhen.co.jp', 'https://www.justhen.co.jp'].includes(base)))
let count = 0
const paths = ['/', '/about', '/services', '/pricing', '/flow', '/contact', '/quote', '/faq', '/restricted', '/terms', '/privacy']
for (const path of paths) {
  const response = await fetch(base + path, { redirect: 'manual' })
  assert.equal(response.status, 200, path)
  const html = await response.text()
  assert.match(html, /YUKIMICHI/)
  assert.doesNotMatch(html, /緊急セキュリティメンテナンスのお知らせ/)
  assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/)
  assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i)
  if (path === '/contact' || path === '/quote') {
    assert.match(html, /Form submissions are temporarily unavailable/)
    assert.match(html, /mailto:exporter@justhen\.co\.jp/)
    assert.match(html, /<button[^>]+type="submit"[^>]+disabled/)
  }
  count++
}
for (const path of ['/admin', '/admin/outbound', '/api/runtime-check', '/unknown-reopening-check', '/.env']) {
  assert.equal((await fetch(base + path, { redirect: 'manual' })).status, 404, path)
  count++
}
for (const [path, pattern] of [['/robots.txt', /Allow: \/[\s\S]*Disallow: \/admin/], ['/sitemap.xml', /https:\/\/justhen\.co\.jp/]]) {
  const response = await fetch(base + path)
  assert.equal(response.status, 200, path)
  assert.match(await response.text(), pattern)
  count++
}
for (const path of ['/', '/contact', '/quote']) {
  const response = await fetch(base + path, { headers: { 'User-Agent': 'Mozilla/5.0 Mobile YJApp-ANDROID', Accept: 'text/html' } })
  assert.equal(response.status, 200)
  assert.doesNotMatch(await response.text(), /緊急セキュリティメンテナンスのお知らせ/)
  count++
}
// Empty input cannot send mail even if someone changes the API gate meanwhile.
const response = await fetch(base + '/api/inquiry', { method: 'POST', headers: { Origin: base, 'Content-Type': 'application/json' }, body: '{}' })
assert.equal(response.status, 503)
assert.equal((await response.json()).code, 'INQUIRY_UNAVAILABLE')
assert.match(response.headers.get('cache-control'), /no-store/)
assert.equal((await fetch(base + '/api/inquiry')).status, 405)
count += 2
console.log(JSON.stringify({ base, passed: count, publicPages: 'normal', inquiry: 'safely disabled', checkedAt: new Date().toISOString() }))
