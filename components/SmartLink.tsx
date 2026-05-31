"use client"

import NextLink from "next/link"
import type { CSSProperties, MouseEventHandler, ReactNode } from "react"
import { useLinkBehavior } from "@/components/LinkBehaviorProvider"

type SmartLinkProps = {
  href: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  ariaLabel?: string
  "aria-label"?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

function isInternalLink(href: string) {
  return href.startsWith("/") && !href.startsWith("//")
}

function isAnchorLink(href: string) {
  return href.startsWith("#")
}

function isMailLink(href: string) {
  return href.startsWith("mailto:")
}

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")
}

export default function SmartLink({
  href,
  children,
  className,
  style,
  ariaLabel,
  "aria-label": ariaLabelAttr,
  onClick,
}: SmartLinkProps) {
  const { behavior } = useLinkBehavior()
  const label = ariaLabel ?? ariaLabelAttr
  const openInNewTab =
    isExternalLink(href) || (isInternalLink(href) && behavior === "new-tab")

  if (isInternalLink(href)) {
    return (
      <NextLink
        href={href}
        className={className}
        style={style}
        aria-label={label}
        onClick={onClick}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </NextLink>
    )
  }

  return (
    <a
      href={href}
      className={className}
      style={style}
      aria-label={label}
      onClick={onClick}
      target={!isMailLink(href) && !isAnchorLink(href) && openInNewTab ? "_blank" : undefined}
      rel={!isMailLink(href) && !isAnchorLink(href) && openInNewTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  )
}
