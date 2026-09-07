import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Button } from '../ui/button';
import { ToastProvider, toast, useToast, type ToastPosition } from '../ui/toast';

const meta: Meta<typeof ToastProvider> = {
	title: 'UI/Toast',
	component: ToastProvider,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		position: {
			control: 'select',
			options: ['bottom-right', 'bottom-left', 'bottom-center', 'top-right', 'top-left', 'top-center'] satisfies ToastPosition[],
		},
		timeout: { control: 'number' },
		limit: { control: 'number' },
	},
	args: { position: 'bottom-right' },
};
export default meta;

type Story = StoryObj<typeof ToastProvider>;

export const Playground: Story = {
	render: (args) => (
		<ToastProvider {...args}>
			<Button onClick={() => toast.add({ title: 'Event created', description: 'Friday, September 11 at 10:00' })}>Show toast</Button>
		</ToastProvider>
	),
};

export const Types: Story = {
	render: (args) => (
		<ToastProvider {...args}>
			<div className="flex flex-wrap gap-2">
				<Button variant="outline" onClick={() => toast.success('Deployed', { description: 'entero.biz is live.' })}>success</Button>
				<Button variant="outline" onClick={() => toast.error('Deploy failed', { description: 'Rollback started.' })}>error</Button>
				<Button variant="outline" onClick={() => toast.warning('Slow queries', { description: 'p95 above 800ms.' })}>warning</Button>
				<Button variant="outline" onClick={() => toast.info('New version', { description: 'Refresh to update.' })}>info</Button>
			</div>
		</ToastProvider>
	),
};

export const WithAction: Story = {
	render: (args) => (
		<ToastProvider {...args}>
			<Button
				onClick={() =>
					toast.add({
						title: 'Message archived',
						description: 'The conversation was moved to the archive.',
						actionProps: { children: 'Undo', onClick: () => toast.info('Restored') },
					})
				}>
				Archive
			</Button>
		</ToastProvider>
	),
};

export const PromiseToast: Story = {
	render: (args) => (
		<ToastProvider {...args}>
			<Button
				onClick={() =>
					toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
						loading: { title: 'Uploading report…' },
						success: { title: 'Uploaded', description: 'report.pdf is available.' },
						error: { title: 'Upload failed' },
					})
				}>
				Upload
			</Button>
		</ToastProvider>
	),
};

export const Stacking: Story = {
	parameters: { docs: { description: { story: 'Fire several — collapsed toasts peek behind the newest; hover to expand; swipe to dismiss.' } } },
	render: (args) => (
		<ToastProvider {...args} limit={5}>
			<Button onClick={() => toast.add({ title: `Toast #${Math.floor(Math.random() * 1000)}`, description: 'Hover the stack to expand.' })}>
				Add to stack
			</Button>
		</ToastProvider>
	),
};

export const UpdateAndClose: Story = {
	render: function UpdateStory(args) {
		const idRef = React.useRef<string | null>(null);
		return (
			<ToastProvider {...args}>
				<div className="flex gap-2">
					<Button onClick={() => (idRef.current = toast.add({ title: 'Processing…', timeout: 0 }))}>Start</Button>
					<Button variant="outline" onClick={() => idRef.current && toast.update(idRef.current, { title: 'Done', type: 'success', timeout: 3000 })}>
						Finish
					</Button>
					<Button variant="outline" onClick={() => toast.close()}>Close all</Button>
				</div>
			</ToastProvider>
		);
	},
};

export const HookUsage: Story = {
	render: function HookStory(args) {
		function Inner() {
			const manager = useToast();
			return <p className="text-xs text-muted-foreground">Active toasts: {manager.toasts.length}</p>;
		}
		return (
			<ToastProvider {...args}>
				<div className="flex flex-col items-center gap-2">
					<Button onClick={() => toast.add({ title: 'Counted' })}>Add</Button>
					<Inner />
				</div>
			</ToastProvider>
		);
	},
};
