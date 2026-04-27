import type { Meta, StoryObj } from '@storybook/react-vite';
import { showNotification, Toaster } from '../ui/sonner';
import { Button } from '../ui/button';

const meta: Meta<typeof Toaster> = {
	title: 'Components/Toaster',
	component: Toaster,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const ToasterPreview: Story = {
	render: (args) => (
		<div>
			<Toaster {...args} />
			<div className="flex flex-wrap gap-2">
				<Button onClick={() => showNotification({ message: 'Success notification', type: 'success', caption: 'Everything went well!' })}>
					Show Success
				</Button>
				<Button onClick={() => showNotification({ message: 'Error notification', type: 'error', caption: 'Something went wrong.' })}>
					Show Error
				</Button>
				<Button onClick={() => showNotification({ message: 'Warning notification', type: 'warning', caption: 'Be careful!' })}>Show Warning</Button>
				<Button onClick={() => showNotification({ message: 'Info notification', type: 'info', caption: 'Here is some info.' })}>Show Info</Button>
			</div>
		</div>
	),
};
