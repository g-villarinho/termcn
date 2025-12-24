import type { ReactNode } from "react";

interface PropsTableProps {
	children: ReactNode;
}

export function PropsTable({ children }: PropsTableProps) {
	return (
		<div className="overflow-x-auto my-6">
			<table className="w-full border-2 border-border">{children}</table>
		</div>
	);
}
