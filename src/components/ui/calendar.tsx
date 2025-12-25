"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { DayPicker, type DayPickerProps } from "react-day-picker"

import { cn } from "@/lib/utils"

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: DayPickerProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn("font-mono text-sm", className)}
			classNames={{
				months: "relative flex flex-col gap-2",
				month: "flex flex-col gap-2",
				month_caption: "flex items-center justify-center h-8",
				caption_label: "text-foreground font-medium",
				nav: "absolute top-0 flex items-center justify-between w-full px-1",
				button_previous: cn(
					"size-7 flex items-center justify-center",
					"text-muted-foreground hover:text-foreground hover:bg-background2"
				),
				button_next: cn(
					"size-7 flex items-center justify-center",
					"text-muted-foreground hover:text-foreground hover:bg-background2"
				),
				month_grid: "border border-border",
				weekdays: "flex border-b border-border bg-background1",
				weekday:
					"w-8 h-6 flex items-center justify-center text-ansi-cyan text-xs font-normal",
				week: "flex",
				day: cn(
					"w-8 h-8 flex items-center justify-center text-center",
					"border-r border-b border-border last:border-r-0",
					"[&:nth-child(7)]:border-r-0"
				),
				day_button: cn(
					"w-full h-full flex items-center justify-center",
					"text-foreground hover:bg-background2 hover:text-foreground",
					"focus:outline-none focus:bg-background2"
				),
				today: "text-ansi-yellow font-bold",
				selected:
					"bg-ansi-blue text-background font-bold hover:bg-ansi-blue hover:text-background",
				outside: "text-foreground2 opacity-50",
				disabled: "text-muted-foreground opacity-30",
				range_start: "bg-ansi-blue text-background",
				range_end: "bg-ansi-blue text-background",
				range_middle: "bg-background2 text-foreground",
				hidden: "invisible",
				...classNames,
			}}
			components={{
				Chevron: ({ orientation }) => {
					if (orientation === "left") {
						return <ChevronLeftIcon className="size-4" />
					}
					return <ChevronRightIcon className="size-4" />
				},
				...props.components,
			}}
			{...props}
		/>
	)
}

export { Calendar }
