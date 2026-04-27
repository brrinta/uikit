import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kanban } from '@uikit/ui/sortable';
import { useState } from 'react';

const meta: Meta<typeof Kanban> = {
	title: 'Components/Sortable',
	component: Kanban,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Kanban>;

const initialData = {
	'To Do': [
		{ id: '1', content: 'Task 1' },
		{ id: '2', content: 'Task 2' },
	],
	'In Progress': [
		{ id: '3', content: 'Task 3' },
	],
	Done: [
		{ id: '4', content: 'Task 4' },
	],
};

export const KanbanPreview: Story = {
	render: (args) => {
		const [data, setData] = useState<any>(initialData);
		return (
			<Kanban
				{...args}
				value={data}
				onValueChange={setData}
				getItemValue={(item: any) => item.id}
				className="flex gap-4 p-4 h-[500px]">
				{Object.entries(data).map(([columnId, items]) => (
					<Kanban.Column key={columnId} id={columnId} className="w-64 bg-muted/50 rounded-lg p-2 flex flex-col gap-2 border">
						<div className="flex items-center justify-between px-2 py-1">
							<Kanban.ColumnTrigger className="font-semibold text-sm cursor-grab active:cursor-grabbing">
								{columnId}
							</Kanban.ColumnTrigger>
						</div>
						<Kanban.ColumnContent className="flex flex-col gap-2 min-h-[50px]">
							{items.map((item: any) => (
								<Kanban.Item key={item.id} id={item.id} className="bg-card p-3 rounded border shadow-sm cursor-grab active:cursor-grabbing">
									<div className="text-sm">{item.content}</div>
								</Kanban.Item>
							))}
						</Kanban.ColumnContent>
					</Kanban.Column>
				))}
				<Kanban.Overlay>
					{(id, type) => (
						<div className="bg-card p-3 rounded border shadow-lg opacity-80 border-primary">
							{type === 'item' ? `Dragging Item ${id}` : `Dragging Column ${id}`}
						</div>
					)}
				</Kanban.Overlay>
			</Kanban>
		);
	},
};
