import type { Meta, StoryObj } from '@storybook/react-vite';
import { Anchor, anchorVariants } from '../ui/Anchor';
import { getCvaSchema } from '../lib/utils';

const schema = getCvaSchema(anchorVariants);

const meta: Meta<typeof Anchor> = {
	title: 'UI/Anchor',
	component: Anchor,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Anchor>;

export const Playground: Story = {
	render: () => <Anchor href="https://github.com/brrinta/uikit">brrinta/uikit on GitHub</Anchor>,
};

export const Colors: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			{(schema.color ?? []).map((color) => (
				<Anchor key={String(color)} href="#" color={color as never}>
					{String(color)}
				</Anchor>
			))}
		</div>
	),
};

export const Underline: Story = {
	render: () => (
		<div className="flex gap-6">
			{(schema.underline ?? []).map((u) => (
				<Anchor key={String(u)} href="#" underline={u as never}>
					underline: {String(u)}
				</Anchor>
			))}
		</div>
	),
};

export const SizesAndWeights: Story = {
	render: () => (
		<div className="flex flex-col gap-2">
			{(schema.size ?? []).map((size) => (
				<Anchor key={String(size)} href="#" size={size as never}>
					size {String(size)}
				</Anchor>
			))}
			<div className="flex gap-4 pt-2">
				{(schema.weight ?? []).map((w) => (
					<Anchor key={String(w)} href="#" weight={w as never}>
						{String(w)}
					</Anchor>
				))}
			</div>
		</div>
	),
};

export const CustomRender: Story = {
	parameters: { docs: { description: { story: 'Anchor renders a plain <a> without `to`; pass `render` to swap the element (e.g. a button).' } } },
	render: () => <Anchor render={<button type="button" />}>Renders as a button</Anchor>,
};
