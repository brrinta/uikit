import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from '@uikit/ui/button';
import { Button } from '@uikit/ui/button';
import { Minus, Plus, RotateCcw } from 'lucide-react';

const meta: Meta<typeof ButtonGroup> = {
	title: 'Components/ButtonGroup',
	component: ButtonGroup,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const ButtonGroupPreview: Story = {
	render: (args) => (
		<ButtonGroup {...args}>
			<Button variant="outline">
				<Minus className="size-4" />
			</Button>
			<ButtonGroup.Text>0</ButtonGroup.Text>
			<Button variant="outline">
				<Plus className="size-4" />
			</Button>
		</ButtonGroup>
	),
};

export const ButtonGroupVertical: Story = {
	render: (args) => (
		<ButtonGroup
			{...args}
			orientation="vertical">
			<Button variant="outline">Top</Button>
			<Button variant="outline">Middle</Button>
			<Button variant="outline">Bottom</Button>
		</ButtonGroup>
	),
};

export const ButtonGroupWithSeparator: Story = {
	render: (args) => (
		<ButtonGroup {...args}>
			<Button variant="ghost">
				<RotateCcw className="size-4" />
			</Button>
			<ButtonGroup.Separator />
			<Button variant="ghost">Action</Button>
		</ButtonGroup>
	),
};
