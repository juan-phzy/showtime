/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'image.movieglu.com',
		  },
		],
	},
};

module.exports = nextConfig;
