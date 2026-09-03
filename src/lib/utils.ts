import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Merges Tailwind class names, resolving any conflicts.
 *
 * @param inputs - An array of class names to merge.
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
export function randomKey(prefix = 'uikit-'): string {
	return `${prefix}${Math.random().toString(36).slice(2, 12)}`;
}

export const isValidImageUrl = async (urlToCheck = '', defaultValue = false): Promise<boolean> => {
	return new Promise((resolve) => {
		const img = new Image();
		img.src = urlToCheck;
		img.onload = () => resolve(true);
		img.onerror = () => resolve(defaultValue);
	});
};

export function stringToRgba(str: string, alpha = 1): string {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}

	const h = Math.abs(hash) % 360;
	const s = 65;
	const l = 40;

	const { r, g, b } = hslToRgb(h, s, l);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hslToRgb(h: number, s: number, l: number) {
	s /= 100;
	l /= 100;

	const k = (n: number) => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

	return {
		r: Math.round(255 * f(0)),
		g: Math.round(255 * f(8)),
		b: Math.round(255 * f(4)),
	};
}

export function getInitials(name: string | null | undefined, limit = 2): string {
	if (!name) return '';

	const parts = name.trim().split(/\s+/).filter(Boolean);

	if (parts.length === 0) return '';

	if (parts.length === 1) {
		const word = parts[0];

		if (limit === 1) return word.charAt(0).toUpperCase();

		if (limit === 2) {
			if (word.length === 1) return word.toUpperCase();
			return (word.charAt(0) + word.charAt(word.length - 1)).toUpperCase();
		}

		return word.slice(0, limit).toUpperCase();
	}
	const initials = parts
		.slice(0, limit)
		.map((part) => part.charAt(0))
		.join('');

	return initials.toUpperCase();
}

/**** Cva ***/
type CvaConfig = Parameters<typeof cva>[1];
type CvaFn = ReturnType<typeof cva>;
export type CvaWithMeta<T extends CvaFn = CvaFn> = T & { _cva: CvaConfig };

/**
 * `cva` that keeps its config on the returned function so Storybook (and docs)
 * can enumerate variants with `getCvaSchema` / `prepareArgTypes`.
 */
export const cvaWithMeta = ((base: Parameters<typeof cva>[0], config?: CvaConfig) =>
	Object.assign(cva(base, config), { _cva: config })) as typeof cva;

export const getCvaSchema = (comp: unknown): Record<string, string[]> => {
	const variants = (comp as { _cva?: { variants?: Record<string, object> } } | undefined)?._cva?.variants;
	if (!variants) return {};
	return Object.fromEntries(Object.entries(variants).map(([key, value]) => [key, Object.keys(value)]));
};

/** Minimal structural type so this file does not import Storybook into the published library. */
export type StoryArgType = { control?: unknown; options?: string[]; [key: string]: unknown };
export type StoryArgTypes = Record<string, StoryArgType>;

/**
 * Builds Storybook `argTypes` from a `cvaWithMeta` function. Boolean-like variants
 * (`true`/`false`) become boolean controls; everything else a select.
 */
export const prepareArgTypes = (compVariants: unknown, additionalArgs?: StoryArgTypes): StoryArgTypes => {
	const schema = getCvaSchema(compVariants);
	const generated: StoryArgTypes = {};
	for (const [key, options] of Object.entries(schema)) {
		const isBoolean = options.length === 2 && options.includes('true') && options.includes('false');
		generated[key] = isBoolean ? { control: 'boolean' } : { control: 'select', options };
	}
	return { ...generated, ...(additionalArgs ?? {}) };
};

/** Extracts the props type of a `cvaWithMeta` function. */
export type VariantsOf<T> = T extends (...args: never[]) => string ? VariantProps<T> : never;

/**
 * Parses a style string into a React.CSSProperties object.
 *
 * @param styleString - The style string or object to parse.
 * @returns A React.CSSProperties object.
 */
export const parseStyle = (styleString: string | Record<string, any> | undefined | null): React.CSSProperties => {
	if (!styleString) return {};
	if (typeof styleString === 'object') return styleString as React.CSSProperties;
	return styleString.split(';').reduce((acc, rule) => {
		const [key, value] = rule.split(':');
		if (key && value) {
			const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			acc[camelKey] = value.trim();
		}
		return acc;
	}, {} as React.CSSProperties);
};
/**** Cva ***/
