import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, tabsListVariants } from '../ui/tabs';
import { prepareArgTypes } from '../lib/utils';

const meta: Meta<typeof Tabs> = {
	title: 'Components/Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(tabsListVariants),
	subcomponents: {
		TabsList: Tabs.List,
		TabsTab: Tabs.Tab,
		TabsPanel: Tabs.Panel,
	},
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const TabsPreview: Story = {
	render: (props) => (
		<Tabs
			defaultValue="tab1"
			{...props}>
			<Tabs.List>
				<Tabs.Tab value="tab1">Account</Tabs.Tab>
				<Tabs.Tab value="tab2">Password</Tabs.Tab>
				<Tabs.Tab value="tab3">Settings</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panel value="tab1">
				<p className="p-4">Account settings content</p>
			</Tabs.Panel>
			<Tabs.Panel value="tab2">
				<p className="p-4">Password settings content</p>
			</Tabs.Panel>
			<Tabs.Panel value="tab3">
				<p className="p-4">General settings content</p>
			</Tabs.Panel>
		</Tabs>
	),
};

export const TabsLine: Story = {
	render: (props) => (
		<Tabs
			defaultValue="tab1"
			{...props}>
			<Tabs.List variant="line">
				<Tabs.Tab value="tab1">Overview</Tabs.Tab>
				<Tabs.Tab value="tab2">Analytics</Tabs.Tab>
				<Tabs.Tab value="tab3">Reports</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panel value="tab1">
				<p className="p-4">Overview content</p>
			</Tabs.Panel>
			<Tabs.Panel value="tab2">
				<p className="p-4">Analytics content</p>
			</Tabs.Panel>
			<Tabs.Panel value="tab3">
				<p className="p-4">Reports content</p>
			</Tabs.Panel>
		</Tabs>
	),
};

export const TabsButton: Story = {
	render: (props) => (
		<Tabs
			defaultValue="tab1"
			{...props}>
			<Tabs.List variant="button">
				<Tabs.Tab value="tab1">First</Tabs.Tab>
				<Tabs.Tab value="tab2">Second</Tabs.Tab>
				<Tabs.Tab value="tab3">Third</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panel value="tab1">
				<p className="p-4">First tab content</p>
			</Tabs.Panel>
			<Tabs.Panel value="tab2">
				<p className="p-4">Second tab content</p>
			</Tabs.Panel>
			<Tabs.Panel value="tab3">
				<p className="p-4">Third tab content</p>
			</Tabs.Panel>
		</Tabs>
	),
};
