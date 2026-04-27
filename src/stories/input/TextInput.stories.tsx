import type { Meta, StoryObj } from '@storybook/react-vite';
import { fieldVariants } from '@uikit/ui/field';
import { prepareArgTypes } from '@uikit/lib/utils';
import { TextInput } from '@uikit/ui/text-input';
import { DollarSign } from 'lucide-react';

const meta: Meta<typeof TextInput> = {
	title: 'Components/Input/Text',
	component: TextInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(fieldVariants),
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const TextInputPreview: Story = {
	render: (props) => {
		return (
			<TextInput
				{...props}
				className="min-w-120"
				endProps={{ appearance: 'ghost' }}
				end={<DollarSign />}
			/>
		);
	},
	args: {
		label: 'Simple Text Label',
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
