import * as React from "react"
import { cn } from "@/lib/utils"

const mdxComponents = {
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-mono font-bold text-foreground",
        "mt-8 mb-4 border-b border-border pb-2",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
    <h2
      className={cn(
        "scroll-m-20 text-2xl font-mono font-bold text-foreground",
        "mt-6 mb-3 border-b border-border pb-1",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "scroll-m-20 text-lg font-mono font-bold text-foreground",
        "mt-4 mb-2",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
    <h4
      className={cn(
        "text-base font-mono font-bold text-foreground",
        "mt-3 mb-1",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p
      className={cn(
        "text-sm font-mono text-foreground leading-6",
        "mb-3",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.ComponentProps<"a">) => (
    <a
      className={cn(
        "text-primary underline underline-offset-2",
        "focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul
      className={cn(
        "list-none mb-4 ml-4 space-y-1",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol
      className={cn(
        "list-decimal list-inside mb-4 space-y-1 font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li
      className={cn(
        "text-foreground text-sm before:content-['▸'] before:mr-2 before:text-primary",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, inline = true, ...props }: React.ComponentProps<"code"> & { inline?: boolean }) => (
    <code
      className={cn(
        "font-mono text-sm bg-background2 text-primary px-1.5 py-0.5",
        !inline && "block p-2 mb-3 border border-border",
        inline && "rounded-none",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.ComponentProps<"pre">) => (
    <pre
      className={cn(
        "mb-4 border border-border bg-background2 p-4 overflow-x-auto",
        "text-sm font-mono leading-4",
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <table
      className={cn(
        "w-full text-sm font-mono mb-4 border border-border",
        className,
      )}
      {...props}
    />
  ),
  thead: ({ className, ...props }: React.ComponentProps<"thead">) => (
    <thead
      className={cn(
        "border-b border-border bg-background2",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "text-left px-3 py-2 text-foreground font-bold border-r border-border last:border-r-0",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn(
        "px-3 py-2 text-foreground border-r border-border last:border-r-0",
        className,
      )}
      {...props}
    />
  ),
  tbody: ({ className, ...props }: React.ComponentProps<"tbody">) => (
    <tbody className={className} {...props} />
  ),
}

export { mdxComponents }
