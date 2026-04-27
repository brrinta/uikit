import * as React from 'react';
import { cn } from '@uikit/lib/utils';
import { useUikitProvider } from '@uikit/hooks/provider';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

type AppShellSectionProps = useRender.ComponentProps<'section'>;
const AppShellSection: React.FC<AppShellSectionProps> = ({ render, className, ...props }) => {
	const { prefix } = useUikitProvider();
	return useRender({
		defaultTagName: 'section',
		state: {
			slot: 'shell-section',
		},
		props: mergeProps(
			{
				className: cn(`${prefix}-shell-section`, className),
			},
			props,
		),
	});
};
AppShellSection.displayName = 'UikitAppShellSection';
export { AppShellSection };
export type { AppShellSectionProps };
