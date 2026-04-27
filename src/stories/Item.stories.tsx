import type { Meta, StoryObj } from '@storybook/react-vite';
import { Item } from '../ui/item';
import { User, ChevronRight, Mail } from 'lucide-react';

const meta: Meta<typeof Item> = {
	title: 'Components/Item',
	component: Item,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Item>;

export const ItemPreview: Story = {
	render: (args) => (
		<div className="w-80">
			<Item {...args}>
				<Item.Media variant="icon">
					<User />
				</Item.Media>
				<Item.Content>
					<Item.Title>User Profile</Item.Title>
					<Item.Description>Manage your account settings</Item.Description>
				</Item.Content>
				<Item.Actions>
					<ChevronRight className="size-4 opacity-50" />
				</Item.Actions>
			</Item>
		</div>
	),
};

export const ItemGroupPreview: Story = {
	render: (args) => (
		<div className="w-80">
			<Item.Group>
				<Item variant="muted">
					<Item.Media variant="icon"><Mail /></Item.Media>
					<Item.Content>
						<Item.Title>Inbox</Item.Title>
						<Item.Description>Check your messages</Item.Description>
					</Item.Content>
				</Item>
				<Item.Separator />
				<Item variant="muted">
					<Item.Media variant="icon"><User /></Item.Media>
					<Item.Content>
						<Item.Title>Profile</Item.Title>
						<Item.Description>Your personal info</Item.Description>
					</Item.Content>
				</Item>
			</Item.Group>
		</div>
	),
};
