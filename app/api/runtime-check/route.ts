import { isPatchedNode } from '@/lib/runtime-security'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Read-only verification on Vercel-authenticated previews only. Never reveals
// environment variables, credentials, configuration values or customer data.
export function GET(request: Request) {
  if (process.env.VERCEL_ENV !== 'preview') return new Response(null, { status: 404 })
  const patched = isPatchedNode(process.versions.node)
  const result = { node: process.versions.node, brotli: process.versions.brotli, patched }
  // Some embedded browsers block top-level JSON navigation. Keep the same
  // non-sensitive metadata readable inside the authenticated Preview only.
  if (request.headers.get('Accept')?.includes('text/html')) {
    const escaped = JSON.stringify(result, null, 2).replace(/[<>&]/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[character]!)
    return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Preview runtime verification</title><h1>Preview runtime verification</h1><pre>${escaped}</pre></html>`, {
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'" },
    })
  }
  return Response.json(result, {
    // This is authenticated diagnostic metadata, not an availability signal.
    // Keep it readable in browsers that replace JSON error-status navigations.
    status: 200,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  })
}
