import * as React from 'react';
import { cn } from '../lib/utils';
import { useUikitProvider } from '../hooks/provider';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

type AppShellHeaderProps = useRender.ComponentProps<'header'>;
const AppShellHeader: React.FC<AppShellHeaderProps> = ({ children, render, className, ...props }) => {
	const { prefix } = useUikitProvider();
	return useRender({
		defaultTagName: 'header',
		render,
		state: {
			slot: 'shell-header',
		},
		props: mergeProps(
			{
				className: cn(`${prefix}-shell-header sticky min-h-12 bg-sidebar text-sidebar-foreground`, className),
				children,
			},
			props,
		),
	});
};
AppShellHeader.displayName = 'UikitAppShellHeader';
export { AppShellHeader };
export type { AppShellHeaderProps };
