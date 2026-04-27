import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from '../ui/skeleton';

const meta: Meta<typeof Skeleton> = {
	title: 'Components/Skeleton',
	component: Skeleton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const SkeletonPreview: Story = {
	render: Skeleton,
	args: {
		className: 'h-4 w-48',
	},
};

export const SkeletonCard: Story = {
	render: () => (
		<div className="flex flex-col space-y-3 w-64">
			<Skeleton className="h-32 w-full rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-3/4" />
			</div>
		</div>
	),
};

export const SkeletonAvatar: Story = {
	render: () => (
		<div className="flex items-center space-x-4">
			<Skeleton className="h-12 w-12 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-32" />
				<Skeleton className="h-4 w-24" />
			</div>
		</div>
	),
};

export const SkeletonTable: Story = {
	render: () => (
		<div className="space-y-2 w-80">
			<Skeleton className="h-8 w-full" />
			<Skeleton className="h-8 w-full" />
			<Skeleton className="h-8 w-full" />
			<Skeleton className="h-8 w-full" />
		</div>
	),
};
