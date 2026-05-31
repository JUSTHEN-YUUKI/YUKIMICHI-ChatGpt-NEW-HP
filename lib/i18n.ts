export const languages = ['ja', 'en', 'zh', 'es'] as const

export type Language = (typeof languages)[number]

export const defaultLanguage: Language = 'ja'

export const LANGUAGE_STORAGE_KEY = 'yukimichi-language'

export const languageLabels: Record<Language, string> = {
  ja: 'JP',
  en: 'EN',
  zh: '中文',
  es: 'ES',
}

export const languageNames: Record<Language, string> = {
  ja: '日本語',
  en: 'English',
  zh: '中文',
  es: 'Español',
}

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && languages.includes(value as Language)
}
