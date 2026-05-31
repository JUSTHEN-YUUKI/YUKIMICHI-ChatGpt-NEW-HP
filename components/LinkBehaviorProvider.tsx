"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type LinkBehavior = "new-tab" | "same-tab"

type LinkBehaviorContextValue = {
  behavior: LinkBehavior
  setBehavior: (behavior: LinkBehavior) => void
}

const STORAGE_KEY = "yukimichi-link-behavior"

const LinkBehaviorContext = createContext<LinkBehaviorContextValue>({
  behavior: "new-tab",
  setBehavior: () => {},
})

export function LinkBehaviorProvider({ children }: { children: ReactNode }) {
  const [behavior, setBehaviorState] = useState<LinkBehavior>("new-tab")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)

    if (stored === "new-tab" || stored === "same-tab") {
      setBehaviorState(stored)
    }
  }, [])

  const setBehavior = useCallback((nextBehavior: LinkBehavior) => {
    setBehaviorState(nextBehavior)
    window.localStorage.setItem(STORAGE_KEY, nextBehavior)
  }, [])

  const value = useMemo(
    () => ({
      behavior,
      setBehavior,
    }),
    [behavior, setBehavior],
  )

  return (
    <LinkBehaviorContext.Provider value={value}>
      {children}
    </LinkBehaviorContext.Provider>
  )
}

export function useLinkBehavior() {
  return useContext(LinkBehaviorContext)
}
