/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
		  spacing: {
			'safe-top': 'env(safe-area-inset-top)',
			'safe-bottom': 'env(safe-area-inset-bottom)',
			'safe-left': 'env(safe-area-inset-left)',
			'safe-right': 'env(safe-area-inset-right)',
		  },
		},
	},
	plugins: [],
};
