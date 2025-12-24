#TASK

**Required parameter:** file (the file to write doc for)

# Component Documentation Generator

Generate comprehensive MDX documentation for TermCN components following the established pattern.

## Usage

```
/doc-gen <component-name>
```

Example:
```
/doc-gen input
/doc-gen card
/doc-gen alert
```

## What This Skill Does

When invoked with a component name (e.g., `/doc-gen input`), this skill will:

1. **Read the component source** from `registry/ui/<component-name>.tsx` to analyze:
   - Available variants and their purposes
   - Props and TypeScript types
   - Default values
   - Component features and capabilities
   - Visual design patterns (3D effects, shadows, borders)

2. **Generate comprehensive MDX documentation** at `registry/docs/<component-name>.mdx` following the exact pattern from [badge.mdx](registry/docs/badge.mdx) and [button.mdx](registry/docs/button.mdx)

3. **Update the registry** by running `pnpm generate-registry`

## Documentation Structure Template

The generated documentation must follow this exact structure:

### Frontmatter
```yaml
---
title: <ComponentName>
description: <One-line description highlighting terminal aesthetics and purpose>
order: <next-available-number>
published: true
---
```

### Required Sections (in order)

1. **Header & Import**
2. **Overview** - Detailed purpose and terminal design elements
3. **Features** - 6-8 bullet points covering variants, design, interactions, accessibility
4. **Installation** - `npx termcn add <component>`
5. **Dependencies** - List all deps (Radix UI, CVA, utils)
6. **Usage** - Multiple subsections:
   - Basic Usage (with ComponentPreview)
   - With Variants (show ALL variants)
   - With Sizes (if applicable)
   - Additional features (icons, asChild, etc.)
   - Disabled State
7. **Common Use Cases** - 4-6 real-world examples with previews
8. **API Reference** - Props table + TypeScript definitions
9. **Styling and Customization** - Custom styles, theme vars, extending
10. **Accessibility** - Keyboard nav, ARIA, screen readers
11. **Best Practices** - When to use ✅, when NOT to use ❌, design guidelines
12. **Design Details** - Technical breakdown of visual effects (if applicable)
13. **Related Components** - 3-5 related items
14. **Examples Gallery** - 3-5 advanced examples
15. **Performance** - Bundle size, SSR, optimizations
16. **Troubleshooting** - 3-4 common issues
17. **Migration Guide** - Differences from shadcn/ui (optional)
18. **Changelog** - Version 1.0.0 features
19. **License & Contributing**
20. **Keywords** - 10-15 relevant terms

## Style Guidelines

- **Use ComponentPreview** for ALL visual examples
- **Code examples** must be complete and runnable
- **Tone**: Professional, technical, comprehensive
- **Emphasis**: Terminal aesthetics, 3D effects, retro computing, tactile interactions
- **Be specific** about visual design (border widths, shadow offsets, transforms)
- **Document every prop** clearly in the props table
- **Provide diverse examples** covering different use cases
- **Always include** comprehensive accessibility guidance

## Example Pattern Match

Reference these files for the exact style and depth:
- [badge.mdx](registry/docs/badge.mdx) - 523 lines
- [button.mdx](registry/docs/button.mdx) - 562 lines

Both follow the same comprehensive structure with:
- Detailed prop documentation
- Multiple code examples
- ComponentPreview usage
- Technical implementation details
- Extensive use cases
- Accessibility guidance

## Post-Generation Steps

After creating the documentation:
1. Save to `registry/docs/<component-name>.mdx`
2. Run `pnpm generate-registry` to update registry JSON
3. Run `pnpm add-component <component-name>` to copy the component to `src/components/ui/` (required for MDX imports to work)
4. Inform user the docs are available at `/docs/<component-name>`
5. Use playwright mcp do test application in link http://localhost:3000/docs/$component_name
