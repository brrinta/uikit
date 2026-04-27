import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, fieldVariants } from '@uikit/ui/field';
import { prepareArgTypes } from '@uikit/lib/utils';
import { FormField } from '@uikit/ui/form-field';

const meta: Meta<typeof FormField> = {
	title: 'Components/FormField',
	component: FormField,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(fieldVariants),
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const FieldPreview: Story = {
	render: (props) => {
		return (
			<FormField
				{...props}
				className="min-w-120">
				<Field.Control placeholder={'Type here...'} />
			</FormField>
		);
	},
	args: {
		label: 'Simple Label',
		orientation: 'vertical',
		size: 'md',
		error: 'Simple error',
		description: 'Simple Description',
		variant: 'outlined',
		invalid: false,
		disabled: false,
		required: true,
		excludeLeft: false,
	},
};
