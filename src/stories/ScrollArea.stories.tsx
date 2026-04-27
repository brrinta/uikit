import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

const meta: Meta<typeof ScrollArea> = {
	title: 'Components/ScrollArea',
	component: ScrollArea,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ScrollArea>;

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export const ScrollAreaPreview: Story = {
	render: () => (
		<ScrollArea className="h-72 w-48 rounded-md border">
			<div className="p-4">
				<h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
				{tags.map((tag) => (
					<div key={tag}>
						<div className="text-sm">{tag}</div>
						<Separator className="my-2" />
					</div>
				))}
			</div>
		</ScrollArea>
	),
};

export const ScrollAreaHorizontal: Story = {
	render: () => (
		<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
			<div className="flex w-max space-x-4 p-4">
				{Array.from({ length: 10 }).map((_, i) => (
					<div
						key={i}
						className="w-32 h-32 rounded-md bg-muted flex items-center justify-center">
						Item {i + 1}
					</div>
				))}
			</div>
		</ScrollArea>
	),
};

export const ScrollAreaLarge: Story = {
	render: () => (
		<ScrollArea className="h-96 w-80 rounded-md border p-4">
			<div className="space-y-4">
				{Array.from({ length: 30 }).map((_, i) => (
					<div
						key={i}
						className="p-4 bg-muted rounded-md">
						<h4 className="font-medium">Item {i + 1}</h4>
						<p className="text-sm text-muted-foreground">This is some content for item {i + 1}.</p>
					</div>
				))}
			</div>
		</ScrollArea>
	),
};
