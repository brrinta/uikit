import { useFieldContext } from '@uikit/components/form/form';
import { useStore } from '@tanstack/react-form';
import { useMemo } from 'react';
import { uniq } from 'lodash-es';
import { ComboboxData, ComboboxInput, ComboboxInputProps } from '@uikit/ui/combobox-input';
import { FileInput, FileInputProps } from '@uikit/ui/file-input';
import { DateInput, DateInputProps } from '@uikit/ui/date-input';
import { PasswordInput, PasswordInputProps } from '@uikit/ui/password-input';
import { TextInput, TextInputProps } from '@uikit/ui/text-input';
import { PhoneInput, PhoneInputProps } from '@uikit/ui/phone-input';
import { TextareaInput, TextareaInputProps } from '@uikit/ui/textarea-input';
import { NumberInput, NumberInputProps } from '@uikit/ui/number-input';
import { SelectInput, SelectInputProps } from '@uikit/ui/select-input';

export const getErrorMessage = (errors: Array<any>) => {
	return uniq(errors.map((error: any) => (typeof error === 'string' ? error : error.message))).join(', ');
};

// --- HELPER HOOK (DRY Principle) ---
function useFieldErrorMessage(field: any) {
	const errors = useStore(field.store, (state: any) => state.meta.errors);
	return useMemo(() => (errors.length > 0 ? getErrorMessage(errors) : ''), [errors]);
}

export function TextField({ ...props }: Omit<TextInputProps, 'value' | 'onValueChange'>) {
	const field = useFieldContext<string>();
	const errorMessage = useFieldErrorMessage(field);

	return (
		<TextInput
			value={field.state.value}
			onValueChange={field.handleChange}
			onBlur={field.handleBlur}
			error={errorMessage}
			placeholder={'Type here...'}
			{...props}
		/>
	);
}
export function PhoneField({ ...props }: Omit<PhoneInputProps, 'value' | 'onValueChange'>) {
	const field = useFieldContext<string>();
	const errorMessage = useFieldErrorMessage(field);
	return (
		<PhoneInput
			value={field.state.value}
			onValueChange={field.handleChange}
			onBlur={field.handleBlur}
			error={errorMessage}
			placeholder={'Type here...'}
			{...props}
		/>
	);
}

export function PasswordField({ ...props }: Omit<PasswordInputProps, 'value' | 'onValueChange'>) {
	const field = useFieldContext<string>();
	const errorMessage = useFieldErrorMessage(field);

	return (
		<PasswordInput
			value={field.state.value}
			onValueChange={field.handleChange}
			onBlur={field.handleBlur}
			error={errorMessage}
			placeholder={'Type here...'}
			{...props}
		/>
	);
}

export function TextareaField({ ...props }: Omit<TextareaInputProps, 'value' | 'onValueChange'>) {
	const field = useFieldContext<string>();
	const errorMessage = useFieldErrorMessage(field);

	return (
		<TextareaInput
			value={field.state.value}
			onValueChange={field.handleChange}
			onBlur={field.handleBlur}
			error={errorMessage}
			placeholder={'Type here...'}
			{...props}
		/>
	);
}

export function NumberField({ ...props }: Omit<NumberInputProps, 'value' | 'onValueChange'>) {
	const field = useFieldContext<number | null>();
	const errorMessage = useFieldErrorMessage(field);

	return (
		<NumberInput
			value={field.state.value}
			onValueChange={field.handleChange}
			onBlur={field.handleBlur}
			error={errorMessage}
			placeholder={'Type here...'}
			{...props}
		/>
	);
}

export function DateField({ ...props }: Omit<DateInputProps, 'value' | 'onValueChange'>) {
	const field = useFieldContext<Date | string>();
	const errorMessage = useFieldErrorMessage(field);

	return (
		<DateInput
			// @ts-ignore
			value={field.state.value}
			onValueChange={field.handleChange}
			onBlur={field.handleBlur}
			error={errorMessage}
			placeholder={'Select a date'}
			{...props}
		/>
	);
}

export function SelectField<V = unknown, M extends boolean | undefined = false>({
	...props
}: Omit<SelectInputProps<V, M>, 'value' | 'onValueChange'>) {
	const field = useFieldContext<(M extends true ? Array<V> : V) | null>();
	const errorMessage = useFieldErrorMessage(field);

	return (
		<SelectInput<V, M>
			value={field.state.value}
			onValueChange={field.handleChange}
			onBlur={field.handleBlur}
			error={errorMessage}
			placeholder={'Select an option'}
			{...props}
		/>
	);
}

export function ComboboxField<
	V = any,
	M extends boolean | undefined = false,
	ITEM extends ComboboxData<V> = ComboboxData<V>,
	VK extends keyof ITEM = keyof ITEM,
>({
	onValueChange,
	...props
}: Omit<ComboboxInputProps<V, M, ITEM, VK>, 'value' | 'onValueChange'> & {
	onValueChange?: ComboboxInputProps<V, M, ITEM, VK>['onValueChange'];
}) {
	const field = useFieldContext<(M extends true ? Array<V> : V) | null>(); // Keep generic unknown to allow flexible casting
	const errorMessage = useFieldErrorMessage(field);

	return (
		<ComboboxInput<V, M, ITEM, VK>
			value={field.state.value}
			onValueChange={(value, keyValue, item, evt) => {
				field.handleChange(value);
				onValueChange?.(value, keyValue, item, evt);
			}}
			onBlur={field.handleBlur}
			error={errorMessage}
			placeholder={'Select an option'}
			{...props}
		/>
	);
}

export function FileField({ ...props }: Omit<FileInputProps, 'value' | 'onValueChange'>) {
	const field = useFieldContext<File | null>();
	const errorMessage = useFieldErrorMessage(field);

	return (
		// @ts-ignore
		<FileInput
			value={field.state.value}
			onValueChange={field.handleChange}
			onBlur={field.handleBlur}
			error={errorMessage}
			placeholder={'Select a file'}
			{...props}
		/>
	);
}
