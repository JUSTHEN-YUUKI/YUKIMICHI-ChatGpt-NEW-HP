import assert from 'node:assert/strict'

const base = process.argv[2] || 'http://localhost:3215'
const paths = ['/', '/contact', '/contact/', '/quote', '/admin', '/admin/outbound', '/pricing', '/privacy', '/old-page', '/index.php', '/api', '/api/inquiry', '/api/inquiry?maintenance=off', '/api/unknown', '/?maintenance=off&bypass=1', '/_next/static/test.js', '/_next/data/test/contact.json', '/_next/image?url=%2Ffavicon.png&w=64&q=75', '/favicon.png', '/sitemap.xml', '/%61dmin', '/robots.txt/extra']
let count = 0
for (const path of paths) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' })
  assert.equal(response.status, 503, `${path}: expected 503, got ${response.status}`)
  assert.match(response.headers.get('Cache-Control'), /no-store/, path)
  assert.equal(response.headers.get('Retry-After'), '3600', path)
  assert.doesNotMatch(response.headers.get('X-Robots-Tag') || '', /noindex/i, path)
  const text = await response.text()
  assert.match(text, /MAINTENANCE|Emergency Security Maintenance/, path)
  count++
}
// Invalid JSON can never send real mail, even if a guard regresses. Expect 503
// rather than the 400 that the ordinary handler would produce.
for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']) {
  const response = await fetch(new URL('/api/inquiry', base), {
    method,
    headers: { 'Content-Type': 'application/json', 'x-middleware-subrequest': 'middleware:middleware:middleware:middleware:middleware' },
    body: ['HEAD', 'OPTIONS'].includes(method) ? undefined : '{',
    redirect: 'manual',
  })
  assert.equal(response.status, 503, `${method} inquiry`)
  assert.match(response.headers.get('Cache-Control'), /no-store/)
  count++
}
// Server Actions and RSC/prefetch requests must not reveal the original app.
for (const headers of [{ 'Next-Action': 'test' }, { RSC: '1', 'Next-Router-Prefetch': '1' }, { 'x-middleware-subrequest': 'middleware:middleware:middleware:middleware:middleware' }]) {
  const response = await fetch(new URL('/contact?bypass=1', base), { headers, method: 'POST', body: '{', redirect: 'manual' })
  assert.equal(response.status, 503)
  count++
}
const robots = await fetch(new URL('/robots.txt?maintenance=off', base))
assert.equal(robots.status, 200)
const policy = await robots.text()
assert.match(policy, /Allow: \//)
assert.match(policy, /Disallow: \/admin\//)
assert.doesNotMatch(policy, /Disallow: \/\s*$/m)
console.log(JSON.stringify({ base, blockedChecksPassed: count, robots: 200 }))
