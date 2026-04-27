import * as React from 'react';
import { useMask } from '@react-input/mask';
import { FormField, FormFieldProps } from '@uikit/ui/form-field';
import { Field, FieldControlProps } from '@uikit/ui/field';
import { cn } from '@uikit/lib/utils';

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
	const inputRef = useMask({
		mask,
		replacement: { _: /\d/ },
		showMask: true,
	});
	const [phone, setPhone] = React.useState(value ?? defaultValue ?? '');
	return (
		<FormField {...props}>
			<Field.Control
				ref={inputRef}
				type={'tel'}
				inputMode={'tel'}
				defaultValue={defaultValue}
				onValueChange={onValueChange}
				value={value}
				placeholder={placeholder}
				{...inputProps}
				onChange={(e) => {
					inputProps?.onChange?.(e);
					setPhone(e.target.value);
				}}
				className={cn({ 'text-muted-foreground': phone === mask }, inputProps?.className)}
			/>
		</FormField>
	);
};
PhoneInput.displayName = 'PhoneInput';
