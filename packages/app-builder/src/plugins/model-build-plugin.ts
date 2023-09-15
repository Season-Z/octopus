/**
 * 模型构建
 * 1. 产出模型class定义
 * 2. 产出服务方法function
 */
import { writeFileSync, ensureFileSync } from 'fs-extra';
import * as path from 'node:path';
import {
  ProjectProtocolV3,
  ModelProtocolV3,
  Model,
} from '../../types/build-data';

export const compileModel = async (
  projectSchema: ProjectProtocolV3,
  modelSchema: ModelProtocolV3,
  outputDir: string,
) => {
  let bundleJs = '';

  // 1. 生成class
  bundleJs += '/** 模型类定义 **/ \n';
  bundleJs += 'var Model = {}; \n';
  modelSchema.models.map((model) => {
    bundleJs += classTpl(model);
  });

  // 2. 生成function
  bundleJs += '/** 服务方法清单 **/ \n';
  modelSchema.functions.map((fn) => {
    bundleJs += functionTpl(fn.name, fn.source);
  });

  // 3. 写bundle.js
  const bundleJsPath = path.resolve(outputDir, 'bundle.js');
  ensureFileSync(bundleJsPath);
  writeFileSync(bundleJsPath, bundleJs);

  // 4. 写manifest.json
  const manifestPath = path.resolve(outputDir, 'manifest.json');
  ensureFileSync(manifestPath);
  writeFileSync(
    manifestPath,
    JSON.stringify({
      bundlePath: bundleJsPath,
      bundleName: `${modelSchema.tenantCode}_${modelSchema.storeCode}_domain.js`,
    }),
  );
};

// 模型类模板
const classTpl = (model: Model) => {
  return `
  Model.${model.modelName} = class ${model.modelName} {
    constructor({${model.fields.map((field) => field.name).join(',')}}) {
      ${model.fields
        .map(
          (field) =>
            `this.${field.name}=${field.name}||${createDefualtValue(
              field.type,
            )};`,
        )
        .join('')}
    }
  }
  `;
};
const createDefualtValue = (type: string) => {
  switch (type) {
    case 'DM_STRING':
      return '""';
    case 'DM_ARRAY':
      return '[]';
    case 'DM_TIMESTAMP':
    case 'DM_DECIMAL':
    case 'DM_LONG':
    case 'DM_DOUBLE':
    case 'DM_INT':
      return 0;
    case 'DM_OBJECT':
      return '{}';
    case 'DM_BOOLEAN':
    default:
      return undefined;
  }
};

// 服务方法模板
const functionTpl = (name: string, source: string) =>
  `var ${name} = function() { return (${source}).apply(null, arguments); }; \n`;
