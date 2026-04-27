import { useCallback, useMemo, useState } from 'react';
import { TreeItemType } from '../ui/tree';

export function updateTreeState(data: TreeItemType[], targetId: string, isChecked: boolean): TreeItemType[] {
	const deepClone = JSON.parse(JSON.stringify(data));
	const updatedWithDownwards = setNodeAndChildren(deepClone, targetId, isChecked);
	return syncParents(updatedWithDownwards);
}

function setNodeAndChildren(nodes: TreeItemType[], targetId: string, checked: boolean): TreeItemType[] {
	return nodes.map((node) => {
		if (node.id === targetId) return setAllChildren(node, checked);
		if (node.children) return { ...node, children: setNodeAndChildren(node.children, targetId, checked) };
		return node;
	});
}

function setAllChildren(node: TreeItemType, checked: boolean): TreeItemType {
	const newNode = { ...node, checked };
	if (newNode.children) newNode.children = newNode.children.map((child) => setAllChildren(child, checked));
	return newNode;
}

function syncParents(nodes: TreeItemType[]): TreeItemType[] {
	return nodes.map((node) => {
		if (!node.children || node.children.length === 0) return node;
		const syncedChildren = syncParents(node.children);
		const allChecked = syncedChildren.every((c) => c.checked === true);
		const allUnchecked = syncedChildren.every((c) => !c.checked);
		return {
			...node,
			children: syncedChildren,
			checked: allChecked ? true : allUnchecked ? false : 'indeterminate',
		};
	});
}

function resetTree(nodes: TreeItemType[]): TreeItemType[] {
	return nodes.map((node) => ({
		...node,
		checked: false,
		children: node.children ? resetTree(node.children) : undefined,
	}));
}

function getAllFolderIds(items: TreeItemType[]): string[] {
	let ids: string[] = [];
	items.forEach((item) => {
		if (item.children) {
			ids.push(item.id);
			ids = [...ids, ...getAllFolderIds(item.children)];
		}
	});
	return ids;
}

export function getCheckedIds(nodes: TreeItemType[]): string[] {
	let ids: string[] = [];
	for (const node of nodes) {
		if (node.checked === true) ids.push(node.id);
		if (node.children) ids = [...ids, ...getCheckedIds(node.children)];
	}
	return ids;
}

interface UseTreeOptions {
	initialData: TreeItemType[];
	initialChecked?: string[];
	initialExpanded?: string[];
}

export function useTree({ initialData, initialChecked = [], initialExpanded = [] }: UseTreeOptions) {
	const [data, setData] = useState<TreeItemType[]>(() => {
		let processedData = JSON.parse(JSON.stringify(initialData));
		if (initialChecked.length > 0) {
			initialChecked.forEach((id) => {
				processedData = updateTreeState(processedData, id, true);
			});
		}
		return processedData;
	});

	const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(initialExpanded));
	const [searchQuery, setSearchQuery] = useState('');

	const { displayItems, searchExpandedIds } = useMemo(() => {
		if (!searchQuery.trim()) return { displayItems: data, searchExpandedIds: new Set<string>() };

		const newExpandedIds = new Set<string>();
		const lowerQuery = searchQuery.toLowerCase();

		const filterNode = (nodes: TreeItemType[]): TreeItemType[] => {
			return nodes
				.map((node) => {
					const matches = node.name.toLowerCase().includes(lowerQuery);
					const children = node.children ? filterNode(node.children) : [];

					if (matches || children.length > 0) {
						if (node.children) newExpandedIds.add(node.id);
						return { ...node, children: children.length > 0 ? children : undefined } as TreeItemType;
					}
					return null;
				})
				.filter((n): n is TreeItemType => n !== null);
		};

		return { displayItems: filterNode(data), searchExpandedIds: newExpandedIds };
	}, [data, searchQuery]);

	const toggleExpand = useCallback((id: string, isOpen: boolean) => {
		setExpandedIds((prev) => {
			const next = new Set(prev);
			if (isOpen) next.add(id);
			else next.delete(id);
			return next;
		});
	}, []);

	const expandAll = useCallback(() => setExpandedIds(new Set(getAllFolderIds(data))), [data]);
	const collapseAll = useCallback(() => setExpandedIds(new Set()), []);

	const check = useCallback((id: string, isChecked: boolean) => {
		setData((prev) => updateTreeState(prev, id, isChecked));
	}, []);

	const setChecked = useCallback((ids: string[]) => {
		setData((prevData) => {
			let newData = resetTree(prevData);
			ids.forEach((id) => {
				newData = updateTreeState(newData, id, true);
			});

			return newData;
		});
	}, []);

	const getChecked = useCallback(() => getCheckedIds(data), [data]);

	return {
		data,
		displayItems,
		expandedIds: searchQuery.trim() ? new Set([...expandedIds, ...searchExpandedIds]) : expandedIds,
		searchQuery,
		setSearchQuery,
		toggleExpand,
		expandAll,
		collapseAll,
		check,
		setChecked,
		getChecked,
		setData,
		setExpandedIds,
	};
}

export type TreeController = ReturnType<typeof useTree>;
