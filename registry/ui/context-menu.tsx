import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { cn } from "@/lib/utils";

function ContextMenu({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
	return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
	return (
		<ContextMenuPrimitive.Trigger
			data-slot="context-menu-trigger"
			{...props}
		/>
	);
}

function ContextMenuPortal({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
	return (
		<ContextMenuPrimitive.Portal
			data-slot="context-menu-portal"
			{...props}
		/>
	);
}

function ContextMenuContent({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
	return (
		<ContextMenuPortal>
			<ContextMenuPrimitive.Content
				data-slot="context-menu-content"
				className={cn(
					"z-50 min-w-[8rem] overflow-hidden border border-border bg-card font-mono text-foreground",
					"animate-[termcn-fade_150ms_ease-out]",
					className,
				)}
				{...props}
			/>
		</ContextMenuPortal>
	);
}

function ContextMenuItem({
	className,
	inset,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.Item
			data-slot="context-menu-item"
			className={cn(
				"relative flex cursor-default select-none items-center gap-2 px-3 py-1 text-sm text-foreground outline-none",
				"data-[highlighted]:bg-foreground data-[highlighted]:text-background",
				"data-[disabled]:text-foreground2 data-[disabled]:cursor-not-allowed",
				"[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
}

function ContextMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
	return (
		<ContextMenuPrimitive.CheckboxItem
			data-slot="context-menu-checkbox-item"
			className={cn(
				"relative flex cursor-default select-none items-center gap-2 py-1 pr-3 pl-8 text-sm text-foreground outline-none",
				"data-[highlighted]:bg-foreground data-[highlighted]:text-background",
				"data-[disabled]:text-foreground2 data-[disabled]:cursor-not-allowed",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="absolute left-3 flex size-3.5 items-center justify-center font-mono text-xs text-primary">
				<ContextMenuPrimitive.ItemIndicator>
					✓
				</ContextMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.CheckboxItem>
	);
}

function ContextMenuRadioGroup({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
	return (
		<ContextMenuPrimitive.RadioGroup
			data-slot="context-menu-radio-group"
			{...props}
		/>
	);
}

function ContextMenuRadioItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
	return (
		<ContextMenuPrimitive.RadioItem
			data-slot="context-menu-radio-item"
			className={cn(
				"relative flex cursor-default select-none items-center gap-2 py-1 pr-3 pl-8 text-sm text-foreground outline-none",
				"data-[highlighted]:bg-foreground data-[highlighted]:text-background",
				"data-[disabled]:text-foreground2 data-[disabled]:cursor-not-allowed",
				className,
			)}
			{...props}
		>
			<span className="absolute left-3 flex size-3.5 items-center justify-center font-mono text-xs text-primary">
				<ContextMenuPrimitive.ItemIndicator>
					●
				</ContextMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.RadioItem>
	);
}

function ContextMenuLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.Label
			data-slot="context-menu-label"
			className={cn(
				"px-3 py-1 text-xs font-medium text-foreground2 uppercase tracking-wider",
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
}

function ContextMenuSeparator({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
	return (
		<ContextMenuPrimitive.Separator
			data-slot="context-menu-separator"
			className={cn("-mx-0 my-1 border-t border-border", className)}
			{...props}
		/>
	);
}

function ContextMenuShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="context-menu-shortcut"
			className={cn(
				"ml-auto pl-4 text-xs tracking-widest text-foreground2",
				className,
			)}
			{...props}
		/>
	);
}

function ContextMenuGroup({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
	return (
		<ContextMenuPrimitive.Group
			data-slot="context-menu-group"
			{...props}
		/>
	);
}

function ContextMenuSub({
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
	return (
		<ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
	);
}

function ContextMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.SubTrigger
			data-slot="context-menu-sub-trigger"
			className={cn(
				"flex cursor-default select-none items-center gap-2 px-3 py-1 text-sm text-foreground outline-none",
				"data-[state=open]:bg-foreground data-[state=open]:text-background",
				"data-[highlighted]:bg-foreground data-[highlighted]:text-background",
				inset && "pl-8",
				className,
			)}
			{...props}
		>
			{children}
			<span className="ml-auto font-mono text-xs text-foreground2">▸</span>
		</ContextMenuPrimitive.SubTrigger>
	);
}

function ContextMenuSubContent({
	className,
	...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
	return (
		<ContextMenuPrimitive.SubContent
			data-slot="context-menu-sub-content"
			className={cn(
				"z-50 min-w-[8rem] overflow-hidden border border-border bg-card font-mono text-foreground",
				"animate-[termcn-fade_150ms_ease-out]",
				className,
			)}
			{...props}
		/>
	);
}

export {
	ContextMenu,
	ContextMenuTrigger,
	ContextMenuPortal,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuCheckboxItem,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuGroup,
	ContextMenuSub,
	ContextMenuSubTrigger,
	ContextMenuSubContent,
};
