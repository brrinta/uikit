import { Loader2Icon } from 'lucide-react';
import { type VariantProps } from 'class-variance-authority';

import { cn, cvaWithMeta } from '../lib/utils';

export const spinnerVariants = cvaWithMeta('animate-spin', {
	variants: {
		size: {
			xs: 'size-3',
			sm: 'size-3.5',
			md: 'size-4',
			lg: 'size-5',
			xl: 'size-6',
		},
		color: {
			primary: 'text-primary!',
			brand: 'text-brand!',
			success: 'text-success!',
			warning: 'text-warning!',
			info: 'text-info!',
			destructive: 'text-destructive!',
			accent: 'text-accent!',
			red: 'text-red-500!',
			orange: 'text-orange-500!',
			amber: 'text-amber-500!',
			yellow: 'text-yellow-500!',
			lime: 'text-lime-500!',
			green: 'text-green-500!',
			emerald: 'text-emerald-500!',
			teal: 'text-teal-500!',
			cyan: 'text-cyan-500!',
			sky: 'text-sky-500!',
			blue: 'text-blue-500!',
			indigo: 'text-indigo-500!',
			violet: 'text-violet-500!',
			purple: 'text-purple-500!',
			fuchsia: 'text-fuchsia-500!',
			pink: 'text-pink-500!',
			rose: 'text-rose-500!',
			slate: 'text-slate-500!',
			gray: 'text-gray-500!',
			zinc: 'text-zinc-500!',
			neutral: 'text-neutral-500!',
			stone: 'text-stone-500!',
			white: 'text-white!',
			black: 'text-black!',
			current: 'text-current!',
		},
	},
	defaultVariants: {
		size: 'md',
		color: 'current',
	},
});

function Spinner({ className, size, color, ...props }: React.ComponentProps<'svg'> & VariantProps<typeof spinnerVariants>) {
	return (
		<Loader2Icon
			role="status"
			aria-label="Loading"
			className={cn(spinnerVariants({ size, color }), className)}
			{...props}
		/>
	);
}

export { Spinner };
