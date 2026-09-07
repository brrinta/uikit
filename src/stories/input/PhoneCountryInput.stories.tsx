import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import type { Value } from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { PhoneCountryInput } from '../../ui/phone-country-input';

const meta: Meta<typeof PhoneCountryInput> = {
	title: 'UI/Input/PhoneCountry',
	component: PhoneCountryInput,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
		international: { control: 'boolean' },
		'aria-invalid': { control: 'boolean' },
	},
	decorators: [(Story) => <div className="w-80">{Story()}</div>],
};
export default meta;

type Story = StoryObj<typeof PhoneCountryInput>;

export const Playground: Story = { args: { defaultCountry: 'US', placeholder: 'Enter phone number' } };

export const DefaultCountryBD: Story = { args: { defaultCountry: 'BD', placeholder: '01XXX-XXXXXX' } };

export const International: Story = {
	parameters: { docs: { description: { story: '`international` keeps the country calling code inside the input.' } } },
	args: { defaultCountry: 'DE', international: true },
};

export const LimitedCountries: Story = {
	parameters: { docs: { description: { story: '`countries` restricts the picker to a fixed list.' } } },
	args: { defaultCountry: 'US', countries: ['US', 'CA', 'MX'] },
};

export const Controlled: Story = {
	render: (args) => {
		const [value, setValue] = React.useState<Value>('' as Value);
		const valid = value ? isValidPhoneNumber(value) : null;
		return (
			<div className="flex flex-col gap-2">
				<PhoneCountryInput {...args} defaultCountry="US" value={value} onChange={setValue} aria-invalid={valid === false} />
				<p className="text-xs tabular-nums text-muted-foreground">
					E.164: {value || '—'} {valid === null ? '' : valid ? '· valid ✓' : '· invalid'}
				</p>
			</div>
		);
	},
};

export const Invalid: Story = { args: { defaultCountry: 'US', 'aria-invalid': true, placeholder: 'Shows destructive ring' } };

export const Disabled: Story = { args: { defaultCountry: 'US', disabled: true } };
