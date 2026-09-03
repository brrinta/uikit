import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Meter, meterVariants } from '../ui/meter';
import { getCvaSchema, prepareArgTypes } from '../lib/utils';

const schema = getCvaSchema(meterVariants);

const meta: Meta<typeof Meter> = {
	title: 'UI/Meter',
	component: Meter,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: prepareArgTypes(meterVariants, {
		value: { control: { type: 'range', min: 0, max: 100 } },
		showValue: { control: 'boolean' },
		label: { control: 'text' },
	}),
	args: { value: 62, size: 'sm', radius: 'full', color: 'primary' },
	decorators: [(Story) => <div className="w-80">{Story()}</div>],
	subcomponents: {
		'Meter.Label': Meter.Label,
		'Meter.Value': Meter.Value,
		'Meter.Track': Meter.Track,
		'Meter.Indicator': Meter.Indicator,
	},
};
export default meta;

type Story = StoryObj<typeof Meter>;

export const Playground: Story = {};

export const WithLabelAndValue: Story = { args: { label: 'Storage used', showValue: true } };

export const Sizes: Story = {
	render: (args) => (
		<div className="flex flex-col gap-5">
			{(schema.size as Array<NonNullable<React.ComponentProps<typeof Meter>['size']>>).map((size) => (
				<Meter key={size} {...args} size={size} label={size} showValue />
			))}
		</div>
	),
};

export const Radius: Story = {
	render: (args) => (
		<div className="flex flex-col gap-5">
			{(schema.radius as Array<NonNullable<React.ComponentProps<typeof Meter>['radius']>>).map((radius) => (
				<Meter key={radius} {...args} size="lg" radius={radius} label={radius} />
			))}
		</div>
	),
};

export const Colors: Story = {
	parameters: { layout: 'padded' },
	render: (args) => (
		<div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3">
			{(schema.color as Array<NonNullable<React.ComponentProps<typeof Meter>['color']>>).map((color) => (
				<Meter key={color} {...args} color={color} label={color} />
			))}
		</div>
	),
};

export const Thresholds: Story = {
	parameters: { docs: { description: { story: 'Color switches automatically once the value crosses `thresholds.warning` / `thresholds.destructive`.' } } },
	render: (args) => (
		<div className="flex flex-col gap-5">
			{[30, 70, 92].map((v) => (
				<Meter key={v} {...args} value={v} label={`${v}% used`} showValue thresholds={{ warning: 60, destructive: 85 }} />
			))}
		</div>
	),
};

export const CustomRangeAndFormat: Story = {
	args: {
		value: 3.2,
		min: 0,
		max: 8,
		label: 'Memory',
		showValue: true,
		format: { style: 'unit', unit: 'gigabyte', maximumFractionDigits: 1 },
	},
};

export const Composed: Story = {
	render: (args) => (
		<Meter {...args} value={4} max={5} color="emerald">
			<div className="flex items-center justify-between">
				<Meter.Label>Password strength</Meter.Label>
				<Meter.Value>{(_, value) => ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][value]}</Meter.Value>
			</div>
			<Meter.Track className="flex gap-1 bg-transparent">
				{Array.from({ length: 5 }, (_, i) => (
					<span key={i} className={i < 4 ? 'h-full flex-1 rounded-full bg-(--meter-indicator)' : 'h-full flex-1 rounded-full bg-muted'} />
				))}
			</Meter.Track>
		</Meter>
	),
};
