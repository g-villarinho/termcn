import type * as React from "react";
import { Card, CardContent } from "registry/ui/card";
import { cn } from "@/lib/utils";

interface PreviewProps extends React.ComponentProps<"div"> {
	children: React.ReactNode;
}

function Preview({ children, className, ...props }: PreviewProps) {
	return (
		<div className="my-6 mb-8">
			<div className="text-xs text-primary uppercase tracking-widest mb-2 font-mono">
				Live
			</div>
			<Card
				className={cn(
					"flex items-center justify-center p-8 bg-background border-l-2 border-l-primary",
					className,
				)}
				{...props}
			>
				<CardContent className="w-full p-0 text-center">{children}</CardContent>
			</Card>
		</div>
	);
}

export { Preview };
