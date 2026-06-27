"use client"
import * as React from "react"
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
}

function InstallTabs({ pkg }: InstallTabsProps) {
  const [active, setActive] = React.useState<PM>(getSavedPM)
  const [copied, setCopied] = React.useState(false)

  const command = `${PREFIXES[active]} shadcn@latest add ${pkg}`

  function selectPM(pm: PM) {
    setActive(pm)
    try { localStorage.setItem(LS_KEY, pm) } catch {}
  }

  function copy() {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="border border-border mb-6 font-mono text-sm">
      {/* Tab bar */}
      <div className="flex items-center border-b border-border bg-background1">
        <span className="px-3 py-2 text-foreground2 text-xs select-none">›_</span>
        {PACKAGE_MANAGERS.map((pm) => (
          <button
            key={pm}
            type="button"
            onClick={() => selectPM(pm)}
            className={cn(
              "px-4 py-2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              active === pm
                ? "text-background bg-foreground font-bold"
                : "text-foreground1",
            )}
          >
            {pm}
          </button>
        ))}
        <div className="flex-1" />
        <button
          type="button"
          onClick={copy}
          className="px-3 py-2 text-foreground2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          title="Copy to clipboard"
          aria-label="Copy command"
        >
          {copied ? (
            <span className="text-success">✓</span>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <rect x="9" y="9" width="13" height="13" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
      {/* Command */}
      <div className="px-4 py-3 bg-background text-foreground">
        <span className="text-ansi-green">{PREFIXES[active]}</span>{" "}
        <span className="text-foreground1">shadcn@latest add</span>{" "}
        <span className="text-primary">{pkg}</span>
      </div>
    </div>
  )
}

export { InstallTabs }
