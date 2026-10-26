import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

function fixture(env = {}, deliveryResult, send) {
  const options = [], messages = [], closed = []
  const cache = new Map()
  function load(path) {
    if (cache.has(path)) return cache.get(path)
    const exports = {}
    cache.set(path, exports)
    const source = readFileSync(new URL(`../${path}.ts`, import.meta.url), 'utf8')
    const { outputText } = ts.transpileModule(source, { compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true,
    } })
    vm.runInNewContext(outputText, { exports, process: { env, versions: { node: env.TEST_NODE || '24.22.1' } },
      Response, console: { info() {} }, require(name) {
        if (name.startsWith('@/')) return load(name.slice(2))
        if (name === './smtp-config') return load('lib/smtp-config')
        if (name === 'nodemailer') return { createTransport(config) {
          options.push(config)
          return { async verify() {}, close() { closed.push(true) }, async sendMail(message) {
            messages.push(message)
            await send?.(message)
            return deliveryResult ?? { accepted: [message.to], rejected: [] }
          } }
        } }
        throw new Error(`Unexpected module ${name}`)
      },
    })
    return exports
  }
  return { load, options, messages, closed }
}

const valid = { SMTP_HOST: 'example.sakura.ne.jp', SMTP_PORT: '587', SMTP_USER: 'exporter@justhen.co.jp',
  SMTP_PASSWORD: ' secret-with-intentional-spaces ', SMTP_FROM: 'exporter@justhen.co.jp', CONTACT_NOTIFICATION_EMAIL: 'exporter@justhen.co.jp' }

test('SMTP configuration rejects another provider, wrong port, unapproved sender and missing password', () => {
  const { getSmtpConfig, isMailbox } = fixture().load('lib/smtp-config')
  for (const change of [{ SMTP_HOST: 'mail.onamae.ne.jp' }, { SMTP_HOST: 'example.sakura.ne.jp.attacker.invalid' },
    { SMTP_HOST: 'example.sakura.ne.jp\u0000.attacker.invalid' }, { SMTP_HOST: '１２７.0.0.1' },
    { SMTP_PORT: '25' }, { SMTP_PORT: '465' }, { SMTP_USER: 'other@justhen.co.jp' },
    { SMTP_FROM: 'other@justhen.co.jp' }, { CONTACT_NOTIFICATION_EMAIL: 'other@example.invalid' },
    { SMTP_PASSWORD: '', SMTP_PASS: 'legacy-other-provider-secret' }]) {
    assert.equal(getSmtpConfig({ ...valid, ...change }).ok, false)
  }
  assert.equal(getSmtpConfig(valid).password, valid.SMTP_PASSWORD)
  for (const address of ['victim@example.invalid,other@example.invalid', 'a@example.invalid\r\nBcc: b@example.invalid', 'Name <a@example.invalid>']) {
    assert.equal(isMailbox(address), false)
  }
})

test('SMTP requires STARTTLS, verifies the certificate, disables content fetching and waits for acceptance', async () => {
  let release
  const completion = new Promise(resolve => { release = resolve })
  const f = fixture({}, undefined, () => completion)
  const config = f.load('lib/smtp-config').getSmtpConfig(valid)
  const mailer = f.load('lib/smtp-mail').createInquiryMailer(config)
  const message = { to: 'exporter@justhen.co.jp', replyTo: 'buyer@example.invalid', subject: 'test', text: '日本語 / 中文 / English / Español', html: '<p>test</p>' }
  let resolved = false
  const pending = mailer.send(message).then(() => { resolved = true })
  await Promise.resolve()
  assert.equal(resolved, false)
  release()
  await pending
  assert.equal(resolved, true)
  const [options] = f.options
  assert.equal(options.port, 587)
  assert.equal(options.requireTLS, true)
  assert.equal(options.secure, false)
  assert.equal(options.tls.rejectUnauthorized, true)
  assert.equal(options.tls.servername, valid.SMTP_HOST)
  assert.equal(options.tls.minVersion, 'TLSv1.2')
  assert.equal(options.disableFileAccess, true)
  assert.equal(options.disableUrlAccess, true)
  assert.equal(options.logger, false)
  assert.equal(options.debug, false)
  assert.equal(f.messages[0].envelope.from, valid.SMTP_FROM)
  assert.equal(f.messages[0].replyTo, message.replyTo)
  mailer.close()
  assert.equal(f.closed.length, 1)
})

test('SMTP recipient rejection cannot be reported as successful; error logging is bounded', async () => {
  for (const result of [{ accepted: [], rejected: [] }, { accepted: [], rejected: ['exporter@justhen.co.jp'] },
    { accepted: ['other@example.invalid'], rejected: [] }]) {
    const f = fixture({}, result)
    const mod = f.load('lib/smtp-mail')
    const mailer = mod.createInquiryMailer(f.load('lib/smtp-config').getSmtpConfig(valid))
    await assert.rejects(mailer.send({ to: valid.SMTP_FROM }), { code: 'ERECIPIENT' })
    const output = mod.safeSmtpError({ code: valid.SMTP_PASSWORD, responseCode: 'secret', message: 'secret', command: 'AUTH secret', response: 'secret' })
    assert.equal(JSON.stringify(output), '{"code":"SMTP_ERROR"}')
    assert.equal(mod.safeSmtpError({ code: 'EAUTH', responseCode: 535 }).responseCode, 535)
  }
})

test('readiness uses actual runtime and SMTP settings; public response exposes only a boolean', async () => {
  for (const [change, available] of [[{}, true], [{ TEST_NODE: '24.21.0' }, false], [{ SMTP_PASSWORD: '' }, false],
    [{ INQUIRY_MODE: 'off' }, false], [{ MAINTENANCE_MODE: 'on' }, false]]) {
    const f = fixture({ ...valid, VERCEL_ENV: 'production', MAINTENANCE_MODE: 'off', INQUIRY_MODE: 'on', ...change })
    const response = f.load('app/api/inquiry/status/route').GET()
    assert.equal(await response.text(), JSON.stringify({ available }))
    assert.match(response.headers.get('Cache-Control'), /no-store/)
    assert.equal(f.messages.length, 0)
  }
})

test('Git-integrated deployments skip every unrelated project and unknown project identity', () => {
  const source = readFileSync(new URL('../scripts/vercel-project-scope.mjs', import.meta.url), 'utf8')
  for (const [projectId, code] of [['prj_qSdp3iNVTw2uI7RXlhiCX3hZnwUH', 1], ['unrelated-project', 0], [undefined, 0]]) {
    const process = { env: { VERCEL_PROJECT_ID: projectId }, exitCode: undefined }
    vm.runInNewContext(source, { process, console: { log() {} } })
    assert.equal(process.exitCode, code)
  }
})
