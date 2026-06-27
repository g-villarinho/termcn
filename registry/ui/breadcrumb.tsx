import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

function Breadcrumb({
	className,
	...props
}: React.ComponentProps<"nav">) {
	return (
		<nav
			aria-label="breadcrumb"
			data-slot="breadcrumb"
			className={cn("font-mono text-sm text-foreground", className)}
			{...props}
		/>
	);
}

function BreadcrumbList({
	className,
	...props
}: React.ComponentProps<"ol">) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(
				"flex flex-wrap items-center gap-1.5 text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function BreadcrumbItem({
	className,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn("inline-flex items-center gap-1.5", className)}
			{...props}
		/>
	);
}

function BreadcrumbLink({
	asChild,
	className,
	...props
}: React.ComponentProps<"a"> & {
	asChild?: boolean;
}) {
	const Comp = asChild ? Slot : "a";

	return (
		<Comp
			data-slot="breadcrumb-link"
			className={cn(
				"inline-flex items-center border border-transparent px-1 py-0.5 text-foreground1 outline-none",
				"focus-visible:border-border focus-visible:bg-foreground focus-visible:text-background focus-visible:ring-1 focus-visible:ring-ring",
				className,
			)}
			{...props}
		/>
	);
}

function BreadcrumbPage({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			role="link"
			aria-current="page"
			aria-disabled="true"
			data-slot="breadcrumb-page"
			className={cn(
				"inline-flex items-center border border-border bg-background2 px-1 py-0.5 text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function BreadcrumbSeparator({
	children,
	className,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			role="presentation"
			aria-hidden="true"
			data-slot="breadcrumb-separator"
			className={cn("text-foreground2 [&_svg]:size-3.5", className)}
			{...props}
		>
			{children ?? <ChevronRight />}
		</li>
	);
}

function BreadcrumbEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			role="presentation"
			aria-hidden="true"
			data-slot="breadcrumb-ellipsis"
			className={cn(
				"inline-flex size-6 items-center justify-center border border-transparent text-foreground2",
				"[&_svg]:size-3.5",
				className,
			)}
			{...props}
		>
			<MoreHorizontal />
			<span className="sr-only">More</span>
		</span>
	);
}

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
};
