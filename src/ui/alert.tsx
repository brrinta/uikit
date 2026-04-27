import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn, cvaWithMeta } from '../lib/utils';

export const alertVariants = cvaWithMeta('flex items-stretch w-full gap-2 group-[.toaster]:w-(--width)', {
	variants: {
		variant: {
			secondary: '',
			primary: '',
			destructive: '',
			success: '',
			info: '',
			mono: '',
			warning: '',
			brand: '',
			accent: '',
			red: '',
			orange: '',
			amber: '',
			yellow: '',
			lime: '',
			green: '',
			emerald: '',
			teal: '',
			cyan: '',
			sky: '',
			blue: '',
			indigo: '',
			violet: '',
			purple: '',
			fuchsia: '',
			pink: '',
			rose: '',
			slate: '',
			gray: '',
			zinc: '',
			neutral: '',
			stone: '',
		},
		icon: {
			primary: '',
			destructive: '',
			success: '',
			info: '',
			warning: '',
		},
		appearance: {
			solid: '',
			outline: '',
			light: '',
			stroke: 'text-foreground',
		},
		size: {
			lg: 'rounded-lg p-4 gap-3 text-base [&>[data-slot=alert-icon]>svg]:size-6 *:data-slot=alert-icon:mt-0.5 **:data-[slot=alert-close]:mt-1',
			md: 'rounded-lg p-3.5 gap-2.5 text-sm [&>[data-slot=alert-icon]>svg]:size-5 *:data-slot=alert-icon:mt-0 **:data-[slot=alert-close]:mt-0.5',
			sm: `rounded-md px-3 py-2.5 gap-2 text-xs [&>[data-slot=alert-icon]>svg]:size-4 *:data-alert-icon:mt-0.5 **:data-[slot=alert-close]:mt-px
			[&_[data-slot=alert-close]_svg]:size-3.5`,
		},
		radius: {
			none: 'rounded-none',
			sm: 'rounded-sm',
			md: 'rounded-md',
			lg: 'rounded-lg',
			xl: 'rounded-xl',
			'2xl': 'rounded-2xl',
			'3xl': 'rounded-3xl',
			full: 'rounded-full',
		},
	},
	compoundVariants: [
		/* Solid */
		{
			variant: 'secondary',
			appearance: 'solid',
			className: 'bg-muted text-foreground',
		},
		{
			variant: 'primary',
			appearance: 'solid',
			className: 'bg-primary text-primary-foreground',
		},
		{
			variant: 'destructive',
			appearance: 'solid',
			className: 'bg-destructive text-destructive-foreground',
		},
		{
			variant: 'success',
			appearance: 'solid',
			className: 'bg-success text-success-foreground',
		},
		{
			variant: 'info',
			appearance: 'solid',
			className: 'bg-info text-info-foreground',
		},
		{
			variant: 'warning',
			appearance: 'solid',
			className: 'bg-(--color-warning text-warning-foreground',
		},
		{
			variant: 'mono',
			appearance: 'solid',
			className: 'bg-zinc-950 text-white dark:bg-zinc-300 dark:text-black *:data-slot-[alert=close]:text-white',
		},
		/* Outline */
		{
			variant: 'secondary',
			appearance: 'outline',
			className: 'border border-border bg-background text-foreground **:data-[slot=alert-close]:text-foreground',
		},
		{
			variant: 'primary',
			appearance: 'outline',
			className: 'border border-border bg-background text-primary **:data-[slot=alert-close]:text-foreground',
		},
		{
			variant: 'destructive',
			appearance: 'outline',
			className: 'border border-border bg-background text-destructive **:data-[slot=alert-close]:text-foreground',
		},
		{
			variant: 'success',
			appearance: 'outline',
			className: 'border border-border bg-background text-success **:data-[slot=alert-close]:text-foreground',
		},
		{
			variant: 'info',
			appearance: 'outline',
			className: 'border border-border bg-background text-info **:data-[slot=alert-close]:text-foreground',
		},
		{
			variant: 'warning',
			appearance: 'outline',
			className: 'border border-border bg-background text-warning **:data-[slot=alert-close]:text-foreground',
		},
		{
			variant: 'mono',
			appearance: 'outline',
			className: 'border border-border bg-background text-foreground **:data-[slot=alert-close]:text-foreground',
		},
		/* Light */
		{
			variant: 'secondary',
			appearance: 'light',
			className: 'bg-muted border border-border text-foreground',
		},
		{
			variant: 'primary',
			appearance: 'light',
			className: `text-foreground bg-primary-soft border border-primary-alpha
				 **:data-[slot=alert-icon]:text-primary dark:bg-primary-soft
				 dark:border-primary-alpha`,
		},
		{
			variant: 'destructive',
			appearance: 'light',
			className: `bg-destructive-soft border border-destructive-alpha text-foreground
				*dark:bg-destructive-soft dark:border-destructive-alpha
				**:data-[slot=alert-title]:text-destructive *:data-[slot=alert-icon]:text-destructive`,
		},
		{
			variant: 'success',
			appearance: 'light',
			className: `bg-success-soft border border-success-alpha text-foreground
				**:data-[slot=alert-icon]:text-success dark:bg-success-soft
				dark:border-success-alpha`,
		},
		{
			variant: 'info',
			appearance: 'light',
			className: `bg-info-soft border border-info-alpha text-foreground
				**:data-[slot=alert-icon]:text-info dark:bg-info-soft
				dark:border-info-alpha`,
		},
		{
			variant: 'warning',
			appearance: 'light',
			className: `bg-warning-soft border border-warning-alpha text-foreground
				**:data-[slot=alert-icon]:text-warning dark:bg-warning-soft
				dark:border-warning-alpha`,
		},
		{ variant: 'brand', appearance: 'solid', className: 'bg-brand text-brand-foreground' },
		{ variant: 'brand', appearance: 'outline', className: 'border border-border bg-background text-brand' },
		{ variant: 'brand', appearance: 'light', className: 'bg-brand/10 border border-brand/20 text-foreground **:data-[slot=alert-icon]:text-brand' },
		{ variant: 'accent', appearance: 'solid', className: 'bg-accent text-accent-foreground' },
		{ variant: 'accent', appearance: 'outline', className: 'border border-border bg-background text-accent-foreground' },
		{
			variant: 'accent',
			appearance: 'light',
			className: 'bg-accent-soft border border-accent-alpha text-foreground **:data-[slot=alert-icon]:text-accent-foreground',
		},
		{ variant: 'red', appearance: 'solid', className: 'bg-red-500 text-white' },
		{ variant: 'red', appearance: 'outline', className: 'border border-border bg-background text-red-600' },
		{
			variant: 'red',
			appearance: 'light',
			className: `bg-red-50 border border-red-100 text-foreground **:data-[slot=alert-icon]:text-red-600
		**:data-[slot=alert-title]:text-red-600`,
		},
		/* Mono */
		{
			variant: 'mono',
			icon: 'primary',
			className: '**:data-[slot=alert-icon]:text-primary',
		},
		{
			variant: 'mono',
			icon: 'warning',
			className: '**:data-[slot=alert-icon]:text-warning-foreground',
		},
		{
			variant: 'mono',
			icon: 'success',
			className: '**:data-[slot=alert-icon]:text-success-foreground',
		},
		{
			variant: 'mono',
			icon: 'destructive',
			className: '**:data-[slot=alert-icon]:text-destructive-foreground',
		},
		{
			variant: 'mono',
			icon: 'info',
			className: '**:data-[slot=alert-icon]:text-info-foreground',
		},
	],
	defaultVariants: {
		variant: 'secondary',
		appearance: 'solid',
		size: 'md',
	},
});

type AlertProps = React.ComponentProps<'div'> & VariantProps<typeof alertVariants>;
type AlertIconProps = React.ComponentProps<'div'> & VariantProps<typeof alertVariants>;
function Alert({ className, appearance, variant, size, radius, icon, ...props }: AlertProps) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant, appearance, size, radius, icon }), className)}
			{...props}
		/>
	);
}
function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<div
			data-slot="alert-title"
			className={cn('grow tracking-tight', className)}
			{...props}
		/>
	);
}
function AlertIcon({ children, className, ...props }: AlertIconProps) {
	return (
		<div
			data-slot="alert-icon"
			className={cn('shrink-0', className)}
			{...props}>
			{children}
		</div>
	);
}
function AlertToolbar({ children, className, ...props }: AlertIconProps) {
	return (
		<div
			data-slot="alert-toolbar"
			className={cn(className)}
			{...props}>
			{children}
		</div>
	);
}
function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<div
			data-slot="alert-description"
			className={cn('text-sm [&_p]:leading-relaxed [&_p]:mb-2', className)}
			{...props}
		/>
	);
}
function AlertContent({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<div
			data-slot="alert-content"
			className={cn('space-y-2 **:data-[slot=alert-title]:font-semibold', className)}
			{...props}
		/>
	);
}

type CompoundAlert = typeof Alert & {
	Title: typeof AlertTitle;
	Icon: typeof AlertIcon;
	Toolbar: typeof AlertToolbar;
	Content: typeof AlertContent;
	Description: typeof AlertDescription;
};

const AlertComponent = Alert as CompoundAlert;
AlertComponent.Title = AlertTitle;
AlertComponent.Description = AlertDescription;
AlertComponent.Icon = AlertIcon;
AlertComponent.Toolbar = AlertToolbar;
AlertComponent.Content = AlertContent;

export { AlertComponent as Alert, AlertTitle, AlertDescription, AlertIcon, AlertToolbar, AlertContent, AlertProps };
