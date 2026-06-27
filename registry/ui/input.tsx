import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"flex h-9 w-full min-w-0 px-3 py-1 text-sm font-mono",
				"border border-input bg-background2 text-foreground",
				"placeholder:text-foreground2",
				"outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-foreground",
				"disabled:cursor-not-allowed disabled:text-foreground2 disabled:border-foreground2",
				"aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
				"file:border-0 file:bg-transparent file:text-sm file:font-mono file:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
