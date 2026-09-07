import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { InputOTP, inputOTPSlotVariants } from '../ui/input-otp';
import { getCvaSchema, prepareArgTypes } from '../lib/utils';

const schema = getCvaSchema(inputOTPSlotVariants);
const sizes = schema.size as Array<'sm' | 'md' | 'lg'>;

const meta: Meta<typeof InputOTP> = {
	title: 'UI/Input/OTP',
	component: InputOTP,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: prepareArgTypes(inputOTPSlotVariants, {
		length: { control: { type: 'number', min: 2, max: 8 } },
		groupSize: { control: { type: 'number', min: 0, max: 4 } },
		disabled: { control: 'boolean' },
		mask: { control: 'boolean' },
	}),
	args: { length: 6, size: 'md' },
	subcomponents: {
		'InputOTP.Group': InputOTP.Group,
		'InputOTP.Input': InputOTP.Input,
		'InputOTP.Separator': InputOTP.Separator,
	},
};
export default meta;

type Story = StoryObj<typeof InputOTP>;

export const Playground: Story = {};

export const Grouped: Story = { args: { length: 6, groupSize: 3 } };

export const FourDigits: Story = { args: { length: 4 } };

export const Sizes: Story = {
	render: (args) => (
		<div className="flex flex-col items-center gap-4">
			{sizes.map((size) => (
				<InputOTP key={size} {...args} size={size} />
			))}
		</div>
	),
};

export const Masked: Story = {
	parameters: { docs: { description: { story: 'The `mask` prop hides entered characters — for OTPs that double as PINs.' } } },
	args: { mask: true, defaultValue: '1234', length: 4 },
};

export const NumericOnly: Story = {
	parameters: { docs: { description: { story: '`validationType="numeric"` filters non-digits (including on paste); it is the default.' } } },
	args: { validationType: 'numeric' },
};

export const Alphanumeric: Story = { args: { validationType: 'alphanumeric', length: 5 } };

export const Disabled: Story = { args: { disabled: true, defaultValue: '123456' } };

export const Invalid: Story = {
	render: (args) => <InputOTP {...args} aria-invalid defaultValue="99" />,
};

export const AutoSubmit: Story = {
	parameters: { docs: { description: { story: '`autoSubmit` submits the surrounding form when all cells are filled.' } } },
	render: (args) => (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				// eslint-disable-next-line no-alert
				alert('Submitted: ' + new FormData(e.currentTarget).get('otp'));
			}}
			className="flex flex-col items-center gap-3">
			<InputOTP {...args} name="otp" autoSubmit groupSize={3} />
			<p className="text-xs text-muted-foreground">Fill all six digits to submit.</p>
		</form>
	),
};

export const Composed: Story = {
	parameters: { docs: { description: { story: 'Full control over the parts. `InputOTP.Slot` is kept as a deprecated alias of `InputOTP.Input` for old call sites.' } } },
	render: () => (
		<InputOTP length={6}>
			<InputOTP.Group>
				<InputOTP.Input />
				<InputOTP.Input />
				<InputOTP.Input />
			</InputOTP.Group>
			<InputOTP.Separator />
			<InputOTP.Group>
				<InputOTP.Input />
				<InputOTP.Input />
				<InputOTP.Input />
			</InputOTP.Group>
		</InputOTP>
	),
};

export const Controlled: Story = {
	render: (args) => {
		const [value, setValue] = React.useState('');
		return (
			<div className="flex flex-col items-center gap-2">
				<InputOTP {...args} value={value} onValueChange={setValue} groupSize={3} />
				<p className="text-xs tabular-nums text-muted-foreground">Value: {value || '—'}</p>
			</div>
		);
	},
};
