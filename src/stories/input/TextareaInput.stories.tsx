import type { Meta, StoryObj } from '@storybook/react-vite';
import { fieldVariants } from '@uikit/ui/field';
import { prepareArgTypes } from '@uikit/lib/utils';
import { TextareaInput } from '@uikit/ui/textarea-input';

const meta: Meta<typeof TextareaInput> = {
	title: 'Components/Input/Textarea',
	component: TextareaInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(fieldVariants),
};
export default meta;

type Story = StoryObj<typeof TextareaInput>;

export const TextareaPreview: Story = {
	render: (props) => {
		return (
			<TextareaInput
				{...props}
				className="min-w-120"
			/>
		);
	},
	args: {
		label: 'Simple Text area',
		orientation: 'vertical',
		size: 'md',
		description: 'Simple Description',
		variant: 'default',
		invalid: false,
		disabled: false,
		required: true,
		excludeLeft: false,
		placeholder: 'Type your text here...',
	},
};
