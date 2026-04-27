'use client';

import * as React from 'react';
import { ReactNode } from 'react';
import { FormField, FormFieldProps } from '@uikit/ui/form-field';
import { Field, FieldControlProps } from '@uikit/ui/field';
import {
	Autocomplete,
	AutocompleteContentProps,
	AutocompleteControlProps,
	AutocompleteItemProps,
	AutocompletePickedPositionerProps,
	AutocompleteProps,
	PrimitiveAutocompleteInputProps,
} from '@uikit/ui/autocomplete';

export type AutocompleteItem<V extends string = string> = {
	value: V;
	label: ReactNode;
	description?: ReactNode;
	disabled?: boolean;
	badge?: ReactNode;
	item?: any;
};

type AutocompleteFieldProps<V extends string = string> = Pick<
	AutocompleteProps<V>,
	| 'defaultValue'
	| 'value'
	| 'onValueChange'
	| 'defaultOpen'
	| 'open'
	| 'onOpenChange'
	| 'highlightItemOnHover'
	| 'actionsRef'
	| 'filter'
	| 'filteredItems'
	| 'grid'
	| 'inline'
	| 'itemToStringValue'
	// | 'items'
	| 'limit'
	| 'locale'
	| 'modal'
	| 'mode'
	| 'onItemHighlighted'
	| 'onOpenChangeComplete'
	| 'openOnInputClick'
	| 'submitOnItemClick'
	| 'virtualized'
	| 'disabled'
	| 'readOnly'
	| 'required'
	| 'inputRef'
>;

export type AutocompleteInputProps<V extends string = string> = Omit<FormFieldProps, 'children'> &
	Pick<AutocompleteProps<V>, keyof AutocompleteFieldProps<V>> &
	AutocompletePickedPositionerProps & {
		onSelectValue?: (item: AutocompleteItem<V>, value: V) => void;
		items?: Array<V | AutocompleteItem<V>>;
		placeholder?: string;
		autocompleteProps?: Omit<AutocompleteProps<V>, keyof AutocompleteFieldProps<V>>;
		controlProps?: AutocompleteControlProps;
		filedControlProps?: FieldControlProps;
		inputProps?: PrimitiveAutocompleteInputProps;
		contentProps?: Omit<AutocompleteContentProps, keyof AutocompletePickedPositionerProps>;
		itemProps?: AutocompleteItemProps;
		renderItem?: (item: AutocompleteItem<V>, index: number) => ReactNode;
		clearable?: boolean;
	};

export const AutocompleteInput = <V extends string = string>({
	defaultValue,
	value,
	onValueChange,
	defaultOpen,
	open,
	onOpenChange,
	highlightItemOnHover,
	actionsRef,
	filter,
	filteredItems,
	grid,
	inline,
	itemToStringValue,
	limit,
	locale,
	modal,
	mode,
	onItemHighlighted,
	onOpenChangeComplete,
	openOnInputClick,
	submitOnItemClick,
	virtualized,
	disabled,
	readOnly,
	required,
	inputRef,
	items,
	clearable = true,
	disableAnchorTracking,
	align,
	alignOffset,
	side,
	sideOffset = 8,
	arrowPadding,
	anchor,
	collisionAvoidance,
	collisionBoundary,
	collisionPadding,
	sticky,
	positionMethod,

	autocompleteProps,
	controlProps,
	filedControlProps,
	inputProps,
	contentProps,
	itemProps,
	placeholder,
	renderItem,
	onSelectValue,

	...props
}: AutocompleteInputProps<V>) => {
	return (
		<Autocomplete
			defaultValue={defaultValue}
			value={value}
			onValueChange={onValueChange}
			defaultOpen={defaultOpen}
			open={open}
			onOpenChange={onOpenChange}
			highlightItemOnHover={highlightItemOnHover}
			actionsRef={actionsRef}
			filter={filter}
			filteredItems={filteredItems}
			grid={grid}
			inline={inline}
			itemToStringValue={itemToStringValue}
			limit={limit}
			locale={locale}
			modal={modal}
			mode={mode}
			onItemHighlighted={onItemHighlighted}
			onOpenChangeComplete={onOpenChangeComplete}
			openOnInputClick={openOnInputClick}
			submitOnItemClick={submitOnItemClick}
			virtualized={virtualized}
			disabled={disabled}
			readOnly={readOnly}
			required={required}
			inputRef={inputRef}
			items={items}
			{...autocompleteProps}>
			<FormField {...props}>
				<Field.Control
					render={
						<Autocomplete.Control {...controlProps}>
							<Autocomplete.Input
								placeholder={placeholder}
								{...inputProps}
							/>
							{clearable && <Autocomplete.Clear />}
						</Autocomplete.Control>
					}
				/>
			</FormField>
			<Autocomplete.Content
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
				{...contentProps}>
				{(item: AutocompleteItem<V>, i) =>
					renderItem?.(item, i) ?? (
						<Autocomplete.Item
							disabled={item.disabled}
							key={String(typeof item === 'object' ? item.value : item)}
							value={typeof item === 'object' ? item.value : item}
							onClick={() => onSelectValue?.(item, typeof item === 'object' ? item.value : item)}
							{...itemProps}>
							<div className="flex flex-col items-start gap-0 w-full text-sm">
								<div className="font-semibold flex flex-row items-center justify-between w-full">
									{typeof item === 'object' ? item.label : item}
									{item.badge}
								</div>
								{item.description && <div className="text-muted-foreground text-left text-xs">{item.description}</div>}
							</div>
						</Autocomplete.Item>
					)
				}
			</Autocomplete.Content>
		</Autocomplete>
	);
};

AutocompleteInput.displayName = 'AutocompleteInput';
