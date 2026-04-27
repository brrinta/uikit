import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from '../ui/fieldset';
import { Field } from '../ui/field';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';

const meta: Meta<typeof Fieldset> = {
	title: 'Components/Fieldset',
	component: Fieldset,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const FieldsetPreview: Story = {
	render: () => (
		<Fieldset className="w-80">
			<Fieldset.Legend>Account Information</Fieldset.Legend>
			<div className="space-y-4 pt-4">
				<Field>
					<Field.Label>Username</Field.Label>
					<Input placeholder="johndoe" />
				</Field>
				<Field>
					<Field.Label>Email</Field.Label>
					<Input
						type="email"
						placeholder="john@example.com"
					/>
				</Field>
			</div>
		</Fieldset>
	),
};

export const FieldsetWithCheckboxes: Story = {
	render: () => (
		<Fieldset className="w-80">
			<Fieldset.Legend>Notifications</Fieldset.Legend>
			<div className="space-y-3 pt-4">
				<Checkbox
					label="Email notifications"
					defaultChecked
				/>
				<Checkbox label="SMS notifications" />
				<Checkbox label="Push notifications" />
			</div>
		</Fieldset>
	),
};

export const FieldsetWithError: Story = {
	render: () => (
		<Fieldset
			className="w-80"
			invalid>
			<Fieldset.Legend>Security</Fieldset.Legend>
			<div className="space-y-4 pt-4">
				<Field>
					<Field.Label>New Password</Field.Label>
					<Input type="password" />
				</Field>
			</div>
		</Fieldset>
	),
};
