# termcn Registry — Overview

## What is a shadcn registry?

A shadcn registry is a **code distribution system** that serves components, hooks, libs, themes, and
arbitrary files as static JSON over HTTP. Consumers use the `shadcn` CLI to install items directly
into their project — not as npm packages, but as source code.

Key properties:
- Framework-agnostic (Next.js, Vite, Vue, Svelte, PHP, anything that serves JSON)
- Items install as editable source, not locked dependencies
- Supports namespaces (`@termcn/button`), cross-registry deps, CSS var injection, and font items
- Build: `npx shadcn@latest build` → outputs static JSONs to `public/r/`

## Identity: termcn

**termcn** is a shadcn/ui registry with a terminal aesthetic inspired by Neovim's TUI design:

| Attribute       | Value                                     |
|----------------|-------------------------------------------|
| Color theme     | Catppuccin Mocha (dark only)              |
| Typography      | JetBrains Mono (all text, no exceptions)  |
| Border radius   | 0px (sharp edges, TUI aesthetic)          |
| Shadows         | None                                      |
| Hover states    | Not used (terminal has no hover)          |
| Animations      | Minimal (blink cursor, discrete fade only)|
| Color model     | oklch / hex Catppuccin tokens + ANSI set  |
| Interactivity   | Focus/selection-based, not hover-based    |

The guiding question for every design decision: **"Would this look at home in a Neovim UI?"**

## Document map

| File | Topic |
|------|-------|
| `01-architecture.md` | Self-host + namespace strategy, URL patterns, build flow |
| `02-registry-json-schema.md` | `registry.json` root schema, composition via `include` |
| `03-registry-item-schema.md` | Full registry-item schema, all fields, type enum |
| `04-design-system.md` | Design constraints, color tokens, do/don't patterns |
| `05-component-authoring.md` | Step-by-step: write → register → build → validate |
| `06-build-publish-config.md` | Build command, config fixes needed, serving static files |

## Current repo state (as of Jun 2026)

- Framework: Vite 7 + React 19 + TanStack Router
- Tailwind: v4 CSS-first (`src/index.css`, no `tailwind.config.js`)
- `registry/` directory was deleted; `public/r/styles/termcn/*.json` are orphaned pre-builds
- `shadcn@3.6.2` is in devDependencies (available as CLI)
- Full Catppuccin Mocha palette already in `src/index.css`
