import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn, cvaWithMeta } from '../lib/utils';
import { type VariantProps } from 'class-variance-authority';

export type LoadingOverlayProps = {
	/** Controls visibility */
	open: boolean;
	/** Optional accessible label (announced by screen readers) */
	label?: string;
	/** Optional inline text under the spinner */
	text?: string;
	/** Dim the page behind the overlay */
	dim?: boolean;
	/** Apply a soft background blur */
	blur?: boolean;
	/** Prevent background scroll when open (only when portal targets <body>) */
	lockScroll?: boolean;
	/** Optional: size in tailwind terms (w/h) */
	size?: 'sm' | 'md' | 'lg';
	/** Custom className for the outer overlay */
	className?: string;
};

export const loadingOverlayVariants = cvaWithMeta('absolute inset-0 grid place-items-center', {
	variants: {
		dim: { true: 'bg-background/50', false: '' },
		blur: { true: 'backdrop-blur-xs', false: '' },
	},
	defaultVariants: { dim: true, blur: true },
});
export const loadingCardVariants = cvaWithMeta('rounded-2xl border bg-background p-6 shadow-xl flex flex-col items-center gap-3', {
	variants: {},
	defaultVariants: {},
});
export const loadingSpinnerVariants = cvaWithMeta('animate-spin', {
	variants: { size: { sm: 'h-10 w-10', md: 'h-12 w-12', lg: 'h-16 w-16' } },
	defaultVariants: { size: 'md' },
});

/**
 * LoadingOverlay
 * A clean, accessible, full-screen (or container) loading overlay using Tailwind + shadcn conventions.
 *
 * Usage:
 * <LoadingOverlay open label="Loading dashboard" text="Please wait…" />
 */
export function LoadingOverlay({
	open,
	label = 'Loading',
	text,
	dim = true,
	blur = true,
	lockScroll = false,
	size = 'md',
	className,
}: LoadingOverlayProps & VariantProps<typeof loadingOverlayVariants> & VariantProps<typeof loadingSpinnerVariants>) {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	React.useEffect(() => {
		if (open && lockScroll && typeof document !== 'undefined') {
			const prev = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = prev;
			};
		}
	}, [open, lockScroll]);

	if (!mounted) return null;

	return (
		<AnimatePresence>
			{open ? (
				<motion.div
					role="alertdialog"
					aria-live="assertive"
					aria-label={label}
					aria-modal="true"
					key="overlay"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={cn('rounded-3xl', loadingOverlayVariants({ dim, blur }), className)}>
					<motion.div
						initial={{ scale: 0.98, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.98, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 260, damping: 24 }}
						className={cn(loadingCardVariants())}>
						<Loader2
							aria-hidden
							className={cn(loadingSpinnerVariants({ size }))}
						/>
						{text ? <p className="text-sm text-muted-foreground text-center max-w-[28ch]">{text}</p> : <span className="sr-only">{label}</span>}
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}
