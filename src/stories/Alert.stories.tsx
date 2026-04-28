import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, alertVariants } from '../ui/alert';
import { prepareArgTypes } from '../lib/utils';
import { InfoIcon } from 'lucide-react';

const meta: Meta<typeof Alert> = {
	title: 'UI/Alert',
	component: Alert,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(alertVariants),
	subcomponents: {
		AlertIcon: Alert.Icon,
		AlertContent: Alert.Content,
		AlertTitle: Alert.Title,
		AlertDescription: Alert.Description,
	},
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const AlertPreview: Story = {
	render: (props) => (
		<Alert {...props}>
			<Alert.Icon>
				<InfoIcon />
			</Alert.Icon>
			<Alert.Content>
				<Alert.Title>Alert Title</Alert.Title>
				<Alert.Description>This is an alert description message.</Alert.Description>
			</Alert.Content>
		</Alert>
	),
	args: {
		variant: 'info',
		appearance: 'light',
		size: 'md',
	},
};

export const AlertSolid: Story = {
	render: (props) => (
		<Alert {...props}>
			<Alert.Icon>
				<InfoIcon />
			</Alert.Icon>
			<Alert.Content>
				<Alert.Title>Solid Alert</Alert.Title>
				<Alert.Description>This is a solid alert message.</Alert.Description>
			</Alert.Content>
		</Alert>
	),
	args: {
		variant: 'primary',
		appearance: 'solid',
		size: 'md',
	},
};

export const AlertWithToolbar: Story = {
	render: (props) => (
		<Alert {...props}>
			<Alert.Icon>
				<InfoIcon />
			</Alert.Icon>
			<Alert.Content>
				<Alert.Title>Alert with Toolbar</Alert.Title>
				<Alert.Description>This alert has a toolbar for actions.</Alert.Description>
			</Alert.Content>
			<Alert.Toolbar>Actions</Alert.Toolbar>
		</Alert>
	),
	args: {
		variant: 'warning',
		appearance: 'light',
		size: 'md',
	},
};
