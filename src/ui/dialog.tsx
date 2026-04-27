'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { cn, cvaWithMeta } from '@uikit/lib/utils';
import { Button } from '@uikit/ui/button';
import { XIcon } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';

export const dialogContentVariants = cvaWithMeta(
	[
		'flex flex-col fixed outline-0 z-50 border border-border bg-background p-6 shadow-lg shadow-black/5 duration-200',
		'data-[state=open]:animate-in data-[state=closed]:animate-out',
		'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
		'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-xl max-h-screen',
	].join(' '),
	{
		variants: {
			variant: {
				default: 'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full',
				fullscreen: 'inset-5',
			},
			mode: {
				centered: `md:pl-16 md:pr-14 md:pt-12 p-6 md:pb-8 md:**:data-[slot=dialog-header]:text-center **:data-[slot=dialog-body]:pt-4
					 **:data-[slot=dialog-body]:pr-2 **:data-[slot=dialog-footer]:col-span-full **:data-[slot=dialog-footer]:w-full
					 **:data-[slot=dialog-footer]:justify-end [&_[data-slot=dialog-footer]:has(>_:nth-child(2))]:justify-between`,
				default: '',
			},
		},
		defaultVariants: {
			variant: 'default',
			mode: 'centered',
		},
	},
);

export const dialogCloseVariants = cvaWithMeta(
	[
		'cursor-pointer outline-0 absolute end-5 top-5 rounded-sm opacity-60 ring-offset-background',
		'transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none',
		'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground ',
	].join(' '),
	{
		variants: {
			variant: {
				default: '',
				fullscreen: '',
			},
			mode: {
				centered:
					'rounded-full bg-background opacity-100 flex items-center justify-center size-10 md:-top-5 md:translate-x-[50%] translate-x-[25%]' +
					' md:end-1/2 [&_svg]:size-6 [&_svg]:text-destructive hover:[&_svg]:text-destructive/80 opacity-100 md:outline-1 hover:bg-destructive-muted',
				default: '',
			},
		},
		defaultVariants: {
			variant: 'default',
			mode: 'centered',
		},
	},
);

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
	return (
		<DialogPrimitive.Root
			disablePointerDismissal
			data-slot="dialog"
			{...props}
		/>
	);
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return (
		<DialogPrimitive.Trigger
			data-slot="dialog-trigger"
			{...props}
		/>
	);
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return (
		<DialogPrimitive.Portal
			data-slot="dialog-portal"
			{...props}
		/>
	);
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
	return (
		<DialogPrimitive.Close
			data-slot="dialog-close"
			{...props}
		/>
	);
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="dialog-overlay"
			className={cn(
				`data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100
				supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50`,
				className,
			)}
			{...props}
		/>
	);
}

function DialogContent({
	className,
	children,
	showCloseButton = true,
	overlay = true,
	variant,
	mode,
	...props
}: DialogPrimitive.Popup.Props &
	VariantProps<typeof dialogContentVariants> & {
		showCloseButton?: boolean;
		overlay?: boolean;
	}) {
	return (
		<DialogPortal>
			{overlay && <DialogOverlay />}
			<DialogPrimitive.Popup
				data-slot="dialog-content"
				className={cn(dialogContentVariants({ variant, mode }), className)}
				{...props}>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						render={
							<Button
								variant="ghost"
								className={cn(dialogCloseVariants({ variant, mode }))}
								mode="icon"
								size={'sm'}
							/>
						}>
						<XIcon />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Popup>
		</DialogPortal>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-header"
			className={cn('flex flex-col space-y-1 text-center sm:text-start mb-2', className)}
			{...props}
		/>
	);
}

function DialogFooter({
	className,
	showCloseButton = false,
	children,
	...props
}: React.ComponentProps<'div'> & {
	showCloseButton?: boolean;
}) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn('flex flex-col-reverse flex-wrap sm:flex-row justify-center pt-5 sm:space-2.5', className)}
			{...props}>
			{children}
			{showCloseButton && <DialogPrimitive.Close render={<Button variant="outline" />}>Close</DialogPrimitive.Close>}
		</div>
	);
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn('text-lg font-semibold leading-none tracking-tight', className)}
			{...props}
		/>
	);
}

const DialogBody = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		data-slot="dialog-body"
		className={cn('grow overflow-y-auto max-h-[80vh]', className)}
		{...props}
	/>
);

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	);
}

// Add compound export at end
type CompoundDialog = typeof Dialog & {
	Trigger: typeof DialogTrigger;
	Portal: typeof DialogPortal;
	Overlay: typeof DialogOverlay;
	Content: typeof DialogContent;
	Title: typeof DialogTitle;
	Description: typeof DialogDescription;
	Close: typeof DialogClose;
	Header: typeof DialogHeader;
	Footer: typeof DialogFooter;
	Body: typeof DialogBody;
};
const DialogComponent = Dialog as CompoundDialog;
DialogComponent.Trigger = DialogTrigger;
DialogComponent.Portal = DialogPortal;
DialogComponent.Overlay = DialogOverlay;
DialogComponent.Content = DialogContent;
DialogComponent.Title = DialogTitle;
DialogComponent.Description = DialogDescription;
DialogComponent.Close = DialogClose;
DialogComponent.Header = DialogHeader;
DialogComponent.Footer = DialogFooter;
DialogComponent.Body = DialogBody;
export {
	DialogComponent as Dialog,
	DialogTrigger,
	DialogPortal,
	DialogOverlay,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
	DialogHeader,
	DialogFooter,
	DialogBody,
};
