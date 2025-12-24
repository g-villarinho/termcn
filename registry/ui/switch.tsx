import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
	"peer group relative inline-flex shrink-0 cursor-pointer items-center outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			size: {
				default: "h-lh w-[4ch]",
				sm: "h-lh w-[2ch]",
			},
			bar: {
				default: "",
				thin: "[--bar-height:0.5lh]",
				line: "[--bar-height:2px]",
			},
		},
		defaultVariants: {
			size: "default",
			bar: "default",
		},
	}
)

interface SwitchProps
	extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
		VariantProps<typeof switchVariants> {}

function Switch({ className, size, bar, ...props }: SwitchProps) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(switchVariants({ size, bar, className }))}
			{...props}
		>
			{/* Track */}
			<span
				data-slot="switch-track"
				className={cn(
					"absolute left-0 top-1/2 -translate-y-1/2 bg-muted",
					size === "sm" ? "h-(--bar-height,1lh) w-[2ch]" : "h-(--bar-height,1lh) w-[4ch]"
				)}
			/>
			{/* Thumb */}
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"pointer-events-none relative block transition-all",
					"bg-muted-foreground data-[state=checked]:bg-foreground",
					size === "sm"
						? "h-lh w-[1ch] data-[state=checked]:translate-x-[1ch] data-[state=unchecked]:translate-x-0"
						: "h-lh w-[2ch] data-[state=checked]:translate-x-[2ch] data-[state=unchecked]:translate-x-0"
				)}
			/>
		</SwitchPrimitive.Root>
	)
}

export { Switch, switchVariants }