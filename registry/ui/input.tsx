import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "w-full bg-background text-foreground placeholder:text-muted-foreground",
    "border-0 outline-none",
    "font-mono transition-colors",
    "selection:bg-primary selection:text-primary-foreground",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
  ],
  {
    variants: {
      variant: {
        default: "",
        bordered: "border border-border focus:border-primary",
      },
      inputSize: {
        sm: "h-6 px-2 text-xs",
        default: "h-8 px-3 text-sm",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

function Input({
  className,
  type,
  variant,
  inputSize,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, inputSize, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
