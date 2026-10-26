import nodemailer from 'nodemailer'
import { getSmtpConfig, smtpTransportOptions } from './smtp-config'

type SmtpConfig = Extract<ReturnType<typeof getSmtpConfig>, { ok: true }>
type Message = { to: string; replyTo: string; subject: string; text: string; html: string }

export function createInquiryMailer(config: SmtpConfig) {
  const transport = nodemailer.createTransport(smtpTransportOptions(config))
  return {
    async verify() { await transport.verify() },
    async send(message: Message) {
      const result = await transport.sendMail({ ...message, from: config.from,
        envelope: { from: config.from, to: [message.to] } })
      // SMTP acceptance is not proof of inbox delivery. Never return success
      // when the intended single recipient was rejected or left unaccepted.
      if (result.rejected.length || !result.accepted.some(recipient =>
        typeof recipient === 'string' && recipient.toLowerCase() === message.to.toLowerCase())) {
        throw Object.assign(new Error('Recipient was not accepted'), { code: 'ERECIPIENT' })
      }
    },
    close() { transport.close() },
  }
}

// Log bounded categories only, never provider strings, auth commands, addresses,
// credentials, message content, SMTP responses, or exception stacks.
export function safeSmtpError(error: unknown) {
  const details = error && typeof error === 'object' ? error as { code?: unknown; responseCode?: unknown } : {}
  const allowed = ['EAUTH', 'ECONNECTION', 'ESOCKET', 'ETIMEDOUT', 'EDNS', 'ETLS', 'EENVELOPE', 'EMESSAGE', 'ERECIPIENT', 'ECONNREFUSED', 'ECONNRESET', 'ENOTFOUND']
  const code = typeof details.code === 'string' && allowed.includes(details.code) ? details.code : 'SMTP_ERROR'
  const responseCode = typeof details.responseCode === 'number' && Number.isInteger(details.responseCode) &&
    details.responseCode >= 400 && details.responseCode <= 599 ? details.responseCode : undefined
  return { code, responseCode }
}
