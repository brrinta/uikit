import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group';
import * as React from 'react';
import { ReactNode, useId } from 'react';
import { cn, cvaWithMeta } from '../lib/utils';
import { VariantProps } from 'class-variance-authority';
import { Flex } from './flex';
import { Label } from './label';
import { CheckIcon } from 'lucide-react';

// Define the variants for the Checkbox using cva.
export const checkboxVariants = cvaWithMeta(
	[
		'group peer bg-background shrink-0 rounded-md border border-input ring-offset-background',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
		'disabled:cursor-not-allowed disabled:opacity-50',
		'aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20',
		'in-data-[invalid=true]:border-destructive/60 in-data-[invalid=true]:ring-destructive/10',
		'dark:in-data-[invalid=true]:border-destructive dark:in-data-[invalid=true]:ring-destructive/20',
		'data-[state=checked]:text-primary-foreground',
		'data-[state=indeterminate]:text-primary-foreground',
		'flex items-center justify-center transition-colors [&_svg]:transition-colors',
	].join(' '),
	{
		variants: {
			size: {
				sm: 'size-4.5 [&_svg]:size-3',
				md: 'size-5 [&_svg]:size-3.5',
				lg: 'size-5.5 [&_svg]:size-4',
			},
			color: {
				primary:
					'data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary',
				brand:
					'data-[state=checked]:bg-brand data-[state=checked]:border-brand data-[state=indeterminate]:bg-brand data-[state=indeterminate]:border-brand',
				success:
					'data-[state=checked]:bg-success data-[state=checked]:border-success data-[state=indeterminate]:bg-success data-[state=indeterminate]:border-success',
				warning:
					'data-[state=checked]:bg-warning data-[state=checked]:border-warning data-[state=indeterminate]:bg-warning data-[state=indeterminate]:border-warning',
				info: 'data-[state=checked]:bg-info data-[state=checked]:border-info data-[state=indeterminate]:bg-info data-[state=indeterminate]:border-info',
				destructive:
					'data-[state=checked]:bg-destructive data-[state=checked]:border-destructive data-[state=indeterminate]:bg-destructive data-[state=indeterminate]:border-destructive',
				accent:
					'data-[state=checked]:bg-accent data-[state=checked]:border-accent data-[state=indeterminate]:bg-accent data-[state=indeterminate]:border-accent',
				red: 'data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 data-[state=indeterminate]:bg-red-500 data-[state=indeterminate]:border-red-500',
				orange:
					'data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 data-[state=indeterminate]:bg-orange-500 data-[state=indeterminate]:border-orange-500',
				green:
					'data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=indeterminate]:bg-green-500 data-[state=indeterminate]:border-green-500',
				blue: 'data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:border-blue-500',
			},
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
		icon?: ReactNode;
		classNames?: { root?: string; indicator?: string; label?: string; icon?: string };
	};

const Checkbox: React.FC<CheckboxProps> = ({ className, size, color, children, label, icon, classNames, id, ...props }) => {
	const genID = useId();
	return label ? (
		<Flex className={cn('items-center gap-1 [&_label]:cursor-pointer [&_label]:disabled:cursor-not-allowed', className, classNames?.root)}>
			<CheckboxPrimitive.Root
				id={id ?? genID}
				data-slot="checkbox"
				className={cn(checkboxVariants({ size, color }), classNames?.indicator)}
				{...props}>
				{children || <CheckboxPrimitive.Indicator>{icon ?? <CheckIcon className={cn(classNames?.icon)} />}</CheckboxPrimitive.Indicator>}
			</CheckboxPrimitive.Root>
			<Label
				className={classNames?.label}
				htmlFor={id ?? genID}>
				{label}
			</Label>
		</Flex>
	) : (
		<CheckboxPrimitive.Root
			id={id ?? genID}
			data-slot="checkbox"
			className={cn(checkboxVariants({ size, color }), className, classNames?.indicator)}
			{...props}>
			{children || <CheckboxPrimitive.Indicator>{icon ?? <CheckIcon className={cn(classNames?.icon)} />}</CheckboxPrimitive.Indicator>}
		</CheckboxPrimitive.Root>
	);
};

export type CheckboxGroupProps = React.ComponentProps<typeof CheckboxGroupPrimitive>;
const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ className, ...props }) => {
	return (
		<CheckboxGroupPrimitive
			data-slot="checkbox-group"
			className={cn('flex flex-col items-start gap-1', className)}
			{...props}
		/>
	);
};

const CheckboxCompound = Object.assign(Checkbox, {
	Group: CheckboxGroup,
});

export { CheckboxCompound as Checkbox, CheckboxGroup };
