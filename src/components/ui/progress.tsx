"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const progressVariants = cva("font-mono leading-none", {
	variants: {
		variant: {
			default: "text-primary",
			success: "text-success",
			warning: "text-warning",
			destructive: "text-destructive",
			muted: "text-muted-foreground",
		},
		size: {
			sm: "text-[10px]",
			md: "text-xs",
			lg: "text-sm",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
	},
});

const barVariants = cva(
	"relative w-full overflow-hidden bg-muted border border-border",
	{
		variants: {
			variant: {
				default: "[&>[data-slot=indicator]]:bg-primary",
				success: "[&>[data-slot=indicator]]:bg-success",
				warning: "[&>[data-slot=indicator]]:bg-warning",
				destructive: "[&>[data-slot=indicator]]:bg-destructive",
				muted: "[&>[data-slot=indicator]]:bg-muted-foreground",
			},
			size: {
				sm: "h-1",
				md: "h-2",
				lg: "h-3",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
);

const FILL_CHARS = {
	block: "█",
	hash: "#",
	arrow: ">",
	equals: "=",
	dot: "●",
	pipe: "|",
	shade: "▓",
	line: "━",
} as const;

const EMPTY_CHARS = {
	block: "░",
	hash: "-",
	arrow: " ",
	equals: " ",
	dot: "○",
	pipe: " ",
	shade: "░",
	line: "─",
} as const;

type FillCharPreset = keyof typeof FILL_CHARS;

interface ProgressProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
		VariantProps<typeof progressVariants> {
	value?: number;
	max?: number;
	/** Display mode: "char" for ASCII characters, "bar" for visual bar */
	mode?: "char" | "bar";
	/** Character(s) to fill the progress bar (only for mode="char") */
	fillChar?: FillCharPreset | string;
	/** Show percentage text at the end */
	showPercent?: boolean;
	/** Show brackets around the progress bar (only for mode="char") */
	showBrackets?: boolean;
	/** Number of characters for the progress bar width (only for mode="char") */
	charWidth?: number;
}

function Progress({
	className,
	variant,
	size,
	value = 0,
	max = 100,
	mode = "char",
	fillChar = "block",
	showPercent = false,
	showBrackets = true,
	charWidth = 20,
	...props
}: ProgressProps) {
	const normalizedValue = Math.min(Math.max(value, 0), max);
	const percentage = Math.round((normalizedValue / max) * 100);

	// Bar mode - use Radix Progress
	if (mode === "bar") {
		return (
			<div
				className={cn("inline-flex items-center gap-2", className)}
				{...props}
			>
				<ProgressPrimitive.Root
					data-slot="progress"
					className={cn(barVariants({ variant, size }), "flex-1")}
					value={normalizedValue}
					max={max}
				>
					<ProgressPrimitive.Indicator
						data-slot="indicator"
						className="h-full w-full flex-1 transition-transform"
						style={{ transform: `translateX(-${100 - percentage}%)` }}
					/>
				</ProgressPrimitive.Root>
				{showPercent && (
					<span
						className={cn(
							progressVariants({ variant, size }),
							"tabular-nums"
						)}
					>
						{percentage.toString().padStart(3)}%
					</span>
				)}
			</div>
		);
	}

	// Char mode - use ASCII characters
	const filledCount = Math.round((normalizedValue / max) * charWidth);
	const emptyCount = charWidth - filledCount;
	const isPreset = fillChar in FILL_CHARS;
	const resolvedFillChar = isPreset
		? FILL_CHARS[fillChar as FillCharPreset]
		: fillChar;
	const resolvedEmptyChar = isPreset
		? EMPTY_CHARS[fillChar as FillCharPreset]
		: " ";

	return (
		<div
			role="progressbar"
			aria-valuenow={normalizedValue}
			aria-valuemin={0}
			aria-valuemax={max}
			aria-label={`${percentage}% complete`}
			data-slot="progress"
			className={cn(
				progressVariants({ variant, size }),
				"inline-flex items-baseline select-none",
				className
			)}
			{...props}
		>
			{showBrackets && <span className="text-muted-foreground">&lt;</span>}
			<span className="whitespace-pre" aria-hidden="true">
				{resolvedFillChar.repeat(filledCount)}
			</span>
			<span className="whitespace-pre text-muted-foreground" aria-hidden="true">
				{resolvedEmptyChar.repeat(emptyCount)}
			</span>
			{showBrackets && <span className="text-muted-foreground">&gt;</span>}
			{showPercent && (
				<span className="ml-1 tabular-nums text-muted-foreground">
					{percentage.toString().padStart(3)}%
				</span>
			)}
		</div>
	);
}

export { Progress, progressVariants, barVariants, FILL_CHARS, EMPTY_CHARS };
export type { ProgressProps, FillCharPreset };
