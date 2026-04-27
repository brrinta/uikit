import * as React from 'react';
import { FormField, FormFieldProps } from './form-field';
import { Field, FieldControlProps } from './field';

type DateFieldProps = Pick<FieldControlProps, 'defaultValue' | 'onValueChange' | 'value' | 'type' | 'min' | 'max' | 'step'>;

export type DateInputProps = Omit<FormFieldProps, 'children'> &
	Pick<FieldControlProps, keyof DateFieldProps> & {
		type?: 'date' | 'datetime-local' | 'month' | 'time' | 'week' | 'year';
		placeholder?: string;
		inputProps?: Omit<FieldControlProps, keyof DateFieldProps>;
	};

export const DateInput: React.FC<DateInputProps> = ({
	defaultValue,
	onValueChange,
	value,
	type = 'date',
	inputMode,
	inputProps,
	placeholder,
	min,
	max,
	step,
	...props
}) => {
	return (
		<FormField {...props}>
			<Field.Control
				type={type}
				inputMode={inputMode}
				defaultValue={defaultValue}
				onValueChange={onValueChange}
				value={value}
				placeholder={placeholder}
				min={min}
				max={max}
				step={step}
				{...inputProps}
			/>
		</FormField>
	);
};
DateInput.displayName = 'DateInput';
