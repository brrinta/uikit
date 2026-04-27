import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete } from '../ui/autocomplete';
import { useState } from 'react';

const meta: Meta<typeof Autocomplete> = {
	title: 'Components/Autocomplete',
	component: Autocomplete,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		AutocompleteControl: Autocomplete.Control,
		AutocompleteInput: Autocomplete.Input,
		AutocompleteClear: Autocomplete.Clear,
		AutocompletePopup: Autocomplete.Popup,
		AutocompleteItem: Autocomplete.Item,
	},
};
export default meta;

type Story = StoryObj<typeof Autocomplete>;

const fruits = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango', 'Strawberry', 'Blueberry', 'Pineapple'];

export const AutocompletePreview: Story = {
	render: function AutocompleteStory() {
		const [value, setValue] = useState<string>('');
		return (
			<Autocomplete
				value={value}
				onValueChange={(val) => setValue(val as string)}>
				<Autocomplete.Control className="w-64">
					<Autocomplete.Input placeholder="Select a fruit..." />
					<Autocomplete.ActionWrapper>
						<Autocomplete.Clear />
					</Autocomplete.ActionWrapper>
				</Autocomplete.Control>
				<Autocomplete.Content>
					{fruits.map((fruit) => (
						<Autocomplete.Item
							key={fruit}
							value={fruit}>
							{fruit}
						</Autocomplete.Item>
					))}
				</Autocomplete.Content>
			</Autocomplete>
		);
	},
};

export const AutocompleteWithDefault: Story = {
	render: function AutocompleteDefaultStory() {
		const [value, setValue] = useState<string>('Apple');
		return (
			<Autocomplete
				value={value}
				onValueChange={(val) => setValue(val as string)}>
				<Autocomplete.Control className="w-64">
					<Autocomplete.Input placeholder="Select a fruit..." />
					<Autocomplete.ActionWrapper>
						<Autocomplete.Clear />
					</Autocomplete.ActionWrapper>
				</Autocomplete.Control>
				<Autocomplete.Content>
					{fruits.map((fruit) => (
						<Autocomplete.Item
							key={fruit}
							value={fruit}>
							{fruit}
						</Autocomplete.Item>
					))}
				</Autocomplete.Content>
			</Autocomplete>
		);
	},
};

export const AutocompleteDisabled: Story = {
	render: () => (
		<Autocomplete disabled>
			<Autocomplete.Control className="w-64">
				<Autocomplete.Input placeholder="Disabled..." />
			</Autocomplete.Control>
			<Autocomplete.Content>
				{fruits.map((fruit) => (
					<Autocomplete.Item
						key={fruit}
						value={fruit}>
						{fruit}
					</Autocomplete.Item>
				))}
			</Autocomplete.Content>
		</Autocomplete>
	),
};
