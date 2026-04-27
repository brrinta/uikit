import { cn, cvaWithMeta } from '@uikit/lib/utils';
import { Tabs as TabsPrimitive } from '@base-ui/react';
import { type VariantProps } from 'class-variance-authority';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

export const tabsListVariants = cvaWithMeta('flex items-center shrink-0', {
	variants: {
		variant: {
			default: 'bg-accent p-1',
			button: '',
			line: 'border-b border-border',
		},
		shape: {
			default: '',
			pill: '',
		},
		size: {
			lg: 'gap-2.5',
			md: 'gap-2',
			sm: 'gap-1.5',
			xs: 'gap-1',
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
	compoundVariants: [
		{ variant: 'default', size: 'lg', className: 'p-1.5 gap-2.5' },
		{ variant: 'default', size: 'md', className: 'p-1 gap-2' },
		{ variant: 'default', size: 'sm', className: 'p-1 gap-1.5' },
		{ variant: 'default', size: 'xs', className: 'p-1 gap-1' },
		{
			variant: 'default',
			shape: 'default',
			size: 'lg',
			className: 'rounded-lg',
		},
		{
			variant: 'default',
			shape: 'default',
			size: 'md',
			className: 'rounded-lg',
		},
		{
			variant: 'default',
			shape: 'default',
			size: 'sm',
			className: 'rounded-md',
		},
		{
			variant: 'default',
			shape: 'default',
			size: 'xs',
			className: 'rounded-md',
		},
		{ variant: 'line', size: 'lg', className: 'gap-9' },
		{ variant: 'line', size: 'md', className: 'gap-8' },
		{ variant: 'line', size: 'sm', className: 'gap-4' },
		{ variant: 'line', size: 'xs', className: 'gap-4' },
		{
			variant: 'default',
			shape: 'pill',
			className: 'rounded-full **:[[role=tab]]:rounded-full',
		},
		{
			variant: 'button',
			shape: 'pill',
			className: 'rounded-full **:[[role=tab]]:rounded-full',
		},
	],
	defaultVariants: {
		variant: 'default',
		size: 'md',
	},
});

export const tabsTriggerVariants = cvaWithMeta(
	'shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors ' +
		'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none ' +
		'disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground' +
		' [&:hover_svg]:text-primary [&[data-state=active]_svg]:text-primary m-1',
	{
		variants: {
			variant: {
				default:
					'text-muted-foreground data-active:bg-background hover:text-foreground data-active:text-foreground' +
					' data-active:shadow-xs data-active:shadow-black/5',
				button:
					'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg text-accent-foreground hover:text-foreground ' +
					'data-active:text-foreground hover:font-semibold hover:text-current',
				line: 'border-b-2 text-muted-foreground border-transparent hover:text-foreground',
			},
			size: {
				lg: 'gap-2.5 [&_svg]:size-5 text-sm',
				md: 'gap-2 [&_svg]:size-4 text-sm',
				sm: 'gap-1.5 [&_svg]:size-3.5 text-xs',
				xs: 'gap-1 [&_svg]:size-3.5 text-xs',
			},
			color: {
				primary: '',
				secondary: '',
				destructive: '',
				success: '',
				warning: '',
				info: '',
				accent: '',
				brand: '',
				blue: '',
				green: '',
				red: '',
				orange: '',
				amber: '',
				yellow: '',
				lime: '',
				emerald: '',
				teal: '',
				cyan: '',
				sky: '',
				indigo: '',
				violet: '',
				purple: '',
				fuchsia: '',
				pink: '',
				rose: '',
				slate: '',
				gray: '',
				zinc: '',
				neutral: '',
				stone: '',
			},
		},
		compoundVariants: [
			{ variant: 'default', size: 'lg', className: 'py-2.5 px-4 rounded-md' },
			{ variant: 'default', size: 'md', className: 'py-1.5 px-3 rounded-md' },
			{ variant: 'default', size: 'sm', className: 'py-1.5 px-2.5 rounded-sm' },
			{ variant: 'default', size: 'xs', className: 'py-1 px-2 rounded-sm' },
			{ variant: 'button', size: 'lg', className: 'py-3 px-4 rounded-lg' },
			{ variant: 'button', size: 'md', className: 'py-2.5 px-3 rounded-lg' },
			{ variant: 'button', size: 'sm', className: 'py-2 px-2.5 rounded-md' },
			{ variant: 'button', size: 'xs', className: 'py-1.5 px-2 rounded-md' },
			{ variant: 'line', size: 'lg', className: 'py-3' },
			{ variant: 'line', size: 'md', className: 'py-2.5' },
			{ variant: 'line', size: 'sm', className: 'py-2' },
			{ variant: 'line', size: 'xs', className: 'py-1.5' },

			{
				variant: 'line',
				color: 'primary',
				className: 'data-active:border-primary data-active:text-primary',
			},
			{
				variant: 'line',
				color: 'secondary',
				className: 'data-active:border-secondary data-active:text-secondary',
			},
			{
				variant: 'line',
				color: 'destructive',
				className: 'data-active:border-destructive data-active:text-destructive',
			},
			{
				variant: 'line',
				color: 'success',
				className: 'data-active:border-success data-active:text-success',
			},
			{
				variant: 'line',
				color: 'warning',
				className: 'data-active:border-warning data-active:text-warning',
			},
			{
				variant: 'line',
				color: 'info',
				className: 'data-active:border-info data-active:text-info',
			},
			{
				variant: 'line',
				color: 'brand',
				className: 'data-active:border-brand data-active:text-brand',
			},
			{
				variant: 'line',
				color: 'blue',
				className: 'data-active:border-blue-500 data-active:text-blue-500',
			},
			{
				variant: 'line',
				color: 'green',
				className: 'data-active:border-green-500 data-active:text-green-500',
			},
			{
				variant: 'line',
				color: 'red',
				className: 'data-active:border-red-500 data-active:text-red-500',
			},
			{
				variant: 'line',
				color: 'orange',
				className: 'data-active:border-orange-500 data-active:text-orange-500',
			},
			{
				variant: 'line',
				color: 'amber',
				className: 'data-active:border-amber-500 data-active:text-amber-500',
			},
			{
				variant: 'line',
				color: 'yellow',
				className: 'data-active:border-yellow-500 data-active:text-yellow-500',
			},
			{
				variant: 'line',
				color: 'lime',
				className: 'data-active:border-lime-500 data-active:text-lime-500',
			},
			{
				variant: 'line',
				color: 'emerald',
				className: 'data-active:border-emerald-500 data-active:text-emerald-500',
			},
			{
				variant: 'line',
				color: 'teal',
				className: 'data-active:border-teal-500 data-active:text-teal-500',
			},
			{
				variant: 'line',
				color: 'cyan',
				className: 'data-active:border-cyan-500 data-active:text-cyan-500',
			},
			{
				variant: 'line',
				color: 'sky',
				className: 'data-active:border-sky-500 data-active:text-sky-500',
			},
			{
				variant: 'line',
				color: 'indigo',
				className: 'data-active:border-indigo-500 data-active:text-indigo-500',
			},
			{
				variant: 'line',
				color: 'violet',
				className: 'data-active:border-violet-500 data-active:text-violet-500',
			},
			{
				variant: 'line',
				color: 'purple',
				className: 'data-active:border-purple-500 data-active:text-purple-500',
			},
			{
				variant: 'line',
				color: 'fuchsia',
				className: 'data-active:border-fuchsia-500 data-active:text-fuchsia-500',
			},
			{
				variant: 'line',
				color: 'pink',
				className: 'data-active:border-pink-500 data-active:text-pink-500',
			},
			{
				variant: 'line',
				color: 'rose',
				className: 'data-active:border-rose-500 data-active:text-rose-500',
			},
			{
				variant: 'line',
				color: 'slate',
				className: 'data-active:border-slate-500 data-active:text-slate-500',
			},
			{
				variant: 'line',
				color: 'gray',
				className: 'data-active:border-gray-500 data-active:text-gray-500',
			},
			{
				variant: 'line',
				color: 'zinc',
				className: 'data-active:border-zinc-500 data-active:text-zinc-500',
			},
			{
				variant: 'line',
				color: 'neutral',
				className: 'data-active:border-neutral-500 data-active:text-neutral-500',
			},
			{
				variant: 'line',
				color: 'stone',
				className: 'data-active:border-stone-500 data-active:text-stone-500',
			},

			{
				variant: 'button',
				color: 'primary',
				className: 'data-active:bg-primary data-active:text-primary-foreground',
			},
			{
				variant: 'button',
				color: 'secondary',
				className: 'data-active:bg-secondary data-active:text-secondary-foreground',
			},
			{
				variant: 'button',
				color: 'destructive',
				className: 'data-active:bg-destructive data-active:text-destructive-foreground',
			},
			{
				variant: 'button',
				color: 'success',
				className: 'data-active:bg-success data-active:text-success-foreground',
			},
			{
				variant: 'button',
				color: 'warning',
				className: 'data-active:bg-warning data-active:text-warning-foreground',
			},
			{
				variant: 'button',
				color: 'info',
				className: 'data-active:bg-info data-active:text-info-foreground',
			},
			{
				variant: 'button',
				color: 'accent',
				className: 'data-active:bg-accent data-active:text-accent-foreground',
			},
			{
				variant: 'button',
				color: 'brand',
				className: 'data-active:bg-brand data-active:text-brand-foreground',
			},
			{
				variant: 'button',
				color: 'blue',
				className: 'data-active:bg-blue-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'green',
				className: 'data-active:bg-green-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'red',
				className: 'data-active:bg-red-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'orange',
				className: 'data-active:bg-orange-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'amber',
				className: 'data-active:bg-amber-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'yellow',
				className: 'data-active:bg-yellow-500 data-active:text-black',
			},
			{
				variant: 'button',
				color: 'lime',
				className: 'data-active:bg-lime-500 data-active:text-black',
			},
			{
				variant: 'button',
				color: 'emerald',
				className: 'data-active:bg-emerald-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'teal',
				className: 'data-active:bg-teal-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'cyan',
				className: 'data-active:bg-cyan-500 data-active:text-black',
			},
			{
				variant: 'button',
				color: 'sky',
				className: 'data-active:bg-sky-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'indigo',
				className: 'data-active:bg-indigo-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'violet',
				className: 'data-active:bg-violet-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'purple',
				className: 'data-active:bg-purple-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'fuchsia',
				className: 'data-active:bg-fuchsia-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'pink',
				className: 'data-active:bg-pink-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'rose',
				className: 'data-active:bg-rose-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'slate',
				className: 'data-active:bg-slate-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'gray',
				className: 'data-active:bg-gray-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'zinc',
				className: 'data-active:bg-zinc-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'neutral',
				className: 'data-active:bg-neutral-500 data-active:text-white',
			},
			{
				variant: 'button',
				color: 'stone',
				className: 'data-active:bg-stone-500 data-active:text-white',
			},
		],
		defaultVariants: {
			variant: 'default',
			size: 'md',
			color: 'primary',
		},
	},
);

// export const tabsIndicatorVariants = cvaWithMeta('', {
// 	variants: {
// 		variant: {
// 			default: '',
// 			button: '',
// 			line: '',
// 		},
// 		size: {
// 			lg: '',
// 			md: '',
// 			sm: '',
// 			xs: '',
// 		},
// 	},
// 	defaultVariants: {
// 		variant: 'default',
// 		size: 'md',
// 	},
// });

// Variants for TabsContent
export const tabsContentVariants = cvaWithMeta(
	'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
	{
		variants: {
			variant: {
				default: '',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

// Context
type TabsContextType = VariantProps<typeof tabsListVariants> &
	VariantProps<typeof tabsTriggerVariants> &
	Pick<React.ComponentProps<typeof TabsPrimitive.Root>, 'orientation'>;
const TabsContext = createContext<TabsContextType>({
	variant: 'default',
	size: 'md',
	color: 'primary',
	orientation: 'horizontal',
	shape: 'default',
	radius: 'none',
});

// Components
const TabsRoot: React.FC<React.ComponentProps<typeof TabsPrimitive.Root> & TabsContextType> = ({
	className,
	variant = 'default',
	size = 'md',
	color = 'primary',
	orientation = 'horizontal',
	shape = 'default',
	radius,
	render,
	...props
}) => {
	return (
		<TabsContext.Provider value={{ variant: variant || 'default', size: size || 'md', color: color || 'primary', orientation, shape, radius }}>
			<TabsPrimitive.Root
				data-slot="tabs"
				className={cn('', className)}
				render={render}
				orientation={orientation}
				{...props}
			/>
		</TabsContext.Provider>
	);
};

const TabsList: React.FC<React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>> = ({
	className,
	variant = 'default',
	shape = 'default',
	size = 'md',
	radius,
	render,
	...props
}) => {
	const { variant: contextVariant, size: contextSize, orientation, shape: contextShape, radius: contextRadius } = useContext(TabsContext);
	const listRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const checkScroll = useCallback(() => {
		const el = listRef.current;
		if (el) {
			const { scrollLeft, scrollWidth, clientWidth } = el;
			setCanScrollLeft(scrollLeft > 1);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
		}
	}, []);

	useEffect(() => {
		const el = listRef.current;
		if (!el) return;

		checkScroll();
		el.addEventListener('scroll', checkScroll, { passive: true });
		const observer = new ResizeObserver(checkScroll);
		observer.observe(el);
		Array.from(el.children).forEach((child) => observer.observe(child));

		return () => {
			el.removeEventListener('scroll', checkScroll);
			observer.disconnect();
		};
	}, [checkScroll, props.children]);

	const scroll = (direction: 'left' | 'right') => {
		const el = listRef.current;
		if (el) {
			const scrollAmount = el.clientWidth * 0.5;
			el.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			});
		}
	};

	return (
		<div className={cn('relative flex items-center', { 'w-full': orientation === 'horizontal' })}>
			{canScrollLeft && (
				<Button
					type="button"
					size="icon"
					className="absolute left-0 z-10 h-7 w-7 rounded-full shadow-md backdrop-blur-sm"
					onClick={() => scroll('left')}
					onMouseDown={(e) => e.preventDefault()}>
					<ChevronLeft className="h-4 w-4" />
				</Button>
			)}
			<TabsPrimitive.List
				ref={listRef}
				data-slot="tabs-list"
				className={cn(
					tabsListVariants({
						variant: variant || contextVariant,
						shape: shape || contextShape,
						size: size || contextSize,
						radius: radius || contextRadius,
					}),
					'flex-1 min-w-0 overflow-x-auto no-scrollbar flex-nowrap scroll-smooth',
					className,
				)}
				render={render}
				{...props}
			/>
			{canScrollRight && (
				<Button
					type="button"
					size="icon"
					className="absolute right-0 z-10 h-7 w-7 rounded-full shadow-md backdrop-blur-sm"
					onClick={() => scroll('right')}
					onMouseDown={(e) => e.preventDefault()}>
					<ChevronRight className="h-4 w-4" />
				</Button>
			)}
		</div>
	);
};

function TabsTab({
	className,
	render,
	variant: propVariant,
	size: propSize,
	color: propColor,
	...props
}: TabsPrimitive.Tab.Props & VariantProps<typeof tabsTriggerVariants>) {
	const { variant, size, color } = useContext(TabsContext);
	return (
		<TabsPrimitive.Tab
			data-slot="tabs-tab"
			className={cn(
				tabsTriggerVariants({
					variant: propVariant || variant,
					size: propSize || size,
					color: propColor || color,
				}),
				className,
			)}
			render={render}
			{...props}
		/>
	);
}

function TabsPanel({ className, variant, render, ...props }: TabsPrimitive.Panel.Props & VariantProps<typeof tabsContentVariants>) {
	return (
		<TabsPrimitive.Panel
			data-slot="tabs-panel"
			className={cn(tabsContentVariants({ variant }), className)}
			render={render}
			{...props}
		/>
	);
}

// function TabsIndicator({ className, render, ...props }: TabsPrimitive.Indicator.Props & VariantProps<typeof tabsIndicatorVariants>) {
// 	const { variant, size } = useContext(TabsContext);
// 	return (
// 		<TabsPrimitive.Indicator
// 			data-slot="tabs-indicator"
// 			className={cn(tabsIndicatorVariants({ variant, size }), className)}
// 			render={render}
// 			{...props}
// 		/>
// 	);
// }

type CompoundTabs = typeof TabsRoot & {
	List: typeof TabsList;
	Tab: typeof TabsTab;
	Panel: typeof TabsPanel;
	// Indicator: typeof TabsIndicator;
};
const Tabs = TabsRoot as CompoundTabs;
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
// Tabs.Indicator = TabsIndicator;

export { Tabs, TabsList, TabsTab, TabsPanel };
