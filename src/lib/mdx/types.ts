export interface DocsFrontmatter {
	title: string;
	description: string;
	order?: number;
	published?: boolean;
}

export interface DocMeta {
	slug: string;
	frontmatter: DocsFrontmatter;
	filepath: string;
}

export interface LoadedDoc {
	slug: string;
	frontmatter: DocsFrontmatter;
	Content: React.ComponentType;
}
