import type { Meta, StoryObj } from '@storybook/react-vite';
import { fieldVariants } from '../../ui/field';
import { prepareArgTypes } from '../../lib/utils';
import { SelectInput } from '../../ui/select-input';
import { AppleIcon, BananaIcon } from 'lucide-react';

const meta: Meta<typeof SelectInput> = {
	title: 'UI/Input/Select',
	component: SelectInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(fieldVariants),
};
export default meta;

type Story = StoryObj<typeof SelectInput>;

export const SelectInputPreview: Story = {
	render: (props) => {
		return (
			<SelectInput
				{...props}
				className="min-w-120"
				onValueChange={(v) => {
					console.log(v);
				}}
			/>
		);
	},
	args: {
		label: 'Select Fruit',
		orientation: 'vertical',
		size: 'md',
		description: 'Simple Description',
		variant: 'default',
		invalid: false,
		disabled: false,
		required: true,
		multiple: false,
		placeholder: 'Select a fruit',
		items: [
			{
				value: {
					id: 1,
					name: 'Apple',
				},
				label: (
					<div className={'flex flex-row gap-2'}>
						<AppleIcon /> Apple
					</div>
				),
			},
			{
				value: {
					id: 2,
					name: 'Banana',
				},
				label: (
					<div className={'flex flex-row gap-2'}>
						<BananaIcon /> Banana
					</div>
				),
			},
		],
	},
};

export const MultipleSelectModes: Story = {
	render: (props) => (
		<div className="flex flex-col gap-8 min-w-120">
			<SelectInput
				{...props}
				label="Multiple (More mode - Default)"
				multipleValueMode="more"
			/>
			<SelectInput
				{...props}
				label="Multiple (Comma mode)"
				multipleValueMode="comma"
			/>
			<SelectInput
				{...props}
				label="Multiple (Chips mode)"
				multipleValueMode="chips"
			/>
		</div>
	),
	args: {
		...SelectInputPreview.args,
		multiple: true,
		placeholder: 'Select fruits',
	},
};

export const CleanableAndDeselectable: Story = {
	args: {
		...SelectInputPreview.args,
		clearable: true,
		deselectable: true,
		placeholder: 'Try clearing or deselecting',
	},
};

export const MultipleWithLimit: Story = {
	render: (props) => (
		<div className="flex flex-col gap-8 min-w-120">
			<SelectInput
				{...props}
				label="Multiple (Limit 2)"
				multipleValueLimit={2}
			/>
			<SelectInput
				{...props}
				label="Multiple (Limit 5)"
				multipleValueLimit={5}
			/>
		</div>
	),
	args: {
		...SelectInputPreview.args,
		multiple: true,
		placeholder: 'Select multiple fruits',
		items: [
			{ value: 'apple', label: 'Apple' },
			{ value: 'banana', label: 'Banana' },
			{ value: 'cherry', label: 'Cherry' },
			{ value: 'date', label: 'Date' },
			{ value: 'elderberry', label: 'Elderberry' },
			{ value: 'fig', label: 'Fig' },
			{ value: 'grape', label: 'Grape' },
			{ value: 'honeydew', label: 'Honeydew' },
		],
		defaultValue: ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape'],
	},
};
