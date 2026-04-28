import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from '../ui/sidebar';
import { CalendarIcon, FolderIcon, HomeIcon, SettingsIcon, UsersIcon } from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
	title: 'UI/Sidebar',
	component: Sidebar,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

const menuItems = [
	{ icon: HomeIcon, label: 'Dashboard' },
	{ icon: UsersIcon, label: 'Users' },
	{ icon: FolderIcon, label: 'Projects' },
	{ icon: CalendarIcon, label: 'Calendar' },
	{ icon: SettingsIcon, label: 'Settings' },
];

export const SidebarPreview: Story = {
	render: () => (
		<SidebarProvider>
			<div className="flex min-h-96 w-full">
				<Sidebar>
					<SidebarHeader>
						<h2 className="text-lg font-semibold px-4 py-2">App Name</h2>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Navigation</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{menuItems.map((item) => (
										<SidebarMenuItem key={item.label}>
											<SidebarMenuButton>
												<item.icon className="size-4" />
												<span>{item.label}</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<main className="flex-1 p-6">
					<SidebarTrigger />
					<h1 className="text-2xl font-bold mt-4">Main Content</h1>
					<p className="text-muted-foreground mt-2">This is the main content area.</p>
				</main>
			</div>
		</SidebarProvider>
	),
};

export const SidebarCollapsible: Story = {
	render: () => (
		<SidebarProvider defaultOpen={false}>
			<div className="flex min-h-96 w-full">
				<Sidebar collapsible="icon">
					<SidebarHeader>
						<h2 className="text-lg font-semibold px-4 py-2">App</h2>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupContent>
								<SidebarMenu>
									{menuItems.map((item) => (
										<SidebarMenuItem key={item.label}>
											<SidebarMenuButton tooltip={item.label}>
												<item.icon className="size-4" />
												<span>{item.label}</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<main className="flex-1 p-6">
					<SidebarTrigger />
					<h1 className="text-2xl font-bold mt-4">Collapsible Sidebar</h1>
				</main>
			</div>
		</SidebarProvider>
	),
};
