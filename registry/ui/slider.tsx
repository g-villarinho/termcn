import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
	const values = Array.isArray(value)
		? value
		: Array.isArray(defaultValue)
			? defaultValue
			: [min];

	return (
		<SliderPrimitive.Root
			data-slot="slider"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			className={cn(
				"relative flex w-full touch-none select-none items-center font-mono",
				"data-[orientation=vertical]:h-32 data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col",
				"data-[disabled]:cursor-not-allowed data-[disabled]:opacity-100",
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track
				data-slot="slider-track"
				className={cn(
					"relative grow overflow-hidden border border-border bg-background1",
					"data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:w-full",
					"data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3",
				)}
			>
				<SliderPrimitive.Range
					data-slot="slider-range"
					className={cn(
						"absolute bg-primary",
						"data-[orientation=horizontal]:h-full",
						"data-[orientation=vertical]:w-full",
					)}
				/>
			</SliderPrimitive.Track>
			{Array.from({ length: values.length }, (_, index) => (
				<SliderPrimitive.Thumb
					data-slot="slider-thumb"
					key={index}
					className={cn(
						"block size-5 border border-primary bg-background outline-none",
						"focus-visible:border-primary focus-visible:bg-primary focus-visible:ring-1 focus-visible:ring-ring",
						"disabled:pointer-events-none disabled:border-foreground2 disabled:bg-background2",
					)}
				/>
			))}
		</SliderPrimitive.Root>
	);
}

export { Slider };
