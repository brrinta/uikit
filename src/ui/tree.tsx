'use client';

import { JSX, ReactNode, useRef } from 'react';
import { Button } from './button';
import { Box, ChevronDown, ChevronRight, Folder, Info, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ContextMenu } from './context-menu';
import { PreviewCard } from './preview-card';
import { cn } from '../lib/utils';
import { Input } from './input';
import { ScrollArea } from './scroll-area';
import { Checkbox } from './checkbox';
import { TreeController } from '../hooks/use-tree';
export interface TreeItemType {
	id: string;
	name: string;
	type?: string;
	children?: TreeItemType[];
	checked?: boolean | 'indeterminate';
}

export interface TreeIconMap {
	[key: string]: ReactNode | undefined;
}

export interface TreeMenuItem {
	id: string;
	label: string;
	icon?: ReactNode;
	action: (items: TreeItemType[]) => void;
}

export interface TreeProps {
	tree: TreeController;
	className?: string;
	searchPlaceholder?: string;
	showExpandAll?: boolean;
	showCheckboxes?: boolean;
	getIcon?: (item: TreeItemType, depth: number) => ReactNode;
	onAction?: (action: string, items: TreeItemType[]) => void;
	iconMap?: TreeIconMap;
	menuItems?: TreeMenuItem[];
	enableInfo?: boolean;
}

interface TreeItemProps {
	item: TreeItemType;
	depth?: number;
	tree: TreeController;
	getIcon?: (item: TreeItemType, depth: number) => ReactNode;
	onAction?: (action: string, items: TreeItemType[]) => void;
	allItems: TreeItemType[];
	showAccessRights?: boolean;
	iconMap?: TreeIconMap;
	menuItems?: TreeMenuItem[];
	enableInfo?: boolean;
}

const defaultIconMap: TreeIconMap = {
	file: <Box className="h-4 w-4 text-red-600" />,
	folder: <Folder className="h-4 w-4 text-primary/80" />,
};

function TreeItem({
	item,
	depth = 0,
	tree,
	getIcon,
	onAction,
	allItems,
	showAccessRights,
	iconMap,
	menuItems,
	enableInfo,
}: TreeItemProps): JSX.Element {
	const isOpen = tree.expandedIds.has(item.id);
	const itemRef = useRef<HTMLDivElement>(null);

	const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
		const nextState = checked === 'indeterminate' ? true : checked;
		tree.check(item.id, nextState);
	};

	const renderIcon = () => {
		if (getIcon) return getIcon(item, depth);
		return iconMap && ((item.type && iconMap[item.type]) || iconMap.folder || defaultIconMap.folder);
	};

	const getItemPath = (item: TreeItemType, items: TreeItemType[]): string => {
		const path: string[] = [item.name];
		const findParent = (currentItem: TreeItemType, allItems: TreeItemType[]) => {
			for (const potentialParent of allItems) {
				if (potentialParent.children?.some((child) => child.id === currentItem.id)) {
					path.unshift(potentialParent.name);
					findParent(potentialParent, allItems);
					break;
				}
				if (potentialParent.children) findParent(currentItem, potentialParent.children);
			}
		};
		findParent(item, items);
		return path.join(' → ');
	};

	return (
		<ContextMenu disabled={!menuItems || menuItems?.length === 0}>
			<ContextMenu.Trigger>
				<div className="select-none">
					<div
						ref={itemRef}
						data-tree-item
						data-id={item.id}
						className={cn('cursor-pointer px-1 rounded-md transition-colors text-foreground hover:bg-muted/50')}
						style={{ paddingLeft: `${depth * 20}px` }}>
						<div className="flex items-center h-8">
							{item.children ? (
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="h-6 w-6 shrink-0"
									onClick={(e) => {
										e.stopPropagation();
										tree.toggleExpand(item.id, !isOpen);
									}}>
									<motion.div
										initial={false}
										animate={{ rotate: isOpen ? 90 : 0 }}
										transition={{ duration: 0.1 }}>
										<ChevronRight className="h-4 w-4" />
									</motion.div>
								</Button>
							) : (
								<div className="w-6 shrink-0" />
							)}

							{showAccessRights ? (
								<div
									className="mr-2 flex items-center justify-center"
									onClick={(e) => e.stopPropagation()}>
									<Checkbox
										checked={typeof item.checked === 'boolean' ? item.checked : undefined}
										indeterminate={item.checked === 'indeterminate'}
										onCheckedChange={handleCheckboxChange}
										label={
											<div className="flex items-center gap-2 flex-1 min-w-0">
												{iconMap && <span className="shrink-0">{renderIcon()}</span>}
												<span className="truncate">{item.name}</span>
											</div>
										}
									/>
								</div>
							) : (
								<div className="flex items-center gap-2 flex-1 min-w-0">
									{iconMap && <span className="shrink-0">{renderIcon()}</span>}
									<span className="truncate">{item.name}</span>
								</div>
							)}

							{enableInfo && (
								<PreviewCard>
									<PreviewCard.Trigger
										render={
											<Button
												type="button"
												variant="ghost"
												size="sm"
												className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
												onClick={(e) => e.stopPropagation()}>
												<Info className="h-4 w-4 text-muted-foreground" />
											</Button>
										}></PreviewCard.Trigger>
									<PreviewCard.Content className="w-80 z-50">
										<div className="space-y-2">
											<h4 className="text-sm font-semibold">{item.name}</h4>
											<div className="text-sm text-muted-foreground space-y-1">
												<div>
													<span className="font-medium">ID:</span> {item.id}
												</div>
												<div>
													<span className="font-medium">Path:</span> {getItemPath(item, allItems)}
												</div>
											</div>
										</div>
									</PreviewCard.Content>
								</PreviewCard>
							)}
						</div>
					</div>

					<AnimatePresence>
						{item.children && isOpen && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.1 }}
								className="overflow-hidden">
								{item.children.map((child) => (
									<TreeItem
										key={child.id}
										item={child}
										depth={depth + 1}
										tree={tree}
										getIcon={getIcon}
										onAction={onAction}
										allItems={allItems}
										showAccessRights={showAccessRights}
										iconMap={iconMap}
										menuItems={menuItems}
										enableInfo={enableInfo}
									/>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</ContextMenu.Trigger>

			{menuItems && (
				<ContextMenu.Content className="w-64">
					{menuItems.map((menuItem) => (
						<ContextMenu.Item
							key={menuItem.id}
							onClick={() => menuItem.action([item])}>
							{menuItem.icon && <span className="mr-2 h-4 w-4">{menuItem.icon}</span>}
							{menuItem.label}
						</ContextMenu.Item>
					))}
				</ContextMenu.Content>
			)}
		</ContextMenu>
	);
}

export function Tree({
	className,
	tree,
	iconMap,
	searchPlaceholder = 'Search...',
	showExpandAll = true,
	showCheckboxes = false,
	getIcon,
	onAction,
	menuItems,
	enableInfo,
}: TreeProps) {
	return (
		<div className={cn('rounded-xl border flex flex-col', className)}>
			<div className="flex items-center gap-2 p-2 border-b">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input
						placeholder={searchPlaceholder}
						value={tree.searchQuery}
						onChange={(e) => tree.setSearchQuery(e.target.value)}
						className="h-9 pl-9"
					/>
				</div>
				{showExpandAll && (
					<div className="flex gap-1">
						<Button
							type={'button'}
							variant="ghost"
							size="icon"
							onClick={tree.expandAll}
							title="Expand All">
							<ChevronDown className="size-4" />
						</Button>
						<Button
							type={'button'}
							variant="ghost"
							size="icon"
							onClick={tree.collapseAll}
							title="Collapse All">
							<ChevronRight className="size-4" />
						</Button>
					</div>
				)}
			</div>

			<ScrollArea className="flex-1 md:max-h-175 max-h-96 py-2">
				{tree.displayItems.map((item) => (
					<TreeItem
						key={item.id}
						item={item}
						tree={tree}
						getIcon={getIcon}
						onAction={onAction}
						allItems={tree.data}
						showAccessRights={showCheckboxes}
						iconMap={iconMap}
						menuItems={menuItems}
						enableInfo={enableInfo}
					/>
				))}
				{tree.displayItems.length === 0 && <div className="text-center py-10 text-muted-foreground text-sm">No items found</div>}
			</ScrollArea>
		</div>
	);
}
