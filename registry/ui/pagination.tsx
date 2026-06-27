import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Pagination({
	className,
	...props
}: React.ComponentProps<"nav">) {
	return (
		<nav
			role="navigation"
			aria-label="pagination"
			data-slot="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("flex items-center gap-1 font-mono", className)}
			{...props}
		/>
	);
}

function PaginationItem({
	...props
}: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = React.ComponentProps<"a"> & {
	isActive?: boolean;
	size?: React.ComponentProps<typeof Button>["size"];
};

function PaginationLink({
	className,
	isActive = false,
	size = "sm",
	...props
}: PaginationLinkProps) {
	return (
		<Button
			asChild
			variant="ghost"
			size={size}
			data-slot="pagination-link-button"
			className={cn(
				"min-w-8 px-2",
				"data-[active=true]:border-foreground data-[active=true]:bg-foreground data-[active=true]:text-background",
				className,
			)}
			bracket={size === "icon" ? false : true}
			data-active={isActive}
		>
			<a
				aria-current={isActive ? "page" : undefined}
				data-slot="pagination-link"
				data-active={isActive}
				{...props}
			/>
		</Button>
	);
}

function PaginationPrevious({
	className,
	children = "Prev",
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn("pl-2", className)}
			{...props}
		>
			<ChevronLeft data-icon="inline-start" />
			<span>{children}</span>
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	children = "Next",
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn("pr-2", className)}
			{...props}
		>
			<span>{children}</span>
			<ChevronRight data-icon="inline-end" />
		</PaginationLink>
	);
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden="true"
			data-slot="pagination-ellipsis"
			className={cn(
				"inline-flex size-8 items-center justify-center text-foreground2",
				"[&_svg]:size-4",
				className,
			)}
			{...props}
		>
			<MoreHorizontal />
			<span className="sr-only">More pages</span>
		</span>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
};
