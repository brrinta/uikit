import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuroraText } from '../ui/aurora-text';

const meta: Meta<typeof AuroraText> = {
	title: 'UI/AuroraText',
	component: AuroraText,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AuroraText>;

export const AuroraTextPreview: Story = {
	args: {
		children: 'Beautiful Aurora Text',
		className: 'text-4xl font-bold',
	},
};

export const CustomColors: Story = {
	args: {
		children: 'Custom Colors',
		className: 'text-6xl font-black',
		colors: ['#22c55e', '#3b82f6', '#ef4444', '#f59e0b'],
		speed: 2,
	},
};
