import { Trash } from 'lucide-react';
import { ReactNode, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AlertDialog } from '../../ui/alert-dialog';
import { Button, ButtonProps } from '../../ui/button';
import { useDisclosure } from '../../hooks/use-disclosure';

type ConfirmHandler = () => Promise<any> | any;

const ConfirmationDialogRender = ({
	opened,
	toggle,
	close,
	mutateAsync,
	isPending,
	title,
	message,
	icon = <Trash />,
	cancelButtonProps,
	confirmButtonProps,
}: {
	opened: boolean;
	toggle: () => void;
	close: () => void;
	mutateAsync: () => Promise<any>;
	isPending: boolean;
	title?: ReactNode;
	message?: ReactNode;
	icon?: ReactNode;
	cancelButtonProps?: HandlerProps;
	confirmButtonProps?: HandlerProps;
}) => (
	<AlertDialog
		open={opened}
		onOpenChange={toggle}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title className={'flex items-center gap-2'}>
					{icon} {title}
				</AlertDialog.Title>
			</AlertDialog.Header>
			{message ? <AlertDialog.Description>{message}</AlertDialog.Description> : null}
			<AlertDialog.Footer>
				<Button
					loading={isPending}
					onClick={() => close()}
					{...cancelButtonProps}
				/>
				<Button
					loading={isPending}
					onClick={async () => {
						await mutateAsync();
					}}
					{...confirmButtonProps}
				/>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog>
);

type DeleteConfirmationRenderArgs = {
	showConfirmation: () => void;
	confirmationPending: boolean;
	confirmationIsOpened: boolean;
};

type DeleteConfirmationOptions = {
	onConfirm: ConfirmHandler;
	message?: ReactNode;
	title?: ReactNode;
	confirmButtonProps?: HandlerProps;
	cancelButtonProps?: HandlerProps;
	icon?: ReactNode;
	children: (args: DeleteConfirmationRenderArgs) => ReactNode;
};

export const ConfirmationPopup = ({
	onConfirm,
	message,
	title = 'Are you sure you want to delete?',
	children,
	confirmButtonProps = {
		children: 'Yes, delete it',
		variant: 'primary',
		size: 'md',
		appearance: 'default',
		mode: 'default',
		className: '',
	},
	cancelButtonProps = {
		children: 'No, don\'t delete it',
		variant: 'outline',
		size: 'md',
		appearance: 'default',
		mode: 'default',
		className: '',
	},
	icon = <Trash />,
}: DeleteConfirmationOptions) => {
	const [opened, { open, toggle, close }] = useDisclosure(false);
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async () => await onConfirm?.(),
		onSuccess: () => {
			close();
		},
	});

	return (
		<>
			{children({ showConfirmation: open, confirmationPending: isPending, confirmationIsOpened: opened })}
			<ConfirmationDialogRender
				opened={opened}
				title={title}
				message={message}
				icon={icon}
				cancelButtonProps={cancelButtonProps}
				confirmButtonProps={confirmButtonProps}
				mutateAsync={mutateAsync}
				toggle={toggle}
				close={close}
				isPending={isPending}
			/>
		</>
	);
};

export type UseConfirmationDialogReturn = Omit<ReturnType<typeof useConfirmationDialog>, 'ConfirmationDialog'>;

type HandlerProps = Pick<ButtonProps, 'variant' | 'size' | 'appearance' | 'mode' | 'className' | 'children'>;

export const useConfirmationDialog = (
	defaults?: Pick<DeleteConfirmationOptions, 'title' | 'icon' | 'confirmButtonProps' | 'cancelButtonProps' | 'message'>,
) => {
	const [opened, { open, toggle, close }] = useDisclosure(false);
	const [message, setMessage] = useState<ReactNode>(null);
	const [title, setTitle] = useState<ReactNode>(defaults?.title ?? 'Are you sure you want to delete?');
	const [handler, setHandler] = useState<ConfirmHandler | null>(null);
	const [icon, setIcon] = useState<ReactNode>(defaults?.icon ?? <Trash />);
	const [cancelButtonProps, setCancelButtonProps] = useState<HandlerProps>({
		children: defaults?.cancelButtonProps?.children ?? 'No, don\'t delete it',
		variant: defaults?.cancelButtonProps?.variant ?? 'outline',
		size: defaults?.cancelButtonProps?.size ?? 'md',
		appearance: defaults?.cancelButtonProps?.appearance ?? 'default',
		mode: defaults?.cancelButtonProps?.mode ?? 'default',
		className: defaults?.cancelButtonProps?.className ?? '',
	});
	const [confirmButtonProps, setConfirmButtonProps] = useState<HandlerProps>({
		children: defaults?.confirmButtonProps?.children ?? 'Yes, delete it',
		variant: defaults?.confirmButtonProps?.variant ?? 'primary',
		size: defaults?.confirmButtonProps?.size ?? 'md',
		appearance: defaults?.confirmButtonProps?.appearance ?? 'default',
		mode: defaults?.confirmButtonProps?.mode ?? 'default',
		className: defaults?.confirmButtonProps?.className ?? '',
	});

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async () => {
			if (handler) {
				return await handler();
			}
		},
		onSuccess: () => {
			close();
		},
	});

	const showConfirmation = (opts: Omit<DeleteConfirmationOptions, 'children'>) => {
		setMessage(opts.message ?? null);
		setTitle(opts.title ?? defaults?.title ?? 'Are you sure you want to delete?');
		setHandler(() => opts.onConfirm);
		setConfirmButtonProps(opts.confirmButtonProps ?? confirmButtonProps);
		setCancelButtonProps(opts.cancelButtonProps ?? cancelButtonProps);
		setIcon(opts.icon ?? icon);
		open();
	};

	const ConfirmationDialog = useMemo(
		() => (
			<ConfirmationDialogRender
				opened={opened}
				title={title}
				message={message}
				icon={icon}
				cancelButtonProps={cancelButtonProps}
				confirmButtonProps={confirmButtonProps}
				mutateAsync={mutateAsync}
				toggle={toggle}
				close={close}
				isPending={isPending}
			/>
		),
		[opened, toggle, title, message, isPending, mutateAsync, close, cancelButtonProps, confirmButtonProps, icon],
	);

	return { showConfirmation, ConfirmationDialog, confirmationPending: isPending, confirmationIsOpened: opened } as const;
};
