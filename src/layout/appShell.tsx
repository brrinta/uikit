import * as React from 'react';
import { SidebarProvider, SidebarProviderProps } from '@uikit/ui/sidebar';
import { AppShellSidebar } from '@uikit/layout/appShellSidebar';
import { AppShellHeader } from '@uikit/layout/appShellHeader';
import { AppShellFooter } from '@uikit/layout/appShellFooter';
import { AppShellMain } from '@uikit/layout/appShellMain';
import { AppShellAside } from '@uikit/layout/appShellAside';
import { AppShellNav } from '@uikit/layout/appShellNav';
import { AppShellSection } from '@uikit/layout/appShellSection';
import { useUikitProvider } from '@uikit/hooks/provider';
import { cn } from '@uikit/lib/utils';

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
