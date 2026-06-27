import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ComboboxOption {
	value: string;
	label: string;
	disabled?: boolean;
}

interface ComboboxProps {
	options: ComboboxOption[];
	value?: string;
	onValueChange?: (value: string) => void;
	placeholder?: string;
	searchPlaceholder?: string;
	emptyText?: string;
	className?: string;
	disabled?: boolean;
}

/**
 * fzf-style combobox: a searchable picker built on Popover + Command.
 * The Popover provides the floating container; Command provides the
 * keyboard-navigable, fuzzy-filtered list with selection inversion.
 */
function Combobox({
	options,
	value,
	onValueChange,
	placeholder = "select option...",
	searchPlaceholder = "search...",
	emptyText = "-- no results --",
	className,
	disabled,
}: ComboboxProps) {
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
					aria-expanded={open}
					className={cn("w-64 justify-between gap-2", className)}
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
			<PopoverContent
				align="start"
				className="w-64 p-0"
			>
				<Command>
					<CommandInput placeholder={searchPlaceholder} />
					<CommandList>
						<CommandEmpty>{emptyText}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = option.value === value;
								return (
									<CommandItem
										key={option.value}
										value={option.label}
										disabled={option.disabled}
										onSelect={() => {
											onValueChange?.(
												option.value === value
													? ""
													: option.value,
											);
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

export { Combobox };
export type { ComboboxOption, ComboboxProps };
