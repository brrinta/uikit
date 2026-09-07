import * as React from 'react';
import { useMaskedInput } from './mask-input';
import { FormField, FormFieldProps } from './form-field';
import { Field, FieldControlProps } from './field';
import { cn } from '../lib/utils';

type PhoneFieldProps = Pick<FieldControlProps, 'defaultValue' | 'onValueChange' | 'value'>;

export type PhoneInputProps = Omit<FormFieldProps, 'children'> &
	Pick<FieldControlProps, keyof PhoneFieldProps> & {
		placeholder?: string;
		inputProps?: Omit<FieldControlProps, keyof PhoneFieldProps | 'type' | 'inputMode'>;
		mask?: string;
	};

export const PhoneInput: React.FC<PhoneInputProps> = ({
	defaultValue,
	onValueChange,
	value,
	inputProps,
	placeholder,
	mask = '+1 (___) ___-____',
	...props
}) => {
	// `_` marks digit slots in the public API; the internal engine uses `#`.
	const inputRef = useMaskedInput({ pattern: mask.replaceAll('_', '#') });
	return (
		<FormField {...props}>
			<Field.Control
				ref={inputRef}
				type={'tel'}
				inputMode={'tel'}
				defaultValue={defaultValue}
				onValueChange={onValueChange}
				value={value}
				placeholder={placeholder ?? mask}
				{...inputProps}
				className={cn(inputProps?.className)}
			/>
		</FormField>
	);
};
PhoneInput.displayName = 'PhoneInput';
