import * as React from 'react';
import { cn, cvaWithMeta } from '../lib/utils';
import { VariantProps } from 'class-variance-authority';

export const labelVariants = cvaWithMeta(
	'flex items-center gap-1 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none ' +
		'group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ' +
		'group-data-[error=true]/field:text-destructive',
	{
		variants: {
			variant: {
				default: 'pl-4',
				outlined: 'pl-4',
				bordered: 'ml-4 -mt-2.5 bg-background !w-fit px-2',
				filled: 'pl-4',
				underlined: 'pl-4',
			},
			required: {
				true: 'after:content-["*"] after:text-destructive',
				false: '',
			},
			size: {
				lg: 'text-sm',
				sm: 'text-xs',
				md: 'text-sm',
			},
		},
		defaultVariants: {
			required: false,
			size: 'md',
		},
	},
);
export type LabelProps = React.ComponentProps<'label'> & VariantProps<typeof labelVariants>;
function Label({ className, variant, size, required, ...props }: LabelProps) {
	return (
		<label
			data-slot="label"
			className={cn(
				labelVariants({
					variant,
					size,
					required,
				}),
				className,
			)}
			{...props}
		/>
	);
}

export { Label };
