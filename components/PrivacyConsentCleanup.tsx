'use client'

import { useEffect } from 'react'

const targetPaths = new Set(['/quote', '/contact'])

export default function PrivacyConsentCleanup() {
  useEffect(() => {
    if (!targetPaths.has(window.location.pathname)) {
      return
    }

    function cleanupPrivacyConsent() {
      document.querySelectorAll<HTMLFormElement>('form.inquiry-form').forEach((form) => {
        form.querySelectorAll<HTMLLabelElement>('.inquiry-form__privacy').forEach((label) => {
          label.remove()
        })

        if (!form.querySelector('input[name="privacyConsent"][type="hidden"]')) {
          const hiddenConsent = document.createElement('input')
          hiddenConsent.type = 'hidden'
          hiddenConsent.name = 'privacyConsent'
          hiddenConsent.value = 'on'
          form.appendChild(hiddenConsent)
        }
      })
    }

    cleanupPrivacyConsent()

    const observer = new MutationObserver(cleanupPrivacyConsent)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}
