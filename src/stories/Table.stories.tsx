import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from '../ui/table';

const meta: Meta<typeof Table> = {
	title: 'UI/Table',
	component: Table,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		TableThead: Table.Thead,
		TableTbody: Table.Tbody,
		TableTfoot: Table.Tfoot,
		TableTr: Table.Tr,
		TableTh: Table.Th,
		TableTd: Table.Td,
		TableCaption: Table.Caption,
	},
};
export default meta;

type Story = StoryObj<typeof Table>;

const invoices = [
	{ invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
	{ invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
	{ invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
	{ invoice: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
	{ invoice: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
];

export const TablePreview: Story = {
	render: () => (
		<Table className="w-[500px]">
			<Table.Caption>A list of recent invoices.</Table.Caption>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Invoice</Table.Th>
					<Table.Th>Status</Table.Th>
					<Table.Th>Method</Table.Th>
					<Table.Th className="text-right">Amount</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				{invoices.map((invoice) => (
					<Table.Tr key={invoice.invoice}>
						<Table.Td className="font-medium">{invoice.invoice}</Table.Td>
						<Table.Td>{invoice.status}</Table.Td>
						<Table.Td>{invoice.method}</Table.Td>
						<Table.Td className="text-right">{invoice.amount}</Table.Td>
					</Table.Tr>
				))}
			</Table.Tbody>
			<Table.Tfoot>
				<Table.Tr>
					<Table.Td colSpan={3}>Total</Table.Td>
					<Table.Td className="text-right">$1,750.00</Table.Td>
				</Table.Tr>
			</Table.Tfoot>
		</Table>
	),
};

export const TableSimple: Story = {
	render: () => (
		<Table className="w-[400px]">
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Name</Table.Th>
					<Table.Th>Email</Table.Th>
					<Table.Th>Role</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				<Table.Tr>
					<Table.Td>John Doe</Table.Td>
					<Table.Td>john@example.com</Table.Td>
					<Table.Td>Admin</Table.Td>
				</Table.Tr>
				<Table.Tr>
					<Table.Td>Jane Smith</Table.Td>
					<Table.Td>jane@example.com</Table.Td>
					<Table.Td>User</Table.Td>
				</Table.Tr>
			</Table.Tbody>
		</Table>
	),
};
