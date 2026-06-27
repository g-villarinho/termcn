import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";

function Collapsible({
	className,
	...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
	return (
		<CollapsiblePrimitive.Root
			data-slot="collapsible"
			className={cn(
				"border border-border bg-background font-mono text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function CollapsibleTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
	return (
		<CollapsiblePrimitive.Trigger
			data-slot="collapsible-trigger"
			className={cn(
				"group flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm outline-none",
				"focus-visible:bg-foreground focus-visible:text-background",
				"data-[state=open]:border-b data-[state=open]:border-border data-[state=open]:bg-background1",
				"disabled:pointer-events-none disabled:text-foreground2",
				className,
			)}
			{...props}
		>
			<span className="min-w-0 flex-1">{children}</span>
			<span
				aria-hidden="true"
				className={cn(
					"text-xs text-primary",
					"group-data-[state=open]:text-foreground",
				)}
			>
				<span className="group-data-[state=open]:hidden">▸</span>
				<span className="hidden group-data-[state=open]:inline">▾</span>
			</span>
		</CollapsiblePrimitive.Trigger>
	);
}

function CollapsibleContent({
	className,
	...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
	return (
		<CollapsiblePrimitive.Content
			data-slot="collapsible-content"
			className={cn(
				"bg-background1 px-3 py-2 text-sm text-foreground1",
				"data-[state=open]:animate-[termcn-fade_150ms_ease-out] data-[state=closed]:animate-[termcn-fade-out_150ms_ease-out]",
				className,
			)}
			{...props}
		/>
	);
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
