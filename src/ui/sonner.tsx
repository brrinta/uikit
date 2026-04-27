'use client';

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';
import { toast, Toaster as Sonner, type ToasterProps } from 'sonner';
import { ResponseInterface } from '@uikit/schema';
import { ReactNode } from 'react';

export function showNotification({
	data,
	message,
	type,
	caption,
	...props
}: {
	data?: ResponseInterface<any>;
	message?: ReactNode;
	type?: 'success' | 'error' | 'warning' | 'info' | 'loading' | 'message';
	caption?: ReactNode;
} & ToasterProps) {
	type = type || (data ? (data.isSuccess ? 'success' : 'error') : 'message');
	toast[type](message || data?.message, {
		description: caption || data?.caption || '',
		duration: 20_000,
		descriptionClassName: 'text-muted-foreground',
		...props,
		richColors: true,
	});
}

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			className="toaster group"
			icons={{
				success: <CircleCheckIcon className="size-4" />,
				info: <InfoIcon className="size-4" />,
				warning: <TriangleAlertIcon className="size-4" />,
				error: <OctagonXIcon className="size-4" />,
				loading: <Loader2Icon className="size-4 animate-spin" />,
			}}
			style={
				{
					'--normal-bg': 'var(--popover)',
					'--normal-text': 'var(--popover-foreground)',
					'--normal-border': 'var(--border)',
					'--border-radius': 'var(--radius)',
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

export { Toaster };
