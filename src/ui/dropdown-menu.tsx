import * as React from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';

import { cn } from '@uikit/lib/utils';
import { CheckIcon, ChevronRightIcon } from 'lucide-react';
import { useRender } from '@base-ui/react/use-render';
import { PopupArrowSvg } from '@uikit/components/PopupArrowSvg';

export type DropdownMenuProps = React.ComponentProps<typeof MenuPrimitive.Root>;
function DropdownMenu({ ...props }: DropdownMenuProps) {
	return (
		<MenuPrimitive.Root
			data-slot="dropdown-menu"
			{...props}
		/>
	);
}

export type DropdownMenuPortalProps = React.ComponentProps<typeof MenuPrimitive.Portal>;
function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
	return (
		<MenuPrimitive.Portal
			data-slot="dropdown-menu-portal"
			{...props}
		/>
	);
}

export type DropdownMenuTriggerProps = React.ComponentProps<typeof MenuPrimitive.Trigger>;
function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
	return (
		<MenuPrimitive.Trigger
			data-slot="dropdown-menu-trigger"
			{...props}
		/>
	);
}

export type DropdownMenuContentProps = React.ComponentProps<typeof MenuPrimitive.Popup> &
	Pick<MenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>;
function DropdownMenuContent({ align = 'start', alignOffset = 0, side = 'bottom', sideOffset = 12, className, ...props }: DropdownMenuContentProps) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner
				className="isolate outline-none z-99999"
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}>
				<MenuPrimitive.Arrow className={'popup-arrow'}>
					<PopupArrowSvg />
				</MenuPrimitive.Arrow>
				<MenuPrimitive.Popup
					data-slot="dropdown-menu-content"
					className={cn(
						`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95
						 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
						 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-fit rounded-md p-1 shadow-md
						 ring-1 duration-100 max-h-(--available-height) w-(--anchor-width) max-w-full origin-(--transform-origin)
						  overflow-x-hidden overflow-y-auto
						 outline-none data-closed:overflow-hidden`,
						className,
					)}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	);
}

export type DropdownMenuGroupProps = React.ComponentProps<typeof MenuPrimitive.Group>;
function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps) {
	return (
		<MenuPrimitive.Group
			data-slot="dropdown-menu-group"
			{...props}
		/>
	);
}

export type DropdownMenuGroupLabelProps = React.ComponentProps<typeof MenuPrimitive.GroupLabel> & {
	inset?: boolean;
};
function DropdownMenuGroupLabel({ className, inset, ...props }: DropdownMenuGroupLabelProps) {
	return (
		<MenuPrimitive.GroupLabel
			data-slot="dropdown-menu-label"
			data-inset={inset}
			className={cn('text-muted-foreground px-2 py-1.5 text-xs font-medium data-[inset]:pl-8', className)}
			{...props}
		/>
	);
}

export type DropdownMenuItemProps = React.ComponentProps<typeof MenuPrimitive.Item> & {
	inset?: boolean;
	variant?: 'default' | 'destructive';
};
function DropdownMenuItem({ className, inset, variant = 'default', ...props }: DropdownMenuItemProps) {
	return (
		<MenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				`focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10
				dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive cursor-pointer h-10
				data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm
				px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 group/dropdown-menu-item relative flex items-center outline-hidden
				select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
				className,
			)}
			{...props}
		/>
	);
}

export type DropdownMenuSubProps = React.ComponentProps<typeof MenuPrimitive.SubmenuRoot>;
function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
	return (
		<MenuPrimitive.SubmenuRoot
			data-slot="dropdown-menu-sub"
			{...props}
		/>
	);
}

export type DropdownMenuSubTriggerProps = React.ComponentProps<typeof MenuPrimitive.SubmenuTrigger> & {
	inset?: boolean;
};
function DropdownMenuSubTrigger({ className, inset, children, ...props }: DropdownMenuSubTriggerProps) {
	return (
		<MenuPrimitive.SubmenuTrigger
			data-slot="dropdown-menu-sub-trigger"
			data-inset={inset}
			className={cn(
				`focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground
				not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4
				flex cursor-default items-center outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
				className,
			)}
			{...props}>
			{children}
			<ChevronRightIcon className="ml-auto" />
		</MenuPrimitive.SubmenuTrigger>
	);
}

export type DropdownMenuSubContentProps = React.ComponentProps<typeof DropdownMenuContent>;
function DropdownMenuSubContent({
	align = 'start',
	alignOffset = -3,
	side = 'right',
	sideOffset = 0,
	className,
	...props
}: DropdownMenuSubContentProps) {
	return (
		<DropdownMenuContent
			data-slot="dropdown-menu-sub-content"
			className={cn(
				`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95
				data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
				data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-[96px] rounded-md p-1 shadow-lg ring-1
				duration-100 w-auto`,
				className,
			)}
			align={align}
			alignOffset={alignOffset}
			side={side}
			sideOffset={sideOffset}
			{...props}
		/>
	);
}

export type DropdownMenuCheckboxItemProps = React.ComponentProps<typeof MenuPrimitive.CheckboxItem>;
function DropdownMenuCheckboxItem({ className, children, checked, ...props }: DropdownMenuCheckboxItemProps) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			className={cn(
				`focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm
				[&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none
				data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
				className,
			)}
			checked={checked}
			{...props}>
			<span
				className="pointer-events-none absolute right-2 flex items-center justify-center pointer-events-none"
				data-slot="dropdown-menu-checkbox-item-indicator">
				<MenuPrimitive.CheckboxItemIndicator>
					<CheckIcon />
				</MenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</MenuPrimitive.CheckboxItem>
	);
}

export type DropdownMenuRadioGroupProps = React.ComponentProps<typeof MenuPrimitive.RadioGroup>;
function DropdownMenuRadioGroup({ ...props }: DropdownMenuRadioGroupProps) {
	return (
		<MenuPrimitive.RadioGroup
			data-slot="dropdown-menu-radio-group"
			{...props}
		/>
	);
}

export type DropdownMenuRadioItemProps = React.ComponentProps<typeof MenuPrimitive.RadioItem>;
function DropdownMenuRadioItem({ className, children, ...props }: DropdownMenuRadioItemProps) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			className={cn(
				`focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm
         [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none
          data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
				className,
			)}
			{...props}>
			<span
				className="pointer-events-none absolute right-2 flex items-center justify-center pointer-events-none"
				data-slot="dropdown-menu-radio-item-indicator">
				<MenuPrimitive.RadioItemIndicator>
					<CheckIcon />
				</MenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</MenuPrimitive.RadioItem>
	);
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
			{...props}
		/>
	);
}

export type DropdownMenuSeparatorProps = React.ComponentProps<typeof MenuPrimitive.Separator>;
function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
	return (
		<MenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn('bg-border -mx-1 my-1 h-px', className)}
			{...props}
		/>
	);
}

type DropdownMenuInfoProps = useRender.ComponentProps<'div'>;
const DropdownMenuInfo: React.FC<DropdownMenuInfoProps> = ({ render, className, ...props }) => {
	return useRender({
		defaultTagName: 'div',
		render,
		state: {
			slot: 'dropdown-menu-info',
		},
		props: {
			className: cn('p-1 flex gap-1 text-sm', className),
			...props,
		},
	});
};

// Compound export
type CompoundDropdownMenu = typeof DropdownMenu & {
	Trigger: typeof DropdownMenuTrigger;
	Content: typeof DropdownMenuContent;
	Item: typeof DropdownMenuItem;
	CheckboxItem: typeof DropdownMenuCheckboxItem;
	RadioItem: typeof DropdownMenuRadioItem;
	GroupLabel: typeof DropdownMenuGroupLabel;
	Separator: typeof DropdownMenuSeparator;
	Group: typeof DropdownMenuGroup;
	Sub: typeof DropdownMenuSub;
	SubTrigger: typeof DropdownMenuSubTrigger;
	SubContent: typeof DropdownMenuSubContent;
	Portal: typeof DropdownMenuPortal;
	RadioGroup: typeof DropdownMenuRadioGroup;
	Shortcut: typeof DropdownMenuShortcut;
	Info: typeof DropdownMenuInfo;
};
const DropdownMenuComponent = DropdownMenu as CompoundDropdownMenu;
DropdownMenuComponent.Trigger = DropdownMenuTrigger;
DropdownMenuComponent.Content = DropdownMenuContent;
DropdownMenuComponent.Item = DropdownMenuItem;
DropdownMenuComponent.CheckboxItem = DropdownMenuCheckboxItem;
DropdownMenuComponent.RadioItem = DropdownMenuRadioItem;
DropdownMenuComponent.GroupLabel = DropdownMenuGroupLabel;
DropdownMenuComponent.Separator = DropdownMenuSeparator;
DropdownMenuComponent.Group = DropdownMenuGroup;
DropdownMenuComponent.Sub = DropdownMenuSub;
DropdownMenuComponent.SubTrigger = DropdownMenuSubTrigger;
DropdownMenuComponent.SubContent = DropdownMenuSubContent;
DropdownMenuComponent.Portal = DropdownMenuPortal;
DropdownMenuComponent.RadioGroup = DropdownMenuRadioGroup;
DropdownMenuComponent.Shortcut = DropdownMenuShortcut;
DropdownMenuComponent.Info = DropdownMenuInfo;

export {
	DropdownMenuComponent as DropdownMenu,
	DropdownMenuPortal,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuGroupLabel,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
	DropdownMenuShortcut,
	DropdownMenuInfo,
};
