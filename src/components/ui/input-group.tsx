import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* -----------------------------------------------------------------------------
 * InputGroup
 * Terminal-style input container with vim-inspired styling
 * -------------------------------------------------------------------------- */

const inputGroupVariants = cva(
	[
		"flex w-full items-center font-mono text-sm",
		"bg-background text-foreground",
		"transition-colors",
	],
	{
		variants: {
			variant: {
				default: "",
				bordered:
					"border border-border has-[[data-slot=input-group-input]:focus]:border-primary has-[[data-slot=input-group-textarea]:focus]:border-primary",
				field:
					"border border-border bg-background1 has-[[data-slot=input-group-input]:focus]:border-primary has-[[data-slot=input-group-textarea]:focus]:border-primary",
			},
			size: {
				sm: "h-6 text-xs",
				default: "h-8",
				lg: "h-10 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

interface InputGroupProps
	extends React.ComponentProps<"div">,
		VariantProps<typeof inputGroupVariants> {}

function InputGroup({ className, variant, size, ...props }: InputGroupProps) {
	return (
		<div
			data-slot="input-group"
			className={cn(
				inputGroupVariants({ variant, size }),
				"has-data-[slot=input-group-textarea]:h-auto",
				className
			)}
			{...props}
		/>
	)
}

/* -----------------------------------------------------------------------------
 * InputGroupAddon
 * Container for prefix/suffix elements (icons, text, etc.)
 * -------------------------------------------------------------------------- */

const inputGroupAddonVariants = cva(
	[
		"flex h-full shrink-0 items-center gap-1 px-2 font-mono text-muted-foreground",
		"[&>svg]:size-4 [&>svg]:shrink-0",
	],
	{
		variants: {
			align: {
				"inline-start": "",
				"inline-end": "",
			},
		},
		defaultVariants: {
			align: "inline-start",
		},
	}
)

interface InputGroupAddonProps
	extends React.ComponentProps<"div">,
		VariantProps<typeof inputGroupAddonVariants> {}

function InputGroupAddon({
	className,
	align,
	...props
}: InputGroupAddonProps) {
	return (
		<div
			data-slot="input-group-addon"
			data-align={align}
			className={cn(inputGroupAddonVariants({ align }), className)}
			{...props}
		/>
	)
}

/* -----------------------------------------------------------------------------
 * InputGroupButton
 * Actionable button inside the group
 * -------------------------------------------------------------------------- */

function InputGroupButton({
	className,
	type = "button",
	...props
}: React.ComponentProps<"button">) {
	return (
		<button
			type={type}
			data-slot="input-group-button"
			className={cn(
				"flex h-full shrink-0 items-center gap-1 px-2 font-mono text-sm",
				"text-muted-foreground transition-colors",
				"hover:bg-background2 hover:text-foreground",
				"focus:outline-none focus:ring-1 focus:ring-primary",
				"disabled:pointer-events-none disabled:opacity-50",
				"[&>svg]:size-4 [&>svg]:shrink-0",
				className
			)}
			{...props}
		/>
	)
}

/* -----------------------------------------------------------------------------
 * InputGroupText
 * Simple text/label inside the group
 * -------------------------------------------------------------------------- */

function InputGroupText({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="input-group-text"
			className={cn("px-1 font-mono text-muted-foreground", className)}
			{...props}
		/>
	)
}

/* -----------------------------------------------------------------------------
 * InputGroupInput
 * The actual input element - transparent, fills available space
 * -------------------------------------------------------------------------- */

function InputGroupInput({
	className,
	...props
}: React.ComponentProps<"input">) {
	return (
		<input
			data-slot="input-group-input"
			className={cn(
				"h-full flex-1 bg-transparent px-2 font-mono outline-none",
				"placeholder:text-muted-foreground",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"selection:bg-primary selection:text-primary-foreground",
				className
			)}
			{...props}
		/>
	)
}

/* -----------------------------------------------------------------------------
 * InputGroupTextarea
 * For multiline input - expands the group height
 * -------------------------------------------------------------------------- */

function InputGroupTextarea({
	className,
	...props
}: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="input-group-textarea"
			className={cn(
				"min-h-[4lh] flex-1 resize-y bg-transparent px-2 py-2 font-mono outline-none",
				"placeholder:text-muted-foreground",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"selection:bg-primary selection:text-primary-foreground",
				className
			)}
			{...props}
		/>
	)
}

export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupText,
	InputGroupInput,
	InputGroupTextarea,
	inputGroupVariants,
	inputGroupAddonVariants,
}