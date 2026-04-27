import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';

import { cn } from '@uikit/lib/utils';
import * as React from 'react';
import { popoverContentVariants } from '@uikit/ui/popover';
import { PopupArrowSvg } from '@uikit/components/PopupArrowSvg';

function PreviewCard({ ...props }: PreviewCardPrimitive.Root.Props) {
	return (
		<PreviewCardPrimitive.Root
			data-slot="preview-card"
			{...props}
		/>
	);
}

function PreviewCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
	return (
		<PreviewCardPrimitive.Trigger
			data-slot="preview-card-trigger"
			{...props}
		/>
	);
}

export type PreviewCardPickedPositionerProps = Pick<
	React.ComponentProps<typeof PreviewCardPrimitive.Positioner>,
	| 'disableAnchorTracking'
	| 'align'
	| 'alignOffset'
	| 'side'
	| 'sideOffset'
	| 'arrowPadding'
	| 'anchor'
	| 'collisionAvoidance'
	| 'collisionBoundary'
	| 'collisionPadding'
	| 'sticky'
	| 'positionMethod'
>;
export type PreviewCardContentProps = React.ComponentProps<typeof PreviewCardPrimitive.Popup> &
	PreviewCardPickedPositionerProps & {
		portalProps?: React.ComponentProps<typeof PreviewCardPrimitive.Portal>;
		positionerProps?: Omit<React.ComponentProps<typeof PreviewCardPrimitive.Positioner>, keyof PreviewCardPickedPositionerProps>;
		backdropProps?: React.ComponentProps<typeof PreviewCardPrimitive.Backdrop>;
		arrowProps?: React.ComponentProps<typeof PreviewCardPrimitive.Arrow>;
		enableBackdrop?: boolean;
	};
const PreviewCardContent: React.FC<PreviewCardContentProps> = ({
	children,
	className,
	disableAnchorTracking,
	align,
	alignOffset,
	side,
	sideOffset,
	arrowPadding,
	anchor,
	collisionAvoidance,
	collisionBoundary,
	collisionPadding,
	sticky,
	positionMethod,
	portalProps,
	positionerProps,
	backdropProps,
	enableBackdrop,
	arrowProps,
	...props
}) => {
	return (
		<PreviewCardPrimitive.Portal
			data-slot="preview-card-portal"
			{...portalProps}>
			{enableBackdrop && (
				<PreviewCardPrimitive.Backdrop
					data-slot="preview-card-backdrop"
					{...backdropProps}
				/>
			)}
			<PreviewCardPrimitive.Positioner
				disableAnchorTracking={disableAnchorTracking}
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				arrowPadding={arrowPadding}
				anchor={anchor}
				collisionAvoidance={collisionAvoidance}
				collisionBoundary={collisionBoundary}
				collisionPadding={collisionPadding}
				sticky={sticky}
				positionMethod={positionMethod}
				className="isolate z-50"
				{...positionerProps}>
				<PreviewCardPrimitive.Popup
					data-slot="preview-card-content"
					className={cn(popoverContentVariants(), className)}
					{...props}>
					<PreviewCardPrimitive.Arrow className={'popup-arrow'}>
						<PopupArrowSvg />
					</PreviewCardPrimitive.Arrow>
					{children}
				</PreviewCardPrimitive.Popup>
			</PreviewCardPrimitive.Positioner>
		</PreviewCardPrimitive.Portal>
	);
};

type PreviewCardCompound = typeof PreviewCard & {
	Trigger: typeof PreviewCardTrigger;
	Content: typeof PreviewCardContent;
};

const PreviewCardCompoundExport = Object.assign(PreviewCard, {
	Trigger: PreviewCardTrigger,
	Content: PreviewCardContent,
}) as PreviewCardCompound;

export { PreviewCardCompoundExport as PreviewCard, PreviewCardTrigger, PreviewCardContent };
