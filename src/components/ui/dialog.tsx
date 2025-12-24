import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Dialog({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				"fixed inset-0 z-50 bg-black/50 backdrop-grayscale",
				"data-[state=open]:animate-in data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
				className
			)}
			{...props}
		/>
	)
}

const dialogContentVariants = cva(
	[
		"fixed z-50 grid gap-4 font-mono overflow-hidden",
		"border-2 border-border bg-background text-foreground",
		"data-[state=open]:animate-in data-[state=closed]:animate-out",
		"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
		"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
		"duration-200 outline-none",
	],
	{
		variants: {
			position: {
				center: "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
				"top-left": "top-4 left-4",
				"top-center": "top-4 left-[50%] translate-x-[-50%]",
				"top-right": "top-4 right-4",
				"center-left": "top-[50%] left-4 translate-y-[-50%]",
				"center-right": "top-[50%] right-4 translate-y-[-50%]",
				"bottom-left": "bottom-4 left-4",
				"bottom-center": "bottom-4 left-[50%] translate-x-[-50%]",
				"bottom-right": "bottom-4 right-4",
			},
			size: {
				sm: "w-full max-w-sm p-4",
				default: "w-full max-w-lg p-6",
				lg: "w-full max-w-2xl p-6",
				xl: "w-full max-w-4xl p-6",
				full: "w-[calc(100%-2rem)] h-[calc(100%-2rem)] max-w-none p-6",
			},
			elevation: {
				flat: "",
				raised: "shadow-[0.5rem_0.5rem_0_0_var(--background2)]",
			},
		},
		defaultVariants: {
			position: "center",
			size: "default",
			elevation: "flat",
		},
	}
)

function DialogContent({
	className,
	children,
	showCloseButton = true,
	position,
	size,
	elevation,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> &
	VariantProps<typeof dialogContentVariants> & {
		showCloseButton?: boolean
	}) {
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					dialogContentVariants({ position, size, elevation }),
					className
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						className={cn(
							"absolute top-3 right-3",
							"inline-flex items-center justify-center",
							"h-6 w-6 border border-border",
							"text-muted-foreground hover:text-foreground hover:bg-muted",
							"transition-colors focus:outline-none",
							"focus-visible:ring-1 focus-visible:ring-ring",
							"disabled:pointer-events-none"
						)}
					>
						<XIcon className="size-4" />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	)
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn(
				"flex flex-col gap-2 border-b border-border pb-4 bg-background1 -mx-6 px-6 -mt-6 pt-6 first:rounded-t-none",
				className
			)}
			{...props}
		/>
	)
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				"border-t border-border pt-4 bg-background1 -mx-6 px-6 -mb-6 pb-6 last:rounded-b-none",
				className
			)}
			{...props}
		/>
	)
}

function DialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn(
				"text-lg font-semibold leading-none tracking-tight text-foreground font-mono",
				className
			)}
			{...props}
		/>
	)
}

function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn("text-sm text-muted-foreground font-mono", className)}
			{...props}
		/>
	)
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
	dialogContentVariants,
}
