import type { ReactNode } from 'react'
import Script from 'next/script'

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
      <Script id="services-sourcing-copy-replacement" strategy="afterInteractive">{`
        (() => {
          const replacements = [
            [
              '具体的な商品名、価格、在庫、輸出可否、取引可否は、案件ごとにメーカー・卸・関係機関へ確認します。',
              '日本国内のメーカー、卸、販売店などの情報をもとに、海外バイヤーの希望に合う日本商品を整理・提案し、取引可否、価格、在庫、輸出可否について確認・交渉を行います。'
            ],
            [
              'Product names, pricing, stock status, export eligibility, and transaction availability are confirmed case by case with suppliers and relevant parties.',
              'Based on information from Japanese manufacturers, wholesalers, and retailers, YUKIMICHI organizes and proposes suitable Japanese products for overseas buyers, and supports confirmation and negotiation of transaction availability, pricing, stock status, and export eligibility.'
            ]
          ]

          const applyCopyReplacement = () => {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
            const textNodes = []

            while (walker.nextNode()) {
              textNodes.push(walker.currentNode)
            }

            textNodes.forEach((node) => {
              const value = node.nodeValue || ''

              replacements.forEach(([from, to]) => {
                if (value.includes(from)) {
                  node.nodeValue = value.replace(from, to)
                }
              })
            })
          }

          applyCopyReplacement()
        })()
      `}</Script>
      {children}
    </>
  )
}
