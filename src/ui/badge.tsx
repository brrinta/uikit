import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps } from 'class-variance-authority';
import { cn, cvaWithMeta } from '@uikit/lib/utils';
import React from 'react';

export const badgeVariants = cvaWithMeta(
	`inline-flex relative items-center justify-center whitespace-nowrap border border-transparent font-medium focus:outline-hidden focus:ring-2
	focus:ring-ring focus:ring-offset-2 [&_svg]:-ms-px [&_svg]:shrink-0`,
	{
		variants: {
			variant: {
				primary: 'bg-primary text-primary-foreground',
				secondary: 'bg-secondary text-secondary-foreground',
				success: 'bg-success text-success-foreground',
				warning: 'bg-warning text-warning-foreground',
				info: 'bg-info text-info-foreground',
				outline: 'bg-transparent border border-border text-secondary-foreground',
				destructive: 'bg-destructive text-destructive-foreground',
				red: 'bg-red-500 text-white',
				orange: 'bg-orange-500 text-white',
				lime: 'bg-lime-500 text-black',
				green: 'bg-green-500 text-white',
				teal: 'bg-teal-500 text-white',
				cyan: 'bg-cyan-500 text-white',
				blue: 'bg-blue-500 text-white',
				indigo: 'bg-indigo-500 text-white',
				violet: 'bg-violet-500 text-white',
				rose: 'bg-rose-500 text-white',
				slate: 'bg-slate-500 text-white',
				gray: 'bg-gray-500 text-white',
				stone: 'bg-stone-500 text-white',
				zinc: 'bg-zinc-500 text-white',
				brand: 'bg-brand text-brand-foreground',
				accent: 'bg-accent text-accent-foreground',
				amber: 'bg-amber-500 text-white',
				emerald: 'bg-emerald-500 text-white',
				sky: 'bg-sky-500 text-white',
				purple: 'bg-purple-500 text-white',
				fuchsia: 'bg-fuchsia-500 text-white',
				pink: 'bg-pink-500 text-white',
				neutral: 'bg-neutral-500 text-white',
			},
			appearance: { default: '', light: '', outline: '', ghost: 'border-transparent bg-transparent', dot: 'border-transparent bg-transparent' },
			disabled: { true: 'opacity-50 pointer-events-none' },
			size: {
				lg: 'rounded-md px-2 h-7 min-w-7 gap-1.5 text-xs [&_svg]:size-3.5',
				md: 'rounded-md px-[0.45rem] h-6 min-w-6 gap-1.5 text-xs [&_svg]:size-3.5',
				sm: 'rounded-sm px-[0.325rem] h-5 min-w-5 gap-1 text-[0.6875rem] leading-3 [&_svg]:size-3',
				xs: 'rounded-sm px-1 h-4 min-w-4 gap-1 text-[0.625rem] leading-2 [&_svg]:size-3',
			},
			shape: { default: '', circle: 'rounded-full' },
			radius: {
				none: 'rounded-none',
				sm: 'rounded-sm',
				md: 'rounded-md',
				lg: 'rounded-lg',
				xl: 'rounded-xl',
				'2xl': 'rounded-2xl',
				'3xl': 'rounded-3xl',
				full: 'rounded-full',
			},
		},
		compoundVariants: [
			/* Light */
			{
				variant: 'primary',
				appearance: 'light',
				className: [
					'text-(--color-primary-accent,var(--color-blue-700))',
					'bg-(--color-primary-soft,var(--color-blue-50))',
					'dark:bg-(--color-primary-soft,var(--color-blue-950))',
					'dark:text-(--color-primary-soft,var(--color-blue-600))',
				].join(' '),
			},
			{
				variant: 'secondary',
				appearance: 'light',
				className: 'bg-secondary dark:bg-secondary/50 text-secondary-foreground',
			},
			{
				variant: 'success',
				appearance: 'light',
				className: 'bg-success-muted text-success',
			},
			{
				variant: 'warning',
				appearance: 'light',
				className: 'bg-warning-muted text-warning',
			},
			{
				variant: 'info',
				appearance: 'light',
				className: 'bg-info-muted text-info',
			},
			{
				variant: 'destructive',
				appearance: 'light',
				className: 'bg-destructive-muted text-destructive',
			},
			{ variant: 'red', appearance: 'light', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
			{ variant: 'orange', appearance: 'light', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
			{ variant: 'lime', appearance: 'light', className: 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400' },
			{ variant: 'green', appearance: 'light', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
			{ variant: 'teal', appearance: 'light', className: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' },
			{ variant: 'cyan', appearance: 'light', className: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
			{ variant: 'blue', appearance: 'light', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
			{ variant: 'blue', appearance: 'light', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
			{ variant: 'indigo', appearance: 'light', className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' },
			{ variant: 'violet', appearance: 'light', className: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400' },
			{ variant: 'rose', appearance: 'light', className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' },
			{ variant: 'slate', appearance: 'light', className: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400' },
			{ variant: 'gray', appearance: 'light', className: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' },
			{ variant: 'stone', appearance: 'light', className: 'bg-stone-100 text-stone-700 dark:bg-stone-900/30 dark:text-stone-400' },
			{ variant: 'zinc', appearance: 'light', className: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-900/30 dark:text-zinc-400' },
			{ variant: 'brand', appearance: 'light', className: 'bg-brand/10 text-brand' },
			{ variant: 'accent', appearance: 'light', className: 'bg-accent-soft text-accent-foreground' },
			{ variant: 'amber', appearance: 'light', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
			{ variant: 'emerald', appearance: 'light', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
			{ variant: 'sky', appearance: 'light', className: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400' },
			{ variant: 'purple', appearance: 'light', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
			{ variant: 'fuchsia', appearance: 'light', className: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-400' },
			{ variant: 'pink', appearance: 'light', className: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' },
			{ variant: 'neutral', appearance: 'light', className: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-900/30 dark:text-neutral-400' },
			/* Outline */
			{
				variant: 'primary',
				appearance: 'outline',
				className: [
					'text-(--color-primary-accent,var(--color-blue-700))',
					'border-(--color-primary-soft,var(--color-blue-100))',
					'bg-(--color-primary-soft,var(--color-blue-50))',
					'dark:bg-(--color-primary-soft,var(--color-blue-950))',
					'dark:border-(--color-primary-soft,var(--color-blue-900))',
					'dark:text-(--color-primary-soft,var(--color-blue-600))',
				].join(' '),
			},
			{
				variant: 'success',
				appearance: 'outline',
				className: 'text-success border-success/30 bg-success-muted',
			},
			{
				variant: 'warning',
				appearance: 'outline',
				className: 'text-warning border-warning/30 bg-warning-muted',
			},
			{
				variant: 'info',
				appearance: 'outline',
				className: 'text-info border-info/30 bg-info-muted',
			},
			{
				variant: 'destructive',
				appearance: 'outline',
				className: 'text-destructive border-destructive/30 bg-destructive-muted',
			},
			{ variant: 'red', appearance: 'outline', className: 'text-red-600 border-red-500/30 bg-red-50 dark:bg-red-950/30 dark:text-red-400' },
			{
				variant: 'orange',
				appearance: 'outline',
				className: 'text-orange-600 border-orange-500/30 bg-orange-50 dark:bg-orange-950/30 dark:text-orange-400',
			},
			{ variant: 'lime', appearance: 'outline', className: 'text-lime-600 border-lime-500/30 bg-lime-50 dark:bg-lime-950/30 dark:text-lime-400' },
			{
				variant: 'green',
				appearance: 'outline',
				className: 'text-green-600 border-green-500/30 bg-green-50 dark:bg-green-950/30 dark:text-green-400',
			},
			{ variant: 'teal', appearance: 'outline', className: 'text-teal-600 border-teal-500/30 bg-teal-50 dark:bg-teal-950/30 dark:text-teal-400' },
			{ variant: 'cyan', appearance: 'outline', className: 'text-cyan-600 border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/30 dark:text-cyan-400' },
			{ variant: 'blue', appearance: 'outline', className: 'text-blue-600 border-blue-500/30 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400' },
			{ variant: 'blue', appearance: 'outline', className: 'text-blue-600 border-blue-500/30 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400' },
			{
				variant: 'indigo',
				appearance: 'outline',
				className: 'text-indigo-600 border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400',
			},
			{
				variant: 'violet',
				appearance: 'outline',
				className: 'text-violet-600 border-violet-500/30 bg-violet-50 dark:bg-violet-950/30 dark:text-violet-400',
			},
			{ variant: 'rose', appearance: 'outline', className: 'text-rose-600 border-rose-500/30 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400' },
			{
				variant: 'slate',
				appearance: 'outline',
				className: 'text-slate-600 border-slate-500/30 bg-slate-50 dark:bg-slate-950/30 dark:text-slate-400',
			},
			{ variant: 'gray', appearance: 'outline', className: 'text-gray-600 border-gray-500/30 bg-gray-50 dark:bg-gray-950/30 dark:text-gray-400' },
			{
				variant: 'stone',
				appearance: 'outline',
				className: 'text-stone-600 border-stone-500/30 bg-stone-50 dark:bg-stone-950/30 dark:text-stone-400',
			},
			{ variant: 'zinc', appearance: 'outline', className: 'text-zinc-600 border-zinc-500/30 bg-zinc-50 dark:bg-zinc-950/30 dark:text-zinc-400' },
			{ variant: 'brand', appearance: 'outline', className: 'text-brand border-brand/30 bg-brand/5' },
			{ variant: 'accent', appearance: 'outline', className: 'text-accent-foreground border-accent-alpha bg-accent-soft' },
			{
				variant: 'amber',
				appearance: 'outline',
				className: 'text-amber-600 border-amber-500/30 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400',
			},
			{
				variant: 'emerald',
				appearance: 'outline',
				className: 'text-emerald-600 border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400',
			},
			{ variant: 'sky', appearance: 'outline', className: 'text-sky-600 border-sky-500/30 bg-sky-50 dark:bg-sky-950/30 dark:text-sky-400' },
			{
				variant: 'purple',
				appearance: 'outline',
				className: 'text-purple-600 border-purple-500/30 bg-purple-50 dark:bg-purple-950/30 dark:text-purple-400',
			},
			{
				variant: 'fuchsia',
				appearance: 'outline',
				className: 'text-fuchsia-600 border-fuchsia-500/30 bg-fuchsia-50 dark:bg-fuchsia-950/30 dark:text-fuchsia-400',
			},
			{ variant: 'pink', appearance: 'outline', className: 'text-pink-600 border-pink-500/30 bg-pink-50 dark:bg-pink-950/30 dark:text-pink-400' },
			{
				variant: 'neutral',
				appearance: 'outline',
				className: 'text-neutral-600 border-neutral-500/30 bg-neutral-50 dark:bg-neutral-950/30 dark:text-neutral-400',
			},
			/* Ghost */
			{
				variant: 'primary',
				appearance: ['ghost', 'dot'],
				className: 'text-primary',
			},
			{
				variant: 'secondary',
				appearance: ['ghost', 'dot'],
				className: 'text-secondary-foreground',
			},
			{
				variant: 'success',
				appearance: ['ghost', 'dot'],
				className: 'text-success',
			},
			{
				variant: 'warning',
				appearance: ['ghost', 'dot'],
				className: 'text-warning',
			},
			{
				variant: 'info',
				appearance: ['ghost', 'dot'],
				className: 'text-info',
			},
			{
				variant: 'destructive',
				appearance: ['ghost', 'dot'],
				className: 'text-destructive',
			},
			{ variant: 'red', appearance: ['ghost', 'dot'], className: 'text-red-600 dark:text-red-400' },
			{ variant: 'orange', appearance: ['ghost', 'dot'], className: 'text-orange-600 dark:text-orange-400' },
			{ variant: 'lime', appearance: ['ghost', 'dot'], className: 'text-lime-600 dark:text-lime-400' },
			{ variant: 'green', appearance: ['ghost', 'dot'], className: 'text-green-600 dark:text-green-400' },
			{ variant: 'teal', appearance: ['ghost', 'dot'], className: 'text-teal-600 dark:text-teal-400' },
			{ variant: 'cyan', appearance: ['ghost', 'dot'], className: 'text-cyan-600 dark:text-cyan-400' },
			{ variant: 'blue', appearance: ['ghost', 'dot'], className: 'text-blue-600 dark:text-blue-400' },
			{ variant: 'indigo', appearance: ['ghost', 'dot'], className: 'text-indigo-600 dark:text-indigo-400' },
			{ variant: 'violet', appearance: ['ghost', 'dot'], className: 'text-violet-600 dark:text-violet-400' },
			{ variant: 'rose', appearance: ['ghost', 'dot'], className: 'text-rose-600 dark:text-rose-400' },
			{ variant: 'slate', appearance: ['ghost', 'dot'], className: 'text-slate-600 dark:text-slate-400' },
			{ variant: 'gray', appearance: ['ghost', 'dot'], className: 'text-gray-600 dark:text-gray-400' },
			{ variant: 'stone', appearance: ['ghost', 'dot'], className: 'text-stone-600 dark:text-stone-400' },
			{ variant: 'zinc', appearance: ['ghost', 'dot'], className: 'text-zinc-600 dark:text-zinc-400' },
			{ variant: 'brand', appearance: ['ghost', 'dot'], className: 'text-brand' },
			{ variant: 'accent', appearance: ['ghost', 'dot'], className: 'text-accent-foreground' },
			{ variant: 'amber', appearance: ['ghost', 'dot'], className: 'text-amber-600 dark:text-amber-400' },
			{ variant: 'emerald', appearance: ['ghost', 'dot'], className: 'text-emerald-600 dark:text-emerald-400' },
			{ variant: 'sky', appearance: ['ghost', 'dot'], className: 'text-sky-600 dark:text-sky-400' },
			{ variant: 'purple', appearance: ['ghost', 'dot'], className: 'text-purple-600 dark:text-purple-400' },
			{ variant: 'fuchsia', appearance: ['ghost', 'dot'], className: 'text-fuchsia-600 dark:text-fuchsia-400' },
			{ variant: 'pink', appearance: ['ghost', 'dot'], className: 'text-pink-600 dark:text-pink-400' },
			{ variant: 'neutral', appearance: ['ghost', 'dot'], className: 'text-neutral-600 dark:text-neutral-400' },
			{ size: 'lg', appearance: ['ghost', 'dot'], className: 'px-0' },
			{ size: 'md', appearance: ['ghost', 'dot'], className: 'px-0' },
			{ size: 'sm', appearance: ['ghost', 'dot'], className: 'px-0' },
			{ size: 'xs', appearance: ['ghost', 'dot'], className: 'px-0' },
		],
		defaultVariants: { variant: 'primary', appearance: 'default', size: 'md' },
	},
);

export const badgeButtonVariants = cvaWithMeta(
	[
		'cursor-pointer',
		'transition-all',
		'inline-flex items-center justify-center',
		'leading-none',
		'size-3.5',
		'[&>svg]:opacity-100!',
		'[&>svg]:size-3.5!',
		'p-0 rounded-md -me-0.5',
		'opacity-60 hover:opacity-100',
	].join(' '),
);

type BadgeProps = useRender.ComponentProps<'span'> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean; withDot?: boolean; dotProps?: BadgeDotProps };

const Badge: React.FC<BadgeProps> = ({
	className,
	variant,
	appearance,
	size,
	shape,
	radius,
	render,
	withDot,
	dotProps,
	disabled,
	children,
	...props
}) => {
	return useRender({
		defaultTagName: 'span',
		props: mergeProps<'span'>(
			{
				className: cn(badgeVariants({ variant, appearance, size, shape, radius, disabled }), className),
				children: (
					<>
						{withDot || appearance === 'dot' ? <BadgeDot {...dotProps} /> : null}
						{children}
					</>
				),
			},
			props,
		),
		render,
		state: {
			slot: 'badge',
			variant,
		},
	});
};

function BadgeButton({ className, render, ...props }: useRender.ComponentProps<'span'> & VariantProps<typeof badgeButtonVariants>) {
	return useRender({
		defaultTagName: 'span',
		props: mergeProps<'span'>(
			{
				className: cn(badgeButtonVariants(), className),
			},
			props,
		),
		render,
		state: {
			slot: 'badge-button',
		},
	});
}

export type BadgeDotProps = React.ComponentProps<'span'>;
function BadgeDot({ className, ...props }: BadgeDotProps) {
	return (
		<span
			data-slot="badge-dot"
			className={cn('size-1.5 rounded-full bg-[currentColor] opacity-75', className)}
			{...props}
		/>
	);
}

type CompoundBadge = typeof Badge & { Button: typeof BadgeButton; Dot: typeof BadgeDot };
const BadgeComponent = Badge as CompoundBadge;
BadgeComponent.Button = BadgeButton;
BadgeComponent.Dot = BadgeDot;
export { BadgeComponent as Badge, BadgeButton, BadgeDot, BadgeProps };
