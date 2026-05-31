"use client"

import { useLinkBehavior } from "@/components/LinkBehaviorProvider"

export default function LinkBehaviorToggle() {
  const { behavior, setBehavior } = useLinkBehavior()
  const opensNewTab = behavior === "new-tab"

  return (
    <div className="link-behavior-toggle" aria-label="Link behavior setting">
      <span>リンク：</span>
      <button
        type="button"
        aria-pressed={opensNewTab}
        onClick={() => setBehavior(opensNewTab ? "same-tab" : "new-tab")}
      >
        {opensNewTab ? "新しいタブ" : "同じタブ"}
      </button>

      <style>{`
        .link-behavior-toggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-height: 34px;
          padding: 0 10px;
          border: 1px solid rgba(201,168,76,0.16);
          background: rgba(7,17,31,0.36);
          color: var(--suzu);
          font-size: 10px;
          letter-spacing: 0.12em;
          white-space: nowrap;
        }

        .link-behavior-toggle button {
          appearance: none;
          border: 0;
          background: transparent;
          color: var(--gold);
          cursor: pointer;
          font: inherit;
          letter-spacing: inherit;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .link-behavior-toggle button:focus-visible {
          outline: 1px solid var(--gold);
          outline-offset: 3px;
        }

        @media (max-width: 1120px) {
          .link-behavior-toggle {
            justify-self: center;
            min-height: 38px;
          }
        }
      `}</style>
    </div>
  )
}
