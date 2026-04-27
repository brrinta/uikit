import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch, switchVariants } from '@uikit/ui/switch';
import { prepareArgTypes } from '@uikit/lib/utils';

const meta: Meta<typeof Switch> = {
	title: 'Components/Switch',
	component: Switch,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: prepareArgTypes(switchVariants),
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const SwitchPreview: Story = {
	render: Switch,
	args: {
		size: 'md',
		shape: 'pill',
	},
};

export const SwitchWithLabel: Story = {
	render: Switch,
	args: {
		label: 'Enable notifications',
		size: 'md',
	},
};

export const SwitchSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Switch
				size="sm"
				label="Small"
			/>
			<Switch
				size="md"
				label="Medium"
			/>
			<Switch
				size="lg"
				label="Large"
			/>
			<Switch
				size="xl"
				label="Extra Large"
			/>
		</div>
	),
};

export const SwitchSquare: Story = {
	render: Switch,
	args: {
		shape: 'square',
		size: 'md',
		label: 'Square switch',
	},
};

export const SwitchWithThumbLabel: Story = {
	render: Switch,
	args: {
		thumbLabel: <span className="text-[10px] font-bold">ON</span>,
		size: 'lg',
	},
};

export const SwitchWithOnOffLabels: Story = {
	render: (props) => (
		<div className="flex flex-col gap-4">
			<div className="space-y-2">
				<p className="text-sm font-medium">Standard (Colorful ON)</p>
				<Switch
					{...props}
					onLabel="ON"
					offLabel="OFF"
					className="w-20"
				/>
			</div>
			<div className="space-y-2">
				<p className="text-sm font-medium">Permanent (Gray background)</p>
				<Switch
					{...props}
					permanent
					onLabel="Active"
					offLabel="Inactive"
					className="w-32"
					shape="square"
				/>
			</div>
			<div className="space-y-2">
				<p className="text-sm font-medium">Wide (e.g. Website Price)</p>
				<Switch
					{...props}
					onLabel="Included"
					offLabel="Excluded"
					className="w-36"
					shape="square"
				/>
			</div>
		</div>
	),
	args: {
		size: 'lg',
	},
};
