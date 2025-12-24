import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonGroupVariants = cva(
	"inline-flex w-fit items-stretch font-mono",
	{
		variants: {
			orientation: {
				horizontal: "flex-row",
				vertical: "flex-col",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	}
);

interface ButtonGroupProps
	extends React.ComponentProps<"div">,
		VariantProps<typeof buttonGroupVariants> {}

function ButtonGroup({
	className,
	orientation,
	...props
}: ButtonGroupProps) {
	return (
		<div
			role="group"
			data-slot="button-group"
			data-orientation={orientation}
			className={cn(buttonGroupVariants({ orientation }), className)}
			{...props}
		/>
	);
}

function ButtonGroupText({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"div"> & {
	asChild?: boolean;
}) {
	const Comp = asChild ? Slot : "div";

	return (
		<Comp
			data-slot="button-group-text"
			className={cn(
				"flex items-center gap-2 border border-border bg-background px-3 font-mono text-sm text-muted-foreground",
				"[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
				className
			)}
			{...props}
		/>
	);
}

function ButtonGroupSeparator({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			role="separator"
			data-slot="button-group-separator"
			className={cn(
				"self-stretch bg-border",
				"data-[orientation=horizontal]:w-px",
				"data-[orientation=vertical]:h-px",
				className
			)}
			data-orientation={
				(props as { "data-orientation"?: string })["data-orientation"] ??
				"vertical"
			}
			{...props}
		/>
	);
}

export {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
	buttonGroupVariants,
};
