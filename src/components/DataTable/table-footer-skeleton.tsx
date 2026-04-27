import { Flex } from '@uikit/ui/flex';
import { cn } from '@uikit/lib/utils';
import { Skeleton } from '@uikit/ui/skeleton';

export const TableFooterSkeleton = ({ plain }: { plain?: boolean }) => {
	return (
		<Flex
			className={cn('items-center gap-2 w-full', {
				'justify-center': plain,
				'justify-between': !plain,
			})}>
			{!plain && (
				<Flex className={'gap-2'}>
					<Skeleton className={'w-20 h-7 rounded-sm'} />
				</Flex>
			)}
			<Flex className={'gap-2 items-center'}>
				<Skeleton className={'w-20 h-4 rounded-sm'} />
				<Skeleton className={'w-28 h-3 rounded-sm'} />
			</Flex>
			{!plain && (
				<Flex className={'gap-2'}>
					<Skeleton className={'w-7 h-7 rounded-sm'} />
					<Skeleton className={'w-7 h-7 rounded-sm'} />
					<Skeleton className={'w-7 h-7 rounded-sm'} />
					<Skeleton className={'w-7 h-7 rounded-sm'} />
				</Flex>
			)}
		</Flex>
	);
};
