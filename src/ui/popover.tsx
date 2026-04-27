'use client';

import * as React from 'react';
import { Popover as PopoverPrimitive } from '@base-ui/react/popover';

import { cn, cvaWithMeta } from '@uikit/lib/utils';
import { PopupArrowSvg } from '@uikit/components/PopupArrowSvg';

export const popoverContentVariants = cvaWithMeta(
	`bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 overflow-x-hidden
	data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 relative isolate
	data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 flex flex-col gap-4 rounded-md text-sm min-w-36
	shadow-md ring-1 duration-100 z-50 max-h-(--available-height) origin-(--transform-origin) outline-hidden overflow-y-auto
	max-w-(--available-width) w-(--anchor-width)`,
	{ variants: {}, defaultVariants: {} },
);

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
	return (
		<PopoverPrimitive.Root
			data-slot="popover"
			{...props}
		/>
	);
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
	return (
		<PopoverPrimitive.Trigger
			data-slot="popover-trigger"
			{...props}
		/>
	);
}

export type PopoverContentProps = React.ComponentProps<typeof PopoverPrimitive.Popup> &
	Pick<React.ComponentProps<typeof PopoverPrimitive.Positioner>, 'align' | 'alignOffset' | 'side' | 'sideOffset'> & {
		portalProps?: React.ComponentProps<typeof PopoverPrimitive.Portal>;
		backdropProps?: React.ComponentProps<typeof PopoverPrimitive.Backdrop>;
		arrowProps?: React.ComponentProps<typeof PopoverPrimitive.Arrow>;
		positionerProps?: React.ComponentProps<typeof PopoverPrimitive.Positioner>;
	};

const PopoverContent: React.FC<PopoverContentProps> = ({
	className,
	align = 'center',
	alignOffset = 0,
	side = 'bottom',
	sideOffset = 4,
	positionerProps,
	portalProps,
	backdropProps,
	arrowProps,
	...props
}) => {
	return (
		<PopoverPrimitive.Portal {...portalProps}>
			<PopoverPrimitive.Backdrop
				data-slot="popover-backdrop"
				{...backdropProps}
			/>
			<PopoverPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-999"
				{...positionerProps}>
				<PopoverPrimitive.Arrow
					data-slot="popover-arrow"
					className={'popup-arrow'}
					{...arrowProps}>
					<PopupArrowSvg />
				</PopoverPrimitive.Arrow>
				<PopoverPrimitive.Popup
					data-slot="popover-content"
					className={cn(popoverContentVariants(), className)}
					{...props}
				/>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	);
};
const PopoverViewport: React.FC<React.ComponentProps<typeof PopoverPrimitive.Viewport>> = (props) => {
	return (
		<PopoverPrimitive.Viewport
			data-slot="popover-viewport"
			{...props}
		/>
	);
};

const PopoverClose: React.FC<React.ComponentProps<typeof PopoverPrimitive.Close>> = (props) => {
	return (
		<PopoverPrimitive.Close
			data-slot="popover-close"
			{...props}
		/>
	);
};

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
	return (
		<PopoverPrimitive.Title
			data-slot="popover-title"
			className={cn('font-medium', className)}
			{...props}
		/>
	);
}

function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
	return (
		<PopoverPrimitive.Description
			data-slot="popover-description"
			className={cn('text-muted-foreground', className)}
			{...props}
		/>
	);
}

// Compound export
type CompoundPopover = typeof Popover & {
	Trigger: typeof PopoverTrigger;
	Content: typeof PopoverContent;
	Close: typeof PopoverClose;
	Viewport: typeof PopoverViewport;
	Title: typeof PopoverTitle;
	Description: typeof PopoverDescription;
};
const PopoverComponent = Popover as CompoundPopover;
PopoverComponent.Trigger = PopoverTrigger;
PopoverComponent.Content = PopoverContent;
PopoverComponent.Close = PopoverClose;
PopoverComponent.Viewport = PopoverViewport;
PopoverComponent.Title = PopoverTitle;
PopoverComponent.Description = PopoverDescription;

export { PopoverComponent as Popover, PopoverTrigger, PopoverContent, PopoverClose, PopoverViewport, PopoverTitle, PopoverDescription };
