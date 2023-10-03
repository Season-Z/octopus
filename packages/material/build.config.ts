/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-03 22:04:47
 * @Description:
 */
import path from 'path';

export default {
	entry: './src/index.ts',
	libName: 'Material',
	fileName: 'index',
	external: ['react', 'react-dom'],
	global: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	// 额外的 vite 配置
	vite: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
	},
};
