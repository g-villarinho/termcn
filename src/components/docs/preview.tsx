import * as React from "react"
import { Card, CardContent } from "registry/ui/card"
import { cn } from "@/lib/utils"

interface PreviewProps extends React.ComponentProps<"div"> {
  children: React.ReactNode
}

function Preview({ children, className, ...props }: PreviewProps) {
  return (
    <Card className={cn("flex items-center justify-center p-8", className)} {...props}>
      <CardContent className="w-full p-0 text-center">{children}</CardContent>
    </Card>
  )
}

export { Preview }
