import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "flex flex-col font-mono",
        "border border-border bg-background1",
        className
      )}
      {...props}
    />
  )
}

function ItemSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-separator"
      className={cn("h-px bg-border", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  [
    "group/item flex items-center font-mono text-sm",
    "outline-none select-none",
    "text-foreground",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        muted: "bg-background2",
        active: "bg-background2 text-ansi-blue",
      },
      size: {
        default: "px-3 py-2.5 gap-3",
        sm: "px-2 py-1.5 gap-2",
        lg: "px-4 py-3 gap-4",
      },
      interactive: {
        true: "cursor-pointer focus:bg-background2 hover:bg-background2",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
)

function Item({
  className,
  variant,
  size,
  interactive,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="item"
      className={cn(itemVariants({ variant, size, interactive, className }))}
      {...props}
    />
  )
}

function ItemMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-media"
      className={cn(
        "flex shrink-0 items-center justify-center",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "[&_svg:not([class*='text-'])]:text-foreground2",
        className
      )}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn("flex flex-1 flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn("text-sm text-foreground", className)}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn("text-xs text-foreground2", className)}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn(
        "ml-auto flex items-center gap-2 text-xs text-foreground2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  itemVariants,
}
