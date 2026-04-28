import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const meta: Meta<typeof ChartContainer> = {
	title: 'UI/Chart',
	component: ChartContainer,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChartContainer>;

const chartData = [
	{ month: 'January', desktop: 186, mobile: 80 },
	{ month: 'February', desktop: 305, mobile: 200 },
	{ month: 'March', desktop: 237, mobile: 120 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--primary))',
	},
	mobile: {
		label: 'Mobile',
		color: 'hsl(var(--secondary))',
	},
} satisfies ChartConfig;

export const BarChartPreview: Story = {
	render: (args) => (
		<div className="w-[600px] h-[400px]">
			<ChartContainer
				config={chartConfig}
				{...args}>
				<BarChart
					accessibilityLayer
					data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="month"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar
						dataKey="desktop"
						fill="var(--color-desktop)"
						radius={4}
					/>
					<Bar
						dataKey="mobile"
						fill="var(--color-mobile)"
						radius={4}
					/>
				</BarChart>
			</ChartContainer>
		</div>
	),
};
