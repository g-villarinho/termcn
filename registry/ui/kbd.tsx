import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kbdVariants = cva(
	"pointer-events-none inline-flex items-center justify-center gap-1 font-mono text-xs select-none [&_svg:not([class*='size-'])]:size-3",
	{
		variants: {
			variant: {
				default: "border border-border bg-muted text-muted-foreground",
				outline: "border border-border bg-transparent text-foreground",
				ghost: "bg-transparent text-muted-foreground",
			},
			size: {
				sm: "h-4 min-w-4 px-1 text-[10px]",
				default: "h-5 min-w-5 px-1.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Kbd({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"kbd"> &
	VariantProps<typeof kbdVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "kbd";

	return (
		<Comp
			data-slot="kbd"
			className={cn(kbdVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="kbd-group"
			className={cn("inline-flex items-center gap-1 font-mono", className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup, kbdVariants };
