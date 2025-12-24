"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "relative inline-flex shrink-0",
        "data-[orientation=horizontal]:h-lh data-[orientation=horizontal]:w-full",
        "data-[orientation=horizontal]:bg-[linear-gradient(0deg,transparent_0,transparent_calc(0.5lh-1px),var(--color-border)_calc(0.5lh-1px),var(--color-border)_calc(0.5lh+1px),transparent_calc(0.5lh+1px),transparent)]",
        "data-[orientation=vertical]:w-[1ch] data-[orientation=vertical]:h-full",
        "data-[orientation=vertical]:bg-[linear-gradient(to_right,transparent_0,transparent_calc(0.5ch-1px),var(--color-border)_calc(0.5ch-1px),var(--color-border)_calc(0.5ch+1px),transparent_calc(0.5ch+1px),transparent)]",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
