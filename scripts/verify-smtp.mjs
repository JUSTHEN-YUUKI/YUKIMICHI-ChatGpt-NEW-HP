// Explicit SMTP authentication diagnostic. No MAIL FROM, RCPT TO, or DATA.
// Use the target Function's protected Preview to verify Vercel connectivity;
// a successful local run alone is not evidence about Vercel or inbox delivery.
import nodemailer from 'nodemailer'
import { getSmtpConfig, smtpTransportOptions } from '../lib/smtp-config.ts'
import { isPatchedNode } from '../lib/runtime-security.ts'

if (!isPatchedNode(process.versions.node)) throw new Error('A patched Node.js runtime is required.')
const config = getSmtpConfig()
if (!config.ok) {
  console.error('SMTP verification unavailable', { reason: config.reason, missing: config.missing })
  process.exitCode = 1
} else {
  const transport = nodemailer.createTransport(smtpTransportOptions(config))
  try {
    await transport.verify()
    console.log('SMTP DNS/TCP/STARTTLS/authentication succeeded. No message was sent. Inbox delivery is unverified.')
  } catch (error) {
    const allowed = ['EAUTH', 'ECONNECTION', 'ESOCKET', 'ETIMEDOUT', 'EDNS', 'ETLS', 'ECONNREFUSED', 'ECONNRESET', 'ENOTFOUND']
    console.error('SMTP verification failed', { code: allowed.includes(error?.code) ? error.code : 'SMTP_ERROR' })
    process.exitCode = 1
  } finally { transport.close() }
}
