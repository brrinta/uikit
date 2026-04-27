import { LucideOctagonAlert } from 'lucide-react';
import { ReactNode } from 'react';
import { Empty } from '../ui/empty';
import { cn } from '../lib/utils';
export const EmptyComponent = ({
	description,
	title,
	children,
	classNames,
	className,
	...props
}: {
	description?: string;
	title?: string;
	children?: ReactNode;
	classNames?: {
		root?: string;
		header?: string;
		media?: string;
		title?: string;
		description?: string;
		content?: string;
	};
} & React.ComponentProps<'div'>) => {
	return (
		<Empty
			{...props}
			className={cn(classNames?.root, className)}>
			<Empty.Header className={classNames?.header}>
				<Empty.Media
					variant="default"
					className={classNames?.media}>
					<LucideOctagonAlert
						className={'size-10'}
						color={'red'}
					/>
				</Empty.Media>
				<Empty.Title className={classNames?.title}>{title || 'No data found!'}</Empty.Title>
				<Empty.Description className={classNames?.description}>{description || ''}</Empty.Description>
			</Empty.Header>
			{children && <Empty.Content className={classNames?.content}>{children}</Empty.Content>}
		</Empty>
	);
};
