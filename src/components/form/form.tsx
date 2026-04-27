import { AppFieldExtendedReactFormApi, createFormHook, createFormHookContexts } from '@tanstack/react-form';
import {
	ComboboxField,
	DateField,
	FileField,
	NumberField,
	PasswordField,
	PhoneField,
	SelectField,
	TextareaField,
	TextField,
} from '@uikit/components/form/field-components';
import { Errors, FormButton, LoadingFieldset, ResetButton, SubmitButton } from '@uikit/components/form/form-components';
import { FormHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { LoadingOverlay, LoadingOverlayProps } from '@uikit/ui/loading';
import { DevOnly } from '@uikit/components/DevOnly';

export const { fieldContext, formContext, useFormContext, useFieldContext } = createFormHookContexts();

export const Form = ({
	children,
	onSubmit,
	className,
	form,
	loading,
	loadingProps,
	withoutSubmit,
	withDevErrors = true,
	formMeta,
	...props
}: {
	children: ReactNode;
	form: AppFieldExtendedReactFormApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any>;
	withoutSubmit?: boolean;
	loadingProps?: Omit<LoadingOverlayProps, 'visible'>;
	loading?: boolean;
	withDevErrors?: boolean;
	formMeta?: any;
} & FormHTMLAttributes<HTMLFormElement>) => {
	return (
		<form
			className={clsx('relative', className || '')}
			{...props}
			onSubmit={async (e) => {
				e.preventDefault();
				e.stopPropagation();
				onSubmit?.(e);
				if (!withoutSubmit) await form?.handleSubmit?.(formMeta);
			}}>
			{loading && (
				<LoadingOverlay
					{...loadingProps}
					className={clsx('form-loading', loadingProps?.className || '')}
					open={loading}
				/>
			)}
			<form.AppForm>
				{children}
				{withDevErrors && (
					<DevOnly>
						<form.Errors className={'my-4'} />
					</DevOnly>
				)}
			</form.AppForm>
		</form>
	);
};

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
	fieldComponents: {
		TextField,
		PhoneField,
		DateField,
		NumberField,
		SelectField,
		ComboboxField,
		FileField,
		PasswordField,
		TextareaField,
	},
	formComponents: {
		SubmitButton,
		FormButton,
		ResetButton,
		LoadingFieldset,
		Errors,
	},
	fieldContext,
	formContext,
});
