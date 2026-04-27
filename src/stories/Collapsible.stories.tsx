import type { Meta, StoryObj } from '@storybook/react-vite';
import { Collapsible } from '../ui/collapsible';
import { Button } from '../ui/button';
import { ChevronsUpDownIcon } from 'lucide-react';

const meta: Meta<typeof Collapsible> = {
	title: 'Components/Collapsible',
	component: Collapsible,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		CollapsibleTrigger: Collapsible.Trigger,
		CollapsibleContent: Collapsible.Content,
	},
};
export default meta;

type Story = StoryObj<typeof Collapsible>;

export const CollapsiblePreview: Story = {
	render: () => (
		<Collapsible className="w-80 space-y-2">
			<div className="flex items-center justify-between space-x-4 px-4">
				<h4 className="text-sm font-semibold">@username starred 3 repositories</h4>
				<Collapsible.Trigger
					render={
						<Button
							variant="ghost"
							size="sm"
							mode="icon">
							<ChevronsUpDownIcon className="size-4" />
							<span className="sr-only">Toggle</span>
						</Button>
					}
				/>
			</div>
			<div className="rounded-md border px-4 py-3 text-sm">@radix-ui/primitives</div>
			<Collapsible.Content className="space-y-2">
				<div className="rounded-md border px-4 py-3 text-sm">@radix-ui/colors</div>
				<div className="rounded-md border px-4 py-3 text-sm">@stitches/react</div>
			</Collapsible.Content>
		</Collapsible>
	),
};

export const CollapsibleOpen: Story = {
	render: () => (
		<Collapsible
			defaultOpen
			className="w-80 space-y-2">
			<div className="flex items-center justify-between space-x-4 px-4">
				<h4 className="text-sm font-semibold">Open by default</h4>
				<Collapsible.Trigger
					render={
						<Button
							variant="ghost"
							size="sm"
							mode="icon">
							<ChevronsUpDownIcon className="size-4" />
						</Button>
					}
				/>
			</div>
			<Collapsible.Content className="space-y-2">
				<div className="rounded-md border px-4 py-3 text-sm">Content 1</div>
				<div className="rounded-md border px-4 py-3 text-sm">Content 2</div>
				<div className="rounded-md border px-4 py-3 text-sm">Content 3</div>
			</Collapsible.Content>
		</Collapsible>
	),
};
