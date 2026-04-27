import { DependencyList, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DatatableOptions } from './types';
import { FilterFieldConfig, FilterType } from '../../ui/filters';

const assignDefaultOperator = (item: FilterFieldConfig) =>
	({
		...item,
		defaultOperator:
			item.defaultOperator ??
			((['select', 'date', 'number', 'boolean', 'time', 'datetime'] as Array<FilterType | undefined>).includes(item.type)
				? 'is'
				: (['multiselect'] as Array<FilterType | undefined>).includes(item.type)
					? 'includesAnyOf'
					: (['daterange', 'daterangeinput', 'numberrange'] as Array<FilterType | undefined>).includes(item.type)
						? 'between'
						: (['text', 'email', 'autocomplete'] as Array<FilterType | undefined>).includes(item.type)
							? 'startsWith'
							: (['url', 'tel'] as Array<FilterType | undefined>).includes(item.type)
								? 'contains'
								: undefined),
	}) as FilterFieldConfig;

const useCreateColumns = <TData extends Record<string, unknown>, Columns = Array<ColumnDef<TData>>>(columns: () => Columns, deps: DependencyList) =>
	useMemo<Columns>(columns, deps);

const useCreateOptions = <
	TData extends Record<string, unknown> = NonNullable<Record<string, unknown>>,
	TFilter extends Record<string, unknown> = Record<string, unknown>,
>(
	options: () => DatatableOptions<TData, TFilter>,
	deps: DependencyList,
) =>
	useMemo<DatatableOptions<TData, TFilter>>(
		() => ({
			...options(),
			filter: options()
				.filter.filter((item) => !item.noRender)
				.map((item) => {
					return item.group
						? { ...item, fields: item.fields?.filter((it) => !it.noRender)?.map((it) => assignDefaultOperator(it)) }
						: assignDefaultOperator(item);
				}),
		}),
		deps,
	);
export { useCreateColumns, useCreateOptions };
