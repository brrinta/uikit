import * as React from 'react';
import { useUikitProvider } from '@uikit/hooks/provider';
import { cn } from '@uikit/lib/utils';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

type FlexProps = useRender.ComponentProps<'div'>;
const Flex: React.FC<FlexProps> = ({ children, render, className, ...props }) => {
	const { prefix } = useUikitProvider();
	return useRender({
		defaultTagName: 'div',
		render,
		state: {
			slot: 'flex',
		},
		props: mergeProps(
			{
				className: cn(`${prefix}-flex flex`, className),
				children,
			},
			props,
		),
	});
};
Flex.displayName = 'UikitFlex';
export { Flex };
export type { FlexProps };
