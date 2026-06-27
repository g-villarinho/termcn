import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

function ScrollArea({
	className,
	children,
	...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
	return (
		<ScrollAreaPrimitive.Root
			data-slot="scroll-area"
			className={cn("relative overflow-hidden font-mono", className)}
			{...props}
		>
			<ScrollAreaPrimitive.Viewport
				data-slot="scroll-area-viewport"
				className="size-full outline-none focus-visible:ring-1 focus-visible:ring-ring"
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner
				data-slot="scroll-area-corner"
				className="bg-background1"
			/>
		</ScrollAreaPrimitive.Root>
	);
}

function ScrollBar({
	className,
	orientation = "vertical",
	...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
	return (
		<ScrollAreaPrimitive.ScrollAreaScrollbar
			data-slot="scroll-area-scrollbar"
			orientation={orientation}
			className={cn(
				"flex touch-none select-none bg-background1 p-px",
				orientation === "vertical"
					? "h-full w-2.5 border-l border-border/60"
					: "h-2.5 flex-col border-t border-border/60",
				className,
			)}
			{...props}
		>
			<ScrollAreaPrimitive.ScrollAreaThumb
				data-slot="scroll-area-thumb"
				className="relative flex-1 bg-border/80 before:absolute before:inset-0 before:border before:border-border/80"
			/>
		</ScrollAreaPrimitive.ScrollAreaScrollbar>
	);
}

export { ScrollArea, ScrollBar };
