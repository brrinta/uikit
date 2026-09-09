import { ServerTableSort } from './server-table-sort';
import type { ServerTableProps } from './types';
import type { ServerTableContextValue } from './use-server-table';
import { ServerTableProvider, useServerTableContext } from './use-server-table';
import type { RowData } from '@tanstack/react-table';
import { FilterIcon, RotateCcw, TriangleAlert } from 'lucide-react';
import * as React from 'react';
import { SortDirection } from '../../schema';
import { Card } from '../../ui/card';
import { useIsMobile } from '../../hooks/use-mobile';
import { cn } from '../../lib/utils';
import { createFilter, Filters } from '../../ui/filters';
import { Tabs } from '../../ui/tabs';
import { Progress } from '../../ui/progress';
import { Flex } from '../../ui/flex';
import { Button } from '../../ui/button';
import { Skeleton } from '../../ui/skeleton';
import { Box } from '../../ui/box';
import { Stack } from '../../ui/stack';
import { Title } from '../../ui/title';
import { Table } from '../../ui/table';
import { Text } from '../../ui/text';
import { Select } from '../../ui/select';
import { Tooltip } from '../../ui/tooltip';
import { Pagination } from '../../ui/pagination';
import { TableFooterSkeleton } from '../DataTable/table-footer-skeleton';
import { Group } from '../../ui/group';

export function ServerDataTable<TData extends RowData>({ table, ...props }: { table: ServerTableContextValue<TData> } & ServerTableProps<TData>) {
	return (
		<ServerTableProvider<TData> value={table}>
			<ServerDataTableConsumer<TData> {...props} />
		</ServerTableProvider>
	);
}

export function ServerDataTableConsumer<TData extends RowData>({
	                                                               containerProps,
	                                                               classNames,
	                                                               rootTop,
	                                                               card,
	                                                               tableFooter,
	                                                               tableProps,
	                                                               tableHeader,
	                                                               searchBtnProps,
	                                                               sortBtnProps,
	                                                               enableBodyBottom,
	                                                               pageSizes,
                                                               }: ServerTableProps<TData>) {
	const isMobile = useIsMobile();
	const {
		table,
		dataQuery,
		confirmationDialog,
		filter,
		filterInputGrow,
		sortOptions,
		tabs,
		pagination,
		setPagination,
		sort,
		setSort,
		selected,
		filterOptions,
		setFilter,
		calculatedFilter,
		setCalculatedFilter,
	} = useServerTableContext<TData>();
	if (!table) {
		throw new Error('DataTable must be passed a table prop or used within a ServerTableProvider');
	}
	const rows = table.getRowModel().rows;
	return (
		<Card
			{...containerProps}
			className={cn(
				'app-table relative rounded-md shadow-none outline-0 border-0 bg-muted gap-2 grow flex-col flex items-start',
				classNames?.container,
			)}>
			{rootTop?.({
				table,
				dataQuery,
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
					className={cn('bg-transparent absolute px-4 -bottom-1.5 h-1.75 w-full', dataQuery.isFetching ? 'block' : 'hidden', classNames?.progress)}
					value={100}
				/>
				{tabs ? (
					<Tabs
						value={calculatedFilter[tabs.field] as string}
						onValueChange={(v) => {
							tabs?.onChange?.(v);
							setFilter([createFilter(tabs?.field as string, 'is', v, 'text')]);
							setCalculatedFilter({ [tabs?.field]: v });
						}}>
						<Tabs.List
							className={cn('w-full bg-transparent gap-0 ', {
								'px-2': !(tableHeader?.leftSection || filter?.length > 0 || tableHeader?.rightSection || sortOptions?.length),
							})}
							variant={'button'}
							size={'md'}>
							{tabs?.options?.map(
								(tab, k) =>
									tabs?.renderTab?.(tab) || (
										<Tabs.Tab
											value={tab.value}
											className={cn('grow py-2 data-active:font-bold data-active:border-b-2 rounded-none', tabs?.className, tab.className)}
											key={'tab-trigger-' + k}>
											{tab.icon}
											{tab.label}
										</Tabs.Tab>
									),
							)}
						</Tabs.List>
					</Tabs>
				) : null}
				{filter?.length > 0 ? (
					<Flex
						className={cn(
							'pb-2 px-2 gap-2 flex-wrap md:flex-nowrap justify-between items-center app-table-header',
							tabs?.options?.length ? 'pt-1' : 'pt-2',
							classNames?.header,
						)}>
						{tableHeader?.leftSection?.({
							table,
							dataQuery,
							filter,
							confirmationPending: confirmationDialog.confirmationPending,
							confirmationIsOpened: confirmationDialog.confirmationIsOpened,
							showConfirmation: confirmationDialog.showConfirmation,
						})}
						{filter?.length > 0 && (
							<Filters
								addButtonProps={searchBtnProps}
								addButtonIcon={<FilterIcon className={'text-primary'} />}
								size={'sm'}
								variant={'outline'}
								className={cn('bg-muted rounded-md min-h-9 px-1 items-center flex', {
									grow: filterInputGrow !== undefined ? filterInputGrow : true,
								})}
								filters={filter}
								fields={filterOptions}
								onChange={setFilter}
								withoutOperator
							/>
						)}
						<Flex className={'gap-2'}>
							{tableHeader?.hideRefetchButton || filter?.length < 1 ? null : (
								<Button
									mode={'icon'}
									color={'accent'}
									onClick={() => dataQuery.refetch()}
									{...(tableHeader?.refetchButtonProps || {})}>
									<RotateCcw />
								</Button>
							)}
							{(sortOptions?.length || 0) > 0 && (
								<ServerTableSort
									sortBtnProps={sortBtnProps}
									sortOptions={sortOptions}
									sort={sort as { dir: SortDirection; field: string }}
									setSort={setSort}
								/>
							)}
							{tableHeader?.rightSection?.({
								table,
								dataQuery,
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
						dataQuery.isLoading ? (
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
										<TriangleAlert
											size={48}
											color={'red'}
										/>
										<Title
											order={5}
											className={'text-destructive'}>
											No data found!
										</Title>
										{(dataQuery.data?.body?.total || 0) > 0 ? (
											<Text className={'text-sm text-center text-muted-foreground'}>
												Please apply another filter or search query.
												<br />
												If you think this is an error, please contact support.
											</Text>
										) : null}
									</Stack>
								</Card>
							</div>
						) : (
							<Box
								className={'grid grid-cols-1 sm:grid-cols-2 gap-4 py-2'}
								{...card.wrapperProps}>
								{rows.map((row) =>
									card?.cardRenderItem ? (
										card?.cardRenderItem({
											row,
											table,
											confirmationPending: confirmationDialog.confirmationPending,
											confirmationIsOpened: confirmationDialog.confirmationIsOpened,
											showConfirmation: confirmationDialog.showConfirmation,
										})
									) : (
										<Card
											key={row.id}
											{...card.itemsProps}
											className={cn('flex justify-center items-center hover:bg-gray-100! dark:hover:bg-gray-600! p-4', card.itemsProps?.className)}>
											{row.getVisibleCells().map((cell) => {
												return (
													<Flex
														data-slot={`cell-wrapper-${String(cell.column.columnDef.header)}`}
														className={cn('grow gap-1', cell.column.columnDef.meta?.classNames?.wrapper)}
														key={cell.id}>
														{cell.column.columnDef.header && cell.column.columnDef.header !== '' ? (
															<Text className={cn('font-semibold')} data-slot={`cell-header-${String(cell.column.columnDef.header)}`}>
																{typeof cell.column.columnDef.header == 'string' ? cell.column.columnDef.header : null}
															</Text>
														) : null}
														<span className={cn(cell.column.columnDef.meta?.classNames?.content)} data-slot={`cell-content-${String(cell.column.columnDef.header)}`}>{<table.FlexRender cell={cell} />}</span>
													</Flex>
												);
											})}
										</Card>
									),
								)}
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
													className={cn('sticky top-0', header.column.columnDef.meta?.classNames?.header)}
													key={header.id}
													colSpan={header.colSpan}>
													{header.isPlaceholder ? null : <table.FlexRender header={header} />}
												</Table.Th>
											);
										})}
									</Table.Tr>
								))}
							</Table.Thead>
							<Table.Tbody {...(tableProps?.tbody || {})}>
								{dataQuery.isLoading ? (
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
												<TriangleAlert
													size={48}
													color={'red'}
												/>
												<Title
													order={5}
													className={'text-destructive'}>
													No data found!
												</Title>
												{(dataQuery.data?.body?.total || 0) > 0 ? (
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
									rows.map((row) => (
										<Table.Tr key={row.id}>
											{row.getVisibleCells().map((cell) => (
												<Table.Td key={cell.id} className={cn(cell.column.columnDef.meta?.classNames?.content)}>
													<table.FlexRender cell={cell} />
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
														className={cn(header.column.columnDef.meta?.classNames?.footer)}
														key={header.id}
														colSpan={header.colSpan}>
														{header.isPlaceholder ? null : <table.FlexRender footer={header} />}
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
					{dataQuery.isLoading ? (
						<TableFooterSkeleton plain={tableFooter?.plain} />
					) : (
						<>
							{filter.length < 1 && (sortOptions?.length || 0) > 0 && (
								<ServerTableSort
									sortBtnProps={sortBtnProps}
									sortOptions={sortOptions}
									sort={sort as { dir: SortDirection; field: string }}
									setSort={setSort}
								/>
							)}
							{tableFooter?.leftMostSection?.({
								table,
								dataQuery,
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
											pageSizes || [
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
								dataQuery,
								filter,
								confirmationPending: confirmationDialog.confirmationPending,
								confirmationIsOpened: confirmationDialog.confirmationIsOpened,
								showConfirmation: confirmationDialog.showConfirmation,
							})}
							{tableFooter?.centerSection?.({
								table,
								dataQuery,
								filter,
								confirmationPending: confirmationDialog.confirmationPending,
								confirmationIsOpened: confirmationDialog.confirmationIsOpened,
								showConfirmation: confirmationDialog.showConfirmation,
							}) || (
								<Flex className={'grow justify-center items-center gap-4 pr-2'}>
									<Text>
										Total {dataQuery.data?.body?.total}
										{dataQuery.data?.body?.filtered !== dataQuery.data?.body?.total && (
											<span className={'ml-3'}>[Filtered {dataQuery.data?.body?.filtered}]</span>
										)}
										{selected > 0 && <span className={'ml-3 text-info'}>[Selected {selected}]</span>}
									</Text>
									<Tooltip content={'Server Consumed ' + dataQuery.data?.timeInSec + ' sec'}>
										<Text className={'text-muted-foreground text-xs'}>Consumed {dataQuery.data?.timeInSec} sec</Text>
									</Tooltip>
								</Flex>
							)}
							{tableFooter?.rightSection?.({
								table,
								dataQuery,
								filter,
								confirmationPending: confirmationDialog.confirmationPending,
								confirmationIsOpened: confirmationDialog.confirmationIsOpened,
								showConfirmation: confirmationDialog.showConfirmation,
							})}
							{!tableFooter?.plain && pagination.pageSize > 0 && Math.ceil((dataQuery.data?.body?.filtered || 1) / pagination.pageSize) > 1 ? (
								<Pagination
									className={'[&_a]:size-7'}
									totalPage={pagination.pageSize > 0 ? Math.ceil((dataQuery.data?.body?.filtered || 1) / pagination.pageSize) : 1}
									currentPage={pagination.pageIndex}
									onPageChange={(page) => setPagination((s) => ({ ...s, pageIndex: page }))}
								/>
							) : null}
							{tableFooter?.rightMostSection?.({
								table,
								dataQuery,
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
