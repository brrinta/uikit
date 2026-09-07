'use client';

import * as React from 'react';
import { useId } from 'react';
import { cn, cvaWithMeta } from '../lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { Flex } from './flex';
import { Label } from './label';

/** Colors set `--sw`; checked background and the permanent-mode on-label read it. */
export const switchColors = {
	primary: '[--sw:var(--color-primary)]',
	brand: '[--sw:var(--color-brand)]',
	success: '[--sw:var(--color-success)]',
	warning: '[--sw:var(--color-warning)]',
	info: '[--sw:var(--color-info)]',
	destructive: '[--sw:var(--color-destructive)]',
	accent: '[--sw:var(--color-accent)]',
	mono: '[--sw:var(--color-zinc-950)] dark:[--sw:var(--color-zinc-300)]',
	red: '[--sw:var(--color-red-500)]',
	orange: '[--sw:var(--color-orange-500)]',
	amber: '[--sw:var(--color-amber-500)]',
	yellow: '[--sw:var(--color-yellow-500)]',
	lime: '[--sw:var(--color-lime-500)]',
	green: '[--sw:var(--color-green-500)]',
	emerald: '[--sw:var(--color-emerald-500)]',
	teal: '[--sw:var(--color-teal-500)]',
	cyan: '[--sw:var(--color-cyan-500)]',
	sky: '[--sw:var(--color-sky-500)]',
	blue: '[--sw:var(--color-blue-500)]',
	indigo: '[--sw:var(--color-indigo-500)]',
	violet: '[--sw:var(--color-violet-500)]',
	purple: '[--sw:var(--color-purple-500)]',
	fuchsia: '[--sw:var(--color-fuchsia-500)]',
	pink: '[--sw:var(--color-pink-500)]',
	rose: '[--sw:var(--color-rose-500)]',
} as const;

export type SwitchColor = keyof typeof switchColors;

export const switchVariants = cvaWithMeta(
	`
    relative peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-hidden focus-visible:ring-2
    focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50
    data-unchecked:bg-input data-checked:bg-(--sw) aria-invalid:border aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10
    dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20 in-data-[invalid=true]:border
    in-data-[invalid=true]:border-destructive/60 in-data-[invalid=true]:ring-destructive/10
    dark:in-data-[invalid=true]:border-destructive dark:in-data-[invalid=true]:ring-destructive/20
  `,
	{
		variants: {
			shape: {
				pill: 'rounded-full',
				square: 'rounded-md',
			},
			size: {
				sm: 'h-5 w-8',
				md: 'h-6 w-10',
				lg: 'h-8 w-14',
				xl: 'h-9 w-16',
			},
			permanent: {
				true: 'bg-input',
				false: '',
			},
			color: switchColors,
		},
		defaultVariants: {
			shape: 'pill',
			permanent: false,
			size: 'md',
			color: 'primary',
		},
	},
);

export const switchThumbVariants = cvaWithMeta(
	`pointer-events-none flex items-center justify-center bg-white w-[calc(50%-2px)] h-[calc(100%-4px)] shadow-lg ring-0 transition-transform start-0
	 data-unchecked:translate-x-0.5 data-checked:translate-x-[calc(100%+2px)] rtl:data-unchecked:-translate-x-0.5
	 rtl:data-checked:-translate-x-[calc(100%+2px)]`,
	{
		variants: {
			shape: {
				pill: 'rounded-full',
				square: 'rounded-md',
			},
			size: {
				xs: '',
				sm: '',
				md: '',
				lg: '',
				xl: '',
			},
		},
		compoundVariants: [
			{
				shape: 'square',
				size: 'xs',
				className: 'rounded-sm',
			},
		],
		defaultVariants: {
			shape: 'pill',
			size: 'md',
		},
	},
);

function Switch({
	className,
	thumbClassName = '',
	shape = 'square',
	size,
	color,
	permanent,
	label,
	thumbLabel,
	onLabel,
	offLabel,
	classNames,
	...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> &
	VariantProps<typeof switchVariants> & {
		thumbClassName?: string;
		label?: string;
		thumbLabel?: React.ReactNode;
		onLabel?: React.ReactNode;
		offLabel?: React.ReactNode;
		classNames?: { wrapper?: string; indicator?: string; label?: string; onLabel?: string; offLabel?: string };
	}) {
	const id = useId();

	const switchElement = (
		<SwitchPrimitive.Root
			data-slot="switch"
			data-shape={shape}
			data-color={color ?? 'primary'}
			data-size={size}
			id={label ? id : undefined}
			className={cn('group', switchVariants({ shape, size, color, permanent }), label ? classNames?.indicator : className)}
			{...props}>
			{onLabel && (
				<span
					className={cn(
						`absolute left-2.5 top-0 bottom-0 flex items-center text-[11px] font-extrabold uppercase select-none pointer-events-none
						transition-all duration-200`,
						permanent ? 'text-(--sw)' : 'text-primary-foreground',
						'group-data-unchecked:-translate-x-1 group-data-unchecked:opacity-0',
						classNames?.onLabel,
					)}>
					{onLabel}
				</span>
			)}
			{offLabel && (
				<span
					className={cn(
						`absolute right-2.5 top-0 bottom-0 flex items-center text-[11px] font-extrabold uppercase select-none pointer-events-none
						transition-all duration-200`,
						'text-muted-foreground',
						'group-data-checked:translate-x-1 group-data-checked:opacity-0',
						classNames?.offLabel,
					)}>
					{offLabel}
				</span>
			)}
			<SwitchPrimitive.Thumb
				data-slot={'switch-thumb'}
				className={cn(switchThumbVariants({ shape, size }), thumbClassName)}>
				{thumbLabel}
			</SwitchPrimitive.Thumb>
		</SwitchPrimitive.Root>
	);

	return label ? (
		<Flex className={cn('relative inline-flex items-center gap-2', className)}>
			{switchElement}
			<Label
				htmlFor={id}
				className={classNames?.label}>
				{label}
			</Label>
		</Flex>
	) : (
		switchElement
	);
}

export { Switch };
