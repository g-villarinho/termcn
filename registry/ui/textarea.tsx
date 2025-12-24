import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
	[
		"w-full bg-background text-foreground placeholder:text-muted-foreground",
		"border-0 outline-none resize-vertical",
		"font-mono transition-colors",
		"selection:bg-primary selection:text-primary-foreground",
		"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
	],
	{
		variants: {
			variant: {
				default: "",
				bordered: "border border-border focus:border-primary",
			},
			textareaSize: {
				sm: "min-h-[2lh] px-0 py-0 text-xs",
				default: "min-h-[2lh] px-[1ch] py-1 text-sm",
				lg: "min-h-[4lh] px-[2ch] py-[1lh] text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			textareaSize: "default",
		},
	}
)

function Textarea({
	className,
	variant,
	textareaSize,
	...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(textareaVariants({ variant, textareaSize, className }))}
			{...props}
		/>
	)
}

export { Textarea, textareaVariants }
