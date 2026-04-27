import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn, cvaWithMeta } from '../lib/utils';

type TimelineContextType = {
	lineWidth?: number;
	active?: number;
	onHeaderClick?: (index: number, event: React.MouseEvent<HTMLDivElement>) => void;
	classNames?: {
		item?: string;
		connector?: string;
		dot?: string;
		content?: string;
		header?: string;
		title?: string;
		description?: string;
		time?: string;
	};
};

const TimelineContext = React.createContext<TimelineContextType>({});

interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
	lineWidth?: number;
	active?: number;
	onHeaderClick?: TimelineContextType['onHeaderClick'];
	classNames?: TimelineContextType['classNames'];
}

const TimelineRoot = React.forwardRef<HTMLOListElement, TimelineProps>(
	({ className, children, lineWidth = 1, active, onHeaderClick, classNames, ...props }, ref) => {
		const contextValue = React.useMemo(() => ({ lineWidth, active, onHeaderClick, classNames }), [lineWidth, active, onHeaderClick, classNames]);

		return (
			<TimelineContext.Provider value={contextValue}>
				<ol
					ref={ref}
					data-slot="timeline"
					className={cn('flex flex-col', className)}
					{...props}>
					{React.Children.map(children, (child, index) => {
						if (React.isValidElement(child)) {
							return React.cloneElement(child, {
								// @ts-ignore
								index,
								// @ts-ignore
								...child.props,
							});
						}
						return child;
					})}
				</ol>
			</TimelineContext.Provider>
		);
	},
);
TimelineRoot.displayName = 'Timeline';

const TimelineConnector = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, style, ...props }, ref) => {
	const { lineWidth = 1, classNames } = React.useContext(TimelineContext);
	return (
		<div
			ref={ref}
			data-slot="timeline-connector"
			className={cn('absolute top-2 h-full bg-border group-last:hidden', classNames?.connector, className)}
			style={{
				width: lineWidth,
				left: `calc(6px - ${lineWidth}px / 2)`,
				...style,
			}}
			{...props}
		/>
	);
});
TimelineConnector.displayName = 'TimelineConnector';

export const timelineDotVariants = cvaWithMeta('absolute left-0 top-1 flex h-3 w-3 items-center justify-center rounded-full ring-4 ring-background', {
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground',
			outline: 'border border-input bg-background',
			secondary: 'bg-secondary text-secondary-foreground',
			destructive: 'bg-destructive text-destructive-foreground',
			ghost: 'bg-transparent',
			red: 'bg-red-500 text-white',
			orange: 'bg-orange-500 text-white',
			amber: 'bg-amber-500 text-white',
			yellow: 'bg-yellow-500 text-black',
			lime: 'bg-lime-500 text-black',
			green: 'bg-green-500 text-white',
			emerald: 'bg-emerald-500 text-white',
			teal: 'bg-teal-500 text-white',
			cyan: 'bg-cyan-500 text-black',
			sky: 'bg-sky-500 text-white',
			blue: 'bg-blue-500 text-white',
			indigo: 'bg-indigo-500 text-white',
			violet: 'bg-violet-500 text-white',
			purple: 'bg-purple-500 text-white',
			fuchsia: 'bg-fuchsia-500 text-white',
			pink: 'bg-pink-500 text-white',
			rose: 'bg-rose-500 text-white',
			slate: 'bg-slate-500 text-white',
			gray: 'bg-gray-500 text-white',
			zinc: 'bg-zinc-500 text-white',
			neutral: 'bg-neutral-500 text-white',
			stone: 'bg-stone-500 text-white',
			brand: 'bg-brand text-brand-foreground',
			accent: 'bg-accent text-accent-foreground',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface TimelineDotProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof timelineDotVariants> {
	icon?: React.ReactNode;
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(({ className, variant, icon, ...props }, ref) => {
	const { classNames } = React.useContext(TimelineContext);
	return (
		<div
			ref={ref}
			data-slot="timeline-dot"
			className={cn(timelineDotVariants({ variant }), icon && 'h-6 w-6 -left-1.5 -top-0.5 ring-offset-2', classNames?.dot, className)}
			{...props}>
			{icon}
		</div>
	);
});
TimelineDot.displayName = 'TimelineDot';

const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
	const { classNames } = React.useContext(TimelineContext);
	return (
		<div
			ref={ref}
			data-slot="timeline-content"
			className={cn('text-sm', classNames?.content, className)}
			{...props}
		/>
	);
});
TimelineContent.displayName = 'TimelineContent';

const TimelineHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
	const { classNames } = React.useContext(TimelineContext);
	return (
		<div
			ref={ref}
			data-slot="timeline-header"
			className={cn('flex items-center gap-2 mb-1', classNames?.header, className)}
			{...props}
		/>
	);
});
TimelineHeader.displayName = 'TimelineHeader';

const TimelineTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, children, ...props }, ref) => {
	const { classNames } = React.useContext(TimelineContext);
	return (
		<h3
			ref={ref}
			data-slot="timeline-title"
			className={cn('font-semibold leading-none tracking-tight', classNames?.title, className)}
			{...props}>
			{children}
		</h3>
	);
});
TimelineTitle.displayName = 'TimelineTitle';

const TimelineDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => {
	const { classNames } = React.useContext(TimelineContext);
	return (
		<p
			ref={ref}
			data-slot="timeline-description"
			className={cn('text-sm text-muted-foreground', classNames?.description, className)}
			{...props}
		/>
	);
});
TimelineDescription.displayName = 'TimelineDescription';

const TimelineTime = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(({ className, ...props }, ref) => {
	const { classNames } = React.useContext(TimelineContext);
	return (
		<span
			ref={ref}
			data-slot="timeline-time"
			className={cn('text-xs text-muted-foreground tabular-nums', classNames?.time, className)}
			{...props}
		/>
	);
});
TimelineTime.displayName = 'TimelineTime';

interface TimelineItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> {
	title?: React.ReactNode;
	description?: React.ReactNode;
	time?: React.ReactNode;
	color?: string;
	icon?: React.ReactNode;
	bullet?: React.ReactNode;
	index?: number;
	onHeaderClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
	classNames?: {
		item?: string;
		header?: string;
		title?: string;
		time?: string;
		connector?: string;
		dot?: string;
		description?: string;
		content?: string;
	};
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
	({ className, children, title, description, time, color, icon, bullet, index, onHeaderClick, classNames: localClassNames, ...props }, ref) => {
		const { active, classNames: contextClassNames, onHeaderClick: contextOnHeaderClick } = React.useContext(TimelineContext);
		const childrenArray = React.Children.toArray(children);
		const hasConnector = childrenArray.some(
			(child) => React.isValidElement(child) && (child.type === TimelineConnector || (child.type as any).displayName === 'TimelineConnector'),
		);
		const hasDot = childrenArray.some(
			(child) => React.isValidElement(child) && (child.type === TimelineDot || (child.type as any).displayName === 'TimelineDot'),
		);

		const isPast = active !== undefined && index !== undefined && index <= active;
		const itemColor = color || (isPast ? 'primary' : 'default');

		const handleHeaderClick = (e: React.MouseEvent<HTMLDivElement>) => {
			onHeaderClick?.(e);
			if (index !== undefined && !e.isPropagationStopped()) {
				contextOnHeaderClick?.(index, e);
			}
		};

		return (
			<li
				ref={ref}
				data-slot="timeline-item"
				className={cn('group relative pl-8 pb-8 last:pb-0', contextClassNames?.item, localClassNames?.item, className)}
				{...props}>
				{!hasConnector && <TimelineConnector className={cn(localClassNames?.connector)} />}
				{!hasDot && (
					<TimelineDot
						variant={itemColor as any}
						icon={icon || bullet}
						className={cn(localClassNames?.dot)}
					/>
				)}
				<TimelineContent className={cn(localClassNames?.content)}>
					{(title || time) && (
						<TimelineHeader
							className={cn(localClassNames?.header, (onHeaderClick || contextOnHeaderClick) && 'cursor-pointer')}
							onClick={handleHeaderClick}>
							{title && <TimelineTitle className={cn(localClassNames?.title)}>{title}</TimelineTitle>}
							{time && <TimelineTime className={cn(localClassNames?.time)}>{time}</TimelineTime>}
						</TimelineHeader>
					)}
					{description && <TimelineDescription className={cn(localClassNames?.description)}>{description}</TimelineDescription>}
					{children}
				</TimelineContent>
			</li>
		);
	},
);
TimelineItem.displayName = 'TimelineItem';

type CompoundTimeline = typeof TimelineRoot & {
	Item: typeof TimelineItem;
	Connector: typeof TimelineConnector;
	Header: typeof TimelineHeader;
	Title: typeof TimelineTitle;
	Dot: typeof TimelineDot;
	Description: typeof TimelineDescription;
	Content: typeof TimelineContent;
	Time: typeof TimelineTime;
};

const Timeline = TimelineRoot as CompoundTimeline;

Timeline.Item = TimelineItem;
Timeline.Connector = TimelineConnector;
Timeline.Header = TimelineHeader;
Timeline.Title = TimelineTitle;
Timeline.Dot = TimelineDot;
Timeline.Description = TimelineDescription;
Timeline.Content = TimelineContent;
Timeline.Time = TimelineTime;

export { Timeline, TimelineItem, TimelineConnector, TimelineHeader, TimelineTitle, TimelineDot, TimelineDescription, TimelineContent, TimelineTime };
