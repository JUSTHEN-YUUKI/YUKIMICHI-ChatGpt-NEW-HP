export const analyticsEventNames = {
  contactSubmit: 'contact_submit',
  quoteSubmit: 'quote_submit',
  instagramClick: 'instagram_click',
  emailClick: 'email_click',
  phoneClick: 'phone_click',
  outboundClick: 'outbound_click',
} as const

export type AnalyticsEventName = (typeof analyticsEventNames)[keyof typeof analyticsEventNames]

type Gtag = {
  (command: 'js', date: Date): void
  (command: 'config', targetId: string, config?: Record<string, unknown>): void
  (command: 'event', eventName: string, params?: Record<string, unknown>): void
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

export function trackAnalyticsEvent(eventName: AnalyticsEventName) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  window.gtag('event', eventName)
}
