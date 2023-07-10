import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import ViteYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
	plugins: [sveltekit(), ViteYaml()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
