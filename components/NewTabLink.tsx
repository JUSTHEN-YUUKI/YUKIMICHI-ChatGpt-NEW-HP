"use client"

import Link from "next/link"
import type { CSSProperties, MouseEventHandler, ReactNode } from "react"

type NewTabLinkProps = {
  href: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  ariaLabel?: string
  "aria-label"?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export default function NewTabLink({
  href,
  children,
  className,
  style,
  ariaLabel,
  "aria-label": ariaLabelAttr,
  onClick,
}: NewTabLinkProps) {
  if (href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        aria-label={ariaLabel ?? ariaLabelAttr}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={className}
      style={style}
      aria-label={ariaLabel ?? ariaLabelAttr}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
