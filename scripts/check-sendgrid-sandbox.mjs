// Explicit, no-delivery diagnostic. Never installs a public credentialed endpoint.
// A mail diagnostic failure must not stop static public-page deployment.
if (process.env.VERCEL_ENV === 'production' && process.env.SENDGRID_SANDBOX_VERIFY === 'on') {
  const key = process.env.SENDGRID_API_KEY?.trim()
  const from = process.env.SENDGRID_FROM_EMAIL?.trim()
  const to = process.env.CONTACT_TO_EMAIL?.trim()
  if (!key || !from || !to) {
    console.warn('SendGrid Sandbox verification: unavailable (missing configuration); inquiry remains independently gated.')
  } else {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST', redirect: 'error', signal: AbortSignal.timeout(10000),
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ personalizations: [{ to: [{ email: to }] }],
          from: { email: from }, subject: 'YUKIMICHI sandbox configuration verification',
          content: [{ type: 'text/plain', value: 'Sandbox validation only. No email delivery.' }],
          mail_settings: { sandbox_mode: { enable: true } } }),
      })
      await response.body?.cancel()
      console.log(`SendGrid Sandbox verification: ${response.status === 200 ? 'accepted' : 'failed'} (HTTP ${response.status}); no delivery requested.`)
    } catch {
      console.warn('SendGrid Sandbox verification: network failure; no delivery requested.')
    }
  }
}
