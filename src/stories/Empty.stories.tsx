import type { Meta, StoryObj } from '@storybook/react-vite';
import { Empty } from '../ui/empty';
import { Button } from '../ui/button';
import { InboxIcon } from 'lucide-react';

const meta: Meta<typeof Empty> = {
	title: 'Components/Empty',
	component: Empty,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		EmptyHeader: Empty.Header,
		EmptyMedia: Empty.Media,
		EmptyTitle: Empty.Title,
		EmptyDescription: Empty.Description,
		EmptyContent: Empty.Content,
	},
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const EmptyPreview: Story = {
	render: () => (
		<Empty className="w-96">
			<Empty.Header>
				<Empty.Media variant="icon">
					<InboxIcon />
				</Empty.Media>
				<Empty.Title>No results found</Empty.Title>
				<Empty.Description>Try adjusting your search or filter to find what you&apos;re looking for.</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button>Clear filters</Button>
			</Empty.Content>
		</Empty>
	),
};

export const EmptySimple: Story = {
	render: () => (
		<Empty className="w-80">
			<Empty.Header>
				<Empty.Title>No data</Empty.Title>
				<Empty.Description>There is no data to display.</Empty.Description>
			</Empty.Header>
		</Empty>
	),
};

export const EmptyWithAction: Story = {
	render: () => (
		<Empty className="w-96">
			<Empty.Header>
				<Empty.Media variant="icon">
					<InboxIcon />
				</Empty.Media>
				<Empty.Title>No projects yet</Empty.Title>
				<Empty.Description>Get started by creating your first project.</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button>Create Project</Button>
			</Empty.Content>
		</Empty>
	),
};
