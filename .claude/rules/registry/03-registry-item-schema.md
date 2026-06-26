# Registry Item Schema

Full reference for a single registry item object.

## Field table

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `$schema` | string | no | `https://ui.shadcn.com/schema/registry-item.json` |
| `name` | string | **yes** | Unique identifier (URL-safe, kebab-case) |
| `type` | string | **yes** | See type enum below |
| `title` | string | no | Display name |
| `description` | string | no | Short description |
| `extends` | string | no | `"none"` to build from scratch (skips base style) |
| `author` | string | no | Attribution |
| `files` | array | **yes** (ui/lib/hook/block) | Source files |
| `dependencies` | string[] | no | npm packages (e.g. `"radix-ui"`, `"is-even@3.0.0"`) |
| `devDependencies` | string[] | no | npm dev packages |
| `registryDependencies` | string[] | no | Other registry items (see formats below) |
| `cssVars` | object | no | CSS variable injection (theme/light/dark) |
| `css` | object | no | Raw CSS injection (keyframes, @layer, @plugin, @import) |
| `meta` | object | no | Arbitrary metadata (`category`, `version`, etc.) |
| `envVars` | object | no | Environment variables to inject |
| `font` | object | no | Font configuration (for `registry:font` type only) |
| `config` | object | no | Style config (for `registry:base` type only) |

## Type enum

```
registry:ui          ← reusable UI component (button, badge, input...)
registry:block       ← multi-file page/feature block (login form, dashboard...)
registry:component   ← single component not in /ui
registry:page        ← full page file (use target to set destination)
registry:lib         ← utility/helper (utils.ts, formatters...)
registry:hook        ← React hook (use-keymap, use-mobile...)
registry:theme       ← CSS variable theme only
registry:style       ← full style override (extends shadcn or from scratch)
registry:base        ← base design system definition
registry:font        ← font configuration
registry:file        ← arbitrary file with explicit target path
registry:item        ← universal/framework-agnostic
```

## files[] object

```json
{
  "path": "registry/ui/button.tsx",   ← source path relative to project root
  "type": "registry:ui",              ← same type as parent item
  "target": "components/ui/button.tsx",  ← optional: install destination in consumer
  "content": "..."                    ← optional: inline content (set by build)
}
```

`target` supports special prefixes:
- `~/` → user's home dir (for config files like cursor rules)
- `@ui/` → resolves to consumer's `aliases.ui`
- `@lib/` → resolves to consumer's `aliases.lib`

## registryDependencies formats

```json
"registryDependencies": [
  "button",                                  ← same registry, by name
  "@shadcn/card",                            ← another namespace
  "https://termcn.com/r/kbd.json"            ← absolute URL
]
```

## cssVars

```json
"cssVars": {
  "theme": {
    "--font-mono": "'JetBrains Mono Variable', monospace"
  },
  "light": {
    "--sidebar-background": "oklch(0.985 0 0)"
  },
  "dark": {
    "--sidebar-background": "oklch(0.141 0.005 285.823)"
  }
}
```

`theme` = always applied (no media query). `light`/`dark` = applied under `.light`/`.dark` selectors.

## css (raw CSS injection)

```json
"css": {
  "@keyframes blink": {
    "0%, 100%": { "opacity": "1" },
    "50%":      { "opacity": "0" }
  },
  "@layer components": {
    ".cursor-blink": { "animation": "blink 1s step-end infinite" }
  }
}
```

## font object (registry:font only)

```json
"font": {
  "family": "'JetBrains Mono Variable', monospace",
  "provider": "google",
  "import": "JetBrains_Mono",
  "variable": "--font-mono",
  "weight": ["400", "500", "600", "700"],
  "subsets": ["latin"],
  "dependency": "@fontsource-variable/jetbrains-mono"
}
```

## Examples

### registry:ui (button)
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "Terminal-style button. Variants: default, ghost, destructive.",
  "dependencies": ["class-variance-authority", "@radix-ui/react-slot"],
  "registryDependencies": ["utils"],
  "files": [
    { "path": "registry/ui/button.tsx", "type": "registry:ui" }
  ]
}
```

### registry:lib (utils)
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "utils",
  "type": "registry:lib",
  "dependencies": ["clsx", "tailwind-merge"],
  "files": [
    { "path": "registry/lib/utils.ts", "type": "registry:lib" }
  ]
}
```

### registry:hook
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "use-keymap",
  "type": "registry:hook",
  "files": [
    { "path": "registry/hooks/use-keymap.ts", "type": "registry:hook" }
  ]
}
```

### registry:font (JetBrains Mono)
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "font-jetbrains-mono",
  "type": "registry:font",
  "font": {
    "family": "'JetBrains Mono Variable', monospace",
    "provider": "google",
    "import": "JetBrains_Mono",
    "variable": "--font-mono",
    "weight": ["400", "500", "600", "700"],
    "subsets": ["latin"],
    "dependency": "@fontsource-variable/jetbrains-mono"
  }
}
```

### registry:theme (Catppuccin Mocha)
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "theme-catppuccin-mocha",
  "type": "registry:theme",
  "cssVars": {
    "light": {
      "background":        "#1e1e2e",
      "foreground":        "#cdd6f4",
      "primary":          "#89b4fa",
      "primary-foreground": "#1e1e2e",
      "secondary":        "#b4befe",
      "muted":            "#313244",
      "muted-foreground": "#a6adc8",
      "accent":           "#f38ba8",
      "destructive":      "#f38ba8",
      "success":          "#a6e3a1",
      "warning":          "#f9e2af",
      "info":             "#89dceb",
      "border":           "#6c7086",
      "ring":             "#cdd6f4",
      "radius":           "0px"
    }
  }
}
```
