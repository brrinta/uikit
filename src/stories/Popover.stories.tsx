import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from '../ui/popover';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const meta: Meta<typeof Popover> = {
	title: 'UI/Popover',
	component: Popover,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		PopoverTrigger: Popover.Trigger,
		PopoverContent: Popover.Content,
		PopoverHeader: Popover.Header,
		PopoverTitle: Popover.Title,
		PopoverDescription: Popover.Description,
	},
};
export default meta;

type Story = StoryObj<typeof Popover>;

export const PopoverPreview: Story = {
	render: () => (
		<Popover>
			<Popover.Trigger render={<Button variant="secondary">Open Popover</Button>} />
			<Popover.Content>
				<Popover.Header>
					<Popover.Title>Dimensions</Popover.Title>
					<Popover.Description>Set the dimensions for the layer.</Popover.Description>
				</Popover.Header>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="width">Width</Label>
						<Input
							id="width"
							defaultValue="100%"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="height">Height</Label>
						<Input
							id="height"
							defaultValue="25px"
						/>
					</div>
				</div>
			</Popover.Content>
		</Popover>
	),
};

export const PopoverPositions: Story = {
	render: () => (
		<div className="flex gap-4">
			<Popover>
				<Popover.Trigger render={<Button variant="secondary">Top</Button>} />
				<Popover.Content side="top">
					<p>Popover on top</p>
				</Popover.Content>
			</Popover>
			<Popover>
				<Popover.Trigger render={<Button variant="secondary">Bottom</Button>} />
				<Popover.Content side="bottom">
					<p>Popover on bottom</p>
				</Popover.Content>
			</Popover>
			<Popover>
				<Popover.Trigger render={<Button variant="secondary">Left</Button>} />
				<Popover.Content side="left">
					<p>Popover on left</p>
				</Popover.Content>
			</Popover>
			<Popover>
				<Popover.Trigger render={<Button variant="secondary">Right</Button>} />
				<Popover.Content side="right">
					<p>Popover on right</p>
				</Popover.Content>
			</Popover>
		</div>
	),
};
