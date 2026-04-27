import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { cn } from '../lib/utils';
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';
import { fieldControlVariants } from './field';
import { popoverContentVariants } from './popover';
import { badgeButtonVariants, badgeVariants } from './badge';
import { useRender } from '@base-ui/react/use-render';
import { PopupArrowSvg } from '../components/PopupArrowSvg';

export type ComboboxProps<Value = any, Multiple extends boolean | undefined = false> = ComboboxPrimitive.Root.Props<Value, Multiple>;
const Combobox = <Value = any, Multiple extends boolean | undefined = false>(props: ComboboxProps<Value, Multiple>) => {
	return <ComboboxPrimitive.Root {...props} />;
};

export type PrimitiveComboboxInputProps = Omit<React.ComponentProps<typeof ComboboxPrimitive.Input>, 'placeholder'> & {
	placeholder?: string;
};

const ComboboxInput: React.FC<PrimitiveComboboxInputProps> = ({ placeholder, className, ...props }: PrimitiveComboboxInputProps) => {
	return (
		<ComboboxPrimitive.Input
			data-slot="combobox-input"
			placeholder={placeholder}
			className={cn('grow focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none focus-visible:shadow-none', className)}
			{...props}
		/>
	);
};

export type ComboboxControlProps = useRender.ComponentProps<'div'> & VariantProps<typeof fieldControlVariants>;
const ComboboxControl: React.FC<ComboboxControlProps> = ({ className, variant, size, appearance, render, ...props }) => {
	const renderElement = useRender({
		defaultTagName: 'div',
		state: {
			size,
			appearance,
			variant,
			slot: 'combobox-control',
		},
		props: {
			...props,
			className: cn(
				fieldControlVariants({
					variant,
					size,
					appearance,
				}),
				'flex flex-row items-stretch py-1 relative',
				className,
			),
		},
		render,
	});
	return <>{renderElement}</>;
};

export type ComboboxTriggerProps = React.ComponentProps<typeof ComboboxPrimitive.Trigger> & {
	iconProps?: React.ComponentProps<typeof ComboboxPrimitive.Icon>;
};

const ComboboxTrigger: React.FC<ComboboxTriggerProps> = ({ iconProps, className, children, ...props }: ComboboxTriggerProps) => {
	return (
		<ComboboxPrimitive.Trigger
			data-slot="combobox-trigger"
			{...props}
			className={cn('flex flex-row items-center flex-nowrap!', className)}>
			{children}
			<ComboboxPrimitive.Icon
				render={<ChevronsUpDownIcon className="text-muted-foreground size-5 pointer-events-none my-auto" />}
				{...iconProps}
			/>
		</ComboboxPrimitive.Trigger>
	);
};

export type ComboboxClearProps = React.ComponentProps<typeof ComboboxPrimitive.Clear>;
const ComboboxClear: React.FC<ComboboxClearProps> = ({ className, ...props }) => {
	return (
		<ComboboxPrimitive.Clear
			render={<span />}
			nativeButton={false}
			data-slot="combobox-clear"
			className={cn(
				'p-1 rounded-sm transition-opacity hover:bg-destructive-soft cursor-pointer [&_svg]:text-destructive/80 hover:[&_svg]:text-destructive',
				className,
			)}
			{...props}>
			<XIcon className="size-5 " />
		</ComboboxPrimitive.Clear>
	);
};

const ComboboxActionWrapper: React.FC<React.ComponentProps<'div'>> = ({ children, className, ...props }) => {
	return (
		<div
			data-slot="combobox-action-wrapper"
			className={cn('box-border absolute flex items-center justify-center right-1 top-1/2 -translate-y-1/2', className)}
			{...props}>
			{children}
		</div>
	);
};

export type ComboboxValueProps = React.ComponentProps<typeof ComboboxPrimitive.Value>;
const ComboboxValue: React.FC<ComboboxValueProps> = (props) => {
	return (
		<ComboboxPrimitive.Value
			data-slot="combobox-value"
			{...props}
		/>
	);
};

export type ComboboxPickedPositionerProps = Pick<
	React.ComponentProps<typeof ComboboxPrimitive.Positioner>,
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

export type ComboboxContentProps = Omit<React.ComponentProps<typeof ComboboxPrimitive.Popup>, 'children'> &
	ComboboxPickedPositionerProps & {
		portalProps?: React.ComponentProps<typeof ComboboxPrimitive.Portal>;
		positionerProps?: Omit<React.ComponentProps<typeof ComboboxPrimitive.Positioner>, keyof ComboboxPickedPositionerProps>;
		listProps?: React.ComponentProps<typeof ComboboxPrimitive.List>;
		backdropProps?: React.ComponentProps<typeof ComboboxPrimitive.Backdrop>;
		emptyProps?: React.ComponentProps<typeof ComboboxEmpty>;
		statusProps?: React.ComponentProps<typeof ComboboxStatus>;
		arrowProps?: React.ComponentProps<typeof ComboboxPrimitive.Arrow>;
		enableBackdrop?: boolean;
		children: ComboboxPrimitive.List.Props['children'];
		renderAtTop?: () => React.ReactNode;
		renderAtBottom?: () => React.ReactNode;
		loading?: boolean;
	};

const ComboboxContent: React.FC<ComboboxContentProps> = ({
	className,
	children,
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
	listProps,
	backdropProps,
	emptyProps,
	enableBackdrop,
	arrowProps,
	statusProps,
	renderAtBottom,
	renderAtTop,
	loading,
	...props
}) => {
	return (
		<ComboboxPrimitive.Portal
			data-slot="combobox-portal"
			{...portalProps}>
			{enableBackdrop && (
				<ComboboxPrimitive.Backdrop
					data-slot="combobox-backdrop"
					{...backdropProps}
				/>
			)}
			<ComboboxPrimitive.Positioner
				data-slot="combobox-positioner"
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
				<ComboboxPrimitive.Popup
					data-slot="combobox-content"
					className={cn(popoverContentVariants(), 'gap-0 **:data-[slot=combobox-list]:data-empty:hidden', className)}
					{...props}>
					{renderAtTop?.()}
					<ComboboxPrimitive.Arrow
						data-slot={'combobox-arrow'}
						{...arrowProps}
						className={'popup-arrow'}>
						<PopupArrowSvg />
					</ComboboxPrimitive.Arrow>
					<ComboboxStatus {...statusProps}>{loading ? 'Loading...' : null}</ComboboxStatus>
					<ComboboxEmpty {...emptyProps}>No results found!</ComboboxEmpty>
					<ComboboxPrimitive.List
						data-slot="combobox-list"
						{...listProps}
						className={cn('p-1 max-h-100 overflow-y-auto', listProps?.className)}>
						{children}
					</ComboboxPrimitive.List>
					{renderAtBottom?.()}
				</ComboboxPrimitive.Popup>
			</ComboboxPrimitive.Positioner>
		</ComboboxPrimitive.Portal>
	);
};

export type ComboboxItemProps = React.ComponentProps<typeof ComboboxPrimitive.Item> & {
	indicatorProps?: React.ComponentProps<typeof ComboboxPrimitive.ItemIndicator>;
};
const ComboboxItem: React.FC<ComboboxItemProps> = ({ className, children, indicatorProps, ...props }) => {
	return (
		<ComboboxPrimitive.Item
			data-slot="combobox-item"
			className={cn(
				`focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground
				 not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm
				py-1.5 px-2 text-sm [&_svg:not([class*='size-'])]:size-4 relative
				 flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50
				  [&_svg]:pointer-events-none [&_svg]:shrink-0`,
				className,
			)}
			{...props}>
			<ComboboxPrimitive.ItemIndicator
				render={<span className="pointer-events-none flex size-4 items-center justify-center" />}
				{...indicatorProps}>
				<CheckIcon className="pointer-events-none" />
			</ComboboxPrimitive.ItemIndicator>
			{children}
		</ComboboxPrimitive.Item>
	);
};

const ComboboxGroup: React.FC<React.ComponentProps<typeof ComboboxPrimitive.Group>> = ({ className, ...props }) => {
	return (
		<ComboboxPrimitive.Group
			data-slot="combobox-group"
			className={cn('scroll-my-1 p-1', className)}
			{...props}
		/>
	);
};

const ComboboxGroupLabel: React.FC<React.ComponentProps<typeof ComboboxPrimitive.GroupLabel>> = ({ className, ...props }) => {
	return (
		<ComboboxPrimitive.GroupLabel
			data-slot="combobox-label"
			className={cn('text-muted-foreground px-2 py-1.5 text-xs font-bold', className)}
			{...props}
		/>
	);
};

const ComboboxSeparator: React.FC<React.ComponentProps<typeof ComboboxPrimitive.Separator>> = ({ className, ...props }) => {
	return (
		<ComboboxPrimitive.Separator
			data-slot="combobox-separator"
			className={cn('bg-border -mx-1 my-1 h-px pointer-events-none', className)}
			{...props}
		/>
	);
};

export type ComboboxPlaceholderProps = React.ComponentProps<'div'>;
const ComboboxPlaceholder: React.FC<ComboboxPlaceholderProps> = ({ className, ...props }) => {
	return (
		<div
			data-slot="combobox-placeholder"
			className={cn('text-muted-foreground flex items-center', className)}
			{...props}
		/>
	);
};

export type ComboboxChipsProps<V = any> = React.ComponentProps<typeof ComboboxPrimitive.Chips> & {
	chipProps?: React.ComponentProps<typeof ComboboxChip>;
	chipRemoveProps?: React.ComponentProps<typeof ComboboxChipRemove>;
	renderLabel: (val: V, index: number) => React.ReactNode;
	values: Array<V>;
};
const ComboboxChips = <V = any,>({ className, chipProps, chipRemoveProps, renderLabel, values, ...props }: ComboboxChipsProps<V>) => {
	return (
		<ComboboxPrimitive.Chips
			data-slot="combobox-chips"
			className={cn('flex gap-2 flex-wrap flex-row items-center grow', className)}
			{...props}>
			{values.map((value, index) => (
				<ComboboxChip
					key={index}
					variant={'outline'}
					{...chipProps}>
					{renderLabel(value, index)}
				</ComboboxChip>
			))}
		</ComboboxPrimitive.Chips>
	);
};

export type ComboboxChipProps = React.ComponentProps<typeof ComboboxPrimitive.Chip> &
	VariantProps<typeof badgeVariants> & {
		chipRemoveProps?: React.ComponentProps<typeof ComboboxChipRemove>;
	};
const ComboboxChip: React.FC<ComboboxChipProps> = ({
	className,
	children,
	appearance,
	disabled,
	shape,
	size,
	variant,
	chipRemoveProps,
	...props
}) => {
	return (
		<ComboboxPrimitive.Chip
			data-slot="combobox-chip"
			{...props}
			className={cn(badgeVariants({ appearance, disabled, shape, size, variant }), className)}>
			{children}
			<ComboboxChipRemove {...chipRemoveProps} />
		</ComboboxPrimitive.Chip>
	);
};

export type ComboboxChipRemoveProps = React.ComponentProps<typeof ComboboxPrimitive.ChipRemove> & VariantProps<typeof badgeButtonVariants>;
const ComboboxChipRemove: React.FC<ComboboxChipRemoveProps> = ({ className, children, ...props }) => {
	return (
		<ComboboxPrimitive.ChipRemove
			nativeButton={false}
			render={<span />}
			data-slot="combobox-chip-remove"
			{...props}
			className={cn(badgeButtonVariants(), className)}>
			{children ?? <XIcon className="size-4" />}
		</ComboboxPrimitive.ChipRemove>
	);
};

const ComboboxEmpty: React.FC<React.ComponentProps<typeof ComboboxPrimitive.Empty>> = ({ className, ...props }) => {
	return (
		<ComboboxPrimitive.Empty
			data-slot="combobox-empty"
			className={cn('text-muted-foreground px-2 empty:hidden py-5 text-center flex justify-center items-center', className)}
			{...props}
		/>
	);
};
const ComboboxStatus: React.FC<React.ComponentProps<typeof ComboboxPrimitive.Status>> = ({ className, ...props }) => {
	return (
		<ComboboxPrimitive.Status
			data-slot="combobox-status"
			className={cn('text-muted-foreground px-2 empty:hidden py-5 text-center flex justify-center items-center', className)}
			{...props}
		/>
	);
};

type CompoundCombobox = typeof Combobox & {
	Control: typeof ComboboxControl;
	Group: typeof ComboboxGroup;
	Value: typeof ComboboxValue;
	Input: typeof ComboboxInput;
	Trigger: typeof ComboboxTrigger;
	Content: typeof ComboboxContent;
	GroupLabel: typeof ComboboxGroupLabel;
	Item: typeof ComboboxItem;
	Separator: typeof ComboboxSeparator;
	Clear: typeof ComboboxClear;
	ActionWrapper: typeof ComboboxActionWrapper;
	Placeholder: typeof ComboboxPlaceholder;
	Chips: typeof ComboboxChips;
	Chip: typeof ComboboxChip;
	ChipRemove: typeof ComboboxChipRemove;
	Empty: typeof ComboboxEmpty;
	Status: typeof ComboboxStatus;
};

const ComboboxComponent = Combobox as CompoundCombobox;
ComboboxComponent.Control = ComboboxControl;
ComboboxComponent.Group = ComboboxGroup;
ComboboxComponent.Value = ComboboxValue;
ComboboxComponent.Input = ComboboxInput;
ComboboxComponent.Trigger = ComboboxTrigger;
ComboboxComponent.Content = ComboboxContent;
ComboboxComponent.GroupLabel = ComboboxGroupLabel;
ComboboxComponent.Item = ComboboxItem;
ComboboxComponent.Separator = ComboboxSeparator;
ComboboxComponent.Clear = ComboboxClear;
ComboboxComponent.ActionWrapper = ComboboxActionWrapper;
ComboboxComponent.Placeholder = ComboboxPlaceholder;
ComboboxComponent.Chips = ComboboxChips;
ComboboxComponent.Chip = ComboboxChip;
ComboboxComponent.ChipRemove = ComboboxChipRemove;
ComboboxComponent.Empty = ComboboxEmpty;
ComboboxComponent.Status = ComboboxStatus;

export {
	ComboboxComponent as Combobox,
	ComboboxControl,
	ComboboxContent,
	ComboboxGroup,
	ComboboxItem,
	ComboboxGroupLabel,
	ComboboxSeparator,
	ComboboxTrigger,
	// ComboboxInput,
	ComboboxValue,
	ComboboxClear,
	ComboboxActionWrapper,
	ComboboxPlaceholder,
	ComboboxChips,
	ComboboxChip,
	ComboboxChipRemove,
	ComboboxEmpty,
	ComboboxStatus,
};
