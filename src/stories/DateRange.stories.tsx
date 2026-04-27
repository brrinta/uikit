import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DateRangeInput, DateRangeWithPresetsInput } from '@uikit/ui/date-range';

const meta: Meta<typeof DateRangeInput> = {
	title: 'Components/DateRange',
	component: DateRangeInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateRangeInput>;

export const DateRangePreview: Story = {
	render: function DateRangeStory() {
		const [values, setValues] = useState<unknown[]>([]);
		return (
			<div className="w-80 border p-4 rounded-md">
				<DateRangeInput
					values={values}
					onChange={setValues}
				/>
			</div>
		);
	},
};

export const DateRangeWithPresetsPreview: Story = {
	render: function DateRangeWithPresetsStory() {
		const [values, setValues] = useState<unknown[]>([]);
		return (
			<div className="w-80 border p-4 rounded-md">
				<DateRangeWithPresetsInput
					values={values}
					onChange={setValues}
				/>
			</div>
		);
	},
};
