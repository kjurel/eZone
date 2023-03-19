/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			flex: {
				'2': '1 2 1'
			  },
			  height: {
				'remain': '46.5vh',
				'remainfull': '93vh'
			  }
		},
	},
	plugins: [],
}
