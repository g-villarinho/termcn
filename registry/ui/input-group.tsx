import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-group"
			role="group"
			className={cn(
				"relative flex items-center",
				"border border-input bg-background2",
				"focus-within:ring-1 focus-within:ring-ring focus-within:border-foreground",
				"[&_[data-slot=input-group-control]:focus-visible]:ring-1 [&_[data-slot=input-group-control]:focus-visible]:ring-ring [&_[data-slot=input-group-control]:focus-visible]:border-foreground",
				className,
			)}
			{...props}
		/>
	);
}

const inputGroupAddonVariants = cva(
	"flex items-center whitespace-nowrap text-foreground1 [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			align: {
				"inline-start": "order-first pl-3",
				"inline-end": "order-last pr-3",
				"block-start": "order-first w-full justify-center border-b border-input py-1 px-3",
				"block-end": "order-last w-full justify-center border-t border-input py-1 px-3",
			},
		},
		defaultVariants: { align: "inline-start" },
	},
);

interface InputGroupAddonProps
	extends React.ComponentProps<"div">,
		VariantProps<typeof inputGroupAddonVariants> {}

function InputGroupAddon({
	className,
	align,
	children,
	...props
}: InputGroupAddonProps) {
	const ref = React.useRef<HTMLDivElement>(null);

	const handleClick = () => {
		const control = ref.current?.closest("[data-slot=input-group]")?.querySelector(
			"[data-slot=input-group-control]",
		) as HTMLInputElement | HTMLTextAreaElement | null;
		control?.focus();
	};

	return (
		<div
			ref={ref}
			data-slot="input-group-addon"
			className={cn(inputGroupAddonVariants({ align }), className)}
			onClick={handleClick}
			{...props}
		>
			{children}
		</div>
	);
}

const inputGroupButtonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap select-none font-mono outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:text-foreground2 disabled:border-foreground2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			size: {
				xs: "px-2 py-0.5 text-xs",
				"icon-xs": "size-5",
				sm: "px-2 py-1 text-sm",
				"icon-sm": "size-6",
			},
			variant: {
				default:
					"border border-border bg-background text-foreground focus-visible:bg-foreground focus-visible:text-background focus-visible:border-foreground",
				ghost:
					"border border-transparent text-foreground1 focus-visible:bg-foreground focus-visible:text-background",
			},
		},
		defaultVariants: { size: "xs", variant: "ghost" },
	},
);

interface InputGroupButtonProps
	extends React.ComponentProps<"button">,
		VariantProps<typeof inputGroupButtonVariants> {}

function InputGroupButton({
	className,
	size,
	variant,
	...props
}: InputGroupButtonProps) {
	return (
		<button
			data-slot="input-group-button"
			className={cn(
				inputGroupButtonVariants({ size, variant }),
				className,
			)}
			{...props}
		/>
	);
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="input-group-text"
			className={cn("text-sm text-foreground1", className)}
			{...props}
		/>
	);
}

function InputGroupInput({
	className,
	...props
}: React.ComponentProps<"input">) {
	return (
		<input
			data-slot="input-group-control"
			className={cn(
				"flex h-9 min-w-0 flex-1 bg-transparent text-sm font-mono text-foreground",
				"placeholder:text-foreground2",
				"outline-none focus-visible:ring-0 border-0",
				"disabled:cursor-not-allowed disabled:text-foreground2",
				"aria-invalid:text-destructive",
				"px-2",
				className,
			)}
			{...props}
		/>
	);
}

function InputGroupTextarea({
	className,
	...props
}: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="input-group-control"
			className={cn(
				"min-h-16 w-full flex-1 bg-transparent text-sm font-mono text-foreground",
				"placeholder:text-foreground2",
				"outline-none focus-visible:ring-0 border-0",
				"disabled:cursor-not-allowed disabled:text-foreground2",
				"aria-invalid:text-destructive",
				"resize-none field-sizing-content px-2 py-1",
				className,
			)}
			{...props}
		/>
	);
}

export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupText,
	InputGroupInput,
	InputGroupTextarea,
	inputGroupAddonVariants,
	inputGroupButtonVariants,
};
