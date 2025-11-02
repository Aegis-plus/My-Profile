import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: true,
	// Prerender only the root by default. The previous pattern ['/*?']
	// created invalid filenames (e.g. "*?.data") on Windows.
	prerender: ['/'],
} satisfies Config;
