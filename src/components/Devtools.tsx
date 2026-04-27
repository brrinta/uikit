import { TanStackDevtools, TanStackDevtoolsReactInit } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { useEffect, useState } from 'react';
import { EventClient } from '@tanstack/devtools-event-client';
import { FormDevtoolsPanel } from '@tanstack/react-form-devtools';
import clsx from 'clsx';

export const Devtools = ({
	config,
	plugins,
	withQueryPlugin,
	withRouterPlugin,
	withFormPlugin,
	withClientPlugin,
	eventBusPort,
}: {
	withQueryPlugin?: boolean;
	withRouterPlugin?: boolean;
	withFormPlugin?: boolean;
	withClientPlugin?: boolean;
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
				...(withClientPlugin
					? [
							{
								name: 'Client Plugin',
								render: <ClientPlugin />,
							},
						]
					: []),
				...(plugins || []),
			]}
		/>
	);
};
const ClientPlugin = () => {
	const [events, setEvents] = useState<Array<{ type: string; pluginId?: string; payload: { title: string; description: string } }>>([]);

	useEffect(() => {
		const cleanup = DevtoolsEventClient.onAll((event) => {
			// console.log('Received message in here:', event);
			setEvents((prev) => [
				...prev,
				{
					payload: event.payload,
					pluginId: event.pluginId,
					type: event.type.replace(event.pluginId + ':' || ':', ''),
				},
			]);
		});

		return cleanup;
	}, []);
	return (
		<div className={'flex flex-col'}>
			<div className={'flex justify-between items-center pl-4 pr-2 py-2 bg-gray-900'}>
				<h1 className={'text-white font-bold'}>Client Devtools</h1>
				{/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
				<button
					onClick={() => setEvents([])}
					className={'right-6 top-2 p-1 rounded-sm bg-gray-700 cursor-pointer hover:bg-gray-600'}>
					&#x274C;
				</button>
			</div>
			<div className={'grid'}>
				{events.map((event, i) => (
					<div
						key={i}
						className={clsx('flex gap-4 py-2 px-3', { 'bg-grape-50/5': i % 2 })}>
						<h2
							className={clsx('font-bold px-1', {
								'bg-red': event.type === 'init',
								'bg-dark': event.type === 'query',
								'bg-blue': event.type === 'test',
								'bg-gray-600': event.type === 'log',
								'bg-red-500': event.type === 'error',
								'bg-orange-300': event.type === 'warn',
								'bg-purple-500': event.type === 'debug',
							})}>
							{event.type}
						</h2>
						<h2 className={'font-bold'}>{event.payload.title}</h2>
						<p style={{ color: 'gray' }}>{event.payload.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

interface EventMap {
	'client-devtools:init': {
		title: string;
		description: string;
	};
	'client-devtools:query': {
		title: string;
		description: string;
	};
	'client-devtools:test': {
		title: string;
		description: string;
	};
	'client-devtools:log': {
		title: string;
		description: string;
	};
	'client-devtools:error': {
		title: string;
		description: string;
	};
	'client-devtools:warn': {
		title: string;
		description: string;
	};
	'client-devtools:debug': {
		title: string;
		description: string;
	};
}

class CustomEventClient extends EventClient<EventMap> {
	constructor() {
		super({
			pluginId: 'client-devtools',
			debug: false,
		});
	}
}

export const DevtoolsEventClient = new CustomEventClient();
// this should be queued and emitted when bus is available
DevtoolsEventClient.emit('init', {
	title: 'Client Devtools',
	description: 'Client Devtools initialized',
});
