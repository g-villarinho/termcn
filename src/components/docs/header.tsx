import * as React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps extends React.ComponentProps<"header"> {}

function Header({ className, ...props }: HeaderProps) {
	return (
		<header
			className={cn(
				"border-b border-border bg-background px-8 py-4",
				"flex items-center justify-between",
				"w-full shrink-0",
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-2">
				<div className="text-sm text-foreground1 font-mono">docs</div>
			</div>

			<nav className="flex items-center gap-4">
				<a
					href="https://github.com/gbvillarinho/termcn"
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm text-foreground1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					title="GitHub repository"
				>
					<span className="sr-only">GitHub repository</span>
					<svg
						className="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.545 2.914 1.209.1-.943.349-1.546.635-1.903-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							clipRule="evenodd"
						/>
					</svg>
				</a>
			</nav>
		</header>
	);
}

export { Header };
