'use client'

import { languages, languageFlags, languageLabels, languageNames } from '@/lib/i18n'
import { translations } from '@/lib/translations'
import { useLanguage } from '@/components/LanguageProvider'

type LanguageSwitcherProps = {
  className?: string
  variant?: 'compact' | 'full'
}

export default function LanguageSwitcher({ className, variant = 'compact' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={className}
      aria-label={translations[language].navigation.language}
      style={{
        alignItems: 'center',
        border: '1px solid rgba(201,168,76,0.18)',
        display: 'inline-flex',
        gap: '2px',
        padding: '3px',
      }}
    >
      {languages.map((item) => {
        const active = item === language

        return (
          <button
            aria-label={languageNames[item]}
            aria-pressed={active}
            key={item}
            onClick={() => setLanguage(item)}
            type="button"
            style={{
              background: active ? 'rgba(201,168,76,0.16)' : 'transparent',
              border: 0,
              color: active ? 'var(--gold)' : 'var(--washi-dim)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '10px',
              letterSpacing: '0.08em',
              lineHeight: 1,
              minHeight: '32px',
              minWidth: variant === 'full' ? '108px' : '58px',
              padding: '6px 8px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            <img
              alt=""
              aria-hidden="true"
              src={languageFlags[item]}
              style={{
                border: '1px solid rgba(248,245,239,0.18)',
                display: 'block',
                height: '12px',
                objectFit: 'cover',
                width: '18px',
              }}
            />
            <span>{variant === 'full' ? languageNames[item] : languageLabels[item]}</span>
          </button>
        )
      })}
    </div>
  )
}
