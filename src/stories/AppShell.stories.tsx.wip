import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from '../layout/app-shell';
import { Nav } from '../layout/nav';
import { NavLink } from '../layout/nav-link';
import { NavUser } from '../layout/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Separator } from '../ui/separator';
import { Home, Settings, User, Bell, Search, LayoutDashboard, Package, ShoppingCart } from 'lucide-react';
import * as React from 'react';

const meta: Meta<typeof AppShell> = {
	title: 'Layout/AppShell',
	component: AppShell,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppShell>;

const data = {
	user: {
		name: 'John Doe',
		email: 'john@example.com',
		avatar: 'https://github.com/shadcn.png',
	},
	navMain: [
		{
			title: 'Dashboard',
			url: '#',
			icon: LayoutDashboard,
			isActive: true,
		},
		{
			title: 'Orders',
			url: '#',
			icon: ShoppingCart,
		},
		{
			title: 'Products',
			url: '#',
			icon: Package,
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings,
		},
	],
};

export const Default: Story = {
	render: () => (
		<SidebarProvider>
			<AppShell
				sidebar={
					<Sidebar collapsible="icon">
						<SidebarHeader>
							<div className="flex items-center gap-2 px-4 py-2">
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
									<Package className="h-4 w-4" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-semibold">Acme Inc</span>
									<span className="text-xs text-muted-foreground">v1.0.0</span>
								</div>
							</div>
						</SidebarHeader>
						<SidebarContent>
							<Nav items={data.navMain} />
						</SidebarContent>
						<SidebarFooter>
							<NavUser user={data.user} />
						</SidebarFooter>
					</Sidebar>
				}
			>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
					</div>
					<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
				</div>
			</AppShell>
		</SidebarProvider>
	),
};
