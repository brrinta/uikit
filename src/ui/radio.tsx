import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { CircleCheck } from 'lucide-react';
import * as React from 'react';
import { useId } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn, cvaWithMeta } from '../lib/utils';
import { Flex } from './flex';
import { Label } from './label';
import { Text } from './text';

export const radioGroupVariants = cvaWithMeta('grid gap-3', {
	variants: {
		orientation: {
			vertical: 'grid-flow-row',
			horizontal: 'grid-flow-col justify-start',
		},
	},
	defaultVariants: { orientation: 'vertical' },
});

/** The item's `color` drives `currentColor`; the indicator icon inherits it via `bg/text-current`. */
export const radioColors = {
	primary: 'text-primary',
	brand: 'text-brand',
	secondary: 'text-secondary-foreground',
	accent: 'text-accent-foreground',
	destructive: 'text-destructive',
	success: 'text-success',
	warning: 'text-warning',
	info: 'text-info',
	mono: 'text-zinc-950 dark:text-zinc-300',
	red: 'text-red-500',
	orange: 'text-orange-500',
	amber: 'text-amber-500',
	yellow: 'text-yellow-500',
	lime: 'text-lime-500',
	green: 'text-green-500',
	emerald: 'text-emerald-500',
	teal: 'text-teal-500',
	cyan: 'text-cyan-500',
	sky: 'text-sky-500',
	blue: 'text-blue-500',
	indigo: 'text-indigo-500',
	violet: 'text-violet-500',
	purple: 'text-purple-500',
	fuchsia: 'text-fuchsia-500',
	pink: 'text-pink-500',
	rose: 'text-rose-500',
} as const;

export type RadioColor = keyof typeof radioColors;

export const radioGroupItemVariants = cvaWithMeta(
	[
		'aspect-square shrink-0 cursor-pointer rounded-full border border-input shadow-xs dark:bg-input/30',
		'transition-[color,box-shadow] outline-none',
		'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
		'disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50',
		'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
		'data-checked:border-current',
	],
	{
		variants: {
			size: {
				sm: 'size-4',
				md: 'size-4.5',
				lg: 'size-5',
			},
			color: radioColors,
		},
		defaultVariants: { size: 'sm', color: 'primary' },
	},
);

export const radioGroupIndicatorVariants = cvaWithMeta('relative flex size-full items-center justify-center', {
	variants: {},
	defaultVariants: {},
});

/** Inherits the item's color via `text-current` (previously hardcoded to primary). */
export const radioGroupDotVariants = cvaWithMeta(
	'absolute top-1/2 left-1/2 z-10 size-[110%] -translate-x-1/2 -translate-y-1/2 cursor-pointer text-current',
	{ variants: {}, defaultVariants: {} },
);

export type RadioGroupProps = RadioGroupPrimitive.Props & VariantProps<typeof radioGroupVariants>;

function Radio({ className, orientation, ...props }: RadioGroupProps) {
	return (
		<RadioGroupPrimitive
			data-slot="radio-group"
			data-orientation={orientation ?? 'vertical'}
			className={cn(radioGroupVariants({ orientation }), className)}
			{...props}
		/>
	);
}

export type RadioGroupItemProps = RadioPrimitive.Root.Props &
	VariantProps<typeof radioGroupItemVariants> & {
		label?: React.ReactNode;
		description?: React.ReactNode;
		icon?: (props: { className?: string }) => React.ReactNode;
		classNames?: {
			item?: string;
			root?: string;
			description?: string;
			wrapper?: string;
			indicator?: string;
			label?: string;
			icon?: string;
		};
	};

function RadioGroupItem({ className, label, description, icon, classNames, color, size, id, ...props }: RadioGroupItemProps) {
	const genID = useId();
	const resolvedId = id ?? genID;

	const item = (
		<RadioPrimitive.Root
			data-slot="radio-group-item"
			data-size={size ?? 'sm'}
			data-color={color ?? 'primary'}
			id={resolvedId}
			className={cn(radioGroupItemVariants({ color, size }), classNames?.item, label || description ? undefined : className)}
			{...props}>
			<RadioPrimitive.Indicator
				data-slot="radio-group-indicator"
				className={cn(radioGroupIndicatorVariants(), classNames?.indicator)}>
				{icon ? (
					icon({ className: cn(radioGroupDotVariants(), classNames?.icon) })
				) : (
					<CircleCheck className={cn(radioGroupDotVariants(), classNames?.icon)} />
				)}
			</RadioPrimitive.Indicator>
		</RadioPrimitive.Root>
	);

	if (!label && !description) return item;

	return (
		<Flex className={cn('items-center gap-2', className, classNames?.root)}>
			{item}
			{description ? (
				<div className={cn('flex flex-col justify-center gap-1', classNames?.wrapper)}>
					<Label className={cn('cursor-pointer', classNames?.label)} htmlFor={resolvedId}>
						{label}
					</Label>
					<Text className={cn('text-sm', classNames?.description)}>{description}</Text>
				</div>
			) : (
				<Label className={cn('cursor-pointer', classNames?.label)} htmlFor={resolvedId}>
					{label}
				</Label>
			)}
		</Flex>
	);
}

const RadioGroupComponent = Object.assign(Radio, { Item: RadioGroupItem });
export { RadioGroupComponent as RadioGroup, RadioGroupItem };
