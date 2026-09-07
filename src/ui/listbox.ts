import { cvaWithMeta } from '../lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Shared listbox styling for Select, Combobox, Autocomplete and Command.
 *
 * These four popups previously carried three diverging copies of the same item/group/label
 * classes (and Select was missing `data-highlighted:*` entirely, so keyboard navigation showed
 * no highlight). Every popup list now reads from here; components only add their structural
 * extras (indicator gutters, per-slot overrides) via `className`.
 * -----------------------------------------------------------------------------------------------*/

export const listboxItemVariants = cvaWithMeta(
	[
		'relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
		'data-disabled:pointer-events-none data-disabled:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
	],
	{
		variants: {
			// How the primitive marks the active item: Base UI focuses + sets data-highlighted;
			// cmdk sets data-[selected=true].
			highlight: {
				'base-ui': [
					'focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground',
					'not-data-[variant=destructive]:focus:**:text-accent-foreground',
				].join(' '),
				cmdk: 'group/command-item data-[selected=true]:bg-muted data-[selected=true]:text-foreground data-[selected=true]:**:[svg]:text-foreground',
			},
		},
		defaultVariants: { highlight: 'base-ui' },
	},
);

export const listboxGroupVariants = cvaWithMeta('scroll-my-1 p-1', { variants: {}, defaultVariants: {} });

export const listboxGroupLabelVariants = cvaWithMeta('px-2 py-1.5 text-xs text-muted-foreground', {
	variants: {
		weight: { normal: '', bold: 'font-bold' },
	},
	defaultVariants: { weight: 'normal' },
});

export const listboxSeparatorVariants = cvaWithMeta('pointer-events-none -mx-1 my-1 h-px bg-border', {
	variants: {},
	defaultVariants: {},
});

export const listboxScrollButtonVariants = cvaWithMeta(
	'z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*=size-])]:size-4',
	{
		variants: {
			side: { up: 'top-0', down: 'bottom-0' },
		},
		defaultVariants: { side: 'up' },
	},
);

export const listboxEmptyVariants = cvaWithMeta('px-2 py-4 text-center text-sm text-muted-foreground empty:hidden', {
	variants: {},
	defaultVariants: {},
});

export const listboxListVariants = cvaWithMeta('max-h-100 overflow-y-auto p-1', { variants: {}, defaultVariants: {} });
