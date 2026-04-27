import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropdownMenu } from '../ui/dropdown-menu';
import { Button } from '../ui/button';

const meta: Meta<typeof DropdownMenu> = {
	title: 'Components/DropdownMenu',
	component: DropdownMenu,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		DropdownMenuTrigger: DropdownMenu.Trigger,
		DropdownMenuContent: DropdownMenu.Content,
		DropdownMenuItem: DropdownMenu.Item,
		DropdownMenuLabel: DropdownMenu.Label,
		DropdownMenuSeparator: DropdownMenu.Separator,
	},
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const DropdownMenuPreview: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenu.Trigger render={<Button variant="secondary">Open Menu</Button>} />
			<DropdownMenu.Content>
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Profile</DropdownMenu.Item>
				<DropdownMenu.Item>Billing</DropdownMenu.Item>
				<DropdownMenu.Item>Settings</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">Log out</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	),
};

export const DropdownMenuWithGroups: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenu.Trigger render={<Button>Options</Button>} />
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>Edit</DropdownMenu.Label>
					<DropdownMenu.Item>Cut</DropdownMenu.Item>
					<DropdownMenu.Item>Copy</DropdownMenu.Item>
					<DropdownMenu.Item>Paste</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Label>View</DropdownMenu.Label>
					<DropdownMenu.Item>Zoom In</DropdownMenu.Item>
					<DropdownMenu.Item>Zoom Out</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu>
	),
};

export const DropdownMenuWithShortcuts: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenu.Trigger render={<Button>Actions</Button>} />
			<DropdownMenu.Content>
				<DropdownMenu.Item>
					New Tab
					<DropdownMenu.Shortcut>⌘T</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					New Window
					<DropdownMenu.Shortcut>⌘N</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item disabled>
					Share
					<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	),
};
