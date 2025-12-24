import type { ComponentType } from "react";
import { Callout } from "./callout";
import { CodeBlock } from "./code-block";
import { ComponentPreview } from "./component-preview";
import { H1, H2, H3, H4, H5, H6 } from "./heading";
import { PropsTable } from "./props-table";

/**
 * Custom component mappings for MDX
 * Similar to shadcn/ui's mdx-components.tsx
 */
// biome-ignore lint/suspicious/noExplicitAny: MDX components need flexible typing
export const mdxComponents: Record<string, ComponentType<any>> = {
	// Headings with terminal aesthetic
	h1: H1,
	h2: H2,
	h3: H3,
	h4: H4,
	h5: H5,
	h6: H6,

	// Enhanced code blocks with Shiki
	code: ({ className, children, ...props }) => {
		const isInline = !className;

		if (isInline) {
			return (
				<code
					className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono border border-border"
					{...props}
				>
					{children}
				</code>
			);
		}

		return (
			<CodeBlock className={className} {...props}>
				{String(children)}
			</CodeBlock>
		);
	},

	pre: ({ children }) => <>{children}</>, // Let code handle pre

	// Tables with terminal styling
	table: ({ children }) => (
		<div className="overflow-x-auto my-6">
			<table className="w-full border-2 border-border">{children}</table>
		</div>
	),

	thead: ({ children }) => <thead className="bg-muted">{children}</thead>,

	th: ({ children }) => (
		<th className="border-2 border-border px-4 py-2 text-left font-mono text-sm">
			{children}
		</th>
	),

	td: ({ children }) => (
		<td className="border-2 border-border px-4 py-2 font-mono text-sm">
			{children}
		</td>
	),

	tr: ({ children }) => (
		<tr className="border-b border-border">{children}</tr>
	),

	tbody: ({ children }) => (
		<tbody className="bg-background">{children}</tbody>
	),

	// Links
	a: ({ href, children }) => (
		<a
			href={href}
			className="text-primary underline underline-offset-4 hover:text-primary/80"
		>
			{children}
		</a>
	),

	// Lists
	ul: ({ children }) => (
		<ul className="space-y-2 list-none ml-4 my-4">{children}</ul>
	),

	ol: ({ children }) => (
		<ol className="space-y-2 list-decimal ml-8 my-4">{children}</ol>
	),

	li: ({ children }) => (
		<li className="flex items-start gap-2">
			<span className="text-primary">•</span>
			<span>{children}</span>
		</li>
	),

	// Blockquotes
	blockquote: ({ children }) => (
		<blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
			{children}
		</blockquote>
	),

	// Paragraphs
	p: ({ children }) => <p className="leading-relaxed my-4">{children}</p>,

	// Horizontal rule
	hr: () => <hr className="my-8 border-border" />,

	// Strong and emphasis
	strong: ({ children }) => <strong className="font-bold">{children}</strong>,

	em: ({ children }) => <em className="italic">{children}</em>,

	// Custom components (can be used in MDX)
	Callout,
	ComponentPreview,
	PropsTable,
};
