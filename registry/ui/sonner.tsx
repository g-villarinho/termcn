import type * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
	return (
		<Sonner
			data-slot="sonner"
			theme="dark"
			className="toaster group font-mono"
			toastOptions={{
				classNames: {
					toast:
						"group toast group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:bg-card group-[.toaster]:font-mono group-[.toaster]:text-foreground group-[.toaster]:rounded-none group-[.toaster]:shadow-none",
					title: "group-[.toast]:font-medium group-[.toast]:text-foreground",
					description: "group-[.toast]:text-foreground1",
					actionButton:
						"group-[.toast]:border group-[.toast]:border-border group-[.toast]:bg-transparent group-[.toast]:text-foreground group-[.toast]:rounded-none",
					cancelButton:
						"group-[.toast]:border group-[.toast]:border-border group-[.toast]:bg-transparent group-[.toast]:text-foreground1 group-[.toast]:rounded-none",
					icon: "group-[.toast]:text-primary",
					success: "group-[.toast]:text-success group-[.toast]:border-success",
					error:
						"group-[.toast]:text-destructive group-[.toast]:border-destructive",
					warning: "group-[.toast]:text-warning group-[.toast]:border-warning",
					info: "group-[.toast]:text-info group-[.toast]:border-info",
				},
			}}
			style={
				{
					"--normal-bg": "var(--card)",
					"--normal-text": "var(--foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "0px",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
}

export { Toaster };
