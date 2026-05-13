import { ReactNode } from 'react';
import { Text, TextProps } from '../ui/text';
import { Title, TitleProps } from '../ui/title';
import { Flex } from '../ui/flex';
import { Group, GroupProps } from '../ui/group';
import { IconPointFilled, IconProps } from '@tabler/icons-react';
import { cn } from '../lib/utils';

export interface InfoItemProps extends Omit<GroupProps, 'children' | 'title'> {
	/** Main label */
	title: ReactNode;
	/** Secondary text (formerly subtitle/description) */
	description?: ReactNode;
	/** Content to render after description */
	children?: ReactNode;

	/** Display a dot icon (DotItem behavior) */
	withDot?: boolean;
	/** Custom icon node to replace the dot */
	icon?: ReactNode;

	/** Suffix for the title (default: ":"). Pass `null` or `false` to remove. */
	separator?: ReactNode | boolean;

	/** Layout direction. 'horizontal' matches DotItem/inline AppListItem. 'vertical' matches default AppListItem. */
	orientation?: 'horizontal' | 'vertical';

	/** Props passed to internal elements */
	titleProps?: Omit<TitleProps, 'children'>;
	descriptionProps?: Omit<TextProps, 'children'>;
	iconProps?: IconProps;

	/** granular styles */
	classNames?: {
		root?: string;
		wrapper?: string;
		titleWrapper?: string;
		title?: string;
		description?: string;
		icon?: string;
		separator?: string;
	};
}

export const InfoItem = ({
	title,
	description,
	children,
	withDot = false,
	icon,
	separator = ':',
	orientation = 'vertical',
	className,
	classNames,
	titleProps,
	descriptionProps,
	iconProps,
	...props
}: InfoItemProps) => {
	// Determine the Icon
	const finalIcon =
		icon ||
		(withDot ? (
			<IconPointFilled
				className="size-3"
				{...iconProps}
			/>
		) : null);

	// Determine Separator
	const separatorNode = !separator ? null : <span className={cn('ml-px', classNames?.separator)}>{separator === true ? ':' : separator}</span>;

	const isHorizontal = orientation === 'horizontal';

	return (
		<Group
			className={cn('grow', { 'items-center': isHorizontal, 'items-start': !isHorizontal }, className, classNames?.root)}
			{...props}>
			<Flex
				className={cn(
					'w-full',
					{
						'flex-row gap-2 items-center': isHorizontal,
						'flex-col': !isHorizontal,
					},
					classNames?.wrapper,
				)}>
				<Group className={cn('items-center whitespace-nowrap gap-2', classNames?.titleWrapper)}>
					{finalIcon && <span className={cn('flex items-center', classNames?.icon)}>{finalIcon}</span>}
					<Title
						order={6}
						className={cn('text-primary my-auto', classNames?.title)}
						{...titleProps}>
						{title}
						{separatorNode}
					</Title>
				</Group>

				{(description || children) && (
					<Text
						render={<div />}
						className={cn('text-sm text-muted-foreground pl-4', classNames?.description)}
						{...descriptionProps}>
						{description}
						{children}
					</Text>
				)}
			</Flex>
		</Group>
	);
};
