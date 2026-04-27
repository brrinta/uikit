import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, inputVariants } from '../ui/input';
import { prepareArgTypes } from '../lib/utils';
import { SearchIcon } from 'lucide-react';

const meta: Meta<typeof Input> = {
	title: 'Components/Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(inputVariants),
};
export default meta;

type Story = StoryObj<typeof Input>;

export const InputPreview: Story = {
	render: (args) => <Input {...args} />,
	args: {
		placeholder: 'Enter text...',
	},
};

export const InputWithSection: Story = {
	render: (props) => (
		<Input.Group>
			<Input.Addon>
				<SearchIcon />
			</Input.Addon>
			<Input {...(props as any)} />
		</Input.Group>
	),
	args: {
		placeholder: 'Search...',
	},
};

export const InputOutlined: Story = {
	render: (args) => <Input {...args} />,
	args: {
		placeholder: 'Outlined input',
	},
};

export const InputUnderlined: Story = {
	render: (args) => <Input {...args} />,
	args: {
		placeholder: 'Underlined input',
	},
};
