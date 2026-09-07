import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { MASK_PATTERNS, MaskInput, useMaskedInput, type MaskPattern } from '../../ui/mask-input';

const patternKeys = Object.keys(MASK_PATTERNS) as Array<keyof typeof MASK_PATTERNS>;

const meta: Meta<typeof MaskInput> = {
	title: 'UI/Input/Mask',
	component: MaskInput,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		mask: { control: 'select', options: patternKeys },
		validationMode: { control: 'select', options: ['onChange', 'onBlur', 'onSubmit', 'onTouched', 'all'] },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
		withoutMask: { control: 'boolean' },
	},
	args: { mask: 'phone', placeholder: '(555) 000-0000' },
	decorators: [(Story) => <div className="w-72">{Story()}</div>],
};
export default meta;

type Story = StoryObj<typeof MaskInput>;

export const Playground: Story = {};

export const AllPatterns: Story = {
	parameters: { layout: 'padded' },
	render: () => (
		<div className="grid gap-4 md:grid-cols-2">
			{patternKeys.map((key) => (
				<label key={key} className="flex flex-col gap-1 text-sm">
					<span className="font-medium">{key}</span>
					<MaskInput mask={key} placeholder={typeof MASK_PATTERNS[key].pattern === 'string' ? MASK_PATTERNS[key].pattern.replaceAll('#', '0') : undefined} />
				</label>
			))}
		</div>
	),
};

export const Currency: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			<MaskInput mask="currency" placeholder="$0.00" />
			<MaskInput mask="currency" currency="EUR" locale="de-DE" placeholder="0,00 €" />
			<MaskInput mask="currency" currency="BDT" locale="bn-BD" placeholder="৳0" />
		</div>
	),
};

export const MaskPlaceholder: Story = {
	parameters: { docs: { description: { story: '`maskPlaceholder` shows the template while focused; `placeholder` when blurred.' } } },
	args: { mask: 'creditCardExpiry', placeholder: 'Expiry date', maskPlaceholder: 'MM/YY' },
};

export const CustomPattern: Story = {
	render: () => {
		const licensePlate: MaskPattern = {
			pattern: '###-####',
			transform: (value) => value.replace(/\D/g, ''),
			validate: (value) => value.replace(/\D/g, '').length === 7,
		};
		return <MaskInput mask={licensePlate} placeholder="123-4567" />;
	},
};

export const Validation: Story = {
	render: (args) => {
		const [valid, setValid] = React.useState<boolean | null>(null);
		return (
			<div className="flex flex-col gap-2">
				<MaskInput {...args} mask="phone" validationMode="onChange" onValidate={(isValid) => setValid(isValid)} invalid={valid === false} />
				<p className="text-xs text-muted-foreground">{valid === null ? 'Type a phone number' : valid ? 'Valid ✓' : 'Incomplete number'}</p>
			</div>
		);
	},
};

export const ControlledUnmasked: Story = {
	render: (args) => {
		const [masked, setMasked] = React.useState('');
		const [unmasked, setUnmasked] = React.useState('');
		return (
			<div className="flex flex-col gap-2">
				<MaskInput
					{...args}
					mask="ssn"
					value={masked}
					onValueChange={(m, u) => {
						setMasked(m);
						setUnmasked(u);
					}}
					placeholder="000-00-0000"
				/>
				<p className="text-xs tabular-nums text-muted-foreground">
					masked: {masked || '—'} · unmasked: {unmasked || '—'}
				</p>
			</div>
		);
	},
};

export const DisabledAndInvalid: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			<MaskInput mask="phone" disabled defaultValue="5551234567" />
			<MaskInput mask="phone" invalid defaultValue="555" />
		</div>
	),
};

export const RefBasedHook: Story = {
	parameters: {
		docs: {
			description: {
				story: '`useMaskedInput` masks any plain input via ref — the replacement for `@react-input/mask` used by PhoneInput and CreditCardInput.',
			},
		},
	},
	render: () => {
		const ref = useMaskedInput({ pattern: '#### #### #### ####' });
		return <input ref={ref} placeholder="0000 0000 0000 0000" className="h-9 w-full rounded-md border border-input px-3 font-mono text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50" />;
	},
};
