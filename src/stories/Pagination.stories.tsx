import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from '../ui/pagination';

const meta: Meta<typeof Pagination> = {
	title: 'UI/Pagination',
	component: Pagination,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		totalPage: {
			control: { type: 'number', min: 1 },
		},
		currentPage: {
			control: { type: 'number', min: 1 },
		},
		boundaries: {
			control: { type: 'number', min: 0 },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const PaginationPreview: Story = {
	render: function PaginationStory() {
		const [page, setPage] = useState(1);
		return (
			<Pagination
				totalPage={10}
				currentPage={page}
				onPageChange={setPage}
			/>
		);
	},
};

export const PaginationManyPages: Story = {
	render: function PaginationManyPagesStory() {
		const [page, setPage] = useState(5);
		return (
			<Pagination
				totalPage={20}
				currentPage={page}
				onPageChange={setPage}
			/>
		);
	},
};

export const PaginationNoBoundaries: Story = {
	render: function PaginationNoBoundariesStory() {
		const [page, setPage] = useState(3);
		return (
			<Pagination
				totalPage={15}
				currentPage={page}
				onPageChange={setPage}
				boundaries={0}
			/>
		);
	},
};

export const PaginationFewPages: Story = {
	render: function PaginationFewPagesStory() {
		const [page, setPage] = useState(1);
		return (
			<Pagination
				totalPage={3}
				currentPage={page}
				onPageChange={setPage}
			/>
		);
	},
};
