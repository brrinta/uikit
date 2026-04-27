import * as React from 'react';
import { cn } from '@uikit/lib/utils';
import { useUikitProvider } from '@uikit/hooks/provider';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

type GroupProps = useRender.ComponentProps<'div'>;
const Group: React.FC<GroupProps> = ({ children, className, render, ...props }) => {
	const { prefix } = useUikitProvider();
	return useRender({
		defaultTagName: 'div',
		render,
		state: {
			slot: 'group',
		},
		props: mergeProps(
			{
				className: cn(`${prefix}-group flex flex-wrap gap-2`, className),
				children,
			},
			props,
		),
	});
};
Group.displayName = 'UikitGroup';
export { Group };
export type { GroupProps };
