import * as React from 'react';
import { SidebarProvider, SidebarProviderProps } from '../ui/sidebar';
import { AppShellSidebar } from './appShellSidebar';
import { AppShellHeader } from './appShellHeader';
import { AppShellFooter } from './appShellFooter';
import { AppShellMain } from './appShellMain';
import { AppShellAside } from './appShellAside';
import { AppShellNav } from './appShellNav';
import { AppShellSection } from './appShellSection';
import { useUikitProvider } from '../hooks/provider';
import { cn } from '../lib/utils';

type AppShellProps<T extends boolean> = T extends true
	? React.ComponentPropsWithRef<'div'> & { withSidebar?: T } & SidebarProviderProps
	: React.ComponentPropsWithRef<'div'> & { withSidebar?: T };

const AppShell: React.FC<AppShellProps<any>> & {
	Header: typeof AppShellHeader;
	Footer: typeof AppShellFooter;
	Main: typeof AppShellMain;
	Aside: typeof AppShellAside;
	Nav: typeof AppShellNav;
	Section: typeof AppShellSection;
	Sidebar: typeof AppShellSidebar;
} = ({ children, className, withSidebar, ...props }) => {
	const Comp = withSidebar ? SidebarProvider : 'div';

	const { prefix } = useUikitProvider();
	return (
		<Comp
			data-slot={'shell'}
			className={cn(`${prefix}-shell`, className)}
			{...props}>
			{children}
		</Comp>
	);
};
AppShell.displayName = 'UikitAppShell';
AppShell.Header = AppShellHeader;
AppShell.Footer = AppShellFooter;
AppShell.Main = AppShellMain;
AppShell.Aside = AppShellAside;
AppShell.Nav = AppShellNav;
AppShell.Section = AppShellSection;
AppShell.Sidebar = AppShellSidebar;

export { AppShell };
export type { AppShellProps };
