import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

function Checkbox({
	className,
	...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				"peer group relative inline-flex items-center justify-center",
				"w-[3ch] h-lh min-w-0",
				"appearance-none outline-none",
				"font-mono text-sm leading-normal",
				"text-foreground/60 bg-background",
				"focus-visible:text-foreground focus-visible:font-bold",
				"disabled:text-foreground/40 disabled:pointer-events-none",
				className
			)}
			{...props}
		>
			<span className="select-none">[</span>
			<span className="inline-flex w-[1ch] items-center justify-center">
				<CheckboxPrimitive.Indicator
					data-slot="checkbox-indicator"
					className="inline-flex items-center justify-center text-current"
				>
					<span className="select-none">X</span>
				</CheckboxPrimitive.Indicator>
			</span>
			<span className="select-none">]</span>
		</CheckboxPrimitive.Root>
	)
}

export { Checkbox }
