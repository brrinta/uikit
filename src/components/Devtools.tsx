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
	                         eventBusPort,
                         }: {
	withQueryPlugin?: boolean;
	withRouterPlugin?: boolean;
	withFormPlugin?: boolean;
	plugins?: TanStackDevtoolsReactInit['plugins'];
	config?: Partial<TanStackDevtoolsReactInit['config']>;
	eventBusPort?: number;
}) => {
	return (
		<TanStackDevtools
			config={config}
			eventBusConfig={{
				debug: false,
				connectToServerBus: true,
				port: eventBusPort,
			}}
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

