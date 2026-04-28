import type { Meta, StoryObj } from '@storybook/react-vite';
import { fieldVariants } from '../../ui/field';
import { prepareArgTypes } from '../../lib/utils';
import { NumberInput } from '../../ui/number-input';
import { DollarSign } from 'lucide-react';

const meta: Meta<typeof NumberInput> = {
	title: 'UI/Input/Number',
	component: NumberInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(fieldVariants),
};
export default meta;

type Story = StoryObj<typeof NumberInput>;

export const NumberInputPreview: Story = {
	render: (props) => {
		return (
			<NumberInput
				{...props}
				className="min-w-120"
				startProps={{ appearance: 'ghost' }}
				start={<DollarSign />}
			/>
		);
	},
	args: {
		label: 'Simple Number Label',
		orientation: 'vertical',
		size: 'md',
		description: 'Simple Description',
		variant: 'default',
		invalid: false,
		disabled: false,
		required: true,
		excludeLeft: false,
		placeholder: 'Enter a number',
	},
};
