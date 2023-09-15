/**
 * 创建应用工程产物的manifest.json
 *
 * 用于描述：
 * 1. 页面路由表
 * 2. 运行时系统信息
 */
import * as path from 'node:path';
import { ensureFileSync, writeFileSync, copyFileSync } from 'fs-extra';
import { BUILD_DIST_DIR } from '../constants';
import {
  ProjectProtocolV3,
  AndroidManifestProtocol,
  ComponentManifestProtocol,
  WebManifestProtocol,
} from '../../types/build-data';
import { readBuilderConfig } from '../utils/localConfig';
import { CProjectType } from '@octopus/model';
import { PageEntry } from '../loaders/page-schema-loader';

// web|h5 应用工程manifest.json
export const createWebManifest = (
  projectSchema: CProjectType,
  pages: PageEntry[],
) => {
  const { launcherRouter = '' } = projectSchema || {};
  const manifestObj: WebManifestProtocol = {
    launcherRouter: launcherRouter,
    pages: [],
  };
  // web|h5工程为多bundle
  /**
   * 将组件依赖从html模板中剥离，改为存入页面source，根据页面配置 MAX_APP_CONFIG 异步加载
   */
  const { assets = [] } = projectSchema;
  const assetsMap: Record<string, string> = {};
  assets.map((asset) => {
    assetsMap[asset.sourceKey] = asset.bundlePath;
    asset?.deps?.map((sub) => {
      assetsMap[sub.sourceKey] = sub.bundlePath;
    });
  });

  /**
   *【本地调试】
   * 如果有本地配置，则读取覆盖依赖
   */
  const builderConfig = readBuilderConfig();
  if (builderConfig) {
    const isH5 = projectSchema.type === 'h5';
    const { web = {}, h5 = {} } = builderConfig?.assetsProxy || {};
    const localDependencies = isH5 ? h5 : web;

    Object.keys(assetsMap).map((sourceUrl) => {
      const localPath = localDependencies[assetsMap[sourceUrl]];
      if (localPath) {
        if (
          localPath.startsWith('http://') ||
          localPath.startsWith('https://')
        ) {
          // 远端文件的话直接替换
          assetsMap[sourceUrl] = localPath;
        } else {
          // 需要将本地文件拷贝至build目录，否则产物无法访问
          const destPath = path.resolve(
            BUILD_DIST_DIR,
            'assets',
            path.basename(localPath),
          );
          ensureFileSync(destPath);
          copyFileSync(localPath, destPath);
          assetsMap[sourceUrl] = destPath;
        }
      }
    });
  }

  pages.map((page: PageEntry) => {
    const source: string[] = [];
    page.deps.map((sourceUrl: string) => {
      if (assetsMap[sourceUrl] && !source.includes(assetsMap[sourceUrl])) {
        source.push(assetsMap[sourceUrl]);
      }
    });
    manifestObj.pages.push({
      router: page.route,
      name: page.route,
      pageCode: page.pageCode,
      source: source.concat([
        path.resolve(BUILD_DIST_DIR, 'dist', page.route, 'index.js'),
      ]),
      subType: 'PAG',
    });
  });

  const manifestFile = path.resolve(BUILD_DIST_DIR, 'manifest.json');
  ensureFileSync(manifestFile);
  writeFileSync(manifestFile, JSON.stringify(manifestObj));
};

// android应用工程manifest.json
export const createAndroidManifest = (
  projectSchema: ProjectProtocolV3,
  pages: any[],
) => {
  const {
    launcherRouter = '',
    resolution = '',
    subResolution = '',
  } = projectSchema.systemConfig || {};
  const manifestObj: AndroidManifestProtocol = {
    manifestVersion: 0, // 【预留】暂时写死
    launcherRouter: launcherRouter,
    baseWidth: '',
    subBaseWidth: '',
    pages: [],
    dependencies: [], // 【预留】暂时写死
  };

  // app工程为单bundle
  manifestObj.pages = pages.map((page) => ({
    router: page.route,
    name: page.route,
    pageCode: page.pageCode,
    source: path.resolve(BUILD_DIST_DIR, 'dist', page.route, 'index.js'),
    subType: 'PAG',
    version: 0, // 【预留】暂时写死
  }));
  // 主副屏分辨率，仅针对app类型工程有效
  if (resolution) {
    manifestObj.baseWidth = resolution.split('*')[0];
  }
  if (subResolution) {
    manifestObj.subBaseWidth = subResolution.split('*')[0];
  }

  const manifestFile = path.resolve(BUILD_DIST_DIR, 'manifest.json');
  ensureFileSync(manifestFile);
  writeFileSync(manifestFile, JSON.stringify(manifestObj));
};

// 组件工程manifest.json
export const createComponentManifest = (components: any[]) => {
  const manifestObj: ComponentManifestProtocol = {
    components: [],
  };

  manifestObj.components = components.map((comp) => ({
    componentCode: comp.componentCode,
    bundlePath: path.resolve(BUILD_DIST_DIR, comp.componentCode, 'bundle.js'),
    metaPath: path.resolve(BUILD_DIST_DIR, comp.componentCode, 'meta.json'),
  }));

  const manifestFile = path.resolve(BUILD_DIST_DIR, 'manifest.json');
  ensureFileSync(manifestFile);
  writeFileSync(manifestFile, JSON.stringify(manifestObj));
};
