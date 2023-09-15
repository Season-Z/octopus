/**
 * 读取builder.local.js本地配置
 */
import { existsSync } from 'fs';
import * as path from 'path';

export const readBuilderConfig = () => {
  const configFile = path.resolve(process.cwd(), 'builder.local.js');
  if (!existsSync(configFile)) {
    return null;
  } else {
    return require(configFile);
  }
};
