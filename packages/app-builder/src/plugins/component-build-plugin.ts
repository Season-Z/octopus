/**
 * 用于复合组件构建umd
 * 1. 工程内复合组件
 * 2. 工程外复合组件
 */
import { writeFileSync, ensureFileSync } from 'fs-extra';
import * as path from 'node:path';
// @ts-ignore
import { buildCompositeComponentFromSchema } from '@sm/max-components-builder';
// @ts-ignore
import { SourceUtil } from '@sm/max-components-loader';
// @ts-ignore
import { ComponentMeta, traverseComponents } from '@sm/max-schema-protocol';
import {
  PageProtocolV3,
  CompositeComponentProtocolV3,
  ProjectProtocolV3,
  CompositeComponentData,
} from '../types/build-data';
import { logic2fn } from '../plugins/logic2fn-plugin';
// import { analyzePageDependencies } from '../plugins/dependency-plugin';
import { Logger } from '../utils/logger';
/**
 * 页面内复合组件构建
 */
export const compilePageCompositComponents = async (
  projectSchema: ProjectProtocolV3,
  pageSchema: PageProtocolV3,
  output: string,
) => {
  // try {
  //   // 1. 组件数据格式化
  //   const compositeComponents = projectSchema.compositeComponents.map(
  //     (comp: any) => formatPageCompositeComponentSchema(comp),
  //   ) as {
  //     componentMeta: ComponentMeta;
  //     componentData: CompositeComponentData;
  //   }[];
  //   // 2. 页面组件依赖
  //   const pageDeps = analyzePageDependencies(
  //     projectSchema,
  //     {
  //       ...pageSchema,
  //       // TOFIX: 待移除body这层
  //       components: pageSchema.body.components,
  //     },
  //     projectSchema.assets,
  //   );
  //   // 3. 筛选并编译页面使用的符合组件
  //   const compositComponentcompiler = async (
  //     compositeSchema: {
  //       componentMeta: ComponentMeta;
  //       componentData: CompositeComponentData;
  //     },
  //     compositeComponents: CompositeComponentData[],
  //   ) => {
  //     try {
  //       const deps = {
  //         meta: compositeSchema.componentMeta,
  //         compositeComponents,
  //         minify: true,
  //         // 平台标识
  //         subType: '',
  //       } as any;
  //       const { bundleJs } = await buildCompositeComponentFromSchema(
  //         compositeSchema.componentData as any,
  //         deps,
  //       );
  //       return bundleJs;
  //     } catch (e) {
  //       Logger.error(
  //         '[comoponent-build-plugin]: buildCompositeComponentFromSchema fail',
  //       );
  //       throw e;
  //     }
  //   };
  //   const bundleMap = await Promise.all(
  //     compositeComponents
  //       .filter((item: any) =>
  //         pageDeps.includes(SourceUtil.toSourceUrl(item.componentData.source)),
  //       )
  //       .map((item: any) =>
  //         compositComponentcompiler(
  //           item,
  //           compositeComponents.map((item) => item.componentData),
  //         ),
  //       ),
  //   );
  //   // 4. 写文件
  //   ensureFileSync(output);
  //   writeFileSync(output, `${bundleMap.join('\n')}`);
  // } catch (e) {
  //   Logger.error(
  //     '[comoponent-build-plugin]: Fail to compile page composite components.',
  //   );
  //   throw e;
  // }
};

/**
 * 格式化工程内复合组件构建数据
 * lwf: 将页面内组件构建协议转化为builder打包需要的componentMeta和componentData信息
 */
export const formatPageCompositeComponentSchema = (componentSchema: any) => {
  const componentMeta = {
    name: componentSchema.name,
    displayName: componentSchema.displayName,
    title: '',
    iconUrl: '',
    description: '',
    publishDescription: '',
    publishVersion: '',
    configure: {
      props: (
        componentSchema?.protocolExtraFields?.meta?.attribute || []
      ).concat(componentSchema?.protocolExtraFields?.meta?.event || []),
    },
  } as ComponentMeta;

  const componentData = {
    name: componentSchema.name,
    displayName: componentSchema.displayName,
    props: componentSchema.props || {},
    lifeCycles: componentSchema.props?.lifeCycles || {},
    children: componentSchema.components || [],
    logicList: (componentSchema?.logicList).map((logic: any) => ({
      name: logic.name,
      source: logic.source ? logic2fn([logic], 'compositeComponent')[0] : '',
    })),
    propertyList: componentSchema.propertyList.map((property: any) => ({
      propertyName: property.propertyName,
      propertyValue: property.propertyValue,
    })),
    source: {
      ...(componentSchema?.protocolExtraFields.source || {}),
      packageName: '',
      version: '',
    } as any,
  } as CompositeComponentData;

  return {
    componentMeta,
    componentData,
  };
};

/**
 * 组件工程复合组件构建
 */
export const compileCompositeComponent = async (
  projectSchema: ProjectProtocolV3,
  componentSchema: CompositeComponentProtocolV3,
  extraData: {
    compositeComponents: CompositeComponentData[];
    deps: any[];
  },
  outputDir: string,
) => {
  const { componentData, componentMeta } = formatCompositeComponentSchemaV3(
    projectSchema,
    componentSchema,
  );

  try {
    // 1. 构建组件
    const options = {
      meta: componentMeta,
      compositeComponents: extraData?.compositeComponents || [],
      deps: extraData?.deps || [],
      minify: true,
      // 平台标识
      subType: projectSchema.subType,
      // 服务调用参数
      linkConfig: componentSchema?.api?.iot || [],
      serviceCall: componentSchema?.api?.cloud || [],
      serviceCallEnv: 'Prod',
    } as any;
    const { bundleJs, assetsBundleJson } =
      await buildCompositeComponentFromSchema(componentData as any, options);

    // 2. 写文件
    const output = {
      bundle: path.resolve(
        outputDir,
        componentSchema.componentCode,
        'bundle.js',
      ),
      meta: path.resolve(outputDir, componentSchema.componentCode, 'meta.json'),
    };
    ensureFileSync(output.bundle);
    ensureFileSync(output.meta);
    writeFileSync(output.bundle, bundleJs);
    writeFileSync(output.meta, JSON.stringify(assetsBundleJson));
  } catch (e) {
    Logger.error(
      `[comoponent-build-plugin]: compileCompositeComponent ${componentSchema.name} fail`,
    );
    throw e;
  }
};

/**
 * 格式化组件构建数据v3
 * lwf: 将组件构建协议转化为builder打包需要的componentMeta和componentData信息
 */
export const formatCompositeComponentSchemaV3 = (
  projectSchema: ProjectProtocolV3,
  componentSchema: CompositeComponentProtocolV3,
) => {
  try {
    const { projectCode } = projectSchema;
    const { deps } = componentSchema;

    /**
     * 递归复合组件的组件树，将isLocal设为false，将version及packageName补充完整
     */
    const recurseNegativeIsLocal = (
      components: CompositeComponentProtocolV3['components'],
    ) => {
      const finalComponents: CompositeComponentProtocolV3['components'] = (
        [] as any
      ).concat(components);

      // lwf：由于组件存在slot嵌套，这里使用组装器的traverseComponents来遍历
      traverseComponents(finalComponents, (comp: any) => {
        // 本地复合组件，注入组件version及packageName
        if (
          comp?.source?.type === 'compositeComponent' &&
          comp?.source?.isLocal === true
        ) {
          comp.source.isLocal = false;
          comp.source.packageName = projectCode; // 由于是同一组件工程内的组件，包名都约定为工程code
          deps?.map((dep) => {
            // 按约定，组件工程内的本地组件packageName为空
            if (
              dep.componentName === comp.source?.componentName &&
              dep.packageName === ''
            ) {
              comp.source.version = dep.version;
            }
          });
        }
        // 依赖的工程外组件，注入version
        else if (
          comp?.source?.type === 'compositeComponent' &&
          comp?.source?.isLocal === false
        ) {
          deps?.map((dep) => {
            if (
              dep.componentName === comp.source?.componentName &&
              dep.packageName === comp.source?.packageName
            ) {
              comp.source.version = dep.version;
            }
          });
        }
        if (comp.children) {
          comp.children = recurseNegativeIsLocal(comp.children as any);
        }
      });

      return finalComponents;
    };

    const componentMeta = {
      name: componentSchema.name,
      displayName: componentSchema.displayName,
      title: '',
      iconUrl: componentSchema.iconUrl,
      description: componentSchema.description,
      category: componentSchema.category,
      publishDescription: componentSchema.publishDescription,
      publishVersion: componentSchema.publishVersion,
      configure: {
        props: (
          componentSchema?.protocolExtraFields?.meta?.attribute || []
        ).concat(componentSchema?.protocolExtraFields?.meta?.event || []),
      },
    } as ComponentMeta;

    const componentData = {
      name: componentSchema.name,
      displayName: componentSchema.displayName,
      props: componentSchema.props,
      lifeCycles: componentSchema.props?.lifeCycles || {},
      // 由于复合组件可能依赖复合组件，这里需要递归设置isLocal为false
      children: recurseNegativeIsLocal(componentSchema.components || []),
      logicList: (componentSchema?.logicList).map((logic: any) => ({
        ...logic,
        source: logic.source ? logic2fn([logic], 'compositeComponent')[0] : '',
      })),
      propertyList: componentSchema.propertyList,
      source: {
        ...(componentSchema?.protocolExtraFields.source || {}),
        // 先以project作为包名标识
        packageName: projectCode,
        // 版本
        version: componentSchema.publishVersion,
        // 组件工程需要把isLocal置为false
        isLocal: false,
      } as any,
    } as CompositeComponentData;

    return {
      componentMeta,
      componentData,
    };
  } catch (e) {
    Logger.error(
      `[comoponent-build-plugin]: Format schema of ${componentSchema.name} fail`,
    );
    throw e;
  }
};
