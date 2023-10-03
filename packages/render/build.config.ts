/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 17:30:32
 * @Description:
 */
import dts from 'vite-plugin-dts';
import path from 'path';
// 开发模式默认读取 index.html 作为开发模式入口
// entry 作为打包库入口
export default {
  entry: './src/index.ts',
  formats: ['es', 'cjs', 'umd'],
  libName: 'Render',
  fileName: 'index',
  external: ['react', 'react-dom'],
  global: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  // 额外的 vite 配置
  vite: {
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    plugins: [
      dts({
        entryRoot: path.resolve('./src'),
        compilerOptions: {
          skipDefaultLibCheck: false,
        },
      }),
    ],
  },
};
