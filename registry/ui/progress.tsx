import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

function Progress({
	className,
	value,
	max = 100,
	...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
	const safeMax = max > 0 ? max : 100;
	const safeValue =
		typeof value === "number" ? Math.min(Math.max(value, 0), safeMax) : 0;
	const percentage = (safeValue / safeMax) * 100;

	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			className={cn(
				"relative h-2 w-full overflow-hidden border border-border bg-background1",
				className,
			)}
			value={value}
			max={max}
			{...props}
		>
			<ProgressPrimitive.Indicator
				data-slot="progress-indicator"
				className="h-full bg-primary transition-transform duration-150 ease-out motion-reduce:transition-none"
				style={{ transform: `translateX(-${100 - percentage}%)` }}
			/>
		</ProgressPrimitive.Root>
	);
}

export { Progress };
