import type { ReactNode } from 'react'

export default function QuoteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <style>{`
        .inquiry-form--quote .inquiry-form__label {
          align-items: flex-start;
          min-height: 44px;
        }

        @media (max-width: 720px) {
          .inquiry-form--quote .inquiry-form__label {
            min-height: 22px;
          }
        }
      `}</style>
    </>
  )
}
