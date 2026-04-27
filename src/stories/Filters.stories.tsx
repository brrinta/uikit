import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterFieldConfig, Filters } from '../ui/filters';
import { Calendar, Hash, Mail, User } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Filters> = {
	title: 'Components/Filters',
	component: Filters,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Filters>;

const fields: FilterFieldConfig<any>[] = [
	{
		key: 'name',
		label: 'Name',
		type: 'text',
		icon: <User className="size-4" />,
	},
	{
		key: 'email',
		label: 'Email',
		type: 'email',
		icon: <Mail className="size-4" />,
	},
	{
		key: 'status',
		label: 'Status',
		type: 'select',
		options: [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' },
			{ label: 'Pending', value: 'pending' },
		],
		icon: <Hash className="size-4" />,
	},
	{
		key: 'created_at',
		label: 'Created At',
		type: 'date',
		icon: <Calendar className="size-4" />,
	},
];

export const FiltersPreview: Story = {
	render: (args) => {
		const [filters, setFilters] = useState<any[]>([]);
		return (
			<div className="w-[800px] min-h-[400px] p-4 border rounded-lg bg-card">
				<Filters
					{...args}
					fields={fields}
					filters={filters}
					onChange={setFilters}
				/>
				<div className="mt-8 p-4 bg-muted rounded text-xs font-mono">{JSON.stringify(filters, null, 2)}</div>
			</div>
		);
	},
};
