import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

interface SelectProps {
	options: SelectOption[];
	value?: string;
	onValueChange?: (value: string) => void;
	placeholder?: string;
	emptyText?: string;
	className?: string;
	disabled?: boolean;
}

/**
 * Menu-picker select (tmux choose-tree / ranger style) built on Popover +
 * Command. It reuses the same floating container as Combobox but omits the
 * search input — selection is by arrow keys with Vim-style inversion.
 */
function Select({
	options,
	value,
	onValueChange,
	placeholder = "select...",
	emptyText = "-- empty --",
	className,
	disabled,
}: SelectProps) {
	const [open, setOpen] = React.useState(false);
	const selected = options.find((option) => option.value === value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="default"
					bracket={false}
					disabled={disabled}
					role="combobox"
					aria-expanded={open}
					className={cn("w-56 justify-between gap-2", className)}
				>
					<span
						className={cn(
							"truncate",
							!selected && "text-foreground2",
						)}
					>
						{selected ? selected.label : placeholder}
					</span>
					<span aria-hidden className="select-none text-foreground2">
						▾
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-56 p-0">
				<Command>
					<CommandList>
						<CommandEmpty>{emptyText}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = option.value === value;
								return (
									<CommandItem
										key={option.value}
										value={option.value}
										disabled={option.disabled}
										onSelect={(current: string) => {
											onValueChange?.(current);
											setOpen(false);
										}}
									>
										<span
											aria-hidden
											className={cn(
												"w-4 select-none text-primary",
												!isSelected && "opacity-0",
											)}
										>
											✓
										</span>
										<span className="truncate">
											{option.label}
										</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export { Select };
export type { SelectOption, SelectProps };
