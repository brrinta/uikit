import * as React from 'react';
import { useUikitProvider } from '@uikit/hooks/provider';
import { cn } from '@uikit/lib/utils';
import { Sidebar, SidebarProps } from '@uikit/ui/sidebar';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

type AppShellSidebarProps = useRender.ComponentProps<'nav'> &
	Pick<SidebarProps, 'side' | 'variant' | 'classNames' | 'collapsible'> & { sidebarProps?: SidebarProps };
const AppShellSidebar: React.FC<AppShellSidebarProps> = ({
	children,
	className,
	side,
	variant,
	classNames,
	collapsible,
	render,
	sidebarProps,
	...props
}) => {
	const { prefix } = useUikitProvider();
	return useRender({
		defaultTagName: 'nav',
		render,
		state: { slot: 'shell-sidebar', side, variant, collapsible },
		props: mergeProps(
			{
				className: cn(`${prefix}-shell-sidebar`, className),
				children: (
					<Sidebar
						classNames={classNames}
						side={side}
						variant={variant}
						collapsible={collapsible}
						{...sidebarProps}>
						{children}
					</Sidebar>
				),
			},
			props,
		),
	});
};
AppShellSidebar.displayName = 'UikitAppShellSidebar';
export { AppShellSidebar };
export type { AppShellSidebarProps };
