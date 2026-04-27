import * as React from 'react';
import { useUikitProvider } from '@uikit/hooks/provider';
import { cn } from '@uikit/lib/utils';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

type StackProps = useRender.ComponentProps<'div'>;
const Stack: React.FC<StackProps> = ({ children, className, render, ...props }) => {
	const { prefix } = useUikitProvider();
	return useRender({
		defaultTagName: 'div',
		render,
		state: {
			slot: 'stack',
		},
		props: mergeProps(
			{
				className: cn(`${prefix}-stack flex flex-col`, className),
				children,
			},
			props,
		),
	});
};
Stack.displayName = 'UikitStack';
export { Stack };
export type { StackProps };
