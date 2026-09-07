'use client';

import * as React from 'react';
import { Toast } from '@base-ui/react/toast';
import { XIcon } from 'lucide-react';
import { cn } from '../lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Toast — Base UI toast system, offered alongside the existing sonner wrapper.
 *
 * Render <ToastProvider /> once (e.g. in your app shell), then fire toasts from anywhere:
 *
 *   import { toast } from '@brrinta/uikit';
 *   toast.add({ title: 'Saved', description: 'Your changes are live.', type: 'success' });
 *   toast.promise(save(), { loading: {...}, success: {...}, error: {...} });
 *
 * Inside React you can also use `useToast()` (Base UI's useToastManager) for `toasts`,
 * `update`, `close`, etc. Toasts stack, expand on hover, and swipe to dismiss.
 * -----------------------------------------------------------------------------------------------*/

/** Global manager so `toast.add()` works outside React components too. */
const toastManager = Toast.createToastManager();

export type ToastPosition = 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left' | 'top-center';

const viewportPosition: Record<ToastPosition, string> = {
	'bottom-right': 'bottom-4 right-4',
	'bottom-left': 'bottom-4 left-4',
	'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
	'top-right': 'top-4 right-4',
	'top-left': 'top-4 left-4',
	'top-center': 'top-4 left-1/2 -translate-x-1/2',
};

const swipeFor = (position: ToastPosition): Array<'up' | 'down' | 'left' | 'right'> =>
	position.startsWith('top') ? ['up', 'right'] : ['down', 'right'];

export interface ToastProviderProps extends Omit<React.ComponentProps<typeof Toast.Provider>, 'toastManager'> {
	position?: ToastPosition;
	/** Bring your own manager (defaults to the exported global one). */
	manager?: React.ComponentProps<typeof Toast.Provider>['toastManager'];
	viewportClassName?: string;
}

function ToastProvider({ position = 'bottom-right', manager, viewportClassName, children, ...props }: ToastProviderProps) {
	return (
		<Toast.Provider toastManager={manager ?? toastManager} {...props}>
			{children}
			<Toast.Portal>
				<Toast.Viewport
					data-slot="toast-viewport"
					className={cn('fixed z-[100] flex w-[92vw] max-w-sm flex-col', viewportPosition[position], viewportClassName)}>
					<ToastList position={position} />
				</Toast.Viewport>
			</Toast.Portal>
		</Toast.Provider>
	);
}

function ToastList({ position }: { position: ToastPosition }) {
	const { toasts } = Toast.useToastManager();
	const top = position.startsWith('top');
	return (
		<>
			{toasts.map((t) => (
				<Toast.Root
					key={t.id}
					toast={t}
					swipeDirection={swipeFor(position)}
					data-slot="toast"
					style={{ ['--gap' as string]: '0.75rem' }}
					className={cn(
						'absolute right-0 left-0 z-[calc(1000-var(--toast-index))] w-full select-none',
						top ? 'top-0' : 'bottom-0',
						'rounded-lg border bg-popover bg-clip-padding p-4 text-popover-foreground shadow-lg',
						// type accent
						'data-[type=success]:border-success/40 data-[type=error]:border-destructive/40 data-[type=warning]:border-warning/40 data-[type=info]:border-info/40',
						'[&[data-type=success]_[data-slot=toast-title]]:text-success [&[data-type=error]_[data-slot=toast-title]]:text-destructive',
						'[&[data-type=warning]_[data-slot=toast-title]]:text-warning [&[data-type=info]_[data-slot=toast-title]]:text-info',
						// stacking: collapsed shows peeking edges, expanded lays them out
						'transition-all duration-300 ease-out',
						top
							? '[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(min(var(--toast-index),10)*20%)))_scale(calc(max(0,1-(var(--toast-index)*0.1))))]'
							: '[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(min(var(--toast-index),10)*-20%)))_scale(calc(max(0,1-(var(--toast-index)*0.1))))]',
						top
							? 'data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-offset-y)+(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y)))]'
							: 'data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-offset-y)*-1+(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y)))]',
						'data-[index=0]:not-data-limited:opacity-100 not-data-expanded:data-[index=1]:opacity-90 not-data-expanded:data-[index=2]:opacity-75 [&:not([data-expanded])[data-index="3"]]:opacity-0',
						// enter / exit
						top ? 'data-starting-style:[transform:translateY(-150%)]' : 'data-starting-style:[transform:translateY(150%)]',
						'data-ending-style:opacity-0',
						'data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))]',
						top
							? 'data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]'
							: 'data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
						'data-limited:opacity-0',
						'after:absolute after:inset-x-0 after:h-[calc(var(--gap)+1px)] after:content-[""]',
						top ? 'after:top-full' : 'after:bottom-full',
					)}>
					<Toast.Content data-slot="toast-content" className="flex flex-col gap-0.5 pr-6">
						<Toast.Title data-slot="toast-title" className="text-sm font-semibold" />
						<Toast.Description data-slot="toast-description" className="text-sm text-muted-foreground" />
						<Toast.Action
							data-slot="toast-action"
							className="mt-2 w-fit rounded-md border px-2.5 py-1 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
						/>
					</Toast.Content>
					<Toast.Close
						data-slot="toast-close"
						aria-label="Close notification"
						className="absolute top-3 right-3 rounded-sm p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100">
						<XIcon className="size-4" />
					</Toast.Close>
				</Toast.Root>
			))}
		</>
	);
}

/** Fire-and-forget API, usable outside React. */
const toast = {
	add: toastManager.add,
	close: toastManager.close,
	update: toastManager.update,
	promise: toastManager.promise,
	success: (title: string, options?: Omit<Parameters<typeof toastManager.add>[0], 'title' | 'type'>) =>
		toastManager.add({ title, type: 'success', ...options }),
	error: (title: string, options?: Omit<Parameters<typeof toastManager.add>[0], 'title' | 'type'>) =>
		toastManager.add({ title, type: 'error', ...options }),
	warning: (title: string, options?: Omit<Parameters<typeof toastManager.add>[0], 'title' | 'type'>) =>
		toastManager.add({ title, type: 'warning', ...options }),
	info: (title: string, options?: Omit<Parameters<typeof toastManager.add>[0], 'title' | 'type'>) =>
		toastManager.add({ title, type: 'info', ...options }),
};

const useToast = Toast.useToastManager;

export { ToastProvider, toast, toastManager, useToast };
