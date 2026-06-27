# Component Authoring Guide

## Step-by-step: adding a new component

### 1. Create the source file

Location: `registry/ui/<name>.tsx` (or `registry/hooks/<name>.ts` for hooks).

Conventions:
- Use CVA (`class-variance-authority`) for variant management.
- Use `cn()` from `@/lib/utils` for class merging.
- Use `React.ComponentProps<"element">` for prop spreading.
- Use Radix `Slot` (`@radix-ui/react-slot`) when `asChild` prop is needed.
- Import peer dependencies from their npm package, not `@/components/ui`.
- No default export — named exports only.

```tsx
// registry/ui/badge.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-0.5 font-mono text-xs font-medium",
  {
    variants: {
      variant: {
        default:     "border-border bg-background text-foreground",
        primary:     "border-primary bg-primary/10 text-primary",
        success:     "border-success bg-success/10 text-success",
        warning:     "border-warning bg-warning/10 text-warning",
        destructive: "border-destructive bg-destructive/10 text-destructive",
        ghost:       "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

### 2. Declare in registry.json

Add item to `registry/ui/registry.json` (or root `registry.json`):

```json
{
  "name": "badge",
  "type": "registry:ui",
  "title": "Badge",
  "description": "Terminal-style badge with semantic color variants.",
  "dependencies": ["class-variance-authority"],
  "registryDependencies": ["utils"],
  "files": [
    { "path": "registry/ui/badge.tsx", "type": "registry:ui" }
  ]
}
```

Always list:
- `dependencies` — any npm package the component imports.
- `registryDependencies` — any other termcn items the component needs (`"utils"`, `"button"`, etc.).
- `cssVars` — if the component introduces new CSS variables (e.g. sidebar-specific tokens).

### 3. Build and validate

```bash
# Build registry (outputs to public/r/)
npx shadcn@latest build

# Verify output exists
ls public/r/badge.json

# View built item
npx shadcn@latest view public/r/badge.json

# Test install in a sandbox project
npx shadcn@latest add http://localhost:3000/r/badge.json
```

### 4. Design checklist (from 04-design-system.md)

Before committing:

- [ ] No `hover:` variants for color/background changes
- [ ] No `rounded-*` classes
- [ ] No `shadow-*` classes
- [ ] No `transition-all`, no `duration-500+`
- [ ] No proportional fonts — `font-mono` or `var(--font-mono)` only
- [ ] Colors use tokens (`text-primary`, `bg-muted`, etc.) not arbitrary hex
- [ ] Focus states use `focus-visible:` (not `focus:`)
- [ ] Disabled states use `--foreground2` (muted text convention)
- [ ] Component is exportable as named export

---

## Component with CSS variables

When a component needs its own design tokens, inject via `cssVars` in the registry item:

```json
{
  "name": "terminal-output",
  "type": "registry:ui",
  "cssVars": {
    "theme": {
      "--terminal-cursor-color": "var(--primary)",
      "--terminal-gutter-width":  "3ch"
    }
  },
  "files": [
    { "path": "registry/ui/terminal-output.tsx", "type": "registry:ui" }
  ]
}
```

`theme` scope = always applied (not scoped to `.light`/`.dark`).

---

## Multi-file block

For a block that spans multiple files (e.g. a command palette feature):

```json
{
  "name": "command-palette",
  "type": "registry:block",
  "description": "Vim-style command palette overlay.",
  "registryDependencies": ["kbd", "input", "dialog"],
  "files": [
    { "path": "registry/blocks/command-palette/index.tsx",        "type": "registry:component" },
    { "path": "registry/blocks/command-palette/command-list.tsx", "type": "registry:component" },
    { "path": "registry/blocks/command-palette/use-commands.ts",  "type": "registry:hook" }
  ]
}
```
