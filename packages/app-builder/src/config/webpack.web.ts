/**
 * 适用于web/h5应用工程
 */
import { merge } from 'webpack-merge';
import * as path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { copyFileSync, ensureFileSync } from 'fs-extra';

import baseConfig from './webpack.base';
import { BUILDER_DIR, BUILD_DIST_DIR } from '../constants';
import { PageSchemaLoader } from '../loaders/page-schema-loader';
import { createWebManifest } from '../plugins/create-manifest-plugin';
// import { ProjectProtocolV3 } from '../../types/build-data';
import webDependency from '../assets/dependency.web.json';
import h5Dependency from '../assets/dependency.h5.json';
import { Logger } from '../utils/logger';
import { readBuilderConfig } from '../utils/localConfig';
import { CProjectType } from '@octopus/model';

export default async (projectSchema: CProjectType) => {
  if (!projectSchema) {
    Logger.error('[webpack.web]: ProjectSchema is undefined.');
    throw Error();
  }

  // 1. 页面入口
  const entryMap = await PageSchemaLoader('web', projectSchema);

  // 2. 页面依赖
  const isH5 = projectSchema.type === 'h5';
  const dependencies: string[] = [];
  const rawDependencies = isH5 ? h5Dependency : webDependency;

  // 2.1【本地调试】如果有本地配置，则读取覆盖依赖
  const builderConfig = readBuilderConfig();
  if (builderConfig) {
    const { web = {}, h5 = {} } = builderConfig?.assetsProxy || {};
    const localDependencies = isH5 ? h5 : web;

    rawDependencies.map((dependency) => {
      const localPath = localDependencies[dependency.url];
      if (localPath) {
        if (
          localPath.startsWith('http://') ||
          localPath.startsWith('https://')
        ) {
          // 远端文件的话直接替换
          dependency.url = localPath;
        } else {
          // 需要将本地文件拷贝至build目录，否则产物无法访问
          const destPath = path.resolve(
            BUILD_DIST_DIR,
            'assets',
            path.basename(localPath),
          );
          ensureFileSync(destPath);
          copyFileSync(localPath, destPath);
          dependency.url = path.relative(BUILD_DIST_DIR, destPath);
        }
      }
    });
  }

  rawDependencies.map((dependency) => {
    dependencies.push(`<script src="${dependency.url}"></script>`);
  });

  // // TOFIX: 临时方案：解析环境变量里的insertScript，用于做外部脚本注入，后期产品形态需要调整移除
  // try {
  //   // 约定dev代表sandbox构建，prod代表生产构建，test在哪？
  //   const insertScriptVar = (
  //     projectSchema?.envVariableList?.dev ||
  //     projectSchema?.envVariableList?.prod ||
  //     []
  //   ).find((item: any) => item.name === 'insertScript');

  //   if (insertScriptVar) {
  //     const val: { name: string; src: string }[] = JSON.parse(
  //       insertScriptVar.value,
  //     );
  //     val.map((script) => {
  //       if (script.src) {
  //         dependencies.push(`<script src="${script.src}"></script>`);
  //       }
  //     });
  //   }
  // } catch (e) {
  //   Logger.error('EnvVariable "insertScript" error');
  // }

  // 3. 路由表
  createWebManifest(projectSchema, entryMap);

  // // 4. 是否开启qiankun的处理，暂定为环境变量 ENABLE_QIANKUN 配置开发
  // const enableQiankun = (
  //   projectSchema?.envVariableList?.dev ||
  //   projectSchema?.envVariableList?.prod ||
  //   []
  // ).find(
  //   (item: any) => item.name === 'ENABLE_QIANKUN' && item.value === 'true',
  // );
  // // 注入qiankun插件脚本
  // if (enableQiankun) {
  //   dependencies.push(
  //     `<script src="https://static.cdn.sunmi.com/unpkg/@sbs/max-qiankun-plugin/1.0.8/dist/index.js" entry="true" ></script>`,
  //   );
  // }

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
      new HtmlWebpackPlugin({
        filename: path.resolve(BUILD_DIST_DIR, 'index.html'),
        template: path.resolve(BUILDER_DIR, 'templates/web/document.ejs'),
        templateParameters: {
          dependencies: dependencies.join(''),
        },
        cache: true,
        inject: false, // 由于脚本由后端计算注入，这里关闭inject
        minify: true,
      }),
    ],
  } as object);
};
