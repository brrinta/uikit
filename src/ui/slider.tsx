import * as React from 'react';
import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { type VariantProps } from 'class-variance-authority';
import { cn, cvaWithMeta } from '../lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Slider — built on Base UI Slider. Supports single value and ranges (multiple thumbs),
 * horizontal/vertical orientation, keyboard + pointer input, and `format`/`locale` for the value.
 *
 * Usage:
 *   <Slider defaultValue={40} />
 *   <Slider defaultValue={[20, 60]} showValue label="Price" />
 *   <Slider>
 *     <Slider.Label>Volume</Slider.Label>
 *     <Slider.Value />
 *     <Slider.Control><Slider.Track><Slider.Indicator /><Slider.Thumb /></Slider.Track></Slider.Control>
 *   </Slider>
 * -----------------------------------------------------------------------------------------------*/

export const sliderVariants = cvaWithMeta('relative flex touch-none select-none data-disabled:opacity-50 data-disabled:pointer-events-none', {
	variants: {
		size: {
			sm: '[--slider-track:0.25rem] [--slider-thumb:0.875rem]',
			md: '[--slider-track:0.375rem] [--slider-thumb:1.125rem]',
			lg: '[--slider-track:0.5rem] [--slider-thumb:1.375rem]',
		},
		color: {
			primary: '[--slider-indicator:var(--color-primary)]',
			brand: '[--slider-indicator:var(--color-brand)]',
			success: '[--slider-indicator:var(--color-success)]',
			warning: '[--slider-indicator:var(--color-warning)]',
			info: '[--slider-indicator:var(--color-info)]',
			destructive: '[--slider-indicator:var(--color-destructive)]',
			red: '[--slider-indicator:var(--color-red-500)]',
			orange: '[--slider-indicator:var(--color-orange-500)]',
			amber: '[--slider-indicator:var(--color-amber-500)]',
			green: '[--slider-indicator:var(--color-green-500)]',
			emerald: '[--slider-indicator:var(--color-emerald-500)]',
			teal: '[--slider-indicator:var(--color-teal-500)]',
			sky: '[--slider-indicator:var(--color-sky-500)]',
			blue: '[--slider-indicator:var(--color-blue-500)]',
			indigo: '[--slider-indicator:var(--color-indigo-500)]',
			violet: '[--slider-indicator:var(--color-violet-500)]',
			purple: '[--slider-indicator:var(--color-purple-500)]',
			pink: '[--slider-indicator:var(--color-pink-500)]',
			rose: '[--slider-indicator:var(--color-rose-500)]',
		},
		orientation: {
			horizontal: 'w-full flex-col gap-2',
			vertical: 'h-48 flex-row-reverse items-center gap-2',
		},
	},
	defaultVariants: { size: 'md', color: 'primary', orientation: 'horizontal' },
});

export type SliderVariantProps = VariantProps<typeof sliderVariants>;

export type SliderRootProps<Value extends number | readonly number[] = number | readonly number[]> = Omit<
	SliderPrimitive.Root.Props<Value>,
	'className' | 'color' | 'orientation'
> &
	Omit<SliderVariantProps, 'orientation'> & {
		className?: string;
		orientation?: SliderVariantProps['orientation'];
		/** Shortcut: renders `<Slider.Label>` above the control. */
		label?: React.ReactNode;
		/** Shortcut: renders `<Slider.Value>` next to the label. */
		showValue?: boolean;
	};

function SliderRoot<Value extends number | readonly number[] = number | readonly number[]>({
	className,
	size,
	color,
	orientation = 'horizontal',
	label,
	showValue,
	children,
	...props
}: SliderRootProps<Value>) {
	const current: unknown = props.value ?? props.defaultValue;
	const thumbCount = Array.isArray(current) ? current.length : 1;
	const hasHeader = label != null || showValue;
	return (
		<SliderPrimitive.Root
			data-slot="slider"
			data-size={size ?? 'md'}
			orientation={orientation ?? 'horizontal'}
			className={cn(sliderVariants({ size, color, orientation }), className)}
			{...props}>
			{children ?? (
				<>
					{hasHeader && (
						<div className="flex items-center justify-between gap-2">
							{label != null ? <SliderLabel>{label}</SliderLabel> : <span />}
							{showValue && <SliderValue />}
						</div>
					)}
					<SliderControl>
						<SliderTrack>
							<SliderIndicator />
							{Array.from({ length: thumbCount }, (_, i) => (
								<SliderThumb key={i} index={i} />
							))}
						</SliderTrack>
					</SliderControl>
				</>
			)}
		</SliderPrimitive.Root>
	);
}
SliderRoot.displayName = 'Slider';

function SliderLabel({ className, ...props }: Omit<SliderPrimitive.Label.Props, 'className'> & { className?: string }) {
	return <SliderPrimitive.Label data-slot="slider-label" className={cn('text-sm font-medium', className)} {...props} />;
}

function SliderValue({ className, ...props }: Omit<SliderPrimitive.Value.Props, 'className'> & { className?: string }) {
	return <SliderPrimitive.Value data-slot="slider-value" className={cn('text-sm tabular-nums text-muted-foreground', className)} {...props} />;
}

function SliderControl({ className, ...props }: Omit<SliderPrimitive.Control.Props, 'className'> & { className?: string }) {
	return (
		<SliderPrimitive.Control
			data-slot="slider-control"
			className={cn(
				'flex items-center',
				'data-[orientation=horizontal]:h-(--slider-thumb) data-[orientation=horizontal]:w-full',
				'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-(--slider-thumb) data-[orientation=vertical]:flex-col',
				className,
			)}
			{...props}
		/>
	);
}

function SliderTrack({ className, ...props }: Omit<SliderPrimitive.Track.Props, 'className'> & { className?: string }) {
	return (
		<SliderPrimitive.Track
			data-slot="slider-track"
			className={cn(
				'relative rounded-full bg-muted select-none',
				'data-[orientation=horizontal]:h-(--slider-track) data-[orientation=horizontal]:w-full',
				'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-(--slider-track)',
				className,
			)}
			{...props}
		/>
	);
}

function SliderIndicator({ className, ...props }: Omit<SliderPrimitive.Indicator.Props, 'className'> & { className?: string }) {
	return (
		<SliderPrimitive.Indicator
			data-slot="slider-indicator"
			className={cn('rounded-full bg-(--slider-indicator)', className)}
			{...props}
		/>
	);
}

function SliderThumb({ className, ...props }: Omit<SliderPrimitive.Thumb.Props, 'className'> & { className?: string }) {
	return (
		<SliderPrimitive.Thumb
			data-slot="slider-thumb"
			className={cn(
				'size-(--slider-thumb) rounded-full border-2 border-(--slider-indicator) bg-background shadow-sm',
				'transition-[box-shadow,transform] outline-none',
				'hover:scale-105 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-(--slider-indicator)/30',
				'data-dragging:scale-110 data-dragging:ring-4 data-dragging:ring-(--slider-indicator)/30',
				className,
			)}
			{...props}
		/>
	);
}

const Slider = Object.assign(SliderRoot, {
	Label: SliderLabel,
	Value: SliderValue,
	Control: SliderControl,
	Track: SliderTrack,
	Indicator: SliderIndicator,
	Thumb: SliderThumb,
});

export { Slider, SliderLabel, SliderValue, SliderControl, SliderTrack, SliderIndicator, SliderThumb };
