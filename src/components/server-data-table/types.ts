import type { RowData } from '@tanstack/react-table';
import type { ReactNode } from 'react';

import type { createAppColumnHelper } from './app-table';
import { UseConfirmationDialogReturn } from '../popups/confirmation-popup';
import { DropdownMenuProps } from '../../ui/dropdown-menu';
import { ButtonGroupProps, ButtonProps } from '../../ui/button';
import { DatatableQuery, DatatableResponse, ResponseInterface } from '../../schema';
import { DatatableLabelValuePair, SortType } from '../DataTable/types';
import { Filter, FilterFieldConfig } from '../../ui/filters';
import { useServerTableContext } from './use-server-table';
import { SelectItemOption } from '../../ui/select-input';
import { ContainerProps } from '../../ui/container';
import { TableProps, TableTbodyProps, TableTfootProps, TableTheadProps } from '../../ui/table';
import { BoxProps } from '../../ui/box';
import { CardProps } from '../../ui/card';

type ExtractFn<T> = Extract<T, (...args: any) => any>;
type CellContextFor<TData extends RowData> = Parameters<ExtractFn<NonNullable<ColumnsFor<TData>[0]['cell']>>>[0];
type RowSectionProps<TData extends RowData> = UseConfirmationDialogReturn & Pick<CellContextFor<TData>, 'row' | 'table'>;
type RowActionType<TData extends RowData> = {
	items?: (sectionProps: RowSectionProps<TData>) => ReactNode;
	column?: Omit<ColumnsFor<TData>, 'id'>;
	menuProps?: DropdownMenuProps;
	actionIconProps?: ButtonProps;
	wrapperProps?: ButtonGroupProps;
	leftSection?: (sectionProps: RowSectionProps<TData>) => ReactNode;
	rightSection?: (sectionProps: RowSectionProps<TData>) => ReactNode;
};

type ColumnsFor<TData extends RowData> = ReturnType<ReturnType<typeof createAppColumnHelper<TData>>['columns']>;

export interface UseServerTableOptions<TData extends RowData> {
	key: string;
	columns: ColumnsFor<TData>;
	fetcher: (query: DatatableQuery) => Promise<ResponseInterface<DatatableResponse<TData>>>;
	additionalColumns?: Record<string, any>;
	initialSort?: SortType;
	sortOptions?: Array<{ label: string; field: string }>;

	tabs?: {
		renderTab?: (tab: DatatableLabelValuePair) => ReactNode;
		className?: string;
		options: Array<DatatableLabelValuePair>;
		initialValue: unknown;
		field: string;
		onChange?: (value: unknown) => void;
	};
	initialFilters?: Array<Filter>;
	filter: Array<FilterFieldConfig>;
	pageSize?: number;

	needManualApply?: boolean;
	setOnClose?: boolean;
	/**
	 * In seconds
	 */
	debounce?: number;
	debounceExclude?: string[];
	filterInputGrow?: boolean;
	withoutSearchQuery?: boolean;
	/**
	 * new Options below
	 */
	reloadListeners?: Array<string>;
	rowAction?: RowActionType<TData>;
}

export type SectionProps<TData extends RowData> = Omit<RowSectionProps<TData>, 'table' | 'row'> &
	Pick<ReturnType<typeof useServerTableContext<TData>>, 'table' | 'dataQuery' | 'filter'>;

export type ServerTableProps<TData extends RowData> = {
	pageSizes?: Array<SelectItemOption<string>>;
	sortBtnProps?: ButtonProps;
	searchBtnProps?: ButtonProps;
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
