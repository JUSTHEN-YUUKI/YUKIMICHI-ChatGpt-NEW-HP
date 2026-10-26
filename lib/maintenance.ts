// Incident lock: remove only with explicit owner release authorization and
// after all conditions attached to that authorization have been verified.
// The owner's 2026-10-26 conditional approval is recorded in the release runbook.
// Dates, builds and environment changes alone never unlock the source lock.
const PRODUCTION_MAINTENANCE_LOCK = true

export function isMaintenanceEnabled() {
  // Read only trusted server environment, never request headers/cookies/query.
  if (process.env.VERCEL_ENV === 'production') {
    return PRODUCTION_MAINTENANCE_LOCK || process.env.MAINTENANCE_MODE?.trim().toLowerCase() !== 'off'
  }
  if (process.env.MAINTENANCE_MODE?.trim().toLowerCase() === 'on') return true
  // Enable normal previews only AFTER Vercel Deployment Protection is verified.
  // New/automatic previews therefore remain closed by default during incident.
  if (process.env.VERCEL_ENV === 'preview') return process.env.MAINTENANCE_PREVIEW_SITE_ENABLED !== 'on'
  // Protect production-like deployments outside Vercel as well.
  return process.env.NODE_ENV === 'production' &&
    (PRODUCTION_MAINTENANCE_LOCK || process.env.MAINTENANCE_MODE?.trim().toLowerCase() !== 'off')
}

export const maintenanceHeaders = {
  'Cache-Control': 'no-store, max-age=0',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
  // A crawler retry interval, NOT a reopening time or an automatic unlock.
  'Retry-After': '3600',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
}

export function maintenanceApiResponse() {
  return Response.json(
    {
      ok: false,
      code: 'MAINTENANCE',
      error: '現在、セキュリティメンテナンスのため受付を停止しております。',
      message: 'Temporarily unavailable during security maintenance.',
      contact: 'exporter@justhen.co.jp',
    },
    { status: 503, headers: maintenanceHeaders },
  )
}

// Standalone HTML: no React hydration, external assets, analytics or scripts.
export const maintenanceHtml = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#0A1F38">
<title>緊急セキュリティメンテナンス | YUKIMICHI</title>
<style>
*{box-sizing:border-box}html{color-scheme:dark}body{margin:0;background:#0a1f38;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans JP",sans-serif;line-height:1.9;min-height:100svh;display:grid;place-items:center;padding:48px 24px}main{width:100%;max-width:740px}.brand{font-size:30px;letter-spacing:.24em;font-weight:500;margin:0}.tagline{font-size:10px;letter-spacing:.28em;color:#bdac83;margin:2px 0 42px}.icons{display:flex;gap:16px;color:#bdac83;margin-bottom:24px}.icons svg{width:34px;height:34px}h1{font-size:clamp(20px,3.8vw,29px);font-weight:500;letter-spacing:.04em;line-height:1.6;margin:0 0 25px}.notice{font-size:15px;color:#e1e6ed;margin:0 0 18px}.english{border-top:1px solid #bdac8340;margin-top:34px;padding-top:25px;color:#b9c6d5}.english h2{font-size:17px;font-weight:500;color:#fff;margin:0 0 12px}.english p{font-size:14px;margin:0 0 10px}.contact{margin:32px 0 0}.contact span{display:block;color:#bdac83;font-size:12px;letter-spacing:.08em}a{color:#fff;text-decoration-color:#bdac83;text-underline-offset:6px;overflow-wrap:anywhere}a:focus-visible{outline:2px solid #bdac83;outline-offset:6px}footer{margin-top:35px;font-size:12px;color:#a7b7c9}footer p{margin:0}@media(max-width:480px){body{padding:32px 22px}.brand{font-size:25px}.tagline{margin-bottom:30px}.notice{font-size:14px}}
</style>
</head>
<body><main>
<p class="brand">YUKIMICHI</p><p class="tagline">JAPAN EXPORT SUPPORT</p>
<div class="icons" aria-hidden="true">
<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M16 3v26M4.7 9.5l22.6 13M4.7 22.5l22.6-13M12 6l4 4 4-4M12 26l4-4 4 4M5 14l5-1 1-5M21 24l1-5 5-1M5 18l5 1 1 5M21 8l1 5 5 1"/></svg>
<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3 27 7v8c0 6-4 10-11 14C9 25 5 21 5 15V7Z"/><path d="m11 16 3 3 7-7"/></svg>
</div>
<h1>緊急セキュリティメンテナンスのお知らせ</h1>
<p class="notice">現在、セキュリティ対策および安全性の確認のため、当サイトを一時的に停止しております。</p>
<p class="notice">再開時期は未定です。<br>安全性の確認が完了次第、サービスを再開いたします。</p>
<section class="english" lang="en" aria-labelledby="english-heading"><h2 id="english-heading">Emergency Security Maintenance</h2>
<p>Our website is temporarily unavailable while we carry out precautionary security checks and maintenance.</p>
<p>Service will resume following a security review.</p></section>
<p class="contact"><span>お問い合わせ / CONTACT</span><a href="mailto:exporter@justhen.co.jp">exporter@justhen.co.jp</a></p>
<footer><p lang="en">JUSTHEN Co., Ltd.</p><p>株式会社ジャッセン</p></footer>
</main></body></html>`

// Yahoo! JAPAN's in-app browser replaces HTTP error responses with its own
// error screen. Only its public HTML navigations use a successful transport
// status; they still receive exactly the same static maintenance notice.
// This is a presentation decision, never authorization to run the normal app.
export function maintenancePageStatus({
  pathname,
  method,
  userAgent,
  accept,
}: {
  pathname: string
  method: string
  userAgent: string
  accept: string
}): 200 | 503 {
  if (method !== 'GET' && method !== 'HEAD') return 503
  if (!/\bYJApp-(?:ANDROID|IOS)\b/i.test(userAgent)) return 503
  if (!accept.toLowerCase().includes('text/html')) return 503

  let decodedPath: string
  try {
    decodedPath = decodeURIComponent(pathname)
  } catch {
    return 503
  }
  // Keep APIs, admin, framework internals and file downloads on 503 even if a
  // caller supplies Yahoo's user agent and HTML Accept header.
  if (/^\/(?:api|admin|_next)(?:\/|$)/i.test(decodedPath) || decodedPath.includes('.')) return 503
  return 200
}

export function maintenancePageResponse(status: 200 | 503 = 503) {
  const headers = new Headers({
    ...maintenanceHeaders,
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Language': 'ja, en',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; script-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    'Vary': 'User-Agent, Accept',
  })
  if (status === 200) headers.delete('Retry-After')
  return new Response(maintenanceHtml, {
    status,
    headers,
  })
}
