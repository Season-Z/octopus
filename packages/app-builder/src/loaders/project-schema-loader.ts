/**
 * 消费project.json
 * 1. 全局逻辑处理：jsString->jsFunction
 * 2. api解析
 * 3. 应用信息注入（仅app）
 */
import {
  existsSync,
  readFileSync,
  ensureFileSync,
  writeFileSync,
} from 'fs-extra';
import * as path from 'node:path';
import { CProjectType } from '@octopus/model';
import { Logger } from '../utils/logger';
import { CACHE_DIR } from '../constants';

export const ProjectSchemaLoader = (sourceFile: string): CProjectType => {
  Logger.info('[project-schema-loader]: Analyzing...');
  if (!existsSync(sourceFile)) {
    Logger.error(`[project-schema-loader]: File does not exit, ${sourceFile}`);
    throw Error();
  }

  const projectJson = readFileSync(sourceFile, { encoding: 'utf-8' });
  const projectSchema = JSON.parse(projectJson);

  // 注入应用信息，暂时仅针对app工程有效
  const output = path.resolve(CACHE_DIR, 'appInfo.js');
  ensureFileSync(output);
  writeFileSync(
    output,
    `export default ${JSON.stringify({
      projectCode: projectSchema.projectCode,
      tenantCode: projectSchema.tenantCode || '',
      appId: projectSchema.appId || '',
    })};`,
  );

  Logger.info('[project-schema-loader]: Analyze completely');
  return projectSchema;
};
