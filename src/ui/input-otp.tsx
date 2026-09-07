'use client';

import * as React from 'react';
import { OTPField } from '@base-ui/react/otp-field';
import { MinusIcon } from 'lucide-react';
import { type VariantProps } from 'class-variance-authority';
import { cn, cvaWithMeta } from '../lib/utils';

/* -------------------------------------------------------------------------------------------------
 * InputOTP — Base UI OTP Field (replaces the `input-otp` package).
 * One <InputOTP.Input> per character; Root manages value, paste, keyboard and autofill.
 *
 * Shorthand:            <InputOTP length={6} />
 * Grouped shorthand:    <InputOTP length={6} groupSize={3} />   → 123 - 456
 * Composed:             <InputOTP length={4}><InputOTP.Group><InputOTP.Input /> … </InputOTP.Group></InputOTP>
 *
 * Back-compat: `maxLength` is accepted as a deprecated alias of `length`; `InputOTP.Slot`
 * aliases `InputOTP.Input` (its old `index` prop is ignored — Base UI orders cells by DOM).
 * -----------------------------------------------------------------------------------------------*/

export const inputOTPSlotVariants = cvaWithMeta(
	[
		'relative flex items-center justify-center border-y border-r border-input text-center shadow-xs dark:bg-input/30',
		'transition-all outline-none caret-transparent selection:bg-transparent',
		'first:rounded-l-md first:border-l last:rounded-r-md',
		'focus:z-10 focus:border-ring focus:ring-[3px] focus:ring-ring/50',
		'disabled:cursor-not-allowed disabled:opacity-50',
		'aria-invalid:border-destructive focus:aria-invalid:border-destructive focus:aria-invalid:ring-destructive/20 dark:focus:aria-invalid:ring-destructive/40',
		'in-data-[invalid=true]:border-destructive',
	],
	{
		variants: {
			size: {
				sm: 'h-8 w-8 text-xs',
				md: 'h-9 w-9 text-sm',
				lg: 'h-11 w-11 text-base',
			},
		},
		defaultVariants: { size: 'md' },
	},
);

export type InputOTPSize = NonNullable<VariantProps<typeof inputOTPSlotVariants>['size']>;

const InputOTPSizeContext = React.createContext<InputOTPSize | undefined>(undefined);

export interface InputOTPProps extends Omit<OTPField.Root.Props, 'className' | 'length'> {
	className?: string;
	length?: number;
	/** @deprecated use `length` */
	maxLength?: number;
	/** When rendering the default cells, insert a separator every `groupSize` cells. */
	groupSize?: number;
	size?: InputOTPSize;
	containerClassName?: string;
	ref?: React.Ref<HTMLDivElement>;
}

function InputOTP({ className, containerClassName, length, maxLength, groupSize, size, children, ...props }: InputOTPProps) {
	const resolvedLength = length ?? maxLength ?? 6;
	const groups = React.useMemo(() => {
		if (children) return null;
		const per = groupSize && groupSize > 0 ? groupSize : resolvedLength;
		const out: number[][] = [];
		for (let i = 0; i < resolvedLength; i += per) out.push(Array.from({ length: Math.min(per, resolvedLength - i) }, (_, j) => i + j));
		return out;
	}, [children, resolvedLength, groupSize]);

	return (
		<InputOTPSizeContext.Provider value={size}>
			<OTPField.Root
				data-slot="input-otp"
				data-size={size ?? 'md'}
				length={resolvedLength}
				className={cn('flex items-center gap-2 has-disabled:opacity-50', containerClassName, className)}
				{...props}>
				{children ??
					groups!.map((group, gi) => (
						<React.Fragment key={gi}>
							{gi > 0 && <InputOTPSeparator />}
							<InputOTPGroup>
								{group.map((i) => (
									<InputOTPInput key={i} />
								))}
							</InputOTPGroup>
						</React.Fragment>
					))}
			</OTPField.Root>
		</InputOTPSizeContext.Provider>
	);
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
	return <div data-slot="input-otp-group" className={cn('flex items-center', className)} {...props} />;
}

export interface InputOTPInputProps extends Omit<OTPField.Input.Props, 'className' | 'size'> {
	className?: string;
	size?: InputOTPSize;
	/** @deprecated no longer needed — Base UI orders cells by DOM position. */
	index?: number;
}

function InputOTPInput({ className, size, index: _index, ...props }: InputOTPInputProps) {
	const contextSize = React.useContext(InputOTPSizeContext);
	return (
		<OTPField.Input
			data-slot="input-otp-slot"
			className={cn(inputOTPSlotVariants({ size: size ?? contextSize }), className)}
			{...props}
		/>
	);
}

function InputOTPSeparator({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div data-slot="input-otp-separator" role="separator" className={cn('text-muted-foreground', className)} {...props}>
			<MinusIcon className="size-4" />
		</div>
	);
}

const InputOTPComponent = Object.assign(InputOTP, {
	Group: InputOTPGroup,
	Input: InputOTPInput,
	/** @deprecated alias of InputOTP.Input */
	Slot: InputOTPInput,
	Separator: InputOTPSeparator,
});

export { InputOTPComponent as InputOTP, InputOTPGroup, InputOTPInput, InputOTPInput as InputOTPSlot, InputOTPSeparator };
