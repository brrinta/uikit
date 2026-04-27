import * as React from 'react';
import { FormField, FormFieldProps } from '@uikit/ui/form-field';
import { Field, FieldControlProps } from '@uikit/ui/field';

type TextareaFieldProps = Pick<FieldControlProps, 'defaultValue' | 'onValueChange' | 'value' | 'type' | 'inputMode'>;

export type TextareaInputProps = Omit<FormFieldProps, 'children'> &
	Pick<React.ComponentProps<'textarea'>, 'rows' | 'cols' | 'wrap'> &
	Pick<FieldControlProps, keyof TextareaFieldProps> & {
		placeholder?: string;
		inputProps?: Omit<FieldControlProps, keyof TextareaFieldProps>;
	};

export const TextareaInput: React.FC<TextareaInputProps> = ({
	defaultValue,
	onValueChange,
	value,
	type,
	inputMode,
	inputProps,
	placeholder,
	rows,
	cols,
	wrap,
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
				{...inputProps}
				render={
					<textarea
						className={'py-1'}
						rows={rows ?? 3}
						cols={cols}
						wrap={wrap}
					/>
				}
			/>
		</FormField>
	);
};
TextareaInput.displayName = 'TextareaInput';
