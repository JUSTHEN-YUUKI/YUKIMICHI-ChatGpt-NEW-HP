"use client"

import SmartLink from "@/components/SmartLink"
import type { ComponentProps } from "react"

export default function NewTabLink(props: ComponentProps<typeof SmartLink>) {
  return <SmartLink {...props} />
}
