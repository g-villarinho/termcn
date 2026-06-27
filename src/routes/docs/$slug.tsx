import { createFileRoute } from "@tanstack/react-router"
import * as React from "react"

export const Route = createFileRoute("/docs/$slug")({
  component: DocsSlugPage,
})

function DocsSlugPage() {
  const { slug } = Route.useParams()
  const [Component, setComponent] = React.useState<React.ComponentType | null>(
    null,
  )
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const loadDoc = async () => {
      try {
        const modules = import.meta.glob<{
          default: React.ComponentType
        }>("../../content/docs/*.mdx")

        const path = `../../content/docs/${slug}.mdx`
        const moduleFunc = modules[path]

        if (!moduleFunc) {
          setError(`Documentation for "${slug}" not found.`)
          return
        }

        const module = await moduleFunc()
        setComponent(() => module.default)
      } catch (err) {
        setError(`Failed to load documentation for "${slug}".`)
        console.error(err)
      }
    }

    loadDoc()
  }, [slug])

  if (error) {
    return (
      <div className="text-destructive">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </div>
    )
  }

  if (!Component) {
    return (
      <div className="text-foreground1">
        <p>Loading...</p>
      </div>
    )
  }

  return <Component />
}
