import { Link, LinkProps } from '@tanstack/react-router';
import React from 'react';

export type AppLinkProps = LinkProps & {
	className?: string;
};

const AppLink: React.FC<AppLinkProps> = (props) => {
	return (
		<Link
			{...props}
			activeOptions={{
				exact: true,
				includeSearch: false,
				includeHash: false,
				...props.activeOptions,
			}}
		/>
	);
};
AppLink.displayName = 'AppLink';
export { AppLink };
