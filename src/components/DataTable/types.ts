import { ColumnDef } from '@tanstack/react-table';
import { SortDirection } from '../../schema';
import { ButtonProps } from '../../ui/button';
import { FilterFieldConfig } from '../../ui/filters';
import { SelectItemOption } from '../../ui/select-input';

/**
 * Represents a label-value pair for datatable filters.
 */
export type DatatableLabelValuePair = {
	label: string;
	subLabel?: string;
	icon?: React.ReactNode;
	className?: string;
	value: string | ReadonlyArray<string> | number | undefined | null;
};

/**
 * Column definition for datatable, with optional noRender flag.
 */
export type DatatableColumnDefinition<TData extends Record<string, unknown> = NonNullable<Record<string, unknown>>> = ColumnDef<TData> & {
	noRender?: boolean;
};

export type SortType = { dir: SortDirection; field: string };
export type DatatableOptions<TData extends Record<string, unknown>, TFilter extends Record<string, unknown> = Record<string, unknown>> = {
	sortOptions?: Array<{ label: string; field: string }>;
	tabs?: {
		renderTab?: (tab: DatatableLabelValuePair) => React.ReactNode;
		className?: string;
		options: Array<DatatableLabelValuePair>;
		initialValue: unknown;
		field: string;
		onChange?: (value: unknown) => void;
	};
	filter: Array<FilterFieldConfig>;
	sort: SortType;
	pageSize?: number;
	pageSizes?: Array<SelectItemOption<string>>;
	needManualApply?: boolean;
	setOnClose?: boolean;
	/**
	 * In seconds
	 */
	debounce: number;
	sortBtnProps?: ButtonProps;
	searchBtnProps?: ButtonProps;
	debounceExclude?: string[];
	columns?: Record<keyof TData | string, unknown>;
	filterInputGrow?: boolean;
	// excludeOptions: { className: string; contentProps: QSelectProps; placeholder: string };
};
