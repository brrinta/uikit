import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tree, TreeItemType } from '../ui/tree';
import { useTree } from '../hooks/use-tree';
const meta: Meta<typeof Tree> = {
	title: 'Components/Tree',
	component: Tree,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Tree>;

const treeData: TreeItemType[] = [
	{
		id: '1',
		name: 'Documents',
		type: 'folder',
		children: [
			{ id: '1-1', name: 'Resume.pdf', type: 'file' },
			{ id: '1-2', name: 'Cover Letter.docx', type: 'file' },
			{
				id: '1-3',
				name: 'Projects',
				type: 'folder',
				children: [
					{ id: '1-3-1', name: 'Project A', type: 'file' },
					{ id: '1-3-2', name: 'Project B', type: 'file' },
				],
			},
		],
	},
	{
		id: '2',
		name: 'Images',
		type: 'folder',
		children: [
			{ id: '2-1', name: 'photo.jpg', type: 'file' },
			{ id: '2-2', name: 'screenshot.png', type: 'file' },
		],
	},
	{ id: '3', name: 'notes.txt', type: 'file' },
];

export const TreePreview: Story = {
	render: function TreeStory() {
		const tree = useTree({ initialData: treeData });
		return (
			<div className="w-80 border rounded-lg p-4">
				<Tree tree={tree} />
			</div>
		);
	},
};

export const TreeWithCheckboxes: Story = {
	render: function TreeCheckboxStory() {
		const tree = useTree({ initialData: treeData });
		return (
			<div className="w-80 border rounded-lg p-4">
				<Tree
					tree={tree}
					showCheckboxes
				/>
			</div>
		);
	},
};

export const TreeWithSearch: Story = {
	render: function TreeSearchStory() {
		const tree = useTree({ initialData: treeData });
		return (
			<div className="w-80 border rounded-lg p-4">
				<Tree
					tree={tree}
					searchPlaceholder="Search files..."
				/>
			</div>
		);
	},
};

export const TreeWithExpandAll: Story = {
	render: function TreeExpandStory() {
		const tree = useTree({ initialData: treeData });
		return (
			<div className="w-80 border rounded-lg p-4">
				<Tree
					tree={tree}
					showExpandAll
				/>
			</div>
		);
	},
};
