type Environment = Record<string, string | undefined>

const mailbox = 'exporter@justhen.co.jp'

export function isMailbox(value: string) {
  return /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}$/.test(value)
}

// Credentials for another provider must never be sent to Sakura implicitly.
// Use SMTP_PASSWORD explicitly, rather than reusing the legacy SMTP_PASS.
export function getSmtpConfig(env: Environment = process.env) {
  const host = env.SMTP_HOST?.trim().toLowerCase() ?? ''
  const user = env.SMTP_USER?.trim() ?? ''
  const password = env.SMTP_PASSWORD ?? ''
  const from = env.SMTP_FROM?.trim() ?? ''
  const notificationEmail = env.CONTACT_NOTIFICATION_EMAIL?.trim() || env.CONTACT_TO_EMAIL?.trim() || ''
  const missing = [
    ['SMTP_HOST', host], ['SMTP_USER', user], ['SMTP_PASSWORD', password],
    ['SMTP_FROM', from], ['CONTACT_NOTIFICATION_EMAIL', notificationEmail],
  ].filter(([, value]) => !value).map(([key]) => key)
  if (missing.length) return { ok: false as const, missing, reason: 'missing_configuration' }

  if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.sakura\.ne\.jp$/.test(host)) {
    return { ok: false as const, missing: [], reason: 'sakura_initial_domain_required' }
  }
  if ((env.SMTP_PORT?.trim() || '587') !== '587') {
    return { ok: false as const, missing: [], reason: 'starttls_port_587_required' }
  }
  // Authenticate as the sender itself. Aliases require a separately reviewed
  // configuration; an unrelated saved account does not prove send permission.
  if (!isMailbox(user) || user.toLowerCase() !== mailbox ||
      from.toLowerCase() !== mailbox || notificationEmail.toLowerCase() !== mailbox) {
    return { ok: false as const, missing: [], reason: 'sender_and_notification_mailbox_mismatch' }
  }
  return { ok: true as const, host, user, password, from, notificationEmail }
}

export function smtpTransportOptions(config: Extract<ReturnType<typeof getSmtpConfig>, { ok: true }>) {
  return {
    host: config.host, port: 587, secure: false, requireTLS: true,
    auth: { user: config.user, pass: config.password },
    tls: { minVersion: 'TLSv1.2' as const, rejectUnauthorized: true, servername: config.host },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 10000,
    pool: false as const, logger: false, debug: false,
    disableFileAccess: true, disableUrlAccess: true,
  }
}
