import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner, spinnerVariants } from '../ui/spinner';
import { prepareArgTypes } from '../lib/utils';

const meta: Meta<typeof Spinner> = {
	title: 'Components/Spinner',
	component: Spinner,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(spinnerVariants),
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const SpinnerPreview: Story = {
	render: Spinner,
	args: {
		size: 'md',
	},
};

export const SpinnerSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Spinner size="xs" />
			<Spinner size="sm" />
			<Spinner size="md" />
			<Spinner size="lg" />
			<Spinner size="xl" />
		</div>
	),
};

export const SpinnerWithText: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Spinner size="md" />
			<span>Loading...</span>
		</div>
	),
};
