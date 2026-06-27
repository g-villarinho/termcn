import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap border font-mono outline-none select-none",
	{
		variants: {
			variant: {
				default:
					"border-border bg-background text-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-ring data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
				outline:
					"border-border bg-background2 text-foreground1 focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-ring data-[state=on]:border-foreground data-[state=on]:bg-foreground data-[state=on]:text-background",
			},
			size: {
				default: "h-9 px-3 text-sm",
				sm: "h-7 px-2 text-xs",
				lg: "h-10 px-4 text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface ToggleProps
	extends React.ComponentProps<typeof TogglePrimitive.Root>,
		VariantProps<typeof toggleVariants> {}

function Toggle({ className, variant, size, ...props }: ToggleProps) {
	return (
		<TogglePrimitive.Root
			data-slot="toggle"
			className={cn(
				toggleVariants({ variant, size }),
				"disabled:pointer-events-none disabled:border-foreground2 disabled:bg-background1 disabled:text-foreground2",
				"[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
				className,
			)}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
