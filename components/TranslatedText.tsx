'use client'

import type { CSSProperties } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { translateStringArray, translateText } from '@/lib/translations'

type TranslatedTextProps = {
  id: string
  fallback?: string
  className?: string
  style?: CSSProperties
}

export function TranslatedText({ id, fallback = '', className, style }: TranslatedTextProps) {
  const { language } = useLanguage()

  return (
    <span className={className} style={style}>
      {translateText(language, id, fallback)}
    </span>
  )
}

type TranslatedListProps = {
  id: string
  fallback?: readonly string[]
  className?: string
}

export function TranslatedList({ id, fallback = [], className }: TranslatedListProps) {
  const { language } = useLanguage()
  const items = translateStringArray(language, id, fallback)

  return (
    <>
      {items.map((item) => (
        <li className={className} key={item}>
          {item}
        </li>
      ))}
    </>
  )
}
