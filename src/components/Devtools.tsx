import { TanStackDevtools, TanStackDevtoolsReactInit } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { FormDevtoolsPanel } from '@tanstack/react-form-devtools';

export const Devtools = ({
	                         config,
	                         plugins,
	                         withQueryPlugin,
	                         withRouterPlugin,
	                         withFormPlugin,
	                         eventBusConfig,
                         }: {
	withQueryPlugin?: boolean;
	withRouterPlugin?: boolean;
	withFormPlugin?: boolean;
	plugins?: TanStackDevtoolsReactInit['plugins'];
	config?: Partial<TanStackDevtoolsReactInit['config']>;
	eventBusConfig?: TanStackDevtoolsReactInit['eventBusConfig'];
}) => {
	return (
		<TanStackDevtools
			config={config}
			eventBusConfig={eventBusConfig}
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
				...(plugins || []),
			]}
		/>
	);
};

