import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Button } from '../ui/button';

const meta: Meta<typeof Drawer> = {
	title: 'Components/Drawer',
	component: Drawer,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		DrawerTrigger,
		DrawerContent,
		DrawerHeader,
		DrawerTitle,
		DrawerDescription,
		DrawerFooter,
		DrawerClose,
	},
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const DrawerPreview: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger render={<Button>Open Drawer</Button>} />
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Drawer Title</DrawerTitle>
					<DrawerDescription>This is the drawer description.</DrawerDescription>
				</DrawerHeader>
				<div className="p-4">
					<p>Drawer content goes here.</p>
				</div>
				<DrawerFooter>
					<DrawerClose render={<Button variant="secondary">Cancel</Button>} />
					<Button>Save</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	),
};

export const DrawerLeft: Story = {
	render: () => (
		<Drawer direction="left">
			<DrawerTrigger render={<Button>Open Left</Button>} />
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Left Drawer</DrawerTitle>
				</DrawerHeader>
				<div className="p-4">
					<p>Content from left side.</p>
				</div>
			</DrawerContent>
		</Drawer>
	),
};

export const DrawerTop: Story = {
	render: () => (
		<Drawer direction="top">
			<DrawerTrigger render={<Button>Open Top</Button>} />
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Top Drawer</DrawerTitle>
				</DrawerHeader>
				<div className="p-4">
					<p>Content from top.</p>
				</div>
			</DrawerContent>
		</Drawer>
	),
};
