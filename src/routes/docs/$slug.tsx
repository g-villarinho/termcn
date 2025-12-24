import { MDXProvider } from "@mdx-js/react";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorComponent } from "@/components/docs/error";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getDocBySlug } from "@/lib/mdx/get-docs";

export const Route = createFileRoute("/docs/$slug")({
	loader: async ({ params }) => {
		const doc = await getDocBySlug(params.slug);

		if (!doc) {
			throw new Error("Doc not found");
		}

		return { doc };
	},
	errorComponent: ({ error }) => {
		return <ErrorComponent message={error.message} />;
	},

	component: DocPage,
});

function DocPage() {
	const { doc } = Route.useLoaderData();

	return (
		<div className="container mx-auto max-w-6xl p-8 space-y-12">
			<MDXProvider components={mdxComponents}>
				<doc.Content />
			</MDXProvider>
		</div>
	);
}
