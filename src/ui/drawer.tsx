'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import { cn } from '../lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Drawer — Base UI Drawer (replaces `vaul-base`). Swipe-to-dismiss, snap points and nested
 * drawers come from the primitive. The public `direction` prop is kept from the old API
 * ('bottom' | 'top' | 'left' | 'right'); it maps to Base UI's `swipeDirection` and drives
 * positioning via our own `data-drawer-direction` attribute.
 * -----------------------------------------------------------------------------------------------*/

export type DrawerDirection = 'top' | 'bottom' | 'left' | 'right';

const SWIPE_FOR: Record<DrawerDirection, 'up' | 'down' | 'left' | 'right'> = {
	bottom: 'down',
	top: 'up',
	left: 'left',
	right: 'right',
};

const DrawerDirectionContext = React.createContext<DrawerDirection>('bottom');

export type DrawerProps = Omit<React.ComponentProps<typeof DrawerPrimitive.Root>, 'swipeDirection'> & {
	direction?: DrawerDirection;
	/** Escape hatch: pass Base UI's own value; wins over `direction`. */
	swipeDirection?: React.ComponentProps<typeof DrawerPrimitive.Root>['swipeDirection'];
};

function Drawer({ direction = 'bottom', swipeDirection, ...props }: DrawerProps) {
	return (
		<DrawerDirectionContext.Provider value={direction}>
			<DrawerPrimitive.Root
				swipeDirection={swipeDirection ?? SWIPE_FOR[direction]}
				{...props}
			/>
		</DrawerDirectionContext.Provider>
	);
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
	return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
	return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
	return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Backdrop>) {
	return (
		<DrawerPrimitive.Backdrop
			data-slot="drawer-overlay"
			className={cn(
				'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300',
				'data-starting-style:opacity-0 data-ending-style:opacity-0 data-swiping:transition-none',
				className,
			)}
			{...props}
		/>
	);
}

export type DrawerContentProps = React.ComponentProps<typeof DrawerPrimitive.Popup> & {
	viewportProps?: React.ComponentProps<typeof DrawerPrimitive.Viewport>;
	contentProps?: React.ComponentProps<typeof DrawerPrimitive.Content>;
	/** Hide the grab handle shown on bottom drawers. */
	hideHandle?: boolean;
};

function DrawerContent({ className, children, viewportProps, contentProps, hideHandle, ...props }: DrawerContentProps) {
	const direction = React.useContext(DrawerDirectionContext);
	return (
		<DrawerPortal>
			<DrawerOverlay />
			<DrawerPrimitive.Viewport
				data-slot="drawer-viewport"
				{...viewportProps}
				className={cn('fixed inset-0 z-50', viewportProps?.className)}>
				<DrawerPrimitive.Popup
					data-slot="drawer-content"
					data-drawer-direction={direction}
					className={cn(
						'group/drawer-content fixed z-50 flex h-auto flex-col bg-popover text-popover-foreground outline-none',
						'transition-transform duration-300 ease-out data-swiping:transition-none',
						// bottom
						'data-[drawer-direction=bottom]:inset-x-0 data-[drawer-direction=bottom]:bottom-0 data-[drawer-direction=bottom]:mt-24 data-[drawer-direction=bottom]:max-h-[80vh] data-[drawer-direction=bottom]:rounded-t-lg data-[drawer-direction=bottom]:border-t',
						'data-[drawer-direction=bottom]:data-starting-style:translate-y-full data-[drawer-direction=bottom]:data-ending-style:translate-y-full',
						// top
						'data-[drawer-direction=top]:inset-x-0 data-[drawer-direction=top]:top-0 data-[drawer-direction=top]:mb-24 data-[drawer-direction=top]:max-h-[80vh] data-[drawer-direction=top]:rounded-b-lg data-[drawer-direction=top]:border-b',
						'data-[drawer-direction=top]:data-starting-style:-translate-y-full data-[drawer-direction=top]:data-ending-style:-translate-y-full',
						// right
						'data-[drawer-direction=right]:inset-y-0 data-[drawer-direction=right]:right-0 data-[drawer-direction=right]:w-3/4 data-[drawer-direction=right]:rounded-l-lg data-[drawer-direction=right]:border-l data-[drawer-direction=right]:sm:max-w-sm',
						'data-[drawer-direction=right]:data-starting-style:translate-x-full data-[drawer-direction=right]:data-ending-style:translate-x-full',
						// left
						'data-[drawer-direction=left]:inset-y-0 data-[drawer-direction=left]:left-0 data-[drawer-direction=left]:w-3/4 data-[drawer-direction=left]:rounded-r-lg data-[drawer-direction=left]:border-r data-[drawer-direction=left]:sm:max-w-sm',
						'data-[drawer-direction=left]:data-starting-style:-translate-x-full data-[drawer-direction=left]:data-ending-style:-translate-x-full',
						className,
					)}
					{...props}>
					{!hideHandle && direction === 'bottom' && (
						<div className="mx-auto mt-4 h-2 w-[100px] shrink-0 rounded-full bg-muted" data-slot="drawer-handle" />
					)}
					<DrawerPrimitive.Content
						data-slot="drawer-scroll-content"
						{...contentProps}
						className={cn('flex min-h-0 flex-1 flex-col overflow-y-auto', contentProps?.className)}>
						{children}
					</DrawerPrimitive.Content>
				</DrawerPrimitive.Popup>
			</DrawerPrimitive.Viewport>
		</DrawerPortal>
	);
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return <div data-slot="drawer-header" className={cn('flex flex-col gap-1.5 p-4', className)} {...props} />;
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return <div data-slot="drawer-footer" className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />;
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
	return <DrawerPrimitive.Title data-slot="drawer-title" className={cn('font-semibold text-foreground', className)} {...props} />;
}

function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) {
	return <DrawerPrimitive.Description data-slot="drawer-description" className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

const DrawerCompound = Object.assign(Drawer, {
	Trigger: DrawerTrigger,
	Portal: DrawerPortal,
	Overlay: DrawerOverlay,
	Content: DrawerContent,
	Close: DrawerClose,
	Header: DrawerHeader,
	Footer: DrawerFooter,
	Title: DrawerTitle,
	Description: DrawerDescription,
});

export {
	DrawerCompound as Drawer,
	DrawerPortal,
	DrawerOverlay,
	DrawerTrigger,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
};
