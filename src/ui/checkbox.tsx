import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group';
import * as React from 'react';
import { ReactNode, useId } from 'react';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { type VariantProps } from 'class-variance-authority';
import { cn, cvaWithMeta } from '../lib/utils';
import { Flex } from './flex';
import { Label } from './label';

/**
 * Each color sets two CSS variables; the checked/indeterminate styles read them.
 * NOTE: Base UI emits `data-checked` / `data-indeterminate` / `data-unchecked`
 * (not Radix's `data-[state=checked]`).
 */
export const checkboxColors = {
	primary: '[--cb:var(--color-primary)] [--cb-fg:var(--color-primary-foreground)]',
	brand: '[--cb:var(--color-brand)] [--cb-fg:var(--color-brand-foreground)]',
	secondary: '[--cb:var(--color-secondary)] [--cb-fg:var(--color-secondary-foreground)]',
	accent: '[--cb:var(--color-accent)] [--cb-fg:var(--color-accent-foreground)]',
	destructive: '[--cb:var(--color-destructive)] [--cb-fg:var(--color-destructive-foreground)]',
	success: '[--cb:var(--color-success)] [--cb-fg:var(--color-success-foreground)]',
	warning: '[--cb:var(--color-warning)] [--cb-fg:var(--color-warning-foreground)]',
	info: '[--cb:var(--color-info)] [--cb-fg:var(--color-info-foreground)]',
	mono: '[--cb:var(--color-zinc-950)] [--cb-fg:var(--color-white)] dark:[--cb:var(--color-zinc-300)] dark:[--cb-fg:var(--color-black)]',
	red: '[--cb:var(--color-red-500)] [--cb-fg:var(--color-white)]',
	orange: '[--cb:var(--color-orange-500)] [--cb-fg:var(--color-white)]',
	amber: '[--cb:var(--color-amber-500)] [--cb-fg:var(--color-white)]',
	yellow: '[--cb:var(--color-yellow-500)] [--cb-fg:var(--color-black)]',
	lime: '[--cb:var(--color-lime-500)] [--cb-fg:var(--color-black)]',
	green: '[--cb:var(--color-green-500)] [--cb-fg:var(--color-white)]',
	emerald: '[--cb:var(--color-emerald-500)] [--cb-fg:var(--color-white)]',
	teal: '[--cb:var(--color-teal-500)] [--cb-fg:var(--color-white)]',
	cyan: '[--cb:var(--color-cyan-500)] [--cb-fg:var(--color-black)]',
	sky: '[--cb:var(--color-sky-500)] [--cb-fg:var(--color-white)]',
	blue: '[--cb:var(--color-blue-500)] [--cb-fg:var(--color-white)]',
	indigo: '[--cb:var(--color-indigo-500)] [--cb-fg:var(--color-white)]',
	violet: '[--cb:var(--color-violet-500)] [--cb-fg:var(--color-white)]',
	purple: '[--cb:var(--color-purple-500)] [--cb-fg:var(--color-white)]',
	fuchsia: '[--cb:var(--color-fuchsia-500)] [--cb-fg:var(--color-white)]',
	pink: '[--cb:var(--color-pink-500)] [--cb-fg:var(--color-white)]',
	rose: '[--cb:var(--color-rose-500)] [--cb-fg:var(--color-white)]',
} as const;

export type CheckboxColor = keyof typeof checkboxColors;

export const checkboxVariants = cvaWithMeta(
	[
		'group peer flex shrink-0 items-center justify-center rounded-md border border-input bg-background',
		'ring-offset-background transition-colors [&_svg]:transition-colors',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
		'disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50',
		'aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20',
		'in-data-[invalid=true]:border-destructive/60 in-data-[invalid=true]:ring-destructive/10',
		'dark:in-data-[invalid=true]:border-destructive dark:in-data-[invalid=true]:ring-destructive/20',
		'data-checked:border-(--cb) data-checked:bg-(--cb) data-checked:text-(--cb-fg)',
		'data-indeterminate:border-(--cb) data-indeterminate:bg-(--cb) data-indeterminate:text-(--cb-fg)',
	],
	{
		variants: {
			size: {
				sm: 'size-4.5 [&_svg]:size-3',
				md: 'size-5 [&_svg]:size-3.5',
				lg: 'size-5.5 [&_svg]:size-4',
			},
			color: checkboxColors,
		},
		defaultVariants: {
			size: 'md',
			color: 'primary',
		},
	},
);

export type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> &
	VariantProps<typeof checkboxVariants> & {
		label?: ReactNode;
		/** Custom indicator icon; replaces both the check and the indeterminate dash. */
		icon?: ReactNode;
		classNames?: { root?: string; indicator?: string; label?: string; icon?: string };
	};

const Checkbox: React.FC<CheckboxProps> = ({ className, size, color, children, label, icon, classNames, id, ...props }) => {
	const genID = useId();
	const resolvedId = id ?? genID;

	const box = (
		<CheckboxPrimitive.Root
			id={resolvedId}
			data-slot="checkbox"
			data-size={size ?? 'md'}
			data-color={color ?? 'primary'}
			className={cn(checkboxVariants({ size, color }), label ? classNames?.indicator : cn(className, classNames?.indicator))}
			{...props}>
			{children || (
				<CheckboxPrimitive.Indicator data-slot="checkbox-indicator">
					{icon ?? (
						<>
							<CheckIcon className={cn('group-data-indeterminate:hidden', classNames?.icon)} />
							<MinusIcon className={cn('hidden group-data-indeterminate:block', classNames?.icon)} />
						</>
					)}
				</CheckboxPrimitive.Indicator>
			)}
		</CheckboxPrimitive.Root>
	);

	if (!label) return box;

	return (
		<Flex className={cn('items-center gap-1.5 [&_label]:cursor-pointer has-data-disabled:[&_label]:cursor-not-allowed', className, classNames?.root)}>
			{box}
			<Label className={classNames?.label} htmlFor={resolvedId}>
				{label}
			</Label>
		</Flex>
	);
};

export type CheckboxGroupProps = React.ComponentProps<typeof CheckboxGroupPrimitive>;
const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ className, ...props }) => {
	return (
		<CheckboxGroupPrimitive
			data-slot="checkbox-group"
			className={cn('flex flex-col items-start gap-1.5', className)}
			{...props}
		/>
	);
};

const CheckboxCompound = Object.assign(Checkbox, {
	Group: CheckboxGroup,
});

export { CheckboxCompound as Checkbox, CheckboxGroup };
