import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavigationMenu } from '../ui/navigation-menu';

const meta: Meta<typeof NavigationMenu> = {
	title: 'UI/NavigationMenu',
	component: NavigationMenu,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		NavigationMenuList: NavigationMenu.List,
		NavigationMenuItem: NavigationMenu.Item,
		NavigationMenuTrigger: NavigationMenu.Trigger,
		NavigationMenuContent: NavigationMenu.Content,
		NavigationMenuLink: NavigationMenu.Link,
	},
};
export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const NavigationMenuPreview: Story = {
	render: () => (
		<NavigationMenu>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Getting Started</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<div className="grid gap-3 p-4 w-80">
							<div className="space-y-1">
								<h4 className="text-sm font-medium leading-none">Introduction</h4>
								<p className="text-sm text-muted-foreground">Re-usable components built using Radix UI and Tailwind CSS.</p>
							</div>
							<div className="space-y-1">
								<h4 className="text-sm font-medium leading-none">Installation</h4>
								<p className="text-sm text-muted-foreground">How to install dependencies and structure your app.</p>
							</div>
						</div>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<div className="grid w-96 gap-3 p-4 grid-cols-2">
							<NavigationMenu.Link href="#">Alert Dialog</NavigationMenu.Link>
							<NavigationMenu.Link href="#">Hover Card</NavigationMenu.Link>
							<NavigationMenu.Link href="#">Progress</NavigationMenu.Link>
							<NavigationMenu.Link href="#">Scroll Area</NavigationMenu.Link>
							<NavigationMenu.Link href="#">Tabs</NavigationMenu.Link>
							<NavigationMenu.Link href="#">Tooltip</NavigationMenu.Link>
						</div>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href="#">Documentation</NavigationMenu.Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu>
	),
};

export const NavigationMenuSimple: Story = {
	render: () => (
		<NavigationMenu>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Link href="#">Home</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href="#">About</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href="#">Contact</NavigationMenu.Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu>
	),
};
