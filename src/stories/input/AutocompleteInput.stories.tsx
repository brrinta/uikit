import type { Meta, StoryObj } from '@storybook/react-vite';
import { AutocompleteInput } from '../../ui/autocomplete-input';
import { useState } from 'react';
import { fieldVariants } from '../../ui/field';
import { prepareArgTypes } from '../../lib/utils';

const meta: Meta<typeof AutocompleteInput> = {
	title: 'Components/Input/Autocomplete',
	component: AutocompleteInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(fieldVariants),
};
export default meta;

type Story = StoryObj<typeof AutocompleteInput>;

const fruits = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango', 'Strawberry', 'Blueberry', 'Pineapple'];

const fruitItems = fruits.map((fruit) => ({
	value: fruit,
	label: fruit,
	description: `Delicious ${fruit}`,
}));

export const AutocompleteInputPreview: Story = {
	render: function AutocompleteInputStory(props) {
		const [value, setValue] = useState<string>('');
		return (
			<div className="w-72">
				<AutocompleteInput
					{...props}
					value={value}
					onValueChange={setValue}
					onSelectValue={(item, val) => {
						console.log('onSelect fired:', item, val);
					}}
				/>
				<div className="mt-4 text-sm font-mono bg-muted p-2 rounded">
					Selected value: {JSON.stringify(value)} ({typeof value})
				</div>
			</div>
		);
	},
	args: {
		label: 'Fruit',
		description: 'Search for a fruit or type your own',
		placeholder: 'Select a fruit...',
		items: fruitItems,
	},
};

export const AutocompleteWithOnSelect: Story = {
	render: function AutocompleteOnSelectStory(props) {
		const [value, setValue] = useState<any>('');
		const [lastSelected, setLastSelected] = useState<any>(null);
		return (
			<div className="w-72">
				<AutocompleteInput
					{...props}
					value={value}
					onValueChange={(val) => setValue(val)}
					onSelectValue={(item, val) => {
						console.log('onSelect fired:', item, val);
						setLastSelected({ item, val });
					}}
				/>
				<div className="mt-4 text-sm font-mono bg-muted p-2 rounded whitespace-pre-wrap">
					Last onSelect: {lastSelected ? JSON.stringify(lastSelected, null, 2) : 'None'}
				</div>
			</div>
		);
	},
	args: {
		label: 'Fruit (with onSelect)',
		description: 'Check console or the box below for onSelect data',
		placeholder: 'Select a fruit...',
		items: fruitItems,
	},
};
