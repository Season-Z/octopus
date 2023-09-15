/**
 * 依赖分析处理
 * 1. 从组件树中计算依赖的组件
 * 2. 结合工程assets的组件bundle清单，筛选出使用的组件bundle
 */
// @ts-ignore
// import { DependencyGraph } from '@sm/max-components-loader';
import { AssetItem } from '../../types/build-data';
// import { formatPageCompositeComponentSchema } from '../plugins/component-build-plugin';
import { CPageDataType, CProjectType } from '@octopus/model';

export const analyzePageDependencies = (
  projectSchema: CProjectType,
  pageSchema: CPageDataType,
  assets: AssetItem[] = [],
) => {
  // // 工程内复合组件
  // const compositeComponents = (projectSchema.compositeComponents || []).map(
  //   (comp: any) => formatPageCompositeComponentSchema(comp).componentData,
  // );

  // const sourceUrlArr =
  //   DependencyGraph.fromSchemaDeep(
  //     pageSchema as any,
  //     { compositeComponents } as any,
  //   ).sourceUrls || [];

  const getComponentsName = (tree: CPageDataType['componentsTree']) => {
    const nameArr: string[] = [];
    nameArr.push(tree.componentName);

    if (tree.children && Array.isArray(tree.children)) {
      for (const iterator of tree.children) {
        const name = getComponentsName(
          iterator as CPageDataType['componentsTree'],
        );
        nameArr.push(...name);
      }
    }
    return nameArr;
  };
  const componentsName = getComponentsName(pageSchema.componentsTree);

  const deps: string[] = assets.reduce((pre: string[], next: AssetItem) => {
    if (componentsName.includes(next.sourceKey)) {
      pre.push(next.sourceKey);
    }
    return pre;
  }, []);

  // const assetsMap: Record<string, string[]> = {};
  // assets.map((asset) => {
  //   const subArr: string[] = [];
  //   (asset.deps || []).map((sub) => {
  //     subArr.push(sub.sourceUrl);
  //   });
  //   assetsMap[asset.sourceUrl] = subArr;
  // });

  // // 由于复合组件并不包含子组件的schema信息，所以无法进一步计算出子组件的依赖，这里通过工程组件清单，识别出子组件依赖
  // sourceUrlArr.map((sourceUrl) => {
  //   if (!assetsMap[sourceUrl]) {
  //     return;
  //   }
  //   assetsMap[sourceUrl].map((str) => {
  //     if (!deps.includes(str)) {
  //       deps.push(str);
  //     }
  //   });
  // });
  return deps;
};
