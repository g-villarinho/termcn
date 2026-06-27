import { MDXProvider } from "@mdx-js/react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { mdxComponents } from "@/components/docs/mdx-components";
import {
	Sidebar,
	SidebarContent,
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
			<SidebarProvider defaultOpen={true}>
				<Sidebar collapsible="none">
					<SidebarHeader>
						<Link to="/" className="text-sm font-bold text-foreground">
							termcn
						</Link>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Components</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{components.map((comp) => (
										<SidebarMenuItem key={comp.slug}>
											<SidebarMenuButton asChild>
												<Link
													to="/docs/$slug"
													params={{ slug: comp.slug }}
													activeProps={{
														className:
															"[&_button]:bg-foreground [&_button]:text-background [&_button]:border-foreground",
													}}
												>
													{comp.name}
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<SidebarInset>
					<main className="p-8 max-w-3xl">
						<Outlet />
					</main>
				</SidebarInset>
			</SidebarProvider>
		</MDXProvider>
	);
}
