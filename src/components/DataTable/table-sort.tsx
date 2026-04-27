import { SortDirection } from '../../schema';
import { RadioGroup } from '../../ui/radio';
import { Tabs } from '../../ui/tabs';
import { Popover } from '../../ui/popover';
import { Button, ButtonProps } from '../../ui/button';
import { IconArrowsSort } from '@tabler/icons-react';
import { SortType } from './types';
import { enumToPair } from '../../lib/uikit-utility';
import { Stack } from '../../ui/stack';

export const TableSort = <T extends Record<string, unknown>>({
	sortOptions,
	sort,
	setSort,
	sortBtnProps,
}: {
	sortBtnProps?: ButtonProps;
	sortOptions?: Array<{ label: string; field: string }>;
	sort: SortType;
	setSort: (sort: Partial<SortType>) => void;
}) => {
	return (
		<Popover>
			<Popover.Trigger
				render={
					<Button
						mode={'icon'}
						variant={'secondary'}
						{...(sortBtnProps || {})}>
						<IconArrowsSort />
					</Button>
				}
			/>
			<Popover.Content
				className={'gap-4 flex flex-col min-w-50 p-2'}
				align={'start'}
				side={'bottom'}>
				<Tabs
					value={String(sort.dir)}
					onValueChange={(v) => setSort({ dir: Number(v) })}>
					<Tabs.List
						size={'xs'}
						shape={'pill'}
						className={'grid w-full grid-cols-2'}>
						{enumToPair(SortDirection).map((c) => (
							<Tabs.Tab
								key={c.value}
								value={String(c.value)}>
								{c.label}
							</Tabs.Tab>
						))}
					</Tabs.List>
				</Tabs>
				<RadioGroup
					value={sort.field as string}
					onValueChange={(v: any) => setSort({ field: v })}>
					<Stack className={'gap-4'}>
						{(sortOptions || []).map((c, index) => (
							<RadioGroup.Item
								id={'datatable-sort-option-' + index}
								key={c.field as string}
								value={c.field as string}
								label={c.label}
							/>
						))}
					</Stack>
				</RadioGroup>
			</Popover.Content>
		</Popover>
	);
};
