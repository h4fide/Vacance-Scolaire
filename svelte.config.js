import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			},
			customize: ({ fallback }) => {
				fallback('index.html');
			}
		}),
		outDir: '.svelte-kit'  // This is the default output directory
	}
};

export default config;
