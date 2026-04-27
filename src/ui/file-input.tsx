import * as React from 'react';
import { formatBytes } from '../lib/uikit-utility';
import { PaperclipIcon, X } from 'lucide-react';
import { Button } from './button';
import { Field, FieldControlProps } from './field';
import { FormField, FormFieldProps } from './form-field';

type FileFieldProps = Pick<FieldControlProps, 'accept' | 'placeholder'>;

export type FileInputProps = Omit<FormFieldProps, 'children'> &
	Pick<FieldControlProps, keyof FileFieldProps> & {
		value?: File | null;
		defaultValue?: File | null;
		onValueChange?: (file: File | null) => void;
		inputProps?: Omit<FieldControlProps, keyof FileFieldProps | 'type' | 'defaultValue' | 'onValueChange' | 'value'>;
		clearable?: boolean;
	};

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
	({ value, defaultValue, onValueChange, clearable, placeholder = 'Select file...', accept, description, inputProps, ...props }, ref) => {
		const inputRef = React.useRef<HTMLInputElement>(null);
		React.useImperativeHandle(ref, () => inputRef.current!);

		const clearFile = (e: React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			if (inputRef.current) {
				inputRef.current.value = '';
			}
			onValueChange?.(null);
		};

		React.useEffect(() => {
			if (!value && inputRef.current) {
				inputRef.current.value = '';
			}
		}, [value]);

		const finalDescription = value instanceof File ? formatBytes(value.size) : description;

		const endElement = value ? (
			<Button
				type="button"
				variant="ghost"
				size="icon"
				onClick={clearFile}
				className="h-full aspect-square hover:bg-destructive/10 hover:text-destructive text-muted-foreground rounded-l-none transition-colors">
				<X className="size-4" />
				<span className="sr-only">Clear file</span>
			</Button>
		) : undefined;

		return (
			<FormField
				start={<PaperclipIcon />}
				end={clearable && endElement}
				description={finalDescription}
				{...props}>
				<Field.Control
					ref={inputRef}
					type={'file'}
					accept={accept}
					placeholder={placeholder}
					{...inputProps}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						const file = e.target.files?.[0] || null;
						onValueChange?.(file);
						// @ts-ignore
						inputProps?.onChange?.(e);
					}}
				/>
			</FormField>
		);
	},
);

FileInput.displayName = 'FileInput';
