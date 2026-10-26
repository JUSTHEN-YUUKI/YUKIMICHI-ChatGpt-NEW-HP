import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'

const source = readFileSync(new URL('../scripts/check-sendgrid-sandbox.mjs', import.meta.url), 'utf8')
test('build diagnostic is explicit Production-only and always no-delivery; provider failure is redacted', async () => {
  for (const [env, shouldCall] of [
    [{ VERCEL_ENV: 'preview', SENDGRID_SANDBOX_VERIFY: 'on' }, false],
    [{ VERCEL_ENV: 'production' }, false],
    [{ VERCEL_ENV: 'production', SENDGRID_SANDBOX_VERIFY: 'on' }, true],
  ]) {
    const calls = [], logs = []
    await vm.runInNewContext(`(async () => { ${source} })()`, {
      process: { env: { SENDGRID_API_KEY: 'test-secret', SENDGRID_FROM_EMAIL: 'sender@example.invalid', CONTACT_TO_EMAIL: 'admin@example.invalid', ...env } },
      AbortSignal, JSON, console: { log: x => logs.push(x), warn: x => logs.push(x) },
      fetch: async (url, options) => { calls.push([url, options]); return { status: 401,
        json: async () => ({ errors: [{ message: 'The provided authorization grant is invalid, expired, or revoked. test-secret' }] }) } },
    })
    assert.equal(calls.length, shouldCall ? 1 : 0)
    assert.ok(!logs.join('').includes('test-secret'))
    if (shouldCall) {
      assert.equal(calls[0][0], 'https://api.sendgrid.com/v3/mail/send')
      const body = JSON.parse(calls[0][1].body)
      assert.equal(body.mail_settings.sandbox_mode.enable, true)
      assert.equal(body.personalizations[0].to[0].email, 'admin@example.invalid')
      assert.match(logs.join(''), /failed \(HTTP 401\)/)
      assert.match(logs.join(''), /invalid_expired_or_revoked_grant/)
    }
  }
})
