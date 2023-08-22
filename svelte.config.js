import adapter from '@sveltejs/adapter-static';
const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(
            {
                fallback: 'index.html',
                pages: 'docs',
                assets: 'docs',
            }
        ),
        paths: {
            base: '/pointblank',
        }
	}
};

export default config;