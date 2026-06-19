import type { ReactNode } from 'react'

export default function QuoteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <style>{`
        .inquiry-form--quote .inquiry-form__field {
          gap: 5px;
        }

        .inquiry-form--quote .inquiry-form__label {
          align-items: flex-end;
          line-height: 1.35;
          min-height: 34px;
        }

        @media (max-width: 720px) {
          .inquiry-form--quote .inquiry-form__field {
            gap: 7px;
          }

          .inquiry-form--quote .inquiry-form__label {
            align-items: center;
            line-height: 1.6;
            min-height: 22px;
          }
        }
      `}</style>
    </>
  )
}
