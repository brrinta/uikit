import { TanStackDevtools, TanStackDevtoolsReactInit } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { FormDevtoolsPanel } from '@tanstack/react-form-devtools';
import { TableDevtoolsPanel } from '@tanstack/react-table-devtools';

export const Devtools = ({
	                         config,
	                         plugins,
	                         withQueryPlugin,
	                         withRouterPlugin,
	                         withFormPlugin,
	                         withTablePlugin,
                         }: {
	withQueryPlugin?: boolean;
	withRouterPlugin?: boolean;
	withFormPlugin?: boolean;
	withTablePlugin?: boolean;
	plugins?: TanStackDevtoolsReactInit['plugins'];
	config?: Partial<TanStackDevtoolsReactInit['config']>;
}) => {
	return (
		<TanStackDevtools
			config={config}
			plugins={[
				...(withQueryPlugin
					? [
						{
							name: 'TanStack Query',
							render: <ReactQueryDevtoolsPanel />,
						},
					]
					: []),
				...(withRouterPlugin
					? [
						{
							name: 'TanStack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
					]
					: []),
				...(withFormPlugin
					? [
						{
							name: 'TanStack Form',
							render: <FormDevtoolsPanel />,
						},
					]
					: []),
				...(withTablePlugin
					? [
						{
							name: 'TanStack Table',
							render: <TableDevtoolsPanel />,
						},
					]
					: []),
				...(plugins || []),
			]}
		/>
	);
};