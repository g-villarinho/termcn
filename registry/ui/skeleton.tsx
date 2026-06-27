import * as React from "react";
import { cn } from "@/lib/utils";

function Skeleton({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				"animate-pulse border border-border/40 bg-background2",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
