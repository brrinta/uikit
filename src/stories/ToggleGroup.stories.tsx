import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';
import { prepareArgTypes } from '../lib/utils';
import { ToggleGroup, ToggleGroupItem, toggleVariants } from '../ui/toggle-group';

const meta: Meta<typeof ToggleGroup> = {
	title: 'UI/ToggleGroup',
	component: ToggleGroup,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(toggleVariants),
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const ToggleGroupPreview: Story = {
	render: (args) => (
		<ToggleGroup
			{...(args as any)}
			type="multiple">
			<ToggleGroupItem value="bold">
				<BoldIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic">
				<ItalicIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline">
				<UnderlineIcon />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const ToggleGroupSingle: Story = {
	render: (args) => (
		<ToggleGroup
			{...(args as any)}
			type="single"
			defaultValue={['center'] as any}>
			<ToggleGroupItem value="left">
				<AlignLeftIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="center">
				<AlignCenterIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="right">
				<AlignRightIcon />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const ToggleGroupOutline: Story = {
	render: (args) => (
		<ToggleGroup
			{...(args as any)}
			type="multiple"
			variant="outline">
			<ToggleGroupItem value="bold">
				<BoldIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic">
				<ItalicIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline">
				<UnderlineIcon />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const ToggleGroupVertical: Story = {
	render: (args) => (
		<ToggleGroup
			{...(args as any)}
			type="single"
			orientation="vertical">
			<ToggleGroupItem value="left">
				<AlignLeftIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="center">
				<AlignCenterIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="right">
				<AlignRightIcon />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const PaletteColors: Story = {
	parameters: {
		layout: 'padded',
		docs: { description: { story: 'Palette pressed styles were previously generated with template strings Tailwind never saw — no pressed styling rendered at all. Now driven by CSS variables.' } },
	},
	render: () => (
		<div className="flex flex-col gap-3">
			{(['solid', 'outline', 'ghost'] as const).map((variant) => (
				<ToggleGroup key={variant} defaultValue={['teal']} multiple>
					{(['red', 'amber', 'green', 'teal', 'blue', 'violet', 'rose'] as const).map((color) => (
						<ToggleGroupItem key={color} value={color} variant={variant} color={color}>
							{color}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			))}
			<ToggleGroup defaultValue={['blue']} multiple>
				{(['red', 'amber', 'green', 'teal', 'blue', 'violet', 'rose'] as const).map((color) => (
					<ToggleGroupItem key={color} value={color} appearance="light" color={color}>
						{color}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	),
};
