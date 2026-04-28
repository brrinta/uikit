import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, accordionRootVariants } from '../ui/accordion';
import { prepareArgTypes } from '../lib/utils';

const meta: Meta<typeof Accordion> = {
	title: 'UI/Accordion',
	component: Accordion,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(accordionRootVariants),
	subcomponents: {
		AccordionItem: Accordion.Item,
		AccordionTrigger: Accordion.Trigger,
		AccordionPanel: Accordion.Panel,
	},
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const AccordionPreview: Story = {
	render: (props) => (
		<Accordion
			{...props}
			className="w-80">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
				<Accordion.Panel>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Is it styled?</Accordion.Trigger>
				<Accordion.Panel>Yes. It comes with default styles that match the other components.</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>Is it animated?</Accordion.Trigger>
				<Accordion.Panel>Yes. It's animated by default with smooth transitions.</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	),
	args: {
		variant: 'default',
	},
};

export const AccordionOutline: Story = {
	render: (props) => (
		<Accordion
			{...props}
			className="w-80">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>First Item</Accordion.Trigger>
				<Accordion.Panel>Content for the first item.</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Second Item</Accordion.Trigger>
				<Accordion.Panel>Content for the second item.</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	),
	args: {
		variant: 'outline',
	},
};

export const AccordionSolid: Story = {
	render: (props) => (
		<Accordion
			{...props}
			className="w-80">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>First Item</Accordion.Trigger>
				<Accordion.Panel>Content for the first item.</Accordion.Panel>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Second Item</Accordion.Trigger>
				<Accordion.Panel>Content for the second item.</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	),
	args: {
		variant: 'solid',
	},
};
