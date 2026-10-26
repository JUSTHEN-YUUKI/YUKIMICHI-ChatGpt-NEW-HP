import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

function loadMaintenance(env, simulateApprovedSourceUnlock = false) {
  let source = readFileSync(new URL('../lib/maintenance.ts', import.meta.url), 'utf8')
  if (simulateApprovedSourceUnlock) source = source.replace('const PRODUCTION_MAINTENANCE_LOCK = true', 'const PRODUCTION_MAINTENANCE_LOCK = false')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  })
  const context = { exports: {}, process: { env }, Response, Headers }
  vm.runInNewContext(outputText, context)
  return context.exports
}

test('production lock survives missing/off/invalid environment configuration', () => {
  for (const mode of [undefined, 'off', 'false', 'on', 'invalid', '']) {
    assert.equal(loadMaintenance({ VERCEL_ENV: 'production', MAINTENANCE_MODE: mode, MAINTENANCE_PREVIEW_SITE_ENABLED: 'on' }).isMaintenanceEnabled(), true)
  }
  assert.equal(loadMaintenance({ NODE_ENV: 'production', MAINTENANCE_MODE: 'off' }).isMaintenanceEnabled(), true)
})

test('preview defaults closed; normal preview requires deliberate environment opt-in', () => {
  assert.equal(loadMaintenance({ VERCEL_ENV: 'preview' }).isMaintenanceEnabled(), true)
  assert.equal(loadMaintenance({ VERCEL_ENV: 'preview', MAINTENANCE_PREVIEW_SITE_ENABLED: 'on' }).isMaintenanceEnabled(), false)
  assert.equal(loadMaintenance({ VERCEL_ENV: 'preview', MAINTENANCE_PREVIEW_SITE_ENABLED: 'on', MAINTENANCE_MODE: 'on' }).isMaintenanceEnabled(), true)
  assert.equal(loadMaintenance({ NODE_ENV: 'development' }).isMaintenanceEnabled(), false)
})

test('even an approved source unlock requires explicit off; on or missing configuration restores maintenance', () => {
  for (const mode of [undefined, '', 'invalid', 'on']) {
    assert.equal(loadMaintenance({ VERCEL_ENV: 'production', MAINTENANCE_MODE: mode }, true).isMaintenanceEnabled(), true)
  }
  assert.equal(loadMaintenance({ VERCEL_ENV: 'production', MAINTENANCE_MODE: 'off' }, true).isMaintenanceEnabled(), false)
  assert.equal(loadMaintenance({ NODE_ENV: 'production', MAINTENANCE_MODE: 'off' }, true).isMaintenanceEnabled(), false)
})

test('maintenance responses are 503, non-cacheable, with no deindex directives or external assets', async () => {
  const { maintenanceApiResponse, maintenancePageResponse } = loadMaintenance({})
  for (const response of [maintenanceApiResponse(), maintenancePageResponse()]) {
    assert.equal(response.status, 503)
    assert.match(response.headers.get('Cache-Control'), /no-store/)
    assert.equal(response.headers.get('Retry-After'), '3600')
    assert.equal(response.headers.has('X-Robots-Tag'), false)
  }
  assert.equal((await maintenanceApiResponse().json()).code, 'MAINTENANCE')
  const html = await maintenancePageResponse().text()
  assert.match(html, /緊急セキュリティメンテナンスのお知らせ/)
  assert.match(html, /Emergency Security Maintenance/)
  assert.match(html, /exporter@justhen.co.jp/)
  assert.doesNotMatch(html, /<script|<img|<link|noindex|http-equiv=["']refresh/i)
  assert.ok(Buffer.byteLength(html) < 10000)
})

test('inquiry handler checks the lock before parsing or sending', () => {
  const route = readFileSync(new URL('../app/api/inquiry/route.ts', import.meta.url), 'utf8')
  const handler = route.slice(route.indexOf('export async function POST'))
  assert.ok(handler.indexOf('if (isMaintenanceEnabled())') < handler.indexOf('readInquiryPayload(request)'))
})

test('Yahoo public HTML navigation displays the identical notice with 200; other clients retain 503', async () => {
  const { maintenancePageStatus, maintenancePageResponse } = loadMaintenance({})
  const navigation = { pathname: '/', method: 'GET', userAgent: 'Mozilla/5.0 Mobile YJApp-ANDROID jp.co.yahoo.android.yjtop/3.229.1', accept: 'text/html,application/xhtml+xml,*/*;q=0.8' }
  assert.equal(maintenancePageStatus(navigation), 200)
  assert.equal(maintenancePageStatus({ ...navigation, method: 'HEAD' }), 200)
  assert.equal(maintenancePageStatus({ ...navigation, userAgent: 'Mozilla/5.0 Mobile YJApp-IOS' }), 200)
  for (const userAgent of ['Mozilla/5.0 Chrome/155.0.0.0 Mobile Safari/537.36', 'Mozilla/5.0 (iPhone) Version/18.0 Mobile Safari/604.1', 'Googlebot/2.1', 'Yahoo! Slurp', '']) {
    assert.equal(maintenancePageStatus({ ...navigation, userAgent }), 503)
  }
  const yahoo = maintenancePageResponse(200)
  assert.equal(yahoo.status, 200)
  assert.equal(await yahoo.text(), await maintenancePageResponse().text())
  assert.match(yahoo.headers.get('Cache-Control'), /no-store/)
  assert.equal(yahoo.headers.has('Retry-After'), false)
  assert.equal(yahoo.headers.has('X-Robots-Tag'), false)
  assert.match(yahoo.headers.get('Vary'), /User-Agent/)
})

test('Yahoo compatibility cannot enable APIs, admin, files, actions or non-HTML requests', () => {
  const { maintenancePageStatus } = loadMaintenance({})
  const navigation = { pathname: '/', method: 'GET', userAgent: 'YJApp-ANDROID', accept: 'text/html' }
  for (const pathname of ['/api', '/api/inquiry', '/admin', '/admin/outbound', '/%61dmin', '/_next/data/contact.json', '/favicon.png', '/sitemap.xml', '/invalid%']) {
    assert.equal(maintenancePageStatus({ ...navigation, pathname }), 503, pathname)
  }
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
    assert.equal(maintenancePageStatus({ ...navigation, method }), 503, method)
  }
  for (const accept of ['', '*/*', 'application/json', 'text/x-component']) {
    assert.equal(maintenancePageStatus({ ...navigation, accept }), 503, accept)
  }
})
