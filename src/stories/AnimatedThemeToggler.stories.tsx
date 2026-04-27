import type { Meta, StoryObj } from '@storybook/react-vite';
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler';

const meta: Meta<typeof AnimatedThemeToggler> = {
	title: 'Components/AnimatedThemeToggler',
	component: AnimatedThemeToggler,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AnimatedThemeToggler>;

export const Default: Story = {
	args: {
		size: 'md',
	},
};

export const WithLabel: Story = {
	args: {
		label: 'Theme',
		size: 'md',
	},
};
