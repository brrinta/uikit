import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toolbar } from '../ui/toolbar';
import { BoldIcon, ImageIcon, ItalicIcon, LinkIcon, UnderlineIcon } from 'lucide-react';

const meta: Meta<typeof Toolbar> = {
	title: 'UI/Toolbar',
	component: Toolbar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		ToolbarButton: Toolbar.Button,
		ToolbarSeparator: Toolbar.Separator,
		ToolbarGroup: Toolbar.Group,
		ToolbarLink: Toolbar.Link,
	},
};
export default meta;

type Story = StoryObj<typeof Toolbar>;

export const ToolbarPreview: Story = {
	render: () => (
		<Toolbar>
			<Toolbar.Group>
				<Toolbar.Button>
					<BoldIcon />
				</Toolbar.Button>
				<Toolbar.Button>
					<ItalicIcon />
				</Toolbar.Button>
				<Toolbar.Button>
					<UnderlineIcon />
				</Toolbar.Button>
			</Toolbar.Group>
			<Toolbar.Separator />
			<Toolbar.Group>
				<Toolbar.Button>
					<LinkIcon />
				</Toolbar.Button>
				<Toolbar.Button>
					<ImageIcon />
				</Toolbar.Button>
			</Toolbar.Group>
		</Toolbar>
	),
};

export const ToolbarWithText: Story = {
	render: () => (
		<Toolbar>
			<Toolbar.Button>
				<BoldIcon /> Bold
			</Toolbar.Button>
			<Toolbar.Button>
				<ItalicIcon /> Italic
			</Toolbar.Button>
			<Toolbar.Separator />
			<Toolbar.Link href="#">Help</Toolbar.Link>
		</Toolbar>
	),
};

export const ToolbarSimple: Story = {
	render: () => (
		<Toolbar>
			<Toolbar.Button>Save</Toolbar.Button>
			<Toolbar.Button>Cancel</Toolbar.Button>
			<Toolbar.Separator />
			<Toolbar.Button variant="destructive">Delete</Toolbar.Button>
		</Toolbar>
	),
};
