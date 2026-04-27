'use client';

import * as React from 'react';
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import { type VariantProps } from 'class-variance-authority';
import { cn, cvaWithMeta } from '@uikit/lib/utils';
import { InputSize, InputVariant } from '@uikit/lib/variants';

export const toggleVariants = cvaWithMeta(
	[
		'hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 cursor-pointer',
		'dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive gap-1 rounded-md text-sm font-medium transition-[color,box-shadow]',
		'[&_svg:not([class*="size-"])]:size-4 group/toggle hover:bg-muted inline-flex items-center justify-center whitespace-nowrap outline-none',
		'focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
	].join(' '),
	{
		variants: {
			variant: {
				filled: 'bg-muted data-pressed:bg-primary data-pressed:text-primary-foreground hover:bg-muted-foreground',
				none: 'hover:bg-transparent',
				outlined: ['border-input hover:bg-muted border bg-transparent shadow-xs', 'data-pressed:border-primary data-pressed:bg-primary/10'].join(' '),
				bordered: ['border-input border', 'data-pressed:border-primary data-pressed:bg-primary/10'].join(' '),
				brand: ['bg-primary/10 text-primary hover:bg-primary/20', 'data-pressed:bg-primary data-pressed:text-primary-foreground'].join(' '),
				underlined: ['rounded-none border-b-2 border-transparent hover:border-muted', 'data-pressed:border-primary'].join(' '),
				default: 'bg-transparent data-pressed:bg-muted',
			} satisfies Record<InputVariant, string>,
			size: {
				xs: 'h-6 min-w-6 px-1 text-xs [&_svg:not([class*="size-"])]:size-3',
				sm: 'h-8 min-w-8 px-1.5 text-sm',
				md: 'h-9 min-w-9 px-2',
				lg: 'h-10 min-w-10 px-2.5',
				xl: 'h-11 min-w-11 px-3 text-base [&_svg:not([class*="size-"])]:size-5',
				'2xl': 'h-12 min-w-12 px-4 text-lg [&_svg:not([class*="size-"])]:size-6',
			} satisfies Record<InputSize, string>,
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);

function ToggleGroupItem({
	className,
	variant = 'default',
	size = 'md',
	...props
}: React.ComponentProps<typeof TogglePrimitive> & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive
			data-slot="toggle"
			data-variant={variant}
			data-size={size}
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export const toggleGroupVariants = cvaWithMeta('rounded-md group/toggle-group flex items-center gap-[calc(var(--gap)*1px)]', {
	variants: {
		variant: {
			filled: 'bg-muted p-1',
			none: 'bg-transparent',
			outlined: 'border border-input shadow-xs p-1',
			bordered: 'border border-input p-1',
			brand: 'bg-primary/10 p-1',
			underlined: 'border-b border-input rounded-none',
			default: 'bg-transparent',
		} satisfies Record<InputVariant, string>,
		size: {
			xs: 'gap-0.5',
			sm: 'gap-0.5',
			md: 'gap-1',
			lg: 'gap-1',
			xl: 'gap-1.5',
			'2xl': 'gap-2',
		} satisfies Record<InputSize, string>,
		orientation: {
			horizontal: 'flex-row',
			vertical: 'flex-col items-stretch',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'md',
		orientation: 'horizontal',
	},
});

function ToggleGroup({
	className,
	variant,
	size,
	spacing = 0,
	orientation = 'horizontal',
	children,
	...props
}: React.ComponentProps<typeof ToggleGroupPrimitive> &
	VariantProps<typeof toggleVariants> & {
		spacing?: number;
		orientation?: 'horizontal' | 'vertical';
	}) {
	return (
		<ToggleGroupPrimitive
			data-slot="toggle-group"
			data-variant={variant}
			data-size={size}
			data-spacing={spacing}
			data-orientation={orientation}
			style={{ '--gap': spacing } as React.CSSProperties}
			className={cn(toggleGroupVariants({ orientation, variant, size }), className)}
			{...props}>
			{children}
		</ToggleGroupPrimitive>
	);
}

const ToggleGroupCompound = Object.assign(ToggleGroup, {
	Item: ToggleGroupItem,
});

export { ToggleGroupCompound as ToggleGroup, ToggleGroupItem };
