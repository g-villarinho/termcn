# termcn — Codex Guide

## Project

Vite + React 19 + TanStack Router + Tailwind v4 + shadcn/ui registry.

**Goal:** Build and maintain a shadcn/ui registry with terminal/Neovim aesthetic (Catppuccin Mocha).

## Registry rules

Full documentation in `.Codex/rules/registry/`:

| File | Topic |
|------|-------|
| `00-overview.md` | What a registry is, termcn identity, repo state |
| `01-architecture.md` | Self-host + namespace strategy, URL patterns |
| `02-registry-json-schema.md` | registry.json schema, composition via include |
| `03-registry-item-schema.md` | Full item schema, all fields, all types, examples |
| `04-design-system.md` | **Design constraints — read this before touching any component** |
| `05-component-authoring.md` | Step-by-step guide to write, register, and build a component |
| `06-build-publish-config.md` | Build command, config fixes needed, publishing checklist |

## Five non-negotiable design rules

1. **No hover** — no `hover:` for color/layout changes; use `focus-visible:` instead
2. **No harsh animations** — blink or ≤150ms opacity fade only; no scale/bounce/spring
3. **Radius 0** — never use `rounded-*`; `--radius: 0px` always
4. **No shadows** — never use `shadow-*`; depth via background levels only
5. **Mono + Catppuccin** — JetBrains Mono everywhere; colors from `src/index.css` tokens only

## Key files

- `src/index.css` — Catppuccin Mocha tokens, ANSI colors, Tailwind v4 theme
- `components.json` — shadcn config (needs `tailwind.config` key removed for v4)
- `registry.json` — registry entry point (recreate when rebuilding registry source)
- `public/r/` — build output served statically by Vite

## Tech notes

- Tailwind **v4** — CSS-first, no `tailwind.config.js`, all config in `src/index.css`
- `shadcn@3.6.2` is in devDependencies — use `npx shadcn@latest build` to rebuild registry
- `registry/` source was deleted; `public/r/` has orphaned pre-built JSONs — delete and rebuild
