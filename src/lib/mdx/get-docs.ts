import type { DocMeta, DocsFrontmatter, LoadedDoc } from "./types";

/**
 * Use Vite's import.meta.glob to load all MDX files at build time
 * This creates a static bundle of all docs
 */
export function getDocsMeta(): DocMeta[] {
	const mdxFiles = import.meta.glob<{
		default: React.ComponentType;
		frontmatter?: DocsFrontmatter;
	}>("/registry/docs/*.mdx", {
		eager: true,
	});

	const docs: DocMeta[] = Object.entries(mdxFiles).map(([filepath, module]) => {
		const slug = filepath.replace("/registry/docs/", "").replace(".mdx", "");

		// Fallback to slug-based title if no frontmatter
		const frontmatter: DocsFrontmatter = module.frontmatter || {
			title: slug.charAt(0).toUpperCase() + slug.slice(1),
			description: "",
			published: true,
		};

		return {
			slug,
			frontmatter,
			filepath,
		};
	});

	// Sort by order, then alphabetically
	return docs
		.filter((doc) => doc.frontmatter.published !== false)
		.sort((a, b) => {
			const orderA = a.frontmatter.order ?? 999;
			const orderB = b.frontmatter.order ?? 999;
			if (orderA !== orderB) return orderA - orderB;
			return a.frontmatter.title.localeCompare(b.frontmatter.title);
		});
}

/**
 * Load a specific doc by slug
 */
export async function getDocBySlug(slug: string): Promise<LoadedDoc | null> {
	try {
		const modules = import.meta.glob<{
			default: React.ComponentType;
			frontmatter: DocsFrontmatter;
		}>("/registry/docs/*.mdx");

		const filepath = `/registry/docs/${slug}.mdx`;
		const loader = modules[filepath];

		if (!loader) return null;

		const module = await loader();

		return {
			slug,
			frontmatter: module.frontmatter,
			Content: module.default,
		};
	} catch (error) {
		console.error(`Error loading doc: ${slug}`, error);
		return null;
	}
}

/**
 * Get all doc slugs (for static generation if needed)
 */
export function getAllDocSlugs(): string[] {
	return getDocsMeta().map((doc) => doc.slug);
}
