import type { Meta, StoryObj } from '@storybook/react-vite';
import { fieldVariants } from '../../ui/field';
import { prepareArgTypes } from '../../lib/utils';
import { DateInput } from '../../ui/date-input';

const meta: Meta<typeof DateInput> = {
	title: 'UI/Input/Date',
	component: DateInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(fieldVariants),
};
export default meta;

type Story = StoryObj<typeof DateInput>;

export const DateInputPreview: Story = {
	render: (props) => {
		return (
			<DateInput
				{...props}
				className="min-w-120"
			/>
		);
	},
	args: {
		label: 'Simple Label',
		orientation: 'vertical',
		size: 'md',
		description: 'Simple Description',
		variant: 'default',
		invalid: false,
		disabled: false,
		required: true,
		excludeLeft: false,
		placeholder: 'Enter a text',
	},
};
