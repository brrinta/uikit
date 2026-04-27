import { IconListDetails, IconPlus } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { ComboboxData, ComboboxInput, ComboboxInputProps } from '../ui/combobox-input';
import { Flex, FlexProps } from '../ui/flex';
import { Container, ContainerProps } from '../ui/container';
import { useIsMobile } from '../hooks/use-mobile';

type SectionButtonProps = {
	hide?: boolean;
	label?: React.ReactNode;
	icon?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type SectionProps = {
	children?: React.ReactNode;
	wrapperProps?: FlexProps;
};

type PickedFields<
	V = any,
	M extends boolean | undefined = false,
	ITEM extends ComboboxData<V> = ComboboxData<V>,
	VK extends keyof ITEM = keyof ITEM,
> = Pick<ComboboxInputProps<V, M, ITEM, VK>, 'value' | 'items' | 'onValueChange' | 'loading' | 'placeholder' | 'description' | 'multiple'>;

type AppCardGridProps<
	V = any,
	M extends boolean | undefined = false,
	ITEM extends ComboboxData<V> = ComboboxData<V>,
	VK extends keyof ITEM = keyof ITEM,
> = PickedFields<V, M, ITEM, VK> & {
	children: React.ReactNode;
	appComboProps?: Omit<ComboboxInputProps<V, M, ITEM, VK>, keyof PickedFields<V, M, ITEM, VK>>;
	topContainerProps?: Omit<ContainerProps, 'children'>;
	leftButton?: SectionButtonProps;
	rightButton?: SectionButtonProps;
	leftSection?: SectionProps;
	rightSection?: SectionProps;
};
export const AppCardGrid = <
	V = any,
	M extends boolean | undefined = false,
	ITEM extends ComboboxData<V> = ComboboxData<V>,
	VK extends keyof ITEM = keyof ITEM,
>({
	children,
	value,
	items,
	loading,
	onValueChange,
	placeholder,
	description,
	topContainerProps,
	leftButton: { icon: leftButtonIcon, label: leftButtonLabel, hide: hideLeftButton, ...leftButtonProps } = {},
	rightButton: { icon: rightButtonIcon, label: rightButtonLabel, hide: hideRightButton, ...rightButtonProps } = {},
	appComboProps,
	leftSection,
	rightSection,
}: AppCardGridProps<V, M, ITEM, VK>) => {
	const isMobile = useIsMobile();

	return (
		<>
			<Container
				row
				className={'md:gap-4 gap-2 grow-0'}
				{...topContainerProps}>
				{hideLeftButton && !leftSection?.children ? null : (
					<Flex
						className={'gap-3'}
						{...leftSection?.wrapperProps}>
						{leftSection?.children}
						{hideLeftButton ? null : (
							<Button
								variant={'outline'}
								{...leftButtonProps}>
								{leftButtonIcon || <IconListDetails />}
							</Button>
						)}
					</Flex>
				)}
				<ComboboxInput<V, M, ITEM, VK>
					wrapperProps={{ className: 'bg-background shadow-xs border-none' }}
					placeholder={placeholder}
					loading={loading}
					variant={'outlined'}
					value={value}
					className={'grow p-0'}
					items={items}
					onValueChange={onValueChange}
					{...appComboProps}
					description={description}
				/>
				{hideRightButton && !rightSection?.children ? null : (
					<Flex
						className={'gap-4'}
						{...rightSection?.wrapperProps}>
						{hideRightButton ? null : (
							<Button
								className={'grow'}
								variant={'primary'}
								{...rightButtonProps}>
								{rightButtonIcon || <IconPlus />}
								{isMobile ? '' : rightButtonLabel}
							</Button>
						)}
						{rightSection?.children}
					</Flex>
				)}
			</Container>
			{children}
		</>
	);
};
