'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { analyticsEventNames, type AnalyticsEventName, trackAnalyticsEvent } from '@/lib/analytics'

type AnalyticsEventsProps = {
  measurementId: string
}

function getClickEventName(anchor: HTMLAnchorElement): AnalyticsEventName | null {
  const rawHref = anchor.getAttribute('href')?.trim()

  if (!rawHref) {
    return null
  }

  const normalizedHref = rawHref.toLowerCase()

  if (normalizedHref.startsWith('mailto:')) {
    return analyticsEventNames.emailClick
  }

  if (normalizedHref.startsWith('tel:')) {
    return analyticsEventNames.phoneClick
  }

  try {
    const url = new URL(rawHref, window.location.href)

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return null
    }

    if (url.hostname === window.location.hostname) {
      return null
    }

    if (url.hostname === 'instagram.com' || url.hostname.endsWith('.instagram.com')) {
      return analyticsEventNames.instagramClick
    }

    return analyticsEventNames.outboundClick
  } catch {
    return null
  }
}

export default function AnalyticsEvents({ measurementId }: AnalyticsEventsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()
  const pagePath = search ? `${pathname}?${search}` : pathname

  useEffect(() => {
    if (typeof window.gtag !== 'function') {
      return
    }

    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
      send_to: measurementId,
    })
  }, [measurementId, pagePath])

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) {
        return
      }

      const anchor = event.target.closest<HTMLAnchorElement>('a[href]')

      if (!anchor) {
        return
      }

      const eventName = getClickEventName(anchor)

      if (eventName) {
        trackAnalyticsEvent(eventName)
      }
    }

    document.addEventListener('click', handleDocumentClick, true)

    return () => {
      document.removeEventListener('click', handleDocumentClick, true)
    }
  }, [])

  return null
}
