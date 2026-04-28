import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, buttonVariants } from '../ui/button';
import { prepareArgTypes } from '../lib/utils';

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(buttonVariants),
	subcomponents: {
		ButtonArrow: Button.Arrow,
	},
};
export default meta;

type Story = StoryObj<typeof Button>;

export const ButtonPreview: Story = {
	render: Button,
	args: {
		children: 'Click me',
		variant: 'primary',
		appearance: 'default',
		size: 'md',
	},
};

export const ButtonArrow: Story = {
	render: (props) => (
		<Button {...props}>
			<div className={'grow min-w-80'} />
			<Button.Arrow />
		</Button>
	),
	args: {
		variant: 'outline',
		size: 'md',
		mode: 'input',
		appearance: 'default',
	},
};
