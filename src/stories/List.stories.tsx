import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from '../ui/list';
import { CheckIcon } from 'lucide-react';

const meta: Meta<typeof List> = {
	title: 'Components/List',
	component: List,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: ['ordered', 'unordered'],
		},
		spacing: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
		},
	},
	subcomponents: {
		ListItem: List.Item,
	},
};
export default meta;

type Story = StoryObj<typeof List>;

export const ListPreview: Story = {
	render: () => (
		<List>
			<List.Item>First item</List.Item>
			<List.Item>Second item</List.Item>
			<List.Item>Third item</List.Item>
		</List>
	),
};

export const ListOrdered: Story = {
	render: () => (
		<List type="ordered">
			<List.Item>Step one</List.Item>
			<List.Item>Step two</List.Item>
			<List.Item>Step three</List.Item>
		</List>
	),
};

export const ListWithIcon: Story = {
	render: () => (
		<List icon={<CheckIcon className="size-4 text-success" />}>
			<List.Item>Feature one</List.Item>
			<List.Item>Feature two</List.Item>
			<List.Item>Feature three</List.Item>
		</List>
	),
};

export const ListWithSpacing: Story = {
	render: () => (
		<List
			spacing="md"
			withPadding>
			<List.Item>Spaced item one</List.Item>
			<List.Item>Spaced item two</List.Item>
			<List.Item>Spaced item three</List.Item>
		</List>
	),
};

export const ListNested: Story = {
	render: () => (
		<List withPadding>
			<List.Item>
				Parent item
				<List withPadding>
					<List.Item>Child item 1</List.Item>
					<List.Item>Child item 2</List.Item>
				</List>
			</List.Item>
			<List.Item>Another parent</List.Item>
		</List>
	),
};
