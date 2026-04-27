import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu } from '@uikit/ui/context-menu';

const meta: Meta<typeof ContextMenu> = {
	title: 'Components/ContextMenu',
	component: ContextMenu,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		ContextMenuTrigger: ContextMenu.Trigger,
		ContextMenuContent: ContextMenu.Content,
		ContextMenuItem: ContextMenu.Item,
		ContextMenuSeparator: ContextMenu.Separator,
		ContextMenuLabel: ContextMenu.Label,
	},
};
export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const ContextMenuPreview: Story = {
	render: () => (
		<ContextMenu>
			<ContextMenu.Trigger>
				<div className="flex h-36 w-64 items-center justify-center rounded-md border border-dashed text-sm">Right click here</div>
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.Item>Back</ContextMenu.Item>
				<ContextMenu.Item>Forward</ContextMenu.Item>
				<ContextMenu.Item>Reload</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item>Save As...</ContextMenu.Item>
				<ContextMenu.Item>Print...</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu>
	),
};

export const ContextMenuWithGroups: Story = {
	render: () => (
		<ContextMenu>
			<ContextMenu.Trigger>
				<div className="flex h-36 w-64 items-center justify-center rounded-md border border-dashed text-sm">Right click here</div>
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.Label>Edit</ContextMenu.Label>
				<ContextMenu.Item>Cut</ContextMenu.Item>
				<ContextMenu.Item>Copy</ContextMenu.Item>
				<ContextMenu.Item>Paste</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Label>View</ContextMenu.Label>
				<ContextMenu.Item>Zoom In</ContextMenu.Item>
				<ContextMenu.Item>Zoom Out</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu>
	),
};
