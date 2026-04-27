import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { cn, cvaWithMeta } from '@uikit/lib/utils';
import { CircleCheckBig } from 'lucide-react';
import * as React from 'react';
import { useId } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Flex } from '@uikit/ui/flex';
import { Label } from '@uikit/ui/label';
import { Text } from '@uikit/ui/text';

export const radioGroupVariants = cvaWithMeta('grid gap-3', { variants: {}, defaultVariants: {} });
export const radioGroupItemVariants = cvaWithMeta(
	[
		'border-input aspect-square size-4 shrink-0 rounded-full border shadow-xs',
		'dark:bg-input/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20',
		'dark:aria-invalid:ring-destructive/40 focus-visible:border-ring focus-visible:ring-ring/50',
		'transition-[color,box-shadow] outline-none focus-visible:ring-[3px]',
		'disabled:cursor-not-allowed disabled:opacity-50',
	].join(' '),
	{
		variants: {
			color: {
				primary: 'text-primary',
				brand: 'text-brand',
				success: 'text-success',
				warning: 'text-warning',
				info: 'text-info',
				destructive: 'text-destructive',
				accent: 'text-accent',
				red: 'text-red-500',
				orange: 'text-orange-500',
				green: 'text-green-500',
				blue: 'text-blue-500',
			},
		},
		defaultVariants: {
			color: 'primary',
		},
	},
);
export const radioGroupIndicatorVariants = cvaWithMeta('relative flex items-center justify-center size-4', { variants: {}, defaultVariants: {} });
export const radioGroupDotVariants = cvaWithMeta(
	'z-50 text-primary cursor-pointer absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2',
	{
		variants: {},
		defaultVariants: {},
	},
);

function Radio({ className, ...props }: RadioGroupPrimitive.Props & VariantProps<typeof radioGroupVariants>) {
	return (
		<RadioGroupPrimitive
			data-slot="radio-group"
			className={cn(radioGroupVariants(), className)}
			{...props}
		/>
	);
}

function RadioGroupItem({
	className,
	label,
	description,
	icon,
	classNames,
	color,
	id,
	...props
}: RadioPrimitive.Root.Props &
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
	}) {
	const genID = useId();
	if (!label && !description) {
		return (
			<RadioPrimitive.Root
				data-slot="radio-group-item"
				className={cn(radioGroupItemVariants({ color }), classNames?.item, className)}
				id={id}
				{...props}>
				<RadioPrimitive.Indicator
					data-slot="radio-group-indicator"
					className={cn(radioGroupIndicatorVariants(), classNames?.indicator)}>
					{icon ? (
						icon({ className: cn(radioGroupDotVariants(), classNames?.icon) })
					) : (
						<CircleCheckBig className={cn(radioGroupDotVariants(), classNames?.icon)} />
					)}
				</RadioPrimitive.Indicator>
			</RadioPrimitive.Root>
		);
	}

	return (
		<Flex className={cn('items-center gap-2', classNames?.root)}>
			<RadioPrimitive.Root
				data-slot="radio-group-item"
				className={cn('cursor-pointer', radioGroupItemVariants({ color }), classNames?.item, className)}
				{...props}
				id={id || genID}>
				<RadioPrimitive.Indicator
					data-slot="radio-group-indicator"
					className={cn(radioGroupIndicatorVariants(), classNames?.indicator)}>
					{icon ? (
						icon({ className: cn(radioGroupDotVariants(), classNames?.icon) })
					) : (
						<CircleCheckBig className={cn(radioGroupDotVariants(), classNames?.icon)} />
					)}
				</RadioPrimitive.Indicator>
			</RadioPrimitive.Root>
			{description ? (
				<div className={cn('flex flex-col gap-1 justify-center', classNames?.wrapper)}>
					<Label
						className={cn('cursor-pointer', classNames?.label)}
						htmlFor={id || genID}>
						{label}
					</Label>
					{description && <Text className={cn('text-sm', classNames?.description)}>{description}</Text>}
				</div>
			) : (
				<Label
					className={cn('cursor-pointer', classNames?.label)}
					htmlFor={id || genID}>
					{label}
				</Label>
			)}
		</Flex>
	);
}

// Compound export
type CompoundRadioGroup = typeof Radio & { Item: typeof RadioGroupItem };
const RadioGroupComponent = Radio as CompoundRadioGroup;
RadioGroupComponent.Item = RadioGroupItem;
export { RadioGroupComponent as RadioGroup, RadioGroupItem };
