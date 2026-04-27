'use client';

import * as React from 'react';
import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete';
import { cn } from '../lib/utils';
import { XIcon } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';
import { fieldControlVariants } from './field';
import { popoverContentVariants } from './popover';
import { useRender } from '@base-ui/react/use-render';
import { PopupArrowSvg } from '../components/PopupArrowSvg';

export type AutocompleteProps<Value = any> = AutocompletePrimitive.Root.Props<Value>;
const Autocomplete = <Value = any,>(props: AutocompleteProps<Value>) => {
	return <AutocompletePrimitive.Root {...(props as any)} />;
};

export type PrimitiveAutocompleteInputProps = Omit<React.ComponentProps<typeof AutocompletePrimitive.Input>, 'placeholder'> & {
	placeholder?: string;
};

const PrimitiveAutocompleteInput: React.FC<PrimitiveAutocompleteInputProps> = ({
	placeholder,
	className,
	...props
}: PrimitiveAutocompleteInputProps) => {
	return (
		<AutocompletePrimitive.Input
			data-slot="autocomplete-input"
			placeholder={placeholder}
			className={cn('grow focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none focus-visible:shadow-none', className)}
			{...props}
		/>
	);
};

export type AutocompleteControlProps = useRender.ComponentProps<'div'> & VariantProps<typeof fieldControlVariants>;
const AutocompleteControl: React.FC<AutocompleteControlProps> = ({ className, variant, size, appearance, render, ...props }) => {
	const renderElement = useRender({
		defaultTagName: 'div',
		state: {
			size,
			appearance,
			variant,
			slot: 'autocomplete-control',
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

export type AutocompleteTriggerProps = React.ComponentProps<typeof AutocompletePrimitive.Trigger>;

const AutocompleteTrigger: React.FC<AutocompleteTriggerProps> = ({ className, children, ...props }: AutocompleteTriggerProps) => {
	return (
		<AutocompletePrimitive.Trigger
			data-slot="autocomplete-trigger"
			{...props}
			className={cn('flex flex-row items-center', className)}>
			{children}
		</AutocompletePrimitive.Trigger>
	);
};

export type AutocompleteClearProps = React.ComponentProps<typeof AutocompletePrimitive.Clear>;
const AutocompleteClear: React.FC<AutocompleteClearProps> = ({ className, ...props }) => {
	return (
		<AutocompletePrimitive.Clear
			render={<span />}
			nativeButton={false}
			data-slot="autocomplete-clear"
			className={cn(
				`p-1 absolute right-1 top-1/2 -translate-y-1/2 rounded-sm transition-opacity hover:bg-destructive-soft cursor-pointer
				 [&_svg]:text-destructive/80 hover:[&_svg]:text-destructive`,
				className,
			)}
			{...props}>
			<XIcon className="size-5 " />
		</AutocompletePrimitive.Clear>
	);
};

export type AutocompleteValueProps = React.ComponentProps<typeof AutocompletePrimitive.Value>;
const AutocompleteValue: React.FC<AutocompleteValueProps> = (props) => {
	return (
		<AutocompletePrimitive.Value
			data-slot="autocomplete-value"
			{...props}
		/>
	);
};

export type AutocompletePickedPositionerProps = Pick<
	React.ComponentProps<typeof AutocompletePrimitive.Positioner>,
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

export type AutocompleteContentProps = Omit<React.ComponentProps<typeof AutocompletePrimitive.Popup>, 'children'> &
	AutocompletePickedPositionerProps & {
		portalProps?: React.ComponentProps<typeof AutocompletePrimitive.Portal>;
		positionerProps?: Omit<React.ComponentProps<typeof AutocompletePrimitive.Positioner>, keyof AutocompletePickedPositionerProps>;
		listProps?: React.ComponentProps<typeof AutocompletePrimitive.List>;
		backdropProps?: React.ComponentProps<typeof AutocompletePrimitive.Backdrop>;
		emptyProps?: React.ComponentProps<typeof AutocompleteEmpty>;
		statusProps?: React.ComponentProps<typeof AutocompleteStatus>;
		arrowProps?: React.ComponentProps<typeof AutocompletePrimitive.Arrow>;
		enableBackdrop?: boolean;
		children: AutocompletePrimitive.List.Props['children'];
		renderAtTop?: () => React.ReactNode;
		renderAtBottom?: () => React.ReactNode;
	};

const AutocompleteContent: React.FC<AutocompleteContentProps> = ({
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
	...props
}) => {
	return (
		<AutocompletePrimitive.Portal
			data-slot="autocomplete-portal"
			{...portalProps}>
			{enableBackdrop && (
				<AutocompletePrimitive.Backdrop
					data-slot="autocomplete-backdrop"
					{...backdropProps}
				/>
			)}
			<AutocompletePrimitive.Positioner
				data-slot="autocomplete-positioner"
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
				<AutocompletePrimitive.Popup
					data-slot="autocomplete-content"
					className={cn(popoverContentVariants(), 'gap-0 **:data-[slot=autocomplete-list]:data-empty:hidden', className)}
					{...props}>
					{renderAtTop?.()}
					<AutocompletePrimitive.Arrow
						data-slot={'autocomplete-arrow'}
						{...arrowProps}
						className={'popup-arrow'}>
						<PopupArrowSvg />
					</AutocompletePrimitive.Arrow>
					<AutocompleteStatus {...statusProps} />
					<AutocompleteEmpty {...emptyProps}>No results found!</AutocompleteEmpty>
					<AutocompletePrimitive.List
						data-slot="autocomplete-list"
						{...listProps}
						className={cn('p-1 max-h-100 overflow-y-auto', listProps?.className)}>
						{children}
					</AutocompletePrimitive.List>
					{renderAtBottom?.()}
				</AutocompletePrimitive.Popup>
			</AutocompletePrimitive.Positioner>
		</AutocompletePrimitive.Portal>
	);
};

export type AutocompleteItemProps = React.ComponentProps<typeof AutocompletePrimitive.Item>;
const PrimitiveAutocompleteItem: React.FC<AutocompleteItemProps> = ({ className, children, ...props }) => {
	return (
		<AutocompletePrimitive.Item
			data-slot="autocomplete-item"
			className={cn(
				`focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground
				 not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm
				py-1.5 px-2 text-sm [&_svg:not([class*='size-'])]:size-4 relative
				 flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50
				  [&_svg]:pointer-events-none [&_svg]:shrink-0`,
				className,
			)}
			{...props}>
			{children}
		</AutocompletePrimitive.Item>
	);
};

const AutocompleteGroup: React.FC<React.ComponentProps<typeof AutocompletePrimitive.Group>> = ({ className, ...props }) => {
	return (
		<AutocompletePrimitive.Group
			data-slot="autocomplete-group"
			className={cn('scroll-my-1 p-1', className)}
			{...props}
		/>
	);
};

const AutocompleteGroupLabel: React.FC<React.ComponentProps<typeof AutocompletePrimitive.GroupLabel>> = ({ className, ...props }) => {
	return (
		<AutocompletePrimitive.GroupLabel
			data-slot="autocomplete-label"
			className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
			{...props}
		/>
	);
};

const AutocompleteSeparator: React.FC<React.ComponentProps<typeof AutocompletePrimitive.Separator>> = ({ className, ...props }) => {
	return (
		<AutocompletePrimitive.Separator
			data-slot="autocomplete-separator"
			className={cn('bg-border -mx-1 my-1 h-px pointer-events-none', className)}
			{...props}
		/>
	);
};

const AutocompleteEmpty: React.FC<React.ComponentProps<typeof AutocompletePrimitive.Empty>> = ({ className, ...props }) => {
	return (
		<AutocompletePrimitive.Empty
			data-slot="autocomplete-empty"
			className={cn('text-muted-foreground px-2 empty:hidden py-5 text-center flex justify-center items-center', className)}
			{...props}
		/>
	);
};
const AutocompleteStatus: React.FC<React.ComponentProps<typeof AutocompletePrimitive.Status>> = ({ className, ...props }) => {
	return (
		<AutocompletePrimitive.Status
			data-slot="autocomplete-status"
			className={cn('text-muted-foreground px-2 empty:hidden py-5 text-center flex justify-center items-center', className)}
			{...props}
		/>
	);
};

type CompoundAutocomplete = typeof Autocomplete & {
	Control: typeof AutocompleteControl;
	Group: typeof AutocompleteGroup;
	Value: typeof AutocompleteValue;
	Input: typeof PrimitiveAutocompleteInput;
	Trigger: typeof AutocompleteTrigger;
	Content: typeof AutocompleteContent;
	Popup: typeof AutocompleteContent;
	GroupLabel: typeof AutocompleteGroupLabel;
	Item: typeof PrimitiveAutocompleteItem;
	Separator: typeof AutocompleteSeparator;
	Clear: typeof AutocompleteClear;
	Empty: typeof AutocompleteEmpty;
	Status: typeof AutocompleteStatus;
};

const AutocompleteComponent = Autocomplete as CompoundAutocomplete;
AutocompleteComponent.Control = AutocompleteControl;
AutocompleteComponent.Group = AutocompleteGroup;
AutocompleteComponent.Value = AutocompleteValue;
AutocompleteComponent.Input = PrimitiveAutocompleteInput;
AutocompleteComponent.Trigger = AutocompleteTrigger;
AutocompleteComponent.Content = AutocompleteContent;
AutocompleteComponent.Popup = AutocompleteContent;
AutocompleteComponent.GroupLabel = AutocompleteGroupLabel;
AutocompleteComponent.Item = PrimitiveAutocompleteItem;
AutocompleteComponent.Separator = AutocompleteSeparator;
AutocompleteComponent.Clear = AutocompleteClear;
AutocompleteComponent.Empty = AutocompleteEmpty;
AutocompleteComponent.Status = AutocompleteStatus;

export {
	AutocompleteComponent as Autocomplete,
	AutocompleteControl,
	AutocompleteContent,
	AutocompleteGroup,
	PrimitiveAutocompleteItem,
	AutocompleteGroupLabel,
	AutocompleteSeparator,
	AutocompleteTrigger,
	PrimitiveAutocompleteInput,
	AutocompleteValue,
	AutocompleteClear,
	AutocompleteEmpty,
	AutocompleteStatus,
};
