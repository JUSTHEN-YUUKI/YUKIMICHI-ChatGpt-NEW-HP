import { isPatchedNode } from '@/lib/runtime-security'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Read-only verification on Vercel-authenticated previews only. Never reveals
// environment variables, credentials, configuration values or customer data.
export function GET() {
  if (process.env.VERCEL_ENV !== 'preview') return new Response(null, { status: 404 })
  const patched = isPatchedNode(process.versions.node)
  return Response.json({ node: process.versions.node, brotli: process.versions.brotli, patched }, {
    status: patched ? 200 : 503,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  })
}
