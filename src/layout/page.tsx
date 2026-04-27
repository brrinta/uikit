import { ReactNode, useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { showNotification } from '../ui/sonner';
import { useSessionStorage } from '../hooks/use-session-storage';
import { SessionAlertType } from '../lib/types';
import { CriticalAlert } from '../components/popups/critical-alert';
export const Page = ({ children, disabled }: { children: ReactNode; disabled?: boolean }) => {
	const [alert, setAlert] = useSessionStorage<SessionAlertType>({
		key: 'alert',
		defaultValue: '',
		getInitialValueInEffect: false,
	});

	const currentRoute = useRouterState({
		select: (state) => state.matches[state.matches.length - 1],
	});
	useEffect(() => {
		if (!alert) return;
		showNotification({
			data: alert as any,
		});
		setAlert('');
	}, [alert]);

	return (
		<div
			className={'p-2 grow size-full relative flex flex-col gap-2 overflow-auto'}
			data-slot={'page'}>
			{currentRoute.context.secured ? <CriticalAlert className={'py-2! '} /> : null}
			{children}
		</div>
	);
};
