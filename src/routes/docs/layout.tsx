import { MDXProvider } from "@mdx-js/react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuItem,
	SidebarProvider,
} from "registry/ui/sidebar";
import { Header } from "@/components/docs/header";
import { mdxComponents } from "@/components/docs/mdx-components";

export const Route = createFileRoute("/docs")({
	component: DocsLayout,
});

function DocsLayout() {
	const components = [
		{ name: "Accordion", slug: "accordion" },
		{ name: "Alert", slug: "alert" },
		{ name: "Alert Dialog", slug: "alert-dialog" },
		{ name: "Aspect Ratio", slug: "aspect-ratio" },
		{ name: "Avatar", slug: "avatar" },
		{ name: "Badge", slug: "badge" },
		{ name: "Breadcrumb", slug: "breadcrumb" },
		{ name: "Button", slug: "button" },
		{ name: "Card", slug: "card" },
		{ name: "Collapsible", slug: "collapsible" },
		{ name: "Combobox", slug: "combobox" },
		{ name: "Command", slug: "command" },
		{ name: "Context Menu", slug: "context-menu" },
		{ name: "Dialog", slug: "dialog" },
		{ name: "Drawer", slug: "drawer" },
		{ name: "Dropdown Menu", slug: "dropdown-menu" },
		{ name: "Input", slug: "input" },
		{ name: "Input Group", slug: "input-group" },
		{ name: "Menubar", slug: "menubar" },
		{ name: "Navigation Menu", slug: "navigation-menu" },
		{ name: "Pagination", slug: "pagination" },
		{ name: "Popover", slug: "popover" },
		{ name: "Progress", slug: "progress" },
		{ name: "Resizable", slug: "resizable" },
		{ name: "Scroll Area", slug: "scroll-area" },
		{ name: "Select", slug: "select" },
		{ name: "Separator", slug: "separator" },
		{ name: "Sheet", slug: "sheet" },
		{ name: "Sidebar", slug: "sidebar" },
		{ name: "Skeleton", slug: "skeleton" },
		{ name: "Slider", slug: "slider" },
		{ name: "Sonner", slug: "sonner" },
		{ name: "Switch", slug: "switch" },
		{ name: "Tabs", slug: "tabs" },
		{ name: "Textarea", slug: "textarea" },
		{ name: "Toast", slug: "toast" },
		{ name: "Toggle", slug: "toggle" },
		{ name: "Toggle Group", slug: "toggle-group" },
		{ name: "Tooltip", slug: "tooltip" },
	];

	return (
		<MDXProvider components={mdxComponents}>
			<SidebarProvider defaultOpen={true} className="h-screen">
				<Sidebar collapsible="none">
					<SidebarHeader className="border-b-2 border-primary pb-4">
						<Link
							to="/"
							className="text-lg font-mono font-bold text-primary hover:text-primary focus-visible:outline-none"
						>
							termcn
						</Link>
						<div className="text-xs text-foreground1 font-mono mt-1">
							registry
						</div>
					</SidebarHeader>
					<SidebarContent className="py-4 overflow-y-auto">
						<SidebarGroup>
							<SidebarGroupLabel className="text-xs text-primary uppercase tracking-widest mb-3 px-0">
								▍ Components
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu className="space-y-1">
									{components.map((comp) => (
										<SidebarMenuItem key={comp.slug}>
											<Link
												to="/docs/$slug"
												params={{ slug: comp.slug }}
												className="block px-3 py-2 text-sm text-foreground1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
												activeProps={{
													className:
														"block px-3 py-2 text-sm text-background bg-foreground border-l-2 border-l-background font-bold",
												}}
											>
												{comp.name}
											</Link>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter />
				</Sidebar>
				<SidebarInset className="flex flex-col overflow-hidden">
					<Header className="sticky top-0 z-10" />
					<main className="flex-1 overflow-y-auto flex flex-col items-center p-8">
						<div className="w-full max-w-3xl">
							<Outlet />
						</div>
					</main>
				</SidebarInset>
			</SidebarProvider>
		</MDXProvider>
	);
}
