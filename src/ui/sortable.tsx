'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { mergeProps, useRender } from '@base-ui/react';
import {
	defaultDropAnimation,
	defaultDropAnimationSideEffects,
	DndContext,
	DragEndEvent,
	type DraggableAttributes,
	type DraggableSyntheticListeners,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	DropAnimation,
	KeyboardSensor,
	PointerSensor,
	UniqueIdentifier,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	rectSortingStrategy,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface KanbanContextProps<T> {
	columns: Record<string, T[]>;
	setColumns: (columns: Record<string, T[]>) => void;
	getItemId: (item: T) => string;
	columnIds: string[];
	activeId: UniqueIdentifier | null;
	setActiveId: (id: UniqueIdentifier | null) => void;
	findContainer: (id: UniqueIdentifier) => string | undefined;
	isColumn: (id: UniqueIdentifier) => boolean;
}

const KanbanContext = React.createContext<KanbanContextProps<any>>({
	columns: {},
	setColumns: () => {
		/* empty */
	},
	getItemId: () => '',
	columnIds: [],
	activeId: null,
	setActiveId: () => {
		/* empty */
	},
	findContainer: () => undefined,
	isColumn: () => false,
});

const ColumnContext = React.createContext<{
	attributes: DraggableAttributes;
	listeners: DraggableSyntheticListeners | undefined;
	isDragging?: boolean;
	disabled?: boolean;
}>({
	attributes: {} as DraggableAttributes,
	listeners: undefined,
	isDragging: false,
	disabled: false,
});

const ItemContext = React.createContext<{
	listeners: DraggableSyntheticListeners | undefined;
	isDragging?: boolean;
	disabled?: boolean;
}>({
	listeners: undefined,
	isDragging: false,
	disabled: false,
});

const dropAnimationConfig: DropAnimation = {
	...defaultDropAnimation,
	sideEffects: defaultDropAnimationSideEffects({
		styles: {
			active: {
				opacity: '0.4',
			},
		},
	}),
};

export interface KanbanMoveEvent {
	event: DragEndEvent;
	activeContainer: string;
	activeIndex: number;
	overContainer: string;
	overIndex: number;
}

export type KanbanRootProps<T> = useRender.ComponentProps<'div'> & {
	value: Record<string, T[]>;
	onValueChange: (value: Record<string, T[]>) => void;
	getItemValue: (item: T) => string;
	onMove?: (event: KanbanMoveEvent) => void;
};

function Kanban<T>({ value, onValueChange, getItemValue, children, className, onMove, render, ...props }: KanbanRootProps<T>) {
	const columns = value;
	const setColumns = onValueChange;
	const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const columnIds = React.useMemo(() => Object.keys(columns), [columns]);

	const isColumn = React.useCallback((id: UniqueIdentifier) => columnIds.includes(id as string), [columnIds]);

	const findContainer = React.useCallback(
		(id: UniqueIdentifier) => {
			if (isColumn(id)) return id as string;
			return columnIds.find((key) => columns[key].some((item) => getItemValue(item) === id));
		},
		[columns, columnIds, getItemValue, isColumn],
	);

	const handleDragStart = React.useCallback((event: DragStartEvent) => {
		setActiveId(event.active.id);
	}, []);

	const handleDragOver = React.useCallback(
		(event: DragOverEvent) => {
			if (onMove) {
				return;
			}

			const { active, over } = event;
			if (!over) return;

			if (isColumn(active.id)) return;

			const activeContainer = findContainer(active.id);
			const overContainer = findContainer(over.id);

			// Only handle moving items between different columns
			if (!activeContainer || !overContainer || activeContainer === overContainer) {
				return;
			}

			const activeItems = columns[activeContainer];
			const overItems = columns[overContainer];

			const activeIndex = activeItems.findIndex((item: T) => getItemValue(item) === active.id);
			let overIndex = overItems.findIndex((item: T) => getItemValue(item) === over.id);

			// If dropping on the column itself, not an item
			if (isColumn(over.id)) {
				overIndex = overItems.length;
			}

			const newOverItems = [...overItems];
			const [movedItem] = activeItems.splice(activeIndex, 1);
			newOverItems.splice(overIndex, 0, movedItem);

			setColumns({
				...columns,
				[activeContainer]: [...activeItems],
				[overContainer]: newOverItems,
			});
		},
		[findContainer, getItemValue, isColumn, setColumns, columns, onMove],
	);

	const handleDragEnd = React.useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;
			setActiveId(null);

			if (!over) return;

			// Handle item move callback
			if (onMove && !isColumn(active.id)) {
				const activeContainer = findContainer(active.id);
				const overContainer = findContainer(over.id);

				if (activeContainer && overContainer) {
					const activeIndex = columns[activeContainer].findIndex((item: T) => getItemValue(item) === active.id);
					const overIndex = isColumn(over.id)
						? columns[overContainer].length
						: columns[overContainer].findIndex((item: T) => getItemValue(item) === over.id);

					onMove({
						event,
						activeContainer,
						activeIndex,
						overContainer,
						overIndex,
					});
				}
				return;
			}

			// Handle column reordering
			if (isColumn(active.id) && isColumn(over.id)) {
				const activeIndex = columnIds.indexOf(active.id as string);
				const overIndex = columnIds.indexOf(over.id as string);
				if (activeIndex !== overIndex) {
					const newOrder = arrayMove(Object.keys(columns), activeIndex, overIndex);
					const newColumns: Record<string, T[]> = {};
					newOrder.forEach((key) => {
						newColumns[key] = columns[key];
					});
					setColumns(newColumns);
				}
				return;
			}

			const activeContainer = findContainer(active.id);
			const overContainer = findContainer(over.id);

			// Handle item reordering within the same column
			if (activeContainer && overContainer && activeContainer === overContainer) {
				const container = activeContainer;
				const activeIndex = columns[container].findIndex((item: T) => getItemValue(item) === active.id);
				const overIndex = columns[container].findIndex((item: T) => getItemValue(item) === over.id);

				if (activeIndex !== overIndex) {
					setColumns({
						...columns,
						[container]: arrayMove(columns[container], activeIndex, overIndex),
					});
				}
			}
		},
		[columnIds, columns, findContainer, getItemValue, isColumn, setColumns, onMove],
	);

	const contextValue = React.useMemo(
		() => ({
			columns,
			setColumns,
			getItemId: getItemValue,
			columnIds,
			activeId,
			setActiveId,
			findContainer,
			isColumn,
		}),
		[columns, setColumns, getItemValue, columnIds, activeId, findContainer, isColumn],
	);

	return (
		<KanbanContext.Provider value={contextValue}>
			<DndContext
				sensors={sensors}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}>
				{useRender({
					defaultTagName: 'div',
					render,
					props: {
						'data-slot': 'kanban',
						'data-dragging': activeId !== null,
						className: cn(className),
						children,
						...props,
					},
				})}
			</DndContext>
		</KanbanContext.Provider>
	);
}

export type KanbanBoardProps = useRender.ComponentProps<'div'> & {};

function KanbanBoard({ children, className, render, ...props }: KanbanBoardProps) {
	const { columnIds } = React.useContext(KanbanContext);

	return (
		<SortableContext
			items={columnIds}
			strategy={rectSortingStrategy}>
			{useRender({
				defaultTagName: 'div',
				render,
				props: {
					'data-slot': 'kanban-board',
					className: cn('grid auto-rows-fr sm:grid-cols-3 gap-4', className),
					children,
					...props,
				},
			})}
		</SortableContext>
	);
}

export type KanbanColumnProps = useRender.ComponentProps<'div'> & {
	value: string;
	disabled?: boolean;
};

function KanbanColumn({ value, className, children, disabled, render, ...props }: KanbanColumnProps) {
	const {
		setNodeRef,
		transform,
		transition,
		attributes,
		listeners,
		isDragging: isSortableDragging,
	} = useSortable({
		id: value,
		disabled,
	});

	const { activeId, isColumn } = React.useContext(KanbanContext);
	const isColumnDragging = activeId ? isColumn(activeId) : false;

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	} as React.CSSProperties;

	const mergedProps = mergeProps(
		{
			'data-slot': 'kanban-column',
			'data-value': value,
			'data-dragging': isSortableDragging,
			'data-disabled': disabled,
			ref: setNodeRef,
			style,
			className: cn('group/kanban-column flex flex-col', isSortableDragging && 'opacity-50', disabled && 'opacity-50', className),
			children,
		},
		props,
	);

	return (
		<ColumnContext.Provider value={{ attributes, listeners, isDragging: isColumnDragging, disabled }}>
			{useRender({ defaultTagName: 'div', render, props: mergedProps })}
		</ColumnContext.Provider>
	);
}

export type KanbanColumnHandleProps = useRender.ComponentProps<'div'> & {
	cursor?: boolean;
};

function KanbanColumnHandle({ render, className, children, cursor = true, ...props }: KanbanColumnHandleProps) {
	const { attributes, listeners, isDragging, disabled } = React.useContext(ColumnContext);

	const mergedProps = mergeProps(
		{
			'data-slot': 'kanban-column-handle',
			'data-dragging': isDragging,
			'data-disabled': disabled,
			className: cn(
				'opacity-0 transition-opacity group-hover/kanban-column:opacity-100',
				cursor && (isDragging ? '!cursor-grabbing' : '!cursor-grab'),
				className,
			),
			children,
		},
		attributes,
		listeners,
		props,
	);

	return useRender({ defaultTagName: 'div', render, props: mergedProps });
}

export type KanbanItemProps = useRender.ComponentProps<'div'> & {
	value: string;
	disabled?: boolean;
};

function KanbanItem({ value, render, className, children, disabled, ...props }: KanbanItemProps) {
	const {
		setNodeRef,
		transform,
		transition,
		attributes,
		listeners,
		isDragging: isSortableDragging,
	} = useSortable({
		id: value,
		disabled,
	});

	const { activeId, isColumn } = React.useContext(KanbanContext);
	const isItemDragging = activeId ? !isColumn(activeId) : false;

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	} as React.CSSProperties;

	const mergedProps = mergeProps(
		{
			'data-slot': 'kanban-item',
			'data-value': value,
			'data-dragging': isSortableDragging,
			'data-disabled': disabled,
			ref: setNodeRef,
			style,
			className: cn(isSortableDragging && 'opacity-50', disabled && 'opacity-50', className),
			children,
		},
		attributes,
		props,
	);

	return (
		<ItemContext.Provider value={{ listeners, isDragging: isItemDragging, disabled }}>
			{useRender({ defaultTagName: 'div', render, props: mergedProps })}
		</ItemContext.Provider>
	);
}

export type KanbanItemHandleProps = useRender.ComponentProps<'div'> & {
	cursor?: boolean;
};

function KanbanItemHandle({ render, className, children, cursor = true, ...props }: KanbanItemHandleProps) {
	const { listeners, isDragging, disabled } = React.useContext(ItemContext);

	const mergedProps = mergeProps(
		{
			'data-slot': 'kanban-item-handle',
			'data-dragging': isDragging,
			'data-disabled': disabled,
			className: cn(cursor && (isDragging ? '!cursor-grabbing' : '!cursor-grab'), className),
			children,
		},
		listeners,
		props,
	);

	return useRender({ defaultTagName: 'div', render, props: mergedProps });
}

export type KanbanColumnContentProps = useRender.ComponentProps<'div'> & {
	value: string;
};

function KanbanColumnContent({ value, className, children, render, ...props }: KanbanColumnContentProps) {
	const { columns, getItemId } = React.useContext(KanbanContext);

	const itemIds = React.useMemo(() => columns[value].map(getItemId), [columns, getItemId, value]);

	return (
		<SortableContext
			items={itemIds}
			strategy={verticalListSortingStrategy}>
			{useRender({
				defaultTagName: 'div',
				render,
				props: {
					'data-slot': 'kanban-column-content',
					className: cn('flex flex-col gap-2', className),
					children,
					...props,
				},
			})}
		</SortableContext>
	);
}

export type KanbanOverlayProps = useRender.ComponentProps<'div'> & {
	children?: React.ReactNode | ((params: { value: UniqueIdentifier; variant: 'column' | 'item' }) => React.ReactNode);
};

function KanbanOverlay({ children, className, render, ...props }: KanbanOverlayProps) {
	const { activeId, isColumn } = React.useContext(KanbanContext);
	const [dimensions, setDimensions] = React.useState<{ width: number; height: number } | null>(null);

	React.useEffect(() => {
		if (activeId) {
			const element = document.querySelector(`[data-slot="kanban-${isColumn(activeId) ? 'column' : 'item'}"][data-value="${activeId}"]`);
			if (element) {
				const rect = element.getBoundingClientRect();
				setDimensions({ width: rect.width, height: rect.height });
			}
		} else {
			setDimensions(null);
		}
	}, [activeId]);

	const style = {
		width: dimensions?.width,
		height: dimensions?.height,
	} as React.CSSProperties;

	const content = React.useMemo(() => {
		if (!activeId) return null;
		if (typeof children === 'function') {
			return children({
				value: activeId,
				variant: isColumn(activeId) ? 'column' : 'item',
			});
		}
		return children;
	}, [activeId, children, isColumn]);

	return (
		<DragOverlay dropAnimation={dropAnimationConfig}>
			{useRender({
				defaultTagName: 'div',
				render,
				props: {
					'data-slot': 'kanban-overlay',
					'data-dragging': true,
					style,
					className: cn('pointer-events-none', className, activeId ? '!cursor-grabbing' : ''),
					children: content,
					...props,
				},
			})}
		</DragOverlay>
	);
}

// Sortable Item Context
const SortableItemContext = React.createContext<{
	listeners: DraggableSyntheticListeners | undefined;
	isDragging?: boolean;
	disabled?: boolean;
}>({
	listeners: undefined,
	isDragging: false,
	disabled: false,
});

// Multipurpose Sortable Component
export type SortableRootProps<T> = useRender.ComponentProps<'div'> & {
	value: T[];
	onValueChange: (value: T[]) => void;
	getItemValue: (item: T) => string;
	onMove?: (event: { event: DragEndEvent; activeIndex: number; overIndex: number }) => void;
	strategy?: 'horizontal' | 'vertical' | 'grid';
	onDragStart?: (event: DragStartEvent) => void;
	onDragEnd?: (event: DragEndEvent) => void;
};

function Sortable<T>({
	value,
	onValueChange,
	getItemValue,
	children,
	className,
	onMove,
	strategy = 'vertical',
	onDragStart,
	onDragEnd,
	render,
	...props
}: SortableRootProps<T>) {
	const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragStart = React.useCallback(
		(event: DragStartEvent) => {
			setActiveId(event.active.id);
			onDragStart?.(event);
		},
		[onDragStart],
	);

	const handleDragEnd = React.useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;
			setActiveId(null);
			onDragEnd?.(event);

			if (!over) return;

			// Handle item reordering
			const activeIndex = value.findIndex((item: T) => getItemValue(item) === active.id);
			const overIndex = value.findIndex((item: T) => getItemValue(item) === over.id);

			if (activeIndex !== overIndex) {
				if (onMove) {
					onMove({ event, activeIndex, overIndex });
				} else {
					const newValue = arrayMove(value, activeIndex, overIndex);
					onValueChange(newValue);
				}
			}
		},
		[value, getItemValue, onValueChange, onMove, onDragEnd],
	);

	const getStrategy = () => {
		switch (strategy) {
			case 'horizontal':
				return rectSortingStrategy;
			case 'grid':
				return rectSortingStrategy;
			case 'vertical':
			default:
				return verticalListSortingStrategy;
		}
	};

	const itemIds = React.useMemo(() => value.map(getItemValue), [value, getItemValue]);

	return (
		<DndContext
			sensors={sensors}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}>
			<SortableContext
				items={itemIds}
				strategy={getStrategy()}>
				{useRender({
					defaultTagName: 'div',
					render,
					props: {
						'data-slot': 'sortable',
						'data-dragging': activeId !== null,
						className: cn(className),
						children,
						...props,
					},
				})}
			</SortableContext>

			<DragOverlay>
				{activeId ? (
					<div className="z-50">
						{React.Children.map(children, (child) => {
							if (React.isValidElement(child) && (child.props as any).value === activeId) {
								return React.cloneElement(child as React.ReactElement<any>, {
									...(child.props as any),
									className: cn((child.props as any).className, 'z-50 shadow-lg'),
								});
							}
							return null;
						})}
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
}

export type SortableItemProps = useRender.ComponentProps<'div'> & {
	value: string;
	disabled?: boolean;
};

function SortableItem({ value, render, className, children, disabled, ...props }: SortableItemProps) {
	const {
		setNodeRef,
		transform,
		transition,
		attributes,
		listeners,
		isDragging: isSortableDragging,
	} = useSortable({
		id: value,
		disabled,
	});

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	} as React.CSSProperties;

	const mergedProps = mergeProps(
		{
			'data-slot': 'sortable-item',
			'data-value': value,
			'data-dragging': isSortableDragging,
			'data-disabled': disabled,
			ref: setNodeRef,
			style,
			className: cn(isSortableDragging && 'opacity-50 z-50', disabled && 'opacity-50', className),
			...attributes,
			children,
		},
		props,
	);

	return (
		<SortableItemContext.Provider value={{ listeners, isDragging: isSortableDragging, disabled }}>
			{useRender({ defaultTagName: 'div', render, props: mergedProps })}
		</SortableItemContext.Provider>
	);
}

export type SortableItemHandleProps = {
	cursor?: boolean;
} & useRender.ComponentProps<'div'>;

function SortableItemHandle({ render, className, children, cursor = true, ...props }: SortableItemHandleProps) {
	const { listeners, isDragging, disabled } = React.useContext(SortableItemContext);

	const mergedProps = mergeProps(
		{
			'data-slot': 'sortable-item-handle',
			'data-dragging': isDragging,
			'data-disabled': disabled,
			className: cn(cursor && (isDragging ? '!cursor-grabbing' : '!cursor-grab'), className),
			children,
		},
		listeners,
		props,
	);

	return useRender({ defaultTagName: 'div', render, props: mergedProps });
}

// Compound exports
type CompoundKanban = typeof Kanban & {
	Board: typeof KanbanBoard;
	Column: typeof KanbanColumn;
	ColumnHandle: typeof KanbanColumnHandle;
	ColumnContent: typeof KanbanColumnContent;
	Item: typeof KanbanItem;
	ItemHandle: typeof KanbanItemHandle;
	Overlay: typeof KanbanOverlay;
};
const KanbanComponent = Kanban as CompoundKanban;
KanbanComponent.Board = KanbanBoard;
KanbanComponent.Column = KanbanColumn;
KanbanComponent.ColumnHandle = KanbanColumnHandle;
KanbanComponent.ColumnContent = KanbanColumnContent;
KanbanComponent.Item = KanbanItem;
KanbanComponent.ItemHandle = KanbanItemHandle;
KanbanComponent.Overlay = KanbanOverlay;

type CompoundSortable = typeof Sortable & {
	Item: typeof SortableItem;
	ItemHandle: typeof SortableItemHandle;
};
const SortableComponent = Sortable as CompoundSortable;
SortableComponent.Item = SortableItem;
SortableComponent.ItemHandle = SortableItemHandle;

export {
	KanbanComponent as Kanban,
	KanbanBoard,
	KanbanColumn,
	KanbanColumnHandle,
	KanbanItem,
	KanbanItemHandle,
	KanbanColumnContent,
	KanbanOverlay,
	SortableComponent as Sortable,
	SortableItem,
	SortableItemHandle,
};
