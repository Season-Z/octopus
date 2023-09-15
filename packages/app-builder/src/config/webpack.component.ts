/**
 * 适用于组件应用工程
 */
import glob from 'glob';
import * as path from 'node:path';
import { readFile } from 'fs-extra';
import { BUILDER_DIR, BUILD_DATA_DIR } from '../constants';
import {
  ProjectProtocolV3,
  CompositeComponentProtocolV3,
} from '../../types/build-data';
import { formatCompositeComponentSchemaV3 } from '../plugins/component-build-plugin';
import { createComponentManifest } from '../plugins/create-manifest-plugin';
import { Logger } from '../utils/logger';

export default async (projectSchema: ProjectProtocolV3) => {
  // 组件数据清单
  const entryList: { path: string; content: CompositeComponentProtocolV3 }[] =
    await Promise.all(
      glob.sync('./build-data/component.*.json').map(async (file) => {
        const data = await readFile(file, { encoding: 'utf-8' });
        return {
          path: file,
          content: JSON.parse(data),
        };
      }),
    );

  Logger.info(
    `[webpack.component]: Building ${
      entryList.length
    } components : [ ${entryList
      .map((entry) => entry.content.name)
      .join(', ')} ]`,
  );

  /**
   * lwf: 由于复合组件存在嵌套依赖，构建单个复合组件时，需要其依赖的复合组件作为数据传入，所以这里读取所有组件数据作为loader参数
   */
  const compositeComponents: any[] = [];
  entryList.map((entry) => {
    const { componentData } = formatCompositeComponentSchemaV3(
      projectSchema,
      entry.content,
    );
    compositeComponents.push(componentData);
  });

  // 产物资源清单
  createComponentManifest(entryList.map((item) => item.content));

  return {
    mode: 'production',
    // 暂时放弃缓存
    cache: false,
    // 入口文件
    entry: () => {
      const fileMap: Record<string, string> = {};
      entryList.map((entry) => {
        fileMap[entry.path] = entry.path;
      });
      return fileMap;
    },
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
              loader: path.resolve(
                BUILDER_DIR,
                'loaders/component-schema-loader',
              ),
              options: {
                projectSchema,
                compositeComponents,
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
