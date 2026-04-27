import * as React from 'react';
import { cn, cvaWithMeta } from '../lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { Input as BaseInput } from '@base-ui/react/input';
import { InputAppearance, InputMode, InputSize, InputVariant } from '../lib/variants';
import { mergeProps } from '@base-ui/react';

export const inputVariants = cvaWithMeta(
	`
    w-full bg-background border border-input shadow-xs shadow-black/5 transition-[color,box-shadow] text-foreground
    placeholder:text-muted-foreground/80 focus-visible:ring-ring/30 focus-visible:border-ring focus-visible:outline-none
    focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-60 [[readonly]]:bg-muted/80 [[readonly]]:cursor-not-allowed
    file:h-full [[type=file]]:py-0 file:border-solid file:border-input file:bg-transparent rounded-md
    file:font-medium file:not-italic file:text-foreground file:p-0 file:border-0 file:border-e relative
    aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20
  `,
	{
		variants: {
			size: {
				'2xl': 'min-h-12 px-6 text-2xl',
				xl: 'min-h-11 px-5 text-xl',
				lg: 'min-h-10 px-4 text-lg',
				md: 'min-h-9 px-3 text-base',
				sm: 'min-h-8 px-2.5 text-xs',
				xs: 'min-h-7 px-2 text-xs',
			} satisfies Record<InputSize, string>,
			variant: {
				brand: '',
				default: 'border-0 shadow-none',
				outlined: 'border-2 border-muted focus-visible:ring-primary',
				bordered: '',
				filled: 'border-0 focus-visible:ring-primary shadow-0 bg-muted',
				underlined: 'border-0 border-b-2 rounded-none shadow-none focus-visible:shadow-none focus-visible:ring-0',
				none: '',
			} satisfies Record<InputVariant, string>,
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
		defaultVariants: {
			size: 'md',
			variant: 'default',
			radius: 'md',
		},
	},
);
export type InputProps = Omit<React.ComponentProps<typeof BaseInput>, 'size'> & VariantProps<typeof inputVariants>;
const Input: React.FC<InputProps> = ({ className, variant, size, radius, ...props }) => {
	return (
		<BaseInput
			data-slot="input"
			data-variant={variant}
			data-size={size}
			data-radius={radius}
			className={cn(inputVariants({ variant, size, radius }), className)}
			{...props}
		/>
	);
};

export const inputAddonVariants = cvaWithMeta(
	`flex items-center shrink-0 justify-center text-secondary-foreground [&_svg]:text-secondary-foreground/60 mb-auto
	aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20`,
	{
		variants: {
			size: {
				'2xl': 'rounded-md h-12 min-w-12 px-6 text-xl [&_svg:not([class*=size-])]:size-6',
				xl: 'rounded-md h-11 min-w-11 px-5 text-lg [&_svg:not([class*=size-])]:size-5.5',
				lg: 'rounded-md h-10 min-w-10 px-4 text-base [&_svg:not([class*=size-])]:size-5',
				md: 'rounded-md h-9 min-w-9 px-3 text-sm [&_svg:not([class*=size-])]:size-4.5',
				sm: 'rounded-md h-8 min-w-8 px-2.5 text-xs [&_svg:not([class*=size-])]:size-4',
				xs: 'rounded-md h-7 min-w-7 px-2 text-xs [&_svg:not([class*=size-])]:size-3.5',
			} satisfies Record<InputSize, string>,
			variant: {
				brand: '',
				default: '',
				outlined: 'border-0 shadow-none',
				bordered: 'border-0 shadow-none',
				filled: 'border-0 shadow-none',
				underlined: 'border-0 rounded-none shadow-none bg-transparent',
				none: '',
			} satisfies Record<InputVariant, string>,
			mode: {
				default: '',
				icon: 'px-0 justify-center',
			} satisfies Record<InputMode, string>,
			appearance: {
				ghost: `bg-muted data-[slot=field-addon-end]:rounded-l-none data-[slot=field-addon-start]:rounded-r-none
				data-[slot=field-addon-right]:rounded-l-none data-[slot=field-addon-left]:rounded-r-none`,
				light: '',
				outline: `border data-[slot=field-addon-end]:rounded-l-none data-[slot=field-addon-start]:rounded-r-none
				data-[slot=field-addon-right]:rounded-l-none data-[slot=field-addon-left]:rounded-r-none `,
				solid: '',
			} satisfies Record<InputAppearance, string>,
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
			mode: 'default',
		},
	},
);
export type InputAddonProps = React.ComponentProps<'div'> & VariantProps<typeof inputAddonVariants>;
const InputAddon: React.FC<InputAddonProps> = ({ className, variant, mode, size, appearance, ...props }) => {
	const mergedProps = mergeProps(
		{
			'data-slot': 'input-addon',
			'data-size': size,
			'data-variant': variant,
			'data-mode': mode,
			'data-appearance': appearance,
			className: cn(inputAddonVariants({ variant, mode, size, appearance }), className),
		},
		props,
	);
	return <div {...mergedProps} />;
};

export const inputGroupVariants = cvaWithMeta(
	`
    flex items-stretch
    [&_[data-slot=input]]:grow
    [&_[data-slot=input-addon]:has(+[data-slot=input])]:rounded-e-none [&_[data-slot=input-addon]:has(+[data-slot=input])]:border-e-0
    [&_[data-slot=input-addon]:has(+[data-slot=datefield])]:rounded-e-none [&_[data-slot=input-addon]:has(+[data-slot=datefield])]:border-e-0
    [&_[data-slot=input]+[data-slot=input-addon]]:rounded-s-none [&_[data-slot=input]+[data-slot=input-addon]]:border-s-0
    [&_[data-slot=input-addon]:has(+[data-slot=button])]:rounded-e-none
    [&_[data-slot=input]+[data-slot=button]]:rounded-s-none
    [&_[data-slot=button]+[data-slot=input]]:rounded-s-none
    [&_[data-slot=input-addon]+[data-slot=input]]:rounded-s-none
    [&_[data-slot=input-addon]+[data-slot=datefield]]:**:data-[slot=input]:rounded-s-none
    [&_[data-slot=datefield]:has(+[data-slot=input-addon])]:**:data-[slot=input]:rounded-e-none
    [&_[data-slot=input]:has(+[data-slot=button])]:rounded-e-none
    [&_[data-slot=input]:has(+[data-slot=input-addon])]:rounded-e-none
    **:data-[slot=datefield]:grow
    [&_[data-slot=datefield]+[data-slot=input-addon]]:rounded-s-none
    [&_[data-slot=datefield]+[data-slot=input-addon]]:border-s-0
    [&_[data-slot=datefield]:has(~[data-slot=input-addon])]:**:data-[slot=input]:rounded-e-none
    [&_[data-slot=datefield]~[data-slot=input-addon]]:rounded-s-none
  `,
	{
		variants: {
			variant: {
				brand: '',
				default: '',
				outlined: '',
				bordered: '',
				filled: '',
				underlined: 'rounded-none border-none',
				none: '',
			} satisfies Record<InputVariant, string>,
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);
export type InputGroupProps = React.ComponentProps<'div'> & VariantProps<typeof inputGroupVariants>;
const InputGroup: React.FC<InputGroupProps> = ({ className, variant, ...props }) => {
	const mergedProps = mergeProps(
		{
			'data-slot': 'input-group',
			'data-variant': variant,
			className: cn(inputGroupVariants({ variant }), className),
		},
		props,
	);
	return <div {...mergedProps} />;
};

type CompoundInput = typeof Input & {
	Addon: typeof InputAddon;
	Group: typeof InputGroup;
};
const InputComponent = Input as CompoundInput;
InputComponent.Addon = InputAddon;
InputComponent.Group = InputGroup;

export { InputComponent as Input, InputAddon, InputGroup };
