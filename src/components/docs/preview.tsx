import * as React from "react"
import { cn } from "@/lib/utils"

interface PreviewProps extends React.ComponentProps<"div"> {
  children: React.ReactNode
}

function Preview({ children, className, ...props }: PreviewProps) {
  return (
    <div
      className={cn(
        "border border-border bg-background1 p-8",
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Preview }
