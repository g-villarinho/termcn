# registry.json Schema

## Root registry.json

Located at `registry.json` in project root. Entry point for `shadcn build`.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "termcn",
  "homepage": "https://termcn.com",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "Terminal-style button with Catppuccin Mocha theme.",
      "files": [
        {
          "path": "registry/ui/button.tsx",
          "type": "registry:ui"
        }
      ]
    }
  ]
}
```

## Composition via include (large registries)

Split items into colocated `registry.json` files, then include from root:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "termcn",
  "homepage": "https://termcn.com",
  "include": [
    "registry/ui/registry.json",
    "registry/hooks/registry.json",
    "registry/lib/registry.json"
  ]
}
```

Included files may omit `name` and `homepage`:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "items": [
    { "name": "button", "type": "registry:ui", "files": [...] },
    { "name": "badge",  "type": "registry:ui", "files": [...] }
  ]
}
```

## Recommended directory structure

```
termcn/
├── registry.json                    ← root (include-based)
├── registry/
│   ├── ui/
│   │   ├── registry.json            ← ui items
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── registry.json
│   │   └── use-keymap.ts
│   └── lib/
│       ├── registry.json
│       └── utils.ts
└── public/r/                        ← build output (gitignore optional)
    ├── registry.json
    ├── button.json
    └── ...
```

## Rules

- **Item names must be globally unique** across the resolved registry (including included files).
- Always import from `@/registry/...` paths inside component files (not relative paths).
- `shadcn build` reads `registry.json` at CWD and outputs to `public/r/` by default.
- Use `--output <dir>` to override output directory.
