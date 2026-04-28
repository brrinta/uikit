import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from '../ui/progress';

const meta: Meta<typeof Progress> = {
	title: 'UI/Progress',
	component: Progress,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
		},
	},
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const ProgressPreview: Story = {
	render: Progress,
	args: {
		value: 60,
		className: 'w-64',
	},
};

export const ProgressWithLabel: Story = {
	render: (props) => (
		<Progress
			{...props}
			className="w-64">
			<div className="flex justify-between w-full">
				<span className="text-sm">Loading...</span>
				<span className="text-sm">{props.value}%</span>
			</div>
		</Progress>
	),
	args: {
		value: 45,
	},
};

export const ProgressComplete: Story = {
	render: Progress,
	args: {
		value: 100,
		className: 'w-64',
	},
};

export const ProgressEmpty: Story = {
	render: Progress,
	args: {
		value: 0,
		className: 'w-64',
	},
};

export const Striped: Story = {
	render: Progress,
	args: {
		value: 60,
		className: 'w-64',
		striped: true,
	},
};

export const Animated: Story = {
	render: Progress,
	args: {
		value: 60,
		className: 'w-64',
		striped: true,
		stripeAnimation: true,
	},
};
