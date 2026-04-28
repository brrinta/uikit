import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertDialog } from '../ui/alert-dialog';
import { Button } from '../ui/button';

const meta: Meta<typeof AlertDialog> = {
	title: 'UI/AlertDialog',
	component: AlertDialog,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		AlertDialogTrigger: AlertDialog.Trigger,
		AlertDialogContent: AlertDialog.Content,
		AlertDialogHeader: AlertDialog.Header,
		AlertDialogTitle: AlertDialog.Title,
		AlertDialogDescription: AlertDialog.Description,
		AlertDialogFooter: AlertDialog.Footer,
		AlertDialogAction: AlertDialog.Action,
		AlertDialogCancel: AlertDialog.Cancel,
	},
};
export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const AlertDialogPreview: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialog.Trigger render={<Button variant="destructive">Delete Account</Button>} />
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
					<AlertDialog.Description>
						This action cannot be undone. This will permanently delete your account and remove your data from our servers.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel render={<Button variant="secondary">Cancel</Button>} />
					<AlertDialog.Action render={<Button variant="destructive">Delete</Button>} />
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog>
	),
};

export const AlertDialogSmall: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialog.Trigger render={<Button>Confirm Action</Button>} />
			<AlertDialog.Content size="sm">
				<AlertDialog.Header>
					<AlertDialog.Title>Confirm</AlertDialog.Title>
					<AlertDialog.Description>Are you sure you want to proceed?</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel render={<Button variant="secondary">No</Button>} />
					<AlertDialog.Action render={<Button>Yes</Button>} />
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog>
	),
};
