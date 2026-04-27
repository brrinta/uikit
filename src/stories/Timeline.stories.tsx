import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from '../ui/timeline';
import { AlertCircleIcon, CheckIcon, ClockIcon } from 'lucide-react';

const meta: Meta<typeof Timeline> = {
	title: 'Components/Timeline',
	component: Timeline,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		TimelineItem: Timeline.Item,
		TimelineConnector: Timeline.Connector,
		TimelineDot: Timeline.Dot,
		TimelineContent: Timeline.Content,
		TimelineHeader: Timeline.Header,
		TimelineTitle: Timeline.Title,
		TimelineDescription: Timeline.Description,
	},
};
export default meta;

type Story = StoryObj<typeof Timeline>;

export const TimelinePreview: Story = {
	render: () => (
		<Timeline className="w-80">
			<Timeline.Item>
				<Timeline.Connector />
				<Timeline.Dot />
				<Timeline.Content>
					<Timeline.Header>
						<Timeline.Title>Order placed</Timeline.Title>
					</Timeline.Header>
					<Timeline.Description>Your order has been placed successfully.</Timeline.Description>
				</Timeline.Content>
			</Timeline.Item>
			<Timeline.Item>
				<Timeline.Connector />
				<Timeline.Dot />
				<Timeline.Content>
					<Timeline.Header>
						<Timeline.Title>Processing</Timeline.Title>
					</Timeline.Header>
					<Timeline.Description>Your order is being processed.</Timeline.Description>
				</Timeline.Content>
			</Timeline.Item>
			<Timeline.Item>
				<Timeline.Connector />
				<Timeline.Dot variant="secondary" />
				<Timeline.Content>
					<Timeline.Header>
						<Timeline.Title>Shipped</Timeline.Title>
					</Timeline.Header>
					<Timeline.Description>Your order has been shipped.</Timeline.Description>
				</Timeline.Content>
			</Timeline.Item>
		</Timeline>
	),
};

export const TimelineWithIcons: Story = {
	render: () => (
		<Timeline className="w-80">
			<Timeline.Item>
				<Timeline.Connector />
				<Timeline.Dot icon={<CheckIcon className="size-3" />} />
				<Timeline.Content>
					<Timeline.Header>
						<Timeline.Title>Completed</Timeline.Title>
					</Timeline.Header>
					<Timeline.Description>Task completed successfully.</Timeline.Description>
				</Timeline.Content>
			</Timeline.Item>
			<Timeline.Item>
				<Timeline.Connector />
				<Timeline.Dot
					variant="secondary"
					icon={<ClockIcon className="size-3" />}
				/>
				<Timeline.Content>
					<Timeline.Header>
						<Timeline.Title>In Progress</Timeline.Title>
					</Timeline.Header>
					<Timeline.Description>Currently working on this task.</Timeline.Description>
				</Timeline.Content>
			</Timeline.Item>
			<Timeline.Item>
				<Timeline.Connector />
				<Timeline.Dot
					variant="destructive"
					icon={<AlertCircleIcon className="size-3" />}
				/>
				<Timeline.Content>
					<Timeline.Header>
						<Timeline.Title>Issue</Timeline.Title>
					</Timeline.Header>
					<Timeline.Description>There was an issue with this step.</Timeline.Description>
				</Timeline.Content>
			</Timeline.Item>
		</Timeline>
	),
};

export const TimelineInteractive: Story = {
	render: () => (
		<Timeline
			className="w-80"
			onHeaderClick={(index) => alert(`Header ${index} clicked!`)}>
			<Timeline.Item
				title="Global Handler"
				description="Clicking this header triggers the Timeline-level onHeaderClick."
			/>
			<Timeline.Item
				title="Local Override"
				description="Clicking this header triggers both Timeline-level and local onHeaderClick."
				onHeaderClick={(e) => {
					e.stopPropagation();
					alert('Local handler clicked!');
				}}
			/>
		</Timeline>
	),
};
