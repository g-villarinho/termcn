# Build, Config Fixes & Publishing

## Build command

```bash
# Default: outputs to public/r/
npx shadcn@latest build

# Custom output dir
npx shadcn@latest build --output dist/r

# From a specific registry.json
npx shadcn@latest build --registry registry.json
```

Build reads `registry.json` at CWD, resolves all `include` files, compiles item JSONs with
inlined `content` fields, and writes to output directory.

---

## Required config fixes (TODO when rebuilding registry)

These are inconsistencies found in the current repo that must be fixed before `shadcn build`
will work correctly.

### 1. components.json — remove stale tailwind.config reference

Current (broken for Tailwind v4):
```json
{
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css"
  }
}
```

Fix for Tailwind v4 CSS-first (no JS config exists):
```json
{
  "tailwind": {
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  }
}
```

### 2. components.json — add registries field

When the project consumes its own registry (e.g. for doc examples), or when publishing
the namespace for consumers:

```json
{
  "registries": {
    "@termcn": "https://termcn.com/r/{name}.json"
  }
}
```

### 3. Rebuild scripts/ or remove from package.json

`scripts/add-component.js` and `scripts/generate-registry.js` do not exist.
Replace with direct `shadcn` CLI calls or rewrite as thin wrappers:

```json
{
  "scripts": {
    "registry:build": "shadcn build",
    "registry:validate": "shadcn registry validate termcn"
  }
}
```

### 4. Clean up orphaned public/r/ files

`public/r/styles/termcn/*.json` were built from the now-deleted `registry/` source.
Delete before running a fresh `shadcn build`:

```bash
rm -rf public/r/
npx shadcn@latest build
```

---

## Serving

Vite serves `public/` statically at `/`. Build output to `public/r/` means:
- Dev: `http://localhost:3000/r/button.json`
- Prod: `https://termcn.com/r/button.json`
- Catalog: `https://termcn.com/r/registry.json`

No API routes needed. Static JSON is sufficient for the shadcn CLI.

---

## Validation

```bash
# Validate registry (online — checks schema and referenced files)
npx shadcn@latest registry validate termcn

# Or validate from local file
npx shadcn@latest registry validate ./registry.json
```

---

## Publishing checklist

- [ ] All TSX files pass TypeScript and Biome checks
- [ ] Every item has `files[]`, `dependencies[]`, `registryDependencies[]` filled
- [ ] `shadcn build` runs without errors
- [ ] `public/r/` output committed (or served from CI artifact)
- [ ] `components.json` tailwind section fixed (remove `config` key)
- [ ] Design checklist from `05-component-authoring.md` passed for every component
- [ ] Namespace URL tested end-to-end: `npx shadcn@latest add @termcn/button`
