import * as React from 'react';
import { cn } from '@uikit/lib/utils';
import { useUikitProvider } from '@uikit/hooks/provider';
import { SidebarInset, SidebarInsetProps } from '@uikit/ui/sidebar';

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
