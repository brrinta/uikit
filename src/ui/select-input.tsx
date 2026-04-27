import * as React from 'react';
import { ReactNode, useCallback, useMemo } from 'react';
import { Badge } from '@uikit/ui/badge';
import { X } from 'lucide-react';
import { cn } from '@uikit/lib/utils';
import { FormField, FormFieldProps } from '@uikit/ui/form-field';
import { Field } from '@uikit/ui/field';
import {
	Select,
	SelectContentProps,
	SelectItemProps,
	SelectPickedPositionerProps,
	SelectProps,
	SelectTriggerProps,
	SelectValueProps,
} from '@uikit/ui/select';

export type SelectItemOption<V> = { label: ReactNode; value: V };
export type SelectItems<V> = Record<string, ReactNode> | SelectItemOption<V>[];

type SelectFieldProps<V = unknown, M extends boolean | undefined = false> = Pick<
	SelectProps<V, M>,
	| 'defaultValue'
	| 'value'
	| 'onValueChange'
	| 'defaultOpen'
	| 'open'
	| 'onOpenChange'
	| 'highlightItemOnHover'
	| 'actionsRef'
	| 'isItemEqualToValue'
	| 'itemToStringLabel'
	| 'itemToStringValue'
	| 'modal'
	| 'multiple'
	| 'onOpenChangeComplete'
	| 'disabled'
	| 'readOnly'
	| 'required'
	| 'inputRef'
>;

export type SelectInputProps<V = unknown, M extends boolean | undefined = false> = Omit<FormFieldProps, 'children'> &
	Pick<SelectProps<V, M>, keyof SelectFieldProps<V, M>> &
	SelectPickedPositionerProps & {
		placeholder?: string;
		multipleValueMode?: 'more' | 'comma' | 'chips';
		selectProps?: Omit<SelectProps<V, M>, keyof SelectFieldProps<V, M>>;
		triggerProps?: SelectTriggerProps;
		valueProps?: SelectValueProps;
		renderValue?: (val: V) => ReactNode;
		contentProps?: Omit<SelectContentProps, keyof SelectPickedPositionerProps>;
		itemProps?: SelectItemProps;
		items?: SelectItems<V>;
		renderItems?: (options: SelectItemOption<V>[]) => ReactNode;
		clearable?: boolean;
		deselectable?: boolean;
		multipleValueLimit?: number;
	};

export const SelectInput = <V = unknown, M extends boolean | undefined = false>({
	defaultValue,
	value,
	onValueChange,
	defaultOpen,
	open,
	onOpenChange,
	highlightItemOnHover,
	actionsRef,
	isItemEqualToValue,
	itemToStringLabel,
	itemToStringValue,
	items,
	modal,
	multiple,
	multipleValueMode = 'more',
	multipleValueLimit = 1,
	onOpenChangeComplete,
	disabled,
	readOnly,
	required,
	clearable,
	deselectable,
	inputRef,
	renderValue,
	itemProps,
	renderItems,
	contentProps,
	alignItemWithTrigger = false,
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
	selectProps,
	placeholder,
	triggerProps,
	valueProps,
	end,
	...props
}: SelectInputProps<V, M>) => {
	// Normalize items to array format
	const normalizedItems = useMemo((): SelectItemOption<V>[] => {
		if (!items) return [];
		if (Array.isArray(items)) return items;
		// Record<string, ReactNode> format
		return Object.entries(items).map(([key, label]) => ({
			value: key as V,
			label,
		}));
	}, [items]);

	const fallbackRenderValue = useCallback(
		(val: any) => {
			if (val === undefined || val === null) return placeholder ?? 'Select an option';

			const getOptionLabel = (v: any) => {
				const found = normalizedItems.find((option) => (isItemEqualToValue ? isItemEqualToValue(option.value, v) : option.value === v));
				return found?.label || String(v);
			};

			if (!multiple) return getOptionLabel(val) || placeholder;

			if (multiple && Array.isArray(val)) {
				if (val.length === 0) {
					return placeholder ?? 'Select an option';
				}

				if (multipleValueMode === 'comma') {
					return val.map((v, i) => (
						<React.Fragment key={i}>
							{getOptionLabel(v)}
							{i < val.length - 1 ? ', ' : ''}
						</React.Fragment>
					));
				}

				if (multipleValueMode === 'chips') {
					return (
						<div className="flex flex-wrap gap-1">
							{val.map((v, i) => (
								<Badge
									key={i}
									variant="secondary"
									size="sm">
									{getOptionLabel(v)}
									<Badge.Button
										onClick={(e) => {
											e.stopPropagation();
											const newValue = val.filter((_, index) => index !== i);
											onValueChange?.(
												newValue as any,
												{
													reason: 'chip-remove-press',
													event: e.nativeEvent,
												} as any,
											);
										}}>
										<X className="size-3" />
									</Badge.Button>
								</Badge>
							))}
						</div>
					);
				}

				const displayedValues = val.slice(0, multipleValueLimit);
				const remainingCount = val.length - displayedValues.length;

				return (
					<>
						{displayedValues.map((v, i) => (
							<React.Fragment key={i}>
								{getOptionLabel(v)}
								{i < displayedValues.length - 1 ? ', ' : ''}
							</React.Fragment>
						))}
						{remainingCount > 0 && ` (+${remainingCount} more)`}
					</>
				);
			}
		},
		[placeholder, multiple, normalizedItems, multipleValueMode, multipleValueLimit, isItemEqualToValue, onValueChange],
	);

	const handleValueChange = useCallback(
		(val: any, details: any) => {
			// @ts-ignore
			if (!multiple && deselectable && (isItemEqualToValue ? isItemEqualToValue(value, val) : value === val)) {
				onValueChange?.(null as any, details);
			} else {
				onValueChange?.(val, details);
			}
		},
		[multiple, deselectable, value, onValueChange, isItemEqualToValue],
	);

	const handleClear = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			onValueChange?.(
				(multiple ? [] : null) as any,
				{
					reason: 'clear-press' as any,
					event: e.nativeEvent,
				} as any,
			);
		},
		[multiple, onValueChange],
	);

	const endElement = useMemo(() => {
		if (!clearable || disabled || readOnly) return null;
		const hasValue = multiple ? Array.isArray(value) && value.length > 0 : value !== null && value !== undefined;
		if (!hasValue) return null;

		return (
			<button
				type="button"
				onClick={handleClear}
				className={`flex items-center justify-center p-1 mr-1 rounded-sm opacity-50 transition-opacity hover:opacity-100 hover:bg-destructive-soft
					 cursor-pointer [&_svg]:text-destructive/80 hover:[&_svg]:text-destructive`}>
				<X className="size-3.5" />
				<span className="sr-only">Clear</span>
			</button>
		);
	}, [clearable, disabled, readOnly, value, multiple, handleClear]);

	return (
		<FormField
			end={end ?? endElement}
			{...props}>
			<Field.Control
				render={
					<Select<V, M>
						defaultValue={defaultValue}
						value={value}
						onValueChange={handleValueChange}
						defaultOpen={defaultOpen}
						open={open}
						onOpenChange={onOpenChange}
						highlightItemOnHover={highlightItemOnHover}
						actionsRef={actionsRef}
						isItemEqualToValue={isItemEqualToValue}
						itemToStringLabel={itemToStringLabel}
						itemToStringValue={itemToStringValue}
						modal={modal}
						multiple={multiple}
						onOpenChangeComplete={onOpenChangeComplete}
						disabled={disabled}
						readOnly={readOnly}
						required={required}
						inputRef={inputRef}
						items={items}
						{...selectProps}>
						<Select.Trigger
							data-slot={'field-control'}
							size={props.size as any}
							autoHeight={multipleValueMode === 'chips'}
							{...triggerProps}
							className={cn(
								multipleValueMode === 'chips' &&
									'h-auto min-h-9 flex-wrap py-1.5 whitespace-normal *:data-[slot=select-value]:line-clamp-none *:data-[slot=select-value]:flex-wrap',
								triggerProps?.className,
							)}>
							<Select.Value
								data-placeholder={placeholder}
								placeholder={placeholder}
								{...valueProps}>
								{(val) => renderValue?.(val) ?? fallbackRenderValue(val)}
							</Select.Value>
						</Select.Trigger>
						<Select.Content
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
							{...contentProps}>
							{renderItems?.(normalizedItems) ??
								normalizedItems.map((item, i) => (
									<Select.Item
										key={i}
										value={item.value}
										{...itemProps}>
										{item.label}
									</Select.Item>
								))}
						</Select.Content>
					</Select>
				}
				{...selectProps}
			/>
		</FormField>
	);
};
SelectInput.displayName = 'SelectInput';
