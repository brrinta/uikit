import { LinkProps } from '@tanstack/react-router';
import { Button, ButtonGroup, buttonVariants } from '@uikit/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import { isValidElement } from 'react';
import { Collapsible } from '@uikit/ui/collapsible';
import { Sidebar } from '@uikit/ui/sidebar';
import { DropdownMenu } from '@uikit/ui/dropdown-menu';
import { Badge } from '@uikit/ui/badge';
import { cn } from '@uikit/lib/utils';
import { AppLink } from '@uikit/components/app-link';

export interface NavbarLinkProps {
	icon?: any;
	key?: string;
	label: string;
	active?: boolean;
	links?: NavbarLinkProps[];
	link?: LinkProps;
	initiallyOpened?: boolean;
	isActive?: boolean;
	permissions?: any | Array<any>;
	permissionKey?: string;

	onClick?(): void;
}

export const NavCollapsibleMenu = ({ item, toRight }: { item: NavbarLinkProps; toRight?: boolean }) => (
	<Collapsible
		key={item.label}
		defaultOpen={item.isActive}
		className="group/collapsible">
		<Sidebar.MenuItem>
			{item.link ? (
				item.links?.length ? (
					<ButtonGroup className={'justify-between w-full'}>
						<AppLink
							{...item.link}
							className={'flex flex-row items-center gap-2 grow h-10 [&>svg]:size-5'}>
							{item.icon ? isValidElement(item.icon) ? item.icon : <item.icon /> : null}
							<span>{item.label}</span>
						</AppLink>
						<Collapsible.Trigger render={<div />}>
							<Sidebar.MenuButton
								className={'h-10'}
								render={<div />}>
								<Button
									mode={'icon'}
									variant={'outline'}
									color={'secondary'}>
									<ChevronRightIcon className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</Button>
							</Sidebar.MenuButton>
						</Collapsible.Trigger>
					</ButtonGroup>
				) : (
					<Sidebar.MenuButton
						render={
							<AppLink
								{...item.link}
								className={'flex flex-row items-center gap-2 grow h-10 [&>svg]:size-5'}
							/>
						}
						className={'h-10'}>
						{item.icon ? isValidElement(item.icon) ? item.icon : <item.icon /> : null}
						<span>{item.label}</span>
					</Sidebar.MenuButton>
				)
			) : (
				<Collapsible.Trigger
					render={
						<Sidebar.MenuButton className={'h-10 [&>svg]:size-5'}>
							{item.icon ? isValidElement(item.icon) ? item.icon : <item.icon /> : null}
							<span>{item.label}</span>
							{item.links?.length ? (
								<ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
							) : null}
						</Sidebar.MenuButton>
					}
				/>
			)}
			<Collapsible.Content>
				<Sidebar.MenuSub
					className={cn({
						'pr-0 mr-0': toRight,
					})}>
					{item.links?.map((subItem) =>
						subItem.link && !subItem.links?.length ? (
							<Sidebar.MenuSubItem key={subItem.label}>
								<Sidebar.MenuSubButton
									render={
										<AppLink
											{...subItem.link}
											className={'[&>svg]:size-5'}
										/>
									}
									className={'h-10'}>
									{subItem.icon ? isValidElement(subItem.icon) ? subItem.icon : <subItem.icon /> : null}
									<span>{subItem.label}</span>
								</Sidebar.MenuSubButton>
							</Sidebar.MenuSubItem>
						) : (
							NavCollapsibleMenu({ item: subItem, toRight })
						),
					)}
				</Sidebar.MenuSub>
			</Collapsible.Content>
		</Sidebar.MenuItem>
	</Collapsible>
);

export const NavDropdownMenu = ({ item, sub, isMobile }: { item: NavbarLinkProps; sub?: boolean; isMobile: boolean }) => (
	<DropdownMenu key={item.label}>
		<Sidebar.MenuItem>
			<DropdownMenu.Trigger
				nativeButton={!item.link}
				className={cn(
					buttonVariants({
						variant: 'dim',
						mode: 'icon',
						color: 'accent',
					}),
					'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground relative [&>svg]:size-5 w-full px-2',
				)}
				render={
					item.link ? (
						<AppLink {...item.link}>
							{item.icon ? isValidElement(item.icon) ? item.icon : <item.icon /> : null}
							{item.links?.length ? <Badge.Dot className={'absolute right-0 top-0 opacity-40'} /> : null}
						</AppLink>
					) : (
						<button>
							{item.icon ? isValidElement(item.icon) ? item.icon : <item.icon /> : null}
							{item.links?.length ? <Badge.Dot className={'absolute right-0 top-0 opacity-40'} /> : null}
						</button>
					)
				}
			/>
			{item.links?.length ? (
				<DropdownMenu.Content
					side={isMobile ? 'bottom' : 'right'}
					align={isMobile ? 'end' : 'start'}
					className="min-w-64 rounded-lg">
					{item.links.map((item) =>
						item.link && !item.links?.length ? (
							<DropdownMenu.Item
								key={item.label}
								render={
									<AppLink
										{...item.link}
										className={' [&>svg]:size-5'}>
										{item.icon ? isValidElement(item.icon) ? item.icon : <item.icon /> : null}
										{item.label}
									</AppLink>
								}
							/>
						) : (
							NavCollapsibleMenu({ item: item, toRight: true })
						),
					)}
				</DropdownMenu.Content>
			) : null}
		</Sidebar.MenuItem>
	</DropdownMenu>
);
