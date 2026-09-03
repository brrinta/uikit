import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Download, Mail, Plus, Settings, Trash2 } from 'lucide-react';
import * as React from 'react';
import { Button, buttonColors, buttonVariants, type ButtonColor, type ButtonProps } from '../ui/button';
import { getCvaSchema, prepareArgTypes } from '../lib/utils';

const schema = getCvaSchema(buttonVariants);
const variants = schema.variant as NonNullable<ButtonProps['variant']>[];
const sizes = schema.size as NonNullable<ButtonProps['size']>[];
const radii = schema.radius as NonNullable<ButtonProps['radius']>[];
const appearances = schema.appearance as NonNullable<ButtonProps['appearance']>[];
const modes = schema.mode as NonNullable<ButtonProps['mode']>[];
const colors = Object.keys(buttonColors) as ButtonColor[];
const semanticColors: ButtonColor[] = ['primary', 'brand', 'secondary', 'accent', 'destructive', 'success', 'warning', 'info'];
const neutralColors: ButtonColor[] = ['white', 'mono', 'foreground'];
const paletteColors = colors.filter((c) => !semanticColors.includes(c) && !neutralColors.includes(c) && c !== 'inverse');

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
	component: Button,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: prepareArgTypes(buttonVariants, {
		loading: { control: 'boolean' },
		disabled: { control: 'boolean' },
		selected: { control: 'boolean' },
		children: { control: 'text' },
	}),
	args: {
		children: 'Save changes',
		variant: 'solid',
		color: 'primary',
		size: 'md',
		radius: 'md',
		appearance: 'default',
		mode: 'default',
	},
	subcomponents: {
		'Button.Arrow': Button.Arrow,
		'Button.Group': Button.Group,
		'Button.GroupText': Button.GroupText,
		'Button.GroupSeparator': Button.GroupSeparator,
	},
};
export default meta;

type Story = StoryObj<typeof Button>;

/* ------------------------------------------------------------------ helpers */

function Row({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className="flex items-center gap-3">
			<span className="w-24 shrink-0 text-xs text-muted-foreground">{label}</span>
			<div className="flex flex-wrap items-center gap-2">{children}</div>
		</div>
	);
}

function Matrix({ rows, cols, render }: { rows: string[]; cols: string[]; render: (row: string, col: string) => React.ReactNode }) {
	return (
		<div className="overflow-x-auto">
			<table className="border-separate border-spacing-2 text-xs">
				<thead>
					<tr>
						<th />
						{cols.map((c) => (
							<th key={c} className="text-start font-normal text-muted-foreground">
								{c}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((r) => (
						<tr key={r}>
							<th className="text-start font-normal text-muted-foreground">{r}</th>
							{cols.map((c) => (
								<td key={c}>{render(r, c)}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

/* ------------------------------------------------------------------ stories */

export const Playground: Story = {};

export const Variants: Story = {
	render: (args) => (
		<Row label="variant">
			{variants.map((v) => (
				<Button key={v} {...args} variant={v}>
					{v}
				</Button>
			))}
		</Row>
	),
};

export const SemanticColors: Story = {
	parameters: { layout: 'padded' },
	render: (args) => (
		<Matrix
			rows={variants}
			cols={semanticColors}
			render={(variant, color) => (
				<Button {...args} variant={variant as ButtonProps['variant']} color={color as ButtonColor}>
					{color}
				</Button>
			)}
		/>
	),
};

export const PaletteColors: Story = {
	parameters: { layout: 'padded' },
	render: (args) => (
		<Matrix
			rows={variants}
			cols={paletteColors}
			render={(variant, color) => (
				<Button {...args} variant={variant as ButtonProps['variant']} color={color as ButtonColor} size="sm">
					{color}
				</Button>
			)}
		/>
	),
};

export const NeutralColors: Story = {
	parameters: { layout: 'padded' },
	render: (args) => (
		<div className="flex flex-col gap-4">
			<Matrix
				rows={variants}
				cols={neutralColors}
				render={(variant, color) => (
					<Button {...args} variant={variant as ButtonProps['variant']} color={color as ButtonColor}>
						{color}
					</Button>
				)}
			/>
			<div className="rounded-lg bg-indigo-600 p-4 text-white">
				<Row label="inverse">
					{variants.map((v) => (
						<Button key={v} {...args} variant={v} color="inverse">
							{v}
						</Button>
					))}
				</Row>
			</div>
		</div>
	),
};

export const Appearances: Story = {
	parameters: { layout: 'padded' },
	render: (args) => (
		<Matrix
			rows={appearances}
			cols={semanticColors}
			render={(appearance, color) => (
				<Button {...args} appearance={appearance as ButtonProps['appearance']} color={color as ButtonColor}>
					{appearance}
				</Button>
			)}
		/>
	),
};

export const Sizes: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			<Row label="text">
				{sizes
					.filter((s) => s !== 'icon')
					.map((s) => (
						<Button key={s} {...args} size={s}>
							{s}
						</Button>
					))}
			</Row>
			<Row label="with icon">
				{sizes
					.filter((s) => s !== 'icon')
					.map((s) => (
						<Button key={s} {...args} size={s} icon={<Mail />}>
							{s}
						</Button>
					))}
			</Row>
			<Row label="icon">
				<Button {...args} size="icon" aria-label="Settings">
					<Settings />
				</Button>
				<Button {...args} size="icon" variant="outline" aria-label="Add">
					<Plus />
				</Button>
				<Button {...args} size="icon" variant="ghost" aria-label="Delete" color="destructive">
					<Trash2 />
				</Button>
			</Row>
		</div>
	),
};

export const Radius: Story = {
	render: (args) => (
		<Row label="radius">
			{radii.map((r) => (
				<Button key={r} {...args} radius={r}>
					{r}
				</Button>
			))}
		</Row>
	),
};

export const Modes: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			{modes.map((m) => (
				<Row key={m} label={m}>
					{variants.map((v) => (
						<Button key={v} {...args} mode={m} variant={v} className={m === 'input' ? 'min-w-40' : undefined}>
							{m === 'input' ? (
								<>
									<span className="grow text-start">{v}</span>
									<Button.Arrow />
								</>
							) : (
								v
							)}
						</Button>
					))}
				</Row>
			))}
		</div>
	),
};

export const Underline: Story = {
	render: (args) => (
		<Row label="underline">
			<Button {...args} variant="link">
				none
			</Button>
			<Button {...args} variant="link" underline="solid">
				solid
			</Button>
			<Button {...args} variant="link" underline="dashed">
				dashed
			</Button>
		</Row>
	),
};

export const States: Story = {
	parameters: { layout: 'padded' },
	render: (args) => (
		<Matrix
			rows={['default', 'selected', 'loading', 'disabled', 'loading + disabled']}
			cols={variants}
			render={(state, variant) => (
				<Button
					{...args}
					variant={variant as ButtonProps['variant']}
					selected={state === 'selected'}
					loading={state.includes('loading')}
					disabled={state.includes('disabled')}>
					{variant}
				</Button>
			)}
		/>
	),
};

export const Loading: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			<Row label="sizes">
				{sizes
					.filter((s) => s !== 'icon')
					.map((s) => (
						<Button key={s} {...args} size={s} loading>
							{s}
						</Button>
					))}
			</Row>
			<Row label="icon only">
				<Button {...args} size="icon" loading aria-label="Loading">
					<Settings />
				</Button>
				<Button {...args} mode="icon" loading aria-label="Loading">
					<Settings />
				</Button>
			</Row>
			<Row label="with icon">
				<Button {...args} icon={<Download />} loading>
					Downloading
				</Button>
			</Row>
		</div>
	),
};

export const WithIcons: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			<Row label="leading">
				<Button {...args} icon={<Mail />}>
					Send email
				</Button>
				<Button {...args} variant="outline" icon={<Download />}>
					Download
				</Button>
			</Row>
			<Row label="trailing">
				<Button {...args}>
					Continue <ArrowRight />
				</Button>
			</Row>
			<Row label="arrow">
				<Button {...args} variant="outline" className="min-w-40">
					Options <Button.Arrow />
				</Button>
				<Button {...args} variant="outline" selected className="min-w-40">
					Open state <Button.Arrow />
				</Button>
			</Row>
		</div>
	),
};

export const AutoHeight: Story = {
	render: (args) => (
		<div className="flex max-w-xs flex-col gap-3">
			<Button {...args} autoHeight variant="outline">
				This label is long enough that it wraps onto a second line when the button is constrained.
			</Button>
			<Button {...args} fullWidth>
				Full width
			</Button>
		</div>
	),
};

export const Hideable: Story = {
	parameters: { docs: { description: { story: 'The `hideable` label collapses below the `sm` breakpoint. Resize the viewport to see it.' } } },
	render: (args) => (
		<Row label="hideable">
			<Button {...args} variant="outline" icon={<Plus />} hideable={{ children: 'New project' }} aria-label="New project" />
			<Button {...args} icon={<Download />} hideable={{ children: 'Export', className: 'ms-1' }} aria-label="Export" />
		</Row>
	),
};

export const RenderAsLink: Story = {
	parameters: { docs: { description: { story: 'Use `render` to swap the element. Base UI adds `role="button"` and keyboard handling for non-button elements.' } } },
	render: (args) => (
		<Row label="render">
			<Button {...args} render={<a href="#top" />}>
				Anchor
			</Button>
			<Button {...args} variant="link" render={<a href="#top" />}>
				Link variant
			</Button>
			<Button {...args} variant="outline" nativeButton={false} render={<span />}>
				Span with role
			</Button>
		</Row>
	),
};

export const LegacyVariants: Story = {
	parameters: { docs: { description: { story: '`variant="primary" | "secondary" | "destructive"` still work and map to `solid` + `color`.' } } },
	render: (args) => (
		<Row label="legacy">
			<Button {...args} variant="primary">
				primary
			</Button>
			<Button {...args} variant="secondary">
				secondary
			</Button>
			<Button {...args} variant="destructive">
				destructive
			</Button>
		</Row>
	),
};

export const Group: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			<Row label="horizontal">
				<Button.Group>
					<Button {...args} variant="outline">
						Day
					</Button>
					<Button {...args} variant="outline" selected>
						Week
					</Button>
					<Button {...args} variant="outline">
						Month
					</Button>
				</Button.Group>
			</Row>
			<Row label="with text">
				<Button.Group>
					<Button.GroupText>https://</Button.GroupText>
					<Button {...args} variant="outline">
						example.com
					</Button>
					<Button.GroupSeparator />
					<Button {...args} variant="outline" size="icon" aria-label="Settings">
						<Settings />
					</Button>
				</Button.Group>
			</Row>
			<Row label="split">
				<Button.Group>
					<Button {...args}>Publish</Button>
					<Button {...args} size="icon" aria-label="More options">
						<Button.Arrow className="m-0" />
					</Button>
				</Button.Group>
			</Row>
			<Row label="vertical">
				<Button.Group orientation="vertical">
					<Button {...args} variant="outline">
						Top
					</Button>
					<Button {...args} variant="outline">
						Middle
					</Button>
					<Button {...args} variant="outline">
						Bottom
					</Button>
				</Button.Group>
			</Row>
			<Row label="radius">
				<Button.Group radius="full">
					<Button {...args} variant="outline">
						Left
					</Button>
					<Button {...args} variant="outline">
						Right
					</Button>
				</Button.Group>
			</Row>
		</div>
	),
};
