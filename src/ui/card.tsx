'use client';

import * as React from 'react';
import { cn, cvaWithMeta } from '../lib/utils';
import { type VariantProps } from 'class-variance-authority'; // Define CardContext

// Define CardContext
type CardContextType = {
	variant: 'default' | 'accent' | 'bordered' | 'checkoutStep';
};

const CardContext = React.createContext<CardContextType>({
	variant: 'default', // Default value
});

// Hook to use CardContext
const useCardContext = () => {
	const context = React.useContext(CardContext);
	if (!context) {
		throw new Error('useCardContext must be used within a Card component');
	}
	return context;
};

// Variants
export const cardVariants = cvaWithMeta('flex flex-col items-stretch text-card-foreground bg-background', {
	variants: {
		variant: {
			checkoutStep: 'space-y-3',
			bordered: 'border border-border',
			default: 'bg-card  shadow-xs black/5',
			accent: 'bg-muted shadow-xs p-1',
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
		variant: 'default',
		radius: 'xl',
	},
});

export const cardHeaderVariants = cvaWithMeta('flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5', {
	variants: {
		variant: {
			checkoutStep: 'rounded-xl shadow-[5px_10px_35px_#0000001a]',
			default: '',
			bordered: 'border-b border-border',
			accent: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export const cardContentVariants = cvaWithMeta('grow p-5 relative', {
	variants: {
		variant: {
			checkoutStep: 'rounded-xl space-y-4 shadow-[5px_10px_35px_#0000001a] md:p-10 ',
			default: 'space-y-4',
			bordered: '',
			accent: 'bg-card rounded-t-xl last:rounded-b-xl',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});
export const cardBodyVariants = cvaWithMeta('md:px-4 px-0 relative', {
	variants: {
		variant: {
			checkoutStep: 'grid',
			default: '',
			bordered: '',
			accent: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export const cardTableVariants = cvaWithMeta('grid grow', {
	variants: {
		variant: {
			checkoutStep: '',
			default: '',
			bordered: '',
			accent: 'bg-card rounded-xl',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});
export const cardTitleVariants = cvaWithMeta('text-base font-semibold leading-none tracking-tight', {
	variants: {
		variant: {
			checkoutStep: 'md:text-3xl text-2xl text-center font-bold font-zilla-slab',
			default: '',
			bordered: '',
			accent: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});
export const cardSubtitleVariants = cvaWithMeta('text-base font-semibold leading-none tracking-tight', {
	variants: {
		variant: {
			checkoutStep: 'md:text-lg text-base font-bold text-muted-foreground font-zilla-slab pt-3 px-4 -mb-3',
			default: '',
			bordered: '',
			accent: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export const cardFooterVariants = cvaWithMeta('flex items-center px-5 col-span-full w-full justify-end [&:has(>_:nth-child(2))]:justify-between', {
	variants: {
		variant: {
			checkoutStep: 'rounded-xl shadow-[5px_10px_35px_#0000001a] py-4',
			default: '',
			bordered: 'border-t border-border',
			accent: 'bg-card rounded-b-xl mt-0.5',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

// Card Component
function Card({ className, variant = 'default', radius, ...props }: CardProps) {
	return (
		<CardContext.Provider value={{ variant: variant || 'default' }}>
			<div
				data-slot="card"
				className={cn(cardVariants({ variant, radius }), className)}
				{...props}
			/>
		</CardContext.Provider>
	);
}

// CardHeader Component
function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const { variant } = useCardContext();
	return (
		<div
			data-slot="card-header"
			className={cn(cardHeaderVariants({ variant }), className)}
			{...props}
		/>
	);
}

// CardContent Component
function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const { variant } = useCardContext();
	return (
		<div
			data-slot="card-content"
			className={cn(cardContentVariants({ variant }), className)}
			{...props}
		/>
	);
}

// CardBody Component
function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const { variant } = useCardContext();
	return (
		<div
			data-slot="card-body"
			className={cn(cardBodyVariants({ variant }), className)}
			{...props}
		/>
	);
}

// CardTable Component
function CardTable({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const { variant } = useCardContext();
	return (
		<div
			data-slot="card-table"
			className={cn(cardTableVariants({ variant }), className)}
			{...props}
		/>
	);
}

// CardFooter Component
function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const { variant } = useCardContext();
	return (
		<div
			data-slot="card-footer"
			className={cn(cardFooterVariants({ variant }), className)}
			{...props}
		/>
	);
}

// Other Components
function CardHeading({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="card-heading"
			className={cn('space-y-1', className)}
			{...props}
		/>
	);
}

function CardToolbar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="card-toolbar"
			className={cn('flex items-center gap-2.5', className)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
	const { variant } = useCardContext();
	return (
		<h2
			data-slot="card-title"
			className={cn(cardTitleVariants({ variant }), className)}
			{...props}
		/>
	);
}
function CardSubtitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
	const { variant } = useCardContext();
	return (
		<h4
			data-slot="card-subtitle"
			className={cn(cardSubtitleVariants({ variant }), className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="card-description"
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	);
}

// Exports with dot-notation

type CompoundCard = typeof Card & {
	Header: typeof CardHeader;
	Content: typeof CardContent;
	Body: typeof CardBody;
	Table: typeof CardTable;
	Footer: typeof CardFooter;
	Heading: typeof CardHeading;
	Title: typeof CardTitle;
	Subtitle: typeof CardSubtitle;
	Description: typeof CardDescription;
	Toolbar: typeof CardToolbar;
};

const CardComponent = Card as CompoundCard;
CardComponent.Header = CardHeader;
CardComponent.Content = CardContent;
CardComponent.Body = CardBody;
CardComponent.Table = CardTable;
CardComponent.Footer = CardFooter;
CardComponent.Heading = CardHeading;
CardComponent.Title = CardTitle;
CardComponent.Subtitle = CardSubtitle;
CardComponent.Description = CardDescription;
CardComponent.Toolbar = CardToolbar;

export { CardComponent as Card, CardContent, CardBody, CardDescription, CardFooter, CardHeader, CardHeading, CardTable, CardTitle, CardToolbar };
export type CardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;
