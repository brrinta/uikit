import { lazy, Suspense } from 'react';
import type { TanStackDevtoolsReactInit } from '@tanstack/react-devtools';

interface DevtoolsProps {
	withQueryPlugin?: boolean;
	withRouterPlugin?: boolean;
	withFormPlugin?: boolean;
	withTablePlugin?: boolean;
	plugins?: TanStackDevtoolsReactInit['plugins'];
	config?: Partial<TanStackDevtoolsReactInit['config']>;
}

// One lazy component that owns ALL devtools imports — nothing static.
const DevtoolsImpl = lazy(async () => {
	const [{ TanStackDevtools }, query, router, form, table] = await Promise.all([
		import('@tanstack/react-devtools'),
		import('@tanstack/react-query-devtools'),
		import('@tanstack/react-router-devtools'),
		import('@tanstack/react-form-devtools'),
		import('@tanstack/react-table-devtools'),
	]);

	return {
		default: ({ config, plugins, withQueryPlugin, withRouterPlugin, withFormPlugin, withTablePlugin }: DevtoolsProps) => (
			<TanStackDevtools
				config={config}
				plugins={[
					...(withQueryPlugin ? [{ name: 'TanStack Query', render: <query.ReactQueryDevtoolsPanel /> }] : []),
					...(withRouterPlugin ? [{ name: 'TanStack Router', render: <router.TanStackRouterDevtoolsPanel /> }] : []),
					...(withFormPlugin ? [{ name: 'TanStack Form', render: <form.FormDevtoolsPanel /> }] : []),
					...(withTablePlugin ? [{ name: 'TanStack Table', render: <table.TableDevtoolsPanel /> }] : []),
					...(plugins || []),
				]}
			/>
		),
	};
});

export const Devtools = (props: DevtoolsProps) => {
	if (!import.meta.env.DEV) return null;
	return (
		<Suspense fallback={null}>
			<DevtoolsImpl {...props} />
		</Suspense>
	);
};