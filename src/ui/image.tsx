import * as React from 'react';
import { cn, cvaWithMeta } from '../lib/utils';

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
	/** Apply an aspect-ratio container, e.g. "16/9", "1/1" */
	ratio?: `${number}/${number}` | string;
	/** Rounded container corners. true -> rounded-2xl, or pass a Tailwind class */
	rounded?: boolean | string;
	/** Drop shadow around the container. true -> shadow-lg, or pass a Tailwind class */
	shadow?: boolean | string;
	/** Show a shimmer skeleton until the image loads */
	withSkeleton?: boolean;
	/** Provide a fallback image if load fails */
	fallbackSrc?: string;
	/** Optional caption below the image */
	caption?: React.ReactNode;
	/** Class for the <img> element */
	imageClassName?: string;

	imageStyle?: React.CSSProperties;
};

export const imageContainerVariants = cvaWithMeta('shrink-0  flex items-center justify-center overflow-hidden', {
	variants: {},
	defaultVariants: {},
});
export const imageWrapperVariants = cvaWithMeta('relative overflow-hidden h-full w-full', { variants: {}, defaultVariants: {} });
export const imageElementVariants = cvaWithMeta('block max-w-full max-h-full select-none object-contain', {
	variants: {},
	defaultVariants: {},
});
export const imageSkeletonVariants = cvaWithMeta(
	`absolute inset-0 animate-pulse bg-size-[200%_100%]
	bg-[linear-gradient(110deg,var(--color-muted)_8%,var(--color-muted-foreground)_18%,var(--color-muted)_33%)]`,
	{
		variants: {},
		defaultVariants: {},
	},
);

/**
 * Image (HTML <img>) – framework-agnostic, shadcn/Tailwind-friendly image component.
 *
 * Features
 * - Optional skeleton shimmer while loading.
 * - Optional fallback image on error.
 * - Aspect-ratio wrapper to avoid CLS.
 * - Rounded corners, shadow, custom classes.
 *
 * Examples
 * <Image src="/hero.jpg" alt="Dashboard" ratio="16/9" rounded shadow withSkeleton />
 * <Image src={url} alt="Avatar" width={96} height={96} rounded="rounded-full" />
 */
export function Image({
	alt,
	src,
	ratio,
	rounded = false,
	shadow = false,
	withSkeleton = false,
	fallbackSrc,
	caption,
	className,
	imageClassName,
	imageStyle,
	loading = 'lazy',
	decoding = 'async',
	onLoad,
	onError,
	ref: imgRef,
	...img
}: ImageProps & { ref?: React.Ref<HTMLImageElement> }) {
	const [loaded, setLoaded] = React.useState(false);
	const [failed, setFailed] = React.useState(false);

	const [currentSrc, setCurrentSrc] = React.useState<string | undefined>(typeof src === 'string' ? src : undefined);

	React.useEffect(() => {
		// update on src change
		if (typeof src === 'string') {
			setCurrentSrc(src);
			setLoaded(false);
			setFailed(false);
		}
	}, [src]);

	const radiusClass = typeof rounded === 'string' ? rounded : rounded ? 'rounded-2xl' : undefined;
	const shadowClass = typeof shadow === 'string' ? shadow : shadow ? 'shadow-lg' : undefined;
	const aspectStyle = ratio ? { aspectRatio: ratio as string } : undefined;

	return (
		<figure
			data-slot={'image-wrapper'}
			className={cn(className)}>
			<div
				className={cn(imageWrapperVariants(), radiusClass, shadowClass)}
				style={aspectStyle}>
				{/* Skeleton shimmer */}
				{withSkeleton && !loaded && !failed && (
					<div
						aria-hidden
						className={cn(imageSkeletonVariants())}
					/>
				)}

				{/* Image */}
				<img
					data-slot={'image'}
					ref={imgRef}
					src={currentSrc}
					alt={alt}
					loading={loading as any}
					decoding={decoding as any}
					onLoad={(e) => {
						setLoaded(true);
						onLoad?.(e);
					}}
					onError={(e) => {
						if (!failed && fallbackSrc) {
							setFailed(true);
							setCurrentSrc(fallbackSrc);
						}
						onError?.(e as any);
					}}
					className={cn(imageElementVariants(), imageClassName)}
					style={imageStyle}
					{...img}
				/>
			</div>
			{caption ? <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption> : null}
		</figure>
	);
}
Image.displayName = 'Image';
