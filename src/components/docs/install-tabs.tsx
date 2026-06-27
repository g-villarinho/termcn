import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "registry/ui/tabs"
import { cn } from "@/lib/utils"

const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const
type PM = (typeof PACKAGE_MANAGERS)[number]

const PREFIXES: Record<PM, string> = {
  pnpm: "pnpm dlx",
  npm:  "npx",
  yarn: "yarn dlx",
  bun:  "bunx --bun",
}

const LS_KEY = "termcn:install-pm"

function getSavedPM(): PM {
  try {
    const v = localStorage.getItem(LS_KEY)
    if (v && (PACKAGE_MANAGERS as readonly string[]).includes(v)) return v as PM
  } catch {}
  return "pnpm"
}

interface InstallTabsProps {
  pkg: string
  className?: string
}

function InstallTabs({ pkg, className }: InstallTabsProps) {
  const [copied, setCopied] = React.useState(false)
  const [active, setActive] = React.useState<PM>(getSavedPM)

  function selectPM(v: string) {
    const pm = v as PM
    setActive(pm)
    try { localStorage.setItem(LS_KEY, pm) } catch {}
  }

  function copy() {
    const cmd = `${PREFIXES[active]} shadcn@latest add ${pkg}`
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <Tabs
      value={active}
      onValueChange={selectPM}
      className={cn("mb-6 border border-border font-mono text-sm", className)}
    >
      {/* Tab bar: single row, no inner double-border */}
      <div className="flex items-center border-b border-border bg-background1">
        <TabsList className="border-b-0 bg-transparent gap-0 w-auto">
          {PACKAGE_MANAGERS.map((pm) => (
            <TabsTrigger
              key={pm}
              value={pm}
              className="text-xs px-4 py-2 border-r border-border last:border-r-0"
            >
              {pm}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1" />

        <button
          type="button"
          onClick={copy}
          aria-label="Copy command"
          className={cn(
            "px-3 py-2 text-foreground2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            copied && "text-success",
          )}
        >
          {copied ? (
            <span className="text-xs">✓</span>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
              <rect x="9" y="9" width="13" height="13" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>

      {/* Command content */}
      {PACKAGE_MANAGERS.map((pm) => (
        <TabsContent key={pm} value={pm} className="px-4 pt-1.5 pb-2 mt-0 bg-background">
          <span className="text-ansi-green">{PREFIXES[pm]}</span>{" "}
          <span className="text-foreground1">shadcn@latest add</span>{" "}
          <span className="text-primary">{pkg}</span>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { InstallTabs }
