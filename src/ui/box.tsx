import * as React from 'react';
import { useUikitProvider } from '@uikit/hooks/provider';
import { cn } from '@uikit/lib/utils';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

type BoxProps = useRender.ComponentProps<'div'>;
const Box: React.FC<BoxProps> = ({ children, className, render, ...props }) => {
	const { prefix } = useUikitProvider();
	return useRender({
		defaultTagName: 'div',
		render,
		state: {
			slot: 'box',
		},
		props: mergeProps(
			{
				className: cn(`${prefix}-box `, className),
				children,
			},
			props,
		),
	});
};
Box.displayName = 'UikitBox';
export { Box };
export type { BoxProps };
