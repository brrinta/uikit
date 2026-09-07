import type { Meta, StoryObj } from '@storybook/react-vite';
import { SparklesText } from '../ui/sparkles-text';

const meta: Meta<typeof SparklesText> = {
	title: 'UI/SparklesText',
	component: SparklesText,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: { sparklesCount: { control: { type: 'number', min: 1, max: 40 } } },
};
export default meta;

type Story = StoryObj<typeof SparklesText>;

export const Playground: Story = { args: { children: 'entero.biz', sparklesCount: 10 } };

export const CustomColors: Story = {
	args: { children: 'Launch day', colors: { first: '#22c55e', second: '#0ea5e9' }, sparklesCount: 16 },
};

export const Dense: Story = { args: { children: 'Sparkly', sparklesCount: 35 } };
