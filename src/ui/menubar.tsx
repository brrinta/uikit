'use client';

import * as React from 'react';
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar';
import { cn } from '../lib/utils';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuGroupLabel,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from './dropdown-menu';

/* -------------------------------------------------------------------------------------------------
 * Menubar — Base UI Menubar container; the menus inside are the same Base UI Menu the
 * DropdownMenu compound wraps, so every part (Item, CheckboxItem, Sub, Shortcut, …) is reused
 * and stays visually in sync via menu-shared variants.
 *
 *   <Menubar>
 *     <Menubar.Menu>
 *       <Menubar.Trigger>File</Menubar.Trigger>
 *       <Menubar.Content>
 *         <Menubar.Item>New file<Menubar.Shortcut>⌘N</Menubar.Shortcut></Menubar.Item>
 *       </Menubar.Content>
 *     </Menubar.Menu>
 *   </Menubar>
 * -----------------------------------------------------------------------------------------------*/

export type MenubarProps = React.ComponentProps<typeof MenubarPrimitive>;

function MenubarRoot({ className, ...props }: MenubarProps) {
	return (
		<MenubarPrimitive
			data-slot="menubar"
			className={cn('flex w-fit items-center gap-1 rounded-md border bg-background p-1 shadow-xs', className)}
			{...props}
		/>
	);
}
MenubarRoot.displayName = 'Menubar';

export type MenubarTriggerProps = React.ComponentProps<typeof DropdownMenuTrigger>;

/** A compact menubar-style trigger. Open state covers all Base UI signals. */
function MenubarTrigger({ className, ...props }: MenubarTriggerProps) {
	return (
		<DropdownMenuTrigger
			data-slot="menubar-trigger"
			className={cn(
				'flex h-7 cursor-default items-center rounded-sm px-2.5 text-sm font-medium outline-none select-none',
				'hover:bg-accent hover:text-accent-foreground',
				'focus-visible:ring-2 focus-visible:ring-ring',
				'data-open:bg-accent data-open:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground',
				className,
			)}
			{...props}
		/>
	);
}

export type MenubarContentProps = React.ComponentProps<typeof DropdownMenuContent>;

function MenubarContent({ align = 'start', sideOffset = 6, ...props }: MenubarContentProps) {
	return (
		<DropdownMenuContent
			data-slot="menubar-content"
			align={align}
			sideOffset={sideOffset}
			{...props}
		/>
	);
}

const Menubar = Object.assign(MenubarRoot, {
	Menu: DropdownMenu,
	Trigger: MenubarTrigger,
	Portal: DropdownMenuPortal,
	Content: MenubarContent,
	Group: DropdownMenuGroup,
	GroupLabel: DropdownMenuGroupLabel,
	Item: DropdownMenuItem,
	CheckboxItem: DropdownMenuCheckboxItem,
	RadioGroup: DropdownMenuRadioGroup,
	RadioItem: DropdownMenuRadioItem,
	Separator: DropdownMenuSeparator,
	Shortcut: DropdownMenuShortcut,
	Sub: DropdownMenuSub,
	SubTrigger: DropdownMenuSubTrigger,
	SubContent: DropdownMenuSubContent,
});

export { Menubar, MenubarRoot, MenubarTrigger, MenubarContent };
