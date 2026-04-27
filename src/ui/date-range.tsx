import { useEffect, useMemo, useState } from 'react';
import { Button } from '@uikit/ui/button';
import { Calendar } from '@uikit/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@uikit/ui/popover';
import { ScrollArea } from '@uikit/ui/scroll-area';
import { endOfMonth, endOfYear, format, isEqual, startOfDay, startOfMonth, startOfYear, subDays, subMonths, subYears } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@uikit/lib/utils';

type CustomRendererProps = {
	values: unknown[];
	className?: string;
	onChange: (values: unknown[]) => void;
};
function DateRangeInput({ values, onChange, className }: CustomRendererProps) {
	const [date, setDate] = useState<DateRange | undefined>(
		values?.[0] && typeof values[0] === 'string'
			? {
					from: new Date(values[0] as string),
					to: values[1] && typeof values[1] === 'string' ? new Date(values[1] as string) : undefined,
				}
			: undefined,
	);
	const [isOpen, setIsOpen] = useState(false);
	const handleApply = () => {
		if (date?.from) {
			const fromStr = date.from.toISOString().split('T')[0];
			const toStr = date.to ? date.to.toISOString().split('T')[0] : fromStr;
			onChange([fromStr, toStr]);
		}
		setIsOpen(false);
	};
	const handleClear = () => {
		setDate({
			from: undefined,
			to: undefined,
		});
		onChange([]);
	};
	const handleCancel = () => {
		setIsOpen(false);
	};
	const handleSelect = (selected: DateRange | undefined) => {
		setDate(selected);
	};
	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}>
			<PopoverTrigger className={cn('cursor-pointer', className)}>
				{date?.from ? (
					date.to ? (
						<>
							{format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
						</>
					) : (
						format(date.from, 'LLL dd, y')
					)
				) : (
					<span>Pick a date range</span>
				)}
			</PopoverTrigger>
			<PopoverContent
				className="w-auto p-0"
				align="start"
				sideOffset={8}>
				<Calendar
					autoFocus
					mode="range"
					defaultMonth={date?.from}
					showOutsideDays={false}
					selected={date}
					onSelect={handleSelect}
					numberOfMonths={2}
				/>
				<div className="flex items-center justify-between gap-1.5 border-t border-border p-3">
					<Button
						size={'sm'}
						onClick={handleClear}
						appearance={'ghost'}
						variant={'destructive'}>
						Clear
					</Button>
					<div className={'flex gap-1.5 items-center'}>
						<Button
							size={'sm'}
							variant="outline"
							onClick={handleCancel}>
							Cancel
						</Button>
						<Button
							size={'sm'}
							onClick={handleApply}>
							Apply
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

function DateRangeWithPresetsInput({ values, onChange, className }: CustomRendererProps) {
	const today = useMemo(() => new Date(), []);
	const presets = useMemo(
		() => [
			{ label: 'Today', range: { from: today, to: today } },
			{ label: 'Yesterday', range: { from: subDays(today, 1), to: subDays(today, 1) } },
			{ label: 'Last 7 days', range: { from: subDays(today, 6), to: today } },
			{ label: 'Last 30 days', range: { from: subDays(today, 29), to: today } },
			{ label: 'Month to date', range: { from: startOfMonth(today), to: today } },
			{ label: 'Last month', range: { from: startOfMonth(subMonths(today, 1)), to: endOfMonth(subMonths(today, 1)) } },
			{ label: 'Year to date', range: { from: startOfYear(today), to: today } },
			{ label: 'Last year', range: { from: startOfYear(subYears(today, 1)), to: endOfYear(subYears(today, 1)) } },
		],
		[today],
	);
	const [month, setMonth] = useState(today);
	const [date, setDate] = useState<DateRange | undefined>(
		values?.[0] && typeof values[0] === 'string'
			? {
					from: new Date(values[0] as string),
					to: values[1] && typeof values[1] === 'string' ? new Date(values[1] as string) : undefined,
				}
			: undefined,
	);
	const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		const matchedPreset = presets.find(
			(preset) =>
				isEqual(startOfDay(preset.range.from), startOfDay(date?.from || new Date(0))) &&
				isEqual(startOfDay(preset.range.to), startOfDay(date?.to || new Date(0))),
		);
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setSelectedPreset(matchedPreset?.label || null);
	}, [date, presets]);
	const handleApply = () => {
		if (date?.from) {
			const fromStr = date.from.toISOString().split('T')[0];
			const toStr = date.to ? date.to.toISOString().split('T')[0] : fromStr;
			onChange([fromStr, toStr]);
		}
		setIsOpen(false);
	};
	const handleClear = () => {
		setDate({
			from: undefined,
			to: undefined,
		});
		onChange([]);
	};

	const handleCancel = () => {
		setIsOpen(false);
	};
	const handleSelect = (selected: DateRange | undefined) => {
		setDate({
			from: selected?.from || undefined,
			to: selected?.to || undefined,
		});
		setSelectedPreset(null);
	};
	const handlePresetSelect = (preset: (typeof presets)[0]) => {
		setDate(preset.range);
		setMonth(preset.range.from || today);
		setSelectedPreset(preset.label);
		if (preset.range?.from) {
			const fromStr = preset.range.from.toISOString().split('T')[0];
			const toStr = preset.range.to ? preset.range.to.toISOString().split('T')[0] : fromStr;
			onChange([fromStr, toStr]);
		}
		setIsOpen(false);
	};
	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}>
			<PopoverTrigger className={cn('cursor-pointer w-fit px-2 h-full', className)}>
				{date?.from ? (
					date.to ? (
						<>
							{format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
						</>
					) : (
						format(date.from, 'LLL dd, y')
					)
				) : (
					<span>Pick a date range</span>
				)}
			</PopoverTrigger>
			<PopoverContent
				className="w-auto p-0 gap-0"
				align="center"
				sideOffset={8}>
				<div className="flex max-sm:flex-col">
					<div className="relative border-border max-sm:order-1 max-sm:border-t sm:min-w-32">
						<div className="h-full border-border sm:border-e py-2">
							<div className="flex flex-col px-2 gap-0.5">
								{presets.map((preset, index) => (
									<Button
										key={index}
										type="button"
										variant="ghost"
										className={cn('h-8 w-full justify-start px-2', selectedPreset === preset.label && 'bg-accent')}
										onClick={() => handlePresetSelect(preset)}>
										{preset.label}
									</Button>
								))}
							</div>
						</div>
					</div>
					<Calendar
						autoFocus
						mode="range"
						month={month}
						onMonthChange={setMonth}
						showOutsideDays={false}
						selected={date}
						onSelect={handleSelect}
						numberOfMonths={2}
					/>
				</div>
				<div className="flex items-center justify-between gap-1.5 border-t border-border p-3">
					<Button
						size={'sm'}
						onClick={handleClear}
						appearance={'ghost'}
						variant={'destructive'}>
						Clear
					</Button>
					<div className={'flex gap-1.5 items-center'}>
						<Button
							size={'sm'}
							variant="outline"
							onClick={handleCancel}>
							Cancel
						</Button>
						<Button
							size={'sm'}
							onClick={handleApply}>
							Apply
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

function DateTimeInput({ values, onChange, className }: CustomRendererProps) {
	const today = new Date();
	const [date, setDate] = useState<Date | undefined>(values?.[0] && typeof values[0] === 'string' ? new Date(values[0] as string) : undefined);
	const [time, setTime] = useState<string | undefined>(
		values?.[0] && typeof values[0] === 'string' ? new Date(values[0] as string).toTimeString().slice(0, 5) : '10:00',
	);
	const [isOpen, setIsOpen] = useState(false);
	const timeSlots = [
		{ time: '09:00', available: false },
		{ time: '09:30', available: false },
		{ time: '10:00', available: true },
		{ time: '10:30', available: true },
		{ time: '11:00', available: true },
		{ time: '11:30', available: true },
		{ time: '12:00', available: false },
		{ time: '12:30', available: true },
		{ time: '13:00', available: true },
		{ time: '13:30', available: true },
		{ time: '14:00', available: true },
		{ time: '14:30', available: false },
		{ time: '15:00', available: false },
		{ time: '15:30', available: true },
		{ time: '16:00', available: true },
		{ time: '16:30', available: true },
		{ time: '17:00', available: true },
		{ time: '17:30', available: true },
		{ time: '18:00', available: true },
		{ time: '18:30', available: true },
		{ time: '19:00', available: true },
		{ time: '19:30', available: true },
		{ time: '20:00', available: true },
		{ time: '20:30', available: true },
		{ time: '21:00', available: true },
		{ time: '21:30', available: true },
		{ time: '22:00', available: true },
		{ time: '22:30', available: true },
		{ time: '23:00', available: true },
		{ time: '23:30', available: true },
	];
	const handleApply = () => {
		if (date && time) {
			const dateTime = new Date(date);
			const [hours, minutes] = time.split(':').map(Number);
			dateTime.setHours(hours, minutes, 0, 0);
			onChange([dateTime.toISOString()]);
		}
		setIsOpen(false);
	};
	const handleClear = () => {
		setDate(undefined);
		onChange([]);
	};
	const handleCancel = () => {
		setIsOpen(false);
	};
	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}>
			<PopoverTrigger className={cn('cursor-pointer', className)}>
				{date ? format(date, 'PPP') + (time ? ` - ${time}` : '') : <span>Pick a date and time</span>}
			</PopoverTrigger>
			<PopoverContent
				className="w-auto p-0"
				align="start">
				<div className="flex max-sm:flex-col">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(newDate) => {
							if (newDate) {
								setDate(newDate);
								setTime(undefined);
							}
						}}
						className="p-2 sm:pe-5"
						disabled={[{ before: today }]}
					/>
					<div className="relative w-full max-sm:h-48 sm:w-40">
						<div className="absolute inset-0 py-4 max-sm:border-t">
							<ScrollArea className="h-full sm:border-s">
								<div className="space-y-3">
									<div className="flex h-5 shrink-0 items-center px-5">
										<p className="text-sm font-medium">{date ? format(date, 'EEEE, d') : 'Pick a date'}</p>
									</div>
									<div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
										{timeSlots.map(({ time: timeSlot, available }) => (
											<Button
												key={timeSlot}
												variant={time === timeSlot ? 'primary' : 'outline'}
												size="sm"
												className="w-full"
												onClick={() => setTime(timeSlot)}
												disabled={!available}>
												{timeSlot}
											</Button>
										))}
									</div>
								</div>
							</ScrollArea>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between gap-1.5 border-t border-border p-3">
					<Button
						size={'sm'}
						onClick={handleClear}
						appearance={'ghost'}
						variant={'destructive'}>
						Clear
					</Button>
					<div className={'flex gap-1.5 items-center'}>
						<Button
							size={'sm'}
							variant="outline"
							onClick={handleCancel}>
							Cancel
						</Button>
						<Button
							size={'sm'}
							onClick={handleApply}>
							Apply
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

export { DateRangeInput, DateRangeWithPresetsInput, DateTimeInput };
