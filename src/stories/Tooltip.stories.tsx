import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from '../ui/tooltip';
import { Button } from '../ui/button';

const meta: Meta<typeof Tooltip> = {
	title: 'UI/Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		TooltipTrigger: Tooltip.Trigger,
		TooltipContent: Tooltip.Content,
		TooltipProvider: Tooltip.Provider,
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const TooltipPreview: Story = {
	render: () => (
		<Tooltip content="This is a tooltip">
			<Button>Hover me</Button>
		</Tooltip>
	),
};

export const TooltipPositions: Story = {
	render: () => (
		<div className="flex gap-4">
			<Tooltip content="Top tooltip">
				<Button variant="secondary">Top</Button>
			</Tooltip>
			<Tooltip content="Bottom tooltip" contentProps={{ side: 'bottom' } as any}>
				<Button variant="secondary">Bottom</Button>
			</Tooltip>
			<Tooltip content="Left tooltip" contentProps={{ side: 'left' } as any}>
				<Button variant="secondary">Left</Button>
			</Tooltip>
			<Tooltip content="Right tooltip" contentProps={{ side: 'right' } as any}>
				<Button variant="secondary">Right</Button>
			</Tooltip>
		</div>
	),
};

export const TooltipManual: Story = {
	render: () => (
		<Tooltip>
			<Tooltip.Trigger render={<Button>Manual Tooltip</Button>} />
			<Tooltip.Content>
				<p>Custom tooltip content</p>
			</Tooltip.Content>
		</Tooltip>
	),
};
