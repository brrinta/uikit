import * as React from 'react';
import { FormField, FormFieldProps } from './form-field';
import { Field, FieldControlProps } from './field';

type TextFieldProps = Pick<FieldControlProps, 'defaultValue' | 'onValueChange' | 'value' | 'type' | 'inputMode'>;

export type TextInputProps = Omit<FormFieldProps, 'children'> &
	Pick<FieldControlProps, keyof TextFieldProps> & {
		placeholder?: string;
		inputProps?: Omit<FieldControlProps, keyof TextFieldProps>;
	};

export const TextInput: React.FC<TextInputProps> = ({ defaultValue, onValueChange, value, type, inputMode, inputProps, placeholder, ...props }) => {
	return (
		<FormField {...props}>
			<Field.Control
				type={type}
				inputMode={inputMode}
				defaultValue={defaultValue}
				onValueChange={onValueChange}
				value={value}
				placeholder={placeholder}
				{...inputProps}
			/>
		</FormField>
	);
};
TextInput.displayName = 'TextInput';
