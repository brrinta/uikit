import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Switch, switchColors, switchVariants, type SwitchColor } from '../ui/switch';
import { getCvaSchema, prepareArgTypes } from '../lib/utils';

const schema = getCvaSchema(switchVariants);
const sizes = schema.size as Array<'sm' | 'md' | 'lg' | 'xl'>;
const shapes = schema.shape as Array<'pill' | 'square'>;
const colors = Object.keys(switchColors) as SwitchColor[];

const meta: Meta<typeof Switch> = {
	title: 'UI/Switch',
	component: Switch,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: prepareArgTypes(switchVariants, {
		disabled: { control: 'boolean' },
		label: { control: 'text' },
	}),
	args: { shape: 'pill', size: 'md', color: 'primary' },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Playground: Story = { args: { defaultChecked: true, label: 'Notifications' } };

export const States: Story = {
	render: (args) => (
		<div className="flex flex-col items-start gap-3">
			<Switch {...args} label="Off" />
			<Switch {...args} defaultChecked label="On" />
			<Switch {...args} disabled label="Disabled off" />
			<Switch {...args} disabled defaultChecked label="Disabled on" />
			<Switch {...args} aria-invalid label="Invalid" />
		</div>
	),
};

export const Sizes: Story = {
	render: (args) => (
		<div className="flex items-center gap-5">
			{sizes.map((size) => (
				<Switch key={size} {...args} size={size} defaultChecked label={size} />
			))}
		</div>
	),
};

export const Shapes: Story = {
	render: (args) => (
		<div className="flex items-center gap-5">
			{shapes.map((shape) => (
				<Switch key={shape} {...args} shape={shape} defaultChecked label={shape} />
			))}
		</div>
	),
};

export const Colors: Story = {
	parameters: { layout: 'padded' },
	render: (args) => (
		<div className="grid grid-cols-3 gap-3 md:grid-cols-5">
			{colors.map((color) => (
				<Switch key={color} {...args} color={color} defaultChecked label={color} />
			))}
		</div>
	),
};

export const OnOffLabels: Story = {
	render: (args) => (
		<div className="flex flex-col items-start gap-3">
			<Switch {...args} size="lg" onLabel="On" offLabel="Off" defaultChecked />
			<Switch {...args} size="lg" onLabel="I" offLabel="O" shape="square" />
			<Switch {...args} size="xl" permanent onLabel="Live" offLabel="Draft" color="success" defaultChecked />
		</div>
	),
};

export const ThumbLabel: Story = {
	render: (args) => <Switch {...args} size="lg" thumbLabel={<span className="text-[10px] font-bold">A</span>} defaultChecked />,
};

export const Controlled: Story = {
	render: (args) => {
		const [checked, setChecked] = React.useState(false);
		return (
			<div className="flex flex-col items-start gap-2">
				<Switch {...args} checked={checked} onCheckedChange={setChecked} label="Autosave" />
				<p className="text-xs text-muted-foreground">Value: {String(checked)}</p>
			</div>
		);
	},
};
