import * as React from 'react';
import { cn, cvaWithMeta } from '@uikit/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';
import { Link, type LinkProps } from '@tanstack/react-router';

export const anchorVariants = cvaWithMeta(
	'inline-flex items-center gap-1 cursor-pointer transition-colors [&_svg:not([class*=size-])]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			color: {
				primary: 'text-primary hover:text-primary/80',
				brand: 'text-brand hover:text-brand/80',
				success: 'text-success hover:text-success/80',
				warning: 'text-warning hover:text-warning/80',
				info: 'text-info hover:text-info/80',
				destructive: 'text-destructive hover:text-destructive/80',
				accent: 'text-accent-foreground hover:text-accent-foreground/80',
				secondary: 'text-secondary hover:text-secondary/80',
				foreground: 'text-foreground hover:text-foreground/80',
				muted: 'text-muted-foreground hover:text-foreground',
				inherit: 'text-inherit hover:opacity-80',
				red: 'text-red-500 hover:text-red-600',
				orange: 'text-orange-500 hover:text-orange-600',
				amber: 'text-amber-500 hover:text-amber-600',
				yellow: 'text-yellow-500 hover:text-yellow-600',
				lime: 'text-lime-500 hover:text-lime-600',
				green: 'text-green-500 hover:text-green-600',
				emerald: 'text-emerald-500 hover:text-emerald-600',
				teal: 'text-teal-500 hover:text-teal-600',
				cyan: 'text-cyan-500 hover:text-cyan-600',
				sky: 'text-sky-500 hover:text-sky-600',
				blue: 'text-blue-500 hover:text-blue-600',
				indigo: 'text-indigo-500 hover:text-indigo-600',
				violet: 'text-violet-500 hover:text-violet-600',
				purple: 'text-purple-500 hover:text-purple-600',
				fuchsia: 'text-fuchsia-500 hover:text-fuchsia-600',
				pink: 'text-pink-500 hover:text-pink-600',
				rose: 'text-rose-500 hover:text-rose-600',
				slate: 'text-slate-500 hover:text-slate-600',
				gray: 'text-gray-500 hover:text-gray-600',
				zinc: 'text-zinc-500 hover:text-zinc-600',
				neutral: 'text-neutral-500 hover:text-neutral-600',
				stone: 'text-stone-500 hover:text-stone-600',
				white: 'text-white hover:text-white/80',
				black: 'text-black hover:text-black/80',
			},
			size: {
				xs: 'text-xs',
				sm: 'text-sm',
				md: 'text-base',
				lg: 'text-lg',
				xl: 'text-xl',
				inherit: '',
			},
			underline: {
				always: 'underline underline-offset-2',
				hover: 'hover:underline underline-offset-2',
				none: 'no-underline',
			},
			weight: {
				normal: 'font-normal',
				medium: 'font-medium',
				semibold: 'font-semibold',
				bold: 'font-bold',
				inherit: '',
			},
		},
		defaultVariants: {
			color: 'primary',
			size: 'inherit',
			underline: 'hover',
			weight: 'inherit',
		},
	},
);

export type AnchorVariantProps = VariantProps<typeof anchorVariants>;

export type AnchorProps = useRender.ComponentProps<'a'> & AnchorVariantProps & LinkProps;

const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(({ className, color, size, underline, weight, render, children, ...props }, ref) => {
	return useRender({
		// @ts-ignore
		defaultTagName: props.to ? Link : 'a',
		render,
		ref,
		state: {
			slot: 'anchor',
		},
		props: mergeProps(
			{
				className: cn(anchorVariants({ color, size, underline, weight }), className),
				children,
			},
			props,
		),
	});
});

Anchor.displayName = 'Anchor';

export { Anchor };
