import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';

const meta: Meta<typeof Dialog> = {
	title: 'Components/Dialog',
	component: Dialog,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		DialogTrigger: Dialog.Trigger,
		DialogContent: Dialog.Content,
		DialogHeader: Dialog.Header,
		DialogTitle: Dialog.Title,
		DialogDescription: Dialog.Description,
		DialogFooter: Dialog.Footer,
	},
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const DialogPreview: Story = {
	render: () => (
		<Dialog>
			<Dialog.Trigger render={<Button>Open Dialog</Button>} />
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Dialog Title</Dialog.Title>
					<Dialog.Description>This is a dialog description.</Dialog.Description>
				</Dialog.Header>
				<Dialog.Body>
					<p>Dialog content goes here.</p>
				</Dialog.Body>
				<Dialog.Footer>
					<Dialog.Close render={<Button variant="secondary">Cancel</Button>} />
					<Button>Confirm</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog>
	),
};

export const DialogFullscreen: Story = {
	render: () => (
		<Dialog>
			<Dialog.Trigger render={<Button>Open Fullscreen</Button>} />
			<Dialog.Content variant="fullscreen">
				<Dialog.Header>
					<Dialog.Title>Fullscreen Dialog</Dialog.Title>
				</Dialog.Header>
				<Dialog.Body>
					<p>This dialog takes up the full screen.</p>
				</Dialog.Body>
				<Dialog.Footer>
					<Dialog.Close render={<Button>Close</Button>} />
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog>
	),
};
