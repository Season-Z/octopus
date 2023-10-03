/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-03 23:03:34
 * @Description:
 */
// import { viteStaticCopy } from 'vite-plugin-static-copy';
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

// if (process.env.BUILD_TYPE === 'APP') {
// 	plugins.push(
// 		viteStaticCopy({
// 			targets: [
// 				{
// 					src: './node_modules/@octopus/render/dist/index.umd.js',
// 					dest: './',
// 					rename: 'render.umd.js',
// 				},
// 			],
// 		}),
// 	);
// }

const mainConfig = {
	libMode: process.env.BUILD_TYPE !== 'APP',
	entry: './src/index.tsx',
	libName: 'Engine',
	fileName: 'index',
	external: ['react', 'react-dom', 'monaco-editor', 'antd', '@octopus/model', '@octopus/layout'],
	global: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	vite: {
		base: process.env.BUILD_TYPE === 'APP' ? '/chameleon/' : '',
		build: {
			outDir: process.env.BUILD_TYPE === 'APP' ? './example' : './dist',
			copyPublicDir: process.env.BUILD_TYPE === 'APP',
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
