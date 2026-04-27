import { cn } from '@uikit/lib/utils';
import { useUikitProvider } from '@uikit/hooks/provider';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;
type TitleProps = useRender.ComponentProps<'h1'> & { order?: TitleOrder };

const Title = ({ children, className, render, order, ...props }: TitleProps) => {
	const { prefix } = useUikitProvider();
	return useRender({
		defaultTagName: `h${order || 1}`,
		render,
		state: { slot: 'title' },
		props: mergeProps(
			{
				className: cn(`${prefix}-title font-semibold`, className),
				children,
			},
			props,
		),
	});
};

Title.displayName = 'UikitTitle';
export { Title };
export type { TitleProps };
