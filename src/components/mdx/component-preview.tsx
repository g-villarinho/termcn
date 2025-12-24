import type { ReactNode } from "react";

interface ComponentPreviewProps {
	children: ReactNode;
	code?: string;
}

export function ComponentPreview({ children, code }: ComponentPreviewProps) {
	return (
		<div className="my-6 space-y-4">
			<div className="border-2 border-border p-6 bg-card rounded flex items-center justify-center min-h-30">
				{children}
			</div>
			{code && (
				<pre className="bg-muted p-4 rounded border-2 border-border overflow-x-auto">
					<code className="font-mono text-sm">{code}</code>
				</pre>
			)}
		</div>
	);
}
