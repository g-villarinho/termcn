"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tabsListVariants = cva(
	"inline-flex items-center font-mono text-sm border-b border-border bg-background1",
	{
		variants: {
			variant: {
				default: "",
				boxed: "border border-border",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

const tabsTriggerVariants = cva(
	[
		"inline-flex items-center justify-center gap-1.5 px-3 py-1.5 font-mono text-sm whitespace-nowrap",
		"text-muted-foreground",
		"border-b-2 border-transparent",
		"focus-visible:outline-none",
		"disabled:pointer-events-none disabled:opacity-50",
		"[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	],
	{
		variants: {
			variant: {
				default: [
					"data-[state=active]:text-ansi-blue",
					"data-[state=active]:border-b-ansi-blue",
				],
				buffer: [
					"data-[state=active]:text-foreground",
					"data-[state=active]:bg-background2",
					"data-[state=active]:border-b-transparent",
					"border-b-0 border-r border-border last:border-r-0",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

function Tabs({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			className={cn("flex flex-col", className)}
			{...props}
		/>
	)
}

interface TabsListProps
	extends React.ComponentProps<typeof TabsPrimitive.List>,
		VariantProps<typeof tabsListVariants> {}

function TabsList({ className, variant, ...props }: TabsListProps) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn(tabsListVariants({ variant }), className)}
			{...props}
		/>
	)
}

interface TabsTriggerProps
	extends React.ComponentProps<typeof TabsPrimitive.Trigger>,
		VariantProps<typeof tabsTriggerVariants> {}

function TabsTrigger({ className, variant, ...props }: TabsTriggerProps) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(tabsTriggerVariants({ variant }), className)}
			{...props}
		/>
	)
}

function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn("flex-1 outline-none bg-background p-4", className)}
			{...props}
		/>
	)
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants }
