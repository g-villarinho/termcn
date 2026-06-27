"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
	"relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden border border-border bg-background2 font-mono text-foreground",
	{
		variants: {
			size: {
				sm: "size-8 text-xs",
				default: "size-10 text-sm",
				lg: "size-12 text-base",
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
	VariantProps<typeof avatarVariants>;

function Avatar({
	className,
	size,
	...props
}: AvatarProps) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			className={cn(avatarVariants({ size }), className)}
			{...props}
		/>
	);
}

function AvatarImage({
	className,
	...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn("aspect-square size-full object-cover", className)}
			{...props}
		/>
	);
}

function AvatarFallback({
	className,
	...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"flex size-full items-center justify-center bg-secondary text-secondary-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export { Avatar, AvatarImage, AvatarFallback };
