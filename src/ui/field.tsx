import * as React from 'react';
import { Field as BaseField } from '@base-ui/react/field';
import { type VariantProps } from 'class-variance-authority';
import { cn, cvaWithMeta } from '@uikit/lib/utils';
import { mergeProps } from '@base-ui/react';
import { InputAppearance, InputOrientation, InputSize, InputVariant } from '@uikit/lib/variants';
import { useRender } from '@base-ui/react/use-render';

type FieldContextValue = {
	variant?: InputVariant | null;
	size?: InputSize | null;
	orientation?: InputOrientation | null;
	required?: boolean | null;
	invalid?: boolean | null;
	disabled?: boolean | null;
	excludeLeft?: boolean | null;
	readOnly?: boolean | null;
};
const FieldContext = React.createContext<FieldContextValue>({});
const useFieldContext = () => React.useContext(FieldContext);

export const fieldVariants = cvaWithMeta('flex flex-col gap-0.5 relative grow p-0.5', {
	variants: {
		variant: {
			none: '',
			brand: '',
			default: '',
			outlined: '',
			bordered: 'gap-0',
			filled: '',
			underlined: '',
		} satisfies Record<NonNullable<FieldContextValue['variant']>, string>,
		orientation: {
			vertical: 'flex-col *:w-full [&>.sr-only]:w-auto',
			horizontal: '**:data-[slot=field-content]:flex-row **:data-[slot=field-content]:items-center **:data-[slot=field-content]:gap-2',
			responsive: 'md:**:data-[slot=field-content]:flex-row md:**:data-[slot=field-content]:items-center md:**:data-[slot=field-content]:gap-2',
		} satisfies Record<NonNullable<FieldContextValue['orientation']>, string>,
		size: {
			'2xl': 'text-lg',
			xl: 'text-base',
			lg: 'text-base',
			md: 'text-sm',
			sm: 'text-sm',
			xs: 'text-xs',
		} satisfies Record<NonNullable<FieldContextValue['size']>, string>,
		invalid: {
			true: 'data-[error=true]:**:data-[slot=field-label]:text-destructive',
			false: '',
		},
		disabled: {
			true: 'opacity-60',
			false: '',
		},
		readOnly: {
			true: '',
			false: '',
		},
		excludeLeft: {
			true: '**:data-[slot=field-addon-left]:absolute **:data-[slot=field-addon-left]:right-full',
			false: '',
		},
	},
	defaultVariants: {
		variant: 'default',
		orientation: 'vertical',
		invalid: false,
		disabled: false,
	},
});
export interface FieldProps extends Omit<React.ComponentProps<typeof BaseField.Root>, 'disabled' | 'invalid'>, VariantProps<typeof fieldVariants> {
	required?: boolean;
	description?: React.ReactNode;
}
const FieldRoot: React.FC<FieldProps> = ({
	className,
	orientation,
	size = 'md',
	required,
	variant,
	invalid,
	disabled,
	description,
	excludeLeft,
	readOnly,
	...props
}) => {
	const contextValue = React.useMemo(
		() => ({ size, orientation, required, invalid, variant, disabled, excludeLeft, readOnly }),
		[size, orientation, required, invalid, variant, disabled, excludeLeft, readOnly],
	);
	const mergedProps = mergeProps(
		{
			'data-slot': 'field',
			'data-required': required,
			'data-error': invalid,
			'data-variant': variant,
			'data-disabled': disabled,
			'data-orientation': orientation,
			'data-size': size,
			'data-excludeleft': excludeLeft,
			'data-readonly': readOnly,
			readOnly,
			disabled,
			invalid,
			required,
			className: cn(fieldVariants({ orientation, variant, disabled, invalid, size, excludeLeft }), className),
		},
		props,
	);
	return (
		<FieldContext.Provider value={contextValue}>
			<BaseField.Root {...mergedProps} />
		</FieldContext.Provider>
	);
};
FieldRoot.displayName = 'Field';

export const fieldLabelVariants = cvaWithMeta('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-fit', {
	variants: {
		variant: {
			none: '',
			brand: '',
			default: '',
			outlined: '',
			bordered: 'absolute left-2 bottom-full translate-y-2/5 bg-background shadow-[0_0_0_2px_hsl(var(--background))] px-2',
			filled: '',
			underlined: '',
		} satisfies Record<NonNullable<FieldContextValue['variant']>, string>,
		size: {
			'2xl': 'text-2xl',
			xl: 'text-xl',
			lg: 'text-lg',
			md: 'text-base',
			sm: 'text-sm',
			xs: 'text-xs',
		} satisfies Record<NonNullable<FieldContextValue['size']>, string>,
		required: {
			true: 'after:content-["*"] after:ml-0.5 after:text-destructive',
		},
	},
	defaultVariants: {
		size: 'md',
	},
});
export interface FieldLabelProps extends React.ComponentProps<typeof BaseField.Label>, VariantProps<typeof fieldLabelVariants> {
	required?: boolean;
}
const FieldLabel: React.FC<FieldLabelProps> = ({ className, size, variant, required, ...props }) => {
	const { size: contextSize, required: contextRequired, variant: contextVariant, invalid } = useFieldContext();

	const mergedProps = mergeProps(
		{
			'data-slot': 'field-label',
			'data-required': required ?? contextRequired,
			'data-error': invalid,
			'data-variant': variant ?? contextVariant,
			'data-size': size ?? contextSize,
			className: cn(
				fieldLabelVariants({
					required: required ?? contextRequired,
					size: size ?? contextSize,
					variant: variant ?? contextVariant,
				}),
				className,
			),
		},
		props,
	);
	return <BaseField.Label {...mergedProps} />;
};
FieldLabel.displayName = 'Field.Label';

export const fieldDescriptionVariants = cvaWithMeta('text-muted-foreground', {
	variants: {
		variant: {
			none: '',
			brand: '',
			default: '',
			outlined: '',
			bordered: '',
			filled: '',
			underlined: '',
		} satisfies Record<NonNullable<FieldContextValue['variant']>, string>,
		size: {
			'2xl': 'text-base',
			xl: 'text-sm',
			lg: 'text-sm',
			md: 'text-xs',
			sm: 'text-xs',
			xs: 'text-xs',
		} satisfies Record<NonNullable<FieldContextValue['size']>, string>,
	},
	defaultVariants: {
		size: 'md',
	},
});
export interface FieldDescriptionProps extends React.ComponentProps<typeof BaseField.Description>, VariantProps<typeof fieldDescriptionVariants> {}
const FieldDescription: React.FC<FieldDescriptionProps> = ({ className, size, variant, ...props }) => {
	const { size: contextSize, variant: contextVariant } = useFieldContext();
	const mergedProps = mergeProps(
		{
			'data-slot': 'field-description',
			'data-size': size ?? contextSize,
			'data-variant': variant ?? contextVariant,
			className: cn(
				fieldDescriptionVariants({
					size: size ?? contextSize,
					variant: variant ?? contextVariant,
				}),
				className,
			),
		},
		props,
	);

	return <BaseField.Description {...mergedProps} />;
};
FieldDescription.displayName = 'Field.Description';

export const fieldErrorVariants = cvaWithMeta('text-destructive font-medium', {
	variants: {
		variant: {
			none: '',
			brand: '',
			default: '',
			outlined: '',
			bordered: '',
			filled: '',
			underlined: '',
		} satisfies Record<NonNullable<FieldContextValue['variant']>, string>,
		size: {
			'2xl': 'text-base',
			xl: 'text-sm',
			lg: 'text-sm',
			md: 'text-xs',
			sm: 'text-xs',
			xs: 'text-xs',
		} satisfies Record<NonNullable<FieldContextValue['size']>, string>,
	},
	defaultVariants: {
		size: 'md',
	},
});
export interface FieldErrorProps extends React.ComponentProps<typeof BaseField.Error>, VariantProps<typeof fieldErrorVariants> {}
const FieldError: React.FC<FieldErrorProps> = ({ className, size, variant, ...props }) => {
	const { size: contextSize, variant: contextVariant, invalid } = useFieldContext();
	const mergedProps = mergeProps(
		{
			'data-slot': 'field-error',
			'data-size': size ?? contextSize,
			'data-variant': variant ?? contextVariant,
			className: cn(fieldErrorVariants({ size: size ?? contextSize, variant: variant ?? contextVariant }), className),
		},
		props,
	);
	return (
		<BaseField.Error
			match={!!invalid}
			{...mergedProps}
		/>
	);
};
FieldError.displayName = 'Field.Error';

export const fieldControlVariants = cvaWithMeta(
	`w-full transition-[color,box-shadow] text-foreground border-0 shadow-0 bg-transparent py-1
			focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-transparent focus-visible:outline-0
			rounded-md placeholder:text-muted-foreground/80 disabled:cursor-not-allowed disabled:opacity-60 [[readOnly]]:cursor-not-allowed
    [[type=file]]:h-full [[type=file]]:px-2 [[type=file]]:text-muted-foreground
    file:hidden file:bg-muted file:h-full file:px-2 file:rounded-none file:placeholder:text-foreground file:border-r file:border-input
  `,
	{
		variants: {
			size: {
				'2xl': 'min-h-12 px-4 text-2xl',
				xl: 'min-h-11 px-4 text-xl',
				lg: 'min-h-10 px-4 text-lg',
				md: 'min-h-9 px-3 text-base',
				sm: 'min-h-8 px-2 text-sm',
				xs: 'min-h-7 px-2 text-xs',
			} satisfies Record<InputSize, string>,
			variant: {
				none: '',
				brand: '',
				default: '',
				outlined: 'file:rounded-l-md rounded-none',
				bordered: 'file:rounded-bl-md',
				filled: 'file:rounded-l-md',
				underlined: 'rounded-none',
			} satisfies Record<InputVariant, string>,
			appearance: {
				ghost: 'bg-muted',
				light: '',
			},
		},
		defaultVariants: {
			size: 'md',
			variant: 'default',
		},
	},
);
export type FieldControlProps = React.ComponentProps<typeof BaseField.Control> & VariantProps<typeof fieldControlVariants>;
const FieldControl: React.FC<FieldControlProps> = ({ className, variant, size, readOnly, ...props }) => {
	const { variant: contextVariant, size: contextSize, required, invalid, orientation, disabled, readOnly: contextReadonly } = useFieldContext();
	const mergedProps = mergeProps(
		{
			'data-slot': 'field-control',
			'data-size': size ?? contextSize,
			'data-variant': variant ?? contextVariant,
			'data-required': required,
			'data-error': invalid,
			'data-invalid': invalid,
			'data-orientation': orientation,
			'data-disabled': disabled,
			'data-readonly': readOnly ?? contextReadonly,
			disabled,
			required,
			readOnly: readOnly ?? contextReadonly,
			className: cn(
				fieldControlVariants({
					size: size ?? contextSize,
					variant: variant ?? contextVariant,
				}),
				className,
			),
		},
		props,
	);
	return <BaseField.Control {...mergedProps} />;
};
FieldControl.displayName = 'Field.Control';

export const fieldContentVariants = cvaWithMeta('flex flex-col gap-1 relative', {
	variants: {
		variant: {
			none: '',
			brand: '',
			default: '',
			outlined: '',
			bordered: `border rounded-md pt-2 focus-within:ring-1 focus-within:border-ring data-[error=true]:border-destructive
				 data-[error=true]:ring-destructive`,
			filled: '',
			underlined: '',
		} satisfies Record<NonNullable<FieldContextValue['variant']>, string>,
	},
	defaultVariants: {
		variant: 'default',
	},
});
export type FieldContentProps = useRender.ComponentProps<'div'> & VariantProps<typeof fieldContentVariants>;
const FieldContent: React.FC<FieldContentProps> = ({ className, variant, ...props }) => {
	const { variant: contextVariant, size, required, invalid, orientation, disabled } = useFieldContext();
	const mergedProps = mergeProps(
		{
			'data-slot': 'field-content',
			'data-size': size,
			'data-variant': variant ?? contextVariant,
			'data-required': required,
			'data-error': invalid,
			'data-orientation': orientation,
			'data-disabled': disabled,
			className: cn(fieldContentVariants({ variant: variant ?? contextVariant }), className),
		},
		props,
	);
	return <div {...mergedProps} />;
};
FieldContent.displayName = 'Field.Content';

export const fieldGroupVariants = cvaWithMeta(
	`
    flex items-stretch grow
    **:data-[slot=field-control]:grow
  `,
	{
		variants: {
			variant: {
				none: '',
				brand: '',
				default: '',
				outlined: '',
				bordered: '',
				filled: '',
				underlined: 'rounded-none border-none',
			} satisfies Record<NonNullable<FieldContextValue['variant']>, string>,
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);
export type FieldGroupProps = React.ComponentProps<'div'> & VariantProps<typeof fieldGroupVariants>;
const FieldGroup: React.FC<FieldGroupProps> = ({ className, variant, ...props }) => {
	const { variant: contextVariant, size, required, invalid, orientation, disabled } = useFieldContext();
	const mergedProps = mergeProps(
		{
			'data-slot': 'field-group',
			'data-size': size,
			'data-variant': variant ?? contextVariant,
			'data-required': required,
			'data-error': invalid,
			'data-orientation': orientation,
			'data-disabled': disabled,
			className: cn(fieldGroupVariants({ variant: variant ?? contextVariant }), className),
		},
		props,
	);
	return <div {...mergedProps} />;
};
FieldGroup.displayName = 'Field.Group';

export const fieldWrapperVariants = cvaWithMeta(
	`flex items-center rounded-md grow
	has-data-[slot=field-addon-start]:**:data-[slot=field-control]:rounded-l-none
	has-data-[slot=field-addon-end]:**:data-[slot=field-control]:rounded-r-none
`,
	{
		variants: {
			variant: {
				none: '',
				brand: '',
				default: `border focus-within:ring-1 focus-within:ring-ring data-[error=true]:ring-destructive data-[error=true]:border-destructive p-1
						**:data-[slot=field-control]:bg-muted
				`,
				outlined: 'border focus-within:ring-1 focus-within:ring-ring data-[error=true]:ring-destructive data-[error=true]:border-destructive',
				bordered: '',
				filled: 'border-0 bg-muted data-[error=true]:bg-destructive/5 focus-within:outline-2 data-[error=true]:outline-destructive',
				underlined: `border-0 border-b-2 rounded-none focus-visible:shadow-none shadow-none focus-within:border-b-2 focus-within:border-ring
					data-[error=true]:border-destructive/50 data-[error=true]:focus-within:border-destructive`,
			} satisfies Record<NonNullable<FieldContextValue['variant']>, string>,
			size: {
				'2xl': '',
				xl: '',
				sm: '[&_svg:not([class*=size-])]:size-3.5',
				md: '[&_svg:not([class*=size-])]:size-4',
				lg: '&_svg:not([class*=size-])]:size-4',
				xs: '',
			} satisfies Record<NonNullable<FieldContextValue['size']>, string>,
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);
export type FieldWrapperProps = React.ComponentProps<'div'> & VariantProps<typeof fieldWrapperVariants>;
const FieldWrapper: React.FC<FieldWrapperProps> = ({ className, variant, ...props }) => {
	const { variant: contextVariant, size, required, invalid, orientation, disabled } = useFieldContext();
	const mergedProps = mergeProps(
		{
			'data-slot': 'field-wrapper',
			'data-size': size,
			'data-variant': variant ?? contextVariant,
			'data-required': required,
			'data-error': invalid,
			'data-orientation': orientation,
			'data-disabled': disabled,
			className: cn(fieldWrapperVariants({ variant: variant ?? contextVariant }), className),
		},
		props,
	);
	return <div {...mergedProps} />;
};
FieldWrapper.displayName = 'Field.Wrapper';

export const fieldAddonVariants = cvaWithMeta(
	`flex items-center shrink-0 justify-center text-secondary-foreground [&_svg]:text-secondary-foreground/60
	aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20`,
	{
		variants: {
			size: {
				'2xl': 'rounded-md h-12 min-w-12 px-4 text-xl [&_svg:not([class*=size-])]:size-6',
				xl: 'rounded-md h-11 min-w-11 px-4 text-lg [&_svg:not([class*=size-])]:size-5.5',
				lg: 'rounded-md h-10 min-w-10 px-4 text-base [&_svg:not([class*=size-])]:size-5',
				md: 'rounded-md h-9 min-w-9 px-3 text-sm [&_svg:not([class*=size-])]:size-4.5',
				sm: 'rounded-md h-8 min-w-8 px-3 text-xs [&_svg:not([class*=size-])]:size-4',
				xs: 'rounded-md h-7 min-w-7 px-2 text-xs [&_svg:not([class*=size-])]:size-3.5',
			} satisfies Record<NonNullable<FieldContextValue['size']>, string>,
			variant: {
				none: '',
				brand: '',
				default: '',
				outlined: 'border-0 shadow-none',
				bordered: 'border-0 shadow-none',
				filled: 'border-0 shadow-none',
				underlined: 'border-0 rounded-none shadow-none bg-transparent',
			} satisfies Record<NonNullable<FieldContextValue['variant']>, string>,

			mode: {
				default: '',
				icon: 'px-0 justify-center',
			},
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
export type FieldAddonProps = React.ComponentProps<'div'> & VariantProps<typeof fieldAddonVariants>;
const FieldAddon = ({ className, variant, mode, size, appearance, ...props }: FieldAddonProps) => {
	const { variant: contextVariant, size: contextSize, required, invalid, orientation, disabled } = useFieldContext();
	const mergedProps = mergeProps(
		{
			'data-slot': 'field-addon',
			'data-size': size ?? contextSize,
			'data-variant': variant ?? contextVariant,
			'data-required': required,
			'data-error': invalid,
			'data-orientation': orientation,
			'data-disabled': disabled,
			'data-mode': mode,
			'data-appearance': appearance,
			className: cn(fieldAddonVariants({ variant: variant ?? contextVariant, size: size ?? contextSize, mode, appearance }), className),
		},
		props,
	);
	return <div {...mergedProps} />;
};
FieldAddon.displayName = 'Field.Addon';

const Field = Object.assign(FieldRoot, {
	Label: FieldLabel,
	Description: FieldDescription,
	Error: FieldError,
	Control: FieldControl,
	Content: FieldContent,
	Group: FieldGroup,
	Addon: FieldAddon,
	Wrapper: FieldWrapper,
});

export { Field, FieldRoot, FieldLabel, FieldDescription, FieldError, FieldControl, FieldContent, FieldGroup, FieldAddon, FieldWrapper };
