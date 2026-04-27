import * as React from 'react';
import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import { cn } from '@uikit/lib/utils';

type ScrollAreaProps = ScrollAreaPrimitive.Root.Props & {
	classNames?: {
		viewport?: string;
		scrollbar?: string;
		corner?: string;
	};
	viewportProps?: ScrollAreaPrimitive.Viewport.Props;
	scrollbarProps?: ScrollAreaPrimitive.Scrollbar.Props;
	cornerProps?: ScrollAreaPrimitive.Corner.Props;
	ref?: React.Ref<HTMLDivElement>;
};

const ScrollArea = ({ className, children, classNames, viewportProps, scrollbarProps, cornerProps, ref, ...rootProps }: ScrollAreaProps) => {
	return (
		<ScrollAreaPrimitive.Root
			ref={ref}
			data-slot="scroll-area"
			className={cn('relative', className)}
			{...rootProps}>
			<ScrollAreaPrimitive.Viewport
				ref={ref}
				data-slot="scroll-area-viewport"
				className={cn(
					`focus-visible:ring-ring/50 size-full rounded-[inherit]
             transition-[color,box-shadow] outline-none focus-visible:ring-[3px]
             focus-visible:outline-1`,
					classNames?.viewport,
				)}
				{...viewportProps}>
				{children}
			</ScrollAreaPrimitive.Viewport>

			<ScrollBar
				className={classNames?.scrollbar}
				{...scrollbarProps}
			/>

			<ScrollAreaPrimitive.Corner
				className={classNames?.corner}
				{...cornerProps}
			/>
		</ScrollAreaPrimitive.Root>
	);
};

ScrollArea.displayName = 'ScrollArea';

function ScrollBar({ className, orientation = 'vertical', ...props }: ScrollAreaPrimitive.Scrollbar.Props) {
	return (
		<ScrollAreaPrimitive.Scrollbar
			data-slot="scroll-area-scrollbar"
			data-orientation={orientation}
			orientation={orientation}
			className={cn(
				`data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent
         data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent
         flex touch-none p-px transition-colors select-none`,
				className,
			)}
			{...props}>
			<ScrollAreaPrimitive.Thumb
				data-slot="scroll-area-thumb"
				className="rounded-full bg-border relative flex-1"
			/>
		</ScrollAreaPrimitive.Scrollbar>
	);
}

export { ScrollArea, ScrollBar };
