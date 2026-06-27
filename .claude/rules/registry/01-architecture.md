# Architecture: Self-host + Namespace

## Distribution strategy

termcn uses **self-hosted static files + shadcn namespace**:

```
registry/ (source TSX/TS)
    └── shadcn build
            └── public/r/ (output JSONs)
                    └── served by Vite dev / production domain
                            └── installed by consumers via @termcn/<name>
```

## Namespace registration

Consumers add termcn to their `components.json`:

```json
{
  "registries": {
    "@termcn": "https://termcn.com/r/{name}.json"
  }
}
```

Then install items:

```bash
npx shadcn@latest add @termcn/button
npx shadcn@latest add @termcn/kbd @termcn/spinner
```

## URL patterns

| Placeholder | Expands to |
|-------------|-----------|
| `{name}` | Item name (required) |
| `{style}` | Current `style` from `components.json` (optional) |

Example with style: `"https://termcn.com/r/{style}/{name}.json"` → `https://termcn.com/r/new-york/button.json`

## Serving static files (Vite)

The build outputs to `public/r/`. Vite serves `public/` at root, so:

- Dev: `http://localhost:3000/r/button.json`
- Prod: `https://termcn.com/r/button.json`

No route handlers needed — pure static file serving.

## Version pinning (consumers)

```bash
npx shadcn@latest add @termcn/button#v1.0.0
```

Requires tagging the GitHub release and serving versioned JSON (future).

## Registry catalog endpoints

```bash
# List all items
npx shadcn@latest list https://termcn.com/r/registry.json

# Search
npx shadcn@latest search https://termcn.com/r/registry.json --query button

# View a specific item
npx shadcn@latest view https://termcn.com/r/button.json

# Install
npx shadcn@latest add https://termcn.com/r/button.json
# or via namespace:
npx shadcn@latest add @termcn/button
```

## Orphaned files note

`public/r/styles/termcn/*.json` are pre-built from the deleted `registry/` source. These should be
**deleted and regenerated** when `registry/` is reconstructed and `shadcn build` is run again.
