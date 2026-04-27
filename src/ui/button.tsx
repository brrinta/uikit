import * as React from 'react';
import { cn, cvaWithMeta } from '../lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { Spinner } from './spinner';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { Separator } from './separator';

export const buttonVariants = cvaWithMeta(
	`cursor-pointer group focus-visible:outline-hidden inline-flex items-center justify-center [&_svg:not([class*=size-])]:size-4
  has-data-[arrow=true]:justify-between whitespace-nowrap text-base font-medium ring-offset-background transition-[color,box-shadow]
  disabled:pointer-events-none disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60
  [&_svg]:shrink-0 h-auto px-9 py-2`,
	{
		variants: {
			variant: {
				solid: '',
				outline: 'bg-background border border-input hover:bg-accent data-[state=open]:bg-accent',
				dashed: 'border border-input border-dashed bg-background hover:bg-accent data-[state=open]:bg-accent',
				ghost: 'hover:bg-accent data-[state=open]:bg-accent',
				dim: 'text-muted-foreground hover:text-foreground data-[state=open]:text-foreground hover:**:[svg]:text-foreground',
				link: '',
			},
			color: {
				primary: `bg-primary text-primary-foreground [&_svg]:text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground
      hover:[&_svg]:text-primary-foreground hover:shadow-primary/20 data-[state=open]:bg-primary/90`,
				brand: `bg-brand text-brand-foreground [&_svg]:text-brand-foreground hover:bg-brand/90 hover:text-brand-foreground
       hover:[&_svg]:text-brand-foreground hover:shadow-brand/20 data-[state=open]:bg-brand/90`,
				warning: `bg-warning text-warning-foreground [&_svg]:text-warning-foreground hover:bg-warning/90 hover:text-warning-foreground
      hover:[&_svg]:text-warning-foreground hover:shadow-warning/20 data-[state=open]:bg-warning/90`,
				success: `bg-success text-success-foreground [&_svg]:text-success-foreground hover:bg-success/90 hover:text-success-foreground
      hover:[&_svg]:text-success-foreground hover:shadow-success/20 data-[state=open]:bg-success/90`,
				info: `bg-info text-info-foreground [&_svg]:text-info-foreground hover:bg-info/90 hover:text-info-foreground
     hover:[&_svg]:text-info-foreground hover:shadow-info/20 data-[state=open]:bg-info/90`,
				accent: `bg-accent text-accent-foreground [&_svg]:text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground
       hover:[&_svg]:text-accent-foreground hover:shadow-accent/20 data-[state=open]:bg-accent/80`,
				destructive: `bg-destructive text-destructive-foreground [&_svg]:text-destructive-foreground hover:bg-destructive/90
      hover:text-destructive-foreground hover:[&_svg]:text-destructive-foreground hover:shadow-destructive/20
       data-[state=open]:bg-destructive/90`,
				secondary: `bg-secondary text-secondary-foreground [&_svg]:text-secondary-foreground hover:bg-secondary/80
      hover:text-secondary-foreground hover:[&_svg]:text-secondary-foreground hover:shadow-secondary/20 data-[state=open]:bg-secondary/80`,
				white: `bg-white text-foreground [&_svg]:text-foreground dark:bg-zinc-950 dark:text-white dark:[&_svg]:text-white
     hover:bg-gray-50 hover:text-foreground hover:[&_svg]:text-foreground hover:shadow-gray-200/50
     dark:hover:bg-zinc-900 dark:hover:text-white dark:hover:[&_svg]:text-white
      data-[state=open]:bg-gray-50 dark:data-[state=open]:bg-zinc-900`,
				mono: `bg-zinc-950 text-white [&_svg]:text-white dark:bg-zinc-300 dark:text-black dark:[&_svg]:text-black
     hover:bg-zinc-800 hover:text-white hover:[&_svg]:text-white hover:shadow-zinc-950/20 dark:hover:bg-zinc-200
     dark:hover:text-black dark:hover:[&_svg]:text-black
      data-[state=open]:bg-zinc-800 dark:data-[state=open]:bg-zinc-200`,
				foreground: 'text-foreground [&_svg]:text-foreground hover:text-foreground/80 hover:[&_svg]:text-foreground/80',
				inverse: 'text-inherit [&_svg]:text-inherit hover:opacity-80',
				red: `bg-red-500 text-white [&_svg]:text-white hover:bg-red-600 hover:text-white
     hover:[&_svg]:text-white hover:shadow-red-500/20 data-[state=open]:bg-red-600`,
				orange: `bg-orange-500 text-white [&_svg]:text-white hover:bg-orange-600 hover:text-white hover:[&_svg]:text-white
       hover:shadow-orange-500/20 data-[state=open]:bg-orange-600`,
				amber: `bg-amber-500 text-white [&_svg]:text-white hover:bg-amber-600 hover:text-white hover:[&_svg]:text-white
       hover:shadow-amber-500/20 data-[state=open]:bg-amber-600`,
				yellow: `bg-yellow-500 text-black [&_svg]:text-black hover:bg-yellow-400 hover:text-black hover:[&_svg]:text-black
     hover:shadow-yellow-500/20 data-[state=open]:bg-yellow-400`,
				lime: `bg-lime-500 text-black [&_svg]:text-black hover:bg-lime-400 hover:text-black hover:[&_svg]:text-black
      hover:shadow-lime-500/20 data-[state=open]:bg-lime-400`,
				green: `bg-green-500 text-white [&_svg]:text-white hover:bg-green-600 hover:text-white
      hover:[&_svg]:text-white hover:shadow-green-500/20 data-[state=open]:bg-green-600`,
				emerald: `bg-emerald-500 text-white [&_svg]:text-white hover:bg-emerald-600 hover:text-white
      hover:[&_svg]:text-white hover:shadow-emerald-500/20 data-[state=open]:bg-emerald-600`,
				teal: `bg-teal-500 text-white [&_svg]:text-white hover:bg-teal-600 hover:text-white
     hover:[&_svg]:text-white hover:shadow-teal-500/20 data-[state=open]:bg-teal-600`,
				cyan: `bg-cyan-500 text-black [&_svg]:text-black hover:bg-cyan-400 hover:text-black
     hover:[&_svg]:text-black hover:shadow-cyan-500/20 data-[state=open]:bg-cyan-400`,
				sky: `bg-sky-500 text-white [&_svg]:text-white hover:bg-sky-600 hover:text-white
     hover:[&_svg]:text-white hover:shadow-sky-500/20 data-[state=open]:bg-sky-600`,
				blue: `bg-blue-500 text-white [&_svg]:text-white hover:bg-blue-600 hover:text-white
      hover:[&_svg]:text-white hover:shadow-blue-500/20 data-[state=open]:bg-blue-600`,
				indigo: `bg-indigo-500 text-white [&_svg]:text-white hover:bg-indigo-600 hover:text-white
      hover:[&_svg]:text-white hover:shadow-indigo-500/20 data-[state=open]:bg-indigo-600`,
				violet: `bg-violet-500 text-white [&_svg]:text-white hover:bg-violet-600 hover:text-white
      hover:[&_svg]:text-white hover:shadow-violet-500/20 data-[state=open]:bg-violet-600`,
				purple: `bg-purple-500 text-white [&_svg]:text-white hover:bg-purple-600 hover:text-white
      hover:[&_svg]:text-white hover:shadow-purple-500/20 data-[state=open]:bg-purple-600`,
				fuchsia: `bg-fuchsia-500 text-white [&_svg]:text-white hover:bg-fuchsia-600 hover:text-white
      hover:[&_svg]:text-white hover:shadow-fuchsia-500/20 data-[state=open]:bg-fuchsia-600`,
				pink: `bg-pink-500 text-white [&_svg]:text-white hover:bg-pink-600 hover:text-white
      hover:[&_svg]:text-white hover:shadow-pink-500/20 data-[state=open]:bg-pink-600`,
				rose: `bg-rose-500 text-white [&_svg]:text-white hover:bg-rose-600 hover:text-white
      hover:[&_svg]:text-white hover:shadow-rose-500/20 data-[state=open]:bg-rose-600`,
				slate: `bg-slate-500 text-white [&_svg]:text-white hover:bg-slate-600 hover:text-white
      hover:[&_svg]:text-white hover:shadow-slate-500/20 data-[state=open]:bg-slate-600`,
				gray: `bg-gray-500 text-white [&_svg]:text-white hover:bg-gray-600 hover:text-white
     hover:[&_svg]:text-white hover:shadow-gray-500/20 data-[state=open]:bg-gray-600`,
				zinc: `bg-zinc-500 text-white [&_svg]:text-white hover:bg-zinc-600 hover:text-white
     hover:[&_svg]:text-white hover:shadow-zinc-500/20 data-[state=open]:bg-zinc-600`,
				neutral: `bg-neutral-500 text-white [&_svg]:text-white hover:bg-neutral-600 hover:text-white
       hover:[&_svg]:text-white hover:shadow-neutral-500/20 data-[state=open]:bg-neutral-600`,
				stone: `bg-stone-500 text-white [&_svg]:text-white hover:bg-stone-600 hover:text-white
      hover:[&_svg]:text-white hover:shadow-stone-500/20 data-[state=open]:bg-stone-600`,
			},
			appearance: {
				default: '',
				ghost: 'hover:bg-accent data-[state=open]:bg-accent',
				light: '',
			},
			underline: {
				solid: '',
				dashed: '',
			},
			underlined: {
				solid: '',
				dashed: '',
			},
			size: {
				lg: 'h-10 px-4 text-sm gap-1.5 [&_svg:not([class*=size-])]:size-4',
				md: 'h-9 px-3 gap-1.5 text-sm [&_svg:not([class*=size-])]:size-4',
				sm: 'h-8 px-2.5 gap-1.25 text-xs [&_svg:not([class*=size-])]:size-3.5',
				xs: 'h-7 px-2 gap-1 text-xs [&_svg:not([class*=size-])]:size-3.5',
				icon: 'size-9 [&_svg:not([class*=size-])]:size-4 shrink-0',
				submit: 'h-10 px-16 gap-2 text-base font-semibold [&_svg:not([class*=size-])]:size-6',
			},
			autoHeight: {
				true: '',
				false: '',
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
			mode: {
				default: 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				icon: 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 px-2 py-2',
				link: 'h-auto p-0 bg-transparent rounded-none hover:bg-transparent data-[state=open]:bg-transparent',
				input: `
            justify-start font-normal hover:bg-background [&_svg]:transition-colors [&_svg]:hover:text-foreground data-[state=open]:bg-background
            focus-visible:border-ring focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/30
            [[data-state=open]>&]:border-ring [[data-state=open]>&]:outline-hidden [[data-state=open]>&]:ring-[3px]
            [[data-state=open]>&]:ring-ring/30 aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10
            dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20 in-data-[invalid=true]:border-destructive/60
            in-data-[invalid=true]:ring-destructive/10 dark:in-data-[invalid=true]:border-destructive dark:in-data-[invalid=true]:ring-destructive/20
          `,
			},
			placeholder: {
				true: 'text-muted-foreground',
				false: '',
			},
		},
		compoundVariants: [
			// Icons opacity for outline/dashed/ghost variants
			{
				variant: 'ghost',
				className: '[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60 text-accent-foreground',
			},
			{
				variant: 'outline',
				className: '[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60 text-accent-foreground',
			},
			{
				variant: 'dashed',
				className: '[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60 text-accent-foreground',
			},
			{
				variant: ['outline', 'dashed', 'ghost', 'link', 'dim'],
				className: '[&_svg]:text-current hover:[&_svg]:text-current',
			},
			{
				appearance: 'light',
				className: '[&_svg]:text-current hover:[&_svg]:text-current',
			},

			// Light appearance with colors
			{
				appearance: 'light',
				color: 'primary',
				className: 'bg-primary/10 text-primary hover:bg-primary/20',
			},
			{
				appearance: 'light',
				color: 'brand',
				className: 'bg-brand/10 text-brand hover:bg-brand/20',
			},
			{
				appearance: 'light',
				color: 'destructive',
				className: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
			},
			{
				appearance: 'light',
				color: 'success',
				className: 'bg-success/10 text-success hover:bg-success/20',
			},
			{
				appearance: 'light',
				color: 'warning',
				className: 'bg-warning/10 text-warning hover:bg-warning/20',
			},
			{
				appearance: 'light',
				color: 'info',
				className: 'bg-info/10 text-info hover:bg-info/20',
			},
			{
				appearance: 'light',
				color: 'accent',
				className: 'bg-accent/10 text-accent-foreground hover:bg-accent/20',
			},
			{
				appearance: 'light',
				color: 'secondary',
				className: 'bg-secondary/10 text-secondary-foreground hover:bg-secondary/20',
			},
			{
				appearance: 'light',
				color: 'red',
				className: 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400',
			},
			{
				appearance: 'light',
				color: 'orange',
				className: 'bg-orange-50 text-orange-600 hover:bg-orange-100 dark:bg-orange-950/20 dark:text-orange-400',
			},
			{
				appearance: 'light',
				color: 'amber',
				className: 'bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400',
			},
			{
				appearance: 'light',
				color: 'yellow',
				className: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 dark:bg-yellow-950/20 dark:text-yellow-400',
			},
			{
				appearance: 'light',
				color: 'lime',
				className: 'bg-lime-50 text-lime-600 hover:bg-lime-100 dark:bg-lime-950/20 dark:text-lime-400',
			},
			{
				appearance: 'light',
				color: 'green',
				className: 'bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-950/20 dark:text-green-400',
			},
			{
				appearance: 'light',
				color: 'emerald',
				className: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400',
			},
			{
				appearance: 'light',
				color: 'teal',
				className: 'bg-teal-50 text-teal-600 hover:bg-teal-100 dark:bg-teal-950/20 dark:text-teal-400',
			},
			{
				appearance: 'light',
				color: 'cyan',
				className: 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-950/20 dark:text-cyan-400',
			},
			{
				appearance: 'light',
				color: 'sky',
				className: 'bg-sky-50 text-sky-600 hover:bg-sky-100 dark:bg-sky-950/20 dark:text-sky-400',
			},
			{
				appearance: 'light',
				color: 'blue',
				className: 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400',
			},
			{
				appearance: 'light',
				color: 'indigo',
				className: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-400',
			},
			{
				appearance: 'light',
				color: 'violet',
				className: 'bg-violet-50 text-violet-600 hover:bg-violet-100 dark:bg-violet-950/20 dark:text-violet-400',
			},
			{
				appearance: 'light',
				color: 'purple',
				className: 'bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-950/20 dark:text-purple-400',
			},
			{
				appearance: 'light',
				color: 'fuchsia',
				className: 'bg-fuchsia-50 text-fuchsia-600 hover:bg-fuchsia-100 dark:bg-fuchsia-950/20 dark:text-fuchsia-400',
			},
			{
				appearance: 'light',
				color: 'pink',
				className: 'bg-pink-50 text-pink-600 hover:bg-pink-100 dark:bg-pink-950/20 dark:text-pink-400',
			},
			{
				appearance: 'light',
				color: 'rose',
				className: 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400',
			},
			{
				appearance: 'light',
				color: 'slate',
				className: 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-950/20 dark:text-slate-400',
			},
			{
				appearance: 'light',
				color: 'gray',
				className: 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-950/20 dark:text-gray-400',
			},
			{
				appearance: 'light',
				color: 'zinc',
				className: 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-950/20 dark:text-zinc-400',
			},
			{
				appearance: 'light',
				color: 'neutral',
				className: 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-950/20 dark:text-neutral-400',
			},
			{
				appearance: 'light',
				color: 'stone',
				className: 'bg-stone-50 text-stone-600 hover:bg-stone-100 dark:bg-stone-950/20 dark:text-stone-400',
			},

			// Shadow support for solid variant
			{
				variant: 'solid',
				mode: 'default',
				className: 'shadow-xs shadow-black/5',
			},
			{
				variant: 'solid',
				mode: 'icon',
				className: 'shadow-xs shadow-black/5',
			},
			{
				variant: 'outline',
				mode: 'default',
				className: 'shadow-xs shadow-black/5',
			},
			{
				variant: 'outline',
				mode: 'icon',
				className: 'shadow-xs shadow-black/5',
			},
			{
				variant: 'dashed',
				mode: 'default',
				className: 'shadow-xs shadow-black/5',
			},
			{
				variant: 'dashed',
				mode: 'icon',
				className: 'shadow-xs shadow-black/5',
			},

			// Outline & Dashed variants with colors (1 Shade Deeper on Hover)
			{
				variant: ['outline', 'dashed'],
				color: 'primary',
				className:
					'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 hover:text-primary/90 hover:border-primary/50' +
					' data-[state=open]:bg-primary/20 data-[state=open]:border-primary/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'brand',
				className:
					'bg-brand/10 text-brand border-brand/30 hover:bg-brand/20 hover:text-brand/90 hover:border-brand/50 data-[state=open]:bg-brand/20 data-[state=open]:border-brand/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'destructive',
				className:
					'bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20 hover:text-destructive/90 hover:border-destructive/50 data-[state=open]:bg-destructive/20 data-[state=open]:border-destructive/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'success',
				className:
					'bg-success/10 text-success border-success/30 hover:bg-success/20 hover:text-success/90 hover:border-success/50 data-[state=open]:bg-success/20 data-[state=open]:border-success/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'warning',
				className:
					'bg-warning/10 text-warning border-warning/30 hover:bg-warning/20 hover:text-warning/90 hover:border-warning/50 data-[state=open]:bg-warning/20 data-[state=open]:border-warning/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'info',
				className:
					'bg-info/10 text-info border-info/30 hover:bg-info/20 hover:text-info/90 hover:border-info/50 data-[state=open]:bg-info/20 data-[state=open]:border-info/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'accent',
				className:
					'bg-accent/10 text-accent-foreground border-accent/30 hover:bg-accent/20 hover:text-accent-foreground/90 hover:border-accent/50 data-[state=open]:bg-accent/20 data-[state=open]:border-accent/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'secondary',
				className:
					'bg-secondary/10 text-secondary-foreground border-secondary/30 hover:bg-secondary/20 hover:text-secondary-foreground/90 hover:border-secondary/50 data-[state=open]:bg-secondary/20 data-[state=open]:border-secondary/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'red',
				className:
					'bg-red-50 text-red-600 border-red-500/30 hover:bg-red-100 hover:text-red-400 hover:border-red-500/50 dark:bg-red-950/30 dark:text-red-400 dark:border-red-400/30 dark:hover:bg-red-950/50 dark:hover:border-red-400/50 data-[state=open]:bg-red-100 dark:data-[state=open]:bg-red-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'orange',
				className:
					'bg-orange-50 text-orange-600 border-orange-500/30 hover:bg-orange-100 hover:text-orange-400 hover:border-orange-500/50 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-400/30 dark:hover:bg-orange-950/50 dark:hover:border-orange-400/50 data-[state=open]:bg-orange-100 dark:data-[state=open]:bg-orange-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'amber',
				className:
					'bg-amber-50 text-amber-600 border-amber-500/30 hover:bg-amber-100 hover:text-amber-400 hover:border-amber-500/50 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-400/30 dark:hover:bg-amber-950/50 dark:hover:border-amber-400/50 data-[state=open]:bg-amber-100 dark:data-[state=open]:bg-amber-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'yellow',
				className:
					'bg-yellow-50 text-yellow-600 border-yellow-500/30 hover:bg-yellow-100 hover:text-yellow-400 hover:border-yellow-500/50 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-400/30 dark:hover:bg-yellow-950/50 dark:hover:border-yellow-400/50 data-[state=open]:bg-yellow-100 dark:data-[state=open]:bg-yellow-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'lime',
				className:
					'bg-lime-50 text-lime-600 border-lime-500/30 hover:bg-lime-100 hover:text-lime-400 hover:border-lime-500/50 dark:bg-lime-950/30 dark:text-lime-400 dark:border-lime-400/30 dark:hover:bg-lime-950/50 dark:hover:border-lime-400/50 data-[state=open]:bg-lime-100 dark:data-[state=open]:bg-lime-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'green',
				className:
					'bg-green-50 text-green-600 border-green-500/30 hover:bg-green-100 hover:text-green-400 hover:border-green-500/50 dark:bg-green-950/30 dark:text-green-400 dark:border-green-400/30 dark:hover:bg-green-950/50 dark:hover:border-green-400/50 data-[state=open]:bg-green-100 dark:data-[state=open]:bg-green-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'emerald',
				className:
					'bg-emerald-50 text-emerald-600 border-emerald-500/30 hover:bg-emerald-100 hover:text-emerald-400 hover:border-emerald-500/50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-400/30 dark:hover:bg-emerald-950/50 dark:hover:border-emerald-400/50 data-[state=open]:bg-emerald-100 dark:data-[state=open]:bg-emerald-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'teal',
				className:
					'bg-teal-50 text-teal-600 border-teal-500/30 hover:bg-teal-100 hover:text-teal-400 hover:border-teal-500/50 dark:bg-teal-950/30 dark:text-teal-400 dark:border-teal-400/30 dark:hover:bg-teal-950/50 dark:hover:border-teal-400/50 data-[state=open]:bg-teal-100 dark:data-[state=open]:bg-teal-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'cyan',
				className:
					'bg-cyan-50 text-cyan-600 border-cyan-500/30 hover:bg-cyan-100 hover:text-cyan-400 hover:border-cyan-500/50 dark:bg-cyan-950/30 dark:text-cyan-400 dark:border-cyan-400/30 dark:hover:bg-cyan-950/50 dark:hover:border-cyan-400/50 data-[state=open]:bg-cyan-100 dark:data-[state=open]:bg-cyan-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'sky',
				className:
					'bg-sky-50 text-sky-600 border-sky-500/30 hover:bg-sky-100 hover:text-sky-400 hover:border-sky-500/50 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-400/30 dark:hover:bg-sky-950/50 dark:hover:border-sky-400/50 data-[state=open]:bg-sky-100 dark:data-[state=open]:bg-sky-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'blue',
				className:
					'bg-blue-50 text-blue-600 border-blue-500/30 hover:bg-blue-100 hover:text-blue-400 hover:border-blue-500/50 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-400/30 dark:hover:bg-blue-950/50 dark:hover:border-blue-400/50 data-[state=open]:bg-blue-100 dark:data-[state=open]:bg-blue-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'indigo',
				className:
					'bg-indigo-50 text-indigo-600 border-indigo-500/30 hover:bg-indigo-100 hover:text-indigo-400 hover:border-indigo-500/50 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-400/30 dark:hover:bg-indigo-950/50 dark:hover:border-indigo-400/50 data-[state=open]:bg-indigo-100 dark:data-[state=open]:bg-indigo-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'violet',
				className:
					'bg-violet-50 text-violet-600 border-violet-500/30 hover:bg-violet-100 hover:text-violet-400 hover:border-violet-500/50 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-400/30 dark:hover:bg-violet-950/50 dark:hover:border-violet-400/50 data-[state=open]:bg-violet-100 dark:data-[state=open]:bg-violet-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'purple',
				className:
					'bg-purple-50 text-purple-600 border-purple-500/30 hover:bg-purple-100 hover:text-purple-400 hover:border-purple-500/50 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-400/30 dark:hover:bg-purple-950/50 dark:hover:border-purple-400/50 data-[state=open]:bg-purple-100 dark:data-[state=open]:bg-purple-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'fuchsia',
				className:
					'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-500/30 hover:bg-fuchsia-100 hover:text-fuchsia-400 hover:border-fuchsia-500/50 dark:bg-fuchsia-950/30 dark:text-fuchsia-400 dark:border-fuchsia-400/30 dark:hover:bg-fuchsia-950/50 dark:hover:border-fuchsia-400/50 data-[state=open]:bg-fuchsia-100 dark:data-[state=open]:bg-fuchsia-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'pink',
				className:
					'bg-pink-50 text-pink-600 border-pink-500/30 hover:bg-pink-100 hover:text-pink-400 hover:border-pink-500/50 dark:bg-pink-950/30 dark:text-pink-400 dark:border-pink-400/30 dark:hover:bg-pink-950/50 dark:hover:border-pink-400/50 data-[state=open]:bg-pink-100 dark:data-[state=open]:bg-pink-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'rose',
				className:
					'bg-rose-50 text-rose-600 border-rose-500/30 hover:bg-rose-100 hover:text-rose-400 hover:border-rose-500/50 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-400/30 dark:hover:bg-rose-950/50 dark:hover:border-rose-400/50 data-[state=open]:bg-rose-100 dark:data-[state=open]:bg-rose-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'slate',
				className: `bg-slate-50 text-slate-600 border-slate-500/30 hover:bg-slate-100 hover:text-slate-400 hover:border-slate-500/50
				dark:bg-slate-950/30  dark:text-slate-400 dark:border-slate-400/30 dark:hover:bg-slate-950/50 dark:hover:border-slate-400/50 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-950/50`,
			},
			{
				variant: ['outline', 'dashed'],
				color: 'gray',
				className:
					'bg-gray-50 text-gray-600 border-gray-500/30 hover:bg-gray-100 hover:text-gray-400 hover:border-gray-500/50 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-400/30 dark:hover:bg-gray-950/50 dark:hover:border-gray-400/50 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'zinc',
				className:
					'bg-zinc-50 text-zinc-600 border-zinc-500/30 hover:bg-zinc-100 hover:text-zinc-400 hover:border-zinc-500/50 dark:bg-zinc-950/30 dark:text-zinc-400 dark:border-zinc-400/30 dark:hover:bg-zinc-950/50 dark:hover:border-zinc-400/50 data-[state=open]:bg-zinc-100 dark:data-[state=open]:bg-zinc-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'neutral',
				className:
					'bg-neutral-50 text-neutral-600 border-neutral-500/30 hover:bg-neutral-100 hover:text-neutral-400 hover:border-neutral-500/50 dark:bg-neutral-950/30 dark:text-neutral-400 dark:border-neutral-400/30 dark:hover:bg-neutral-950/50 dark:hover:border-neutral-400/50 data-[state=open]:bg-neutral-100 dark:data-[state=open]:bg-neutral-950/50',
			},
			{
				variant: ['outline', 'dashed'],
				color: 'stone',
				className:
					'bg-stone-50 text-stone-600 border-stone-500/30 hover:bg-stone-100 hover:text-stone-400 hover:border-stone-500/50 dark:bg-stone-950/30 dark:text-stone-400 dark:border-stone-400/30 dark:hover:bg-stone-950/50 dark:hover:border-stone-400/50 data-[state=open]:bg-stone-100 dark:data-[state=open]:bg-stone-950/50',
			},

			// Ghost variant with colors
			{
				variant: 'ghost',
				color: 'primary',
				className: 'bg-transparent text-primary hover:bg-primary/10 hover:text-primary/80 data-[state=open]:bg-primary/10',
			},
			{
				variant: 'ghost',
				color: 'brand',
				className: 'bg-transparent text-brand hover:bg-brand/10 data-[state=open]:bg-brand/10',
			},
			{
				variant: 'ghost',
				color: 'destructive',
				className: 'bg-transparent text-destructive hover:bg-destructive/10 data-[state=open]:bg-destructive/10',
			},
			{
				variant: 'ghost',
				color: 'success',
				className: 'bg-transparent text-success hover:bg-success/10 data-[state=open]:bg-success/10',
			},
			{
				variant: 'ghost',
				color: 'warning',
				className: 'bg-transparent text-warning hover:bg-warning/10 data-[state=open]:bg-warning/10',
			},
			{
				variant: 'ghost',
				color: 'info',
				className: 'bg-transparent text-info hover:bg-info/10 data-[state=open]:bg-info/10',
			},
			{
				variant: 'ghost',
				color: 'accent',
				className: 'bg-transparent text-accent-foreground hover:bg-accent/10 data-[state=open]:bg-accent/10',
			},
			{
				variant: 'ghost',
				color: 'secondary',
				className: 'bg-transparent text-secondary-foreground hover:bg-secondary/10 data-[state=open]:bg-secondary/10',
			},
			{
				variant: 'ghost',
				color: [
					'red',
					'orange',
					'amber',
					'yellow',
					'lime',
					'green',
					'emerald',
					'teal',
					'cyan',
					'sky',
					'blue',
					'indigo',
					'violet',
					'purple',
					'fuchsia',
					'pink',
					'rose',
					'slate',
					'gray',
					'zinc',
					'neutral',
					'stone',
				],
				className: 'bg-transparent hover:bg-accent/50',
			},
			{
				variant: 'ghost',
				color: 'red',
				className: 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20',
			},
			{
				variant: 'ghost',
				color: 'orange',
				className: 'text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950/20',
			},
			{
				variant: 'ghost',
				color: 'amber',
				className: 'text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/20',
			},
			{
				variant: 'ghost',
				color: 'yellow',
				className: 'text-yellow-600 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-950/20',
			},
			{
				variant: 'ghost',
				color: 'lime',
				className: 'text-lime-600 hover:bg-lime-50 dark:text-lime-400 dark:hover:bg-lime-950/20',
			},
			{
				variant: 'ghost',
				color: 'green',
				className: 'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/20',
			},
			{
				variant: 'ghost',
				color: 'emerald',
				className: 'text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/20',
			},
			{
				variant: 'ghost',
				color: 'teal',
				className: 'text-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950/20',
			},
			{
				variant: 'ghost',
				color: 'cyan',
				className: 'text-cyan-600 hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-950/20',
			},
			{
				variant: 'ghost',
				color: 'sky',
				className: 'text-sky-600 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950/20',
			},
			{
				variant: 'ghost',
				color: 'blue',
				className: 'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/20',
			},
			{
				variant: 'ghost',
				color: 'indigo',
				className: 'text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/20',
			},
			{
				variant: 'ghost',
				color: 'violet',
				className: 'text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/20',
			},
			{
				variant: 'ghost',
				color: 'purple',
				className: 'text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/20',
			},
			{
				variant: 'ghost',
				color: 'fuchsia',
				className: 'text-fuchsia-600 hover:bg-fuchsia-50 dark:text-fuchsia-400 dark:hover:bg-fuchsia-950/20',
			},
			{
				variant: 'ghost',
				color: 'pink',
				className: 'text-pink-600 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-950/20',
			},
			{
				variant: 'ghost',
				color: 'rose',
				className: 'text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20',
			},
			{
				variant: 'ghost',
				color: 'slate',
				className: 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-950/20',
			},
			{
				variant: 'ghost',
				color: 'gray',
				className: 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-950/20',
			},
			{
				variant: 'ghost',
				color: 'zinc',
				className: 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-950/20',
			},
			{
				variant: 'ghost',
				color: 'neutral',
				className: 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-950/20',
			},
			{
				variant: 'ghost',
				color: 'stone',
				className: 'text-stone-600 hover:bg-stone-50 dark:text-stone-400 dark:hover:bg-stone-950/20',
			},
			{
				variant: 'ghost',
				mode: 'icon',
				className: 'text-muted-foreground',
			},

			// Link variant with colors
			{
				variant: 'link',
				color: 'primary',
				className: 'text-primary hover:text-primary/80',
			},
			{
				variant: 'link',
				color: 'destructive',
				className: 'text-destructive hover:text-destructive/80',
			},
			{
				variant: 'link',
				color: 'foreground',
				className: 'text-foreground hover:text-foreground/80',
			},
			{
				variant: 'link',
				color: 'inverse',
				className: 'text-inherit',
			},

			// Link underline styles
			{
				variant: 'link',
				underline: 'solid',
				className:
					'font-medium [&_svg:not([role=img]):not([class*=text-])]:opacity-60 hover:underline hover:underline-offset-4 hover:decoration-solid',
			},
			{
				variant: 'link',
				underline: 'dashed',
				className: 'font-medium [&_svg]:opacity-60 hover:underline hover:underline-offset-4 hover:decoration-dashed decoration-1',
			},
			{
				variant: 'link',
				underlined: 'solid',
				className: 'font-medium [&_svg:not([role=img]):not([class*=text-])]:opacity-60 underline underline-offset-4 decoration-solid',
			},
			{
				variant: 'link',
				underlined: 'dashed',
				className: 'font-medium [&_svg]:opacity-60 underline underline-offset-4 decoration-dashed decoration-1',
			},

			// Auto height
			{
				size: 'xs',
				autoHeight: true,
				className: 'h-auto min-h-7',
			},
			{
				size: 'sm',
				autoHeight: true,
				className: 'h-auto min-h-8',
			},
			{
				size: 'md',
				autoHeight: true,
				className: 'h-auto min-h-9',
			},
			{
				size: 'lg',
				autoHeight: true,
				className: 'h-auto min-h-10',
			},

			// Size
			{
				size: 'sm',
				mode: 'icon',
				className: 'w-7 h-7 p-0 [[&_svg:not([class*=size-])]:size-3.5',
			},
			{
				size: 'md',
				mode: 'icon',
				className: 'w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4',
			},
			{
				size: 'icon',
				className: 'w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4',
			},
			{
				size: 'lg',
				mode: 'icon',
				className: 'w-10 h-10 p-0 [&_svg:not([class*=size-])]:size-4',
			},

			// Input mode
			{
				mode: 'input',
				placeholder: true,
				variant: 'outline',
				className: 'font-normal text-muted-foreground',
			},
			{
				mode: 'input',
				variant: 'outline',
				size: 'sm',
				className: 'gap-1.25',
			},
			{
				mode: 'input',
				variant: 'outline',
				size: 'md',
				className: 'gap-1.5',
			},
			{
				mode: 'input',
				variant: 'outline',
				size: 'lg',
				className: 'gap-1.5',
			},
		],
		defaultVariants: {
			variant: 'solid',
			color: 'primary',
			mode: 'default',
			size: 'md',
			radius: 'md',
			appearance: 'default',
		},
	},
);

export type ButtonProps = useRender.ComponentProps<'button'> &
	ButtonPrimitive.Props &
	Omit<VariantProps<typeof buttonVariants>, 'variant'> & {
		variant?: VariantProps<typeof buttonVariants>['variant'] | 'primary' | 'secondary' | 'destructive';
		selected?: boolean;
		loading?: boolean;
		// type?: 'submit' | 'reset' | 'button';
	};

function Button({
	className,
	children,
	selected,
	variant,
	color,
	radius,
	appearance,
	mode,
	size,
	autoHeight,
	underlined,
	underline,
	placeholder = false,
	loading = false,
	type,
	render,
	...props
}: ButtonProps) {
	const isDisabled = props.disabled || loading;
	const isLegacyVariant = variant === 'primary' || variant === 'secondary' || variant === 'destructive';
	const resolvedVariant = isLegacyVariant ? 'solid' : variant;
	const resolvedColor =
		color ?? (variant === 'secondary' ? 'secondary' : variant === 'destructive' ? 'destructive' : variant === 'primary' ? 'primary' : undefined);
	const spinnerSize = ((size === 'xs' && 'xs') ||
		(size === 'sm' && 'sm') ||
		(size === 'lg' && 'lg') ||
		(size === 'icon' && 'md') ||
		'md') as React.ComponentProps<typeof Spinner>['size'];
	return useRender({
		defaultTagName: 'button',
		render,
		state: {
			slot: 'button',
			state: selected ? 'open' : undefined,
			variant: resolvedVariant,
			color: resolvedColor,
			size,
			radius,
			appearance,
			mode,
			autoHeight,
			placeholder,
			underlined,
			underline,
		},

		props: mergeProps(
			{
				className: cn(
					buttonVariants({
						variant: resolvedVariant,
						color: resolvedColor,
						size,
						radius,
						appearance,
						mode,
						autoHeight,
						placeholder,
						underlined,
						underline,
					}),
					className,
				),
				type,
				disabled: isDisabled,
				'aria-disabled': isDisabled || undefined,
				children: loading ? (
					<>
						<Spinner
							size={spinnerSize}
							className={cn(mode !== 'icon' && 'mr-2')}
						/>
						{mode === 'icon' ? null : children}
					</>
				) : (
					children
				),
			},
			props,
		),
	});
}
Button.displayName = 'Button';

interface ButtonArrowProps extends React.SVGProps<SVGSVGElement> {
	icon?: LucideIcon;
}

function ButtonArrow({ icon: Icon = ChevronDown, className, ...props }: ButtonArrowProps) {
	return (
		<Icon
			data-slot="button-arrow"
			className={cn('ms-auto -me-1', className)}
			{...props}
		/>
	);
}
ButtonArrow.displayName = 'ButtonArrow';

export const buttonGroupVariants = cvaWithMeta(
	`has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md
  flex w-fit items-stretch *:focus-visible:z-10 *:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit
  [&>input]:flex-1`,
	{
		variants: {
			orientation: {
				horizontal: `
          [&>[data-slot]]:rounded-none
          [&>[data-slot]:first-child]:rounded-l-[inherit]
          [&>[data-slot]:last-child]:rounded-r-[inherit]
          [&>[data-slot]:not(:first-child)]:border-l-0
        `,
				vertical: `
          flex-col
          [&>[data-slot]]:rounded-none
          [&>[data-slot]:first-child]:rounded-t-[inherit]
          [&>[data-slot]:last-child]:rounded-b-[inherit]
          [&>[data-slot]:not(:first-child)]:border-t-0
        `,
			},
		},
		defaultVariants: {
			orientation: 'horizontal',
		},
	},
);

export type ButtonGroupProps = React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>;
function ButtonGroup({ className, orientation, ...props }: ButtonGroupProps) {
	return (
		<div
			role="group"
			data-slot="button-group"
			data-orientation={orientation}
			className={cn(buttonGroupVariants({ orientation }), className)}
			{...props}
		/>
	);
}

function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<'div'>) {
	return useRender({
		defaultTagName: 'div',
		props: mergeProps<'div'>(
			{
				className: cn(
					`bg-muted gap-2 rounded-md border px-2.5 text-sm font-medium shadow-xs [&_svg:not([class*='size-'])]:size-4 flex
      items-center [&_svg]:pointer-events-none`,
					className,
				),
			},
			props,
		),
		render,
		state: {
			slot: 'button-group-text',
		},
	});
}

function ButtonGroupSeparator({ className, orientation = 'vertical', ...props }: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="button-group-separator"
			orientation={orientation}
			className={cn(
				`bg-input relative self-stretch data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto
     data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto`,
				className,
			)}
			{...props}
		/>
	);
}

const CompoundButton = Object.assign(Button, {
	Arrow: ButtonArrow,
	Group: ButtonGroup,
	GroupText: ButtonGroupText,
	GroupSeparator: ButtonGroupSeparator,
});

export { CompoundButton as Button, ButtonArrow, ButtonGroup, ButtonGroupText, ButtonGroupSeparator };
