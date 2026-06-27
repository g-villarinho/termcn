import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

function Sheet({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot="sheet-overlay"
			className={cn(
				"fixed inset-0 z-50 bg-background/80",
				"data-[state=open]:animate-[termcn-fade_150ms_ease-out] data-[state=closed]:animate-[termcn-fade-out_150ms_ease-out]",
				className,
			)}
			{...props}
		/>
	);
}

const sheetSideClasses = {
	top: "inset-x-0 top-0 border-b data-[state=open]:animate-[termcn-slide-in-from-top_150ms_ease-out] data-[state=closed]:animate-[termcn-slide-out-to-top_150ms_ease-out]",
	right:
		"inset-y-0 right-0 h-full w-full max-w-[min(24rem,100vw)] border-l data-[state=open]:animate-[termcn-slide-in-from-right_150ms_ease-out] data-[state=closed]:animate-[termcn-slide-out-to-right_150ms_ease-out]",
	bottom:
		"inset-x-0 bottom-0 border-t data-[state=open]:animate-[termcn-slide-in-from-bottom_150ms_ease-out] data-[state=closed]:animate-[termcn-slide-out-to-bottom_150ms_ease-out]",
	left: "inset-y-0 left-0 h-full w-full max-w-[min(24rem,100vw)] border-r data-[state=open]:animate-[termcn-slide-in-from-left_150ms_ease-out] data-[state=closed]:animate-[termcn-slide-out-to-left_150ms_ease-out]",
} as const;

function SheetContent({
	className,
	children,
	side = "right",
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	side?: keyof typeof sheetSideClasses;
}) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<DialogPrimitive.Content
				data-slot="sheet-content"
				className={cn(
					"fixed z-50 flex flex-col gap-4 bg-card p-4 font-mono text-foreground outline-none",
					sheetSideClasses[side],
					className,
				)}
				{...props}
			>
				{children}
				<DialogPrimitive.Close
					data-slot="sheet-close"
					className="absolute top-4 right-4 select-none font-mono text-sm text-foreground1 outline-none before:content-['['] after:content-[']'] focus-visible:bg-foreground focus-visible:text-background disabled:cursor-not-allowed disabled:text-foreground2"
				>
					x<span className="sr-only">Close</span>
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("flex flex-col gap-1.5 pr-8", className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn(
				"mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

function SheetTitle({
	className,
	children,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot="sheet-title"
			className={cn(
				"flex items-center gap-2 font-mono text-sm font-medium text-foreground before:text-primary before:content-['▍']",
				className,
			)}
			{...props}
		>
			{children}
		</DialogPrimitive.Title>
	);
}

function SheetDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="sheet-description"
			className={cn("pl-4 font-mono text-sm text-foreground1", className)}
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetPortal,
	SheetOverlay,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
