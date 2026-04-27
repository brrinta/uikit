import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from '@uikit/ui/combobox';
import * as React from 'react';

const items = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' },
	{ value: 'carrot', label: 'Carrot' },
	{ value: 'broccoli', label: 'Broccoli' },
];

const meta: Meta<typeof Combobox> = {
	title: 'Components/Combobox',
	component: Combobox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		ComboboxInput: Combobox.Input,
		ComboboxTrigger: Combobox.Trigger,
		ComboboxContent: Combobox.Content,
		ComboboxItem: Combobox.Item,
		ComboboxGroup: Combobox.Group,
		ComboboxGroupLabel: Combobox.GroupLabel,
		ComboboxClear: Combobox.Clear,
	},
};
export default meta;

type Story = StoryObj<typeof Combobox>;

export const ComboboxPreview: Story = {
	render: () => (
		<Combobox items={items}>
			<Combobox.Control
				className={'min-w-120'}
				appearance={'ghost'}>
				<Combobox.Input placeholder="Select fruit..." />
				<Combobox.ActionWrapper>
					<Combobox.Clear />
					<Combobox.Trigger />
				</Combobox.ActionWrapper>
			</Combobox.Control>
			<Combobox.Content>
				{(item) => (
					<Combobox.Item
						key={item.value}
						value={item.value}>
						{item.label}
					</Combobox.Item>
				)}
			</Combobox.Content>
		</Combobox>
	),
};

export const ComboboxWithGroups: Story = {
	render: () => (
		<div className="w-72">
			<Combobox>
				<div className="relative flex items-center">
					<Combobox.Input placeholder="Select fruit or vegetable..." />
					<Combobox.Trigger className="absolute right-1 h-8 w-8 p-0" />
				</div>
				<Combobox.Content>
					<Combobox.Group>
						<Combobox.GroupLabel>Fruits</Combobox.GroupLabel>
						<Combobox.Item value="apple">Apple</Combobox.Item>
						<Combobox.Item value="banana">Banana</Combobox.Item>
					</Combobox.Group>
					<Combobox.Separator />
					<Combobox.Group>
						<Combobox.GroupLabel>Vegetables</Combobox.GroupLabel>
						<Combobox.Item value="carrot">Carrot</Combobox.Item>
						<Combobox.Item value="broccoli">Broccoli</Combobox.Item>
					</Combobox.Group>
				</Combobox.Content>
			</Combobox>
		</div>
	),
};

export const ComboboxWithClear: Story = {
	render: () => (
		<div className="w-72">
			<Combobox defaultValue="apple">
				<div className="relative flex items-center">
					<Combobox.Input placeholder="Select fruit..." />
					<div className="absolute right-1 flex items-center gap-1">
						<Combobox.Clear />
						<Combobox.Trigger className="h-8 w-8 p-0" />
					</div>
				</div>
				<Combobox.Content>
					<Combobox.Item value="apple">Apple</Combobox.Item>
					<Combobox.Item value="banana">Banana</Combobox.Item>
					<Combobox.Item value="orange">Orange</Combobox.Item>
				</Combobox.Content>
			</Combobox>
		</div>
	),
};

export const ComboboxMultiple: Story = {
	render: () => (
		<div className="w-72">
			<Combobox
				multiple
				defaultValue={['apple', 'banana']}>
				<div className="relative flex items-center">
					<Combobox.Input placeholder="Select fruits..." />
					<Combobox.Trigger className="absolute right-1 h-8 w-8 p-0" />
				</div>
				<Combobox.Content>
					<Combobox.Item value="apple">Apple</Combobox.Item>
					<Combobox.Item value="banana">Banana</Combobox.Item>
					<Combobox.Item value="orange">Orange</Combobox.Item>
					<Combobox.Item value="grape">Grape</Combobox.Item>
				</Combobox.Content>
			</Combobox>
		</div>
	),
};
