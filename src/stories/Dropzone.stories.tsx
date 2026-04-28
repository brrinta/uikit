import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropzone, useDropzone } from '../ui/dropzone';

const meta: Meta<typeof Dropzone> = {
	title: 'UI/Dropzone',
	component: Dropzone,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Dropzone>;

const DropzoneWrapper = (props: any) => {
	const dropzone = useDropzone(props);
	return <Dropzone {...dropzone}>{props.children}</Dropzone>;
};

export const DropzonePreview: Story = {
	render: (args) => (
		<DropzoneWrapper
			{...args}
			className="w-80">
			<Dropzone.Area>
				<Dropzone.Trigger>
					<div className="flex flex-col items-center gap-2">
						<Dropzone.Description>Drop files here or click to browse</Dropzone.Description>
					</div>
				</Dropzone.Trigger>
			</Dropzone.Area>
		</DropzoneWrapper>
	),
};

export const DropzoneWithAccept: Story = {
	render: (args) => (
		<DropzoneWrapper
			{...args}
			accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
			className="w-80">
			<Dropzone.Area>
				<Dropzone.Trigger>
					<div className="flex flex-col items-center gap-2">
						<Dropzone.Description>Upload images (PNG, JPG, GIF)</Dropzone.Description>
					</div>
				</Dropzone.Trigger>
			</Dropzone.Area>
		</DropzoneWrapper>
	),
};

export const DropzoneWithFileList: Story = {
	render: (args) => (
		<DropzoneWrapper
			{...args}
			className="w-96">
			<Dropzone.Area>
				<Dropzone.Trigger>
					<Dropzone.Description>Drop files here or click to browse</Dropzone.Description>
				</Dropzone.Trigger>
			</Dropzone.Area>
			<Dropzone.FileList />
		</DropzoneWrapper>
	),
};

export const DropzoneDisabled: Story = {
	render: (args) => (
		<DropzoneWrapper
			{...args}
			disabled
			className="w-80">
			<Dropzone.Area>
				<Dropzone.Trigger>
					<Dropzone.Description>Disabled</Dropzone.Description>
				</Dropzone.Trigger>
			</Dropzone.Area>
		</DropzoneWrapper>
	),
};
