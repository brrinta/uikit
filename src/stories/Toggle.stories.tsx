import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';
import { prepareArgTypes } from '@uikit/lib/utils';
import { ToggleGroupItem, toggleVariants } from '@uikit/ui/toggle-group';

const meta: Meta<typeof ToggleGroupItem> = {
	title: 'Components/ToggleGroupItem',
	component: ToggleGroupItem,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(toggleVariants),
};

export default meta;
type Story = StoryObj<typeof ToggleGroupItem>;

export const TogglePreview: Story = {
	render: (args) => <ToggleGroupItem {...args} />,
	args: {
		variant: 'default',
		size: 'default',
		children: <BoldIcon />,
	},
};

export const ToggleWithText: Story = {
	render: (args) => <ToggleGroupItem {...args} />,
	args: {
		variant: 'default',
		size: 'default',
		children: 'ToggleGroupItem',
	},
};

export const ToggleOutline: Story = {
	render: (args) => <ToggleGroupItem {...args} />,
	args: {
		variant: 'outline',
		size: 'default',
		children: <ItalicIcon />,
	},
};

export const ToggleSizes: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<ToggleGroupItem size="sm">
				<BoldIcon />
			</ToggleGroupItem>
			<ToggleGroupItem size="default">
				<BoldIcon />
			</ToggleGroupItem>
			<ToggleGroupItem size="lg">
				<BoldIcon />
			</ToggleGroupItem>
		</div>
	),
};

export const ToggleGroup: Story = {
	render: () => (
		<div className="flex items-center gap-1">
			<ToggleGroupItem variant="outlined">
				<BoldIcon />
			</ToggleGroupItem>
			<ToggleGroupItem variant="outline">
				<ItalicIcon />
			</ToggleGroupItem>
			<ToggleGroupItem variant="outline">
				<UnderlineIcon />
			</ToggleGroupItem>
		</div>
	),
};
