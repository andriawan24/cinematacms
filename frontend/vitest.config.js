import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, mergeConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import viteConfig from './vite.config.js';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const storybookConfigDir = path.normalize(path.join(dirname, '.storybook'));

const unitProject = defineConfig({
	test: {
		name: 'unit',
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test/setup.js'],
		include: ['src/**/*.test.{js,jsx}'],
		css: true,
	},
});

const storybookProject = defineConfig({
	plugins: [storybookTest({ configDir: storybookConfigDir })],
	test: {
		name: `storybook:${storybookConfigDir}`,
		browser: {
			enabled: true,
			headless: true,
			provider: playwright({}),
			instances: [{ browser: 'chromium' }],
		},
	},
});

export default defineConfig({
	test: {
		projects: [mergeConfig(viteConfig, unitProject), mergeConfig(viteConfig, storybookProject)],
	},
});
