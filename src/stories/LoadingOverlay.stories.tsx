import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingOverlay } from '@uikit/ui/loading';
import { useState } from 'react';
import { Button } from '@uikit/ui/button';

const meta: Meta<typeof LoadingOverlay> = {
	title: 'Components/LoadingOverlay',
	component: LoadingOverlay,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		dim: {
			control: 'boolean',
		},
		blur: {
			control: 'boolean',
		},
	},
};
export default meta;

type Story = StoryObj<typeof LoadingOverlay>;

export const LoadingOverlayPreview: Story = {
	render: function LoadingOverlayStory() {
		const [open, setOpen] = useState(false);
		return (
			<div className="relative w-80 h-40 border rounded-lg p-4">
				<h3 className="font-medium">Content Area</h3>
				<p className="text-sm text-muted-foreground">Click button to show overlay</p>
				<Button
					onClick={() => setOpen(true)}
					className="mt-2">
					Show Loading
				</Button>
				<LoadingOverlay
					open={open}
					text="Loading..."
				/>
				{open && (
					<Button
						onClick={() => setOpen(false)}
						className="absolute bottom-4 right-4 z-[1001]"
						variant="secondary">
						Hide
					</Button>
				)}
			</div>
		);
	},
};

export const LoadingOverlaySizes: Story = {
	render: () => (
		<div className="flex gap-4">
			<div className="relative w-32 h-32 border rounded-lg">
				<LoadingOverlay
					open
					size="sm"
				/>
			</div>
			<div className="relative w-32 h-32 border rounded-lg">
				<LoadingOverlay
					open
					size="md"
				/>
			</div>
			<div className="relative w-32 h-32 border rounded-lg">
				<LoadingOverlay
					open
					size="lg"
				/>
			</div>
		</div>
	),
};

export const LoadingOverlayWithText: Story = {
	render: () => (
		<div className="relative w-80 h-40 border rounded-lg p-4">
			<h3 className="font-medium">Content Area</h3>
			<LoadingOverlay
				open
				text="Please wait while we load your data..."
			/>
		</div>
	),
};
