import * as React from 'react';
import {
	Field,
	FieldAddonProps,
	FieldContentProps,
	FieldControlProps,
	FieldDescriptionProps,
	FieldErrorProps,
	FieldGroupProps,
	FieldLabelProps,
	FieldProps,
} from '@uikit/ui/field';
import { Spinner } from '@uikit/ui/spinner';

export type FormFieldProps = FieldProps & {
	children: React.ReactElement<FieldControlProps>;

	withAsterisk?: boolean;

	labelProps?: FieldLabelProps;
	label?: React.ReactNode;
	descriptionProps?: FieldDescriptionProps;
	description?: React.ReactNode;
	errorProps?: FieldErrorProps;
	error?: React.ReactNode | boolean;

	leftSectionProps?: FieldAddonProps;
	leftSection?: React.ReactNode;
	startProps?: FieldAddonProps;
	start?: React.ReactNode;
	endProps?: FieldAddonProps;
	end?: React.ReactNode;
	rightSectionProps?: FieldAddonProps;
	rightSection?: React.ReactNode;

	contentProps?: FieldContentProps;
	groupProps?: FieldGroupProps;
	wrapperProps?: FieldGroupProps;
	loading?: boolean;
	loadingPosition?: 'left' | 'right' | 'start' | 'end';
};

export const FormField: React.FC<FormFieldProps> = ({
	children,
	labelProps,
	label,
	descriptionProps,
	description,
	errorProps,
	error,
	withAsterisk,
	startProps,
	start,
	endProps,
	end,
	leftSection,
	leftSectionProps,
	rightSectionProps,
	rightSection,
	variant = 'outlined',
	size = 'md',
	contentProps,
	groupProps,
	wrapperProps,
	loading,
	loadingPosition = 'end',
	...props
}: FormFieldProps) => {
	const loadingIndicator = (
		<Spinner
			data-slot={'field-loading-indicator'}
			size={'md'}
			color={'info'}
		/>
	);
	return (
		<Field
			variant={variant}
			size={size}
			{...props}
			invalid={!!error || !!errorProps?.children || props?.invalid}>
			<Field.Content {...contentProps}>
				{(label || labelProps?.children) && (
					<Field.Label
						required={withAsterisk}
						{...labelProps}>
						{label}
					</Field.Label>
				)}
				<Field.Group {...groupProps}>
					{(leftSection || leftSectionProps?.children || (loading && loadingPosition === 'left')) && (
						<Field.Addon
							data-slot={'field-addon-left'}
							{...leftSectionProps}>
							{loading ? loadingIndicator : leftSection}
						</Field.Addon>
					)}
					<Field.Wrapper {...wrapperProps}>
						{(start || startProps?.children || (loading && loadingPosition === 'start')) && (
							<Field.Addon
								data-slot={'field-addon-start'}
								{...startProps}>
								{loading ? loadingIndicator : start}
							</Field.Addon>
						)}
						{children}
						{(end || endProps?.children || (loading && loadingPosition === 'end')) && (
							<Field.Addon
								data-slot={'field-addon-end'}
								{...endProps}>
								{loading ? loadingIndicator : end}
							</Field.Addon>
						)}
					</Field.Wrapper>
					{(rightSection || rightSectionProps?.children || (loading && loadingPosition === 'right')) && (
						<Field.Addon
							data-slot={'field-addon-right'}
							{...rightSectionProps}>
							{loading ? loadingIndicator : rightSection}
						</Field.Addon>
					)}
				</Field.Group>
			</Field.Content>
			{(description || descriptionProps?.children) && <Field.Description {...descriptionProps}>{description}</Field.Description>}
			{(error || errorProps?.children) && (
				<Field.Error
					{...errorProps}
					match={(!!error || !!errorProps?.children) ?? errorProps?.match}>
					{error}
				</Field.Error>
			)}
		</Field>
	);
};

FormField.displayName = 'FormField';
