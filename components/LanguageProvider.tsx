'use client'

import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { defaultLanguage, isLanguage, LANGUAGE_STORAGE_KEY, type Language } from '@/lib/i18n'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)

  useEffect(() => {
    let savedLanguage: string | null = null

    try {
      savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    } catch {
      savedLanguage = null
    }

    const nextLanguage = isLanguage(savedLanguage) ? savedLanguage : defaultLanguage

    setLanguageState(nextLanguage)
    document.documentElement.lang = nextLanguage
  }, [])

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage)

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
    } catch {
      // Keep language switching available even when browser storage is unavailable.
    }

    document.documentElement.lang = nextLanguage
  }, [])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }

  return context
}
