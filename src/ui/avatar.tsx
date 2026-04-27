'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { VariantProps } from 'class-variance-authority';
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { cn, cvaWithMeta, getInitials, isValidImageUrl, stringToRgba } from '@uikit/lib/utils';
import { Loader } from 'lucide-react';

export const avatarStatusVariants = cvaWithMeta('flex items-center rounded-full size-4 border-2 border-background absolute -top-1 -right-1', {
	variants: {
		variant: {
			online: 'bg-green-600',
			offline: 'bg-zinc-400 dark:bg-zinc-500',
			busy: 'bg-yellow-600',
			away: 'bg-blue-600',
		},
	},
	defaultVariants: {
		variant: 'online',
	},
});

export const avatarVariants = cvaWithMeta('relative flex shrink-0 overflow-hidden', {
	variants: {
		size: {
			xs: 'size-6',
			sm: 'size-8',
			md: 'size-10',
			lg: 'size-12',
			xl: 'size-16',
			'2xl': 'size-20',
			'3xl': 'size-24',
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
	defaultVariants: {
		size: 'md',
		radius: 'full',
	},
});

function AvatarRoot({ className, size, radius, ...props }: AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			className={cn(avatarVariants({ size, radius }), className)}
			{...props}
		/>
	);
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn('aspect-square h-full w-full', className)}
			{...props}
		/>
	);
}

function AvatarFallback({ className, radius, ...props }: AvatarPrimitive.Fallback.Props & VariantProps<typeof avatarVariants>) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				'flex h-full w-full items-center justify-center border border-border bg-accent text-accent-foreground text-xs',
				radius === 'full' ? 'rounded-full' : '',
				className,
			)}
			{...props}
		/>
	);
}

function AvatarIndicator({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="avatar-indicator"
			className={cn('absolute flex size-6 items-center justify-center', className)}
			{...props}
		/>
	);
}

function AvatarStatus({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof avatarStatusVariants>) {
	return (
		<div
			data-slot="avatar-status"
			className={cn(avatarStatusVariants({ variant }), className)}
			{...props}
		/>
	);
}

type AvatarProps = AvatarPrimitive.Root.Props &
	VariantProps<typeof avatarVariants> & {
		status?: VariantProps<typeof avatarStatusVariants>['variant'];
		className?: string;
		src?: string;
		name?: string;
		alt?: string;
		imageProps?: React.ComponentProps<typeof AvatarImage>;
		indicatorProps?: React.ComponentProps<typeof AvatarIndicator>;
		statusProps?: React.ComponentProps<typeof AvatarStatus>;
		fallbackProps?: React.ComponentProps<typeof AvatarFallback>;
	};

const Avatar: React.FC<AvatarProps> = ({
	status,
	src,
	name,
	alt,
	size,
	radius,
	indicatorProps,
	statusProps,
	imageProps,
	fallbackProps,
	children,
	...props
}) => {
	const [imageStatus, setImageStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');

	useEffect(() => {
		let active = true;

		isValidImageUrl(src).then((isValid) => {
			if (active) {
				setImageStatus(isValid ? 'valid' : 'invalid');
			}
		});

		return () => {
			active = false;
		};
	}, [src]);
	return (
		<AvatarRoot
			size={size}
			radius={radius}
			{...props}>
			{imageStatus === 'valid' && src && (
				<AvatarImage
					src={src}
					alt={alt}
					loading="lazy"
					{...imageProps}
				/>
			)}
			{imageStatus !== 'valid' && (
				<AvatarFallback
					radius={radius}
					{...fallbackProps}
					className={cn('font-semibold text-lg ', fallbackProps?.className)}
					style={
						name
							? {
									color: stringToRgba(name, 1),
									backgroundColor: stringToRgba(name, 0.2),
								}
							: {}
					}>
					{imageStatus === 'loading' ? <Loader className={'animate-spin'} /> : name ? getInitials(name) : null}
				</AvatarFallback>
			)}
			{status && (
				<AvatarStatus
					variant={status}
					{...statusProps}
				/>
			)}
			{children}
		</AvatarRoot>
	);
};

type CompoundAvatar = typeof Avatar & {
	Root: typeof AvatarRoot;
	Image: typeof AvatarImage;
	Fallback: typeof AvatarFallback;
	Indicator: typeof AvatarIndicator;
	Status: typeof AvatarStatus;
};

const AvatarComponent = Avatar as CompoundAvatar;
AvatarComponent.Root = AvatarRoot;
AvatarComponent.Image = AvatarImage;
AvatarComponent.Fallback = AvatarFallback;
AvatarComponent.Indicator = AvatarIndicator;
AvatarComponent.Status = AvatarStatus;

export { AvatarComponent as Avatar, AvatarRoot, AvatarFallback, AvatarImage, AvatarIndicator, AvatarStatus };
