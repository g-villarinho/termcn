import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
	children: string;
	className?: string;
	language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
	const [html, setHtml] = useState<string>("");

	// Extract language from className (format: language-tsx)
	const lang = language || className?.replace("language-", "") || "tsx";
	const code = children.trim();

	useEffect(() => {
		codeToHtml(code, {
			lang,
			theme: "github-dark",
		}).then(setHtml);
	}, [code, lang]);

	if (!html) {
		return (
			<pre className="border border-border p-4 overflow-x-auto bg-background">
				<code className="text-sm font-mono">{code}</code>
			</pre>
		);
	}

	return (
		<div
			className="border border-border overflow-x-auto [&_pre]:bg-background! [&_pre]:p-4 [&_pre]:m-0 [&_code]:text-sm [&_code]:font-mono"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for syntax highlighting
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
