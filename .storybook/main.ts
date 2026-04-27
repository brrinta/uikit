import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { mergeConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
	addons: [
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@storybook/addon-onboarding',
		'@storybook/addon-themes',
		'@chromatic-com/storybook',
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},

	viteFinal: async (config) =>
		mergeConfig(config, {
			plugins: [
				react(),
				tailwindcss({
					optimize: true,
				}),
				tsconfigPaths(),
			],
		}),
};

function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

export default config;
