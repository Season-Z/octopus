/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 18:04:00
 * @Description:
 */
import path from 'path';

const mainConfig = {
  entry: './src/index.tsx',
  libName: 'Layout',
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
        '@': path.resolve(__dirname, 'src')
      },
    },
    build: {
      copyPublicDir: false,
    },
    plugins: [],
  },
};

const config = mainConfig;

export default config;
