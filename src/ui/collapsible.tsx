import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import { cn } from '../lib/utils';

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
	return (
		<CollapsiblePrimitive.Root
			data-slot="collapsible"
			{...props}
		/>
	);
}

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
	return (
		<CollapsiblePrimitive.Trigger
			data-slot="collapsible-trigger"
			{...props}
		/>
	);
}

function CollapsibleContent({ className, ...props }: CollapsiblePrimitive.Panel.Props) {
	return (
		<CollapsiblePrimitive.Panel
			data-slot="collapsible-content"
			className={cn(
				'overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
				className,
			)}
			{...props}
		/>
	);
}

type CompoundCollapsible = typeof Collapsible & {
	Trigger: typeof CollapsibleTrigger;
	Content: typeof CollapsibleContent;
};

const CollapsibleComponent = Collapsible as CompoundCollapsible;
CollapsibleComponent.Trigger = CollapsibleTrigger;
CollapsibleComponent.Content = CollapsibleContent;

export { CollapsibleComponent as Collapsible, CollapsibleContent, CollapsibleTrigger };
