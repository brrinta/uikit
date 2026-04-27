import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import * as BasePhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { Button } from '@uikit/ui/button';
import { Combobox } from '@uikit/ui/combobox';
import { Input } from '@uikit/ui/input';
import { cn } from '@uikit/lib/utils';

type PhoneCountryInputProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> &
	Omit<BasePhoneInput.Props<typeof BasePhoneInput.default>, 'onChange'> & {
		onChange?: (value: BasePhoneInput.Value) => void;
	};

function PhoneCountryInput({ className, onChange, value, ...props }: PhoneCountryInputProps) {
	return (
		<BasePhoneInput.default
			className={cn(
				'flex',
				props['aria-invalid'] && '[&_*[data-slot=combobox-trigger]]:border-destructive [&_*[data-slot=combobox-trigger]]:ring-destructive/50',
				className,
			)}
			flagComponent={FlagComponent}
			countrySelectComponent={CountrySelect}
			inputComponent={InputComponent}
			smartCaret={false}
			value={value || undefined}
			onChange={(value) => onChange?.(value || ('' as BasePhoneInput.Value))}
			{...props}
		/>
	);
}

function InputComponent({ className, ...props }: React.ComponentProps<typeof Input>) {
	return (
		<Input
			className={cn('rounded-s-none', className)}
			{...props}
		/>
	);
}

type CountryEntry = { label: string; value: BasePhoneInput.Country | undefined };

type CountrySelectProps = {
	disabled?: boolean;
	value: BasePhoneInput.Country;
	options: CountryEntry[];
	onChange: (country: BasePhoneInput.Country) => void;
};

function CountrySelect({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) {
	return (
		<Combobox
			items={countryList}
			value={selectedCountry || ''}>
			<Combobox.Trigger
				render={(props) => (
					<Button
						{...props}
						type="button"
						variant="outline"
						className="flex gap-1 rounded-s-md rounded-e-none border-r-0 px-3 focus:z-10"
						disabled={disabled}>
						<FlagComponent
							country={selectedCountry}
							countryName={selectedCountry}
						/>
						<ChevronsUpDown className={cn('-mr-1', disabled && 'hidden')} />
					</Button>
				)}
			/>
			<Combobox.Content
				className="max-h-[20rem] w-[300px] [--input-container-height:4rem]"
				renderAtTop={() => (
					<Combobox.Input
						className="focus-visible:ring-0"
						placeholder="Search country..."
					/>
				)}>
				{(country: CountryEntry) =>
					country.value ? (
						<CountrySelectOption
							key={country.value}
							country={country.value}
							countryName={country.label}
							selectedCountry={selectedCountry}
							onChange={onChange}
						/>
					) : null
				}
			</Combobox.Content>
		</Combobox>
	);
}

interface CountrySelectOptionProps extends BasePhoneInput.FlagProps {
	selectedCountry: BasePhoneInput.Country;
	onChange: (country: BasePhoneInput.Country) => void;
}

function CountrySelectOption({ country, countryName, onChange }: CountrySelectOptionProps) {
	const handleSelect = () => {
		onChange(country);
	};

	return (
		<Combobox.Item
			onClick={handleSelect}
			value={country}>
			<FlagComponent
				country={country}
				countryName={countryName}
			/>
			<span className="flex-1 text-sm">{countryName}</span>
			<span className="text-foreground/50 text-sm">{`+${BasePhoneInput.getCountryCallingCode(country)}`}</span>
		</Combobox.Item>
	);
}

function FlagComponent({ country, countryName }: BasePhoneInput.FlagProps) {
	const Flag = flags[country];

	return (
		<span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm [&_svg:not([class*='size-'])]:size-full">
			{Flag && <Flag title={countryName} />}
		</span>
	);
}

export { PhoneCountryInput };
