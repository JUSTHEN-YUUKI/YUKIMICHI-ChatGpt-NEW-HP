// Explicit, no-delivery diagnostic. Never installs a public credentialed endpoint.
// A mail diagnostic failure must not stop static public-page deployment.
if (process.env.VERCEL_ENV === 'production' && process.env.SENDGRID_SANDBOX_VERIFY === 'on') {
  const key = process.env.SENDGRID_API_KEY?.trim()
  const from = process.env.SENDGRID_FROM_EMAIL?.trim()
  const to = process.env.CONTACT_TO_EMAIL?.trim()
  if (!key || !from || !to) {
    console.warn('SendGrid Sandbox verification: unavailable (missing configuration); inquiry remains independently gated.')
  } else {
    // Report only categories, never the key, addresses, or raw provider errors.
    console.log(`SendGrid configuration: key_shape=${/^SG\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(key) ? 'expected' : 'unexpected'}; embedded_whitespace=${/\s/.test(key) ? 'yes' : 'no'}; bearer_prefix=${/^Bearer\s/i.test(key) ? 'yes' : 'no'}.`)
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST', redirect: 'error', signal: AbortSignal.timeout(10000),
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ personalizations: [{ to: [{ email: to }] }],
          from: { email: from }, subject: 'YUKIMICHI sandbox configuration verification',
          content: [{ type: 'text/plain', value: 'Sandbox validation only. No email delivery.' }],
          mail_settings: { sandbox_mode: { enable: true } } }),
      })
      let reason = 'unspecified'
      if (response.status !== 200) {
        try {
          const data = await response.json()
          const messages = Array.isArray(data?.errors) ? data.errors.map(item => typeof item?.message === 'string' ? item.message.toLowerCase() : '').join(' ') : ''
          if (/authorization grant.*(?:invalid|expired|revoked)/.test(messages)) reason = 'invalid_expired_or_revoked_grant'
          else if (/permission|access forbidden|scope/.test(messages)) reason = 'permission_denied'
          else if (/verified sender|sender identity|sender authentication/.test(messages)) reason = 'sender_authentication'
        } catch { /* Do not log provider content, even if the format changes. */ }
      } else {
        await response.body?.cancel()
      }
      console.log(`SendGrid Sandbox verification: ${response.status === 200 ? 'accepted' : 'failed'} (HTTP ${response.status}); no delivery requested.`)
      if (response.status !== 200) console.log(`SendGrid provider error category: ${reason}.`)
    } catch {
      console.warn('SendGrid Sandbox verification: network failure; no delivery requested.')
    }
  }
}
