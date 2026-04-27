import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

import { cn } from '../lib/utils';

function TooltipProvider({ delay = 0, ...props }: TooltipPrimitive.Provider.Props) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delay={delay}
			{...props}
		/>
	);
}

export type TooltipProps = TooltipPrimitive.Root.Props & {
	contentProps?: typeof TooltipContent;
	content?: React.ReactNode;
	children?: React.ReactNode;
};

function Tooltip({ content, contentProps, children, ...props }: TooltipProps) {
	return (
		<TooltipProvider>
			{content ? (
				<TooltipPrimitive.Root
					data-slot="tooltip"
					{...props}>
					{content ? (
						<>
							<TooltipTrigger>{children}</TooltipTrigger>
							<TooltipContent {...contentProps}>{content}</TooltipContent>
						</>
					) : (
						children
					)}
				</TooltipPrimitive.Root>
			) : (
				<TooltipPrimitive.Root
					data-slot="tooltip"
					{...props}
					children={children}
				/>
			)}
		</TooltipProvider>
	);
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
	return (
		<TooltipPrimitive.Trigger
			data-slot="tooltip-trigger"
			{...props}
		/>
	);
}

function TooltipContent({
	className,
	side = 'top',
	sideOffset = 4,
	align = 'center',
	alignOffset = 0,
	children,
	...props
}: TooltipPrimitive.Popup.Props & Pick<TooltipPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-50">
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					className={cn(
						`data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in
							data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out
							data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2
							data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-md px-3
							py-1.5 text-xs bg-foreground text-background z-50 w-fit max-w-xs origin-(--transform-origin)`,
						className,
					)}
					{...props}>
					{children}
					<TooltipPrimitive.Arrow
						className={`size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground z-50
					data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2!
					data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5`}
					/>
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

// Compound export
type CompoundTooltip = typeof Tooltip & { Trigger: typeof TooltipTrigger; Content: typeof TooltipContent; Provider: typeof TooltipProvider };
const TooltipComponent = Tooltip as CompoundTooltip;
TooltipComponent.Trigger = TooltipTrigger;
TooltipComponent.Content = TooltipContent;
TooltipComponent.Provider = TooltipProvider;

export { TooltipComponent as Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
