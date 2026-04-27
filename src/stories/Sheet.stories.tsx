import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sheet } from '@uikit/ui/sheet';
import { Button } from '@uikit/ui/button';

const meta: Meta<typeof Sheet> = {
	title: 'Components/Sheet',
	component: Sheet,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		SheetTrigger: Sheet.Trigger,
		SheetContent: Sheet.Content,
		SheetHeader: Sheet.Header,
		SheetTitle: Sheet.Title,
		SheetDescription: Sheet.Description,
		SheetFooter: Sheet.Footer,
	},
};
export default meta;

type Story = StoryObj<typeof Sheet>;

export const SheetPreview: Story = {
	render: () => (
		<Sheet>
			<Sheet.Trigger render={<Button>Open Sheet</Button>} />
			<Sheet.Content>
				<Sheet.Header>
					<Sheet.Title>Sheet Title</Sheet.Title>
					<Sheet.Description>This is a sheet description.</Sheet.Description>
				</Sheet.Header>
				<div className="p-4">
					<p>Sheet content goes here.</p>
				</div>
				<Sheet.Footer>
					<Sheet.Close render={<Button variant="secondary">Close</Button>} />
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet>
	),
};

export const SheetLeft: Story = {
	render: () => (
		<Sheet>
			<Sheet.Trigger render={<Button>Open Left</Button>} />
			<Sheet.Content side="left">
				<Sheet.Header>
					<Sheet.Title>Left Sheet</Sheet.Title>
				</Sheet.Header>
				<div className="p-4">
					<p>Content from left side.</p>
				</div>
			</Sheet.Content>
		</Sheet>
	),
};

export const SheetTop: Story = {
	render: () => (
		<Sheet>
			<Sheet.Trigger render={<Button>Open Top</Button>} />
			<Sheet.Content side="top">
				<Sheet.Header>
					<Sheet.Title>Top Sheet</Sheet.Title>
				</Sheet.Header>
				<div className="p-4">
					<p>Content from top.</p>
				</div>
			</Sheet.Content>
		</Sheet>
	),
};

export const SheetBottom: Story = {
	render: () => (
		<Sheet>
			<Sheet.Trigger render={<Button>Open Bottom</Button>} />
			<Sheet.Content side="bottom">
				<Sheet.Header>
					<Sheet.Title>Bottom Sheet</Sheet.Title>
				</Sheet.Header>
				<div className="p-4">
					<p>Content from bottom.</p>
				</div>
			</Sheet.Content>
		</Sheet>
	),
};
