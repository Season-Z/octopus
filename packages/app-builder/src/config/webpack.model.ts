/**
 * 适用于模型工程
 */
import * as path from 'node:path';
import { BUILDER_DIR, BUILD_DATA_DIR } from '../constants';
import { ProjectProtocolV3 } from '../types/build-data';

export default async (projectSchema: ProjectProtocolV3) => {
  // 模型数据
  const modelJson = path.resolve(BUILD_DATA_DIR, 'model.json');

  return {
    mode: 'production',
    // 暂时放弃缓存
    cache: false,
    // 入口文件
    entry: () => [modelJson],
    module: {
      rules: [
        {
          test: /\.json?$/,
          /**
           * webpack会默认使用内置的json-parser处理.json文件，这里强制使用component-schema-loader处理
           * https://webpack.js.org/configuration/module/#ruletype
           */
          type: 'javascript/auto',
          use: [
            {
              loader: path.resolve(BUILDER_DIR, 'loaders/model-schema-loader'),
              options: {
                projectSchema,
              },
            },
          ],
          include: [BUILD_DATA_DIR],
          exclude: /node_modules/,
        },
      ],
    },
  };
};
