import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const SIDEBAR_WIDTH = "18rem";
const SIDEBAR_WIDTH_ICON = "3.5rem";
const MOBILE_BREAKPOINT = 768;

type SidebarContextValue = {
	state: "expanded" | "collapsed";
	open: boolean;
	setOpen: (open: boolean) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
	const context = React.useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider.");
	}

	return context;
}

function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		const mediaQuery = window.matchMedia(
			`(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
		);

		const update = () => setIsMobile(mediaQuery.matches);
		update();

		mediaQuery.addEventListener("change", update);
		return () => mediaQuery.removeEventListener("change", update);
	}, []);

	return isMobile;
}

function SidebarProvider({
	defaultOpen = true,
	open: openProp,
	onOpenChange,
	className,
	style,
	children,
	...props
}: React.ComponentProps<"div"> & {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) {
	const isMobile = useIsMobile();
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
	const [openMobile, setOpenMobile] = React.useState(false);
	const open = openProp ?? uncontrolledOpen;

	const setOpen = React.useCallback(
		(nextOpen: boolean) => {
			onOpenChange?.(nextOpen);
			if (openProp === undefined) {
				setUncontrolledOpen(nextOpen);
			}
		},
		[onOpenChange, openProp],
	);

	const toggleSidebar = React.useCallback(() => {
		if (isMobile) {
			setOpenMobile((current) => !current);
			return;
		}

		setOpen(!open);
	}, [isMobile, open, setOpen]);

	return (
		<SidebarContext.Provider
			value={{
				state: open ? "expanded" : "collapsed",
				open,
				setOpen,
				openMobile,
				setOpenMobile,
				isMobile,
				toggleSidebar,
			}}
		>
			<div
				data-slot="sidebar-wrapper"
				className={cn("flex min-h-svh w-full font-mono", className)}
				style={
					{
						"--sidebar-width": SIDEBAR_WIDTH,
						"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
						...style,
					} as React.CSSProperties
				}
				{...props}
			>
				{children}
			</div>
		</SidebarContext.Provider>
	);
}

function Sidebar({
	side = "left",
	collapsible = "icon",
	className,
	children,
	...props
}: React.ComponentProps<"div"> & {
	side?: "left" | "right";
	collapsible?: "offcanvas" | "icon" | "none";
}) {
	const { isMobile, openMobile, setOpenMobile, state } = useSidebar();

	if (collapsible === "none") {
		return (
			<aside
				data-slot="sidebar"
				className={cn(
					"hidden h-svh w-[var(--sidebar-width)] shrink-0 border-r border-border bg-card text-foreground md:flex md:flex-col",
					side === "right" && "border-r-0 border-l",
					className,
				)}
				{...props}
			>
				{children}
			</aside>
		);
	}

	if (isMobile) {
		return (
			<Sheet open={openMobile} onOpenChange={setOpenMobile}>
				<SheetContent
					data-slot="sidebar"
					side={side}
					className="w-[var(--sidebar-width)] p-0 [&>[data-slot=sheet-close]]:hidden"
				>
					<SheetTitle className="sr-only">Navigation</SheetTitle>
					<div className="flex h-full w-full flex-col bg-card text-foreground">
						{children}
					</div>
				</SheetContent>
			</Sheet>
		);
	}

	const isCollapsed = state === "collapsed";
	const gapClassName =
		collapsible === "offcanvas"
			? "w-0 group-data-[state=expanded]/sidebar:w-[var(--sidebar-width)]"
			: collapsible === "icon"
				? "w-[var(--sidebar-width-icon)] group-data-[state=expanded]/sidebar:w-[var(--sidebar-width)]"
				: "w-[var(--sidebar-width)]";

	const panelClassName =
		collapsible === "offcanvas"
			? cn(
					"w-[var(--sidebar-width)] transition-[transform] duration-150 ease-out",
					isCollapsed &&
						(side === "left" ? "-translate-x-full" : "translate-x-full"),
				)
			: cn(
					"transition-[width] duration-150 ease-out",
					isCollapsed && collapsible === "icon"
						? "w-[var(--sidebar-width-icon)]"
						: "w-[var(--sidebar-width)]",
				);

	return (
		<div
			data-slot="sidebar"
			data-state={state}
			data-collapsible={isCollapsed ? collapsible : "expanded"}
			data-side={side}
			className={cn("group/sidebar peer hidden md:block", className)}
		>
			<div
				data-slot="sidebar-gap"
				className={cn(
					"relative h-svh shrink-0 transition-[width] duration-150 ease-out",
					gapClassName,
				)}
			/>
			<aside
				className={cn(
					"fixed inset-y-0 z-40 hidden border-border bg-card text-foreground md:flex md:flex-col",
					side === "left" ? "left-0 border-r" : "right-0 border-l",
					panelClassName,
					"[&[data-state=collapsed][data-collapsible=icon]_[data-slot=sidebar-group-label]]:hidden",
					"[&[data-state=collapsed][data-collapsible=icon]_[data-slot=sidebar-group-action]]:hidden",
					"[&[data-state=collapsed][data-collapsible=icon]_[data-slot=sidebar-menu-action]]:hidden",
					"[&[data-state=collapsed][data-collapsible=icon]_[data-slot=sidebar-menu-badge]]:hidden",
					"[&[data-state=collapsed][data-collapsible=icon]_[data-slot=sidebar-menu-button]]:justify-center",
					"[&[data-state=collapsed][data-collapsible=icon]_[data-slot=sidebar-menu-button]]:px-0",
				)}
				data-state={state}
				data-collapsible={isCollapsed ? collapsible : "expanded"}
				data-side={side}
				{...props}
			>
				{children}
			</aside>
		</div>
	);
}

function SidebarTrigger({
	className,
	children,
	onClick,
	...props
}: React.ComponentProps<typeof Button>) {
	const { isMobile, state, toggleSidebar } = useSidebar();
	const glyph = isMobile || state === "collapsed" ? "▸" : "▾";

	return (
		<Button
			data-slot="sidebar-trigger"
			variant="ghost"
			size="sm"
			bracket={false}
			className={cn("h-7 min-w-7 px-2 py-0.5 text-xs", className)}
			onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
				onClick?.(event);
				toggleSidebar();
			}}
			{...props}
		>
			{children ?? (
				<>
					<span aria-hidden>{glyph}</span>
					<span className="sr-only">Toggle Sidebar</span>
				</>
			)}
		</Button>
	);
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
	const { toggleSidebar } = useSidebar();

	return (
		<button
			type="button"
			data-slot="sidebar-rail"
			aria-label="Toggle Sidebar"
			onClick={toggleSidebar}
			className={cn(
				"absolute inset-y-0 top-0 hidden w-3 border-border text-foreground2 outline-none focus-visible:bg-foreground focus-visible:text-background md:flex",
				"left-full border-l",
				"group-data-[side=right]/sidebar:left-auto group-data-[side=right]/sidebar:right-full group-data-[side=right]/sidebar:border-l-0 group-data-[side=right]/sidebar:border-r",
				className,
			)}
			{...props}
		>
			<span className="m-auto text-xs" aria-hidden>
				|
			</span>
		</button>
	);
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
	return (
		<main
			data-slot="sidebar-inset"
			className={cn("flex min-h-svh flex-1 flex-col bg-background", className)}
			{...props}
		/>
	);
}

function SidebarInput({
	className,
	...props
}: React.ComponentProps<typeof Input>) {
	return (
		<Input
			data-slot="sidebar-input"
			className={cn("h-8 bg-background2 text-xs", className)}
			{...props}
		/>
	);
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-header"
			className={cn("flex flex-col gap-2 p-3", className)}
			{...props}
		/>
	);
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-footer"
			className={cn("mt-auto flex flex-col gap-2 p-3", className)}
			{...props}
		/>
	);
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			role="separator"
			data-slot="sidebar-separator"
			className={cn("h-px bg-border", className)}
			{...props}
		/>
	);
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-content"
			className={cn(
				"flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto py-3",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"section">) {
	return (
		<section
			data-slot="sidebar-group"
			className={cn("relative flex flex-col gap-2 px-3", className)}
			{...props}
		/>
	);
}

function SidebarGroupLabel({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "div";

	return (
		<Comp
			data-slot="sidebar-group-label"
			className={cn(
				"flex h-7 items-center px-2 font-mono text-xs text-foreground2",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarGroupAction({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="sidebar-group-action"
			className={cn(
				"absolute top-0 right-3 flex size-7 items-center justify-center font-mono text-xs text-foreground2 outline-none focus-visible:bg-foreground focus-visible:text-background",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarGroupContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group-content"
			className={cn("flex flex-col gap-1", className)}
			{...props}
		/>
	);
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu"
			className={cn("flex flex-col gap-1", className)}
			{...props}
		/>
	);
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-item"
			className={cn("group/menu-item relative", className)}
			{...props}
		/>
	);
}

const sidebarMenuButtonVariants = cva(
	"flex w-full items-center gap-2 overflow-hidden px-2 py-1 text-left font-mono text-sm text-foreground1 outline-none focus-visible:bg-foreground focus-visible:text-background data-[active=true]:bg-foreground data-[active=true]:text-background disabled:cursor-not-allowed disabled:text-foreground2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_span:last-child]:truncate",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline: "border-border bg-background2 text-foreground",
			},
			size: {
				default: "h-8",
				sm: "h-7 text-xs",
				lg: "h-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function SidebarMenuButton({
	asChild = false,
	isActive = false,
	variant,
	size,
	className,
	...props
}: React.ComponentProps<"button"> & {
	asChild?: boolean;
	isActive?: boolean;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="sidebar-menu-button"
			data-active={isActive}
			className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

function SidebarMenuAction({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="sidebar-menu-action"
			className={cn(
				"absolute top-1 right-1 flex size-6 items-center justify-center font-mono text-xs text-foreground2 outline-none focus-visible:bg-foreground focus-visible:text-background",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarMenuBadge({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-menu-badge"
			className={cn(
				"pointer-events-none absolute top-1.5 right-2 min-w-5 font-mono text-xs text-foreground2",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
};
