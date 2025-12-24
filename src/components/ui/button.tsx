import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
	{
		variants: {
			variant: {
				default:
					"bg-foreground text-background active:bg-background active:text-foreground",
				destructive:
					"bg-destructive text-destructive-foreground active:bg-background active:text-destructive",
				outline:
					"bg-background text-foreground border border-border active:bg-foreground active:text-background",
				secondary:
					"bg-secondary text-secondary-foreground active:bg-background active:text-secondary-foreground",
				ghost:
					"active:bg-accent active:text-accent-foreground",
				link: "text-foreground underline-offset-4 active:underline",
				success:
					"bg-success text-success-foreground active:bg-background active:text-success",
				warning:
					"bg-warning text-warning-foreground active:bg-background active:text-warning",
				info: "bg-info text-info-foreground active:bg-background active:text-info",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 px-3 text-xs",
				lg: "h-10 px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
