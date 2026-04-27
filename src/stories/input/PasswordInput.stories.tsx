import type { Meta, StoryObj } from '@storybook/react-vite';
import { fieldVariants } from '@uikit/ui/field';
import { prepareArgTypes } from '@uikit/lib/utils';
import { PasswordInput } from '@uikit/ui/password-input';

const meta: Meta<typeof PasswordInput> = {
	title: 'Components/Input/Password',
	component: PasswordInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(fieldVariants),
};
export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const PasswordInputPreview: Story = {
	render: (props) => {
		return (
			<PasswordInput
				{...props}
				className="min-w-120"
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
		placeholder: 'Enter a password',
	},
};
