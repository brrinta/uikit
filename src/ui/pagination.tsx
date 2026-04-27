import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

import { cn, cvaWithMeta } from '@uikit/lib/utils';
import { Button, buttonVariants } from '@uikit/ui/button';
import { type VariantProps } from 'class-variance-authority';

export const paginationVariants = cvaWithMeta('mx-auto flex justify-center', { variants: {}, defaultVariants: {} });
export const paginationContentVariants = cvaWithMeta('flex flex-row items-center gap-1', { variants: {}, defaultVariants: {} });
export const paginationEllipsisVariants = cvaWithMeta('flex size-7 items-center justify-center', { variants: {}, defaultVariants: {} });

export type PaginationProps = React.ComponentProps<'nav'> &
	VariantProps<typeof paginationVariants> & {
		totalPage: number;
		currentPage: number;
		onPageChange: (page: number) => void;
		/**
		 * Number of always‑visible pages at the start and end. Defaults to 1.
		 * Set to 0 to hide fixed boundaries.
		 */
		boundaries?: number;
	};

function Pagination({ className, totalPage, currentPage, onPageChange, boundaries = 1, ...props }: PaginationProps) {
	// Normalize inputs
	const tp = Math.max(1, Math.floor(totalPage || 1));
	const cp = Math.min(Math.max(1, Math.floor(currentPage || 1)), tp);
	const bd = Math.max(0, Math.floor(boundaries || 0));

	type Item = number | 'ellipsis';

	const items: Item[] = React.useMemo(() => {
		const set = new Set<number>();
		// First and last boundary blocks
		for (let i = 1; i <= Math.min(bd, tp); i++) set.add(i);
		for (let i = Math.max(1, tp - bd + 1); i <= tp; i++) set.add(i);
		// Current page and immediate neighbors
		[cp - 1, cp, cp + 1].forEach((p) => {
			if (p >= 1 && p <= tp) set.add(p);
		});

		const pages = Array.from(set).sort((a, b) => a - b);
		const result: Item[] = [];
		for (let i = 0; i < pages.length; i++) {
			const p = pages[i];
			if (i === 0) {
				result.push(p);
				continue;
			}
			const prev = pages[i - 1];
			if (p - prev === 1) {
				result.push(p);
			} else {
				result.push('ellipsis');
				result.push(p);
			}
		}
		return result;
	}, [tp, cp, bd]);

	const onClickPage = (page: number) => (e: React.MouseEvent) => {
		e.preventDefault();
		if (page !== cp) onPageChange(page);
	};

	const canPrev = cp > 1;
	const canNext = cp < tp;

	return (
		<nav
			role="navigation"
			aria-label="pagination"
			data-slot="pagination"
			className={cn(paginationVariants(), className)}
			{...props}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						aria-disabled={!canPrev}
						className={cn(!canPrev && 'pointer-events-none opacity-50')}
						onClick={(e) => {
							e.preventDefault();
							if (canPrev) onPageChange(cp - 1);
						}}
					/>
				</PaginationItem>

				{items.map((it, idx) => (
					<PaginationItem key={`${it}-${idx}`}>
						{it === 'ellipsis' ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								href="#"
								isActive={it === cp}
								aria-label={`Go to page ${it}`}
								onClick={onClickPage(it)}>
								{it}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						href="#"
						aria-disabled={!canNext}
						className={cn(!canNext && 'pointer-events-none opacity-50')}
						onClick={(e) => {
							e.preventDefault();
							if (canNext) onPageChange(cp + 1);
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</nav>
	);
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'> & VariantProps<typeof paginationContentVariants>) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn(paginationContentVariants(), className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
	return (
		<li
			data-slot="pagination-item"
			{...props}
		/>
	);
}

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
	React.ComponentProps<'a'>;

function PaginationLink({ className, isActive, size = 'icon', children, ...props }: PaginationLinkProps & { children?: React.ReactNode }) {
	const hasChildren = children !== undefined && children !== null && !(Array.isArray(children) && children.length === 0);
	return (
		<a
			aria-current={isActive ? 'page' : undefined}
			data-slot="pagination-link"
			data-active={isActive}
			className={cn(
				buttonVariants({
					variant: isActive ? 'outline' : 'ghost',
					size,
				}),
				className,
			)}
			{...props}>
			{hasChildren ? children : <span className="sr-only">Page</span>}
		</a>
	);
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="md"
			className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
			{...props}>
			<ChevronLeftIcon />
			{/*<span className="hidden sm:block">Previous</span>*/}
		</PaginationLink>
	);
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="md"
			className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
			{...props}>
			{/*<span className="hidden sm:block">Next</span>*/}
			<ChevronRightIcon />
		</PaginationLink>
	);
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'> & VariantProps<typeof paginationEllipsisVariants>) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn(paginationEllipsisVariants(), className)}
			{...props}>
			<MoreHorizontalIcon className="size-4" />
			<span className="sr-only">More pages</span>
		</span>
	);
}

// Compound export
type CompoundPagination = typeof Pagination & {
	Content: typeof PaginationContent;
	Item: typeof PaginationItem;
	Link: typeof PaginationLink;
	Previous: typeof PaginationPrevious;
	Next: typeof PaginationNext;
	Ellipsis: typeof PaginationEllipsis;
};
const PaginationComponent = Pagination as CompoundPagination;
PaginationComponent.Content = PaginationContent;
PaginationComponent.Item = PaginationItem;
PaginationComponent.Link = PaginationLink;
PaginationComponent.Previous = PaginationPrevious;
PaginationComponent.Next = PaginationNext;
PaginationComponent.Ellipsis = PaginationEllipsis;

export {
	PaginationComponent as Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
};
