import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function AlertDialog({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return (
		<DialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
	);
}

function AlertDialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot="alert-dialog-overlay"
			className={cn(
				"fixed inset-0 z-50 bg-background0/80 transition-opacity duration-150 ease-out data-[state=closed]:opacity-0",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<DialogPrimitive.Content
				data-slot="alert-dialog-content"
				role="alertdialog"
				onPointerDownOutside={(e) => e.preventDefault()}
				className={cn(
					"fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-border bg-card p-4 font-mono text-foreground outline-none transition-opacity duration-150 ease-out data-[state=closed]:opacity-0",
					className,
				)}
				{...props}
			>
				{children}
			</DialogPrimitive.Content>
		</AlertDialogPortal>
	);
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-header"
			className={cn("flex flex-col gap-1 text-left", className)}
			{...props}
		/>
	);
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-footer"
			className={cn(
				"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot="alert-dialog-title"
			className={cn("font-medium tracking-tight text-foreground", className)}
			{...props}
		/>
	);
}

function AlertDialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="alert-dialog-description"
			className={cn("text-sm text-foreground1", className)}
			{...props}
		/>
	);
}

function AlertDialogAction({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return (
		<DialogPrimitive.Close
			data-slot="alert-dialog-action"
			className={cn(buttonVariants({ variant: "primary" }), className)}
			{...props}
		/>
	);
}

function AlertDialogCancel({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return (
		<DialogPrimitive.Close
			data-slot="alert-dialog-cancel"
			className={cn(buttonVariants({ variant: "ghost" }), className)}
			{...props}
		/>
	);
}

export {
	AlertDialog,
	AlertDialogPortal,
	AlertDialogOverlay,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
};
