import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// =============================================================================
// Card Variants
// =============================================================================

const cardVariants = cva(
	[
		"flex flex-col font-mono text-card-foreground",
		"border-2 border-border bg-card",
		"overflow-hidden",
	],
	{
		variants: {
			variant: {
				default: "",
				elevated: "shadow-[0.25rem_0.25rem_0_0_var(--background2)]",
				floating: "shadow-[0.5rem_0.5rem_0_0_var(--background2)]",
			},
			size: {
				sm: "text-xs",
				default: "text-sm",
				lg: "text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

const modeVariants = cva(
	"px-1.5 py-0.5 text-xs font-bold uppercase tracking-wider",
	{
		variants: {
			mode: {
				NORMAL: "bg-ansi-blue text-background",
				INSERT: "bg-ansi-green text-background",
				VISUAL: "bg-ansi-magenta text-background",
				COMMAND: "bg-ansi-yellow text-background",
			},
		},
		defaultVariants: {
			mode: "NORMAL",
		},
	}
)

const statusSectionVariants = cva("px-2 py-1", {
	variants: {
		variant: {
			mode: "font-bold uppercase text-background",
			buffer: "bg-background2 text-foreground",
			spacer: "flex-1 bg-background1",
			info: "bg-background2 text-foreground",
			position: "bg-background3 text-foreground",
		},
		modeColor: {
			default: "",
			blue: "bg-ansi-blue",
			green: "bg-ansi-green",
			magenta: "bg-ansi-magenta",
			yellow: "bg-ansi-yellow",
			cyan: "bg-ansi-cyan",
		},
	},
	defaultVariants: {
		variant: "info",
		modeColor: "default",
	},
})

// =============================================================================
// Core Components
// =============================================================================

interface CardProps
	extends React.ComponentProps<"div">,
		VariantProps<typeof cardVariants> {}

function Card({ className, variant, size, ...props }: CardProps) {
	return (
		<div
			data-slot="card"
			className={cn(cardVariants({ variant, size }), className)}
			{...props}
		/>
	)
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"flex flex-col gap-1.5 border-b border-border bg-background1 px-4 py-3",
				className
			)}
			{...props}
		/>
	)
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"font-semibold leading-none tracking-tight text-foreground",
				className
			)}
			{...props}
		/>
	)
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	)
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn("ml-auto flex items-center gap-2", className)}
			{...props}
		/>
	)
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("flex-1 px-4 py-4", className)}
			{...props}
		/>
	)
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"flex items-center gap-2 border-t border-border bg-background1 px-4 py-3",
				className
			)}
			{...props}
		/>
	)
}

// =============================================================================
// Window Decoration Components
// =============================================================================

function CardWindowBar({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-window-bar"
			className={cn(
				"flex items-center justify-between border-b border-border bg-background1 px-2 py-1",
				className
			)}
			{...props}
		/>
	)
}

interface CardModeProps extends React.ComponentProps<"span"> {
	mode?: "NORMAL" | "INSERT" | "VISUAL" | "COMMAND"
}

function CardMode({ className, mode = "NORMAL", ...props }: CardModeProps) {
	return (
		<span
			data-slot="card-mode"
			className={cn(modeVariants({ mode }), className)}
			{...props}
		>
			{props.children ?? mode}
		</span>
	)
}

interface CardBufferNameProps extends React.ComponentProps<"span"> {
	modified?: boolean
	readonly?: boolean
}

function CardBufferName({
	className,
	modified,
	readonly,
	children,
	...props
}: CardBufferNameProps) {
	return (
		<span
			data-slot="card-buffer-name"
			className={cn("text-muted-foreground", className)}
			{...props}
		>
			<span className="text-foreground2">[</span>
			<span className="text-foreground">{children}</span>
			{modified && <span className="text-ansi-yellow">[+]</span>}
			{readonly && <span className="text-ansi-red">[RO]</span>}
			<span className="text-foreground2">]</span>
		</span>
	)
}

function CardFileType({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="card-file-type"
			className={cn("text-xs text-ansi-cyan", className)}
			{...props}
		/>
	)
}

function CardLinePosition({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="card-line-position"
			className={cn("text-xs text-foreground2", className)}
			{...props}
		/>
	)
}

function CardWindowControls({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-window-controls"
			className={cn("flex gap-1", className)}
			{...props}
		>
			<span className="text-ansi-red">●</span>
			<span className="text-ansi-yellow">●</span>
			<span className="text-ansi-green">●</span>
		</div>
	)
}

// =============================================================================
// Status Line Components
// =============================================================================

function CardStatusLine({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-status-line"
			className={cn(
				"flex items-stretch text-xs border-t border-border overflow-hidden",
				className
			)}
			{...props}
		/>
	)
}

interface CardStatusSectionProps
	extends React.ComponentProps<"div">,
		VariantProps<typeof statusSectionVariants> {}

function CardStatusSection({
	className,
	variant,
	modeColor,
	...props
}: CardStatusSectionProps) {
	return (
		<div
			data-slot="card-status-section"
			className={cn(statusSectionVariants({ variant, modeColor }), className)}
			{...props}
		/>
	)
}

// =============================================================================
// Exports
// =============================================================================

export {
	// Core
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
	// Window decorations
	CardWindowBar,
	CardMode,
	CardBufferName,
	CardFileType,
	CardLinePosition,
	CardWindowControls,
	// Status line
	CardStatusLine,
	CardStatusSection,
	// Variants
	cardVariants,
	modeVariants,
	statusSectionVariants,
}
