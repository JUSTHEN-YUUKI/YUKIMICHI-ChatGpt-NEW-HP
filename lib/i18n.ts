export const languages = ['ja', 'en', 'zh', 'es'] as const

export type Language = (typeof languages)[number]

export const defaultLanguage: Language = 'ja'

export const LANGUAGE_STORAGE_KEY = 'yukimichi-language'

export const multilingualUiEnabled = false

export const languageLabels: Record<Language, string> = {
  ja: 'JP',
  en: 'EN',
  zh: '中文',
  es: 'ES',
}

export const languageShortLabels: Record<Language, string> = {
  ja: 'JP',
  en: 'EN',
  zh: '中文',
  es: 'ES',
}

export const languageFlags: Record<Language, string> = {
  ja: '/flags/jp.svg',
  en: '/flags/us.svg',
  zh: '/flags/cn.svg',
  es: '/flags/es.svg',
}

export const languageNames: Record<Language, string> = {
  ja: '日本語',
  en: 'English',
  zh: '简体中文',
  es: 'Español',
}

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && languages.includes(value as Language)
}
