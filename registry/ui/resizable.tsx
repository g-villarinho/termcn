import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "@/lib/utils";

function ResizablePanelGroup({
	className,
	...props
}: ResizablePrimitive.GroupProps) {
	return (
		<ResizablePrimitive.Group
			data-slot="resizable-panel-group"
			className={cn(
				"flex h-full w-full font-mono aria-[orientation=vertical]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
	return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
	withHandle,
	className,
	...props
}: ResizablePrimitive.SeparatorProps & {
	withHandle?: boolean;
}) {
	return (
		<ResizablePrimitive.Separator
			data-slot="resizable-handle"
			className={cn(
				"relative flex w-px shrink-0 touch-none select-none items-center justify-center bg-border/70 outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2",
				"focus-visible:bg-foreground1 focus-visible:ring-1 focus-visible:ring-ring",
				"aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:inset-x-0 aria-[orientation=horizontal]:after:top-1/2 aria-[orientation=horizontal]:after:h-4 aria-[orientation=horizontal]:after:w-auto aria-[orientation=horizontal]:after:-translate-y-1/2 aria-[orientation=horizontal]:after:translate-x-0",
				"[&[aria-orientation=horizontal]>span]:rotate-90",
				className,
			)}
			{...props}
		>
			{withHandle ? (
				<span
					aria-hidden
					className="z-10 bg-background px-0.5 font-mono text-[10px] leading-none tracking-[-0.25em] text-foreground2"
				>
					:::
				</span>
			) : null}
		</ResizablePrimitive.Separator>
	);
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
