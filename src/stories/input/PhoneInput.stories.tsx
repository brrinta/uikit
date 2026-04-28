import type { Meta, StoryObj } from '@storybook/react-vite';
import { fieldVariants } from '../../ui/field';
import { prepareArgTypes } from '../../lib/utils';
import { PhoneInput } from '../../ui/phone-input';
import { Phone } from 'lucide-react';

const meta: Meta<typeof PhoneInput> = {
	title: 'UI/Input/Phone',
	component: PhoneInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(fieldVariants),
};
export default meta;

type Story = StoryObj<typeof PhoneInput>;

export const PhoneInputPreview: Story = {
	render: (props) => {
		return (
			<PhoneInput
				{...props}
				className="min-w-120"
				startProps={{ appearance: 'ghost' }}
				start={<Phone />}
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
		placeholder: 'Enter a phone number',
		mask: '+1 (___) ___-____',
	},
};
