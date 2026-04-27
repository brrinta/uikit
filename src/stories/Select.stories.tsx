import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '../ui/select';

const meta: Meta<typeof Select> = {
	title: 'Components/Select',
	component: Select,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		SelectTrigger: Select.Trigger,
		SelectValue: Select.Value,
		SelectContent: Select.Content,
		SelectItem: Select.Item,
		SelectGroup: Select.Group,
		SelectGroupLabel: Select.GroupLabel,
	},
};
export default meta;

type Story = StoryObj<typeof Select>;

export const SelectPreview: Story = {
	render: () => (
		<Select defaultValue="apple">
			<Select.Trigger className="w-48">
				<Select.Value />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="apple">Apple</Select.Item>
				<Select.Item value="banana">Banana</Select.Item>
				<Select.Item value="orange">Orange</Select.Item>
				<Select.Item value="grape">Grape</Select.Item>
			</Select.Content>
		</Select>
	),
};

export const SelectWithGroups: Story = {
	render: () => (
		<Select>
			<Select.Trigger className="w-48">
				<Select.Value />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.GroupLabel>Fruits</Select.GroupLabel>
					<Select.Item value="apple">Apple</Select.Item>
					<Select.Item value="banana">Banana</Select.Item>
				</Select.Group>
				<Select.Group>
					<Select.GroupLabel>Vegetables</Select.GroupLabel>
					<Select.Item value="carrot">Carrot</Select.Item>
					<Select.Item value="broccoli">Broccoli</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select>
	),
};

export const SelectDisabled: Story = {
	render: () => (
		<Select disabled>
			<Select.Trigger className="w-48">
				<Select.Value />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="option">Option</Select.Item>
			</Select.Content>
		</Select>
	),
};
