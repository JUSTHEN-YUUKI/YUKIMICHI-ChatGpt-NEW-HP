import type { Metadata } from 'next'
import OutboundAdminApp from '@/components/admin/OutboundAdminApp'

export const metadata: Metadata = {
  title: 'Outbound Lead Management | YUKIMICHI',
  description: 'Phase 1 outbound lead management screen for YUKIMICHI internal review.',
}

export default function OutboundAdminPage() {
  return <OutboundAdminApp />
}
