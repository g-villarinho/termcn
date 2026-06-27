import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "registry/ui/tabs"
import { Button } from "registry/ui/button"
import { cn } from "@/lib/utils"

const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const
type PM = (typeof PACKAGE_MANAGERS)[number]

const PREFIXES: Record<PM, string> = {
  pnpm: "pnpm dlx",
  npm: "npx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
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
  const [active, setActive] = React.useState<PM>(getSavedPM)
  const [copied, setCopied] = React.useState(false)

  function selectPM(pm: PM) {
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
      onValueChange={(v) => selectPM(v as PM)}
      className={cn("mb-6", className)}
    >
      <div className="flex items-center justify-between border border-b-0 border-border bg-background1 px-1">
        <TabsList className="border-b-0 bg-transparent">
          {PACKAGE_MANAGERS.map((pm) => (
            <TabsTrigger key={pm} value={pm} className="text-xs py-2">
              {pm}
            </TabsTrigger>
          ))}
        </TabsList>
        <Button
          variant="ghost"
          size="icon"
          bracket={false}
          onClick={copy}
          aria-label="Copy command"
          className="h-7 w-7 text-foreground2"
        >
          {copied ? (
            <span className="text-success text-xs">✓</span>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
              <rect x="9" y="9" width="13" height="13" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </Button>
      </div>

      {PACKAGE_MANAGERS.map((pm) => (
        <TabsContent key={pm} value={pm} className="border border-border px-4 py-3 mt-0 text-sm">
          <span className="text-ansi-green">{PREFIXES[pm]}</span>{" "}
          <span className="text-foreground1">shadcn@latest add</span>{" "}
          <span className="text-primary">{pkg}</span>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { InstallTabs }
