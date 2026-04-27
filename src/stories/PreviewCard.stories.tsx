import type { Meta, StoryObj } from '@storybook/react-vite';
import { PreviewCard } from '@uikit/ui/preview-card';
import { Button } from '@uikit/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@uikit/ui/avatar';

const meta: Meta<typeof PreviewCard> = {
	title: 'Components/PreviewCard',
	component: PreviewCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PreviewCard>;

export const PreviewCardPreview: Story = {
	render: (args) => (
		<PreviewCard {...args}>
			<PreviewCard.Trigger asChild>
				<Button
					variant="link"
					className="p-0 h-auto">
					@nextjs
				</Button>
			</PreviewCard.Trigger>
			<PreviewCard.Content className="w-80">
				<div className="flex justify-between space-x-4">
					<Avatar>
						<AvatarImage src="https://github.com/vercel.png" />
						<AvatarFallback>VC</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<h4 className="text-sm font-semibold">@nextjs</h4>
						<p className="text-sm text-muted-foreground">The React Framework – created and maintained by @vercel.</p>
						<div className="flex items-center pt-2">
							<span className="text-xs text-muted-foreground">Joined December 2021</span>
						</div>
					</div>
				</div>
			</PreviewCard.Content>
		</PreviewCard>
	),
};
