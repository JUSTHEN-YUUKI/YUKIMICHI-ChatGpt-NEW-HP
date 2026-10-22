import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

function loadMaintenance(env) {
  const source = readFileSync(new URL('../lib/maintenance.ts', import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  })
  const context = { exports: {}, process: { env }, Response }
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
  assert.ok(handler.indexOf('if (isMaintenanceEnabled())') < handler.indexOf('request.json()'))
})
