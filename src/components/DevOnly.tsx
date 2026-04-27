import { ReactNode } from 'react';

export const DevOnly = ({ children }: { children: ReactNode }) => {
	if (import.meta.env.DEV) {
		return <>{children}</>;
	}
	return null;
};
