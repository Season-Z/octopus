/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-03 21:47:09
 * @Description:
 */
// 开发模式默认读取 index.html 作为开发模式入口
// entry 作为打包库入口
export default {
	entry: './src/index.ts',
	libName: 'DemoPage',
	fileName: 'index',
	external: ['react', 'react-dom'],
	global: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	// 额外的 vite 配置
	vite: {
		// resolve: {
		//   alias: {
		//     '@': path.resolve(__dirname, 'src')
		//   },
		// },
	},
};
