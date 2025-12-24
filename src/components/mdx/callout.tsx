import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CalloutProps {
	type?: "info" | "warning" | "success" | "error";
	children: ReactNode;
	title?: string;
}

export function Callout({ type = "info", children, title }: CalloutProps) {
	const styles = {
		info: "bg-primary/10 border-primary text-foreground",
		warning: "bg-yellow-500/10 border-yellow-500 text-foreground",
		success: "bg-green-500/10 border-green-500 text-foreground",
		error: "bg-red-500/10 border-red-500 text-foreground",
	};

	return (
		<div className={cn("border-2 p-4 rounded space-y-2 my-4", styles[type])}>
			{title && <h4 className="font-semibold font-mono">{title}</h4>}
			<div className="text-sm">{children}</div>
		</div>
	);
}
