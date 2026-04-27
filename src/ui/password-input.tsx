import * as React from 'react';
import { FormField, FormFieldProps } from './form-field';
import { Field, FieldControlProps } from './field';
import { Eye, EyeOff } from 'lucide-react';

type PasswordFieldProps = Pick<FieldControlProps, 'defaultValue' | 'onValueChange' | 'value' | 'inputMode'>;

export type PasswordInputProps = Omit<FormFieldProps, 'children'> &
	Pick<FieldControlProps, keyof PasswordFieldProps> & {
		placeholder?: string;
		inputProps?: Omit<FieldControlProps, keyof PasswordFieldProps | 'type'>;
	};

export const PasswordInput: React.FC<PasswordInputProps> = ({ defaultValue, onValueChange, value, inputMode, inputProps, placeholder, ...props }) => {
	const [visible, setVisible] = React.useState(false);

	const toggle = (
		<>
			{visible ? <EyeOff /> : <Eye />}
			<span className="sr-only">Toggle password visibility</span>
		</>
	);
	return (
		<FormField
			endProps={{
				className: 'hover:bg-muted/90 cursor-pointer [&_svg]:size-4 [&_svg]:text-muted-foreground hover:[&_svg]:text-foreground transition-colors',
				appearance: 'ghost',
				tabIndex: -1,
				onClick: () => setVisible(!visible),
			}}
			end={toggle}
			{...props}>
			<Field.Control
				type={visible ? 'text' : 'password'}
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
PasswordInput.displayName = 'PasswordInput';
