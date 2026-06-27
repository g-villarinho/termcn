import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center gap-1 whitespace-nowrap select-none border px-1.5 py-0 font-mono text-xs font-medium outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "border-border bg-background text-foreground",
				primary: "border-primary bg-primary/10 text-primary",
				secondary: "border-secondary bg-secondary/10 text-secondary",
				success: "border-success bg-success/10 text-success",
				warning: "border-warning bg-warning/10 text-warning",
				destructive: "border-destructive bg-destructive/10 text-destructive",
				info: "border-info bg-info/10 text-info",
				ghost: "border-transparent bg-muted text-muted-foreground",
			},
			bracket: {
				square: "before:content-['['] after:content-[']']",
				paren: "before:content-['('] after:content-[')']",
				none: "",
			},
		},
		defaultVariants: { variant: "default", bracket: "none" },
	},
);

interface BadgeProps
	extends React.ComponentProps<"span">,
		VariantProps<typeof badgeVariants> {
	asChild?: boolean;
}

function Badge({ className, variant, bracket, asChild = false, ...props }: BadgeProps) {
	const Comp = asChild ? Slot : "span";
	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant, bracket }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
