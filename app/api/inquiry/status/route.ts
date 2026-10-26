import { isInquirySubmissionEnabled, isMaintenanceEnabled } from '@/lib/maintenance'
import { isPatchedNode } from '@/lib/runtime-security'
import { getSmtpConfig } from '@/lib/smtp-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const preferredRegion = 'hnd1'

let runtimeRecorded = false

export function GET() {
  const patched = isPatchedNode(process.versions.node)
  if (!runtimeRecorded) {
    // Actual Function runtime, including while submissions are off. No secrets
    // or version details are returned by this public readiness endpoint.
    console.info('[inquiry] Function runtime', { node: process.versions.node, patched })
    runtimeRecorded = true
  }
  const available = !isMaintenanceEnabled() && isInquirySubmissionEnabled() && patched && getSmtpConfig().ok
  return Response.json({ available }, { headers: {
    'Cache-Control': 'no-store, max-age=0', 'CDN-Cache-Control': 'no-store',
    'Vercel-CDN-Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
  } })
}
