import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const SPINNER_CHARS = {
	line: ["\\", "|", "/", "-"],
	dots: ["⣷", "⣯", "⣟", "⡿", "⢿", "⣻", "⣽", "⣾"],
	cross: ["+", "x"],
	square: ["◰", "◳", "◲", "◱"],
	pie: ["◴", "◷", "◶", "◵"],
	half: ["◐", "◓", "◑", "◒"],
	"bar-vertical": ["▁", "▃", "▄", "▅", "▆", "▇", "█", "▇", "▆", "▅", "▄", "▃"],
	"bar-horizontal": [
		"▉",
		"▊",
		"▋",
		"▌",
		"▍",
		"▎",
		"▏",
		"▎",
		"▍",
		"▌",
		"▋",
		"▊",
		"▉",
	],
} as const;

const SPEED_DURATION = {
	slow: 400,
	medium: 200,
	fast: 100,
} as const;

const spinnerVariants = cva("inline-flex items-center justify-center font-mono text-foreground w-[1em] h-[1em] overflow-hidden", {
	variants: {
		size: {
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
			xl: "text-xl",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export interface SpinnerProps
	extends Omit<React.ComponentProps<"span">, "children">,
		VariantProps<typeof spinnerVariants> {
	variant?: keyof typeof SPINNER_CHARS;
	speed?: keyof typeof SPEED_DURATION;
	reverse?: boolean;
}

function Spinner({
	className,
	variant = "line",
	size,
	speed = "medium",
	reverse = false,
	...props
}: SpinnerProps) {
	const [frame, setFrame] = React.useState(0);
	const chars = SPINNER_CHARS[variant];
	const duration = SPEED_DURATION[speed];

	React.useEffect(() => {
		const interval = setInterval(() => {
			setFrame((prev) => {
				if (reverse) {
					return prev <= 0 ? chars.length - 1 : prev - 1;
				}
				return (prev + 1) % chars.length;
			});
		}, duration);

		return () => clearInterval(interval);
	}, [chars.length, duration, reverse]);

	return (
		<span
			data-slot="spinner"
			role="status"
			aria-label="Loading"
			className={cn(spinnerVariants({ size }), className)}
			{...props}
		>
			{chars[frame]}
		</span>
	);
}

export { Spinner, spinnerVariants, SPINNER_CHARS };
