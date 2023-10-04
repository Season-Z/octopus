/**
 * 消费page.xxx.json
 * 1. 页面逻辑处理：jsString->jsFunction
 * 2. 工程内复合组件编译：json -> umd
 * 3. 创建页面入口文件
 * 4. 创建路由表
 */
import * as path from 'node:path';
import { readFileSync, ensureFileSync, writeFileSync } from 'fs-extra';
import glob from 'glob';
import { BUILDER_DIR, CACHE_DIR } from '../constants';
import { Logger } from '../utils/logger';
// import { logic2fn } from '../plugins/logic2fn-plugin';
// import { compilePageCompositComponents } from '../plugins/component-build-plugin';
import { analyzePageDependencies } from '../plugins/dependency-plugin';
import { CProjectType } from '../types/schema';

const webPageEntry = readFileSync(
  path.resolve(BUILDER_DIR, 'templates/web/framework.js'),
  { encoding: 'utf-8' },
);

// const androidPageEntry = readFileSync(
//   path.resolve(BUILDER_DIR, 'templates/android/framework.js'),
//   { encoding: 'utf-8' },
// );

export interface PageEntry {
  pageCode: string;
  route: string;
  entry: string;
  deps: string[];
}
export const PageSchemaLoader = async (
  type: CProjectType['type'],
  projectSchema: CProjectType,
) => {
  Logger.info('[page-schema-loader]: Analyzing...');
  // 页面schema
  const pageSchemaFileList: string[] = glob.sync('build-data/page.*.json');
  const entryMap: PageEntry[] = [];

  // 页面前置处理
  const preparePage = async (pageSchemaFile: string) => {
    const pageSchemaJson = readFileSync(pageSchemaFile, { encoding: 'utf-8' });
    const pageSchema = JSON.parse(pageSchemaJson);
    const { name, code } = pageSchema;

    // 0. 组装下游消费的最终页面schema：
    // - 组件version和组件树source现在是拆开维护的数据
    // - 组件props里serviceCall相关的api注入
    const { assets } = projectSchema;

    // 1. 入口文件地址 .max/${route}/index.js
    const entry = path.resolve(CACHE_DIR, name, 'index.js');
    // 组件依赖分析
    const deps = analyzePageDependencies(projectSchema, pageSchema, assets);

    entryMap.push({
      pageCode: code,
      route: name,
      entry,
      deps,
    });

    console.log('entryMap', deps);

    // 2. 页面逻辑，创建文件: .max/${route}/logic.js
    // const logicOutput = path.resolve(CACHE_DIR, route, 'logic.js');
    // const { logicList = [] } = finalPageSchema;
    // logic2fn(logicList, 'page', logicOutput);

    // 3. 工程内复合组件，创建文件：.max/${route}/compositeComponents.js
    // const compositeComponentsOutput = path.join(
    //   CACHE_DIR,
    //   name,
    //   'compositeComponents.js',
    // );
    // await compilePageCompositComponents(
    //   projectSchema,
    //   finalPageSchema,
    //   compositeComponentsOutput,
    // );

    // 4. 页面模板，创建文件：.max/${route}/index.js
    // const tpl = (type === 'app' ? androidPageEntry : webPageEntry)
    const tpl = webPageEntry
      .replace(
        'let pageSchema;',
        `const pageSchema=${JSON.stringify(pageSchema)};\n`,
      )
      .replace(
        'let appInfo;',
        `import appInfo from "${path.resolve(CACHE_DIR, 'appInfo.js')}";\n`,
      );

    ensureFileSync(entry);
    writeFileSync(entry, tpl);
  };

  // 批量处理页面
  await Promise.all(
    pageSchemaFileList.map((pageSchemaFile) => preparePage(pageSchemaFile)),
  );

  Logger.info('[page-schema-loader]: Analyze completely');
  Logger.info(
    `[page-schema-loader]: Building ${entryMap.length} pages: [ ${entryMap
      .map((item) => item.route)
      .join(', ')} ]`,
  );
  return entryMap;
};
