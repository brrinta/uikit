import { Alert, AlertProps } from '../../ui/alert';
import { useSessionStorage } from '../../hooks/use-session-storage';
import { useTimeout } from '../../hooks/use-timeout';
import { useEffect } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { SessionAlertType } from '../../lib/types';

export const CriticalAlert = (props: Omit<AlertProps, 'onClose'>) => {
	const [criticalAlert, setCriticalAlert] = useSessionStorage<SessionAlertType>({
		key: 'criticalAlert',
		defaultValue: '',
		getInitialValueInEffect: false,
	});
	const { start } = useTimeout(() => setCriticalAlert(''), 5000);
	useEffect(() => {
		if (criticalAlert) {
			start();
		}
	}, [criticalAlert]);
	return criticalAlert && typeof criticalAlert !== 'string' ? (
		<Alert
			variant={'destructive'}
			{...props}>
			<Alert.Title>
				<IconInfoCircle /> {criticalAlert?.message}
			</Alert.Title>
			<Alert.Description>{criticalAlert?.caption}</Alert.Description>
		</Alert>
	) : (
		<></>
	);
};
