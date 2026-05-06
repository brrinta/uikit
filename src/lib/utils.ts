import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import { ArgTypes, InputType } from 'storybook/internal/csf';

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
export const cvaWithMeta: typeof cva = (base, config) => {
	const variance = cva(base, config);
	return Object.assign(variance, { _cva: config });
};

export const getCvaSchema = (comp: any): Record<string, string[]> => {
	if (!comp?._cva?.variants) return {};
	return Object.fromEntries(Object.entries(comp._cva.variants).map(([key, value]) => [key, Object.keys(value as object)]));
};

export const prepareArgTypes = (compVariants: any, additionalArgs?: ArgTypes) => {
	const schema = getCvaSchema(compVariants);
	return Object.assign(additionalArgs||{},Object.keys(schema)
		.map((key) => ({
			[key]: {
				control: schema[key].length ===2 && schema[key].includes('true') && schema[key].includes('false') ? 'boolean' : 'select',
				options: schema[key],
			} as InputType,
		}))
		.flatMap((obj) => Object.entries(obj))
		.reduce(
			(acc, [key, value]) => ({
				...acc,
				[key]: value,
			}),
			{},
		));
};

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
