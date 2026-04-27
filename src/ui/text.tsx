import * as React from 'react';
import { cn } from '../lib/utils';
import { useUikitProvider } from '../hooks/provider';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

export type TextProps = useRender.ComponentProps<'p' | 'span' | 'div'>;

const Text: React.FC<TextProps> = ({ children, className, render, ...props }) => {
	const { prefix } = useUikitProvider();
	return useRender({
		defaultTagName: 'p',
		render,
		state: {
			slot: 'text',
		},
		props: mergeProps(
			{
				className: cn(`${prefix}-text whitespace-pre-line`, className),
				children,
			},
			props,
		),
	});
};
Text.displayName = 'UikitText';
export { Text };
