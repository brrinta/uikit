import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { FileInput } from '../../ui/file-input';

const meta: Meta<typeof FileInput> = {
	title: 'UI/Input/File',
	component: FileInput,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		clearable: { control: 'boolean' },
		placeholder: { control: 'text' },
		label: { control: 'text' },
	},
	decorators: [(Story) => <div className="w-80">{Story()}</div>],
};
export default meta;

type Story = StoryObj<typeof FileInput>;

export const Playground: Story = { args: { label: 'Attachment', placeholder: 'Select file...' } };

export const WithAccept: Story = {
	args: { label: 'Avatar', accept: 'image/png,image/jpeg', description: 'PNG or JPEG only' },
};

export const Clearable: Story = {
	render: (args) => {
		const [file, setFile] = React.useState<File | null>(null);
		return (
			<FileInput
				{...args}
				label="Report"
				clearable
				value={file}
				onValueChange={setFile}
				description={file ? undefined : 'Pick a file, then clear it with the × button'}
			/>
		);
	},
};

export const RequiredAndError: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			<FileInput {...args} label="Contract" required />
			<FileInput {...args} label="Contract" error="A signed contract is required" />
		</div>
	),
};

export const Disabled: Story = {
	args: { label: 'Locked upload', inputProps: { disabled: true } },
};
