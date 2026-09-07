import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Bell, Home, LayoutDashboard, Package, Settings, ShoppingCart } from 'lucide-react';
import { AppShell } from '../layout/appShell';
import { Breadcrumb } from '../ui/breadcrumb';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarTrigger } from '../ui/sidebar';

const meta: Meta<typeof AppShell> = {
	title: 'Layout/AppShell',
	component: AppShell,
	parameters: { layout: 'fullscreen' },
	tags: ['autodocs'],
	subcomponents: {
		'AppShell.Header': AppShell.Header,
		'AppShell.Main': AppShell.Main,
		'AppShell.Nav': AppShell.Nav,
		'AppShell.Sidebar': AppShell.Sidebar,
		'AppShell.Footer': AppShell.Footer,
	},
};
export default meta;

type Story = StoryObj<typeof AppShell>;

const navItems = [
	{ icon: LayoutDashboard, label: 'Dashboard' },
	{ icon: Package, label: 'Products' },
	{ icon: ShoppingCart, label: 'Orders' },
	{ icon: Settings, label: 'Settings' },
];

export const Basic: Story = {
	render: () => (
		<AppShell className="flex min-h-screen flex-col">
			<AppShell.Header className="flex h-14 items-center gap-3 border-b px-4">
				<Home className="size-5" />
				<span className="text-sm font-semibold">entero.biz</span>
				<div className="ml-auto flex items-center gap-2">
					<Button variant="ghost" size="icon" aria-label="Notifications">
						<Bell />
					</Button>
				</div>
			</AppShell.Header>
			<AppShell.Main className="flex-1 p-6">
				<h1 className="text-lg font-semibold">Page content</h1>
				<p className="text-sm text-muted-foreground">AppShell without a sidebar — header, main and footer regions.</p>
			</AppShell.Main>
			<AppShell.Footer className="border-t p-3 text-center text-xs text-muted-foreground">© 2026 entero.biz</AppShell.Footer>
		</AppShell>
	),
};

export const WithSidebar: Story = {
	render: () => (
		<AppShell withSidebar>
			<Sidebar>
				<SidebarHeader className="p-3 text-sm font-semibold">entero.biz</SidebarHeader>
				<SidebarContent className="px-2">
					<nav className="flex flex-col gap-1">
						{navItems.map(({ icon: Icon, label }) => (
							<Button key={label} variant="ghost" className="justify-start gap-2">
								<Icon className="size-4" />
								{label}
							</Button>
						))}
					</nav>
				</SidebarContent>
				<SidebarFooter className="p-3 text-xs text-muted-foreground">v0.1.55</SidebarFooter>
			</Sidebar>
			<AppShell.Main className="flex-1">
				<AppShell.Header className="flex h-14 items-center gap-3 border-b px-4">
					<SidebarTrigger />
					<Separator orientation="vertical" className="h-5" />
					<Breadcrumb>
						<Breadcrumb.List>
							<Breadcrumb.Item>
								<Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator />
							<Breadcrumb.Item>
								<Breadcrumb.Page>Orders</Breadcrumb.Page>
							</Breadcrumb.Item>
						</Breadcrumb.List>
					</Breadcrumb>
				</AppShell.Header>
				<AppShell.Section className="grid gap-4 p-6 md:grid-cols-3">
					{Array.from({ length: 6 }, (_, i) => (
						<div key={i} className="rounded-lg border p-4 text-sm">
							Card {i + 1}
						</div>
					))}
				</AppShell.Section>
			</AppShell.Main>
		</AppShell>
	),
};
