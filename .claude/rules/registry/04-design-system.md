# Design System Rules — Terminal / Catppuccin Mocha

The guiding question: **"Would this look at home in a Neovim TUI?"**

---

## Non-negotiable constraints

### No hover states
Terminal interfaces have no cursor hover. Never use `hover:` Tailwind variants for color/layout
changes. Interaction is communicated via **focus** and **selection** only.

```tsx
// WRONG
<button className="hover:bg-primary hover:text-primary-foreground">

// RIGHT
<button className="focus-visible:bg-primary focus-visible:text-primary-foreground">
```

Exception: `hover:` is allowed only for scrollbar styles (`::-webkit-scrollbar-thumb:hover`)
and text underline on links where no focus alternative exists — document any exception.

### No harsh animations
Terminal UIs are static or minimally animated. Allowed animations:
- Cursor blink (`opacity` step at 0/1, ≤1s loop)
- Discrete fade-in on mount (`opacity` 0→1, ≤150ms, `ease-out`)
- Nothing else: no scale, bounce, spring, slide, rotate, wiggle

Never use `transition-all`. Never use `duration-500` or longer for interactive states.

### No border radius
`--radius: 0px`. All corners sharp. Never use `rounded-*` classes.

### No shadows
`--shadow-*: none`. Never use `shadow-*` classes. Depth is communicated via background level
(`--background0` → `--background3`), borders, and foreground contrast.

### Monospace everywhere
`--font-mono: "JetBrains Mono", ...` is assigned to `--font-sans` and `--font-serif` too.
Never specify a proportional font. Never use `font-sans` with a different family.

---

## Color tokens (from src/index.css)

### Background levels (depth system)
| Token | Hex | Catppuccin | Usage |
|-------|-----|-----------|-------|
| `--background0` / `--background` | `#1e1e2e` | Base | Main background |
| `--background1` / `--card` | `#181825` | Mantle | Cards, elevated surfaces |
| `--background2` / `--muted` | `#313244` | Surface 0 | Inputs, muted areas |
| `--background3` | `#45475a` | Surface 1 | Hover substitute (focus ring bg) |

### Foreground levels
| Token | Hex | Catppuccin | Usage |
|-------|-----|-----------|-------|
| `--foreground0` / `--foreground` | `#cdd6f4` | Text | Primary text |
| `--foreground1` / `--muted-foreground` | `#a6adc8` | Subtext 0 | Secondary text |
| `--foreground2` / `--border` / `--input` | `#6c7086` | Overlay 0 | Borders, disabled |

### Semantic colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#89b4fa` | Blue — primary actions, links, cursor |
| `--secondary` | `#b4befe` | Lavender — secondary actions |
| `--accent` | `#f38ba8` | Red — accents, hot keys |
| `--destructive` | `#f38ba8` | Red — destructive actions |
| `--success` | `#a6e3a1` | Green — success states |
| `--warning` | `#f9e2af` | Yellow — warnings |
| `--info` | `#89dceb` | Sky — informational |

### ANSI color set (for terminal output components)
| Standard | Bright |
|----------|--------|
| `--ansi-black: #45475a` | `--ansi-bright-black: #585b70` |
| `--ansi-red: #f38ba8` | `--ansi-bright-red: #eba0ac` |
| `--ansi-green: #a6e3a1` | `--ansi-bright-green: #a6e3a1` |
| `--ansi-yellow: #f9e2af` | `--ansi-bright-yellow: #f9e2af` |
| `--ansi-blue: #89b4fa` | `--ansi-bright-blue: #b4befe` |
| `--ansi-magenta: #f5c2e7` | `--ansi-bright-magenta: #cba6f7` |
| `--ansi-cyan: #94e2d5` | `--ansi-bright-cyan: #89dceb` |
| `--ansi-white: #bac2de` | `--ansi-bright-white: #cdd6f4` |

---

## TUI aesthetic patterns

### Box-drawing borders
Use CSS borders with `--box-border-color` (`var(--foreground2)`). Simulate TUI box-drawing with
combinations of `border-t`, `border-l`, `border-r`, `border-b` and `divide-*`.

### Selection inversion
Active/selected state uses foreground/background inversion — the Vim visual mode pattern:
```tsx
// Selected item
<div className="bg-foreground text-background">
```
Matches `::selection` behavior already in `src/index.css`.

### Focus ring
`outline-ring/50` (already in `@layer base`) provides a visible focus indicator. Use
`focus-visible:ring-1 focus-visible:ring-ring` for input-like elements.

### Disabled state
Use `--foreground2` (Overlay 0) for disabled text/icons. Never use opacity alone — match
terminal dim text convention.

---

## Do / Don't

| Do | Don't |
|----|-------|
| `focus-visible:` for interaction feedback | `hover:` for color/layout changes |
| Background level hierarchy for depth | `shadow-*` for depth |
| `border` + `--box-border-color` for structure | `rounded-*` for softness |
| `opacity-0` → `opacity-100` short fade | `scale-95` → `scale-100` spring |
| ANSI token colors for terminal output | Arbitrary hex colors |
| `font-mono` class or `var(--font-mono)` | Any sans/serif font |
