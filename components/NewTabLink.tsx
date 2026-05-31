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

function shouldOpenInNewTab(href: string) {
  return href.startsWith("/") && !href.startsWith("//")
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
  const openInNewTab = shouldOpenInNewTab(href)

  return (
    <Link
      href={href}
      className={className}
      style={style}
      aria-label={ariaLabel ?? ariaLabelAttr}
      onClick={onClick}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  )
}
