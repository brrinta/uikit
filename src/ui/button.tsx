import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cn, cvaWithMeta } from '../lib/utils';
import { Spinner } from './spinner';
import { Separator } from './separator';

/* -------------------------------------------------------------------------------------------------
 * Color system
 *
 * Every color sets four CSS variables; every variant/appearance reads them. Adding a color is one
 * line, and variant × color combinations no longer need hand-written compound classes.
 *
 *   --btn-bg     solid background
 *   --btn-fg     text on the solid background
 *   --btn-hover  solid hover background
 *   --btn-text   text for light / outline / dashed / ghost (usually the base color)
 * -----------------------------------------------------------------------------------------------*/

// NOTE: Tailwind scans source text for class names, so the palette entries below must be literal
// strings — do not generate them from a template.
export const buttonColors = {
	primary: '[--btn-bg:var(--color-primary)] [--btn-fg:var(--color-primary-foreground)] [--btn-hover:var(--color-primary)] [--btn-text:var(--color-primary)]',
	brand: '[--btn-bg:var(--color-brand)] [--btn-fg:var(--color-brand-foreground)] [--btn-hover:var(--color-brand)] [--btn-text:var(--color-brand)]',
	secondary:
		'[--btn-bg:var(--color-secondary)] [--btn-fg:var(--color-secondary-foreground)] [--btn-hover:var(--color-secondary)] [--btn-text:var(--color-secondary-foreground)]',
	accent:
		'[--btn-bg:var(--color-accent)] [--btn-fg:var(--color-accent-foreground)] [--btn-hover:var(--color-accent)] [--btn-text:var(--color-accent-foreground)]',
	destructive: '[--btn-bg:var(--color-destructive)] [--btn-fg:var(--color-destructive-foreground)] [--btn-hover:var(--color-destructive)] [--btn-text:var(--color-destructive)]',
	success: '[--btn-bg:var(--color-success)] [--btn-fg:var(--color-success-foreground)] [--btn-hover:var(--color-success)] [--btn-text:var(--color-success)]',
	warning: '[--btn-bg:var(--color-warning)] [--btn-fg:var(--color-warning-foreground)] [--btn-hover:var(--color-warning)] [--btn-text:var(--color-warning)]',
	info: '[--btn-bg:var(--color-info)] [--btn-fg:var(--color-info-foreground)] [--btn-hover:var(--color-info)] [--btn-text:var(--color-info)]',
	white:
		'[--btn-bg:var(--color-white)] [--btn-fg:var(--color-foreground)] [--btn-hover:var(--color-gray-50)] [--btn-text:var(--color-foreground)] dark:[--btn-bg:var(--color-zinc-950)] dark:[--btn-fg:var(--color-white)] dark:[--btn-hover:var(--color-zinc-900)] dark:[--btn-text:var(--color-white)]',
	mono: '[--btn-bg:var(--color-zinc-950)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-zinc-800)] [--btn-text:var(--color-zinc-950)] dark:[--btn-bg:var(--color-zinc-300)] dark:[--btn-fg:var(--color-black)] dark:[--btn-hover:var(--color-zinc-200)] dark:[--btn-text:var(--color-zinc-300)]',
	foreground:
		'[--btn-bg:var(--color-foreground)] [--btn-fg:var(--color-background)] [--btn-hover:var(--color-foreground)] [--btn-text:var(--color-foreground)]',
	inverse: '[--btn-bg:currentColor] [--btn-fg:var(--color-background)] [--btn-hover:currentColor] [--btn-text:currentColor]',
	red: '[--btn-bg:var(--color-red-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-red-600)] [--btn-text:var(--color-red-600)] dark:[--btn-text:var(--color-red-400)]',
	orange:
		'[--btn-bg:var(--color-orange-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-orange-600)] [--btn-text:var(--color-orange-600)] dark:[--btn-text:var(--color-orange-400)]',
	amber:
		'[--btn-bg:var(--color-amber-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-amber-600)] [--btn-text:var(--color-amber-600)] dark:[--btn-text:var(--color-amber-400)]',
	yellow:
		'[--btn-bg:var(--color-yellow-500)] [--btn-fg:var(--color-black)] [--btn-hover:var(--color-yellow-400)] [--btn-text:var(--color-yellow-600)] dark:[--btn-text:var(--color-yellow-400)]',
	lime: '[--btn-bg:var(--color-lime-500)] [--btn-fg:var(--color-black)] [--btn-hover:var(--color-lime-400)] [--btn-text:var(--color-lime-600)] dark:[--btn-text:var(--color-lime-400)]',
	green:
		'[--btn-bg:var(--color-green-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-green-600)] [--btn-text:var(--color-green-600)] dark:[--btn-text:var(--color-green-400)]',
	emerald:
		'[--btn-bg:var(--color-emerald-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-emerald-600)] [--btn-text:var(--color-emerald-600)] dark:[--btn-text:var(--color-emerald-400)]',
	teal: '[--btn-bg:var(--color-teal-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-teal-600)] [--btn-text:var(--color-teal-600)] dark:[--btn-text:var(--color-teal-400)]',
	cyan: '[--btn-bg:var(--color-cyan-500)] [--btn-fg:var(--color-black)] [--btn-hover:var(--color-cyan-400)] [--btn-text:var(--color-cyan-600)] dark:[--btn-text:var(--color-cyan-400)]',
	sky: '[--btn-bg:var(--color-sky-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-sky-600)] [--btn-text:var(--color-sky-600)] dark:[--btn-text:var(--color-sky-400)]',
	blue: '[--btn-bg:var(--color-blue-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-blue-600)] [--btn-text:var(--color-blue-600)] dark:[--btn-text:var(--color-blue-400)]',
	indigo:
		'[--btn-bg:var(--color-indigo-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-indigo-600)] [--btn-text:var(--color-indigo-600)] dark:[--btn-text:var(--color-indigo-400)]',
	violet:
		'[--btn-bg:var(--color-violet-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-violet-600)] [--btn-text:var(--color-violet-600)] dark:[--btn-text:var(--color-violet-400)]',
	purple:
		'[--btn-bg:var(--color-purple-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-purple-600)] [--btn-text:var(--color-purple-600)] dark:[--btn-text:var(--color-purple-400)]',
	fuchsia:
		'[--btn-bg:var(--color-fuchsia-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-fuchsia-600)] [--btn-text:var(--color-fuchsia-600)] dark:[--btn-text:var(--color-fuchsia-400)]',
	pink: '[--btn-bg:var(--color-pink-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-pink-600)] [--btn-text:var(--color-pink-600)] dark:[--btn-text:var(--color-pink-400)]',
	rose: '[--btn-bg:var(--color-rose-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-rose-600)] [--btn-text:var(--color-rose-600)] dark:[--btn-text:var(--color-rose-400)]',
	slate:
		'[--btn-bg:var(--color-slate-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-slate-600)] [--btn-text:var(--color-slate-600)] dark:[--btn-text:var(--color-slate-400)]',
	gray: '[--btn-bg:var(--color-gray-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-gray-600)] [--btn-text:var(--color-gray-600)] dark:[--btn-text:var(--color-gray-400)]',
	zinc: '[--btn-bg:var(--color-zinc-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-zinc-600)] [--btn-text:var(--color-zinc-600)] dark:[--btn-text:var(--color-zinc-400)]',
	neutral:
		'[--btn-bg:var(--color-neutral-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-neutral-600)] [--btn-text:var(--color-neutral-600)] dark:[--btn-text:var(--color-neutral-400)]',
	stone:
		'[--btn-bg:var(--color-stone-500)] [--btn-fg:var(--color-white)] [--btn-hover:var(--color-stone-600)] [--btn-text:var(--color-stone-600)] dark:[--btn-text:var(--color-stone-400)]',
} as const;

export type ButtonColor = keyof typeof buttonColors;

// "Open" look = pressed via `selected` (data-state=open) or an open Base UI popup trigger
// (data-popup-open / aria-expanded). Written out literally so Tailwind's scanner sees every class.
export const buttonVariants = cvaWithMeta(
	[
		'group inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap font-medium',
		'transition-[color,background-color,border-color,box-shadow,opacity] duration-150 outline-none',
		'ring-offset-background',
		'disabled:pointer-events-none disabled:opacity-60 data-disabled:pointer-events-none data-disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
		'has-data-[slot=button-arrow]:justify-between',
	],
	{
		variants: {
			variant: {
				solid: cn('bg-(--btn-bg) text-(--btn-fg) hover:bg-(--btn-hover)', 'data-[state=open]:bg-(--btn-hover) data-popup-open:bg-(--btn-hover) aria-expanded:bg-(--btn-hover)'),
				outline: cn(
					'border border-(--btn-text)/30 bg-(--btn-text)/8 text-(--btn-text) hover:border-(--btn-text)/50 hover:bg-(--btn-text)/15',
					'data-[state=open]:border-(--btn-text)/50 data-[state=open]:bg-(--btn-text)/15 data-popup-open:border-(--btn-text)/50 data-popup-open:bg-(--btn-text)/15 aria-expanded:border-(--btn-text)/50 aria-expanded:bg-(--btn-text)/15',
				),
				dashed: cn(
					'border border-dashed border-(--btn-text)/30 bg-(--btn-text)/8 text-(--btn-text) hover:border-(--btn-text)/50 hover:bg-(--btn-text)/15',
					'data-[state=open]:border-(--btn-text)/50 data-[state=open]:bg-(--btn-text)/15 data-popup-open:border-(--btn-text)/50 data-popup-open:bg-(--btn-text)/15 aria-expanded:border-(--btn-text)/50 aria-expanded:bg-(--btn-text)/15',
				),
				ghost: cn('text-(--btn-text) hover:bg-(--btn-text)/10', 'data-[state=open]:bg-(--btn-text)/10 data-popup-open:bg-(--btn-text)/10 aria-expanded:bg-(--btn-text)/10'),
				dim: cn('text-muted-foreground hover:text-(--btn-text)', 'data-[state=open]:text-(--btn-text) data-popup-open:text-(--btn-text) aria-expanded:text-(--btn-text)'),
				link: 'h-auto rounded-none bg-transparent p-0 text-(--btn-text) underline-offset-4 hover:underline',
			},
			color: buttonColors,
			appearance: {
				default: '',
				// Tinted background with colored text; hover deepens the tint.
				light: cn(
					'border-transparent bg-(--btn-text)/10 text-(--btn-text) hover:bg-(--btn-text)/20',
					'data-[state=open]:bg-(--btn-text)/20 data-popup-open:bg-(--btn-text)/20 aria-expanded:bg-(--btn-text)/20',
				),
				ghost: cn('bg-transparent text-(--btn-text) hover:bg-(--btn-text)/10', 'data-[state=open]:bg-(--btn-text)/10 data-popup-open:bg-(--btn-text)/10 aria-expanded:bg-(--btn-text)/10'),
			},
			size: {
				xs: 'h-7 gap-1 px-2 text-xs [&_svg:not([class*=size-])]:size-3.5',
				sm: 'h-8 gap-1.5 px-2.5 text-xs [&_svg:not([class*=size-])]:size-3.5',
				md: 'h-9 gap-1.5 px-3 text-sm',
				lg: 'h-10 gap-2 px-4 text-sm',
				xl: 'h-11 gap-2 px-5 text-base [&_svg:not([class*=size-])]:size-5',
				icon: 'size-9 p-0',
				submit: 'h-10 gap-2 px-16 text-base font-semibold [&_svg:not([class*=size-])]:size-6',
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
			mode: {
				default: 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				icon: 'p-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				link: cn('h-auto rounded-none bg-transparent p-0 hover:bg-transparent', 'data-[state=open]:bg-transparent data-popup-open:bg-transparent aria-expanded:bg-transparent'),
				// Looks like a form field: used by Select / Combobox / DatePicker triggers.
				input: cn(
					'justify-start border-input bg-background font-normal text-foreground shadow-xs hover:bg-background',
					'[&_svg]:text-muted-foreground [&_svg]:transition-colors hover:[&_svg]:text-foreground',
					'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30',
					'data-[state=open]:border-ring data-[state=open]:ring-[3px] data-[state=open]:ring-ring/30 data-popup-open:border-ring data-popup-open:ring-[3px] data-popup-open:ring-ring/30 aria-expanded:border-ring aria-expanded:ring-[3px] aria-expanded:ring-ring/30',
					'aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20',
					'in-data-[invalid=true]:border-destructive/60 in-data-[invalid=true]:ring-destructive/10 dark:in-data-[invalid=true]:border-destructive dark:in-data-[invalid=true]:ring-destructive/20',
				),
			},
			underline: {
				solid: 'underline decoration-solid underline-offset-4',
				dashed: 'underline decoration-dashed underline-offset-4',
			},
			autoHeight: {
				true: 'h-auto py-2 whitespace-normal text-start',
				false: '',
			},
			placeholder: {
				true: 'text-muted-foreground',
				false: '',
			},
			fullWidth: {
				true: 'w-full',
				false: '',
			},
		},
		compoundVariants: [
			// Solid/outline/dashed pick up a subtle shadow in the standard modes.
			{ variant: ['solid', 'outline', 'dashed'], mode: ['default', 'icon'], appearance: 'default', className: 'shadow-xs shadow-black/5' },
			// Neutral-tinted variants use the accent foreground so icons and text don't look washed out.
			{ variant: ['outline', 'dashed', 'ghost'], color: ['white', 'mono', 'foreground'], className: '[&_svg:not([class*=text-])]:opacity-70' },
			// Field-like buttons should never be tinted by the color.
			{ mode: 'input', variant: ['outline', 'dashed'], className: 'border-input bg-background text-foreground hover:border-input hover:bg-background' },
			// Icon size must stay square regardless of `mode`.
			{ size: 'icon', mode: ['default', 'input'], className: 'px-0' },
		],
		defaultVariants: {
			variant: 'solid',
			color: 'primary',
			appearance: 'default',
			size: 'md',
			radius: 'md',
			mode: 'default',
		},
	},
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type ButtonVariant = NonNullable<ButtonVariantProps['variant']>;

/** Older call sites used these as `variant`; they map onto `variant="solid"` + a `color`. */
export type LegacyButtonVariant = 'primary' | 'secondary' | 'destructive';
const LEGACY_VARIANTS: Record<LegacyButtonVariant, ButtonColor> = {
	primary: 'primary',
	secondary: 'secondary',
	destructive: 'destructive',
};

export type ButtonVariantInput = Omit<ButtonVariantProps, 'variant' | 'underline'> & {
	variant?: ButtonVariant | LegacyButtonVariant | null;
	underline?: ButtonVariantProps['underline'];
	/** @deprecated use `underline` */
	underlined?: ButtonVariantProps['underline'];
};

/**
 * Resolves legacy variant names and returns props safe to pass to `buttonVariants`.
 * Use this instead of calling `buttonVariants` directly when the caller may pass `variant="primary"`.
 */
export function resolveButtonVariants({ variant, color, underline, underlined, ...rest }: ButtonVariantInput): ButtonVariantProps {
	const legacy = variant && variant in LEGACY_VARIANTS ? LEGACY_VARIANTS[variant as LegacyButtonVariant] : undefined;
	return {
		...rest,
		variant: legacy ? 'solid' : (variant as ButtonVariant | null | undefined),
		color: color ?? legacy,
		underline: underline ?? underlined,
	};
}

/** Convenience for non-Button elements that want button styling (calendar nav, toolbar, links). */
export function buttonClassName(input: ButtonVariantInput = {}, className?: string) {
	return cn(buttonVariants(resolveButtonVariants(input)), className);
}

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/

export interface ButtonProps
	extends Omit<React.ComponentPropsWithRef<'button'>, 'color' | 'className'>,
		Omit<ButtonVariantInput, 'placeholder'>,
		Pick<ButtonPrimitive.Props, 'render' | 'nativeButton' | 'focusableWhenDisabled'> {
	className?: string;
	/** Renders the pressed/open look (same styling as an open popup trigger). */
	selected?: boolean;
	/** Shows a spinner, disables interaction and sets `aria-busy`. */
	loading?: boolean;
	/** Leading icon (or any node) rendered before `children`. */
	icon?: React.ReactNode;
	/** Style as a placeholder (muted text), e.g. an empty Select trigger. */
	placeholder?: boolean;
	/** Extra content hidden on small screens — typically the label of an icon button. */
	hideable?: useRender.ComponentProps<'span'>;
}

const spinnerSizeFor: Record<string, React.ComponentProps<typeof Spinner>['size']> = {
	xs: 'xs',
	sm: 'sm',
	md: 'md',
	lg: 'md',
	xl: 'lg',
	icon: 'md',
	submit: 'lg',
};

function Button({
	className,
	children,
	selected,
	variant,
	color,
	radius,
	appearance,
	mode,
	size,
	autoHeight,
	fullWidth,
	underline,
	underlined,
	placeholder = false,
	loading = false,
	disabled,
	type = 'button',
	render,
	nativeButton,
	focusableWhenDisabled,
	hideable,
	icon,
	...props
}: ButtonProps) {
	const resolved = resolveButtonVariants({
		variant,
		color,
		radius,
		appearance,
		mode,
		size,
		autoHeight,
		fullWidth,
		underline,
		underlined,
		placeholder,
	});
	const isDisabled = Boolean(disabled || loading);
	const isIconOnly = mode === 'icon' || size === 'icon';

	const hideableEl = useRender({
		defaultTagName: 'span',
		render: hideable?.render,
		state: { slot: 'button-hideable' },
		props: mergeProps<'span'>({ className: cn('flex items-center justify-center max-sm:hidden', hideable?.className) }, hideable ?? {}),
	});

	return (
		<ButtonPrimitive
			render={render}
			nativeButton={nativeButton}
			focusableWhenDisabled={focusableWhenDisabled}
			disabled={isDisabled}
			type={type}
			aria-busy={loading || undefined}
			data-slot="button"
			data-state={selected ? 'open' : undefined}
			data-loading={loading || undefined}
			data-variant={resolved.variant ?? 'solid'}
			data-color={resolved.color ?? 'primary'}
			data-size={resolved.size ?? 'md'}
			data-mode={resolved.mode ?? 'default'}
			data-appearance={resolved.appearance ?? 'default'}
			className={cn(buttonVariants(resolved), className)}
			{...props}
		>
			{loading ? <Spinner size={spinnerSizeFor[size ?? 'md']} data-slot="button-spinner" /> : icon}
			{isIconOnly && loading ? null : (
				<>
					{hideable ? hideableEl : null}
					{children}
				</>
			)}
		</ButtonPrimitive>
	);
}
Button.displayName = 'Button';

/* -------------------------------------------------------------------------------------------------
 * ButtonArrow — trailing chevron for dropdown-style triggers
 * -----------------------------------------------------------------------------------------------*/

export interface ButtonArrowProps extends React.SVGProps<SVGSVGElement> {
	icon?: LucideIcon;
}

function ButtonArrow({ icon: Icon = ChevronDown, className, ...props }: ButtonArrowProps) {
	return (
		<Icon
			data-slot="button-arrow"
			aria-hidden
			className={cn('ms-auto -me-1 transition-transform group-data-[state=open]:rotate-180 group-data-popup-open:rotate-180', className)}
			{...props}
		/>
	);
}
ButtonArrow.displayName = 'ButtonArrow';

/* -------------------------------------------------------------------------------------------------
 * ButtonGroup
 * -----------------------------------------------------------------------------------------------*/

export const buttonGroupVariants = cvaWithMeta(
	[
		'flex w-fit items-stretch',
		'*:focus-visible:relative *:focus-visible:z-10',
		'has-[>[data-slot=button-group]]:gap-2',
		'[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit [&>input]:flex-1',
		'has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md',
	],
	{
		variants: {
			orientation: {
				horizontal:
					'[&>[data-slot]]:rounded-none [&>[data-slot]:first-child]:rounded-l-[inherit] [&>[data-slot]:last-child]:rounded-r-[inherit] [&>[data-slot]:not(:first-child)]:border-l-0 [&>[data-slot]:not(:first-child)]:-ml-px',
				vertical:
					'flex-col [&>[data-slot]]:rounded-none [&>[data-slot]:first-child]:rounded-t-[inherit] [&>[data-slot]:last-child]:rounded-b-[inherit] [&>[data-slot]:not(:first-child)]:border-t-0 [&>[data-slot]:not(:first-child)]:-mt-px',
			},
			radius: {
				none: 'rounded-none',
				sm: 'rounded-sm',
				md: 'rounded-md',
				lg: 'rounded-lg',
				full: 'rounded-full',
			},
		},
		defaultVariants: { orientation: 'horizontal', radius: 'md' },
	},
);

export type ButtonGroupProps = React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>;

function ButtonGroup({ className, orientation, radius, ...props }: ButtonGroupProps) {
	return (
		<div
			role="group"
			data-slot="button-group"
			data-orientation={orientation ?? 'horizontal'}
			className={cn(buttonGroupVariants({ orientation, radius }), className)}
			{...props}
		/>
	);
}
ButtonGroup.displayName = 'ButtonGroup';

function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<'div'>) {
	return useRender({
		defaultTagName: 'div',
		render,
		state: { slot: 'button-group-text' },
		props: mergeProps<'div'>(
			{
				className: cn(
					'flex items-center gap-2 rounded-md border bg-muted px-2.5 text-sm font-medium shadow-xs',
					'[&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4',
					className,
				),
			},
			props,
		),
	});
}
ButtonGroupText.displayName = 'ButtonGroupText';

function ButtonGroupSeparator({ className, orientation = 'vertical', ...props }: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="button-group-separator"
			orientation={orientation}
			className={cn(
				'relative self-stretch bg-input',
				'data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto',
				'data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto',
				className,
			)}
			{...props}
		/>
	);
}
ButtonGroupSeparator.displayName = 'ButtonGroupSeparator';

const CompoundButton = Object.assign(Button, {
	Arrow: ButtonArrow,
	Group: ButtonGroup,
	GroupText: ButtonGroupText,
	GroupSeparator: ButtonGroupSeparator,
});

export { CompoundButton as Button, ButtonArrow, ButtonGroup, ButtonGroupText, ButtonGroupSeparator };
