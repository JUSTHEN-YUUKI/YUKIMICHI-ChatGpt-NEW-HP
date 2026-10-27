import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

function runtimeHandler(environment, node) {
  const env = { VERCEL_ENV: environment, SENDGRID_API_KEY: 'must-never-appear' }
  function load(path) {
    const exports = {}
    const source = readFileSync(new URL(`../${path}.ts`, import.meta.url), 'utf8')
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } })
    vm.runInNewContext(outputText, { exports, Response, URL, process: { env, version: `v${node}`, versions: { node, brotli: '1.1.0' } }, require: name => load(name.slice(2)) })
    return exports
  }
  return load('app/api/runtime-check/route').GET
}

test('runtime verification stays unavailable outside Preview for both HTML and JSON', async () => {
  for (const environment of ['production', 'development', undefined]) {
    for (const accept of ['text/html', 'application/json']) {
      for (const query of ['', '?probe=managed-brotli']) {
        const response = await runtimeHandler(environment, '24.22.1')(new Request('https://example.invalid/api/runtime-check' + query, { headers: { Accept: accept } }))
        assert.equal(response.status, 404)
        assert.equal(await response.text(), '')
      }
    }
  }
})

test('Preview HTML and JSON report the actual runtime and retain the patch check without secrets', async () => {
  for (const node of ['24.21.0', '24.22.1']) {
    for (const accept of ['text/html', 'application/json']) {
      const response = await runtimeHandler('preview', node)(new Request('https://example.invalid/api/runtime-check', { headers: { Accept: accept } }))
      assert.equal(response.status, 200)
      assert.equal(response.headers.get('Cache-Control'), 'no-store')
      const body = await response.text()
      assert.ok(body.includes(node))
      assert.ok(body.includes(`v${node}`))
      assert.ok(!body.includes('must-never-appear'))
      assert.match(body, new RegExp(`"patched": ?${node === '24.22.1'}`))
      if (accept === 'text/html') assert.match(response.headers.get('Content-Security-Policy'), /default-src 'none'/)
    }
  }
})
