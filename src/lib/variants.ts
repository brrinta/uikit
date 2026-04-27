/**
 * Color Variants (16)
 * These are the color variants used across all components
 */
export type ColorVariant =
	| 'white'
	| 'primary'
	| 'brand'
	| 'warning'
	| 'success'
	| 'info'
	| 'accent'
	| 'mono'
	| 'destructive'
	| 'secondary'
	| 'outline'
	| 'dashed'
	| 'ghost'
	| 'dim'
	| 'foreground'
	| 'inverse';

/**
 * Appearance (4)
 * Visual style variations for components
 */
export type Appearance = 'solid' | 'outline' | 'light' | 'ghost';

/**
 * Size (7)
 * Size variations for components
 */
export type Size = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'icon';

/**
 * Mode (4)
 * Component mode variations
 */
export type Mode = 'default' | 'icon' | 'link' | 'input';

/**
 * Radius variants for border radius
 */
export type RadiusVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Orientation for components that support it
 */
export type Orientation = 'horizontal' | 'vertical';

/**
 * Shape variants
 */
export type Shape = 'default' | 'circle' | 'square' | 'pill';

/**
 * Input Style (5)
 * Input-specific style variations
 */
export type InputVariant = 'default' | 'brand' | 'outlined' | 'filled' | 'underlined' | 'bordered' | 'none';
export type InputSize = Exclude<Size, 'icon'>;
export type InputOrientation = Orientation | 'responsive';
export type InputAppearance = Appearance;
export type InputMode = Exclude<Mode, 'input' | 'link'>;
