import type { ReactNode } from 'react'

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        @media (min-width: 1180px) {
          .services-title {
            font-size: clamp(48px, 5.1vw, 72px) !important;
            line-height: 1.08 !important;
            letter-spacing: -0.015em;
            max-width: none !important;
            white-space: nowrap !important;
          }

          .services-domestic-support {
            max-width: min(100%, 1280px) !important;
          }

          .services-domestic-support__head {
            max-width: none !important;
          }

          .services-domestic-support__head h2 {
            font-size: clamp(42px, 4.2vw, 58px) !important;
            line-height: 1.05 !important;
            letter-spacing: -0.015em;
            white-space: nowrap !important;
          }
        }

        @media (max-width: 1179px) {
          .services-title,
          .services-domestic-support__head h2 {
            white-space: normal;
          }
        }
      `}</style>
      {children}
    </>
  )
}
