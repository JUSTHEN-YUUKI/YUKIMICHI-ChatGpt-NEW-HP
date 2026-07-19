import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OutboundAdminApp from '@/components/admin/OutboundAdminApp'

export const metadata: Metadata = {
  title: 'Outbound Lead Management | YUKIMICHI',
  description: 'Phase 1 outbound lead management screen for YUKIMICHI internal review.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function OutboundAdminPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return <OutboundAdminApp />
}
