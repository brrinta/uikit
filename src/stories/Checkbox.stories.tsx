import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@uikit/ui/checkbox';

const meta: Meta<typeof Checkbox> = {
	title: 'Components/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const CheckboxPreview: Story = {
	render: (args) => <Checkbox {...args} />,
	args: {
		size: 'md',
	},
};

export const CheckboxWithLabel: Story = {
	render: (args) => <Checkbox {...args} />,
	args: {
		label: 'Accept terms and conditions',
		size: 'md',
	},
};

export const CheckboxSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Checkbox
				size="sm"
				label="Small"
			/>
			<Checkbox
				size="md"
				label="Medium"
			/>
			<Checkbox
				size="lg"
				label="Large"
			/>
		</div>
	),
};

export const CheckboxChecked: Story = {
	render: (args) => <Checkbox {...args} />,
	args: {
		label: 'Checked by default',
		defaultChecked: true,
		size: 'md',
	},
};

export const CheckboxDisabled: Story = {
	render: (args) => <Checkbox {...args} />,
	args: {
		label: 'Disabled checkbox',
		disabled: true,
		size: 'md',
	},
};
