import * as React from 'react';
import { cn } from '@uikit/lib/utils';
import { useUikitProvider } from '@uikit/hooks/provider';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

type AppShellAsideProps = useRender.ComponentProps<'aside'>;
const AppShellAside: React.FC<AppShellAsideProps> = ({ children, render, className, ...props }) => {
	const { prefix } = useUikitProvider();
	return useRender({
		defaultTagName: 'aside',
		render,
		state: {
			slot: 'shell-aside',
		},
		props: mergeProps(
			{
				className: cn(`${prefix}-shell-aside`, className),
				children,
			},
			props,
		),
	});
};
AppShellAside.displayName = 'UikitAppShellAside';
export { AppShellAside };
export type { AppShellAsideProps };
