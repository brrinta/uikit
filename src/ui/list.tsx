import * as React from 'react';
import { cn } from '../lib/utils';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

export type ListProps = useRender.ComponentProps<'ul' | 'ol'> & {
	type?: 'ordered' | 'unordered';
	withPadding?: boolean;
	icon?: React.ReactNode;
	center?: boolean;
};

const ListRoot: React.FC<ListProps> = ({ className, children, render, type = 'unordered', withPadding, icon, center, ...props }) => {
	const renderElement = useRender({
		defaultTagName: type === 'unordered' ? 'ul' : 'ol',
		render,
		props: mergeProps(
			{
				className: cn(
					'text-base',
					withPadding && 'list-outside',
					icon ? 'list-none' : type === 'ordered' ? 'list-decimal' : 'list-disc',
					!withPadding && 'list-inside',
					className,
				),
				children: (
					<>
						{React.Children.map(children, (child) =>
							React.isValidElement(child)
								? React.cloneElement(child as React.ReactElement<any>, {
										// @ts-ignore
										icon: child.props.icon || icon,
										// @ts-ignore
										center: child.props.center || center,
									})
								: child,
						)}
					</>
				),
			},
			props,
		),
		state: {
			slot: 'list',
		},
	});

	return renderElement;
};
ListRoot.displayName = 'List';

export type ListItemProps = useRender.ComponentProps<'li'> & {
	icon?: React.ReactNode;
	center?: boolean;
};

const ListItem: React.FC<ListItemProps> = ({ className, children, render, icon, center, ...props }) => {
	const renderElement = useRender({
		defaultTagName: 'li',
		render,
		props: mergeProps(
			{
				className: cn(
					// If icon is present, we use flex to position it
					icon && 'flex items-start gap-2',
					center && 'items-center',
					className,
				),
				children: (
					<>
						{icon && <span className="shrink-0 leading-none mt-1.5">{icon}</span>}
						<span>{children}</span>
					</>
				),
			},
			props,
		),
		state: {
			slot: 'list-item',
		},
	});
	return renderElement;
};
ListItem.displayName = 'List.Item';

const List = Object.assign(ListRoot, { Item: ListItem });

export { List };
