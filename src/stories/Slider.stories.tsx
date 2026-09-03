import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Slider, sliderVariants } from '../ui/slider';
import { getCvaSchema, prepareArgTypes } from '../lib/utils';

const schema = getCvaSchema(sliderVariants);

const meta: Meta<typeof Slider> = {
	title: 'UI/Slider',
	component: Slider,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: prepareArgTypes(sliderVariants, {
		disabled: { control: 'boolean' },
		showValue: { control: 'boolean' },
		label: { control: 'text' },
	}),
	args: { defaultValue: 40, size: 'md', color: 'primary', orientation: 'horizontal' },
	decorators: [(Story) => <div className="w-80">{Story()}</div>],
	subcomponents: {
		'Slider.Label': Slider.Label,
		'Slider.Value': Slider.Value,
		'Slider.Control': Slider.Control,
		'Slider.Track': Slider.Track,
		'Slider.Indicator': Slider.Indicator,
		'Slider.Thumb': Slider.Thumb,
	},
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Playground: Story = {};

export const WithLabelAndValue: Story = { args: { label: 'Volume', showValue: true } };

export const Range: Story = { args: { defaultValue: [20, 60], label: 'Price', showValue: true } };

export const Sizes: Story = {
	render: (args) => (
		<div className="flex flex-col gap-6">
			{(schema.size as Array<'sm' | 'md' | 'lg'>).map((size) => (
				<Slider key={size} {...args} size={size} label={size} showValue />
			))}
		</div>
	),
};

export const Colors: Story = {
	parameters: { layout: 'padded' },
	render: (args) => (
		<div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3">
			{(schema.color as Array<NonNullable<React.ComponentProps<typeof Slider>['color']>>).map((color) => (
				<Slider key={color} {...args} color={color} label={color} />
			))}
		</div>
	),
};

export const Vertical: Story = {
	decorators: [(Story) => <div className="flex h-64 gap-8">{Story()}</div>],
	render: (args) => (
		<>
			<Slider {...args} orientation="vertical" />
			<Slider {...args} orientation="vertical" defaultValue={[30, 70]} />
		</>
	),
};

export const StepAndBounds: Story = {
	args: { min: 0, max: 1000, step: 50, defaultValue: 250, showValue: true, label: 'Budget', format: { style: 'currency', currency: 'USD', maximumFractionDigits: 0 } },
};

export const Disabled: Story = { args: { disabled: true, label: 'Disabled', showValue: true } };

export const Controlled: Story = {
	render: (args) => {
		const [value, setValue] = React.useState(25);
		return (
			<div className="flex flex-col gap-3">
				<Slider {...args} value={value} onValueChange={(v) => setValue(v as number)} label="Opacity" showValue />
				<p className="text-xs text-muted-foreground">Current value: {value}</p>
			</div>
		);
	},
};

export const Composed: Story = {
	parameters: { docs: { description: { story: 'Full control over the parts — add marks, custom thumbs, or reorder the header.' } } },
	render: (args) => (
		<Slider {...args} defaultValue={[25, 75]} thumbAlignment="edge">
			<div className="flex items-baseline justify-between">
				<Slider.Label>Temperature</Slider.Label>
				<Slider.Value>{(_, values) => `${values[0]}° – ${values[1]}°`}</Slider.Value>
			</div>
			<Slider.Control>
				<Slider.Track className="bg-gradient-to-r from-sky-200 via-amber-200 to-rose-300 dark:from-sky-900 dark:via-amber-900 dark:to-rose-900">
					<Slider.Indicator className="bg-transparent" />
					<Slider.Thumb index={0} aria-label="Minimum" className="border-sky-500" />
					<Slider.Thumb index={1} aria-label="Maximum" className="border-rose-500" />
				</Slider.Track>
			</Slider.Control>
		</Slider>
	),
};
