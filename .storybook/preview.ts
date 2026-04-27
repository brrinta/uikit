import './stories.css';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

const preview: Preview = {
	decorators: [
		withThemeByClassName({
			themes: {
				light: 'light',
				dark: 'dark',
			},
			defaultTheme: 'light',
		}),
	],
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	initialGlobals: {
		viewport: { value: 'desktop', isRotated: false },
	},
};

export default preview;
