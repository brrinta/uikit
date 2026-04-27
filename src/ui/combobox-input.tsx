import * as React from 'react';
import { ReactNode, useCallback } from 'react';
import { FormField, FormFieldProps } from '@uikit/ui/form-field';
import { Field, FieldControlProps } from '@uikit/ui/field';
import {
	Combobox,
	ComboboxChipsProps,
	ComboboxClearProps,
	ComboboxContentProps,
	ComboboxControlProps,
	ComboboxItemProps,
	ComboboxPickedPositionerProps,
	ComboboxPlaceholderProps,
	ComboboxProps,
	ComboboxTriggerProps,
	ComboboxValueProps,
	PrimitiveComboboxInputProps,
} from '@uikit/ui/combobox';
import { cn } from '@uikit/lib/utils';
import { MongoDbObjectID } from '@uikit/schema';
import { CircleFadingPlus } from 'lucide-react';
import { uniqBy } from 'lodash-es';
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { Spinner } from '@uikit/ui/spinner';

export type ComboboxData<V = any> = {
	_id: Required<MongoDbObjectID> | string;
	value: V;
	label: ReactNode;
	description?: ReactNode;
	disabled?: boolean;
	badge?: ReactNode;
	group?: string;
	__NEW__?: boolean;
};

type ComboboxFieldProps<V = any, M extends boolean | undefined = false> = Pick<
	ComboboxProps<ComboboxData<V>, M>,
	// | 'defaultValue'
	// | 'value'
	// | 'onValueChange'
	| 'defaultInputValue'
	| 'inputValue'
	| 'onInputValueChange'
	| 'defaultOpen'
	| 'open'
	| 'onOpenChange'
	| 'highlightItemOnHover'
	| 'actionsRef'
	| 'filter'
	| 'filteredItems'
	| 'grid'
	| 'inline'
	| 'isItemEqualToValue'
	| 'itemToStringLabel'
	| 'itemToStringValue'
	// | 'items'
	| 'limit'
	| 'locale'
	| 'modal'
	// | 'multiple'
	| 'onItemHighlighted'
	| 'onOpenChangeComplete'
	| 'virtualized'
	| 'disabled'
	| 'readOnly'
	| 'required'
	| 'inputRef'
>;

export type ComboboxInputProps<
	V = any,
	M extends boolean | undefined = false,
	ITEM extends ComboboxData<V> = ComboboxData<V>,
	VK extends keyof ITEM = keyof ITEM,
> = Omit<FormFieldProps, 'children' | 'onChange'> &
	Pick<ComboboxProps<ITEM, M>, keyof ComboboxFieldProps<V, M>> &
	ComboboxPickedPositionerProps & {
		multiple?: M;
		valueKey?: VK;
		// defaultValue?: (M extends true ? Array<ITEM[VK]> : ITEM[VK]) | null;
		defaultValue?: (M extends true ? Array<V> : V) | null;
		multipleValueMode?: 'more' | 'comma' | 'chips';
		multipleValueLimit?: number;
		// value?: (M extends true ? Array<ITEM[VK]> : ITEM[VK]) | null;
		value?: (M extends true ? Array<V> : V) | null;
		// onValueChange?: (value: (M extends true ? Array<ITEM[VK]> : ITEM[VK]) | null, evt: BaseCombobox.Root.ChangeEventDetails) => void;
		onValueChange?: (
			value: (M extends true ? Array<V> : V) | null,
			keyValue: (M extends true ? Array<ITEM[VK]> : ITEM[VK]) | null,
			item: (M extends true ? Array<ITEM> : ITEM) | null,
			evt: BaseCombobox.Root.ChangeEventDetails,
		) => void;
		clearable?: boolean;
		loading?: boolean;
		placeholderProps?: ComboboxPlaceholderProps;
		placeholder?: string;
		searchPlaceholder?: string;
		comboboxProps?: Omit<ComboboxProps<ITEM, M>, keyof ComboboxFieldProps<V, M>>;
		filedControlProps?: FieldControlProps;
		triggerProps?: ComboboxTriggerProps;
		clearProps?: ComboboxClearProps;
		controlProps?: ComboboxControlProps;
		inputProps?: PrimitiveComboboxInputProps;
		valueProps?: ComboboxValueProps;
		renderValue?: (val: ITEM) => ReactNode;
		renderItem?: (item: ITEM, index: number) => ReactNode;
		contentProps?: Omit<ComboboxContentProps, keyof ComboboxPickedPositionerProps>;
		itemProps?: ComboboxItemProps;
		chipsProps?: Omit<ComboboxChipsProps, 'values' | 'renderValue'>;
		items: Array<ITEM>;
		creatable?: boolean;
		newItemBuilder?: (inputValue: ComboboxFieldProps<V, M>['inputValue']) => ITEM;
		onNewItemCreated?: (item: ITEM) => void;
	};

export const ComboboxInput = <
	V = any,
	M extends boolean | undefined = false,
	ITEM extends ComboboxData<V> = ComboboxData<V>,
	VK extends keyof ITEM = keyof ITEM,
>({
	valueKey = '_id' as VK,
	defaultValue,
	value,
	onValueChange,
	defaultInputValue,
	inputValue,
	onInputValueChange,
	defaultOpen,
	open,
	onOpenChange,
	highlightItemOnHover,
	actionsRef,
	filter,
	filteredItems,
	grid,
	inline,
	isItemEqualToValue,
	itemToStringLabel,
	itemToStringValue,
	items = [],
	limit,
	locale,
	modal,
	multiple,
	multipleValueMode = 'chips',
	multipleValueLimit = 1,
	onItemHighlighted,
	onOpenChangeComplete,
	virtualized,
	disabled,
	readOnly,
	required,
	inputRef,

	clearable,
	renderValue,
	renderItem,
	itemProps,
	contentProps,
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
	comboboxProps,
	placeholderProps,
	placeholder,
	searchPlaceholder,
	triggerProps,
	clearProps,
	inputProps,
	valueProps,
	chipsProps,
	controlProps,
	filedControlProps,

	creatable,
	newItemBuilder,
	onNewItemCreated,
	loading,

	...props
}: ComboboxInputProps<V, M, ITEM, VK>) => {
	const [newCreatedItems, setNewCreatedItems] = React.useState<Array<ITEM>>([]);
	const [selectedItemsCache, setSelectedItemsCache] = React.useState<Array<ITEM>>([]);

	React.useEffect(() => {
		const valArray = value === null || value === undefined ? [] : Array.isArray(value) ? value : [value];
		const defValArray = defaultValue === null || defaultValue === undefined ? [] : Array.isArray(defaultValue) ? defaultValue : [defaultValue];

		const relevantValues = value !== undefined ? valArray : defValArray;

		if (relevantValues.length === 0) {
			if (selectedItemsCache.length > 0) setSelectedItemsCache([]);
			return;
		}

		const matchingFromItems = items.filter((item) =>
			relevantValues.some((v) => (v && typeof v === 'object' && valueKey in v ? (v as any)[valueKey] : v) === item[valueKey]),
		);

		setSelectedItemsCache((prev) => {
			const combined = uniqBy([...prev, ...matchingFromItems], valueKey as string);
			return combined.filter((item) =>
				relevantValues.some((v) => (v && typeof v === 'object' && valueKey in v ? (v as any)[valueKey] : v) === item[valueKey]),
			);
		});
	}, [value, defaultValue, items, valueKey]);

	const allItems = React.useMemo(
		() => uniqBy([...items, ...newCreatedItems, ...selectedItemsCache], valueKey as string),
		[items, newCreatedItems, selectedItemsCache, valueKey],
	);
	const [searchValue, setSearchValue] = React.useState<string>((inputValue as string) ?? '');
	const containerRef = React.useRef<HTMLDivElement | null>(null);

	const defaultItemToStringLabel = React.useCallback(
		(item: ITEM) => {
			const label = itemToStringLabel?.(item) ?? item.label;
			return typeof label === 'string' ? label : String(label ?? '');
		},
		[itemToStringLabel],
	);

	const exactMatchExists = React.useMemo(() => {
		if (!searchValue) return true;
		return allItems.some((item) => {
			const label = defaultItemToStringLabel(item);
			return label.toLowerCase() === searchValue.toLowerCase();
		});
	}, [allItems, searchValue, defaultItemToStringLabel]);

	const newItem = useCallback(
		(sv: string) =>
			newItemBuilder
				? newItemBuilder(sv)
				: ({
						_id: `new-${sv}`,
						value: sv,
						label: sv,
						description: 'New Record',
						__NEW__: true,
					} as ITEM),
		[newItemBuilder],
	);

	const displayItems = React.useMemo(() => {
		const baseItems = creatable && searchValue && !exactMatchExists ? [...allItems, newItem(searchValue)] : allItems;

		const hasGroups = baseItems.some((item) => item.group);
		if (!hasGroups) return baseItems;

		return [...baseItems].sort((a, b) => {
			const groupA = a.group || '';
			const groupB = b.group || '';
			if (groupA === groupB) return 0;
			if (groupA === '') return -1;
			if (groupB === '') return 1;
			return groupA.localeCompare(groupB);
		});
	}, [allItems, creatable, searchValue, exactMatchExists, newItem]);

	const defaultFilteredItems = React.useMemo(() => {
		if (filteredItems) return filteredItems;
		// @ts-ignore
		if (typeof filter === 'function' || filter === false) return undefined;
		if (!searchValue) return displayItems;
		const search = searchValue.toLowerCase();
		return (displayItems as ITEM[]).filter((item) => defaultItemToStringLabel(item).toLowerCase().includes(search));
	}, [displayItems, filteredItems, filter, searchValue, defaultItemToStringLabel]);

	const renderComboboxItem = (item: ITEM) => {
		return (
			<div className={'flex flex-col justify-center gap-0 w-full text-sm'}>
				<div className={'font-semibold flex flex-row items-center justify-between w-full'}>
					{item.label}
					{item.badge}
				</div>
				{(item.description || item.__NEW__) && (
					<div className={'text-muted-foreground text-left text-xs'}>
						{item.__NEW__ ? (
							<span className="flex items-center gap-1">
								<CircleFadingPlus className="size-3 text-success" /> {item.description}
							</span>
						) : (
							item.description
						)}
					</div>
				)}
			</div>
		);
	};

	const calculatedDefaultValue = React.useMemo<any>(() => {
		if (defaultValue === undefined) return undefined;
		if (defaultValue === null) return null;

		if (multiple) {
			const dv = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
			return allItems.filter((item) => dv.some((v) => (v && typeof v === 'object' && valueKey in v ? (v as any)[valueKey] : v) === item[valueKey]));
		} else {
			const dv = defaultValue && typeof defaultValue === 'object' && valueKey in defaultValue ? (defaultValue as any)[valueKey] : defaultValue;
			return allItems.find((item) => item[valueKey] === dv) ?? null;
		}
	}, [defaultValue, allItems, multiple, valueKey]);

	const calculatedValue = React.useMemo<any>(() => {
		if (value === undefined) return undefined;
		if (value === null) return null;

		if (multiple) {
			const val = Array.isArray(value) ? value : [value];
			return allItems.filter((item) => val.some((v) => (v && typeof v === 'object' && valueKey in v ? (v as any)[valueKey] : v) === item[valueKey]));
		} else {
			const val = value && typeof value === 'object' && valueKey in value ? (value as any)[valueKey] : value;
			return allItems.find((item) => item[valueKey] === val) ?? null;
		}
	}, [value, allItems, multiple, valueKey]);

	const handleValueChange = (val: any, evt: BaseCombobox.Root.ChangeEventDetails) => {
		if (multiple) {
			const items = val as ITEM[];
			const newItems = items.filter((i) => i.__NEW__);
			if (newItems.length > 0) {
				setNewCreatedItems((prev) => uniqBy([...prev, ...newItems], valueKey as string));
				newItems.forEach((ni) => onNewItemCreated?.(ni));
			}
			setSelectedItemsCache((prev) => uniqBy([...prev, ...items], valueKey as string));
			onValueChange?.(
				items.map((i) => i.value) as M extends true ? V[] : V,
				items.map((i) => i[valueKey]) as M extends true ? Array<ITEM[VK]> : ITEM[VK],
				items as M extends true ? Array<ITEM> : ITEM,
				evt,
			);
		} else {
			const item = val as ITEM | null;
			if (item?.__NEW__) {
				setNewCreatedItems((prev) => uniqBy([...prev, item], valueKey as string));
				onNewItemCreated?.(item);
			}
			if (item) {
				setSelectedItemsCache((prev) => uniqBy([...prev, item], valueKey as string));
			}
			onValueChange?.(
				(item?.value ?? null) as (M extends true ? V[] : V) | null,
				(item?.[valueKey] ?? null) as (M extends true ? Array<ITEM[VK]> : ITEM[VK]) | null,
				item as (M extends true ? Array<ITEM> : ITEM) | null,
				evt,
			);
		}
	};
	return (
		<Combobox<ITEM, M>
			defaultValue={calculatedDefaultValue}
			value={calculatedValue}
			onValueChange={handleValueChange}
			defaultInputValue={defaultInputValue}
			inputValue={searchValue}
			onInputValueChange={(s, e) => {
				setSearchValue(s);
				onInputValueChange?.(s, e);
			}}
			defaultOpen={defaultOpen}
			open={open}
			onOpenChange={onOpenChange}
			highlightItemOnHover={highlightItemOnHover}
			actionsRef={actionsRef}
			filter={filter}
			filteredItems={defaultFilteredItems ?? filteredItems}
			grid={grid}
			inline={inline}
			isItemEqualToValue={isItemEqualToValue}
			itemToStringLabel={defaultItemToStringLabel}
			itemToStringValue={itemToStringValue}
			items={displayItems}
			limit={limit}
			locale={locale}
			modal={modal}
			multiple={multiple}
			onItemHighlighted={onItemHighlighted}
			onOpenChangeComplete={onOpenChangeComplete}
			virtualized={virtualized}
			disabled={disabled}
			readOnly={readOnly}
			required={required}
			inputRef={inputRef}
			{...comboboxProps}>
			<FormField {...props}>
				<Field.Control
					render={
						<Combobox.Control
							ref={controlProps?.ref ?? containerRef}
							appearance={'ghost'}
							{...controlProps}
							className={cn(multiple && 'h-auto min-h-9 flex-wrap py-1.5 whitespace-normal', controlProps?.className)}
							render={
								<Combobox.Trigger
									{...triggerProps}
									className={cn('flex grow items-center gap-1', multiple && 'flex-wrap', triggerProps?.className)}>
									<Combobox.Value>
										{(selectedValue) => {
											return (
												<>
													{multiple ? (
														Array.isArray(selectedValue) && selectedValue.length > 0 ? (
															multipleValueMode === 'chips' ? (
																<Combobox.Chips
																	values={selectedValue}
																	renderLabel={(val) => renderValue?.(val as ITEM) ?? (val as ITEM).label}
																	{...chipsProps}
																	className={cn('grow', chipsProps?.className)}
																/>
															) : multipleValueMode === 'comma' ? (
																<div className="grow text-sm flex flex-wrap items-center gap-1">
																	{selectedValue.map((item: ITEM, i) => (
																		<div
																			key={item[valueKey] as string}
																			className="flex items-center">
																			{renderValue?.(item) ?? item.label}
																			{i < selectedValue.length - 1 ? ',' : ''}
																		</div>
																	))}
																</div>
															) : (
																/* more mode */
																<div className="grow text-sm flex flex-wrap items-center gap-1">
																	{selectedValue.slice(0, multipleValueLimit).map((item: ITEM, i) => (
																		<div
																			key={item[valueKey] as string}
																			className="flex items-center">
																			{renderValue?.(item) ?? item.label}
																			{i < Math.min(selectedValue.length, multipleValueLimit) - 1 ? ',' : ''}
																		</div>
																	))}
																	{selectedValue.length > multipleValueLimit && (
																		<span className="whitespace-nowrap font-semibold">(+{selectedValue.length - multipleValueLimit} more)</span>
																	)}
																</div>
															)
														) : (
															<Combobox.Placeholder
																{...placeholderProps}
																className={cn('grow', placeholderProps?.className)}>
																{placeholder ?? 'Select value'}
															</Combobox.Placeholder>
														)
													) : selectedValue ? (
														renderValue ? (
															renderValue(selectedValue as ITEM)
														) : (
															renderComboboxItem(selectedValue as ITEM)
														)
													) : (
														<Combobox.Placeholder
															{...placeholderProps}
															className={cn('grow', placeholderProps?.className)}>
															{placeholder ?? 'Select value'}
														</Combobox.Placeholder>
													)}
													<Combobox.ActionWrapper className={'relative top-0 ring-0 left-0 bottom-0 translate-0'}>
														{clearable && <Combobox.Clear {...clearProps} />}
													</Combobox.ActionWrapper>
												</>
											);
										}}
									</Combobox.Value>
								</Combobox.Trigger>
							}
						/>
					}
					{...filedControlProps}
				/>
			</FormField>
			<Combobox.Content
				disableAnchorTracking={disableAnchorTracking}
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				arrowPadding={arrowPadding}
				// @ts-ignore
				anchor={anchor || controlProps?.ref || containerRef}
				collisionAvoidance={collisionAvoidance}
				collisionBoundary={collisionBoundary}
				collisionPadding={collisionPadding}
				sticky={sticky}
				positionMethod={positionMethod}
				renderAtTop={() => (
					<div className={' bg-background z-1 pb-1 pt-2 px-2 w-full flex items-center gap-2'}>
						<Combobox.Input
							placeholder={searchPlaceholder ?? 'Type to search...'}
							className={'bg-muted px-2 rounded-sm h-9 border w-full'}
							{...inputProps}
						/>
						{loading && <Spinner />}
					</div>
				)}
				{...contentProps}>
				{(() => {
					const activeList = (defaultFilteredItems ?? filteredItems) as ITEM[];
					if (!activeList) {
						return (item: ITEM, i: number) => {
							const itemElement = renderItem?.(item, i) ?? (
								<Combobox.Item
									disabled={item.disabled}
									key={item._id as string}
									value={item}
									{...itemProps}>
									{renderComboboxItem(item)}
								</Combobox.Item>
							);
							// Since we don't have the active list, we can't reliably show groups here.
							// But we should at least ensure that if we do show a label, it's wrapped in a Group.
							// This is a fallback for custom filter functions.
							if (item.group) {
								return (
									<Combobox.Group key={`group-${item.group}-${item._id as string}`}>
										<Combobox.GroupLabel>{item.group}</Combobox.GroupLabel>
										{itemElement}
									</Combobox.Group>
								);
							}
							return itemElement;
						};
					}

					const grouped: { groupName?: string; items: { item: ITEM; index: number }[] }[] = [];
					activeList.forEach((item, index) => {
						const groupName = item.group || '';
						const lastGroup = grouped[grouped.length - 1];
						if (lastGroup && (lastGroup.groupName || '') === groupName) {
							lastGroup.items.push({ item, index });
						} else {
							grouped.push({ groupName: item.group, items: [{ item, index }] });
						}
					});

					return grouped.map((group, groupIdx) => {
						const groupContent = group.items.map(({ item, index }) => {
							const itemElement = renderItem?.(item, index) ?? (
								<Combobox.Item
									disabled={item.disabled}
									key={item._id as string}
									value={item}
									{...itemProps}>
									{renderComboboxItem(item)}
								</Combobox.Item>
							);
							return itemElement;
						});

						if (group.groupName) {
							return (
								<React.Fragment key={`group-${group.groupName}`}>
									{groupIdx > 0 && <Combobox.Separator />}
									<Combobox.Group>
										<Combobox.GroupLabel>{group.groupName}</Combobox.GroupLabel>
										{groupContent}
									</Combobox.Group>
								</React.Fragment>
							);
						}

						return <React.Fragment key="no-group">{groupContent}</React.Fragment>;
					});
				})()}
			</Combobox.Content>
		</Combobox>
	);
};
