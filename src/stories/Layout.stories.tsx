import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Box } from '../ui/box';
import { Container } from '../ui/container';
import { Flex } from '../ui/flex';
import { Group } from '../ui/group';
import { Stack } from '../ui/stack';

const meta: Meta = {
	title: 'UI/Layout',
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
};
export default meta;

const Cell = ({ children }: { children: React.ReactNode }) => (
	<div className="flex h-12 min-w-16 items-center justify-center rounded-md bg-muted px-3 text-sm text-muted-foreground">{children}</div>
);

export const BoxStory: StoryObj = {
	name: 'Box',
	render: () => (
		<Box className="rounded-lg border p-4">
			<p className="text-sm">Box is the bare building block — a div that joins the layout slot system.</p>
		</Box>
	),
};

export const FlexStory: StoryObj = {
	name: 'Flex',
	render: () => (
		<Flex className="items-center justify-between gap-2 rounded-lg border p-4">
			<Cell>start</Cell>
			<Cell>middle</Cell>
			<Cell>end</Cell>
		</Flex>
	),
};

export const GroupStory: StoryObj = {
	name: 'Group',
	render: () => (
		<Group className="rounded-lg border p-4">
			{Array.from({ length: 9 }, (_, i) => (
				<Cell key={i}>item {i + 1}</Cell>
			))}
		</Group>
	),
};

export const StackStory: StoryObj = {
	name: 'Stack',
	render: () => (
		<Stack className="gap-2 rounded-lg border p-4">
			<Cell>first</Cell>
			<Cell>second</Cell>
			<Cell>third</Cell>
		</Stack>
	),
};

export const ContainerStory: StoryObj = {
	name: 'Container',
	render: () => (
		<Container className="rounded-lg border bg-muted/30 p-4">
			<p className="text-sm">Container centers content and constrains its max width.</p>
		</Container>
	),
};

export const Composition: StoryObj = {
	render: () => (
		<Container className="rounded-lg border p-4">
			<Stack className="gap-3">
				<Flex className="items-center justify-between">
					<span className="text-sm font-medium">Dashboard</span>
					<Group>
						<Cell>filter</Cell>
						<Cell>export</Cell>
					</Group>
				</Flex>
				<Group>
					{Array.from({ length: 4 }, (_, i) => (
						<Box key={i} className="min-w-40 grow rounded-md border p-3 text-sm">
							Metric {i + 1}
						</Box>
					))}
				</Group>
			</Stack>
		</Container>
	),
};
