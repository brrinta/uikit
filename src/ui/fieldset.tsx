'use client';

import * as React from 'react';
import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset';
import { cn } from '@uikit/lib/utils';

export type FieldsetProps = React.ComponentProps<typeof FieldsetPrimitive.Root> & { invalid?: boolean };
function Fieldset({ className, ...props }: FieldsetProps) {
	return (
		<FieldsetPrimitive.Root
			data-slot="fieldset"
			data-invalid={props.invalid}
			className={cn('space-y-4', className)}
			{...props}
		/>
	);
}

function FieldsetLegend({ className, ...props }: React.ComponentProps<typeof FieldsetPrimitive.Legend>) {
	return (
		<FieldsetPrimitive.Legend
			data-slot="fieldset-legend"
			className={cn('text-sm font-medium leading-none tracking-tight text-foreground', className)}
			{...props}
		/>
	);
}

type CompoundFieldset = typeof Fieldset & {
	Legend: typeof FieldsetLegend;
};

const FieldsetComponent = Fieldset as CompoundFieldset;
FieldsetComponent.Legend = FieldsetLegend;

export { FieldsetComponent as Fieldset, FieldsetLegend };
