import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	PaginationState,
	Row,
	Table as CreateTableType,
	TableOptions,
	useReactTable,
} from '@tanstack/react-table';
import { AxiosDefaults, AxiosRequestConfig } from 'axios';
import * as React from 'react';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { DatatableResponse, ResponseInterface, SortDirection } from '../../schema';
import { keepPreviousData, QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import { DatatableOptions, SortType } from './types';
import { IconAlertTriangle, IconDotsVertical, IconReload } from '@tabler/icons-react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Button, ButtonGroup, ButtonGroupProps, ButtonProps } from '../../ui/button';
import { Card, CardProps } from '../../ui/card';
import { TableFooterSkeleton } from './table-footer-skeleton';
import { FilterIcon } from 'lucide-react';
import { TableSort } from './table-sort';
import { useConfirmationDialog, UseConfirmationDialogReturn } from '../popups/confirmation-popup';
import { useDebounce } from '../../hooks/use-debounce';
import { useIsMobile } from '../../hooks/use-mobile';
import { useSetState } from '../../hooks/use-set-state';
import { axiosApiInstance, mitter } from '../../lib/connectivity';
import { cn } from '../../lib/utils';
import { createFilter, Filter, Filters, toFilterObject } from '../../ui/filters';
import { DropdownMenu, DropdownMenuProps } from '../../ui/dropdown-menu';
import { ContainerProps } from '../../ui/container';
import { Checkbox } from '../../ui/checkbox';
import { Table, TableProps, TableTbodyProps, TableTfootProps, TableTheadProps } from '../../ui/table';
import { Box, BoxProps } from '../../ui/box';
import { Progress } from '../../ui/progress';
import { Tabs } from '../../ui/tabs';
import { Flex } from '../../ui/flex';
import { Skeleton } from '../../ui/skeleton';
import { Title } from '../../ui/title';
import { Stack } from '../../ui/stack';
import { Text } from '../../ui/text';
import { Group } from '../../ui/group';
import { Select } from '../../ui/select';
import { Pagination } from '../../ui/pagination';
import { Tooltip } from '../../ui/tooltip';
import { uniqBy } from 'lodash-es';

type RowSectionProps<TData extends Record<string, unknown>> = {
	table: CreateTableType<TData>;
	response?: DatatableResponse<TData>;
	refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<ResponseInterface<DatatableResponse<TData>>, unknown>>;
	row: Row<TData>;
	loading?: boolean;
	filter?: Array<Filter>;
} & UseConfirmationDialogReturn;

type SectionProps<TData extends Record<string, unknown>> = {
	table: CreateTableType<TData>;
	response?: DatatableResponse<TData>;
	refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<ResponseInterface<DatatableResponse<TData>>, unknown>>;
	filter?: Array<Filter>;
} & UseConfirmationDialogReturn;
type RowActionType<TData extends Record<string, unknown>> = {
	enabled: boolean;
	items?: (sectionProps: RowSectionProps<TData>) => ReactNode;
	column?: Omit<ColumnDef<TData>, 'id'>;
	menuProps?: DropdownMenuProps;
	actionIconProps?: ButtonProps;
	wrapperProps?: ButtonGroupProps;
	leftSection?: (sectionProps: RowSectionProps<TData>) => ReactNode;
	rightSection?: (sectionProps: RowSectionProps<TData>) => ReactNode;
};

export type DataTableProps<TData extends Record<string, unknown>, TFilter extends Record<string, unknown> = Record<string, unknown>> = {
	columns: Array<ColumnDef<TData>>;
	fetchConfig: AxiosRequestConfig & { default: AxiosDefaults; url: string; method: AxiosRequestConfig['method'] };
	options: DatatableOptions<TData, TFilter>;
	reloadListeners?: Array<string>;
	primaryKey?: string;
	/**
	 * Initial filters to apply to the table
	 * Can be used to pre-apply filters to the table use filter props or directly in the search query
	 */
	filter?: Array<Filter>;
	onFilterChange?: (filer: TFilter, rawFilter: Array<Filter>) => void;
	setTable?: (table: CreateTableType<TData>) => void;
	tableOptions?: Omit<TableOptions<TData>, 'data' | 'columns' | 'getCoreRowModel'>;
	rootTop?: (props: SectionProps<TData>) => ReactNode;
	tableHeader?: {
		rightSection?: (props: SectionProps<TData>) => ReactNode;
		centerSection?: (sectionProps: SectionProps<TData>) => ReactNode;
		leftSection?: (sectionProps: SectionProps<TData>) => ReactNode;
		hideRefetchButton?: boolean;
		refetchButtonProps?: ButtonProps;
	};
	enableBodyBottom?: boolean;
	tableFooter?: {
		rightMostSection?: (props: SectionProps<TData>) => ReactNode;
		rightSection?: (props: SectionProps<TData>) => ReactNode;
		centerSection?: (sectionProps: SectionProps<TData>) => ReactNode;
		leftMostSection?: (sectionProps: SectionProps<TData>) => ReactNode;
		leftSection?: (sectionProps: SectionProps<TData>) => ReactNode;
		plain?: boolean;
	};

	containerProps?: Omit<ContainerProps, 'children' | 'className'>;
	classNames?: {
		container?: string;
		headerSection?: string;
		header?: string;
		progress?: string;
		body?: string;
		footerSection?: string;
		footer?: string;
	};

	withoutSearchQuery?: boolean;

	rowAction?: RowActionType<TData>;

	tableProps?: {
		table?: TableProps;
		tbody?: TableTbodyProps;
		thead?: TableTheadProps;
		tfoot?: TableTfootProps;
	};

	card?: {
		enabled: boolean;
		cardRenderItem?: (sectionProps: RowSectionProps<TData>) => ReactNode;
		wrapperProps?: BoxProps;
		itemsProps?: CardProps;
	};
};

export function DataTable<TData extends Record<string, unknown>, TFilter extends Record<string, unknown>>({
	reloadListeners,
	fetchConfig: { default: reqDefaults, ...fetchConfig },
	rootTop,
	primaryKey = '_id',
	setTable,
	tableOptions,
	tableHeader,
	tableFooter,
	classNames,
	containerProps,
	rowAction,
	tableProps,
	card,
	options,
	enableBodyBottom,
	onFilterChange,
	withoutSearchQuery,
	filter: initFilters = [],
	columns: initColumns,
}: DataTableProps<TData, TFilter>) {
	const confirmationDialog = useConfirmationDialog();
	const { currentRoute, searchQuery } = useRouterState({
		select: (r) => ({ currentRoute: r.location.pathname, searchQuery: r.location.search as Record<string, any> }),
	});
	const [filter, setFilter] = useState<Filter[]>(
		uniqBy(
			[
				...initFilters,
				...Object.keys(searchQuery).map((key) =>
					createFilter(key, options.filter.find((f) => f.key == key)?.defaultOperator ?? 'is', searchQuery[key], 'text'),
				),
			],
			'field',
		),
	);
	const isMobile = useIsMobile();
	const [rowSelection, setRowSelection] = useState({});
	const debouncedFilter = useDebounce(filter, (options.debounce || 1) * 1000);
	const [calculatedFilter, setCalculatedFilter] = useState(toFilterObject(debouncedFilter));
	// @ts-ignore
	const navigate = useNavigate({ from: currentRoute });
	const [sort, setSort] = useSetState<SortType>(options.sort);

	const columns = useMemo(() => {
		const selectColumn: ColumnDef<TData> = {
			meta: { style: { width: 50 } },
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllRowsSelected()}
					// indeterminate={table.getIsSomeRowsSelected()}
					onCheckedChange={table.getToggleAllRowsSelectedHandler()}
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					disabled={!row.getCanSelect()}
					onCheckedChange={row.getToggleSelectedHandler()}
				/>
			),
		};
		const actionColumn = (ra: RowActionType<TData>) =>
			({
				meta: { style: { padding: 0, minWidth: '40px' } },
				id: 'actions',
				cell: ({ row, table }) => (
					<ButtonGroup {...(ra?.wrapperProps || {})}>
						{ra.leftSection?.({
							table,
							row,
							confirmationPending: confirmationDialog.confirmationPending,
							confirmationIsOpened: confirmationDialog.confirmationIsOpened,
							showConfirmation: confirmationDialog.showConfirmation,
						})}
						{ra.items !== undefined && (
							<DropdownMenu {...(ra?.menuProps || {})}>
								<DropdownMenu.Trigger
									render={
										<Button
											mode={'icon'}
											variant={'ghost'}
											color={'secondary'}
											children={<IconDotsVertical />}
											{...(ra?.actionIconProps || {})}
										/>
									}
								/>
								<DropdownMenu.Content
									side={'left'}
									align={'start'}>
									{ra.items?.({
										table,
										row,
										confirmationPending: confirmationDialog.confirmationPending,
										confirmationIsOpened: confirmationDialog.confirmationIsOpened,
										showConfirmation: confirmationDialog.showConfirmation,
									})}
								</DropdownMenu.Content>
							</DropdownMenu>
						)}
						{ra.rightSection?.({
							table,
							row,
							confirmationPending: confirmationDialog.confirmationPending,
							confirmationIsOpened: confirmationDialog.confirmationIsOpened,
							showConfirmation: confirmationDialog.showConfirmation,
						})}
					</ButtonGroup>
				),
				header: '',
				...(ra?.column || {}),
			}) as ColumnDef<TData>;
		return [...(tableOptions?.enableRowSelection ? [selectColumn] : []), ...initColumns, ...(rowAction?.enabled ? [actionColumn(rowAction)] : [])];
	}, [initColumns, tableOptions?.enableRowSelection, rowAction]);

	const selected = useMemo(() => Object.values(rowSelection).filter((v) => v).length, [rowSelection]);

	const defaultData = useMemo<TData[]>(() => [], []);

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 1,
		pageSize: options.pageSize || 20,
	});

	const requestConfig = useMemo<AxiosRequestConfig>(() => {
		const data = {
			filter: calculatedFilter,
			currentPage: pagination.pageIndex,
			pageSize: pagination.pageSize,
			sort,
			...(fetchConfig.data || {}),
		};
		return {
			...fetchConfig,
			data: {
				...data,
				columns: Object.assign(
					options.columns || {},
					...columns
						.filter((c): c is ColumnDef<TData> & { accessorKey: string } => 'accessorKey' in c)
						.map((c) => ({ [c.accessorKey]: `$${c.accessorKey}` })),
				),
			},
		};
	}, [calculatedFilter, pagination, sort, fetchConfig, options.columns, columns]);

	useEffect(() => {
		setCalculatedFilter(toFilterObject(debouncedFilter));
	}, [debouncedFilter]);

	const onFilterChangeRef = useRef(onFilterChange);
	const setTableRef = useRef(setTable);

	useEffect(() => {
		onFilterChangeRef.current = onFilterChange;
		setTableRef.current = setTable;
	});

	useEffect(() => {
		// @ts-ignore
		onFilterChangeRef.current?.(calculatedFilter, filter);
	}, [calculatedFilter]);

	useEffect(() => {
		if (withoutSearchQuery) return;
		// console.log(calculatedFilter);
		navigate({ search: calculatedFilter as any });
	}, [calculatedFilter, withoutSearchQuery]);

	const {
		data: response,
		refetch,
		isFetching,
		isLoading,
		isRefetching,
	} = useQuery({
		notifyOnChangeProps: () => 'all',
		queryKey: [`fetchDataTableData-${reqDefaults.baseURL}/${requestConfig.url}`, requestConfig],
		queryFn: () =>
			axiosApiInstance({ ...reqDefaults })
				.request<DatatableResponse<TData>>(requestConfig)
				.catch((err) => {
					if (err?.data?.exp === 'UnauthorizedException' || err?.exp === 'UnauthorizedException') {
						// eslint-disable-next-line no-restricted-globals
						location.reload();
					}
					throw err;
				}),
		select: ({ data }) => data,
		placeholderData: keepPreviousData,
	});

	const table = useReactTable<TData>({
		data: response?.body?.rows ?? defaultData,
		columns,
		rowCount: response?.body?.filtered ?? 0,
		state: {
			pagination,
			rowSelection,
		},
		onRowSelectionChange: setRowSelection,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		getRowId: (row) => row[primaryKey] as string,
		...(tableOptions || {}),
	});
	useEffect(() => {
		setTableRef.current?.(table);
	}, [table]);

	useEffect(() => {
		if (reloadListeners?.length) {
			reloadListeners.forEach((listener) => {
				if (mitter.all.has(listener)) mitter.all.delete(listener);
				mitter.on(listener, () => refetch());
			});
		}
		return () => {
			if (reloadListeners?.length) {
				reloadListeners.forEach((listener) => {
					if (mitter.all.has(listener)) mitter.all.delete(listener);
				});
			}
		};
	}, [reloadListeners]);
	return (
		<Card
			{...containerProps}
			className={cn(
				'app-table relative rounded-md shadow-none outline-0 border-0 bg-muted gap-2 grow flex-col flex items-start',
				classNames?.container,
			)}>
			{rootTop?.({
				table,
				response: response?.body,
				refetch,
				filter,
				confirmationPending: confirmationDialog.confirmationPending,
				confirmationIsOpened: confirmationDialog.confirmationIsOpened,
				showConfirmation: confirmationDialog.showConfirmation,
			})}
			<Card.Header
				className={cn(
					'app-table-header-section order-1 p-0 block border-0 bg-background rounded-md min-h-auto h-fit w-full relative',
					classNames?.headerSection,
				)}>
				<Progress
					striped
					stripeAnimation
					className={cn('bg-transparent absolute px-4 -bottom-1.5 h-1.75 w-full', isFetching ? 'block' : 'hidden', classNames?.progress)}
					value={100}
				/>
				{options.tabs ? (
					<Tabs
						value={calculatedFilter[options.tabs.field] as string}
						onValueChange={(v) => {
							options.tabs?.onChange?.(v);
							setFilter([createFilter(options.tabs?.field as string, 'is', v, 'text')]);
							// @ts-ignore
							setCalculatedFilter({ [options.tabs?.field]: v });
						}}>
						<Tabs.List
							className={cn('w-full bg-transparent gap-0', {
								'px-2': !(tableHeader?.leftSection || options?.filter?.length > 0 || tableHeader?.rightSection || options?.sortOptions?.length),
							})}
							variant={'button'}
							size={'md'}>
							{options.tabs?.options?.map(
								(tab, k) =>
									options.tabs?.renderTab?.(tab) || (
										<Tabs.Tab
											value={tab.value}
											className={cn('grow py-2', options.tabs?.className, tab.className)}
											key={'tab-trigger-' + k}>
											{tab.icon}
											{tab.label}
										</Tabs.Tab>
									),
							)}
						</Tabs.List>
					</Tabs>
				) : null}
				{options?.filter?.length > 0 ? (
					<Flex
						className={cn(
							'pb-2 px-2 gap-2 flex-wrap md:flex-nowrap justify-between items-center app-table-header',
							options.tabs?.options?.length ? 'pt-1' : 'pt-2',
							classNames?.header,
						)}>
						{tableHeader?.leftSection?.({
							table,
							response: response?.body,
							refetch,
							filter,
							confirmationPending: confirmationDialog.confirmationPending,
							confirmationIsOpened: confirmationDialog.confirmationIsOpened,
							showConfirmation: confirmationDialog.showConfirmation,
						})}
						{options?.filter?.length > 0 && (
							<Filters
								addButtonIcon={<FilterIcon className={'text-primary'} />}
								size={'sm'}
								variant={'outline'}
								className={cn('bg-muted rounded-md min-h-9 px-1 items-center flex', {
									grow: options.filterInputGrow !== undefined ? options.filterInputGrow : true,
								})}
								filters={filter}
								fields={options.filter}
								onChange={setFilter}
								withoutOperator
							/>
						)}
						<Flex className={'gap-2'}>
							{tableHeader?.hideRefetchButton || options?.filter?.length < 1 ? null : (
								<Button
									mode={'icon'}
									variant={'outline'}
									color={'accent'}
									onClick={() => refetch()}
									{...(tableHeader?.refetchButtonProps || {})}>
									<IconReload />
								</Button>
							)}
							{(options?.sortOptions?.length || 0) > 0 && (
								<TableSort
									sortBtnProps={options.sortBtnProps}
									sortOptions={options.sortOptions}
									sort={sort as { dir: SortDirection; field: string }}
									setSort={setSort}
								/>
							)}
							{tableHeader?.rightSection?.({
								table,
								response: response?.body,
								refetch,
								filter,
								confirmationPending: confirmationDialog.confirmationPending,
								confirmationIsOpened: confirmationDialog.confirmationIsOpened,
								showConfirmation: confirmationDialog.showConfirmation,
							})}
						</Flex>
					</Flex>
				) : null}
			</Card.Header>
			<Card.Content
				className={cn(
					'app-table-body px-2 py-2 bg-background rounded-md w-full grow flex flex-col',
					{
						'table-body-card order-3': card?.enabled,
						'order-2': !card?.enabled,
					},
					classNames?.body,
				)}>
				{confirmationDialog.ConfirmationDialog}
				<div className={'overflow-auto h-20 size-full grow'}>
					{card?.enabled ? (
						isLoading ? (
							<div className={'w-full'}>
								<Box className={'grid md:grid-cols-3 gap-4 py-2 w-full grow-0'}>
									{Array.from({ length: isMobile ? 3 : 12 }).map((_, i) => (
										<Skeleton
											key={i}
											className={'w-full min-h-48 rounded-sm'}
										/>
									))}
								</Box>
							</div>
						) : table.getRowCount() === 0 ? (
							<div className={'w-full py-2'}>
								<Card className={'w-full col-span-full'}>
									<Stack className={'justify-center items-center py-14 gap-1'}>
										<IconAlertTriangle
											size={48}
											color={'red'}
										/>
										<Title
											order={5}
											className={'text-destructive'}>
											No data found!
										</Title>
										{(response?.body?.total || 0) > 0 ? (
											<Text className={'text-sm text-center text-muted-foreground'}>
												Please apply another filter or search query.
												<br />
												If you think this is an error, please contact support.
											</Text>
										) : null}
									</Stack>
								</Card>
							</div>
						) : card?.cardRenderItem ? (
							card?.cardRenderItem({
								row: undefined as unknown as Row<TData>, // Row is not used in card mode
								table,
								refetch,
								response: response?.body,
								loading: isLoading || isFetching || isRefetching,
								confirmationPending: confirmationDialog.confirmationPending,
								confirmationIsOpened: confirmationDialog.confirmationIsOpened,
								showConfirmation: confirmationDialog.showConfirmation,
							})
						) : (
							<Box
								className={'grid grid-cols-1 sm:grid-cols-2 gap-4 py-2'}
								{...card.wrapperProps}>
								{table.getRowModel().rows.map((row) => (
									<Card
										key={row.id}
										{...card.itemsProps}
										className={cn('flex justify-center items-center hover:!bg-gray-100 dark:hover:!bg-gray-600 p-4', card.itemsProps?.className)}>
										{row.getVisibleCells().map((cell) => {
											return (
												<Flex
													className={'grow gap-1'}
													key={cell.id}
													{...(cell.column.columnDef.meta || {})}>
													{cell.column.columnDef.header && cell.column.columnDef.header !== '' ? (
														<Text className={'font-semibold'}>
															{typeof cell.column.columnDef.header == 'string' ? cell.column.columnDef.header : null}:
														</Text>
													) : null}
													<>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
												</Flex>
											);
										})}
									</Card>
								))}
							</Box>
						)
					) : (
						<Table
							className={'relative rounded-md'}
							{...(tableProps?.table || {})}>
							<Table.Thead
								{...(tableProps?.thead || {})}
								className={'sticky top-0'}>
								{table.getHeaderGroups().map((headerGroup) => (
									<Table.Tr
										key={headerGroup.id}
										className={'sticky top-0 bg-muted [&>th:first-child]:rounded-tl-md [&>th:last-child]:rounded-tr-md hover:bg-muted'}>
										{headerGroup.headers.map((header) => {
											return (
												<Table.Th
													className={'sticky top-0'}
													key={header.id}
													colSpan={header.colSpan}
													{...(header.column.columnDef.meta || {})}>
													{header.isPlaceholder ? null : <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>}
												</Table.Th>
											);
										})}
									</Table.Tr>
								))}
							</Table.Thead>
							<Table.Tbody {...(tableProps?.tbody || {})}>
								{isLoading ? (
									Array.from({ length: 5 }).map((_, i) => (
										<Table.Tr key={i}>
											{table.getAllFlatColumns().map((column) => (
												<Table.Td key={i + column.id}>
													<Skeleton className={'h-4 rounded-xs'} />
												</Table.Td>
											))}
										</Table.Tr>
									))
								) : table.getRowCount() === 0 ? (
									<Table.Tr>
										<Table.Td colSpan={table.getAllFlatColumns().length}>
											<Stack className={'justify-center items-center py-14 gap-1'}>
												<IconAlertTriangle
													size={48}
													color={'red'}
												/>
												<Title
													order={5}
													className={'text-destructive'}>
													No data found!
												</Title>
												{(response?.body?.total || 0) > 0 ? (
													<Text className={'text-sm text-center text-muted-foreground'}>
														Please apply another filter or search query.
														<br />
														If you think this is an error, please contact support.
													</Text>
												) : null}
											</Stack>
										</Table.Td>
									</Table.Tr>
								) : (
									table.getRowModel().rows.map((row) => (
										<Table.Tr key={row.id}>
											{row.getVisibleCells().map((cell) => (
												<Table.Td
													key={cell.id}
													{...(cell.column.columnDef.meta || {})}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</Table.Td>
											))}
										</Table.Tr>
									))
								)}
							</Table.Tbody>
							{enableBodyBottom ? (
								<Table.Tfoot
									{...(tableProps?.tfoot || {})}
									className={'sticky bottom-0'}>
									{table.getFooterGroups().map((footerGroup) => (
										<Table.Tr
											key={footerGroup.id}
											className={'bg-muted [&>th:first-child]:rounded-tl-md [&>th:last-child]:rounded-tr-md sticky bottom-0'}>
											{footerGroup.headers.map((header) => {
												return (
													<Table.Th
														key={header.id}
														colSpan={header.colSpan}
														{...(header.column.columnDef.meta || {})}>
														{header.isPlaceholder ? null : <Box>{flexRender(header.column.columnDef.footer, header.getContext())}</Box>}
													</Table.Th>
												);
											})}
										</Table.Tr>
									))}
								</Table.Tfoot>
							) : null}
						</Table>
					)}
				</div>
			</Card.Content>

			<Card.Footer
				className={cn(
					'app-table-footer-section px-0 block border-0 bg-background rounded-md min-h-auto h-fit',
					{ 'order-2 rounded-b-lg overflow-hidden': card?.enabled, 'order-3': !card?.enabled },
					classNames?.footerSection,
				)}>
				<Group
					className={cn(
						'app-table-footer  px-3 justify-between items-center gap-2',
						{
							'py-3': tableFooter?.plain,
							'py-2': !tableFooter?.plain,
						},
						classNames?.footer,
					)}>
					{isLoading ? (
						<TableFooterSkeleton plain={tableFooter?.plain} />
					) : (
						<>
							{options.filter.length < 1 && (options?.sortOptions?.length || 0) > 0 && (
								<TableSort
									sortBtnProps={options.sortBtnProps}
									sortOptions={options.sortOptions}
									sort={sort as { dir: SortDirection; field: string }}
									setSort={setSort}
								/>
							)}
							{tableFooter?.leftMostSection?.({
								table,
								response: response?.body,
								refetch,
								filter,
								confirmationPending: confirmationDialog.confirmationPending,
								confirmationIsOpened: confirmationDialog.confirmationIsOpened,
								showConfirmation: confirmationDialog.showConfirmation,
							})}
							{tableFooter?.plain ? null : (
								<Select
									value={String(pagination.pageSize)}
									onValueChange={(e) => setPagination((s) => ({ ...s, pageIndex: 1, pageSize: Number(e) }))}>
									<Select.Trigger
										size={'sm'}
										className={'w-24 rounded-md px-2 text-sm'}>
										<Select.Value
											data-placeholder={'Sizes'}
											placeholder={'Sizes'}
										/>
									</Select.Trigger>
									<Select.Content>
										{(
											options.pageSizes || [
												{ value: '10', label: '10' },
												{ value: '25', label: '25' },
												{ value: '50', label: '50' },
												{ value: '100', label: '100' },
												{ value: '200', label: '200' },
												{ value: '0', label: 'All' },
											]
										)?.map((option) => (
											<Select.Item
												key={option.value}
												value={option.value}>
												{option.label}
											</Select.Item>
										))}
									</Select.Content>
								</Select>
							)}
							{tableFooter?.leftSection?.({
								table,
								response: response?.body,
								refetch,
								filter,
								confirmationPending: confirmationDialog.confirmationPending,
								confirmationIsOpened: confirmationDialog.confirmationIsOpened,
								showConfirmation: confirmationDialog.showConfirmation,
							})}
							{tableFooter?.centerSection?.({
								table,
								response: response?.body,
								refetch,
								filter,
								confirmationPending: confirmationDialog.confirmationPending,
								confirmationIsOpened: confirmationDialog.confirmationIsOpened,
								showConfirmation: confirmationDialog.showConfirmation,
							}) || (
								<Flex className={'grow justify-center items-center gap-4 pr-2'}>
									<Text>
										Total {response?.body?.total}
										{response?.body?.filtered !== response?.body?.total && <span className={'ml-3'}>[Filtered {response?.body?.filtered}]</span>}
										{selected > 0 && <span className={'ml-3 text-info'}>[Selected {selected}]</span>}
									</Text>
									<Tooltip content={'Server Consumed ' + response?.timeInSec + ' sec'}>
										<Text className={'text-muted-foreground text-xs'}>Consumed {response?.timeInSec} sec</Text>
									</Tooltip>
								</Flex>
							)}
							{tableFooter?.rightSection?.({
								table,
								response: response?.body,
								refetch,
								filter,
								confirmationPending: confirmationDialog.confirmationPending,
								confirmationIsOpened: confirmationDialog.confirmationIsOpened,
								showConfirmation: confirmationDialog.showConfirmation,
							})}
							{!tableFooter?.plain && pagination.pageSize > 0 && Math.ceil((response?.body?.filtered || 1) / pagination.pageSize) > 1 ? (
								<Pagination
									className={'[&_a]:size-7'}
									totalPage={pagination.pageSize > 0 ? Math.ceil((response?.body?.filtered || 1) / pagination.pageSize) : 1}
									currentPage={pagination.pageIndex}
									onPageChange={(page) => setPagination((s) => ({ ...s, pageIndex: page }))}
								/>
							) : null}
							{tableFooter?.rightMostSection?.({
								table,
								response: response?.body,
								refetch,
								filter,
								confirmationPending: confirmationDialog.confirmationPending,
								confirmationIsOpened: confirmationDialog.confirmationIsOpened,
								showConfirmation: confirmationDialog.showConfirmation,
							})}
						</>
					)}
				</Group>
			</Card.Footer>
		</Card>
	);
}
