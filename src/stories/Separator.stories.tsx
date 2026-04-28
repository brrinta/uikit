import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator, SeparatorWithLabel } from '../ui/separator';

const meta: Meta<typeof Separator> = {
	title: 'UI/Separator',
	component: Separator,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical'],
		},
	},
};
export default meta;

type Story = StoryObj<typeof Separator>;

export const SeparatorPreview: Story = {
	render: Separator,
	args: {
		orientation: 'horizontal',
		className: 'w-64',
	},
};

export const SeparatorVertical: Story = {
	render: () => (
		<div className="flex h-12 items-center">
			<span>Left</span>
			<Separator
				orientation="vertical"
				className="mx-4"
			/>
			<span>Right</span>
		</div>
	),
};

export const SeparatorWithLabelStory: Story = {
	name: 'Separator With Label',
	render: () => (
		<div className="w-64">
			<SeparatorWithLabel label="OR" />
		</div>
	),
};

export const SeparatorInContent: Story = {
	render: () => (
		<div className="w-64 space-y-4">
			<div>
				<h4 className="font-medium">Section 1</h4>
				<p className="text-sm text-muted-foreground">Some content here</p>
			</div>
			<Separator />
			<div>
				<h4 className="font-medium">Section 2</h4>
				<p className="text-sm text-muted-foreground">More content here</p>
			</div>
		</div>
	),
};
