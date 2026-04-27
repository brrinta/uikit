import type { Meta, StoryObj } from '@storybook/react-vite';
import { fieldVariants } from '../../ui/field';
import { prepareArgTypes } from '../../lib/utils';
import { ComboboxInput } from '../../ui/combobox-input';
import { Badge } from '../../ui/badge';

const meta: Meta<typeof ComboboxInput> = {
	title: 'Components/Input/Combobox',
	component: ComboboxInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(fieldVariants),
};
export default meta;
type Item = {
	id: number;
	opposite: string;
	name: string;
};

type Story = StoryObj<typeof ComboboxInput<Item>>;

export const ComboboxInputPreview: Story = {
	render: (props) => {
		return (
			<ComboboxInput<Item>
				{...props}
				newItemBuilder={(v: any) => ({
					_id: v,
					label: v,
					value: { id: -1, name: v, opposite: v },
					description: 'Newly created item',
					__NEW__: true,
				})}
				onNewItemCreated={(ni) => {
					console.log(ni);
				}}
				itemToStringLabel={(b) => b.value.name}
				className="w-80"
			/>
		);
	},
	args: {
		label: 'Select Fruit',
		orientation: 'vertical',
		size: 'md',
		description: 'Simple Description',
		valueKey: '_id',
		variant: 'default',
		invalid: false,
		disabled: false,
		required: true,
		multiple: false,
		clearable: true,
		creatable: true,
		placeholder: 'Select a fruit',
		defaultValue: 'Blackberry',
		items: [
			'Apple',
			'Banana',
			'Orange',
			'Pineapple',
			'Grape',
			'Mango',
			'Strawberry',
			'Blueberry',
			'Raspberry',
			'Blackberry',
			'Cherry',
			'Peach',
			'Pear',
			'Plum',
			'Kiwi',
			'Watermelon',
			'Cantaloupe',
			'Honeydew',
			'Papaya',
			'Guava',
			'Lychee',
			'Pomegranate',
			'Apricot',
			'Grapefruit',
			'Passionfruit',
		].map((item, i, array) => ({
			label: <span className={'text-destructive'}>{item}</span>,
			value: { opposite: array[Math.abs(i - (array.length - 1))], id: i, name: item },
			_id: item,
			description: `${item} ${array[Math.abs(i - (array.length - 1))]} description`,
			disabled: item === 'Grape',
			badge: <Badge size={'xs'}>{i}</Badge>,
		})),
	},
};

export const ComboboxInputCreatable: Story = {
	...ComboboxInputPreview,
	args: {
		...ComboboxInputPreview.args,
		label: 'Select or Create Fruit',
		creatable: true,
		defaultValue: undefined,
	},
};

export const MultipleValueModes: Story = {
	render: (props) => {
		return (
			<div className="flex flex-col gap-8 w-80">
				<ComboboxInput
					{...props}
					label="Chips Mode (Default)"
					multipleValueMode="chips"
					multiple
					defaultValue={['Apple', 'Banana', 'Orange']}
				/>
				<ComboboxInput
					{...props}
					label="Comma Mode"
					multipleValueMode="comma"
					multiple
					defaultValue={['Apple', 'Banana', 'Orange']}
				/>
				<ComboboxInput
					{...props}
					label="More Mode (Limit 2)"
					multipleValueMode="more"
					multipleValueLimit={2}
					multiple
					defaultValue={['Apple', 'Banana', 'Orange', 'Pineapple']}
				/>
			</div>
		);
	},
	args: {
		...ComboboxInputPreview.args,
		creatable: false,
	},
};

export const ComplexLabels: Story = {
	render: (props) => {
		return (
			<div className="flex flex-col gap-8 w-150">
				<ComboboxInput
					{...props}
					label="Complex Labels More Mode"
					multipleValueMode="more"
					multipleValueLimit={4}
					multiple
					defaultValue={['Apple', 'Banana', 'Orange', 'Pineapple', 'Grape']}
				/>
			</div>
		);
	},
	args: {
		...ComboboxInputPreview.args,
		creatable: false,
		items: ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grape'].map((item, i) => ({
			_id: item,
			value: item,
			label: (
				<div className="flex flex-row items-center gap-2 border p-1 rounded">
					<span className="font-bold">{item}</span>
					<Badge
						variant="secondary"
						size="xs">
						Fruit {i}
					</Badge>
				</div>
			),
		})),
	},
};
