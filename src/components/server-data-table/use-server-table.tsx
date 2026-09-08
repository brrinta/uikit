import { IconDotsVertical } from '@tabler/icons-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import type { ColumnVisibilityState, PaginationState, RowData } from '@tanstack/react-table';
import { uniqBy } from 'lodash-es';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import { type AppColumnMeta, createAppColumnHelper, useAppTable } from './app-table';
import { UseServerTableOptions } from './types';
import { useConfirmationDialog } from '../popups/confirmation-popup';
import { DatatableQuery, SortDirection } from '../../schema';
import { useSetState } from '../../hooks/use-set-state';
import { createFilter, Filter, toFilterObject } from '../../ui/filters';
import { useDebounce } from '../../hooks/use-debounce';
import { Button, ButtonGroup } from '../../ui/button';
import { DropdownMenu } from '../../ui/dropdown-menu';

export function useServerTable<TData extends RowData>({
	key,
	columns: initialColumns,
	fetcher,
	initialSort,
	pageSize = 10,
	additionalColumns,
	debounce = 1.5,
	filterInputGrow,
	filter: filterOptions,
	initialFilters = [],
	sortOptions,
	tabs,
	rowAction,
	withoutSearchQuery,
}: UseServerTableOptions<TData>) {
	const confirmationDialog = useConfirmationDialog();
	const columnHelper = createAppColumnHelper<TData>();
	const initialVisibility = useMemo(
		() =>
			initialColumns.reduce((acc, col) => {
				const colId = col.id ?? (col as any).accessorKey;
				if (colId) acc[colId] = !(col.meta as AppColumnMeta)?.hide;
				return acc;
			}, {} as ColumnVisibilityState),
		[initialColumns],
	);
	const [rowSelection, setRowSelection] = useState({});
	const selected = useMemo(() => Object.values(rowSelection).filter((v) => v).length, [rowSelection]);
	const [sort, setSort] = useSetState(initialSort ?? { dir: SortDirection.DESC, field: 'createdAt' });
	const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>(initialVisibility);
	const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize });
	const { currentRoute, searchQuery } = useRouterState({
		select: (r) => ({ currentRoute: r.location.pathname, searchQuery: r.location.search as Record<string, any> }),
	});
	const [filter, setFilter] = useState<Filter[]>(
		uniqBy(
			[
				...initialFilters,
				...Object.keys(searchQuery).map((key) =>
					createFilter(key, filterOptions.find((f) => f.key == key)?.defaultOperator ?? 'is', searchQuery[key], 'text'),
				),
			],
			'field',
		),
	);
	const debouncedFilter = useDebounce(filter, (debounce || 1) * 1000);
	const [calculatedFilter, setCalculatedFilter] = useState(toFilterObject(debouncedFilter));
	const navigate = useNavigate({ from: currentRoute as any });

	const columns = useMemo(() => {
		return [
			...initialColumns,
			...(rowAction?.enabled
				? [
						columnHelper.display({
							id: 'actions',
							cell: ({ row, table }) => (
								<ButtonGroup {...(rowAction?.wrapperProps || {})}>
									{rowAction?.leftSection?.({
										table,
										row,
										confirmationPending: confirmationDialog.confirmationPending,
										confirmationIsOpened: confirmationDialog.confirmationIsOpened,
										showConfirmation: confirmationDialog.showConfirmation,
									})}
									{rowAction?.items !== undefined && (
										<DropdownMenu {...(rowAction?.menuProps || {})}>
											<DropdownMenu.Trigger
												render={
													<Button
														mode={'icon'}
														variant={'ghost'}
														color={'secondary'}
														children={<IconDotsVertical />}
														{...(rowAction?.actionIconProps || {})}
													/>
												}
											/>
											<DropdownMenu.Content
												side={'left'}
												align={'start'}>
												{rowAction?.items?.({
													table,
													row,
													confirmationPending: confirmationDialog.confirmationPending,
													confirmationIsOpened: confirmationDialog.confirmationIsOpened,
													showConfirmation: confirmationDialog.showConfirmation,
												})}
											</DropdownMenu.Content>
										</DropdownMenu>
									)}
									{rowAction?.rightSection?.({
										table,
										row,
										confirmationPending: confirmationDialog.confirmationPending,
										confirmationIsOpened: confirmationDialog.confirmationIsOpened,
										showConfirmation: confirmationDialog.showConfirmation,
									})}
								</ButtonGroup>
							),
						}),
					]
				: []),
		];
	}, [initialColumns, rowAction]);

	const dataQuery = useQuery({
		queryKey: [key, 'table', calculatedFilter, sort, pagination],
		queryFn: () =>
			fetcher({
				columns: additionalColumns,
				filter: calculatedFilter,
				sort: sort ?? { dir: SortDirection.DESC, field: 'createdAt' },
				currentPage: pagination.pageIndex + 1,
				pageSize: pagination.pageSize,
			} as DatatableQuery),
		placeholderData: keepPreviousData,
	});

	console.log(dataQuery.data?.body);

	const table = useAppTable<TData>({
		key,
		columns,
		data: dataQuery.data?.body?.rows || [],
		rowCount: dataQuery.data?.body?.total || 0,
		state: { columnVisibility, pagination, rowSelection },
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		onRowSelectionChange: setRowSelection,
		manualPagination: true,
	});
	useEffect(() => {
		if (withoutSearchQuery) return;
		// console.log(calculatedFilter);
		navigate({ search: calculatedFilter as any });
	}, [calculatedFilter, withoutSearchQuery]);
	return {
		table,
		dataQuery,
		confirmationDialog,
		filterInputGrow,
		filter,
		sortOptions,
		tabs,
		pagination,
		setPagination,
		sort,
		setSort,
		selected,
		setFilter,
		filterOptions,
		calculatedFilter,
		setCalculatedFilter,
	};
}

export type ServerTableContextValue<TData extends RowData> = ReturnType<typeof useServerTable<TData>>;

export const ServerTableContext = React.createContext<ServerTableContextValue<any> | null>(null);

export function useServerTableContext<TData extends RowData>() {
	const context = React.useContext(ServerTableContext);
	if (!context) {
		throw new Error('useServerTableContext must be used within a ServerTableProvider');
	}
	return context as ServerTableContextValue<TData>;
}

export function ServerTableProvider<TData extends RowData>({
	value,
	children,
}: {
	value: ServerTableContextValue<TData>;
	children: React.ReactNode;
}) {
	return <ServerTableContext.Provider value={value}>{children}</ServerTableContext.Provider>;
}
