import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, badgeVariants } from '@uikit/ui/badge';
import { prepareArgTypes } from '@uikit/lib/utils';

const meta: Meta<typeof Badge> = {
	title: 'Components/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(badgeVariants),
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const BadgePreview: Story = {
	render: Badge,
	args: {
		children: 'Badge',
		variant: 'primary',
		appearance: 'default',
		size: 'md',
	},
};

export const BadgeLight: Story = {
	render: Badge,
	args: {
		children: 'Light Badge',
		variant: 'primary',
		appearance: 'light',
		size: 'md',
	},
};

export const BadgeOutline: Story = {
	render: Badge,
	args: {
		children: 'Outline Badge',
		variant: 'primary',
		appearance: 'outline',
		size: 'md',
	},
};

export const BadgeDot: Story = {
	render: (props) => (
		<Badge {...props}>
			<Badge.Dot />
			With Dot
		</Badge>
	),
	args: {
		variant: 'success',
		appearance: 'light',
		size: 'md',
	},
};
