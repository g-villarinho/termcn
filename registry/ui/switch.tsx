import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
	"peer inline-flex shrink-0 items-center border font-mono outline-none",
	{
		variants: {
			size: {
				default:
					"h-6 w-11 p-0.5 focus-visible:ring-1 focus-visible:ring-ring",
				sm: "h-5 w-9 p-0.5 focus-visible:ring-1 focus-visible:ring-ring",
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

const switchThumbVariants = cva(
	"block border bg-foreground",
	{
		variants: {
			size: {
				default:
					"size-4 border-border data-[state=checked]:translate-x-5",
				sm: "size-3 border-border data-[state=checked]:translate-x-4",
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

interface SwitchProps
	extends React.ComponentProps<typeof SwitchPrimitive.Root>,
		VariantProps<typeof switchVariants> {}

function Switch({ className, size, ...props }: SwitchProps) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				switchVariants({ size }),
				"bg-background2 text-foreground",
				"border-input focus-visible:border-primary",
				"data-[state=checked]:border-primary data-[state=checked]:bg-primary",
				"disabled:cursor-not-allowed disabled:border-foreground2 disabled:bg-background1",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					switchThumbVariants({ size }),
					"data-[state=checked]:border-primary-foreground data-[state=unchecked]:bg-foreground",
					"data-[state=checked]:bg-primary-foreground",
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
