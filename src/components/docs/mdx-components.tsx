import * as React from "react"
import { cn } from "@/lib/utils"

const mdxComponents = {
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-mono font-bold text-foreground",
        "mt-8 mb-4 border-b-2 border-primary pb-3",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
    <h2
      className={cn(
        "scroll-m-20 text-xl font-mono font-bold text-foreground",
        "mt-8 mb-4 flex items-center gap-2",
        "before:content-['▍'] before:text-primary before:text-lg",
        "[&_a]:no-underline [&_a]:text-foreground [&_a]:focus-visible:ring-1 [&_a]:focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "scroll-m-20 text-base font-mono font-bold text-foreground",
        "mt-5 mb-3 flex items-center gap-1.5",
        "before:content-['▸'] before:text-primary before:text-sm",
        "[&_a]:no-underline [&_a]:text-foreground [&_a]:focus-visible:ring-1 [&_a]:focus-visible:ring-ring",
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
        "mb-4 border border-border bg-background2 overflow-x-auto",
        "text-sm font-mono leading-5 p-4",
        "border-l-4 border-l-primary",
        "[&_code]:bg-transparent [&_code]:text-inherit [&_code]:p-0 [&_code]:m-0",
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <table
      className={cn(
        "w-full text-xs font-mono mb-4 border border-border",
        className,
      )}
      {...props}
    />
  ),
  thead: ({ className, ...props }: React.ComponentProps<"thead">) => (
    <thead
      className={cn(
        "border-b-2 border-border bg-background1",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "text-left px-4 py-2.5 text-foreground font-bold text-primary uppercase tracking-widest",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn(
        "px-4 py-2 text-foreground border-t border-border",
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
