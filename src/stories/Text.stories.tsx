import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../ui/text';

const meta: Meta<typeof Text> = {
	title: 'Components/Text',
	component: Text,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Text>;

export const TextVariants: Story = {
	render: () => (
		<div className="space-y-2">
			<Text className="text-lg font-bold">Bold Large Text</Text>
			<Text className="text-sm text-muted-foreground">Small muted text</Text>
			<Text className="text-base">Regular text</Text>
			<Text className="text-xs italic">Small italic text</Text>
		</div>
	),
};

export const TextPreview: Story = {
	render: (args) => <Text {...args} />,
	args: {
		children: 'This is a paragraph of text.',
		render: <p />,
	},
};

export const TextAsDiv: Story = {
	render: (args) => <Text {...args} />,
	args: {
		children: 'This is text rendered as a div.',
		render: <div />,
	},
};

export const TextAsSpan: Story = {
	render: (args) => <Text {...args} />,
	args: {
		children: 'This is inline text.',
		render: <span />,
	},
};

export const TextAsLink: Story = {
	render: (args) => <Text {...args} />,
	args: {
		children: 'This is a link',
		render: (
			<a
				href={'#'}
				className={'text-primary underline'}
			/>
		),
	},
};
