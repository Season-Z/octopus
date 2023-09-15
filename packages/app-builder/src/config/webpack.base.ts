import { BUILDER_DIR } from '../constants';

const enableDebug = process.env.MAX_BUILDER_DEBUG === 'true';

export default {
  mode: 'production',
  optimization: {
    minimize: !enableDebug,
  },
  // 暂时放弃缓存
  cache: false,
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom/client': 'ReactDOM',
    '@sm/react': 'React',
    '@sm/react-dom/client': 'ReactDOM',
    antd: 'antd',
    '@ant-design/plots': 'Plots',
  },
  resolve: {
    alias: {
      '@builder': BUILDER_DIR,
    },
  },
};
