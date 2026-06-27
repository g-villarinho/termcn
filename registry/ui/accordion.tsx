import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

function Accordion({
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
	return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
	className,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn("border-b border-border", className)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"flex flex-1 items-center gap-2 px-4 py-1.5 text-left font-mono text-sm font-medium text-foreground outline-none select-none",
					"before:text-primary before:content-['▸'] data-[state=open]:before:content-['▾']",
					"focus-visible:bg-foreground focus-visible:text-background focus-visible:before:text-background",
					"disabled:cursor-not-allowed disabled:text-foreground2 disabled:before:text-foreground2",
					className,
				)}
				{...props}
			>
				{children}
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className={cn(
				"ml-4 border-l border-border bg-background1 pl-3 font-mono text-sm text-foreground1",
				className,
			)}
			{...props}
		>
			<div className="py-1.5 pr-4">{children}</div>
		</AccordionPrimitive.Content>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
