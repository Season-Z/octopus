/*
 * @Author: zhouxishun
 * @Date: 2023-09-14 11:03:31
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-04 20:32:31
 * @Description:
 */
/**
 * [webpack-loader] 组件编译步骤比较单一，不需要构造缓存的入口文件，所以直接使用以webpack loader的形式使用
 *
 * 消费component.xxx.json
 * 1. 组件编译：json -> bundle.js + meta.json
 */
import { BUILD_DIST_DIR } from '../constants';
import { Logger } from '../utils/logger';
import { compileCompositeComponent } from '../plugins/component-build-plugin';
import { CompositeComponentProtocolV3 } from '../types/build-data';
// import { structUseComponentCustomService } from '@sm/max-schema-protocol/lib';

export default function (content: string) {
  // @ts-ignore
  const { compositeComponents = [], projectSchema = {} } = this.query || {};
  // @ts-ignore
  const callback = this.async();
  const componentSchema = JSON.parse(content) as CompositeComponentProtocolV3;
  const deps = (componentSchema.deps || []).map((dep) => ({
    isLocal: false,
    type: 'compositeComponent',
    ...dep,
    packageName: dep.packageName || projectSchema.projectCode,
  }));

  Logger.info(
    `[component-schema-loader]: ${componentSchema.name} -> building...`,
  );

  // 0. 数据组装
  // - 组件props里serviceCall相关的api注入
  // structUseComponentCustomService(
  //   componentSchema.components,
  //   componentSchema.api?.cloud || [],
  // );

  // 1. 构建
  compileCompositeComponent(
    projectSchema,
    componentSchema as any,
    { compositeComponents, deps },
    BUILD_DIST_DIR,
  )
    .then(() => {
      callback(null, '');
      Logger.info(`[component-schema-loader]: ${componentSchema.name} -> done`);
    })
    .catch((e) => {
      callback(e);
      Logger.error(
        `[component-schema-loader]: ${componentSchema.name} -> fail`,
      );
    });
}
