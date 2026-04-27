import * as React from 'react';
import { cn } from '../lib/utils';

export interface AffixProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Fixed position from the viewport edges.
	 * @default { bottom: 0, right: 0 }
	 */
	position?: {
		top?: string | number;
		left?: string | number;
		bottom?: string | number;
		right?: string | number;
	};
	/**
	 * Z-index of the affix
	 * @default 100
	 */
	zIndex?: number;
}

const Affix = React.forwardRef<HTMLDivElement, AffixProps>(
	({ className, position = { bottom: 20, right: 20 }, zIndex = 100, style, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('fixed z-50', className)}
				style={{
					...style,
					zIndex,
					top: position.top,
					left: position.left,
					bottom: position.bottom,
					right: position.right,
				}}
				{...props}
			/>
		);
	},
);
Affix.displayName = 'Affix';

export { Affix };
