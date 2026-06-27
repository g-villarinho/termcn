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

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
      <rect x="9" y="9" width="13" height="13" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
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
      {/* Tab bar */}
      <div className="flex items-stretch border-b border-border bg-background1">
        <TabsList className="border-b-0 bg-transparent gap-0 flex-1">
          {PACKAGE_MANAGERS.map((pm) => (
            <TabsTrigger
              key={pm}
              value={pm}
              className="text-xs px-4 py-1.5 border-r border-border last:border-r-0"
            >
              {pm}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Copy button — fixed 32×32 so it never shifts layout */}
        <button
          type="button"
          onClick={copy}
          aria-label="Copy command"
          className={cn(
            "w-8 flex items-center justify-center border-l border-border",
            "text-foreground2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            copied ? "text-success" : "text-foreground2",
          )}
        >
          {/* fixed wrapper ensures identical box size for both states */}
          <span className="flex w-[13px] h-[13px] items-center justify-center leading-none">
            {copied ? (
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
                <polyline points="1,7 5,11 12,2" />
              </svg>
            ) : (
              <CopyIcon />
            )}
          </span>
        </button>
      </div>

      {/* Command row — single line, flex-aligned for optical vertical centering */}
      {PACKAGE_MANAGERS.map((pm) => (
        <TabsContent
          key={pm}
          value={pm}
          className="flex items-center h-9 px-4 mt-0 bg-background leading-none"
        >
          <span className="text-ansi-green">{PREFIXES[pm]}</span>
          <span className="text-foreground1">&nbsp;shadcn@latest add&nbsp;</span>
          <span className="text-primary">{pkg}</span>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { InstallTabs }
