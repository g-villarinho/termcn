import { Link, useRouterState } from "@tanstack/react-router";
import { getDocsMeta } from "@/lib/mdx/get-docs";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
	const docs = getDocsMeta();
	const router = useRouterState();
	const currentPath = router.location.pathname;

	return (
		<nav className="w-64 border-r border-border p-4 space-y-2">
			<h2 className="font-mono font-bold text-lg mb-4 border-b border-border pb-2">
				Components
			</h2>

			{docs.map((doc) => {
				const href = `/docs/${doc.slug}`;
				const isActive = currentPath === href;

				return (
					<Link
						key={doc.slug}
						to={href}
						className={cn(
							"block px-3 py-2 rounded font-mono text-sm transition-colors",
							isActive
								? "bg-primary text-primary-foreground font-bold"
								: "hover:bg-muted text-foreground",
						)}
					>
						{doc.frontmatter.title}
					</Link>
				);
			})}
		</nav>
	);
}
