import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			scss: {
				prependData: `@import './src/lib/assets/scss/global.scss';`
			}
		}),
		vitePreprocess({})
	],
	kit: {
		adapter: adapter(),
	}
};

export default config;
