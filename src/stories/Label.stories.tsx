import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const meta: Meta<typeof Label> = {
	title: 'UI/Label',
	component: Label,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		required: {
			control: 'boolean',
		},
	},
};
export default meta;

type Story = StoryObj<typeof Label>;

export const LabelPreview: Story = {
	render: Label,
	args: {
		children: 'Email Address',
		size: 'md',
	},
};

export const LabelRequired: Story = {
	render: Label,
	args: {
		children: 'Required Field',
		required: true,
		size: 'md',
	},
};

export const LabelWithInput: Story = {
	render: () => (
		<div className="flex flex-col gap-2 w-64">
			<Label
				htmlFor="email"
				required>
				Email
			</Label>
			<Input
				id="email"
				type="email"
				placeholder="Enter email"
			/>
		</div>
	),
};

export const LabelSizes: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Label size="sm">Small Label</Label>
			<Label size="md">Medium Label</Label>
			<Label size="lg">Large Label</Label>
		</div>
	),
};
