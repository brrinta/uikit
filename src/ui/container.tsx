import * as React from 'react';
import { cn } from '@uikit/lib/utils';
import { useUikitProvider } from '@uikit/hooks/provider';
import { useRouterState } from '@tanstack/react-router';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';
import { LoadingOverlay } from '@uikit/ui/loading';
import { cardVariants } from '@uikit/ui/card';

type ContainerProps = {
	children?: React.ReactNode;
	full?: boolean;
	fill?: boolean;
	className?: string;
	loading?: boolean;
	card?: boolean;
	xs?: boolean;
	sm?: boolean;
	md?: boolean;
	lg?: boolean;
	xl?: boolean;
	xxl?: boolean;
	huge?: boolean;
	screen?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'huge';
	row?: boolean;
	column?: boolean;
	grid?: boolean;
	routerLoading?: boolean;
} & Omit<useRender.ComponentProps<'div'>, 'children' | 'className'>;
const Container: React.FC<ContainerProps> = ({
	className,
	children,
	loading,
	screen,
	grid,
	column,
	row,
	full,
	fill,
	xs,
	sm,
	md,
	lg,
	xl,
	xxl,
	huge,
	card,
	routerLoading,
	render,
	...props
}) => {
	const { prefix } = useUikitProvider();
	const { isLoading } = useRouterState();
	const visibleLoading = !!loading || (routerLoading && isLoading) || false;
	column = column || (!row && !grid);
	const s = screen ? screen + ':' : '';

	return useRender({
		defaultTagName: 'div',
		render,
		state: {
			loading: visibleLoading,
			slot: 'container',
		},
		props: mergeProps(
			{
				className: cn(
					card ? cardVariants({ variant: 'default', className: '' }) : '',
					`${prefix}-container container relative mx-auto grow`, //for menu dropdown issue overflow-hidden removed
					{
						flex: !grid,
						grid: grid,
						'flex-col': column,
						'flex-row': row,
						'w-full max-w-full': full,
						'h-full': fill,
						'max-w-350': (!full && !xs && !sm && !md && !xl && !xxl && !huge) || lg,
						[s + 'max-w-135']: xs,
						[s + 'max-w-200']: sm,
						[s + 'max-w-300']: md,
						[s + 'max-w-450']: xl,
						[s + 'max-w-600']: xxl,
						[s + 'max-w-750']: huge,
					},
					className,
				),
				children: (
					<>
						{children}
						<LoadingOverlay open={visibleLoading} />
					</>
				),
			},
			props,
		),
	});
};
Container.displayName = 'UikitContainer';
export { Container };
export type { ContainerProps };
