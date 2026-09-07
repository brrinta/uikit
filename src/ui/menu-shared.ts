import { cvaWithMeta } from '../lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Shared menu styling for DropdownMenu, ContextMenu and Menubar (all on Base UI Menu).
 * Previously ~250 lines of near-identical class strings lived in dropdown-menu.tsx and
 * context-menu.tsx, already drifting apart (dropdown had h-10/cursor-pointer, context lacked
 * the highlighted state on destructive items). Structural per-component extras stay at call
 * sites via `className`.
 * -----------------------------------------------------------------------------------------------*/

export const menuItemVariants = cvaWithMeta(
	[
		'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
		'focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground',
		'data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:pl-8',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
	],
	{
		variants: {
			variant: {
				default: 'not-data-[variant=destructive]:focus:**:text-accent-foreground',
				destructive: [
					'text-destructive *:[svg]:text-destructive',
					'focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/20',
					'data-highlighted:bg-destructive/10 data-highlighted:text-destructive dark:data-highlighted:bg-destructive/20',
				].join(' '),
			},
		},
		defaultVariants: { variant: 'default' },
	},
);

/** Submenu trigger — item styling plus the open state (all three Base UI signals). */
export const menuSubTriggerVariants = cvaWithMeta(
	[
		'flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8',
		'focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground',
		'data-open:bg-accent data-open:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
	],
	{ variants: {}, defaultVariants: {} },
);

/** Checkbox / radio menu items — reserves an end gutter for the indicator. */
export const menuCheckableItemVariants = cvaWithMeta(
	[
		'relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none',
		'focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground',
		'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
		'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
	],
	{ variants: {}, defaultVariants: {} },
);

export const menuIndicatorSpanClassName = 'pointer-events-none absolute right-2 flex items-center justify-center';

/** Popup + submenu popup surface, including enter/exit animation (Base UI data attributes). */
export const menuContentVariants = cvaWithMeta(
	[
		'w-auto min-w-[96px] rounded-md bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100',
		'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95',
		'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
	],
	{ variants: {}, defaultVariants: {} },
);

export const menuShortcutClassName = 'ml-auto text-xs tracking-widest text-muted-foreground';
