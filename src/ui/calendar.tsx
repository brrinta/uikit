'use client';

import * as React from 'react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { type DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';

import { cn } from '../lib/utils';
import { Button, buttonClassName } from './button';


/** Selected-day colors. One literal line per color so Tailwind can scan them. */
export const calendarColors = {
	primary: '[--cal:var(--color-primary)] [--cal-fg:var(--color-primary-foreground)]',
	brand: '[--cal:var(--color-brand)] [--cal-fg:var(--color-brand-foreground)]',
	success: '[--cal:var(--color-success)] [--cal-fg:var(--color-success-foreground)]',
	warning: '[--cal:var(--color-warning)] [--cal-fg:var(--color-warning-foreground)]',
	info: '[--cal:var(--color-info)] [--cal-fg:var(--color-info-foreground)]',
	destructive: '[--cal:var(--color-destructive)] [--cal-fg:var(--color-destructive-foreground)]',
	mono: '[--cal:var(--color-zinc-950)] [--cal-fg:var(--color-white)] dark:[--cal:var(--color-zinc-300)] dark:[--cal-fg:var(--color-black)]',
	red: '[--cal:var(--color-red-500)] [--cal-fg:var(--color-white)]',
	orange: '[--cal:var(--color-orange-500)] [--cal-fg:var(--color-white)]',
	amber: '[--cal:var(--color-amber-500)] [--cal-fg:var(--color-white)]',
	green: '[--cal:var(--color-green-500)] [--cal-fg:var(--color-white)]',
	emerald: '[--cal:var(--color-emerald-500)] [--cal-fg:var(--color-white)]',
	teal: '[--cal:var(--color-teal-500)] [--cal-fg:var(--color-white)]',
	sky: '[--cal:var(--color-sky-500)] [--cal-fg:var(--color-white)]',
	blue: '[--cal:var(--color-blue-500)] [--cal-fg:var(--color-white)]',
	indigo: '[--cal:var(--color-indigo-500)] [--cal-fg:var(--color-white)]',
	violet: '[--cal:var(--color-violet-500)] [--cal-fg:var(--color-white)]',
	purple: '[--cal:var(--color-purple-500)] [--cal-fg:var(--color-white)]',
	pink: '[--cal:var(--color-pink-500)] [--cal-fg:var(--color-white)]',
	rose: '[--cal:var(--color-rose-500)] [--cal-fg:var(--color-white)]',
} as const;

export type CalendarColor = keyof typeof calendarColors;

function Calendar({
	className,
	classNames,
	showOutsideDays = false,
	captionLayout = 'dropdown',
	buttonVariant = 'ghost',
	color = 'primary',
	formatters,
	components,
	...props
}: React.ComponentProps<typeof DayPicker> & {
	buttonVariant?: React.ComponentProps<typeof Button>['variant'];
	/** Selected-day color; range middle keeps the accent tint. */
	color?: CalendarColor;
}) {
	const defaultClassNames = getDefaultClassNames();

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(
				`bg-background group/calendar p-3 [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent
				in-data-[slot=popover-content]:bg-transparent`,
				calendarColors[color],
				String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
				String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
				className,
			)}
			captionLayout={captionLayout}
			formatters={{
				formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
				...formatters,
			}}
			classNames={{
				root: cn('w-fit', defaultClassNames.root),
				months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
				month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
				nav: cn('flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between', defaultClassNames.nav),
				button_previous: cn(
					buttonClassName({ variant: buttonVariant }),
					'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
					defaultClassNames.button_previous,
				),
				button_next: cn(
					buttonClassName({ variant: buttonVariant }),
					'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
					defaultClassNames.button_next,
				),
				month_caption: cn('flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)', defaultClassNames.month_caption),
				dropdowns: cn('w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5', defaultClassNames.dropdowns),
				dropdown_root: cn(
					'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
					defaultClassNames.dropdown_root,
				),
				dropdown: cn('absolute bg-popover inset-0 opacity-0', defaultClassNames.dropdown),
				caption_label: cn(
					'select-none font-medium',
					captionLayout === 'label'
						? 'text-sm'
						: 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
					defaultClassNames.caption_label,
				),
				weekdays: cn('flex', defaultClassNames.weekdays),
				weekday: cn('text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none', defaultClassNames.weekday),
				week: cn('flex w-full mt-2', defaultClassNames.week),
				week_number_header: cn('select-none w-(--cell-size)', defaultClassNames.week_number_header),
				week_number: cn('text-[0.8rem] select-none text-muted-foreground', defaultClassNames.week_number),
				day: cn(
					'relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
					props.showWeekNumber
						? '[&:nth-child(2)[data-selected=true]_button]:rounded-l-md'
						: '[&:first-child[data-selected=true]_button]:rounded-l-md',
					defaultClassNames.day,
				),
				range_start: cn('rounded-l-md bg-accent', defaultClassNames.range_start),
				range_middle: cn('rounded-none', defaultClassNames.range_middle),
				range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
				today: cn('bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none', defaultClassNames.today),
				outside: cn('text-muted-foreground aria-selected:text-muted-foreground', defaultClassNames.outside),
				disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
				hidden: cn('invisible', defaultClassNames.hidden),
				...classNames,
			}}
			components={{
				Root: ({ className, rootRef, ...props }) => {
					return (
						<div
							data-slot="calendar"
							ref={rootRef}
							className={cn(className)}
							{...props}
						/>
					);
				},
				Chevron: ({ className, orientation, ...props }) => {
					if (orientation === 'left') {
						return (
							<ChevronLeftIcon
								className={cn('size-4', className)}
								{...props}
							/>
						);
					}

					if (orientation === 'right') {
						return (
							<ChevronRightIcon
								className={cn('size-4', className)}
								{...props}
							/>
						);
					}

					return (
						<ChevronDownIcon
							className={cn('size-4', className)}
							{...props}
						/>
					);
				},
				DayButton: CalendarDayButton,
				WeekNumber: ({ children, ...props }) => {
					return (
						<td {...props}>
							<div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div>
						</td>
					);
				},
				...components,
			}}
			{...props}
		/>
	);
}

function CalendarDayButton({ className, day, modifiers, color: _color, ...props }: React.ComponentProps<typeof DayButton>) {
	const defaultClassNames = getDefaultClassNames();

	const ref = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<Button
			ref={ref}
			variant="ghost"
			size="icon"
			data-day={day.date.toLocaleDateString()}
			data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			className={cn(
				`data-[selected-single=true]:bg-(--cal) data-[selected-single=true]:text-(--cal-fg) data-[range-middle=true]:bg-accent
				 data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-(--cal) data-[range-start=true]:text-(--cal-fg)
				 data-[range-end=true]:bg-(--cal) data-[range-end=true]:text-(--cal-fg) group-data-[focused=true]/day:border-ring
				 group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size)
				 flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10
				 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md
				 data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs
				 [&>span]:opacity-70`,
				defaultClassNames.day,
				className,
			)}
			{...props}
		/>
	);
}

export { Calendar, CalendarDayButton };
