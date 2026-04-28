import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, cardVariants } from '../ui/card';
import { prepareArgTypes } from '../lib/utils';

const meta: Meta<typeof Card> = {
	title: 'UI/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(cardVariants),
	subcomponents: {
		CardHeader: Card.Header,
		CardTitle: Card.Title,
		CardDescription: Card.Description,
		CardContent: Card.Content,
		CardFooter: Card.Footer,
	},
};
export default meta;

type Story = StoryObj<typeof Card>;

export const CardPreview: Story = {
	render: (props) => (
		<Card
			{...props}
			className="w-80">
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
				<Card.Description>Card description goes here.</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>This is the card content area where you can add any content.</p>
			</Card.Content>
			<Card.Footer>
				<p className="text-sm text-muted-foreground">Card footer</p>
			</Card.Footer>
		</Card>
	),
	args: {
		variant: 'default',
	},
};

export const CardBordered: Story = {
	render: (props) => (
		<Card
			{...props}
			className="w-80">
			<Card.Header>
				<Card.Title>Bordered Card</Card.Title>
			</Card.Header>
			<Card.Content>
				<p>A card with border styling.</p>
			</Card.Content>
		</Card>
	),
	args: {
		variant: 'bordered',
	},
};

export const CardAccent: Story = {
	render: (props) => (
		<Card
			{...props}
			className="w-80">
			<Card.Header>
				<Card.Title>Accent Card</Card.Title>
			</Card.Header>
			<Card.Content>
				<p>A card with accent background.</p>
			</Card.Content>
		</Card>
	),
	args: {
		variant: 'accent',
	},
};
