import * as React from 'react';
import { cn } from '../lib/utils';
import { useUikitProvider } from '../hooks/provider';
import { SidebarInset, SidebarInsetProps } from '../ui/sidebar';

type AppShellMainProps = SidebarInsetProps;
const AppShellMain: React.FC<AppShellMainProps> = ({ children, className, ...props }) => {
	const { prefix } = useUikitProvider();
	return (
		<SidebarInset
			data-slot="shell-main"
			className={cn(`${prefix}-shell-main`, className)}
			{...props}>
			{children}
		</SidebarInset>
	);
};
AppShellMain.displayName = 'UikitAppShellMain';
export { AppShellMain };
export type { AppShellMainProps };
