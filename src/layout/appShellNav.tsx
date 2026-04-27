import * as React from 'react';
import { cn } from '../lib/utils';
import { useUikitProvider } from '../hooks/provider';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

type AppShellNavProps = useRender.ComponentProps<'nav'>;
const AppShellNav: React.FC<AppShellNavProps> = ({ render, className, ...props }) => {
	const { prefix } = useUikitProvider();
	return useRender({
		defaultTagName: 'nav',
		render,
		state: {
			slot: 'shell-nav',
		},
		props: mergeProps(
			{
				className: cn(`${prefix}-shell-nav `, className),
			},
			props,
		),
	});
};
AppShellNav.displayName = 'UikitAppShellNav';
export { AppShellNav };
export type { AppShellNavProps };
