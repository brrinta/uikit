import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { cn, cvaWithMeta } from '@uikit/lib/utils';
import { type VariantProps } from 'class-variance-authority';

export const progressVariants = cvaWithMeta('flex flex-wrap gap-3', {
	variants: {
		size: {
			xs: 'h-1',
			sm: 'h-1.5',
			md: 'h-2',
			lg: 'h-3',
			xl: 'h-4',
		},
		radius: {
			none: 'rounded-none',
			sm: 'rounded-sm',
			md: 'rounded-md',
			lg: 'rounded-lg',
			xl: 'rounded-xl',
			full: 'rounded-full',
		},
		color: {
			primary: '[--progress-indicator:var(--primary)]',
			brand: '[--progress-indicator:var(--brand)]',
			success: '[--progress-indicator:var(--success)]',
			warning: '[--progress-indicator:var(--warning)]',
			info: '[--progress-indicator:var(--info)]',
			destructive: '[--progress-indicator:var(--destructive)]',
			accent: '[--progress-indicator:var(--accent)]',
			red: '[--progress-indicator:var(--color-red-500)]',
			orange: '[--progress-indicator:var(--color-orange-500)]',
			amber: '[--progress-indicator:var(--color-amber-500)]',
			yellow: '[--progress-indicator:var(--color-yellow-500)]',
			lime: '[--progress-indicator:var(--color-lime-500)]',
			green: '[--progress-indicator:var(--color-green-500)]',
			emerald: '[--progress-indicator:var(--color-emerald-500)]',
			teal: '[--progress-indicator:var(--color-teal-500)]',
			cyan: '[--progress-indicator:var(--color-cyan-500)]',
			sky: '[--progress-indicator:var(--color-sky-500)]',
			blue: '[--progress-indicator:var(--color-blue-500)]',
			indigo: '[--progress-indicator:var(--color-indigo-500)]',
			violet: '[--progress-indicator:var(--color-violet-500)]',
			purple: '[--progress-indicator:var(--color-purple-500)]',
			fuchsia: '[--progress-indicator:var(--color-fuchsia-500)]',
			pink: '[--progress-indicator:var(--color-pink-500)]',
			rose: '[--progress-indicator:var(--color-rose-500)]',
			slate: '[--progress-indicator:var(--color-slate-500)]',
			gray: '[--progress-indicator:var(--color-gray-500)]',
			zinc: '[--progress-indicator:var(--color-zinc-500)]',
			neutral: '[--progress-indicator:var(--color-neutral-500)]',
			stone: '[--progress-indicator:var(--color-stone-500)]',
		},
	},
	defaultVariants: {
		size: 'sm',
		radius: 'full',
		color: 'primary',
	},
});

type ProgressProps = ProgressPrimitive.Root.Props & VariantProps<typeof progressVariants> & { striped?: boolean; stripeAnimation?: boolean };

function Progress({ className, children, value, size, radius, color, striped, stripeAnimation, ...props }: ProgressProps) {
	return (
		<ProgressPrimitive.Root
			value={value}
			data-slot="progress"
			className={cn(progressVariants({ size, radius, color }), className)}
			{...props}>
			{children}
			<ProgressTrack radius={radius}>
				<ProgressIndicator
					striped={striped}
					stripeAnimation={stripeAnimation}
				/>
			</ProgressTrack>
		</ProgressPrimitive.Root>
	);
}

function ProgressTrack({ className, radius, ...props }: ProgressPrimitive.Track.Props & { radius?: ProgressProps['radius'] }) {
	return (
		<ProgressPrimitive.Track
			className={cn(
				'bg-muted h-full relative flex w-full items-center overflow-x-hidden',
				radius === 'none' && 'rounded-none',
				radius === 'sm' && 'rounded-sm',
				radius === 'md' && 'rounded-md',
				radius === 'lg' && 'rounded-lg',
				radius === 'xl' && 'rounded-xl',
				radius === 'full' && 'rounded-full',
				className,
			)}
			data-slot="progress-track"
			{...props}
		/>
	);
}

function ProgressIndicator({
	className,
	striped,
	stripeAnimation,
	...props
}: ProgressPrimitive.Indicator.Props & { striped?: boolean; stripeAnimation?: boolean }) {
	const stripeStyle = striped
		? {
				backgroundImage: [
					'linear-gradient(45deg,',
					'color-mix(in srgb, currentColor 45%, transparent) 25%,',
					'transparent 25%,',
					'transparent 50%,',
					'color-mix(in srgb, currentColor 45%, transparent) 50%,',
					'color-mix(in srgb, currentColor 45%, transparent) 75%,',
					'transparent 75%,',
					'transparent)',
				].join(' '),
				backgroundSize: '1rem 1rem',
			}
		: undefined;

	return (
		<ProgressPrimitive.Indicator
			data-slot="progress-indicator"
			style={stripeStyle}
			className={cn('bg-(--progress-indicator) h-full transition-all text-white', stripeAnimation && 'animate-progress-stripe', className)}
			{...props}
		/>
	);
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
	return (
		<ProgressPrimitive.Label
			className={cn('text-sm font-medium', className)}
			data-slot="progress-label"
			{...props}
		/>
	);
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
	return (
		<ProgressPrimitive.Value
			className={cn('text-muted-foreground ml-auto text-sm tabular-nums', className)}
			data-slot="progress-value"
			{...props}
		/>
	);
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
