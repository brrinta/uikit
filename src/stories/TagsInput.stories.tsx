import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagsInput } from '@uikit/ui/tags-input';
import { useState } from 'react';

const meta: Meta<typeof TagsInput> = {
	title: 'Components/TagsInput',
	component: TagsInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	subcomponents: {
		TagsInputLabel: TagsInput.Label,
		TagsInputList: TagsInput.List,
		TagsInputInput: TagsInput.Input,
		TagsInputItem: TagsInput.Item,
	},
};
export default meta;

type Story = StoryObj<typeof TagsInput>;

export const TagsInputPreview: Story = {
	render: function TagsInputStory() {
		const [tags, setTags] = useState(['React', 'TypeScript']);
		return (
			<TagsInput
				value={tags}
				onValueChange={setTags}
				className="w-80">
				<TagsInput.Label>Tags</TagsInput.Label>
				<TagsInput.List className="border rounded-md">
					{tags.map((tag) => (
						<TagsInput.Item
							key={tag}
							value={tag}>
							{tag}
						</TagsInput.Item>
					))}
					<TagsInput.Input placeholder="Add tag..." />
				</TagsInput.List>
			</TagsInput>
		);
	},
};

export const TagsInputEmpty: Story = {
	render: function TagsInputEmptyStory() {
		const [tags, setTags] = useState<string[]>([]);
		return (
			<TagsInput
				value={tags}
				onValueChange={setTags}
				className="w-80">
				<TagsInput.Label>Keywords</TagsInput.Label>
				<TagsInput.List className="border rounded-md">
					{tags.map((tag) => (
						<TagsInput.Item
							key={tag}
							value={tag}>
							{tag}
						</TagsInput.Item>
					))}
					<TagsInput.Input placeholder="Type and press enter..." />
				</TagsInput.List>
			</TagsInput>
		);
	},
};

export const TagsInputWithMany: Story = {
	render: function TagsInputManyStory() {
		const [tags, setTags] = useState(['JavaScript', 'Python', 'Go', 'Rust', 'Java', 'C++']);
		return (
			<TagsInput
				value={tags}
				onValueChange={setTags}
				className="w-96">
				<TagsInput.Label>Programming Languages</TagsInput.Label>
				<TagsInput.List className="border rounded-md">
					{tags.map((tag) => (
						<TagsInput.Item
							key={tag}
							value={tag}>
							{tag}
						</TagsInput.Item>
					))}
					<TagsInput.Input placeholder="Add language..." />
				</TagsInput.List>
			</TagsInput>
		);
	},
};
