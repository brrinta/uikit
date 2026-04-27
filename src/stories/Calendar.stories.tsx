import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from '../ui/calendar';
import { useState } from 'react';

const meta: Meta<typeof Calendar> = {
	title: 'Components/Calendar',
	component: Calendar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		captionLayout: {
			control: 'select',
			options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
		},
	},
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const CalendarPreview: Story = {
	render: function CalendarStory() {
		const [date, setDate] = useState<Date | undefined>(new Date());
		return (
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				className="rounded-md border"
			/>
		);
	},
};

export const CalendarRange: Story = {
	render: function CalendarRangeStory() {
		const [range, setRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
			from: undefined,
			to: undefined,
		});
		return (
			<Calendar
				mode="range"
				selected={range}
				onSelect={setRange as any}
				numberOfMonths={2}
				className="rounded-md border"
			/>
		);
	},
};

export const CalendarWithDropdown: Story = {
	render: function CalendarDropdownStory() {
		const [date, setDate] = useState<Date | undefined>(new Date());
		return (
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				captionLayout="dropdown"
				className="rounded-md border"
			/>
		);
	},
};

export const CalendarMultiple: Story = {
	render: function CalendarMultipleStory() {
		const [dates, setDates] = useState<Date[] | undefined>([]);
		return (
			<Calendar
				mode="multiple"
				selected={dates}
				onSelect={setDates}
				className="rounded-md border"
			/>
		);
	},
};
