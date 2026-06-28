import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"flex min-h-16 w-full px-3 py-2 text-sm font-mono",
				"bg-input text-foreground",
				"placeholder:text-foreground2",
				"outline-none focus-visible:bg-background3 focus-visible:ring-1 focus-visible:ring-ring",
				"disabled:cursor-not-allowed disabled:bg-muted disabled:text-foreground2",
				"aria-invalid:ring-1 aria-invalid:ring-destructive",
				"resize-none field-sizing-content",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
