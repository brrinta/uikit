import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '@uikit/ui/avatar';

const meta: Meta<typeof Avatar> = {
	title: 'Components/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		status: {
			control: 'select',
			options: ['online', 'offline', 'busy', 'away'],
		},
	},
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const AvatarPreview: Story = {
	render: Avatar,
	args: {
		src: 'https://github.com/shadcn.png',
		name: 'John Doe',
		alt: 'User avatar',
		size: 'md',
	},
};

export const AvatarWithStatus: Story = {
	render: Avatar,
	args: {
		src: 'https://github.com/shadcn.png',
		name: 'John Doe',
		status: 'online',
		size: 'md',
	},
};

export const AvatarFallback: Story = {
	render: Avatar,
	args: {
		name: 'John Doe',
		size: 'md',
	},
};

export const AvatarSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Avatar
				name="SM"
				size="sm"
			/>
			<Avatar
				name="MD"
				size="md"
			/>
			<Avatar
				name="LG"
				size="lg"
			/>
		</div>
	),
};
