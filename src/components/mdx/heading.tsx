import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeadingProps {
	id?: string;
	children: ReactNode;
	className?: string;
}

function H1({ id, children, className }: HeadingProps) {
	return (
		<h1
			id={id}
			className={cn(
				"text-4xl font-bold font-mono border-b-2 border-primary pb-2 mb-4 scroll-mt-20",
				className,
			)}
		>
			{children}
		</h1>
	);
}

function H2({ id, children, className }: HeadingProps) {
	return (
		<h2
			id={id}
			className={cn(
				"text-2xl font-bold font-mono border-l-4 border-primary pl-4 mt-8 mb-4 scroll-mt-20",
				className,
			)}
		>
			{children}
		</h2>
	);
}

function H3({ id, children, className }: HeadingProps) {
	return (
		<h3
			id={id}
			className={cn(
				"text-xl font-semibold font-mono mt-6 mb-3 scroll-mt-20",
				className,
			)}
		>
			{children}
		</h3>
	);
}

function H4({ id, children, className }: HeadingProps) {
	return (
		<h4
			id={id}
			className={cn(
				"text-lg font-semibold font-mono mt-5 mb-2 scroll-mt-20",
				className,
			)}
		>
			{children}
		</h4>
	);
}

function H5({ id, children, className }: HeadingProps) {
	return (
		<h5
			id={id}
			className={cn(
				"text-base font-semibold font-mono mt-4 mb-2 scroll-mt-20",
				className,
			)}
		>
			{children}
		</h5>
	);
}

function H6({ id, children, className }: HeadingProps) {
	return (
		<h6
			id={id}
			className={cn(
				"text-sm font-semibold font-mono mt-3 mb-2 scroll-mt-20",
				className,
			)}
		>
			{children}
		</h6>
	);
}

export { H1, H2, H3, H4, H5, H6 };
