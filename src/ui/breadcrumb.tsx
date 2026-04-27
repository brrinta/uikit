import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cn, cvaWithMeta } from '../lib/utils';
import { ChevronRightIcon, DotSquareIcon } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';

export const breadcrumbListVariants = cvaWithMeta('text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5', {
	variants: {},
	defaultVariants: {},
});
export const breadcrumbItemVariants = cvaWithMeta('inline-flex items-center gap-1.5', { variants: {}, defaultVariants: {} });
export const breadcrumbLinkVariants = cvaWithMeta('hover:text-foreground transition-colors', { variants: {}, defaultVariants: {} });
export const breadcrumbPageVariants = cvaWithMeta('text-foreground font-normal', { variants: {}, defaultVariants: {} });
export const breadcrumbSeparatorVariants = cvaWithMeta('[&>svg]:size-3.5', { variants: {}, defaultVariants: {} });
export const breadcrumbEllipsisVariants = cvaWithMeta('flex size-9 items-center justify-center', { variants: {}, defaultVariants: {} });

function Breadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			aria-label="breadcrumb"
			data-slot="breadcrumb"
			className={cn(className)}
			{...props}
		/>
	);
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'> & VariantProps<typeof breadcrumbListVariants>) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(breadcrumbListVariants(), className)}
			{...props}
		/>
	);
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'> & VariantProps<typeof breadcrumbItemVariants>) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn(breadcrumbItemVariants(), className)}
			{...props}
		/>
	);
}

function BreadcrumbLink({ className, render, ...props }: useRender.ComponentProps<'a'> & VariantProps<typeof breadcrumbLinkVariants>) {
	return useRender({
		defaultTagName: 'a',
		props: mergeProps<'a'>(
			{
				className: cn(breadcrumbLinkVariants(), className),
			},
			props,
		),
		render,
		state: {
			slot: 'breadcrumb-link',
		},
	});
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'> & VariantProps<typeof breadcrumbPageVariants>) {
	return (
		<span
			data-slot="breadcrumb-page"
			role="link"
			aria-disabled="true"
			aria-current="page"
			className={cn(breadcrumbPageVariants(), className)}
			{...props}
		/>
	);
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'> & VariantProps<typeof breadcrumbSeparatorVariants>) {
	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			className={cn(breadcrumbSeparatorVariants(), className)}
			{...props}>
			{children ?? <ChevronRightIcon />}
		</li>
	);
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'> & VariantProps<typeof breadcrumbEllipsisVariants>) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			className={cn(breadcrumbEllipsisVariants(), className)}
			{...props}>
			<DotSquareIcon className="size-4" />
			<span className="sr-only">More</span>
		</span>
	);
}

type CompoundBreadcrumb = typeof Breadcrumb & {
	List: typeof BreadcrumbList;
	Item: typeof BreadcrumbItem;
	Link: typeof BreadcrumbLink;
	Page: typeof BreadcrumbPage;
	Separator: typeof BreadcrumbSeparator;
	Ellipsis: typeof BreadcrumbEllipsis;
};

const BreadcrumbComponent = Breadcrumb as CompoundBreadcrumb;
BreadcrumbComponent.List = BreadcrumbList;
BreadcrumbComponent.Item = BreadcrumbItem;
BreadcrumbComponent.Link = BreadcrumbLink;
BreadcrumbComponent.Page = BreadcrumbPage;
BreadcrumbComponent.Separator = BreadcrumbSeparator;
BreadcrumbComponent.Ellipsis = BreadcrumbEllipsis;

export { BreadcrumbComponent as Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis };
