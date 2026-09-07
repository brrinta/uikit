import { defineConfig } from 'tsdown';

export default defineConfig({
	// The root tsconfig.json is a solution file (files: [], include: []) — tsgo compiles nothing
	// from it, so dts generation silently produced no output. Point at the lib config.
	tsconfig: 'tsconfig.lib.json',
	entry: {
		index: 'src/index.ts',
		editor: 'src/editor.ts',
		devtools: 'src/devtools.ts',
	},
	format: ['esm'],
	dts: true,
	sourcemap: true,
	clean: true,
	// Everything in dependencies/peerDependencies stays external; consumers' bundlers resolve them.
});
