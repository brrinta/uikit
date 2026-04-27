import * as React from 'react';
import { cn } from '../lib/utils';
import { useUikitProvider } from '../hooks/provider';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

type AppShellFooterProps = useRender.ComponentProps<'div'>;
const AppShellFooter: React.FC<AppShellFooterProps> = ({ children, render, className, ...props }) => {
	const { prefix } = useUikitProvider();
	return useRender({
		defaultTagName: 'footer',
		render,
		state: {
			slot: 'shell-footer',
		},
		props: mergeProps(
			{
				className: cn(`${prefix}-shell-footer`, className),
				children,
			},
			props,
		),
	});
};
AppShellFooter.displayName = 'UikitAppShellFooter';
export { AppShellFooter };
export type { AppShellFooterProps };
