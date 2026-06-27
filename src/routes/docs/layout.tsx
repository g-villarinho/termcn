import { MDXProvider } from "@mdx-js/react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { mdxComponents } from "@/components/docs/mdx-components";
import { Header } from "@/components/docs/header";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarProvider,
} from "registry/ui/sidebar";

export const Route = createFileRoute("/docs")({
	component: DocsLayout,
});

function DocsLayout() {
	const components = [
		{ name: "Button", slug: "button" },
		{ name: "Input", slug: "input" },
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
						<div className="text-xs text-foreground1 font-mono mt-1">registry</div>
					</SidebarHeader>
					<SidebarContent className="py-4">
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
				<SidebarInset className="flex flex-col">
					<Header />
					<main className="flex-1 flex flex-col items-center p-8">
						<div className="w-full max-w-3xl">
							<Outlet />
						</div>
					</main>
				</SidebarInset>
			</SidebarProvider>
		</MDXProvider>
	);
}
