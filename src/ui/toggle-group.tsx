'use client';

import * as React from 'react';
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import { type VariantProps } from 'class-variance-authority';
import { cn, cvaWithMeta } from '../lib/utils';

// ---------------------------------------------------------------------------
// Toggle item variants
// ---------------------------------------------------------------------------
//
// Mirrors the Button component's variant/color/appearance system, with one
// extra dimension: `data-pressed` (Base UI's pressed-state attribute on a
// Toggle). For each visual style we define both the resting look and the
// pressed look.
//
// Conventions:
//   - `variant`     → shape/treatment (solid, outline, dashed, ghost, link, dim, underlined)
//   - `color`       → palette (semantic + full Tailwind ramp)
//   - `appearance`  → optional modifier; `light` switches solid colors to a
//                     muted tinted background, matching Button.
//   - `size`        → sizing scale aligned with Button (xs/sm/md/lg/xl/2xl/icon)
//
// ---------------------------------------------------------------------------

export const toggleVariants = cvaWithMeta(
	cn(
		'cursor-pointer group/toggle focus-visible:outline-hidden inline-flex items-center justify-center',
		'[&_svg:not([class*=size-])]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none',
		'whitespace-nowrap text-sm font-medium ring-offset-background transition-[color,box-shadow,background-color,border-color]',
		'disabled:pointer-events-none disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60',
		'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
		'aria-invalid:ring-destructive/20 aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40',
	),
	{
		variants: {
			variant: {
				solid: '',
				outline: 'bg-background border border-input hover:bg-accent',
				dashed: 'border border-input border-dashed bg-background hover:bg-accent',
				ghost: 'hover:bg-accent',
				dim: 'text-muted-foreground hover:text-foreground data-pressed:text-foreground',
				underlined: 'rounded-none border-b-2 border-transparent hover:border-muted data-pressed:border-primary',
				link: 'bg-transparent hover:bg-transparent hover:underline underline-offset-4',
			},
			color: {
				primary: '',
				brand: '',
				warning: '',
				success: '',
				info: '',
				accent: '',
				destructive: '',
				secondary: '',
				foreground: '',
				inverse: '',
				white: '',
				mono: '',
				red: '',
				orange: '',
				amber: '',
				yellow: '',
				lime: '',
				green: '',
				emerald: '',
				teal: '',
				cyan: '',
				sky: '',
				blue: '',
				indigo: '',
				violet: '',
				purple: '',
				fuchsia: '',
				pink: '',
				rose: '',
				slate: '',
				gray: '',
				zinc: '',
				neutral: '',
				stone: '',
			},
			appearance: {
				default: '',
				light: '',
			},
			size: {
				xs: 'h-6 min-w-6 px-1 gap-1 text-xs [&_svg:not([class*=size-])]:size-3',
				sm: 'h-8 min-w-8 px-2 gap-1 text-xs [&_svg:not([class*=size-])]:size-3.5',
				md: 'h-9 min-w-9 px-3 gap-1.5 text-sm',
				lg: 'h-10 min-w-10 px-4 gap-1.5 text-sm',
				xl: 'h-11 min-w-11 px-5 gap-2 text-base [&_svg:not([class*=size-])]:size-5',
				'2xl': 'h-12 min-w-12 px-6 gap-2 text-lg [&_svg:not([class*=size-])]:size-6',
				icon: 'size-9 p-0 [&_svg:not([class*=size-])]:size-4 shrink-0',
			},
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
			// -----------------------------------------------------------------
			// SOLID + color (default appearance)
			// Resting = neutral muted; Pressed = full color fill.
			// -----------------------------------------------------------------
			{
				variant: 'solid',
				color: 'primary',
				className: 'bg-muted hover:bg-muted-foreground/20 data-pressed:bg-primary data-pressed:text-primary-foreground data-pressed:hover:bg-primary/90',
			},
			{
				variant: 'solid',
				color: 'brand',
				className: 'bg-muted hover:bg-muted-foreground/20 data-pressed:bg-brand data-pressed:text-brand-foreground data-pressed:hover:bg-brand/90',
			},
			{
				variant: 'solid',
				color: 'destructive',
				className:
					'bg-muted hover:bg-muted-foreground/20 data-pressed:bg-destructive data-pressed:text-destructive-foreground data-pressed:hover:bg-destructive/90',
			},
			{
				variant: 'solid',
				color: 'success',
				className: 'bg-muted hover:bg-muted-foreground/20 data-pressed:bg-success data-pressed:text-success-foreground data-pressed:hover:bg-success/90',
			},
			{
				variant: 'solid',
				color: 'warning',
				className: 'bg-muted hover:bg-muted-foreground/20 data-pressed:bg-warning data-pressed:text-warning-foreground data-pressed:hover:bg-warning/90',
			},
			{
				variant: 'solid',
				color: 'info',
				className: 'bg-muted hover:bg-muted-foreground/20 data-pressed:bg-info data-pressed:text-info-foreground data-pressed:hover:bg-info/90',
			},
			{
				variant: 'solid',
				color: 'accent',
				className: 'bg-muted hover:bg-muted-foreground/20 data-pressed:bg-accent data-pressed:text-accent-foreground data-pressed:hover:bg-accent/80',
			},
			{
				variant: 'solid',
				color: 'secondary',
				className:
					'bg-muted hover:bg-muted-foreground/20 data-pressed:bg-secondary data-pressed:text-secondary-foreground data-pressed:hover:bg-secondary/80',
			},
			{
				variant: 'solid',
				color: 'mono',
				className:
					'bg-muted hover:bg-muted-foreground/20 data-pressed:bg-zinc-950 data-pressed:text-white dark:data-pressed:bg-zinc-300 dark:data-pressed:text-black',
			},
			{
				variant: 'solid',
				color: 'white',
				className:
					'bg-muted hover:bg-muted-foreground/20 data-pressed:bg-white data-pressed:text-foreground dark:data-pressed:bg-zinc-950 dark:data-pressed:text-white',
			},

			// Tailwind palette — solid
			...(
				[
					['red', 'red-500', 'red-600', 'white'],
					['orange', 'orange-500', 'orange-600', 'white'],
					['amber', 'amber-500', 'amber-600', 'white'],
					['yellow', 'yellow-500', 'yellow-400', 'black'],
					['lime', 'lime-500', 'lime-400', 'black'],
					['green', 'green-500', 'green-600', 'white'],
					['emerald', 'emerald-500', 'emerald-600', 'white'],
					['teal', 'teal-500', 'teal-600', 'white'],
					['cyan', 'cyan-500', 'cyan-400', 'black'],
					['sky', 'sky-500', 'sky-600', 'white'],
					['blue', 'blue-500', 'blue-600', 'white'],
					['indigo', 'indigo-500', 'indigo-600', 'white'],
					['violet', 'violet-500', 'violet-600', 'white'],
					['purple', 'purple-500', 'purple-600', 'white'],
					['fuchsia', 'fuchsia-500', 'fuchsia-600', 'white'],
					['pink', 'pink-500', 'pink-600', 'white'],
					['rose', 'rose-500', 'rose-600', 'white'],
					['slate', 'slate-500', 'slate-600', 'white'],
					['gray', 'gray-500', 'gray-600', 'white'],
					['zinc', 'zinc-500', 'zinc-600', 'white'],
					['neutral', 'neutral-500', 'neutral-600', 'white'],
					['stone', 'stone-500', 'stone-600', 'white'],
				] as const
			).map(([color, base, hover, fg]) => ({
				variant: 'solid' as const,
				color,
				className: `bg-muted hover:bg-muted-foreground/20 data-pressed:bg-${base} data-pressed:text-${fg} data-pressed:hover:bg-${hover}`,
			})),

			// -----------------------------------------------------------------
			// LIGHT appearance — Button parity (tinted bg, colored text)
			// -----------------------------------------------------------------
			{ appearance: 'light', color: 'primary', className: 'bg-primary/5 text-primary hover:bg-primary/10 data-pressed:bg-primary/20' },
			{ appearance: 'light', color: 'brand', className: 'bg-brand/5 text-brand hover:bg-brand/10 data-pressed:bg-brand/20' },
			{ appearance: 'light', color: 'destructive', className: 'bg-destructive/5 text-destructive hover:bg-destructive/10 data-pressed:bg-destructive/20' },
			{ appearance: 'light', color: 'success', className: 'bg-success/5 text-success hover:bg-success/10 data-pressed:bg-success/20' },
			{ appearance: 'light', color: 'warning', className: 'bg-warning/5 text-warning hover:bg-warning/10 data-pressed:bg-warning/20' },
			{ appearance: 'light', color: 'info', className: 'bg-info/5 text-info hover:bg-info/10 data-pressed:bg-info/20' },
			{ appearance: 'light', color: 'accent', className: 'bg-accent/5 text-accent-foreground hover:bg-accent/10 data-pressed:bg-accent/20' },
			{ appearance: 'light', color: 'secondary', className: 'bg-secondary/5 text-secondary-foreground hover:bg-secondary/10 data-pressed:bg-secondary/20' },

			// Tailwind palette — light
			...(
				[
					'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
					'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink',
					'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone',
				] as const
			).map((color) => ({
				appearance: 'light' as const,
				color,
				className: `bg-${color}-50/50 text-${color}-600 hover:bg-${color}-50 data-pressed:bg-${color}-100 dark:bg-${color}-950/10 dark:text-${color}-400 dark:hover:bg-${color}-950/20 dark:data-pressed:bg-${color}-950/40`,
			})),

			// -----------------------------------------------------------------
			// OUTLINE + color — bordered, tinted fill on pressed
			// -----------------------------------------------------------------
			{ variant: 'outline', color: 'primary', className: 'data-pressed:border-primary data-pressed:bg-primary/10 data-pressed:text-primary' },
			{ variant: 'outline', color: 'brand', className: 'data-pressed:border-brand data-pressed:bg-brand/10 data-pressed:text-brand' },
			{
				variant: 'outline',
				color: 'destructive',
				className: 'data-pressed:border-destructive data-pressed:bg-destructive/10 data-pressed:text-destructive',
			},
			{ variant: 'outline', color: 'success', className: 'data-pressed:border-success data-pressed:bg-success/10 data-pressed:text-success' },
			{ variant: 'outline', color: 'warning', className: 'data-pressed:border-warning data-pressed:bg-warning/10 data-pressed:text-warning' },
			{ variant: 'outline', color: 'info', className: 'data-pressed:border-info data-pressed:bg-info/10 data-pressed:text-info' },

			...(
				[
					'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
					'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink',
					'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone',
				] as const
			).map((color) => ({
				variant: 'outline' as const,
				color,
				className: `data-pressed:border-${color}-500/60 data-pressed:bg-${color}-50 data-pressed:text-${color}-600 dark:data-pressed:bg-${color}-950/30 dark:data-pressed:text-${color}-400 dark:data-pressed:border-${color}-400/50`,
			})),

			// DASHED inherits outline's color behavior
			{ variant: 'dashed', color: 'primary', className: 'data-pressed:border-primary data-pressed:bg-primary/10 data-pressed:text-primary' },
			{ variant: 'dashed', color: 'brand', className: 'data-pressed:border-brand data-pressed:bg-brand/10 data-pressed:text-brand' },
			{
				variant: 'dashed',
				color: 'destructive',
				className: 'data-pressed:border-destructive data-pressed:bg-destructive/10 data-pressed:text-destructive',
			},
			{ variant: 'dashed', color: 'success', className: 'data-pressed:border-success data-pressed:bg-success/10 data-pressed:text-success' },
			{ variant: 'dashed', color: 'warning', className: 'data-pressed:border-warning data-pressed:bg-warning/10 data-pressed:text-warning' },
			{ variant: 'dashed', color: 'info', className: 'data-pressed:border-info data-pressed:bg-info/10 data-pressed:text-info' },

			// -----------------------------------------------------------------
			// GHOST + color — transparent resting, tinted pressed
			// -----------------------------------------------------------------
			{ variant: 'ghost', color: 'primary', className: 'text-foreground hover:text-primary data-pressed:bg-primary/10 data-pressed:text-primary' },
			{ variant: 'ghost', color: 'brand', className: 'text-foreground hover:text-brand data-pressed:bg-brand/10 data-pressed:text-brand' },
			{
				variant: 'ghost',
				color: 'destructive',
				className: 'text-foreground hover:text-destructive data-pressed:bg-destructive/10 data-pressed:text-destructive',
			},
			{ variant: 'ghost', color: 'success', className: 'text-foreground hover:text-success data-pressed:bg-success/10 data-pressed:text-success' },
			{ variant: 'ghost', color: 'warning', className: 'text-foreground hover:text-warning data-pressed:bg-warning/10 data-pressed:text-warning' },
			{ variant: 'ghost', color: 'info', className: 'text-foreground hover:text-info data-pressed:bg-info/10 data-pressed:text-info' },

			...(
				[
					'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
					'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink',
					'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone',
				] as const
			).map((color) => ({
				variant: 'ghost' as const,
				color,
				className: `data-pressed:bg-${color}-50 data-pressed:text-${color}-600 dark:data-pressed:bg-${color}-950/30 dark:data-pressed:text-${color}-400`,
			})),

			// -----------------------------------------------------------------
			// UNDERLINED + color — colored bottom border on pressed
			// -----------------------------------------------------------------
			{ variant: 'underlined', color: 'primary', className: 'data-pressed:border-primary data-pressed:text-primary' },
			{ variant: 'underlined', color: 'brand', className: 'data-pressed:border-brand data-pressed:text-brand' },
			{ variant: 'underlined', color: 'destructive', className: 'data-pressed:border-destructive data-pressed:text-destructive' },
			{ variant: 'underlined', color: 'success', className: 'data-pressed:border-success data-pressed:text-success' },
			{ variant: 'underlined', color: 'warning', className: 'data-pressed:border-warning data-pressed:text-warning' },
			{ variant: 'underlined', color: 'info', className: 'data-pressed:border-info data-pressed:text-info' },

			// -----------------------------------------------------------------
			// LINK + color
			// -----------------------------------------------------------------
			{ variant: 'link', color: 'primary', className: 'text-muted-foreground hover:text-primary data-pressed:text-primary data-pressed:underline' },
			{
				variant: 'link',
				color: 'destructive',
				className: 'text-muted-foreground hover:text-destructive data-pressed:text-destructive data-pressed:underline',
			},
			{
				variant: 'link',
				color: 'foreground',
				className: 'text-muted-foreground hover:text-foreground data-pressed:text-foreground data-pressed:underline',
			},
		],
		defaultVariants: {
			variant: 'solid',
			color: 'primary',
			appearance: 'default',
			size: 'md',
			radius: 'md',
		},
	},
);

// ---------------------------------------------------------------------------
// Toggle GROUP variants — container styling
// ---------------------------------------------------------------------------

export const toggleGroupVariants = cvaWithMeta('group/toggle-group flex items-center', {
	variants: {
		variant: {
			solid: 'bg-muted p-1 rounded-md',
			outline: 'border border-input shadow-xs p-1 rounded-md',
			dashed: 'border border-input border-dashed shadow-xs p-1 rounded-md',
			ghost: 'bg-transparent',
			dim: 'bg-transparent',
			underlined: 'border-b border-input rounded-none',
			link: 'bg-transparent',
		},
		orientation: {
			horizontal: 'flex-row',
			vertical: 'flex-col items-stretch',
		},
	},
	defaultVariants: {
		variant: 'solid',
		orientation: 'horizontal',
	},
});

// ---------------------------------------------------------------------------
// Context — propagate variant/color/size/etc from group to items
// ---------------------------------------------------------------------------

type ToggleVariantProps = VariantProps<typeof toggleVariants>;

type ToggleGroupContextValue = Pick<ToggleVariantProps, 'variant' | 'color' | 'appearance' | 'size' | 'radius'>;

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null);

const useToggleGroupContext = () => React.useContext(ToggleGroupContext);

// ---------------------------------------------------------------------------
// Default gap (px) per size when `spacing` is not explicitly set
// ---------------------------------------------------------------------------

const DEFAULT_GAP_BY_SIZE: Record<NonNullable<ToggleVariantProps['size']>, number> = {
	xs: 2,
	sm: 2,
	md: 4,
	lg: 4,
	xl: 6,
	'2xl': 8,
	icon: 4,
};

// ---------------------------------------------------------------------------
// Group component
// ---------------------------------------------------------------------------

type ToggleGroupVariantProps = VariantProps<typeof toggleGroupVariants>;

export type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive> &
	ToggleGroupVariantProps &
	Pick<ToggleVariantProps, 'color' | 'appearance' | 'size' | 'radius'> & {
	spacing?: number;
};

function ToggleGroup({
	                     className,
	                     variant = 'solid',
	                     color = 'primary',
	                     appearance = 'default',
	                     size = 'md',
	                     radius = 'md',
	                     spacing,
	                     orientation = 'horizontal',
	                     style,
	                     children,
	                     ...props
                     }: ToggleGroupProps) {
	const gap = spacing ?? DEFAULT_GAP_BY_SIZE[size as keyof typeof DEFAULT_GAP_BY_SIZE] ?? 4;

	const contextValue = React.useMemo<ToggleGroupContextValue>(
		() => ({ variant, color, appearance, size, radius }),
		[variant, color, appearance, size, radius],
	);

	return (
		<ToggleGroupContext.Provider value={contextValue}>
			<ToggleGroupPrimitive
				data-slot="toggle-group"
				data-variant={variant}
				data-color={color}
				data-appearance={appearance}
				data-size={size}
				data-orientation={orientation}
				style={{ '--toggle-group-gap': `${gap}px`, gap: 'var(--toggle-group-gap)', ...style } as React.CSSProperties}
				className={cn(toggleGroupVariants({ orientation, variant }), className)}
				{...props}>
				{children}
			</ToggleGroupPrimitive>
		</ToggleGroupContext.Provider>
	);
}

// ---------------------------------------------------------------------------
// Item component
// ---------------------------------------------------------------------------

export type ToggleGroupItemProps = React.ComponentProps<typeof TogglePrimitive> & ToggleVariantProps;

function ToggleGroupItem({
	                         className,
	                         variant: variantProp,
	                         color: colorProp,
	                         appearance: appearanceProp,
	                         size: sizeProp,
	                         radius: radiusProp,
	                         ...props
                         }: ToggleGroupItemProps) {
	const ctx = useToggleGroupContext();

	const variant = variantProp ?? ctx?.variant ?? 'solid';
	const color = colorProp ?? ctx?.color ?? 'primary';
	const appearance = appearanceProp ?? ctx?.appearance ?? 'default';
	const size = sizeProp ?? ctx?.size ?? 'md';
	const radius = radiusProp ?? ctx?.radius ?? 'md';

	return (
		<TogglePrimitive
			data-slot="toggle"
			data-variant={variant}
			data-color={color}
			data-appearance={appearance}
			data-size={size}
			className={cn(toggleVariants({ variant, color, appearance, size, radius }), className)}
			{...props}
		/>
	);
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

const ToggleGroupCompound = Object.assign(ToggleGroup, {
	Item: ToggleGroupItem,
});

export { ToggleGroupCompound as ToggleGroup, ToggleGroupItem };