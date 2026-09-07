import { Link, LinkProps } from '@tanstack/react-router';
import React from 'react';

export type AppLinkProps = LinkProps & Omit<React.ComponentProps<'a'>, keyof LinkProps | 'href'>;

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
