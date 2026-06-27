import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";

function AspectRatio({
	className,
	...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
	return (
		<AspectRatioPrimitive.Root
			data-slot="aspect-ratio"
			className={cn("overflow-hidden border border-border bg-background1", className)}
			{...props}
		/>
	);
}

export { AspectRatio };
