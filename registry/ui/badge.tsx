import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold font-mono focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				minimal: "border-background bg-background text-foreground",
				subtle: "border-muted bg-muted text-muted-foreground",
				muted: "border-accent bg-accent text-accent-foreground",
				elevated: "border-card bg-card text-card-foreground",
				solid: "border-foreground bg-foreground text-background",
				bold: "border-primary bg-primary text-primary-foreground",
				emphasis: "border-secondary bg-secondary text-secondary-foreground",
			},
			cap: {
				square: "rounded-none",
				round: "rounded-full",
				triangle:
					"px-[12px] [clip-path:polygon(8px_0%,calc(100%-8px)_0%,100%_50%,calc(100%-8px)_100%,8px_100%,0%_50%)]",
				ribbon:
					"pl-[12px] pr-[14px] [clip-path:polygon(0%_0%,calc(100%-8px)_0%,100%_50%,calc(100%-8px)_100%,0%_100%,8px_50%)]",
				"slant-top":
					"px-[12px] [clip-path:polygon(8px_0%,100%_0%,calc(100%-8px)_100%,0%_100%)]",
				"slant-bottom":
					"px-[12px] [clip-path:polygon(0%_0%,calc(100%-8px)_0%,100%_100%,8px_100%)]",
			},
		},
		defaultVariants: {
			variant: "bold",
			cap: "square",
		},
	},
);

function Badge({
	className,
	variant,
	cap,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant, cap }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
