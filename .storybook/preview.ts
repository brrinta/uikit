import './stories.css';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import { UiKitProvider } from '../src/hooks/provider';
import * as React from 'react';

const preview: Preview = {
	decorators: [
		withThemeByClassName({
			themes: {
				light: 'light',
				dark: 'dark',
			},
			defaultTheme: 'light',
		}),
		(Story, context) => {
			const theme = context.globals.theme || 'light';
			return React.createElement(
				UiKitProvider,
				{ defaultTheme: theme as any, storageKey: 'storybook-theme' },
				React.createElement(Story),
			);
		},
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
