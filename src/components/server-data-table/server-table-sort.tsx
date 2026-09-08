import type { ButtonProps, SortType } from '@brrinta/uikit';
import { Button, enumToPair, Popover, RadioGroup, SortDirection, Stack, ToggleGroup } from '@brrinta/uikit';
import { LucideChevronsUpDown, LucideCircleDot } from 'lucide-react';

export const ServerTableSort = <T extends Record<string, unknown>>({
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
						<LucideChevronsUpDown />
					</Button>
				}
			/>
			<Popover.Content
				className={'gap-4 flex flex-col min-w-50 p-2'}
				align={'start'}
				side={'bottom'}>
				<ToggleGroup
					value={[String(sort.dir)]}
					onValueChange={(v) => setSort({ dir: Number(v[0]) })}>
					{enumToPair(SortDirection).map((c) => (
						<ToggleGroup.Item
							size={'sm'}
							className={'grow'}
							key={c.value}
							value={String(c.value)}>
							{c.label}
						</ToggleGroup.Item>
					))}
				</ToggleGroup>
				<RadioGroup
					value={sort.field as string}
					onValueChange={(v) => setSort({ field: v })}>
					<Stack className={'gap-4'}>
						{(sortOptions || []).map((c, index) => (
							<RadioGroup.Item
								icon={({ className }) => <LucideCircleDot className={className} />}
								id={'serverdatatable-sort-option-' + index}
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
