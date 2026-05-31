"use client"

import { useEffect, useState } from "react"

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      type="button"
      className="back-to-top-button"
      aria-label="ページ上部へ戻る"
      data-visible={visible}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
      <style>{`
        .back-to-top-button {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 900;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border: 1px solid rgba(201,168,76,0.55);
          border-radius: 999px;
          background: rgba(7,17,31,0.88);
          color: var(--washi);
          cursor: pointer;
          font-size: 20px;
          line-height: 1;
          box-shadow: 0 18px 45px rgba(0,0,0,0.28);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          opacity: 0;
          pointer-events: none;
          transform: translateY(10px);
          transition: opacity 0.3s ease, transform 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }

        .back-to-top-button[data-visible="true"] {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .back-to-top-button:hover,
        .back-to-top-button:focus-visible {
          border-color: var(--gold);
          color: var(--gold);
          outline: none;
          transform: translateY(-3px);
        }

        @media (max-width: 640px) {
          .back-to-top-button {
            width: 44px;
            height: 44px;
            right: 16px;
            bottom: 16px;
          }
        }
      `}</style>
    </button>
  )
}
