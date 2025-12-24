export function ErrorComponent({ message }: { message: string }) {
	return (
		<div className="container mx-auto max-w-4xl py-8 px-4">
			<h1 className="text-4xl font-bold mb-4 font-mono">Doc Not Found</h1>
			<p className="text-muted-foreground">
				The documentation page you're looking for doesn't exist.
			</p>
			<p className="text-sm text-muted-foreground mt-2">Error: {message}</p>
		</div>
	);
}
