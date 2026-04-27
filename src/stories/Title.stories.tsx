import type { Meta, StoryObj } from '@storybook/react-vite';
import { Title } from '@uikit/ui/title';

const meta: Meta<typeof Title> = {
	title: 'Components/Title',
	component: Title,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		order: {
			control: 'select',
			options: [1, 2, 3, 4, 5, 6],
		},
	},
};
export default meta;

type Story = StoryObj<typeof Title>;

export const TitlePreview: Story = {
	render: Title,
	args: {
		children: 'Page Title',
		order: 1,
	},
};

export const TitleOrders: Story = {
	render: () => (
		<div className="space-y-2">
			<Title order={1}>Heading 1</Title>
			<Title order={2}>Heading 2</Title>
			<Title order={3}>Heading 3</Title>
			<Title order={4}>Heading 4</Title>
			<Title order={5}>Heading 5</Title>
			<Title order={6}>Heading 6</Title>
		</div>
	),
};

export const TitleWithStyles: Story = {
	render: () => (
		<div className="space-y-4">
			<Title
				order={1}
				className="text-primary">
				Primary Title
			</Title>
			<Title
				order={2}
				className="text-secondary">
				Secondary Title
			</Title>
			<Title
				order={3}
				className="text-muted-foreground">
				Muted Title
			</Title>
		</div>
	),
};
