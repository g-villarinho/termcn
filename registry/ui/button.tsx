import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap select-none font-mono outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-muted disabled:text-foreground2 disabled:border-transparent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-muted text-foreground active:bg-background3",
				primary:
					"bg-primary text-primary-foreground active:brightness-110",
				destructive:
					"bg-destructive text-destructive-foreground active:brightness-110",
				outline:
					"border border-border bg-transparent text-foreground active:bg-muted",
				ghost:
					"bg-transparent text-foreground1 active:bg-muted active:text-foreground",
			},
			size: {
				default: "px-3 py-1 text-sm",
				sm: "px-2 py-0.5 text-xs",
				icon: "size-7",
			},
			bracket: {
				true: "before:content-['['] after:content-[']'] before:mr-1.5 after:ml-1.5",
				false: "",
			},
		},
		defaultVariants: { variant: "default", size: "default", bracket: false },
	},
);

interface ButtonProps
	extends React.ComponentProps<"button">,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

function Button({
	className,
	variant,
	size,
	bracket,
	asChild = false,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, bracket }), className)}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
