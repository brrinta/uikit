'use client';

import * as React from 'react';
import { cn, cvaWithMeta } from '@uikit/lib/utils';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { type VariantProps } from 'class-variance-authority';
import { ChevronDown, Plus } from 'lucide-react';

// Variants
export const accordionRootVariants = cvaWithMeta('', {
	variants: {
		variant: {
			default: '',
			outline: 'space-y-2',
			solid: 'space-y-2',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export const accordionItemVariants = cvaWithMeta('', {
	variants: {
		variant: {
			default: '',
			outline: 'border border-border rounded-lg px-4',
			solid: 'rounded-lg bg-accent/70 px-4',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export const accordionHeaderVariants = cvaWithMeta('flex', {
	variants: {
		variant: {
			default: '',
			outline: '',
			solid: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export const accordionTriggerVariants = cvaWithMeta(
	`flex flex-1 items-center justify-between py-4 gap-2.5 text-foreground font-semibold transition-all w-full
	 [&[data-panel-open]>svg]:rotate-180 cursor-pointer`,
	{
		variants: {
			variant: {
				default: '',
				outline: '',
				solid: '',
			},
			indicator: {
				arrow: '',
				plus: `[&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200
				[&[data-panel-open]>svg>path:last-child]:rotate-90 [&[data-panel-open]>svg>path:last-child]:opacity-0 [&[data-panel-open]>svg]:rotate-180`,
				none: '',
			},
		},
		defaultVariants: {
			variant: 'default',
			indicator: 'arrow',
		},
	},
);

export const accordionPanelVariants = cvaWithMeta(
	`h-(--accordion-panel-height) overflow-hidden text-sm text-accent-foreground transition-[height] ease-out
	data-ending-style:h-0 data-starting-style:h-0 pb-4`,
	{
		variants: {
			variant: {
				default: '',
				outline: '',
				solid: '',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

// Context
type AccordionContextType = {
	variant?: 'default' | 'outline' | 'solid';
	indicator?: 'arrow' | 'plus' | 'none';
};

const AccordionContext = React.createContext<AccordionContextType>({
	variant: 'default',
	indicator: 'arrow',
});

// Base UI Accordion Root
interface AccordionRootProps extends React.ComponentProps<typeof AccordionPrimitive.Root>, VariantProps<typeof accordionRootVariants> {
	indicator?: 'arrow' | 'plus' | 'none';
}

function AccordionRoot(props: AccordionRootProps) {
	const { className, variant = 'default', indicator = 'arrow', children, ...rest } = props;

	return (
		<AccordionContext.Provider value={{ variant: variant || 'default', indicator }}>
			<AccordionPrimitive.Root
				data-slot="accordion"
				className={cn(accordionRootVariants({ variant }), className)}
				{...rest}>
				{children}
			</AccordionPrimitive.Root>
		</AccordionContext.Provider>
	);
}

// Base UI Accordion Item
function AccordionItem(props: React.ComponentProps<typeof AccordionPrimitive.Item>) {
	const { className, children, ...rest } = props;
	const { variant } = React.useContext(AccordionContext);

	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn(accordionItemVariants({ variant }), className)}
			{...rest}>
			{children}
		</AccordionPrimitive.Item>
	);
}

// Base UI Accordion Header
function AccordionHeader(props: React.ComponentProps<typeof AccordionPrimitive.Header>) {
	const { className, children, ...rest } = props;
	const { variant } = React.useContext(AccordionContext);

	return (
		<AccordionPrimitive.Header
			data-slot="accordion-header"
			className={cn(accordionHeaderVariants({ variant }), className)}
			{...rest}>
			{children}
		</AccordionPrimitive.Header>
	);
}

// Base UI Accordion Trigger
function AccordionTrigger(props: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	const { className, children, ...rest } = props;
	const { variant, indicator } = React.useContext(AccordionContext);

	return (
		<AccordionPrimitive.Trigger
			data-slot="accordion-trigger"
			className={cn(accordionTriggerVariants({ variant, indicator }), className)}
			{...rest}>
			{children}
			{indicator === 'plus' && (
				<Plus
					className="size-4 shrink-0 transition-transform duration-200"
					strokeWidth={1}
				/>
			)}
			{indicator === 'arrow' && (
				<ChevronDown
					className="size-4 shrink-0 transition-transform duration-200"
					strokeWidth={1}
				/>
			)}
		</AccordionPrimitive.Trigger>
	);
}

// Base UI Accordion Panel
function AccordionPanel(props: React.ComponentProps<typeof AccordionPrimitive.Panel>) {
	const { className, children, ...rest } = props;
	const { variant } = React.useContext(AccordionContext);

	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-panel"
			className={cn(accordionPanelVariants({ variant }), className)}
			{...rest}>
			{children}
		</AccordionPrimitive.Panel>
	);
}

// Exports with dot-notation

type CompoundAccordion = typeof AccordionRoot & {
	Item: typeof AccordionItem;
	Header: typeof AccordionHeader;
	Trigger: typeof AccordionTrigger;
	Panel: typeof AccordionPanel;
};

const AccordionComponent = AccordionRoot as CompoundAccordion;
AccordionComponent.Item = AccordionItem;
AccordionComponent.Header = AccordionHeader;
AccordionComponent.Trigger = AccordionTrigger;
AccordionComponent.Panel = AccordionPanel;

export { AccordionComponent as Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel };
