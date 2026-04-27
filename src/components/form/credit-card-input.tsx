import * as React from 'react';
import { useEffect, useState } from 'react';
import cardValidator from 'card-validator';
import { useMask } from '@react-input/mask';
import { FormField, FormFieldProps } from '../../ui/form-field';
import { cn } from '../../lib/utils';
import { withFieldGroup } from './form';
import { useStore } from '@tanstack/react-form';
import { AmexIcon, CreditCardIcon, DinersClubIcon, DiscoverIcon, JcbIcon, MasterCardIcon, VisaIcon } from '../CreditCardBrand';
import { Field } from '../../ui/field';

function getCardIcon(type: string | undefined) {
	switch (type) {
		case 'mastercard':
			return <MasterCardIcon />;
		case 'visa':
			return <VisaIcon />;
		case 'jcb':
			return <JcbIcon />;
		case 'discover':
			return <DiscoverIcon />;
		case 'diners-club':
			return <DinersClubIcon />;
		case 'american-express':
			return <AmexIcon />;
		default:
			return <CreditCardIcon />;
	}
}

function getMaskPattern(lengths: Array<number>, gaps: Array<number> = []) {
	const maxLength = lengths[lengths.length - 1] || 16;
	let mask = '';

	for (let i = 1; i <= maxLength; i++) {
		mask += '#';
		if (gaps.includes(i)) {
			mask += ' ';
		}
	}
	return mask;
}

export const CreditCardInput = withFieldGroup({
	defaultValues: {
		type: '',
		code: '',
		exp: '',
		no: '',
		holderName: '',
	},
	props: {
		label: '',
		variant: 'outlined',
	} as Pick<FormFieldProps, 'label' | 'variant' | 'withAsterisk' | 'className' | 'size' | 'description' | 'disabled'> & {
		classNames?: {
			root?: string;
			label?: string;
			description?: string;
			error?: string;
			wrapper?: string;
			group?: string;
			name?: string;
			no?: string;
			noGroup?: string;
			code?: string;
			exp?: string;
			type?: string;
		};
	},
	render: function RenderFunction({ group, label, variant, classNames, className, withAsterisk, size, description, disabled }) {
		const [cardMaskPattern, setCardMaskPattern] = useState('#### #### #### ####');
		const [codeMeta, setCodeMeta] = useState({ name: 'CVV', size: 3 });

		const cardNoRef = useMask({
			mask: cardMaskPattern,
			replacement: { '#': /\d/ },
		});

		const expRef = useMask({
			mask: '##/##',
			replacement: { '#': /\d/ },
		});

		const cvcRef = useMask({
			mask: codeMeta.size === 4 ? '####' : '###',
			replacement: { '#': /\d/ },
		});

		const cardNumber = useStore(group.store, (state) => state.values?.no);
		const cardType = useStore(group.store, (state) => state.values?.type);
		const cardErrors = useStore(
			group.form.store,
			(state) =>
				[
					state.errors?.[0]?.['holderName'],
					state.errors?.[0]?.['card.holderName'],
					state.errors?.[0]?.['type'],
					state.errors?.[0]?.['card.type'],
					state.errors?.[0]?.['no'],
					state.errors?.[0]?.['card.no'],
					state.errors?.[0]?.['exp'],
					state.errors?.[0]?.['card.exp'],
					state.errors?.[0]?.['code'],
					state.errors?.[0]?.['card.code'],
				] as typeof state.errors,
		);

		const errors = cardErrors
			.filter((v: any) => Array.isArray(v) && v[0])
			.flatMap((v: any) => v[0])
			.map((e) => e.message);
		useEffect(() => {
			const validation = cardValidator.number(cardNumber);
			if (validation.card) {
				if (validation.card.type !== cardType) {
					setTimeout(() => group.setFieldValue('type', validation.card?.type || ''), 0);
				}
				const newMask = getMaskPattern(validation.card.lengths, validation.card.gaps);
				if (newMask !== cardMaskPattern) {
					setCardMaskPattern(newMask);
				}
				if (validation.card.code.size !== codeMeta.size) {
					setCodeMeta(validation.card.code);
				}
			} else if (!cardNumber) {
				setCardMaskPattern('#### #### #### ####');
				setCodeMeta({ name: 'CVV', size: 3 });
			}
		}, [cardNumber, cardType, cardMaskPattern, codeMeta.size, group]);
		return (
			<FormField
				description={description}
				error={errors?.length > 0 ?'Card '+ errors.join(', ') : undefined}
				disabled={disabled}
				label={label}
				size={size}
				variant={variant}
				withAsterisk={withAsterisk}
				className={cn(className, classNames?.root)}
				wrapperProps={{ className: cn(classNames?.wrapper) }}
				groupProps={{ className: cn(classNames?.group) }}
				descriptionProps={{ className: cn(classNames?.description) }}
				errorProps={{ className: cn(classNames?.error) }}>
				<>
					<group.Field
						name={'holderName'}
						children={(field) => (
							<Field.Control
								value={field.state.value}
								onChange={(e) => {
									field.handleChange(e.target.value.toUpperCase());
								}}
								onBlur={field.handleBlur}
								placeholder="JHON DOE"
								className={cn('font-mono tracking-widest transition-all !grow-0', classNames?.name)}
								autoComplete="cc-name"
							/>
						)}
					/>
					<Field.Group className={cn('grow', classNames?.noGroup)}>
						<Field.Addon
							size={'sm'}
							variant={variant}
							className={cn('[&_svg]:size-[calc(100%-8px)]! flex items-center justify-center px-0', classNames?.type)}>
							{getCardIcon(cardType)}
						</Field.Addon>
						<group.Field
							name={'no'}
							children={(field) => (
								<Field.Control
									ref={cardNoRef}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									className={cn('font-mono tracking-widest transition-all', classNames?.no)}
									placeholder="0000 0000 0000 0000"
									autoComplete="cc-number"
								/>
							)}
						/>
					</Field.Group>
					<group.Field
						name={'exp'}
						children={(field) => (
							<Field.Control
								ref={expRef}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
								className={cn('font-mono text-center tracking-widest w-20!', classNames?.exp)}
								placeholder="MM/YY"
								autoComplete="cc-exp"
							/>
						)}
					/>
					<group.Field
						name={'code'}
						children={(field) => (
							<Field.Control
								ref={cvcRef}
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
								className={cn('font-mono text-center tracking-widest w-20!', classNames?.code)}
								placeholder={codeMeta.size === 4 ? '0000' : '000'}
								type="text"
								inputMode="numeric"
								autoComplete="cc-csc"
							/>
						)}
					/>
				</>
			</FormField>
		);
	},
});
