import { useFormContext } from './form';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { uniq } from 'lodash-es';
import { StandardSchemaV1Issue, useStore } from '@tanstack/react-form';
import { cn } from '../../lib/utils';
import { Alert, AlertProps } from '../../ui/alert';
import { Button, ButtonProps } from '../../ui/button';
import { Fieldset, FieldsetProps } from '../../ui/fieldset';
import { Text, TextProps } from '../../ui/text';
import { LoadingOverlay } from '../../ui/loading';

export function Errors({ className, children, variant, appearance, ...props }: AlertProps) {
	const form = useFormContext();
	const errors = useStore(form.store, (state) => state.errors as Array<Record<string, StandardSchemaV1Issue[]>>);
	return errors?.length > 0 ? (
		<Alert
			variant={variant || 'destructive'}
			appearance={appearance || 'light'}
			className={cn('w-full col-span-full', className)}
			{...props}>
			<Alert.Content>
				<Alert.Title className={'flex flex-row gap-2 items-center w-full text-destructive'}>
					<AlertTriangle />
					Errors!!
				</Alert.Title>
				<Alert.Description className={'pl-8'}>
					{errors
						?.map((e) => Object.values(e))
						.flat()
						.map((err, i) => (
							<div
								key={i}
								className={'flex flex-row gap-2'}>
								<strong>
									--[
									{uniq(err.map((e) => e.path?.map((p) => (typeof p === 'string' ? p : typeof p === 'object' ? p?.key : ''))?.join('.'))).join(', ')}]
								</strong>
								<span>{err?.map((e) => e.message).join(', ')}</span>
							</div>
						))}
					{children}
				</Alert.Description>
			</Alert.Content>
		</Alert>
	) : null;
}

export function SubmitButton({ children, ...props }: ButtonProps) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => [state.isSubmitting, state.isValid]}>
			{([isSubmitting, valid]) => (
				<Button
					onClick={() => form.handleSubmit()}
					{...props}
					type={'submit'}
					disabled={!valid}
					loading={isSubmitting}>
					{children}
				</Button>
			)}
		</form.Subscribe>
	);
}
export function FormButton({ children, ...props }: ButtonProps) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => [state.isSubmitting]}>
			{([isSubmitting]) => (
				<Button
					{...props}
					type={'button'}
					loading={isSubmitting}>
					{children}
				</Button>
			)}
		</form.Subscribe>
	);
}

export function ResetButton({ children, ...props }: ButtonProps) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => [state.isSubmitting]}>
			{([isSubmitting]) => (
				<Button
					{...props}
					type={'reset'}
					loading={isSubmitting}>
					{children}
				</Button>
			)}
		</form.Subscribe>
	);
}

export function LoadingFieldset({
	children,
	className,
	loading,
	message,
	messageProps,
	...props
}: FieldsetProps & {
	loading?: boolean;
	message?: ReactNode;
	messageProps?: TextProps;
}) {
	return (
		<Fieldset
			className={clsx('relative', className || '')}
			{...props}>
			{loading && <LoadingOverlay open={loading} />}
			{message && (
				<Text
					className={'w-full text-muted-foreground text-center'}
					{...(messageProps || {})}>
					{message}
				</Text>
			)}
			{children}
		</Fieldset>
	);
}
