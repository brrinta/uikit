import type { Meta, StoryObj } from '@storybook/react-vite';
import { Command } from '../ui/command';
import { User, Mail, Settings, CreditCard, Calculator, Smile, Calendar } from 'lucide-react';

const meta: Meta<typeof Command> = {
	title: 'Components/Command',
	component: Command,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Command>;

export const CommandPreview: Story = {
	render: (args) => (
		<div className="w-[400px] border rounded-lg shadow-md">
			<Command {...args}>
				<Command.Input placeholder="Type a command or search..." />
				<Command.List>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group heading="Suggestions">
						<Command.Item>
							<Calendar className="mr-2 h-4 w-4" />
							<span>Calendar</span>
						</Command.Item>
						<Command.Item>
							<Smile className="mr-2 h-4 w-4" />
							<span>Search Emoji</span>
						</Command.Item>
						<Command.Item>
							<Calculator className="mr-2 h-4 w-4" />
							<span>Calculator</span>
						</Command.Item>
					</Command.Group>
					<Command.Separator />
					<Command.Group heading="Settings">
						<Command.Item>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<Command.Shortcut>⌘P</Command.Shortcut>
						</Command.Item>
						<Command.Item>
							<CreditCard className="mr-2 h-4 w-4" />
							<span>Billing</span>
							<Command.Shortcut>⌘B</Command.Shortcut>
						</Command.Item>
						<Command.Item>
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<Command.Shortcut>⌘S</Command.Shortcut>
						</Command.Item>
					</Command.Group>
				</Command.List>
			</Command>
		</div>
	),
};
