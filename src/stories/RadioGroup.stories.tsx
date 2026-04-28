import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup, RadioGroupItem } from '../ui/radio';

const meta: Meta<typeof RadioGroup> = {
	title: 'UI/RadioGroup',
	component: RadioGroup,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const RadioGroupPreview: Story = {
	render: () => (
		<RadioGroup defaultValue="option-1">
			<RadioGroupItem
				value="option-1"
				label="Option 1"
			/>
			<RadioGroupItem
				value="option-2"
				label="Option 2"
			/>
			<RadioGroupItem
				value="option-3"
				label="Option 3"
			/>
		</RadioGroup>
	),
};

export const RadioGroupWithDescription: Story = {
	render: () => (
		<RadioGroup defaultValue="comfortable">
			<RadioGroupItem
				value="default"
				label="Default"
				description="The default system setting"
			/>
			<RadioGroupItem
				value="comfortable"
				label="Comfortable"
				description="More space between items"
			/>
			<RadioGroupItem
				value="compact"
				label="Compact"
				description="Less space between items"
			/>
		</RadioGroup>
	),
};

export const RadioGroupHorizontal: Story = {
	render: () => (
		<RadioGroup
			defaultValue="sm"
			className="flex flex-row gap-4">
			<RadioGroupItem
				value="sm"
				label="Small"
			/>
			<RadioGroupItem
				value="md"
				label="Medium"
			/>
			<RadioGroupItem
				value="lg"
				label="Large"
			/>
		</RadioGroup>
	),
};

export const RadioGroupDisabled: Story = {
	render: () => (
		<RadioGroup defaultValue="option-1">
			<RadioGroupItem
				value="option-1"
				label="Enabled"
			/>
			<RadioGroupItem
				value="option-2"
				label="Disabled"
				disabled
			/>
		</RadioGroup>
	),
};
