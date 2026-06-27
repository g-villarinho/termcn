import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "@/lib/utils";

function Menubar({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
	return (
		<MenubarPrimitive.Root
			data-slot="menubar"
			className={cn(
				"flex items-center border-b border-border bg-background font-mono text-sm text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarMenu({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
	return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />;
}

function MenubarTrigger({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
	return (
		<MenubarPrimitive.Trigger
			data-slot="menubar-trigger"
			className={cn(
				"flex cursor-default select-none items-center px-3 py-1 text-sm text-foreground1 outline-none",
				"data-[state=open]:bg-foreground data-[state=open]:text-background",
				"focus-visible:bg-foreground focus-visible:text-background",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarPortal({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
	return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
}

function MenubarContent({
	className,
	align = "start",
	alignOffset = -4,
	sideOffset = 0,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
	return (
		<MenubarPortal>
			<MenubarPrimitive.Content
				data-slot="menubar-content"
				align={align}
				alignOffset={alignOffset}
				sideOffset={sideOffset}
				className={cn(
					"z-50 min-w-[8rem] overflow-hidden border border-border bg-card font-mono text-foreground",
					"data-[state=open]:animate-[termcn-fade_150ms_ease-out] data-[state=closed]:animate-[termcn-fade-out_150ms_ease-out]",
					className,
				)}
				{...props}
			/>
		</MenubarPortal>
	);
}

function MenubarItem({
	className,
	inset,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
	inset?: boolean;
}) {
	return (
		<MenubarPrimitive.Item
			data-slot="menubar-item"
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

function MenubarCheckboxItem({
	className,
	children,
	checked,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
	return (
		<MenubarPrimitive.CheckboxItem
			data-slot="menubar-checkbox-item"
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
				<MenubarPrimitive.ItemIndicator>✓</MenubarPrimitive.ItemIndicator>
			</span>
			{children}
		</MenubarPrimitive.CheckboxItem>
	);
}

function MenubarRadioGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
	return (
		<MenubarPrimitive.RadioGroup
			data-slot="menubar-radio-group"
			{...props}
		/>
	);
}

function MenubarRadioItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
	return (
		<MenubarPrimitive.RadioItem
			data-slot="menubar-radio-item"
			className={cn(
				"relative flex cursor-default select-none items-center gap-2 py-1 pr-3 pl-8 text-sm text-foreground outline-none",
				"data-[highlighted]:bg-foreground data-[highlighted]:text-background",
				"data-[disabled]:text-foreground2 data-[disabled]:cursor-not-allowed",
				className,
			)}
			{...props}
		>
			<span className="absolute left-3 flex size-3.5 items-center justify-center font-mono text-xs text-primary">
				<MenubarPrimitive.ItemIndicator>●</MenubarPrimitive.ItemIndicator>
			</span>
			{children}
		</MenubarPrimitive.RadioItem>
	);
}

function MenubarLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
	inset?: boolean;
}) {
	return (
		<MenubarPrimitive.Label
			data-slot="menubar-label"
			className={cn(
				"px-3 py-1 text-xs font-medium text-foreground2 uppercase tracking-wider",
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarSeparator({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
	return (
		<MenubarPrimitive.Separator
			data-slot="menubar-separator"
			className={cn("-mx-0 my-1 border-t border-border", className)}
			{...props}
		/>
	);
}

function MenubarShortcut({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="menubar-shortcut"
			className={cn(
				"ml-auto pl-4 text-xs tracking-widest text-foreground2",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarGroup({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
	return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />;
}

function MenubarSub({
	...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
	return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
	inset?: boolean;
}) {
	return (
		<MenubarPrimitive.SubTrigger
			data-slot="menubar-sub-trigger"
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
		</MenubarPrimitive.SubTrigger>
	);
}

function MenubarSubContent({
	className,
	...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
	return (
		<MenubarPrimitive.SubContent
			data-slot="menubar-sub-content"
			className={cn(
				"z-50 min-w-[8rem] overflow-hidden border border-border bg-card font-mono text-foreground",
				"data-[state=open]:animate-[termcn-fade_150ms_ease-out] data-[state=closed]:animate-[termcn-fade-out_150ms_ease-out]",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Menubar,
	MenubarMenu,
	MenubarTrigger,
	MenubarPortal,
	MenubarContent,
	MenubarItem,
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarLabel,
	MenubarSeparator,
	MenubarShortcut,
	MenubarGroup,
	MenubarSub,
	MenubarSubTrigger,
	MenubarSubContent,
};
