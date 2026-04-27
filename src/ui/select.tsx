import * as React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { cn } from '../lib/utils';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { buttonVariants } from './button';
import { VariantProps } from 'class-variance-authority';
import { popoverContentVariants } from './popover';

export type SelectProps<Value = any, Multiple extends boolean | undefined = false> = SelectPrimitive.Root.Props<Value, Multiple>;
const Select = <Value = any, Multiple extends boolean | undefined = false>(props: SelectProps<Value, Multiple>) => {
	return <SelectPrimitive.Root {...props} />;
};

export type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> &
	VariantProps<typeof buttonVariants> & {
		hideIcon?: boolean;
		iconProps?: React.ComponentProps<typeof SelectPrimitive.Icon>;
	};

const SelectTrigger: React.FC<SelectTriggerProps> = ({
	className,
	hideIcon,
	iconProps,
	variant,
	size,
	radius,
	appearance = 'ghost',
	mode,
	autoHeight,
	placeholder,
	underlined,
	underline,
	children,
	color = 'white',
	...props
}: SelectTriggerProps) => {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				buttonVariants({
					variant,
					size,
					radius,
					appearance,
					mode,
					autoHeight,
					placeholder,
					underlined,
					underline,
					color,
				}),
				`data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 aria-invalid:bg-destructive-soft text-foreground
				  dark:aria-invalid:bg-destructive-soft gap-1.5 rounded-md bg-transparent py-2 pr-2 pl-2.5 text-sm transition-[color,box-shadow]
				  *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex items-center
				  justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1
				  *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0`,
				className,
			)}
			{...props}>
			{children}
			{!hideIcon && (
				<SelectPrimitive.Icon
					render={<ChevronDownIcon className="text-muted-foreground size-4 pointer-events-none" />}
					{...iconProps}
				/>
			)}
		</SelectPrimitive.Trigger>
	);
};

export type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>;
const SelectValue: React.FC<SelectValueProps> = ({ className, ...props }) => {
	return (
		<SelectPrimitive.Value
			data-slot="select-value"
			className={cn('flex flex-1 gap-1 flex-row grow text-left', className)}
			{...props}
		/>
	);
};
export type SelectPickedPositionerProps = Pick<
	React.ComponentProps<typeof SelectPrimitive.Positioner>,
	| 'alignItemWithTrigger'
	| 'disableAnchorTracking'
	| 'align'
	| 'alignOffset'
	| 'side'
	| 'sideOffset'
	| 'arrowPadding'
	| 'anchor'
	| 'collisionAvoidance'
	| 'collisionBoundary'
	| 'collisionPadding'
	| 'sticky'
	| 'positionMethod'
>;
export type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Popup> &
	SelectPickedPositionerProps & {
		portalProps?: React.ComponentProps<typeof SelectPrimitive.Portal>;
		positionerProps?: Omit<React.ComponentProps<typeof SelectPrimitive.Positioner>, keyof SelectPickedPositionerProps>;
		scrollUpButtonProps?: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>;
		listProps?: React.ComponentProps<typeof SelectPrimitive.List>;
		scrollDownButtonProps?: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>;
		backdropProps?: React.ComponentProps<typeof SelectPrimitive.Backdrop>;
		enableBackdrop?: boolean;
	};
const SelectContent: React.FC<SelectContentProps> = ({
	className,
	children,
	alignItemWithTrigger,
	disableAnchorTracking,
	align,
	alignOffset,
	side,
	sideOffset,
	arrowPadding,
	anchor,
	collisionAvoidance,
	collisionBoundary,
	collisionPadding,
	sticky,
	positionMethod,
	portalProps,
	positionerProps,
	scrollUpButtonProps,
	listProps,
	scrollDownButtonProps,
	backdropProps,
	enableBackdrop,
	...props
}) => {
	return (
		<SelectPrimitive.Portal {...portalProps}>
			{enableBackdrop && <SelectPrimitive.Backdrop {...backdropProps} />}
			<SelectPrimitive.Positioner
				alignItemWithTrigger={alignItemWithTrigger}
				disableAnchorTracking={disableAnchorTracking}
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				arrowPadding={arrowPadding}
				anchor={anchor}
				collisionAvoidance={collisionAvoidance}
				collisionBoundary={collisionBoundary}
				collisionPadding={collisionPadding}
				sticky={sticky}
				positionMethod={positionMethod}
				className="isolate z-50"
				{...positionerProps}>
				<SelectPrimitive.Popup
					data-slot="select-content"
					className={cn(popoverContentVariants({}), className)}
					{...props}>
					<SelectScrollUpButton {...scrollUpButtonProps} />
					<SelectPrimitive.List {...listProps}>{children}</SelectPrimitive.List>
					<SelectScrollDownButton {...scrollDownButtonProps} />
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
};

export type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item> & {
	indicatorProps?: React.ComponentProps<typeof SelectPrimitive.ItemIndicator>;
	textProps?: React.ComponentProps<typeof SelectPrimitive.ItemText>;
};
const SelectItem: React.FC<SelectItemProps> = ({ className, children, textProps, indicatorProps, ...props }) => {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				`focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm
				py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative
				 flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50
				  [&_svg]:pointer-events-none [&_svg]:shrink-0`,
				className,
			)}
			{...props}>
			<SelectPrimitive.ItemIndicator
				render={<span className="pointer-events-none flex size-4 items-center justify-center" />}
				{...indicatorProps}>
				<CheckIcon className="pointer-events-none" />
			</SelectPrimitive.ItemIndicator>
			<SelectPrimitive.ItemText
				className="flex flex-1 gap-2 shrink-0 whitespace-nowrap"
				{...textProps}>
				{children}
			</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
};

const SelectGroup: React.FC<React.ComponentProps<typeof SelectPrimitive.Group>> = ({ className, ...props }) => {
	return (
		<SelectPrimitive.Group
			data-slot="select-group"
			className={cn('scroll-my-1 p-1', className)}
			{...props}
		/>
	);
};

const SelectGroupLabel: React.FC<React.ComponentProps<typeof SelectPrimitive.GroupLabel>> = ({ className, ...props }) => {
	return (
		<SelectPrimitive.GroupLabel
			data-slot="select-label"
			className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
			{...props}
		/>
	);
};

const SelectSeparator: React.FC<React.ComponentProps<typeof SelectPrimitive.Separator>> = ({ className, ...props }) => {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn('bg-border -mx-1 my-1 h-px pointer-events-none', className)}
			{...props}
		/>
	);
};

const SelectScrollUpButton: React.FC<React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>> = ({ className, ...props }) => {
	return (
		<SelectPrimitive.ScrollUpArrow
			data-slot="select-scroll-up-button"
			className={cn(
				`bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4
				top-0 w-full`,
				className,
			)}
			{...props}>
			<ChevronUpIcon />
		</SelectPrimitive.ScrollUpArrow>
	);
};

const SelectScrollDownButton: React.FC<React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>> = ({ className, ...props }) => {
	return (
		<SelectPrimitive.ScrollDownArrow
			data-slot="select-scroll-down-button"
			className={cn(
				`bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4
					 bottom-0 w-full`,
				className,
			)}
			{...props}>
			<ChevronDownIcon />
		</SelectPrimitive.ScrollDownArrow>
	);
};

type CompoundSelect = typeof Select & {
	Group: typeof SelectGroup;
	Value: typeof SelectValue;
	Trigger: typeof SelectTrigger;
	Content: typeof SelectContent;
	GroupLabel: typeof SelectGroupLabel;
	Item: typeof SelectItem;
	Separator: typeof SelectSeparator;
	ScrollUpButton: typeof SelectScrollUpButton;
	ScrollDownButton: typeof SelectScrollDownButton;
};

const SelectComponent = Select as CompoundSelect;
SelectComponent.Group = SelectGroup;
SelectComponent.Value = SelectValue;
SelectComponent.Trigger = SelectTrigger;
SelectComponent.Content = SelectContent;
SelectComponent.GroupLabel = SelectGroupLabel;
SelectComponent.Item = SelectItem;
SelectComponent.Separator = SelectSeparator;
SelectComponent.ScrollUpButton = SelectScrollUpButton;
SelectComponent.ScrollDownButton = SelectScrollDownButton;
export {
	SelectComponent as Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectGroupLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
