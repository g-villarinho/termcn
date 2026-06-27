import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"flex min-h-16 w-full px-3 py-2 text-sm font-mono",
				"border border-input bg-background2 text-foreground",
				"placeholder:text-foreground2",
				"outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-foreground",
				"disabled:cursor-not-allowed disabled:text-foreground2 disabled:border-foreground2",
				"aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
				"resize-none field-sizing-content",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
