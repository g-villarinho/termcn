import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

function NavigationMenu({
	className,
	children,
	viewport = true,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
	viewport?: boolean;
}) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			className={cn(
				"relative flex max-w-max flex-1 items-center justify-center font-mono",
				className,
			)}
			{...props}
		>
			{children}
			{viewport ? <NavigationMenuViewport /> : null}
		</NavigationMenuPrimitive.Root>
	);
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(
				"group flex flex-1 list-none items-center border-b border-border bg-background1 text-foreground1",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuItem({
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
	return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} />;
}

function NavigationMenuTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(
				"group inline-flex min-w-0 items-center justify-center gap-2 border-r border-border px-3 py-1 text-sm outline-none",
				"last:border-r-0",
				"data-[state=open]:bg-foreground data-[state=open]:text-background",
				"focus-visible:bg-foreground focus-visible:text-background",
				"disabled:pointer-events-none disabled:text-foreground2",
				className,
			)}
			{...props}
		>
			{children}
			<span
				aria-hidden="true"
				className={cn(
					"text-xs text-foreground2",
					"group-data-[state=open]:text-background",
				)}
			>
				▾
			</span>
		</NavigationMenuPrimitive.Trigger>
	);
}

function NavigationMenuContent({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				"left-0 top-0 w-full font-mono md:absolute md:w-auto",
				"data-[motion=from-start]:animate-[termcn-fade_150ms_ease-out]",
				"data-[motion=from-end]:animate-[termcn-fade_150ms_ease-out]",
				"data-[motion=to-start]:animate-[termcn-fade-out_150ms_ease-out]",
				"data-[motion=to-end]:animate-[termcn-fade-out_150ms_ease-out]",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuLink({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"block border-b border-border px-3 py-2 text-sm text-foreground outline-none last:border-b-0",
				"focus-visible:bg-foreground focus-visible:text-background",
				"data-[active]:bg-foreground data-[active]:text-background",
				"data-[disabled]:pointer-events-none data-[disabled]:text-foreground2",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuIndicator({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
	return (
		<NavigationMenuPrimitive.Indicator
			data-slot="navigation-menu-indicator"
			className={cn(
				"top-full z-[1] flex h-1.5 items-start justify-center overflow-hidden",
				"data-[state=visible]:animate-[termcn-fade_150ms_ease-out] data-[state=hidden]:animate-[termcn-fade-out_150ms_ease-out]",
				className,
			)}
			{...props}
		>
			<div className="size-1.5 bg-primary" />
		</NavigationMenuPrimitive.Indicator>
	);
}

function NavigationMenuViewport({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
	return (
		<div className="absolute left-0 top-full flex w-full justify-center md:w-auto">
			<NavigationMenuPrimitive.Viewport
				data-slot="navigation-menu-viewport"
				className={cn(
					"relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden border border-border bg-card text-foreground md:w-[var(--radix-navigation-menu-viewport-width)]",
					"data-[state=open]:animate-[termcn-fade_150ms_ease-out] data-[state=closed]:animate-[termcn-fade-out_150ms_ease-out]",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function NavigationMenuSub({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Sub>) {
	return (
		<NavigationMenuPrimitive.Sub
			data-slot="navigation-menu-sub"
			className={cn("flex flex-col gap-3", className)}
			{...props}
		/>
	);
}

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
	NavigationMenuSub,
};
