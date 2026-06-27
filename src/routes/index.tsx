import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: IndexPage,
})

function IndexPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 border-b border-border pb-4">
          termcn
        </h1>

        <p className="text-foreground1 mb-8">
          Terminal-style component registry. Catppuccin Mocha aesthetic.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Components</h2>
          <nav className="space-y-2">
            <Link
              to="/docs/$slug"
              params={{ slug: "button" }}
              className="text-primary underline focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            >
              → Button
            </Link>
            <br />
            <Link
              to="/docs/$slug"
              params={{ slug: "input" }}
              className="text-primary underline focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            >
              → Input
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
