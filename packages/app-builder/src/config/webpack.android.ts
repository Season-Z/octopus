/**
 * 适用于app应用工程
 */
import { merge } from 'webpack-merge';
import * as path from 'node:path';

import baseConfig from './webpack.base';
import { BUILD_DIST_DIR } from '../constants';
import { PageSchemaLoader } from '../loaders/page-schema-loader';
import { createAndroidManifest } from '../plugins/create-manifest-plugin';
import { MergeBundlePlugin, InjectItem } from '../plugins/merge-bundle-plugin';
import { ProjectProtocolV3 } from '../../types/build-data';
import androidDependency from '../assets/dependency.android.json';
import { Logger } from '../utils/logger';
import { readBuilderConfig } from '../utils/localConfig';

export default async (projectSchema: ProjectProtocolV3 | undefined) => {
  if (!projectSchema) {
    Logger.error('[webpack.android]: ProjectSchema is undefined.');
    throw Error();
  }
  const { assets = [] } = projectSchema;

  // 1. 页面入口
  const entryMap = await PageSchemaLoader('app', projectSchema);

  // 2. 页面依赖
  const dependencies: InjectItem[] = ([] as InjectItem[]).concat(
    androidDependency,
  );

  // 2.1 组件依赖
  const assetsMap: Record<string, string> = {};
  assets.map((asset) => {
    assetsMap[asset.sourceUrl] = asset.bundlePath;
    asset?.deps?.map((sub) => {
      assetsMap[sub.sourceUrl] = sub.bundlePath;
    });
  });
  const depsMap: Record<string, InjectItem[]> = {};
  entryMap.map((entry) => {
    const assetsUsing: string[] = [];
    depsMap[entry.route] = dependencies.concat([]);
    entry.deps.map((sourceUrl) => {
      if (assetsMap[sourceUrl] && !assetsUsing.includes(assetsMap[sourceUrl])) {
        assetsUsing.push(assetsMap[sourceUrl]);
        depsMap[entry.route].push({
          name: sourceUrl,
          url: assetsMap[sourceUrl],
        });
      }
    });
  });

  // 2.2【本地调试】如果有本地配置，则读取覆盖依赖
  const builderConfig = readBuilderConfig();
  if (builderConfig) {
    const { android: localDependencies = {} } =
      builderConfig?.assetsProxy || {};

    Object.keys(depsMap).map((page) => {
      depsMap[page].map((dependency) => {
        if (localDependencies[dependency.url]) {
          dependency.url = localDependencies[dependency.url];
        }
      });
    });
  }

  // 3. 路由表
  createAndroidManifest(projectSchema, entryMap);

  return merge(baseConfig, {
    entry: () => {
      const fileMap: Record<string, string> = {};
      entryMap.map((item) => {
        fileMap[item.route] = item.entry;
      });
      return fileMap;
    },
    /**
     * 约定以页面路由为目录层级，输出页面bundle
     * 如：dist/index/index.js
     *
     * 后端部署和前端产物的目录格式并无耦合，产物以目录形式输出有几个好处：
     * 1. 排查直观，通过路由能快速检索到对应页面bundle是否存在
     * 2. 后期若要拆分bundle，目录也能方便存储
     */
    output: {
      path: path.resolve(BUILD_DIST_DIR, 'dist'),
      filename: (file: any) => file.chunk.name + '/index.js',
    },
    plugins: [
      new MergeBundlePlugin({
        injects: (entry: string) => {
          return depsMap[entry];
        },
        // lwf: 由于react/react-dom等使用了self对象，而tiny-ui下不存在，这里通过注入一段polyfill的形式处理
        banners: ['var self=globalThis;'],
      }),
    ],
    externals: {
      '@sm/max-renderers/lib/common/util': 'MaxRenderersUtil',
      '@sm/max-react': 'maxReact',
    },
  } as object);
};
