import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import { MDXProvider } from "@mdx-js/react"
import { mdxComponents } from "@/components/docs/mdx-components"

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
})

function DocsLayout() {
  const components = [
    { name: "Button", slug: "button" },
    { name: "Input", slug: "input" },
  ]

  return (
    <MDXProvider components={mdxComponents}>
      <div className="min-h-screen bg-background text-foreground font-mono flex">
        {/* Sidebar */}
        <aside className="w-48 border-r border-border bg-background p-4 fixed h-screen overflow-y-auto">
          <div className="mb-6">
            <Link
              to="/"
              className="text-lg font-bold text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            >
              termcn
            </Link>
          </div>

          <nav className="space-y-2">
            <div className="text-xs text-foreground1 uppercase tracking-widest mb-4">
              Components
            </div>
            {components.map((comp) => (
              <Link
                key={comp.slug}
                to={`/docs/${comp.slug}`}
                className="block text-sm text-foreground hover:text-primary focus-visible:text-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none px-2 py-1 border border-transparent focus-visible:border-ring"
                activeProps={{
                  className:
                    "block text-sm text-background bg-foreground px-2 py-1 border border-foreground",
                }}
              >
                {comp.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="ml-48 flex-1 p-8 max-w-3xl">
          <Outlet />
        </main>
      </div>
    </MDXProvider>
  )
}
