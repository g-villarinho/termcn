import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
	"relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 border px-3 py-2 font-mono text-sm has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 [&>svg]:size-4 [&>svg]:translate-y-0.5",
	{
		variants: {
			variant: {
				default: "border-border bg-card text-foreground [&>svg]:text-foreground1",
				info: "border-info bg-info/10 text-info [&>svg]:text-info",
				success: "border-success bg-success/10 text-success [&>svg]:text-success",
				warning: "border-warning bg-warning/10 text-warning [&>svg]:text-warning",
				destructive:
					"border-destructive bg-destructive/10 text-destructive [&>svg]:text-destructive",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

interface AlertProps
	extends React.ComponentProps<"div">,
		VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ...props }: AlertProps) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cn("col-start-2 font-medium tracking-tight", className)}
			{...props}
		/>
	);
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				"col-start-2 text-sm text-foreground1 [&_p]:leading-relaxed",
				className,
			)}
			{...props}
		/>
	);
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
