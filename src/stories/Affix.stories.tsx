import type { Meta, StoryObj } from '@storybook/react-vite';
import { Affix } from '../ui/affix';
import { Button } from '../ui/button';
import { ArrowUpIcon } from 'lucide-react';

const meta: Meta<typeof Affix> = {
	title: 'Components/Affix',
	component: Affix,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		zIndex: {
			control: { type: 'number' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Affix>;

export const AffixPreview: Story = {
	render: () => (
		<div className="relative h-96 bg-muted/50 p-4">
			<p className="text-muted-foreground">Scroll down to see the affix button</p>
			<Affix position={{ bottom: 20, right: 20 }}>
				<Button
					size="icon"
					mode="icon">
					<ArrowUpIcon />
				</Button>
			</Affix>
		</div>
	),
};

export const AffixTopLeft: Story = {
	render: () => (
		<div className="relative h-96 bg-muted/50 p-4">
			<Affix position={{ top: 20, left: 20 }}>
				<Button>Top Left</Button>
			</Affix>
		</div>
	),
};

export const AffixBottomCenter: Story = {
	render: () => (
		<div className="relative h-96 bg-muted/50 p-4">
			<Affix
				position={{ bottom: 20, left: '50%' }}
				style={{ transform: 'translateX(-50%)' }}>
				<Button>Bottom Center</Button>
			</Affix>
		</div>
	),
};
