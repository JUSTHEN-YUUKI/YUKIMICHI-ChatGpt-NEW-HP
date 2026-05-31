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
      aria-label="上へ戻る"
      data-visible={visible}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      TOP
      <style>{`
        .back-to-top-button {
          position: fixed;
          right: clamp(18px, 3vw, 32px);
          bottom: clamp(18px, 3vw, 32px);
          z-index: 900;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          border: 1px solid rgba(201,168,76,0.44);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.24), transparent 54%),
            rgba(7,17,31,0.92);
          color: var(--washi);
          cursor: pointer;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          letter-spacing: 0.16em;
          opacity: 0;
          pointer-events: none;
          transform: translateY(10px);
          transition: opacity 0.24s ease, transform 0.24s ease, border-color 0.24s ease;
        }

        .back-to-top-button[data-visible="true"] {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .back-to-top-button:hover,
        .back-to-top-button:focus-visible {
          border-color: var(--gold);
          outline: none;
        }

        @media (max-width: 640px) {
          .back-to-top-button {
            width: 50px;
            height: 50px;
            right: 16px;
            bottom: 16px;
          }
        }
      `}</style>
    </button>
  )
}
