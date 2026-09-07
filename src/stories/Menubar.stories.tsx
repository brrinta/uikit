import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Menubar } from '../ui/menubar';

const meta: Meta<typeof Menubar> = {
	title: 'UI/Menubar',
	component: Menubar,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	subcomponents: {
		'Menubar.Menu': Menubar.Menu,
		'Menubar.Trigger': Menubar.Trigger,
		'Menubar.Content': Menubar.Content,
		'Menubar.Item': Menubar.Item,
	},
};
export default meta;

type Story = StoryObj<typeof Menubar>;

export const Playground: Story = {
	render: () => (
		<Menubar>
			<Menubar.Menu>
				<Menubar.Trigger>File</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>
						New file <Menubar.Shortcut>⌘N</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Item>
						Open… <Menubar.Shortcut>⌘O</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Sub>
						<Menubar.SubTrigger>Share</Menubar.SubTrigger>
						<Menubar.SubContent>
							<Menubar.Item>Email link</Menubar.Item>
							<Menubar.Item>Copy link</Menubar.Item>
						</Menubar.SubContent>
					</Menubar.Sub>
					<Menubar.Separator />
					<Menubar.Item variant="destructive">Delete project</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
			<Menubar.Menu>
				<Menubar.Trigger>Edit</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>
						Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
					</Menubar.Item>
					<Menubar.Item>
						Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
					</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
			<Menubar.Menu>
				<Menubar.Trigger>View</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.CheckboxItem defaultChecked>Show toolbar</Menubar.CheckboxItem>
					<Menubar.CheckboxItem>Show statusbar</Menubar.CheckboxItem>
					<Menubar.Separator />
					<Menubar.RadioGroup defaultValue="comfortable">
						<Menubar.GroupLabel>Density</Menubar.GroupLabel>
						<Menubar.RadioItem value="compact">Compact</Menubar.RadioItem>
						<Menubar.RadioItem value="comfortable">Comfortable</Menubar.RadioItem>
					</Menubar.RadioGroup>
				</Menubar.Content>
			</Menubar.Menu>
		</Menubar>
	),
};

export const DisabledMenu: Story = {
	render: () => (
		<Menubar>
			<Menubar.Menu>
				<Menubar.Trigger>File</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>New file</Menubar.Item>
					<Menubar.Item disabled>Import (upgrade required)</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
			<Menubar.Menu>
				<Menubar.Trigger disabled>Plugins</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>—</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
		</Menubar>
	),
};
