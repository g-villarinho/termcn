import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DocsSidebar } from "@/components/docs/sidebar";

export const Route = createFileRoute("/docs")({
	component: DocLayout,
});

function DocLayout() {
	return (
		<div className="flex min-h-screen">
			<DocsSidebar />
			<main className="flex-1">
				<Outlet />
			</main>
		</div>
	);
}
