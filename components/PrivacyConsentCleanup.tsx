'use client'

import { useEffect } from 'react'

const targetPaths = new Set(['/quote', '/contact'])

export default function PrivacyConsentCleanup() {
  useEffect(() => {
    if (!targetPaths.has(window.location.pathname)) {
      return
    }

    function disableHiddenPrivacyRequirement() {
      document
        .querySelectorAll<HTMLInputElement>('form.inquiry-form input[name="privacyConsent"][type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.required = false
          checkbox.removeAttribute('required')
          checkbox.tabIndex = -1
        })
    }

    disableHiddenPrivacyRequirement()

    const observer = new MutationObserver(disableHiddenPrivacyRequirement)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}
