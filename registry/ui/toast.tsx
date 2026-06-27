import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitive.Provider;

function ToastViewport({
	className,
	...props
}: React.ComponentProps<typeof ToastPrimitive.Viewport>) {
	return (
		<ToastPrimitive.Viewport
			data-slot="toast-viewport"
			className={cn(
				"fixed bottom-0 right-0 z-50 flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-sm",
				className,
			)}
			{...props}
		/>
	);
}

const toastVariants = cva(
	"group relative flex w-full items-start gap-2 border bg-card px-3 py-2 font-mono text-sm data-[state=open]:animate-[termcn-fade_150ms_ease-out] data-[state=closed]:animate-[termcn-fade-out_150ms_ease-out]",
	{
		variants: {
			variant: {
				default: "border-border text-foreground before:text-foreground1",
				info: "border-info text-info before:text-info",
				success: "border-success text-success before:text-success",
				warning: "border-warning text-warning before:text-warning",
				destructive:
					"border-destructive text-destructive before:text-destructive",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

function Toast({
	className,
	variant,
	...props
}: React.ComponentProps<typeof ToastPrimitive.Root> &
	VariantProps<typeof toastVariants>) {
	return (
		<ToastPrimitive.Root
			data-slot="toast"
			className={cn(toastVariants({ variant }), className)}
			{...props}
		/>
	);
}

function ToastTitle({
	className,
	...props
}: React.ComponentProps<typeof ToastPrimitive.Title>) {
	return (
		<ToastPrimitive.Title
			data-slot="toast-title"
			className={cn(
				"font-medium before:text-primary before:content-['▍']",
				className,
			)}
			{...props}
		/>
	);
}

function ToastDescription({
	className,
	...props
}: React.ComponentProps<typeof ToastPrimitive.Description>) {
	return (
		<ToastPrimitive.Description
			data-slot="toast-description"
			className={cn("pl-4 text-foreground1", className)}
			{...props}
		/>
	);
}

function ToastAction({
	className,
	...props
}: React.ComponentProps<typeof ToastPrimitive.Action>) {
	return (
		<ToastPrimitive.Action
			data-slot="toast-action"
			className={cn(
				"ml-auto shrink-0 select-none border border-border px-2 py-0.5 text-xs text-foreground1 outline-none focus-visible:bg-foreground focus-visible:text-background",
				className,
			)}
			{...props}
		/>
	);
}

function ToastClose({
	className,
	...props
}: React.ComponentProps<typeof ToastPrimitive.Close>) {
	return (
		<ToastPrimitive.Close
			data-slot="toast-close"
			className={cn(
				"absolute top-2 right-2 select-none text-xs text-foreground1 outline-none before:content-['['] after:content-[']'] focus-visible:bg-foreground focus-visible:text-background",
				className,
			)}
			toast-close=""
			{...props}
		>
			x<span className="sr-only">Close</span>
		</ToastPrimitive.Close>
	);
}

export {
	ToastProvider,
	ToastViewport,
	Toast,
	ToastTitle,
	ToastDescription,
	ToastAction,
	ToastClose,
	toastVariants,
};
