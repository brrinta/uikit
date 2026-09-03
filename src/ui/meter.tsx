import * as React from 'react';
import { Meter as MeterPrimitive } from '@base-ui/react/meter';
import { type VariantProps } from 'class-variance-authority';
import { cn, cvaWithMeta } from '../lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Meter — a static measurement within a known range (disk usage, password strength, quota).
 * Unlike Progress it does not represent a task in flight, so it renders `role="meter"`.
 *
 * Usage:
 *   <Meter value={72} label="Storage" showValue />
 *   <Meter value={3} max={5} thresholds={{ warning: 2, destructive: 4 }} />
 * -----------------------------------------------------------------------------------------------*/

export const meterVariants = cvaWithMeta('flex w-full flex-col gap-1.5', {
	variants: {
		size: {
			xs: '[--meter-h:0.25rem]',
			sm: '[--meter-h:0.375rem]',
			md: '[--meter-h:0.5rem]',
			lg: '[--meter-h:0.75rem]',
			xl: '[--meter-h:1rem]',
		},
		radius: {
			none: '[--meter-r:0]',
			sm: '[--meter-r:var(--radius-sm)]',
			md: '[--meter-r:var(--radius-md)]',
			full: '[--meter-r:9999px]',
		},
		color: {
			primary: '[--meter-indicator:var(--color-primary)]',
			brand: '[--meter-indicator:var(--color-brand)]',
			success: '[--meter-indicator:var(--color-success)]',
			warning: '[--meter-indicator:var(--color-warning)]',
			info: '[--meter-indicator:var(--color-info)]',
			destructive: '[--meter-indicator:var(--color-destructive)]',
			red: '[--meter-indicator:var(--color-red-500)]',
			orange: '[--meter-indicator:var(--color-orange-500)]',
			amber: '[--meter-indicator:var(--color-amber-500)]',
			green: '[--meter-indicator:var(--color-green-500)]',
			emerald: '[--meter-indicator:var(--color-emerald-500)]',
			teal: '[--meter-indicator:var(--color-teal-500)]',
			sky: '[--meter-indicator:var(--color-sky-500)]',
			blue: '[--meter-indicator:var(--color-blue-500)]',
			indigo: '[--meter-indicator:var(--color-indigo-500)]',
			violet: '[--meter-indicator:var(--color-violet-500)]',
			purple: '[--meter-indicator:var(--color-purple-500)]',
			pink: '[--meter-indicator:var(--color-pink-500)]',
			rose: '[--meter-indicator:var(--color-rose-500)]',
		},
	},
	defaultVariants: { size: 'sm', radius: 'full', color: 'primary' },
});

export type MeterVariantProps = VariantProps<typeof meterVariants>;

export interface MeterThresholds {
	/** Value at or above which the meter turns `warning`. */
	warning?: number;
	/** Value at or above which the meter turns `destructive`. Takes precedence over `warning`. */
	destructive?: number;
}

export interface MeterProps extends Omit<MeterPrimitive.Root.Props, 'className' | 'color'>, MeterVariantProps {
	className?: string;
	/** Shortcut: renders `<Meter.Label>`. */
	label?: React.ReactNode;
	/** Shortcut: renders `<Meter.Value>` (formatted via `format`/`locale`). */
	showValue?: boolean;
	/** Switches `color` automatically once `value` crosses a threshold. */
	thresholds?: MeterThresholds;
}

function resolveColor(value: number, color: MeterVariantProps['color'], thresholds?: MeterThresholds): MeterVariantProps['color'] {
	if (thresholds?.destructive != null && value >= thresholds.destructive) return 'destructive';
	if (thresholds?.warning != null && value >= thresholds.warning) return 'warning';
	return color;
}

function MeterRoot({ className, size, radius, color, label, showValue, thresholds, children, value, ...props }: MeterProps) {
	const resolvedColor = resolveColor(value, color, thresholds);
	return (
		<MeterPrimitive.Root
			data-slot="meter"
			data-color={resolvedColor ?? 'primary'}
			value={value}
			className={cn(meterVariants({ size, radius, color: resolvedColor }), className)}
			{...props}>
			{children ?? (
				<>
					{(label != null || showValue) && (
						<div className="flex items-center justify-between gap-2">
							{label != null ? <MeterLabel>{label}</MeterLabel> : <span />}
							{showValue && <MeterValue />}
						</div>
					)}
					<MeterTrack>
						<MeterIndicator />
					</MeterTrack>
				</>
			)}
		</MeterPrimitive.Root>
	);
}
MeterRoot.displayName = 'Meter';

function MeterLabel({ className, ...props }: Omit<MeterPrimitive.Label.Props, 'className'> & { className?: string }) {
	return <MeterPrimitive.Label data-slot="meter-label" className={cn('text-sm font-medium', className)} {...props} />;
}

function MeterValue({ className, ...props }: Omit<MeterPrimitive.Value.Props, 'className'> & { className?: string }) {
	return <MeterPrimitive.Value data-slot="meter-value" className={cn('text-sm tabular-nums text-muted-foreground', className)} {...props} />;
}

function MeterTrack({ className, ...props }: Omit<MeterPrimitive.Track.Props, 'className'> & { className?: string }) {
	return (
		<MeterPrimitive.Track
			data-slot="meter-track"
			className={cn('block h-(--meter-h) w-full overflow-hidden rounded-(--meter-r) bg-muted', className)}
			{...props}
		/>
	);
}

function MeterIndicator({ className, ...props }: Omit<MeterPrimitive.Indicator.Props, 'className'> & { className?: string }) {
	return (
		<MeterPrimitive.Indicator
			data-slot="meter-indicator"
			className={cn('block h-full rounded-(--meter-r) bg-(--meter-indicator) transition-[width] duration-300', className)}
			{...props}
		/>
	);
}

const Meter = Object.assign(MeterRoot, {
	Label: MeterLabel,
	Value: MeterValue,
	Track: MeterTrack,
	Indicator: MeterIndicator,
});

export { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator };
