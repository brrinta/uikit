import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import { type VariantProps } from 'class-variance-authority';
import { cn, cvaWithMeta } from '@uikit/lib/utils';
import { ReactNode } from 'react';

export const separatorVariants = cvaWithMeta(
	`bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full
	data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px`,
	{ variants: {}, defaultVariants: {} },
);

function Separator({ className, orientation = 'horizontal', ...props }: SeparatorPrimitive.Props & VariantProps<typeof separatorVariants>) {
	return (
		<SeparatorPrimitive
			data-slot="separator"
			orientation={orientation}
			className={cn(separatorVariants(), className)}
			{...props}
		/>
	);
}

export const separatorWithLabelVariants = cvaWithMeta('relative flex items-center gap-2', {
	variants: {
		variant: {
			left: '',
			right: '',
			center: '',
			brand: '**:data-[id=seperator/1]:max-w-7.5',
		},
	},
	defaultVariants: {},
});

function SeparatorWithLabel({
	className,
	label,
	variant,
	...props
}: React.ComponentProps<'div'> & {
	label?: ReactNode;
} & VariantProps<typeof separatorWithLabelVariants>) {
	return (
		<div
			className={cn('w-full grow', className)}
			{...props}>
			<div className={cn(separatorWithLabelVariants({ variant }))}>
				<Separator
					className="flex-1"
					data-id={'seperator/1'}
				/>
				<span
					className="shrink-0 px-2 text-muted-foreground text-xs"
					data-id={'seperator/text'}>
					{label}
				</span>
				<Separator
					className="flex-1"
					data-id={'seperator/2'}
				/>
			</div>
		</div>
	);
}

export { Separator, SeparatorWithLabel };
