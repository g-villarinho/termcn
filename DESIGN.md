# DESIGN.md — termcn Design Philosophy & TUI Component Patterns

## Purpose & how to use this file

This file is the **philosophy and per-component pattern layer** for the termcn design system.
It answers *why* decisions are made and *how* to translate any shadcn component into the terminal
idiom. It complements — never duplicates — two authoritative sources:

- **`src/index.css`** — all token values (colors, typography, radius, shadows)
- **`.claude/rules/registry/04-design-system.md`** — hard constraints (no hover, no radius, no
  shadow, no harsh animation, monospace everywhere) with code examples

When generating or reviewing a component, read those files for the *what*, and this file for the
*why* and the *how to think about it*.

---

## Design Philosophy

**Guiding question: "Would this look at home in a Neovim TUI?"**

termcn components live in the tradition of Neovim, tmux, fzf, and lazygit — modern developer
terminal tools that prioritize information density, keyboard-first navigation, and visual clarity
over decoration.

This is **not** a retro CRT aesthetic. Phosphor green and amber are mood references, not palette
choices. The identity is modern and developer-native: Catppuccin Mocha (the dark theme used by
millions of terminal users), JetBrains Mono, sharp corners, no shadows.

### Three principles behind every decision

1. **State through structure, not decoration.** Active, selected, focused, and disabled states
   are communicated by inverting text/background or shifting background levels — never by color
   gradients, shadows, or scale transforms.

2. **The keyboard is the pointer.** No affordance may exist exclusively in hover. Everything
   interactive must be reachable and perceivable via keyboard focus (`focus-visible:`).

3. **Chrome competes with content.** The less visual noise in borders, spacing, and animation,
   the more readable the actual data. Every decorative element added must earn its place.

---

## Foundations (canonical sources, not redefined here)

Token values and hard constraints are defined in `src/index.css` and
`.claude/rules/registry/04-design-system.md`. Refer to those files for exact hex values.

### Token map summary

| Category | Tokens | Catppuccin name |
|----------|--------|-----------------|
| Background depth | `--background0..3` / `--background`, `--card`, `--muted` | Base, Mantle, Surface 0–1 |
| Foreground hierarchy | `--foreground0..2` / `--foreground`, `--muted-foreground`, `--border` | Text, Subtext 0, Overlay 0 |
| Semantic | `--primary`, `--secondary`, `--accent`, `--destructive`, `--success`, `--warning`, `--info` | Blue, Lavender, Red, Green, Yellow, Sky |
| ANSI | `--ansi-{color}`, `--ansi-bright-{color}` | Full 16-color set |

### The 5 non-negotiables (see `.claude/rules/registry/04-design-system.md` for examples)

1. No `hover:` for color/layout — use `focus-visible:` only
2. No animations beyond cursor blink (≤1s step) or opacity fade (≤150ms)
3. No `rounded-*` — `--radius: 0px` always
4. No `shadow-*` — depth via background levels and borders only
5. No proportional fonts — `font-mono` / `var(--font-mono)` everywhere

---

## Interaction Model

### Focus, not hover

Terminals have no pointer device concept. Every interactive state must be reachable and visible
via keyboard alone:

```tsx
// WRONG — invisible to keyboard users
<button className="hover:bg-primary/20">

// RIGHT
<button className="focus-visible:bg-primary focus-visible:text-primary-foreground">
```

### Selection inversion (the Vim visual mode pattern)

Active and selected items invert foreground and background — matching how Vim's visual mode,
fzf's selection, and lazygit's cursor work:

```
Normal:   bg-background    text-foreground
Selected: bg-foreground    text-background
```

This is what `::selection` already does in `src/index.css`. Mirror it for component states.

### Cursor blink

A blinking cursor (e.g. in inputs, shell prompts, caret indicators) uses a step-based opacity
animation — not a smooth fade:

```css
/* canonical home: src/index.css — not yet added, flagged as a known gap */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .cursor-blink { animation: none; opacity: 1; }
}
```

Classes: `animate-[blink_1s_step-end_infinite]` (Tailwind arbitrary) or a utility class
`cursor-blink`. **Always** wrap in `prefers-reduced-motion` guard.

### Discrete fade-in on mount

The only other allowed animation: `opacity 0 → 1` at ≤150ms `ease-out`. Used for overlays,
menus, and dialogs appearing. Never pair with scale, translate, or blur.

### Hover exceptions (documented)

Two allowed uses of `hover:`:
- Scrollbar thumb: `::-webkit-scrollbar-thumb:hover` (already in `src/index.css`)
- Plain text links where no keyboard-equivalent focus state can be provided — document inline

---

## TUI Translation Method

Before authoring any shadcn component, run it through these questions:

### 1. What does this map to in a terminal tool?

Most shadcn components have a TUI equivalent. Start there:

| shadcn | TUI equivalent | Key reference |
|--------|---------------|---------------|
| Accordion | Directory tree (`ls -la`, `tree`) | `▸ dir/`, `▾ dir/`, indent guides |
| Tabs | Buffer/window tabs (Vim `:tabs`, tmux windows) | `[1] name` numbering, status bar |
| Dialog / Modal | Popup overlay (lazygit confirm, Neovim `:`, vim-quickfix) | Box-drawing frame, title bar |
| Command / Combobox | Fuzzy finder (fzf, Telescope, fzf-lua) | `>` prompt, match highlight |
| Select | Menu picker (tmux choose-tree, ranger) | Arrow selection, inversion |
| Button | Shell command / keybind action | `[ label ]` bracket convention |
| Input | Shell prompt line | `$ `, `> `, cursor blink |
| Badge | Status indicator, git branch, exit code | `[status]`, `(branch)` |
| Alert | Warning/error output line | `!! error:`, `>> info:` prefix |
| Table | `ls -la`, `ps aux` output | Fixed columns, `border-b` row dividers |
| Progress | Download/build bar (`wget`, `cargo build`) | `[=====>    ]` ASCII fill |
| Tooltip | Status line message (Vim's statusline, hover doc) | Inline, no float if possible |

### 2. What are the structural primitives?

Every TUI component is built from exactly three visual primitives:

- **Box-drawing borders**: `border-t`, `border-b`, `border-l`, `border-r`, `divide-*` using
  `--box-border-color` (`var(--foreground2)`). For true box-drawing characters, use Unicode
  (`─`, `│`, `┌`, `┐`, `└`, `┘`, `├`, `┤`, `┬`, `┴`, `┼`) in text content.
- **Background levels**: depth is communicated by stepping up through `--background0` →
  `--background3`. Never by shadow.
- **Inversion**: active/selected state = `bg-foreground text-background`.

### 3. What text conventions apply?

- Labels lowercase by default (terminal aesthetic)
- Hotkey characters use `--accent` (red): `<leader>`, `Ctrl-`, `:`
- Prompt prefixes: `$` for user shell, `>` for input, `!` for warning, `#` for comment/disabled
- Glyph indicators: `▸` collapsed, `▾` expanded, `✓` success, `✗` error, `~` modified,
  `+` added, `-` removed (git diff convention)
- Numbers for ordered items (Vim buffer numbers, tmux window indices): `[1]`, `[2]`

### 4. What can be removed?

Before shipping: strip any `rounded-*`, `shadow-*`, `hover:` (non-exception), `transition-all`,
`duration-300+`, proportional font reference.

---

## Worked Examples

---

### Accordion → Directory Tree

**ASCII mockup:**

```
▾ components/                        ← expanded, border-l indent guide
│ ▸ ui/                              ← collapsed child
│ ▾ hooks/                           ← expanded child
│ │   use-keymap.ts                  ← leaf file
│ │   use-mobile.ts
▸ lib/                               ← collapsed root item
  utils.ts                           ← (hidden when collapsed)
```

**Anatomy & rules:**

- Trigger: full-width row, `border-b border-border`, `px-4 py-1.5`
- Expand/collapse glyph: `▸` (closed) / `▾` (open) in `text-primary` — not an animated chevron icon
- Indent guide: `border-l border-border ml-4 pl-2` on each nested level
- Active trigger (focused): `focus-visible:bg-foreground focus-visible:text-background`
- Content area: `bg-background1` (one level deeper than trigger)
- Transition: none. Content appears/disappears instantly (no height animation) — terminal trees
  don't animate

**Anti-patterns:**
- No `ChevronDown` rotating icon — use `▸`/`▾` text glyphs
- No `data-[state=open]:rotate-180` transforms
- No `overflow-hidden` height transition (`max-height` animation = "harsh")
- No indentation via padding on the glyph — use `border-l` indent guide

---

### Tabs → Vim/Tmux Tab Bar

**ASCII mockup:**

```
 [1] buffer.tsx  [2] utils.ts  [3] index.css              ← tab strip
─────────────────────────────────────────────────────────  ← border-b
 // content of active tab                                  ← panel
```

Active tab (buffer 2 focused):

```
 [1] buffer.tsx ▌[2] utils.ts▌ [3] index.css
```
(active = `bg-foreground text-background`, inactive = `text-muted-foreground`)

**Anatomy & rules:**

- Tab list: `flex flex-row border-b border-border bg-background1`
- Tab trigger: `px-3 py-1 text-sm font-mono text-muted-foreground`
- Active tab: `bg-foreground text-background` (inversion, not underline/accent)
- Tab numbering: prefix `[{index}]` in `text-foreground2` — `[1]`, `[2]` etc. Optional but
  reinforces the Vim buffer mental model
- No tab close button by default — terminal tabs don't have per-tab close UI
- Content panel: `bg-background` (back to base level)
- Vertical variant (tmux split panes): `flex-col border-r border-border` instead

**Anti-patterns:**
- No `border-b-2 border-primary` underline on active tab — use inversion
- No `rounded-t-*` pill tabs
- No animated indicator sliding between tabs
- No icon in the tab label unless it's a monospace glyph

---

### Dialog → Command Prompt Overlay

**ASCII mockup:**

```
┌─ Confirm ──────────────────────────────────────────────┐
│                                                         │
│  Delete 3 files? This action cannot be undone.          │
│                                                         │
│                            [ Cancel ]  [ Delete ]       │
└─────────────────────────────────────────────────────────┘
```

**Anatomy & rules:**

- Overlay: `fixed inset-0 bg-background/80` — no blur (`backdrop-blur` = not terminal)
- Content box: `border border-border bg-card` (one level elevated: `--background1`)
- Title bar: `border-b border-border px-4 py-2 text-foreground font-mono text-sm` — acts as the
  box title line; optionally use `┌─ Title ─` Unicode in the content itself
- Body: `px-4 py-3 text-foreground1 text-sm`
- Footer: `border-t border-border px-4 py-2 flex justify-end gap-2`
- Buttons: bracketed convention `[ Cancel ]`, `[ Delete ]` — see Button example
- Destructive action button: `text-destructive focus-visible:bg-destructive focus-visible:text-destructive-foreground`
- Close (Escape): always supported via Radix `DialogClose` — no visible ✕ button required

**Anti-patterns:**
- No `backdrop-blur-*`
- No `rounded-*` on the content box
- No `shadow-*` for the overlay feel — use `border` instead
- No slide-in animation (`translateY`) — use opacity fade ≤150ms or instant

---

### Command / Combobox → Fuzzy Finder (fzf / Telescope)

**ASCII mockup:**

```
┌─ Find File ────────────────────────────────────────────┐
│ > src/components/                                       │  ← input line
├─────────────────────────────────────────────────────────┤
│   src/components/ui/button.tsx                          │
│ ▌ src/components/ui/badge.tsx                          │  ← selected (inverted)
│   src/components/ui/input.tsx                           │
│   src/lib/utils.ts                                      │
└──────────────────────────── 4/127 ─────────────────────┘  ← result count
```

**Anatomy & rules:**

- Container: `border border-border bg-card` (same elevated box as Dialog)
- Input row: `flex items-center border-b border-border px-3 py-2`
- Prompt glyph: `> ` in `text-primary` before the `<input>`; `<input>` itself: `bg-transparent
  text-foreground placeholder:text-foreground2 outline-none`
- Result list item: `px-3 py-1 text-sm font-mono text-foreground1`
- Selected item: `bg-foreground text-background` (inversion) — no `bg-accent/10`
- Match highlight: `text-primary` on matched characters (not bold, not underline)
- Footer count (`4/127`): `text-xs text-foreground2 border-t border-border px-3 py-1`
- Empty state: `text-foreground2 text-sm px-3 py-2` — `-- no results --`

**Anti-patterns:**
- No `rounded-*` on the input
- No `bg-primary/10` highlight on selected — use inversion
- No "search icon" SVG — `>` glyph is the prompt
- No skeleton loading state — show `-- loading... --` text instead

---

### Button → Shell Command / Keybind Action

**ASCII mockup:**

```
[ Run ]    [ Cancel ]    [ ! Delete ]
```

**Anatomy & rules:**

- Default: `border border-border bg-background text-foreground px-3 py-1 font-mono text-sm`
- Focus: `focus-visible:bg-foreground focus-visible:text-background focus-visible:border-foreground`
- Primary variant: `border-primary text-primary` (no filled background by default)
- Destructive variant: `border-destructive text-destructive` with `!` prefix in label optional
- Disabled: `text-foreground2 border-foreground2 cursor-not-allowed` — no opacity
- Ghost variant: `border-transparent text-foreground1` — for secondary actions in toolbars
- Size: no large buttons; `px-3 py-1` (compact), `px-2 py-0.5` (xs for inline)
- Icon buttons: monospace glyph or Lucide icon at `size-4`, no label wrapping

**Anti-patterns:**
- No filled background on default/primary variant (terminal buttons are outlined)
- No `rounded-*`
- No `hover:` state
- No `shadow-*` on active/pressed

---

## Accessibility

All termcn components must meet **WCAG 2.1 AA** and preserve full **Radix UI semantics**.

### Focus-visible mandatory

Every interactive element must have a visible focus indicator reachable by keyboard. The global
`outline-ring/50` in `@layer base` provides a baseline; add `focus-visible:ring-1
focus-visible:ring-ring` on input-like elements as reinforcement.

Never remove `outline: none` without providing an explicit `focus-visible:` replacement.

### Never signal state by color alone

Inversion (text/background swap) is the primary state signal. For states where inversion isn't
used (e.g. "modified" file in a tree), combine color (`text-warning`) with a text glyph (`~`)
or label change — not color alone.

### WCAG AA on inverted states

The inversion pattern (`bg-foreground text-background`) uses `#cdd6f4` on `#1e1e2e` — contrast
ratio ~11:1, well above AA. Verify any custom inversion pair (e.g. `bg-primary
text-primary-foreground`) meets 4.5:1 minimum.

Key pairs in the palette (all pass AA):
- `--foreground` on `--background`: ~11:1
- `--primary` (`#89b4fa`) on `--background`: ~6.4:1
- `--destructive` (`#f38ba8`) on `--background`: ~4.7:1
- `--foreground2` (`#6c7086`) on `--background`: ~3.1:1 — **use for non-interactive text only**

### prefers-reduced-motion

Every animation must be guarded:

```css
@media (prefers-reduced-motion: reduce) {
  .cursor-blink  { animation: none; opacity: 1; }
  .fade-in       { animation: none; opacity: 1; }
}
```

The blink keyframe and its reduced-motion guard are not yet in `src/index.css` — this is a
**known gap** and should be added before any component uses cursor blink.

### Preserve Radix semantics

When restyling a Radix primitive, never remove or override:
- `role` attributes
- `aria-*` attributes (`aria-expanded`, `aria-selected`, `aria-disabled`, etc.)
- `data-state` attributes (safe to use as CSS selectors: `data-[state=open]:`)
- Keyboard event handlers (use `asChild` or wrap, never replace the Radix root)

The visual reinterpretation lives in CSS/className only. The semantic tree stays intact.

### Disabled state

Use `text-foreground2` (`--foreground2`, Overlay 0) for disabled elements — the dim text
convention from terminal color schemes. Never use opacity alone (fails low-vision users who
may override opacity via browser settings).

```tsx
// RIGHT
<button disabled className="text-foreground2 border-foreground2 cursor-not-allowed">

// WRONG
<button disabled className="opacity-50">
```
