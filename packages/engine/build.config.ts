import pkg from './package.json';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

// 开发模式默认读取 index.html 作为开发模式入口
// entry 作为打包库入口
const plugins: any = [];

if (process.env.ANALYZE) {
	plugins.push(
		visualizer({
			open: true,
			emitFile: false,
			gzipSize: true,
			brotliSize: true,
		}),
	);
}

const mainConfig = {
	entry: './src/index.tsx',
	libName: 'Engine',
	fileName: 'index',
	external: ['react', 'react-dom', 'monaco-editor', 'antd', '@zxscls/model', '@zxscls/layout'],
	global: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	vite: {
		base: '',
		build: {
			outDir: './dist',
			copyPublicDir: false,
		},
		resolve: {
			alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/styles/mixin.scss";',
				},
			},
		},
		define: {
			'process.env': JSON.stringify('{}'),
			__RUN_MODE__: JSON.stringify(process.env.BUILD_TYPE),
			__PACKAGE_VERSION__: JSON.stringify(pkg.version),
			__BUILD_VERSION__: JSON.stringify(Date.now()),
		},
	},
};

const config = mainConfig;
export default config;
