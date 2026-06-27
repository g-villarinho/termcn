import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap select-none font-mono outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:text-foreground2 disabled:border-foreground2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"border border-border bg-background text-foreground focus-visible:bg-foreground focus-visible:text-background focus-visible:border-foreground",
				primary:
					"border border-primary text-primary focus-visible:bg-primary focus-visible:text-primary-foreground",
				destructive:
					"border border-destructive text-destructive focus-visible:bg-destructive focus-visible:text-destructive-foreground",
				ghost:
					"border border-transparent text-foreground1 focus-visible:bg-foreground focus-visible:text-background",
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
		defaultVariants: { variant: "default", size: "default", bracket: true },
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
