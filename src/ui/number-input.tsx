import * as React from 'react';
import { FormField, FormFieldProps } from '@uikit/ui/form-field';
import { Field, FieldControlProps } from '@uikit/ui/field';
import { NumberField, NumberFieldRootProps } from '@base-ui/react/number-field';

type NumberFieldProps = Pick<
	NumberFieldRootProps,
	| 'defaultValue'
	| 'onValueChange'
	| 'onValueCommitted'
	| 'value'
	| 'locale'
	| 'snapOnStep'
	| 'step'
	| 'smallStep'
	| 'largeStep'
	| 'min'
	| 'max'
	| 'allowWheelScrub'
	| 'format'
	| 'inputRef'
>;

export type NumberInputProps = Omit<FormFieldProps, 'children' | 'render'> &
	Pick<NumberField.Root.Props, keyof NumberFieldProps> & {
		placeholder?: string;
		inputProps?: Omit<NumberField.Root.Props, keyof NumberFieldProps>;
		controlProps?: FieldControlProps;
	};

export const NumberInput: React.FC<NumberInputProps> = ({
	onValueChange,
	onValueCommitted,
	value,
	locale,
	snapOnStep,
	step,
	smallStep,
	largeStep,
	min,
	max,
	format,
	inputRef,
	inputProps,
	controlProps,
	placeholder,
	defaultValue,
	...props
}) => {
	return (
		<FormField
			{...props}
			render={
				<NumberField.Root
					defaultValue={defaultValue}
					onValueChange={onValueChange}
					onValueCommitted={onValueCommitted}
					value={value}
					locale={locale}
					snapOnStep={snapOnStep}
					step={step}
					smallStep={smallStep}
					largeStep={largeStep}
					min={min}
					max={max}
					format={format}
					inputRef={inputRef}
					{...inputProps}
				/>
			}>
			<Field.Control
				placeholder={placeholder}
				render={<NumberField.Input />}
				{...controlProps}
			/>
		</FormField>
	);
};
NumberInput.displayName = 'NumberInput';
