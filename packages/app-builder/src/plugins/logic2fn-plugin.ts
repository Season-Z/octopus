/**
 * 逻辑代码source的处理
 * 1. 追求性能，则将srouce转化成实际的function，参与打包
 * 2. or 运行时使用 new Function形式直接使用source创建函数来使用
 */
// @ts-ignore
import { Logic } from '@sm/max-schema-protocol';
import { writeFileSync, ensureFileSync } from 'fs-extra';

type FnTplType = 'global' | 'page' | 'compositeComponent';

export const logic2fn = (
  logicList: (Logic & { autoRun?: boolean })[],
  tpl: FnTplType,
  output?: string,
) => {
  switch (tpl) {
    case 'page': {
      const logicFnList = logicList.map((logic) =>
        pageLogicTpl(logic.name, logic.source, logic.autoRun),
      );
      if (output) {
        ensureFileSync(output);
        writeFileSync(output, logicFnList.join(''));
      }
      return logicFnList;
    }
    case 'compositeComponent': {
      const logicFnList = logicList.map((logic) =>
        compositeComponentLogicTpl(logic.name, logic.source),
      );
      return logicFnList;
    }
    case 'global':
    default: {
      const logicFnList = logicList.map((logic) =>
        globalLogicTpl(logic.name, logic.source, logic.autoRun),
      );
      if (output) {
        ensureFileSync(output);
        writeFileSync(output, logicFnList.join(''));
      }
      return logicFnList;
    }
  }
};

// TOFIX: 考虑下将所有逻辑函数模板统一
// 全局逻辑模板
const globalLogicTpl = (
  name: string,
  source: string,
  autoRun: boolean = false,
) =>
  `export const ${name} = (max, ...args) => { return (${source}).apply(null, args); }; \n ${name}.autoRun = ${autoRun}; \n`;

// 页面逻辑模板
const pageLogicTpl = (name: string, source: string, autoRun: boolean = false) =>
  `export const ${name} = function(max, ...args) { return (${source}).apply(this, args); };  \n ${name}.autoRun = ${autoRun}; \n`;

// 复合组件逻辑模板，复合组件逻辑不参与webpack构建，直接esbuild
const compositeComponentLogicTpl = (name: string, source: string) =>
  `function create${name}Fn(max){ return (${source.replaceAll('\\n', '')})}`;
