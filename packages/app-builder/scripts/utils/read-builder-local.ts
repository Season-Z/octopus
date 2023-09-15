/**
 * 读取builder.local.js本地配置
 */
import { existsSync } from 'node:fs';
import * as path from 'node:path';

export const readBuilderConfig = async () => {
  const configFile = path.resolve(process.cwd(), 'builder.local.js');
  if (!existsSync(configFile)) {
    throw Error('请创建 builder.local.js 文件');
  } else {
    return await import(configFile);
  }
};
