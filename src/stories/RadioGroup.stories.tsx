import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { RadioGroup, radioColors, radioGroupItemVariants, type RadioColor } from '../ui/radio';
import { getCvaSchema, prepareArgTypes } from '../lib/utils';

const schema = getCvaSchema(radioGroupItemVariants);
const sizes = schema.size as Array<'sm' | 'md' | 'lg'>;
const colors = Object.keys(radioColors) as RadioColor[];

const meta: Meta<typeof RadioGroup> = {
	title: 'UI/RadioGroup',
	component: RadioGroup,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: prepareArgTypes(radioGroupItemVariants),
	subcomponents: { 'RadioGroup.Item': RadioGroup.Item },
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
	render: () => (
		<RadioGroup defaultValue="comfortable">
			<RadioGroup.Item value="default" label="Default" />
			<RadioGroup.Item value="comfortable" label="Comfortable" />
			<RadioGroup.Item value="compact" label="Compact" />
		</RadioGroup>
	),
};

export const WithDescriptions: Story = {
	render: () => (
		<RadioGroup defaultValue="startup" className="max-w-sm">
			<RadioGroup.Item value="startup" label="Startup" description="Best for small teams getting off the ground." />
			<RadioGroup.Item value="business" label="Business" description="For growing teams that need advanced controls." />
			<RadioGroup.Item value="enterprise" label="Enterprise" description="Custom contracts, SSO and dedicated support." />
		</RadioGroup>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex gap-10">
			{sizes.map((size) => (
				<RadioGroup key={size} defaultValue="a">
					<RadioGroup.Item size={size} value="a" label={`${size} A`} />
					<RadioGroup.Item size={size} value="b" label={`${size} B`} />
				</RadioGroup>
			))}
		</div>
	),
};

export const Colors: Story = {
	parameters: { layout: 'padded' },
	render: () => (
		<div className="grid grid-cols-3 gap-3 md:grid-cols-5">
			{colors.map((color) => (
				<RadioGroup key={color} defaultValue={color}>
					<RadioGroup.Item color={color} value={color} label={color} />
				</RadioGroup>
			))}
		</div>
	),
};

export const Horizontal: Story = {
	render: () => (
		<RadioGroup defaultValue="s" orientation="horizontal" aria-label="Size">
			{['xs', 's', 'm', 'l', 'xl'].map((v) => (
				<RadioGroup.Item key={v} value={v} label={v.toUpperCase()} />
			))}
		</RadioGroup>
	),
};

export const DisabledStates: Story = {
	render: () => (
		<div className="flex gap-10">
			<RadioGroup defaultValue="a" disabled aria-label="Disabled group">
				<RadioGroup.Item value="a" label="Whole group disabled" />
				<RadioGroup.Item value="b" label="Second option" />
			</RadioGroup>
			<RadioGroup defaultValue="a" aria-label="One disabled">
				<RadioGroup.Item value="a" label="Enabled" />
				<RadioGroup.Item value="b" disabled label="Single item disabled" />
			</RadioGroup>
		</div>
	),
};

export const CustomIcon: Story = {
	render: () => (
		<RadioGroup defaultValue="on">
			<RadioGroup.Item
				value="on"
				label="Custom dot"
				icon={({ className }) => <span className={className}><span className="absolute inset-[28%] rounded-full bg-current" /></span>}
			/>
			<RadioGroup.Item value="off" label="Default icon" />
		</RadioGroup>
	),
};

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = React.useState<unknown>('b');
		return (
			<div className="flex flex-col gap-2">
				<RadioGroup value={value} onValueChange={setValue}>
					<RadioGroup.Item value="a" label="Option A" />
					<RadioGroup.Item value="b" label="Option B" />
				</RadioGroup>
				<p className="text-xs text-muted-foreground">Selected: {String(value)}</p>
			</div>
		);
	},
};
