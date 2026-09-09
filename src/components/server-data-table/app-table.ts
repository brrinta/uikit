import {
	columnVisibilityFeature,
	createTableHook,
	metaHelper,
	rowPaginationFeature,
	rowSelectionFeature,
	tableFeatures,
} from '@tanstack/react-table';

export interface AppColumnMeta {
	hide?: boolean;
	classNames?: {
		content?: string;
		header?: string;
		footer?: string;
		/**
		 * only applied to card
		 */
		wrapper?: string;
	};
}

export const { createAppColumnHelper, useAppTable, useTableContext, useCellContext, useHeaderContext, appFeatures } = createTableHook({
	features: tableFeatures({
		rowSelectionFeature,
		rowPaginationFeature,
		columnVisibilityFeature,
		columnMeta: metaHelper<AppColumnMeta>(),
	}),
});
