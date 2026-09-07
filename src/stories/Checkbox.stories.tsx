import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heart } from 'lucide-react';
import * as React from 'react';
import { Checkbox, checkboxColors, checkboxVariants, type CheckboxColor } from '../ui/checkbox';
import { getCvaSchema, prepareArgTypes } from '../lib/utils';

const schema = getCvaSchema(checkboxVariants);
const sizes = schema.size as Array<'sm' | 'md' | 'lg'>;
const colors = Object.keys(checkboxColors) as CheckboxColor[];

const meta: Meta<typeof Checkbox> = {
	title: 'UI/Checkbox',
	component: Checkbox,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: prepareArgTypes(checkboxVariants, {
		disabled: { control: 'boolean' },
		label: { control: 'text' },
	}),
	args: { size: 'md', color: 'primary' },
	subcomponents: { 'Checkbox.Group': Checkbox.Group },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = { args: { defaultChecked: true, label: 'Accept terms' } };

export const States: Story = {
	render: (args) => (
		<div className="flex flex-col gap-3">
			<Checkbox {...args} label="Unchecked" />
			<Checkbox {...args} defaultChecked label="Checked" />
			<Checkbox {...args} indeterminate label="Indeterminate" />
			<Checkbox {...args} disabled label="Disabled" />
			<Checkbox {...args} disabled defaultChecked label="Disabled checked" />
		</div>
	),
};

export const Sizes: Story = {
	render: (args) => (
		<div className="flex items-center gap-4">
			{sizes.map((size) => (
				<Checkbox key={size} {...args} size={size} defaultChecked label={size} />
			))}
		</div>
	),
};

export const Colors: Story = {
	parameters: { layout: 'padded' },
	render: (args) => (
		<div className="grid grid-cols-3 gap-3 md:grid-cols-5">
			{colors.map((color) => (
				<Checkbox key={color} {...args} color={color} defaultChecked label={color} />
			))}
		</div>
	),
};

export const CustomIcon: Story = {
	render: (args) => <Checkbox {...args} defaultChecked icon={<Heart className="size-3 fill-current" />} label="Favorite" />,
};

export const Group: Story = {
	render: (args) => (
		<Checkbox.Group defaultValue={['email']} aria-label="Notification channels">
			<Checkbox {...args} name="email" value="email" label="Email" />
			<Checkbox {...args} name="sms" value="sms" label="SMS" />
			<Checkbox {...args} name="push" value="push" label="Push notifications" />
		</Checkbox.Group>
	),
};

export const Controlled: Story = {
	render: (args) => {
		const [checked, setChecked] = React.useState<boolean>(false);
		return (
			<div className="flex flex-col items-start gap-2">
				<Checkbox {...args} checked={checked} onCheckedChange={(v) => setChecked(Boolean(v))} label="Subscribe" />
				<p className="text-xs text-muted-foreground">Value: {String(checked)}</p>
			</div>
		);
	},
};

export const Invalid: Story = {
	render: (args) => <Checkbox {...args} aria-invalid label="Required checkbox" />,
};
